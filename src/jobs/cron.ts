import cron from "node-cron";
import { autReturnScheduller } from "./autoReturn";


export const cornScheduller = () => {
   cron.schedule("*/5 * * * *", async ()=>{
    console.log("running auto Return");
    await autReturnScheduller();
   })
}