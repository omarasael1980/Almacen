import express from "express";
import productsRouter from "./routes/ProductsRoutes"
import db from "./config/db";
import colors from "colors";
const server = express();
// Connect to the database 
async function connect() {
    try {
        await db.authenticate();
        console.log(colors.bgGreen.bold.white('Connection has been established successfully.'));
        db.sync();
        console.log(colors.bgGreen.bold.white('Database synchronized successfully.'));
    } catch (error) {
        console.error(colors.bgRed.white('Unable to connect to the database:'));
    }
}
connect(); 
server.use(express.json());
server.use('/api/products', productsRouter);

export default server;  