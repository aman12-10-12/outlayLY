import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
  FiDownload,
  FiPlus,
  FiActivity,
  FiTrendingUp,
  FiPieChart,
  FiDollarSign
} from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import IncomeOverview from "../../components/Income/IncomeOverview";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import Modal from "../../components/Modal";
import AddIncomeForm from "../../components/Income/AddIncomeForm";
import IncomeList from "../../components/Income/IncomeList";
import DeleteAlert from "../../components/DeleteAlert";
import { useUserAuth } from "../../hooks/useUserAuth";
import { addThousandSeparator } from "../../utils/helper";
import { useNavigate } from "react-router-dom";

const teal = {
  bg: "bg-[#E0FFFF]",
  raised: "shadow-[8px_8px_16px_rgba(32,178,170,0.28),-8px_-8px_16px_rgba(255,255,255,0.9)]",
  raisedSm: "shadow-[4px_4px_10px_rgba(32,178,170,0.25),-4px_-4px_10px_rgba(255,255,255,0.85)]",
  inset: "shadow-[inset_5px_5px_10px_rgba(32,178,170,0.3),inset_-5px_-5px_10px_rgba(255,255,255,0.85)]",
  pressed: "active:shadow-[inset_4px_4px_9px_rgba(20,140,135,0.4),inset_-4px_-4px_9px_rgba(255,255,255,0.6)]",
  ink: "text-[#0F6E68]",
  accent: "#159089",
};

const iconAccents = ["text-[#159089]", "text-[#0E7C74]", "text-[#00A99D]", "text-[#1B7E76]"];

const shimmerEffect = `
  @keyframes shimmer {
    0% { background-position: -200% 0; }
    100% { background-position: 200% 0; }
  }

  .shimmer-bg {
    animation: shimmer 1.5s infinite linear;
    background: linear-gradient(
      90deg,
      rgba(32, 178, 170, 0.06) 0%,
      rgba(32, 178, 170, 0.16) 50%,
      rgba(32, 178, 170, 0.06) 100%
    );
    background-size: 200% 100%;
  }
`;

const Income = () => {
  useUserAuth();
  const navigate = useNavigate();

  const [incomeData, setIncomeData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openDeleteAlert, setOpenDeleteAlert] = useState({ show: false, data: null });
  const [openAddIncomeModal, setOpenAddIncomeModal] = useState(false);
  const [activeTab, setActiveTab] = useState("All");
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const fetchIncomeDetails = async () => {
    if (loading) return;
    setLoading(true);
    try {
      const response = await axiosInstance.get(API_PATHS.INCOME.GET_ALL_INCOME);
      if (response.data) setIncomeData(response.data);
    } catch (error) {
      toast.error("Failed to load income data");
    } finally {
      setLoading(false);
    }
  };

  const handleAddIncome = async (income) => {
    const { source, amount, date, icon } = income;
    if (!source.trim()) return toast.error("Source is required.");
    if (!amount || isNaN(amount) || Number(amount) <= 0) return toast.error("Amount must be a number > 0");
    if (!date) return toast.error("Date is required.");

    try {
      await axiosInstance.post(API_PATHS.INCOME.ADD_INCOME, { source, amount, date, icon });
      setOpenAddIncomeModal(false);
      toast.success("Income added successfully");
      fetchIncomeDetails();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to add income");
    }
  };

  const deleteIncome = async (id) => {
    try {
      await axiosInstance.delete(API_PATHS.INCOME.DELETE_INCOME(id));
      setOpenDeleteAlert({ show: false, data: null });
      toast.success("Income deleted successfully");
      fetchIncomeDetails();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to delete income");
    }
  };

  const handleDownloadIncomeDetails = () => {
    toast.success("Export feature coming soon!");
  };

  useEffect(() => {
    fetchIncomeDetails();
  }, []);

  const sourceCounts = incomeData.reduce((acc, item) => {
    acc[item.source] = (acc[item.source] || 0) + 1;
    return acc;
  }, {});

  const filteredTransactions = incomeData.filter((transaction) => {
    if (activeTab === "All") return true;
    const isRecurring = sourceCounts[transaction.source] > 1;
    if (activeTab === "Recurring") return isRecurring;
    if (activeTab === "One-time") return !isRecurring;
    return true;
  });

  const totalIncome = incomeData.reduce((sum, item) => sum + item.amount, 0);
  const last30DaysIncome = incomeData
    .filter(item => new Date(item.date) > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000))
    .reduce((sum, item) => sum + item.amount, 0);

  const TabButton = ({ name, icon, active }) => {
    const isActive = active === name;
    return (
      <motion.button
        whileHover={{ scale: 1.03, y: -2 }}
        whileTap={{ scale: 0.96 }}
        onClick={() => setActiveTab(name)}
        className={`flex items-center px-4 py-2.5 rounded-xl text-sm font-semibold tracking-wide transition-all duration-200 ${
          isActive
            ? `bg-[${teal.accent}] text-white ${teal.raisedSm} ${teal.pressed}`
            : `${teal.ink}/80 hover:bg-white/60`
        }`}
        style={isActive ? { backgroundColor: teal.accent } : undefined}
      >
        {icon}
        {!isMobile && <span className="ml-2.5 capitalize">{name}</span>}
      </motion.button>
    );
  };

  const StatCard = ({ icon, label, value, loading, accentIndex, noCurrency = false }) => (
    <motion.div
      whileHover={{ scale: 1.02, y: -4 }}
      whileTap={{ scale: 0.98 }}
      className={`relative rounded-3xl p-6 ${teal.bg} ${teal.raised} ${teal.pressed} overflow-hidden transition-shadow duration-200`}
    >
      <div className="flex justify-between items-start">
        <div className={`p-3.5 rounded-2xl ${teal.bg} ${teal.raisedSm} ${iconAccents[accentIndex]}`}>
          {icon}
        </div>
      </div>
      <div className="mt-5">
        <p className={`text-sm font-medium tracking-wide ${teal.ink}`}>{label}</p>
        {loading ? (
          <div className="h-9 w-2/3 mt-2 shimmer-bg rounded-lg" />
        ) : (
          <h3 className="text-2xl font-bold text-gray-900 mt-1.5 tracking-tight">
            {noCurrency ? addThousandSeparator(value) : `₹${addThousandSeparator(value)}`}
          </h3>
        )}
      </div>
    </motion.div>
  );

  return (
    <DashboardLayout activeMenu="Income">
      <style>{shimmerEffect}</style>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-10 bg-gradient-to-br from-[#F5FFFF] to-[#D7F5F2] min-h-screen">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10">
          <div className="flex items-center gap-4">
            <div className={`w-12 h-12 rounded-2xl ${teal.bg} ${teal.raisedSm} ${teal.ink} flex items-center justify-center`}>
              <FiDollarSign className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">
                Income Dashboard
              </h1>
              <p className={`mt-1 text-base md:text-lg tracking-wide ${teal.ink}/70`}>
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
            className="mt-5 md:mt-0 flex space-x-3"
          >
            <motion.button
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.96 }}
              onClick={handleDownloadIncomeDetails}
              className={`flex items-center px-4 py-2.5 ${teal.bg} rounded-xl ${teal.ink} ${teal.raisedSm} ${teal.pressed} transition-all`}
            >
              <FiDownload className="w-5 h-5" />
              {!isMobile && <span className="ml-2.5">Export</span>}
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => setOpenAddIncomeModal(true)}
              className={`flex items-center px-4 py-2.5 text-white rounded-xl ${teal.raisedSm} ${teal.pressed} transition-all`}
              style={{ backgroundColor: teal.accent }}
            >
              <FiPlus className="w-5 h-5" />
              {!isMobile && <span className="ml-2.5">Add Income</span>}
            </motion.button>
          </motion.div>
        </div>

        {/* Tabs */}
        <div className={`mb-8 flex space-x-1.5 ${teal.bg} p-1.5 rounded-xl ${teal.raisedSm}`}>
          <TabButton
            name="All"
            icon={<FiActivity className="w-5 h-5" />}
            active={activeTab}
          />
          <TabButton
            name="Recurring"
            icon={<FiTrendingUp className="w-5 h-5" />}
            active={activeTab}
          />
          <TabButton
            name="One-time"
            icon={<FiPieChart className="w-5 h-5" />}
            active={activeTab}
          />
        </div>

        {/* Stats Grid */}
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
          >
            <StatCard
              icon={<FiDollarSign className="w-7 h-7" />}
              label="Total Income"
              value={totalIncome}
              loading={loading}
              accentIndex={0}
            />
            <StatCard
              icon={<FiTrendingUp className="w-7 h-7" />}
              label="Last 30 Days"
              value={last30DaysIncome}
              loading={loading}
              accentIndex={1}
            />
            <StatCard
              icon={<FiPieChart className="w-7 h-7" />}
              label="Transactions"
              value={incomeData.length}
              loading={loading}
              accentIndex={2}
              noCurrency
            />
            <StatCard
              icon={<FiActivity className="w-7 h-7" />}
              label="Avg. Monthly"
              value={incomeData.length > 0 ? Math.round(totalIncome / (incomeData.length)) : 0}
              loading={loading}
              accentIndex={3}
            />
          </motion.div>
        </AnimatePresence>

        {/* Main Content */}
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-8"
          >
            <motion.div>
              <IncomeOverview
                transactions={filteredTransactions}
                onAddIncome={() => setOpenAddIncomeModal(true)}
                currency="₹"
              />
            </motion.div>

            <motion.div className={`rounded-3xl ${teal.bg} ${teal.raised} overflow-hidden`}>
              <IncomeList
                transactions={filteredTransactions}
                loading={loading}
                onDelete={(id) => setOpenDeleteAlert({ show: true, data: id })}
                onDownload={handleDownloadIncomeDetails}
                currency="₹"
              />
            </motion.div>
          </motion.div>
        </AnimatePresence>

        {/* Modals */}
        <Modal
          isOpen={openAddIncomeModal}
          onClose={() => setOpenAddIncomeModal(false)}
          title="Add New Income"
          size="lg"
        >
          <AddIncomeForm
            onAddIncome={handleAddIncome}
            onCancel={() => setOpenAddIncomeModal(false)}
            currency="₹"
          />
        </Modal>

        <Modal
          isOpen={openDeleteAlert.show}
          onClose={() => setOpenDeleteAlert({ show: false, data: null })}
          title="Confirm Deletion"
          size="md"
        >
          <DeleteAlert
            content="This action cannot be undone. All data associated with this income will be permanently removed."
            onDelete={() => deleteIncome(openDeleteAlert.data)}
            onCancel={() => setOpenDeleteAlert({ show: false, data: null })}
          />
        </Modal>
      </div>
    </DashboardLayout>
  );
};

export default Income;
