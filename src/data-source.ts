import { DataSource } from "typeorm";
import { User } from "./entity/User";
import { Organization } from "./entity/Organization";
import { Item } from "./entity/Items";

export const AppDataSource = new DataSource({
  type: "postgres",
  url: process.env.DATABASE_URL,
  entities: [User, Organization, Item],
  synchronize: true,
  logging: true,
  ssl: false,
});
