const User = require("../models/user");
const validator = require("../validators/userValidator");


// GET - list user
const listallUsers = async (req, res) => {
  try {
    const users = await User.find({ isDeleted: false });
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json(err.message);
  }
};


// GET - user details by id
const getUserDetails = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).where({ isDeleted: false });
    if (!user) {
      res.status(404).json({ message: "No user found" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json(err.message);
  }
};


// POST - create user
const createUser = async (req, res) => {
  const { error } = validator.validateCreateUser(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  try {
    const user = new User(req.body);
    await user.save();
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json(err.message);
  }
};


// PUT - update user
const updateUser = async (req, res) => {
  const { error } = validator.validateUpdateUser(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  try {
    const user = User.findByIdAndUpdate(req.params.userID, req.body).where({
      isDeleted: false,
    });
    if (!user) {
      res.status(404).json({ message: "No user found" });
    }
    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};


// DELETE  - soft delete in DB
const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.userID).where({
      isDeleted: true,
    });
    if (!user) {
      res.status(404).json({ message: "No user found" });
    }
    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};


module.exports = { 
    listallUsers,
    getUserDetails,
    createUser,
    updateUser,
    deleteUser 
};
