import express from "express";
import productsRouter from "./routes/ProductsRoutes"
import db from "./config/db";
import colors from "colors";
import swaggerUI from "swagger-ui-express";
import swaggerSpec from "./config/swagger";
const server = express();
// Connect to the database 
export async function connect() {
    try {
        await db.authenticate();
       // console.log(colors.bgGreen.bold.white('Connection has been established successfully.'));
        db.sync();
      //  console.log(colors.bgGreen.bold.white('Database synchronized successfully.'));
    } catch (error) {
        console.log(colors.bgRed.bold.white('Unable to connect to the database:'));
    }
}
connect(); 
server.use(express.json());
server.use('/api/products', productsRouter);
server.use('/api/docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec));  
export default server;  