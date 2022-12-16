import { Router } from "express";
import DecoratorRouter from "../decorators/router.decorators";
const router = Router();
router.use(DecoratorRouter)
export default router;