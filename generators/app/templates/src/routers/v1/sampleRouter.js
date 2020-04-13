import express from "express";

import { sampleController } from "@<%= appNameUpperCamelCase %>/controllers/sample";

const loginRouter = express.Router();

loginRouter.post("/login", sampleController);

export default loginRouter;
