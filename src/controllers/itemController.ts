import { Request, Response, NextFunction } from "express";
import { Item } from "../entity/Items";
import { AppDataSource } from "../data-source";

/**
 * @swagger
 * /item/create-item:
 *   post:
 *     summary: Create a new item
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               organizationName:
 *                 type: string
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       201:
 *         description: Item created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 organization:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                     organizationName:
 *                       type: string
 *                     organizationFounder:
 *                       type: string
 *                     creatorEmail:
 *                       type: string
 *       400:
 *         description: Bad request
 *     security:
 *       - bearerAuth: []
 */
export const createItem = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { organizationName, name, description } = req.body;

    if (!organizationName || !name || !description) {
      return res.status(400).json({
        error: "Item name and description are required",
      });
    }
    //@ts-ignore
    const creatorEmail = req.user?.email;

    if (!creatorEmail) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const itemRepository = AppDataSource.getRepository(Item);
    const item = itemRepository.create({
      organizationName,
      name,
      description,
      creatorEmail,
    });

    const result = await itemRepository.save(item);

    res.status(201).json({ organization: result });
  } catch (error) {
    next(error);
  }
};
