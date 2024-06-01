const {
  createUser,
  findUserByEmail,
  findUserByEmailAndPassword,
} = require("../models/userModel");
const generateID = require("../utils/generateID");

const register = async (req, res) => {
  const { email, password, username } = req.body;
  const id = generateID();

  try {
    const existingUser = await findUserByEmail(email);

    if (existingUser) {
      return res.json({ error_message: "User already exists" });
    }

    await createUser(id, email, password, username);
    res.json({ message: "Account created successfully!" });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ error_message: "Internal Server Error" });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await findUserByEmailAndPassword(email, password);

    if (!user) {
      return res.json({ error_message: "Incorrect credentials" });
    }

    res.json({ message: "Login successfully", id: user.id });
  } catch (error) {
    console.error("Error logging in user:", error);
    res.status(500).json({ error_message: "Internal Server Error" });
  }
};

module.exports = {
  register,
  login,
};
