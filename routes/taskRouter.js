import { Router } from "express";

const taskRouter = Router();
import authenticate from "../middlewares/authenticate.js";

taskRouter.get("/jwt", authenticate, (req, res) => {
  res.send("JWT is working");
});

export default taskRouter;
