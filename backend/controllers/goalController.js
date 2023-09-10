const asynchandler = require("express-async-handler");
// desc Get goals
// route get /api/goals

const getGoals = asynchandler(async (req, res) => {
  if (!req.body.text) {
    res.status(400);
    throw new Error("please add a text field");
  }
  res.status(200).json({ message: "Get Goals" });
});
const setGoals = asynchandler(async (req, res) => {
  res.status(200).json({ message: "Set Goals" });
});
const updateGoals = asynchandler(async (req, res) => {
  res.status(200).json({ message: `Update Goal ${req.params.id}` });
});
const deleteGoals = asynchandler(async (req, res) => {
  res.status(200).json({ message: `Delete Goal ${req.params.id}` });
});
module.exports = {
  getGoals,
  setGoals,
  updateGoals,
  deleteGoals,
};
