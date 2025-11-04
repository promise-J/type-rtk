import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken'
import { AuthRequest } from "../types/express";

const auth = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({ message: "Unauthorized access to this resource. Please login" });
        }
        const token = authHeader.split(" ")[1];
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN!) as { id: string };
        // Verify token logic here (e.g., using JWT)

        // If token is valid, attach user info to req object
        req.user = { id: decoded.id }; // Example user info
        next();

    } catch (error) {
        return res.status(401).json({ message: "Invalid token" });
    }
}

export default auth