import { Shopkeeper } from "../models/shopkeeper.model.js";

export const Register = async (req, res) => {
  const { email, password, name } = req.body;
  try {
    if (!email || !password || !name) {
      return res.status(400).json({
        message: "email password and name is required!",
      });
    }
    const existingShopkeeper = await Shopkeeper.findOne({ email });

    if (existingShopkeeper) {
      return res.status(400).json({
        message: "email already exists! please login.",
      });
    }

    const shopkeeper = new Shopkeeper({ email, password, name });

    await shopkeeper.save();

    res.status(201).json({ message: "Shopkeeper created! ", shopkeeper });
  } catch (error) {
    console.error("Error registering shopkeeper:", error);
    res.status(500).json({ message: "Server error", error });
  }
};

export const Login = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res.status(400).json({
        message: "email and password is required!",
      });
    }

    const existingShopkeeper = await Shopkeeper.findOne({ email });

    if (!existingShopkeeper) {
      return res.status(400).json({
        message: "email not registered! please register.",
      });
    }

    const isMatch = await existingShopkeeper.comparePassword(password);

    if (!isMatch) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    const token = existingShopkeeper.generateToken();
    console.log(process.env.NODE_ENV);

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 3600000,
    });

    res.status(200).json({ message: "shopkeeper Logged in! " });
  } catch (error) {
    console.error("Error registering shopkeeper", error);
    res.status(500).json({ message: "Server error", error });
  }
};
