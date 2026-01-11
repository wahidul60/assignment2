import dotenv from "dotenv";
import path from "path";

dotenv.config({
    path: path.join(process.cwd(), ".env")
})

const config = {
    Port : process.env.PORT,
    connection_str : `${process.env.CONNECTION_STRING}`
}

console.log("port is:", config.Port)

export default config