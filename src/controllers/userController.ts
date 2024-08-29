import { Request, Response, NextFunction } from "express";
import { AppDataSource } from "../data-source"; // Ensure correct path
import { User } from "../entity/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

/**
 * @swagger
 * /auth/:
 *   get:
 *     summary: Retrieve a list of users
 *     responses:
 *       200:
 *         description: List of users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: 'components/schemas/User'
 */
export const getUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userRepository = AppDataSource.getRepository(User);
    const users = await userRepository.find();
    res.json(users);
  } catch (error) {
    next(error);
  }
};

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Create a new user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *            $ref: 'components/schemas/User'
 *     responses:
 *       201:
 *         description: User created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user:
 *                   $ref: 'components/schemas/User'
 *                 token:
 *                   type: string
 *     security:
 *       - bearerAuth: []
 */
export const createUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ error: "Name, email, and password are required" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const userRepository = AppDataSource.getRepository(User);
    const user = userRepository.create({
      name,
      email,
      password: hashedPassword,
    });

    const result = await userRepository.save(user);

    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET ?? "secret_jwt",
      {
        expiresIn: "1d",
      }
    );

    res.status(201).json({ user: result, token });
  } catch (error) {
    next(error);
  }
};

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login a user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: User logged in
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 name:
 *                   $ref: 'components/schemas/User'
 *                 email:
 *                   type: string
 *                 password:
 *                   type: string
 *       400:
 *         description: Invalid credentials
 */
export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }

    const userRepository = AppDataSource.getRepository(User);
    const user = await userRepository.findOneBy({ email });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET ?? "secret_jwt",
      {
        expiresIn: "1d",
      }
    );

    res.json({
      user: { id: user.id, name: user.name, email: user.email },
      token,
    });
  } catch (error) {
    next(error);
  }
};
