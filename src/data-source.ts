import { DataSource } from 'typeorm';
import { User } from './entity/User';
import { Organization } from './entity/Organization';
import { Item } from './entity/Items';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'admin',
  password: 'admin',
  database: 'mydatabase',
  entities: [User, Organization, Item],
  synchronize: true,
  logging: true,
});
