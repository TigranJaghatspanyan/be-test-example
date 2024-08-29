import { Request, Response, NextFunction } from "express";
import { Organization } from "../entity/Organization";
import { AppDataSource } from "../data-source";

/**
 * @swagger
 * /organization/create-organization:
 *   post:
 *     summary: Create a new organization
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               organizationName:
 *                 type: string
 *               organizationFounder:
 *                 type: string
 *     responses:
 *       201:
 *         description: Organization created
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
export const createOrganization = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { organizationName, organizationFounder } = req.body;

    if (!organizationName || !organizationFounder) {
      return res.status(400).json({
        error: "Organization name and Organization Founder are required",
      });
    }
    //@ts-ignore
    const creatorEmail = req.user?.email;

    if (!creatorEmail) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const organizationRepository = AppDataSource.getRepository(Organization);
    const organization = organizationRepository.create({
      organizationName,
      organizationFounder,
      creatorEmail,
    });

    const result = await organizationRepository.save(organization);

    res.status(201).json({ organization: result });
  } catch (error) {
    next(error);
  }
};
