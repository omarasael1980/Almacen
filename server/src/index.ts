 import server from "./server";
 import colors from "colors";
 import dotenv from "dotenv";

    dotenv.config();

server.listen(process.env.PORT || 3000, () => {
    console.log(colors.bgCyan.bold(`API running on port ${process.env.PORT}` ));
}
);
 