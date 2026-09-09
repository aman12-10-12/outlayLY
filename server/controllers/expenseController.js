const Expense = require("../models/Expense");

//Add Expense source
exports.addExpense = async (req, res) => {
  const userId = req.user._id;

  try {
    const { icon, category, amount, date } = req.body;

    //validation:check for missing fields
    if (!category || !amount || !date) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    const newExpense = new Expense({
      userId,
      icon,
      category,
      amount,
      date: new Date(date),
    });

    await newExpense.save();
    res.status(200).json(newExpense);
  } catch (err) {
    return res.status(500).json({
      message: "Server Error",
    });
  }
};

//Get All Expense source
exports.getAllExpense = async (req, res) => {
  const userId = req.user.id;

  try {
    const expense = await Expense.find({ userId }).sort({ date: -1 });
    res.json(expense);
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
    });
  }
};

