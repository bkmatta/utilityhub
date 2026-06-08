import { Router, type IRouter } from "express";
import healthRouter from "./health";
import pushTokensRouter from "./push-tokens";

const router: IRouter = Router();

router.use(healthRouter);
router.use(pushTokensRouter);

export default router;
