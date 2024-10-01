import { Sequelize } from "sequelize-typescript";
import dotenv from "dotenv";
import Product from "../models/Products";
dotenv.config();
const db = new Sequelize(`${process.env.DB_URL}`, {
    models: [Product]  ,
    logging: false
});
export default db;