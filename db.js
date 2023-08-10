import { Sequelize } from "sequelize";

export default new Sequelize(
  'dns_store',
  'postgres',
  'root',
  {
    dialect: 'postgres',
    host: 'localhost',
    port: 5432
  }
)