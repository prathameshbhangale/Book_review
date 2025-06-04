import User from "../model/User.js"
import bcrypt from "bcrypt";


export const registerUser = async (req, res) =>{
    const { name, email, password } = req.body;

    if (!name || !email || !password ) {
        return res.status(400).json({ success: false, message: "All fields are required" });
    }

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ success: false, message: "Email is already registered" });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            name,
            email,
            passwordHash: hashedPassword,
        });
        await newUser.save();
        return res.status(201).json({
            success: true,
            message: "User registered successfully",
            userId: newUser._id,
        });

    } catch (error) {
        return res.status(500).json({
        success: false,
        message: "An error occurred during registration",
    }); 
    }
}