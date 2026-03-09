import dotenv from "dotenv";
import path from "path";

dotenv.config({
    path: path.join(process.cwd(), ".env")
})

const config = {
    Port : process.env.PORT,
    connection_str : `${process.env.CONNECTION_STRING}`,
    Secret : "RSASSA-PKCS1-v1_5 using SHA-256" 
}

console.log("port is:", config.Port)

export default config