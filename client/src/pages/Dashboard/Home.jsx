import React, { useEffect, useState } from "react";
import {
  LuHandCoins,
  LuWalletMinimal,
  LuTrendingUp,
  LuPiggyBank,
} from "react-icons/lu";
import { IoMdCard } from "react-icons/io";
import { FiArrowUpRight, FiActivity } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import { useUserAuth } from "../../hooks/useUserAuth";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import { addThousandSeparator } from "../../utils/helper";
import RecentTransactions from "../../components/Dashboard/RecentTransactions";
import FinanceOverview from "../../components/Dashboard/FinanceOverview";
import ExpenseTransactions from "../../components/Dashboard/ExpenseTransactions";
import Last30DaysExpenses from "../../components/Dashboard/Last30DaysExpenses";
import RecentIncomeWithChart from "../../components/Dashboard/RecentIncomeWithChart";
import RecentIncome from "../../components/Dashboard/RecentIncome";

const THEME = {
  blue: {
    bg: "bg-[#F0F8FF]",
    raised: "shadow-[8px_8px_16px_rgba(70,130,180,0.25),-8px_-8px_16px_rgba(255,255,255,0.9)]",
    raisedSm: "shadow-[4px_4px_10px_rgba(70,130,180,0.22),-4px_-4px_10px_rgba(255,255,255,0.85)]",
    inset: "shadow-[inset_5px_5px_10px_rgba(70,130,180,0.28),inset_-5px_-5px_10px_rgba(255,255,255,0.85)]",
    pressed: "active:shadow-[inset_4px_4px_9px_rgba(45,95,135,0.38),inset_-4px_-4px_9px_rgba(255,255,255,0.6)]",
    icon: "text-[#4682B4]",
    badge: "bg-[#B0E0E6]/40",
    ink: "text-[#2F5F82]",
    accentBg: "bg-[#4682B4]",
  },
  teal: {
    bg: "bg-[#E0FFFF]",
    raised: "shadow-[8px_8px_16px_rgba(32,178,170,0.28),-8px_-8px_16px_rgba(255,255,255,0.9)]",
    raisedSm: "shadow-[4px_4px_10px_rgba(32,178,170,0.25),-4px_-4px_10px_rgba(255,255,255,0.85)]",
    inset: "shadow-[inset_5px_5px_10px_rgba(32,178,170,0.3),inset_-5px_-5px_10px_rgba(255,255,255,0.85)]",
    pressed: "active:shadow-[inset_4px_4px_9px_rgba(20,140,135,0.4),inset_-4px_-4px_9px_rgba(255,255,255,0.6)]",
    icon: "text-[#159089]",
    badge: "bg-[#00CED1]/20",
    ink: "text-[#0F6E68]",
    accentBg: "bg-[#159089]",
  },
  pink: {
    bg: "bg-[#FFF0F5]",
    raised: "shadow-[8px_8px_16px_rgba(255,105,180,0.25),-8px_-8px_16px_rgba(255,255,255,0.9)]",
    raisedSm: "shadow-[4px_4px_10px_rgba(255,105,180,0.22),-4px_-4px_10px_rgba(255,255,255,0.85)]",
    inset: "shadow-[inset_5px_5px_10px_rgba(255,105,180,0.28),inset_-5px_-5px_10px_rgba(255,255,255,0.85)]",
    pressed: "active:shadow-[inset_4px_4px_9px_rgba(219,60,140,0.4),inset_-4px_-4px_9px_rgba(255,255,255,0.6)]",
    icon: "text-[#E0177E]",
    badge: "bg-[#FF69B4]/20",
    ink: "text-[#C2185B]",
    accentBg: "bg-[#E0177E]",
  },
  lavender: {
    bg: "bg-[#F1EEFB]",
    raised: "shadow-[8px_8px_16px_rgba(180,140,200,0.28),-8px_-8px_16px_rgba(255,255,255,0.9)]",
    raisedSm: "shadow-[4px_4px_10px_rgba(180,140,200,0.25),-4px_-4px_10px_rgba(255,255,255,0.85)]",
    inset: "shadow-[inset_5px_5px_10px_rgba(180,140,200,0.3),inset_-5px_-5px_10px_rgba(255,255,255,0.85)]",
    pressed: "active:shadow-[inset_4px_4px_9px_rgba(150,110,175,0.4),inset_-4px_-4px_9px_rgba(255,255,255,0.6)]",
    icon: "text-[#8B5FA8]",
    badge: "bg-[#DDA0DD]/25",
    ink: "text-[#6B3FA0]",
    accentBg: "bg-[#8B5FA8]",
  },
};

const shimmerEffect = `
  @keyframes shimmer {
    0% { background-position: -200% 0; }
    100% { background-position: 200% 0; }
  }

  .shimmer-bg {
    animation: shimmer 1.5s infinite linear;
    background: linear-gradient(
      90deg,
      rgba(120, 140, 160, 0.08) 0%,
      rgba(120, 140, 160, 0.2) 50%,
      rgba(120, 140, 160, 0.08) 100%
    );
    background-size: 200% 100%;
  }
`;

const Home = () => {
  useUserAuth();
  const navigate = useNavigate();
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const fetchDashboardData = async () => {
    try {
      const response = await axiosInstance.get(API_PATHS.DASHBOARD.GET_DATA);
      setDashboardData(response.data);
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const InfoCard = ({ icon, label, value, trend, loading, variant }) => {
    const t = THEME[variant];
    return (
      <motion.div
        whileHover={{ scale: 1.02, y: -4 }}
        whileTap={{ scale: 0.98 }}
        className={`relative rounded-3xl p-6 ${t.bg} ${t.raised} ${t.pressed} overflow-hidden transition-shadow duration-200`}
      >
        <div className="flex justify-between items-start">
          <div className={`p-3.5 rounded-2xl ${t.bg} ${t.raisedSm} ${t.icon} transition-transform group-hover:scale-105`}>
            {icon}
          </div>
          {trend && (
            <div
              className={`px-2.5 py-1 rounded-lg text-xs font-semibold tracking-wide shadow-[inset_1px_1px_3px_rgba(0,0,0,0.06)] ${
                trend.value > 0
                  ? "bg-emerald-50 text-emerald-700"
                  : "bg-rose-50 text-rose-700"
              }`}
            >
              {trend.value > 0 ? "↑" : "↓"} {Math.abs(trend.value)}%
            </div>
          )}
        </div>
        <div className="mt-5">
          <p className={`text-sm font-medium tracking-wide ${t.ink}`}>{label}</p>
          {loading ? (
            <div className="h-9 w-2/3 mt-2 shimmer-bg rounded-lg" />
          ) : (
            <h3 className="text-2xl font-bold text-gray-900 mt-1.5 tracking-tight">
              ₹{value}
            </h3>
          )}
        </div>
      </motion.div>
    );
  };

  const TabButton = ({ name, icon, active }) => {
    const isActive = active === name;
    const t = THEME.blue;
    return (
      <motion.button
        whileHover={{ scale: 1.04, y: -1 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setActiveTab(name)}
        className={`flex items-center px-4 py-2.5 rounded-xl text-sm font-semibold tracking-wide transition-all duration-200 ${
          isActive
            ? `${t.accentBg} text-white ${t.raisedSm} ${t.pressed}`
            : `${t.ink}/80 hover:bg-white/60`
        }`}
      >
        {icon}
        {!isMobile && <span className="ml-2.5 capitalize">{name}</span>}
      </motion.button>
    );
  };

  return (
    <DashboardLayout activeMenu="Dashboard">
      <style>{shimmerEffect}</style>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-10 bg-gradient-to-br from-[#F7FBFF] to-[#DCEBF7] min-h-screen">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10">
          <div className="flex items-center gap-4">
            <div className={`w-12 h-12 rounded-2xl ${THEME.blue.bg} ${THEME.blue.raisedSm} ${THEME.blue.icon} flex items-center justify-center`}>
              <LuWalletMinimal className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">
                Financial Dashboard
              </h1>
              <p className={`mt-1 text-base md:text-lg tracking-wide ${THEME.blue.ink}/70`}>
                {new Date().toLocaleDateString("en-US", {
                  weekday: "long",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className={`mt-5 md:mt-0 flex space-x-1.5 ${THEME.blue.bg} p-1.5 rounded-xl ${THEME.blue.raisedSm}`}
          >
            <TabButton
              name="overview"
              icon={<FiActivity className="w-5 h-5" />}
              active={activeTab}
            />
            <TabButton
              name="analytics"
              icon={<LuTrendingUp className="w-5 h-5" />}
              active={activeTab}
            />
            <TabButton
              name="reports"
              icon={<LuPiggyBank className="w-5 h-5" />}
              active={activeTab}
            />
          </motion.div>
        </div>

        {/* Stats Grid */}
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
          >
            <InfoCard
              icon={<IoMdCard className="w-7 h-7" />}
              label="Total Balance"
              value={addThousandSeparator(dashboardData?.totalBalance || 0)}
              trend={{ value: 12.5 }}
              loading={loading}
              variant="blue"
            />
            <InfoCard
              icon={<LuWalletMinimal className="w-7 h-7" />}
              label="Total Income"
              value={addThousandSeparator(dashboardData?.totalIncome || 0)}
              trend={{ value: 8.2 }}
              loading={loading}
              variant="teal"
            />
            <InfoCard
              icon={<LuHandCoins className="w-7 h-7" />}
              label="Total Expenses"
              value={addThousandSeparator(dashboardData?.totalExpense || 0)}
              trend={{ value: -4.3 }}
              loading={loading}
              variant="pink"
            />
            <InfoCard
              icon={<FiArrowUpRight className="w-7 h-7" />}
              label="Net Savings"
              value={addThousandSeparator(
                (dashboardData?.totalIncome || 0) -
                  (dashboardData?.totalExpense || 0)
              )}
              trend={{ value: 5.7 }}
              loading={loading}
              variant="lavender"
            />
          </motion.div>
        </AnimatePresence>

        {/* Main Content */}
        {activeTab === "overview" && (
          <div className="space-y-10">
            {/* First Row /}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="lg:col-span-2"
              >
                <FinanceOverview
                  totalBalance={dashboardData?.totalBalance || 0}
                  totalIncome={dashboardData?.totalIncome || 0}
                  totalExpense={dashboardData?.totalExpense || 0}
                  loading={loading}
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className={`rounded-3xl ${THEME.blue.bg} ${THEME.blue.raised}`}
              >
                <RecentTransactions
                  transactions={dashboardData?.recentTransactions}
                  onSeeMore={() => navigate("/expense")}
                  loading={loading}
                />
              </motion.div>
            </div>

            {/* Second Row */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
              >
                <Last30DaysExpenses
                  data={dashboardData?.last30daysExpenses?.transactions || []}
                  loading={loading}
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                className="lg:col-span-2"
              >
                <RecentIncomeWithChart
                  data={
                    dashboardData?.last60DaysIncome?.transaction?.slice(0, 6) || []
                  }
                  totalIncome={dashboardData?.totalIncome || 0}
                  loading={loading}
                />
              </motion.div>
            </div>

            {/* Third Row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.5 }}
                className={`rounded-3xl ${THEME.pink.bg} ${THEME.pink.raised}`}
              >
                <ExpenseTransactions
                  transactions={dashboardData?.last30daysExpenses?.transactions || []}
                  onSeeMore={() => navigate("/expense")}
                  loading={loading}
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.5 }}
                className={`rounded-3xl ${THEME.teal.bg} ${THEME.teal.raised}`}
              >
                <RecentIncome
                  transactions={dashboardData?.last60DaysIncome?.transaction || []}
                  onSeeMore={() => navigate("/income")}
                  loading={loading}
                />
              </motion.div>
            </div>
          </div>
        )}

        {activeTab === "analytics" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="grid grid-cols-1 lg:grid-cols-3 gap-6"
          >
            <FinanceOverview
              totalBalance={dashboardData?.totalBalance || 0}
              totalIncome={dashboardData?.totalIncome || 0}
              totalExpense={dashboardData?.totalExpense || 0}
              loading={loading}
            />
            <Last30DaysExpenses
              data={dashboardData?.last30daysExpenses?.transactions || []}
              loading={loading}
            />
            <RecentIncomeWithChart
              data={dashboardData?.last60DaysIncome?.transaction?.slice(0, 6) || []}
              totalIncome={dashboardData?.totalIncome || 0}
              loading={loading}
            />
          </motion.div>
        )}

        {activeTab === "reports" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="grid grid-cols-1 lg:grid-cols-3 gap-6"
          >
            <div className={`rounded-3xl ${THEME.blue.bg} ${THEME.blue.raised}`}>
              <RecentTransactions
                transactions={dashboardData?.recentTransactions}
                onSeeMore={() => navigate("/expense")}
                loading={loading}
              />
            </div>
            <div className={`rounded-3xl ${THEME.pink.bg} ${THEME.pink.raised}`}>
              <ExpenseTransactions
                transactions={dashboardData?.last30daysExpenses?.transactions || []}
                onSeeMore={() => navigate("/expense")}
                loading={loading}
              />
            </div>
            <div className={`rounded-3xl ${THEME.teal.bg} ${THEME.teal.raised}`}>
              <RecentIncome
                transactions={dashboardData?.last60DaysIncome?.transaction || []}
                onSeeMore={() => navigate("/income")}
                loading={loading}
              />
            </div>
          </motion.div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default Home;
