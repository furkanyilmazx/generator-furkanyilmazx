import express from "express";

import { sampleController } from "@<%= appNameUpperCamelCase %>/controllers/sample";

const loginRouter = express.Router();

loginRouter.get("/", sampleController);

export default loginRouter;
