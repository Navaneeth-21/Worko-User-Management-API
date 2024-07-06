const User = require("../models/user");
const validate = require("../validators/userValidator");

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
    const user = await User.findById(req.params.userID);
    if (!user) {
      res.status(404).json({ message: "No user found" });
    }
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err.message);
  }
};

// POST - create user
const createUser = async (req, res) => {
  const { error } = validate.validateCreateUser(req.body);
  if (error) {
    return res.status(400).json({ message: "validation error" });
  }

  try {
    const user = new User(req.body);
    await user.save();
    res.status(201).json({ message: "user created successfully" });
  } catch (error) {
    res.status(500).json(error.message);
  }
};

// PUT - update user
const updateUser = async (req, res) => {
  const { error } = validate.validateUpdateUser(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  try {
    const user = await User.findOneAndUpdate(
      {
        _id: req.params.userID,
        isDeleted: false,
      },
      req.body,
      { new: true }
    );

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
    const user = await User.findByIdAndDelete(req.params.userID);
    if (!user) {
      res.status(404).json({ message: "No user found" });
    }
    return res.status(200).json({ message: "user is deleted successfully" });
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

module.exports = {
  listallUsers,
  getUserDetails,
  createUser,
  updateUser,
  deleteUser,
};
