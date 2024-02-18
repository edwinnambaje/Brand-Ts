import { NextFunction, Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User, { IUser } from '../models/user';
import dotenv from 'dotenv';

dotenv.config()
console.log(process.env.JWT_SECRET);

const authController = {
    signup: async (req: Request, res: Response) => {
        try {
            const { username, password, email } = req.body;
            const existingUser = await User.findOne({ email });
            if (existingUser) {
                return res.status(400).json({ error: 'User already exists' });
            }
            const newUser: IUser = new User({ username, password, email });
            await newUser.save();
            return res.status(201).json({ message: 'User created successfully' });
        } catch (error) {
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    },

    signin: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { email, password } = req.body;
            const user = await User.findOne({
                email
            })
            if (!user) {
                return res.status(404).json({
                    message: "User not found"
                })
            }
            const passwordMatch = await bcrypt.compare(password, user.password);
 
            if (!passwordMatch) {
              return res.status(400).json({ message: "Incorrect password" });
            }
            const token = jwt.sign(
                { username: user.username },
                process.env.JWT_SECRET || "ghjvbnvghxsbdchjndhgchbyeewye9876",
                {
                  expiresIn: "1h",
                }
              );
              return res.json({ message: "Logged in successfully", token })
        } catch (error) {
            return res.status(500).json(error)
        }
    }
};

export default authController;
