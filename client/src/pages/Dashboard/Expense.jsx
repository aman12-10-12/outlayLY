import React, { useEffect, useState } from "react";
import {
  FiDownload,
  FiPlus,
  FiShoppingBag,
  FiCreditCard,
  FiPieChart,
  FiActivity,
  FiTrendingUp,
  FiDollarSign
} from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import { useUserAuth } from "../../hooks/useUserAuth";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import { API_PATHS } from "../../utils/apiPaths";
import toast from "react-hot-toast";
import axiosInstance from "../../utils/axiosInstance";
import ExpenseOverview from "../../components/Expense/ExpenseOverview";
import AddExpenseForm from "../../components/Expense/AddExpenseForm";
import Modal from "../../components/Modal";
import ExpenseList from "../../components/Expense/ExpenseList";
import DeleteAlert from "../../components/DeleteAlert";
import TransactionInfoCard from "../../components/Cards/TransactionInfoCard";
import moment from "moment";
import { addThousandSeparator } from "../../utils/helper";

/* Pink neomorphic theme — mirrors the teal system in Income.jsx.       */
/* This whole page is expenses, so every raised surface shares the same */
/* family; variation comes from icon accent only.                       */
const pink = {
  bg: "bg-[#FFF0F5]",
  raised: "shadow-[8px_8px_16px_rgba(255,105,180,0.25),-8px_-8px_16px_rgba(255,255,255,0.9)]",
  raisedSm: "shadow-[4px_4px_10px_rgba(255,105,180,0.22),-4px_-4px_10px_rgba(255,255,255,0.85)]",
  inset: "shadow-[inset_5px_5px_10px_rgba(255,105,180,0.28),inset_-5px_-5px_10px_rgba(255,255,255,0.85)]",
  pressed: "active:shadow-[inset_4px_4px_9px_rgba(219,60,140,0.4),inset_-4px_-4px_9px_rgba(255,255,255,0.6)]",
  ink: "text-[#C2185B]",
  accent: "#E0177E",
};
// Subtle icon-accent rotation within the pink family, for rhythm across the 4 stat cards.
const iconAccents = ["text-[#E0177E]", "text-[#C2185B]", "text-[#FF1493]", "text-[#D6499A]"];

const shimmerEffect = `
  @keyframes shimmer {
    0% { background-position: -200% 0; }
    100% { background-position: 200% 0; }
  }

  .shimmer-bg {
    animation: shimmer 1.5s infinite linear;
    background: linear-gradient(
      90deg,
      rgba(255, 105, 180, 0.06) 0%,
      rgba(255, 105, 180, 0.18) 50%,
      rgba(255, 105, 180, 0.06) 100%
    );
    background-size: 200% 100%;
  }
`;

const Expense = () => {
  useUserAuth();

  const [expenseData, setExpenseData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openDeleteAlert, setOpenDeleteAlert] = useState({
    show: false,
    data: null,
  });
  const [openAddExpenseModal, setOpenAddExpenseModal] = useState(false);
  const [activeTab, setActiveTab] = useState("All");
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const fetchExpenseDetails = async () => {
    if (loading) return;
    setLoading(true);

    try {
      const response = await axiosInstance.get(API_PATHS.EXPENSE.GET_ALL_EXPENSE);
      if (response.data) setExpenseData(response.data);
    } catch (error) {
      toast.error("Failed to load expense data");
    } finally {
      setLoading(false);
    }
  };

  const handleAddExpense = async (expense) => {
    const { category, amount, date, icon } = expense;

    if (!category.trim()) return toast.error("Category is required.");
    if (!amount || isNaN(amount) || Number(amount) <= 0) return toast.error("Amount must be a number > 0");
    if (!date) return toast.error("Date is required.");

    try {
      await axiosInstance.post(API_PATHS.EXPENSE.ADD_EXPENSE, {
        category,
        amount,
        date,
        icon,
      });
      setOpenAddExpenseModal(false);
      toast.success("Expense added successfully");
      fetchExpenseDetails();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to add expense");
    }
  };

  const deleteExpense = async (id) => {
    try {
      await axiosInstance.delete(API_PATHS.EXPENSE.DELETE_EXPENSE(id));
      setOpenDeleteAlert({ show: false, data: null });
      toast.success("Expense deleted successfully");
      fetchExpenseDetails();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to delete expense");
    }
  };

  const handleDownloadExpenseDetails = async () => {
    try {
      const response = await axiosInstance.get(API_PATHS.EXPENSE.DOWNLOAD_EXPENSE, {
        responseType: "blob"
      });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "expense_details.xlsx");
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      toast.error("Failed to download expense details. Please try again.");
    }
  };

  useEffect(() => {
    fetchExpenseDetails();
  }, []);

  const totalExpense = expenseData.reduce((sum, item) => sum + item.amount, 0);
  const last30DaysExpense = expenseData
    .filter(item => new Date(item.date) > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000))
    .reduce((sum, item) => sum + item.amount, 0);

  // Grouped for the "Categories" tab — biggest category first, since
  // that's usually the first thing someone reviewing spending wants to see.
  const categoryGroups = Object.values(
    expenseData.reduce((acc, item) => {
      const key = item.category || "Uncategorized";
      if (!acc[key]) acc[key] = { category: key, total: 0, items: [] };
      acc[key].total += item.amount;
      acc[key].items.push(item);
      return acc;
    }, {})
  ).sort((a, b) => b.total - a.total);

  const TabButton = ({ name, icon, active }) => {
    const isActive = active === name;
    return (
      <motion.button
        whileHover={{ scale: 1.03, y: -2 }}
        whileTap={{ scale: 0.96 }}
        onClick={() => setActiveTab(name)}
        className={`flex items-center px-4 py-2.5 rounded-xl text-sm font-semibold tracking-wide transition-all duration-200 ${
          isActive
            ? `text-white ${pink.raisedSm} ${pink.pressed}`
            : `${pink.ink}/80 hover:bg-white/60`
        }`}
        style={isActive ? { backgroundColor: pink.accent } : undefined}
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
      className={`relative rounded-3xl p-6 ${pink.bg} ${pink.raised} ${pink.pressed} overflow-hidden transition-shadow duration-200`}
    >
      <div className="flex justify-between items-start">
        <div className={`p-3.5 rounded-2xl ${pink.bg} ${pink.raisedSm} ${iconAccents[accentIndex]}`}>
          {icon}
        </div>
      </div>
      <div className="mt-5">
        <p className={`text-sm font-medium tracking-wide ${pink.ink}`}>{label}</p>
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
    <DashboardLayout activeMenu="Expense">
      <style>{shimmerEffect}</style>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-10 bg-gradient-to-br from-[#FFF7FA] to-[#FCE0EC] min-h-screen">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10">
          <div className="flex items-center gap-4">
            <div className={`w-12 h-12 rounded-2xl ${pink.bg} ${pink.raisedSm} ${pink.ink} flex items-center justify-center`}>
              <FiCreditCard className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">
                Expense Dashboard
              </h1>
              <p className={`mt-1 text-base md:text-lg tracking-wide ${pink.ink}/70`}>
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
              onClick={handleDownloadExpenseDetails}
              className={`flex items-center px-4 py-2.5 ${pink.bg} rounded-xl ${pink.ink} ${pink.raisedSm} ${pink.pressed} transition-all`}
            >
              <FiDownload className="w-5 h-5" />
              {!isMobile && <span className="ml-2.5">Export</span>}
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => setOpenAddExpenseModal(true)}
              className={`flex items-center px-4 py-2.5 text-white rounded-xl ${pink.raisedSm} ${pink.pressed} transition-all`}
              style={{ backgroundColor: pink.accent }}
            >
              <FiPlus className="w-5 h-5" />
              {!isMobile && <span className="ml-2.5">Add Expense</span>}
            </motion.button>
          </motion.div>
        </div>

        {/* Tabs */}
        <div className={`mb-8 flex space-x-1.5 ${pink.bg} p-1.5 rounded-xl ${pink.raisedSm}`}>
          <TabButton
            name="All"
            icon={<FiActivity className="w-5 h-5" />}
            active={activeTab}
          />
          <TabButton
            name="Categories"
            icon={<FiShoppingBag className="w-5 h-5" />}
            active={activeTab}
          />
          <TabButton
            name="Trends"
            icon={<FiTrendingUp className="w-5 h-5" />}
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
              icon={<FiCreditCard className="w-7 h-7" />}
              label="Total Expenses"
              value={totalExpense}
              loading={loading}
              accentIndex={0}
            />
            <StatCard
              icon={<FiTrendingUp className="w-7 h-7" />}
              label="Last 30 Days"
              value={last30DaysExpense}
              loading={loading}
              accentIndex={1}
            />
            <StatCard
              icon={<FiPieChart className="w-7 h-7" />}
              label="Transactions"
              value={expenseData.length}
              loading={loading}
              accentIndex={2}
              noCurrency
            />
            <StatCard
              icon={<FiDollarSign className="w-7 h-7" />}
              label="Avg. Monthly"
              value={expenseData.length > 0 ? Math.round(totalExpense / (expenseData.length)) : 0}
              loading={loading}
              accentIndex={3}
            />
          </motion.div>
        </AnimatePresence>

        {/* Main Content — now actually driven by activeTab */}
        {activeTab === "All" && (
          <AnimatePresence>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-8"
            >
              <motion.div>
                <ExpenseOverview
                  transactions={expenseData}
                  onExpenseIncome={() => setOpenAddExpenseModal(true)}
                  currency="₹"
                />
              </motion.div>

              <motion.div className={`rounded-3xl ${pink.bg} ${pink.raised} overflow-hidden`}>
                <ExpenseList
                  transactions={expenseData}
                  onDelete={(id) => setOpenDeleteAlert({ show: true, data: id })}
                  onDownload={handleDownloadExpenseDetails}
                  currency="₹"
                />
              </motion.div>
            </motion.div>
          </AnimatePresence>
        )}

        {activeTab === "Trends" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <ExpenseOverview
              transactions={expenseData}
              onExpenseIncome={() => setOpenAddExpenseModal(true)}
              currency="₹"
            />
          </motion.div>
        )}

        {activeTab === "Categories" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-4"
          >
            {categoryGroups.length === 0 ? (
              <div className={`rounded-3xl ${pink.bg} ${pink.raised} p-6 text-center text-sm ${pink.ink}`}>
                No expenses yet to group by category.
              </div>
            ) : (
              categoryGroups.map((group) => (
                <div key={group.category} className={`rounded-3xl ${pink.bg} ${pink.raised} p-6`}>
                  <div className="flex items-center justify-between mb-3">
                    <h5 className={`text-base font-semibold ${pink.ink}`}>{group.category}</h5>
                    <span className="text-sm font-semibold" style={{ color: pink.accent }}>
                      ₹{addThousandSeparator(group.total)}
                    </span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6">
                    {group.items.map((expense) => (
                      <TransactionInfoCard
                        key={expense._id}
                        title={expense.category}
                        icon={expense.icon}
                        date={moment(expense.date).format("DD MM YYYY")}
                        amount={expense.amount}
                        type="expense"
                        onDelete={() => setOpenDeleteAlert({ show: true, data: expense._id })}
                      />
                    ))}
                  </div>
                </div>
              ))
            )}
          </motion.div>
        )}

        {/* Modals */}
        <Modal
          isOpen={openAddExpenseModal}
          onClose={() => setOpenAddExpenseModal(false)}
          title="Add New Expense"
          size="lg"
        >
          <AddExpenseForm
            onAddExpense={handleAddExpense}
            onCancel={() => setOpenAddExpenseModal(false)}
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
            content="This action cannot be undone. All data associated with this expense will be permanently removed."
            onDelete={() => deleteExpense(openDeleteAlert.data)}
            onCancel={() => setOpenDeleteAlert({ show: false, data: null })}
          />
        </Modal>
      </div>
    </DashboardLayout>
  );
};

export default Expense;
