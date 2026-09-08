const writeXLSX = require("xlsx");
const Income = require("../models/Income");

//Add Income source
exports.addIncome = async (req, res) => {
  const userId = req.user._id;

  try {
    const { icon, source, amount, date } = req.body;

    //validation:check for missing fields
    if (!source || !amount || !date) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    const newIncome = new Income({
      userId,
      icon,
      source,
      amount,
      date: new Date(date),
    });

    await newIncome.save();
    res.status(200).json(newIncome);
  } catch (err) {
    return res.status(500).json({
      message: "Server Error",
    });
  }
};

//Get All Income source
exports.getAllIncome = async (req, res) => {
  const userId = req.user.id;

  try {
    const income = await Income.find({ userId }).sort({ date: -1 });
    res.json(income);
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
    });
  }
};

