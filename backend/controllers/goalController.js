const asynchandler = require("express-async-handler");

const Goal = require("../model/goalModel");
const User = require("../model/userModel");
// desc Get goals
// route get /api/goals

const getGoals = asynchandler(async (req, res) => {
  const goals = await Goal.find({ user: req.user.id });
  res.status(200).json(goals);
});
const setGoals = asynchandler(async (req, res) => {
  if (!req.body.text) {
    res.status(400);
    throw new Error("please add a text field");
  }

  const goal = await Goal.create({
    text: req.body.text,
    user: req.user.id,
  });
  res.status(200).json(goal);
});
const updateGoals = asynchandler(async (req, res) => {
  const goal = await Goal.findById(req.params.id);

  if (!goal) {
    res.status(400);
    throw new Error("goal not found");
  }
  const user = await User.findById(req.user.id);
  if (!user) {
    res.status(401);
    throw new Error("user not found");
  }
  //the goal belongs to logged in user
  if (goal.user.toString() !== user.id) {
    res.status(401);
    throw new Error("user not authorize");
  }
  const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.status(200).json(updatedGoal);
});
const deleteGoal = asynchandler(async (req, res) => {
  const goal = await Goal.findById(req.params.id);
  if (!goal) {
    res.status(400);
    throw new Error("goal not found");
  }

  const user = await User.findById(req.user.id);
  if (!user) {
    res.status(401);
    throw new Error("user not found");
  }
  //the goal belongs to logged in user
  if (goal.user.toString() !== user.id) {
    res.status(401);
    throw new Error("user not authorize");
  }
  await Goal.deleteOne({ _id: req.params.id });
  res.status(200).json({ id: req.params.id });
});
module.exports = {
  getGoals,
  setGoals,
  updateGoals,
  deleteGoal,
};
