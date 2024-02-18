import { Router } from "express"
import blogRouter from "./blog";
import messageRouter from "./message";
import router from "./user";

const route = Router()

route.use("/blogs",blogRouter)
route.use("/auth",router)
route.use("/message",messageRouter)
export default route

