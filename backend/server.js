import express from "express";
import cors from "cors";
import { router } from "./routers/apiRouter.js";

var corsOptions = {
	origin: ["http://localhost:4200"],
	credentials: true,
};
const app = express();
app.use(cors(corsOptions));
app.use(express.json());
app.use("/api", router);

app.listen(process.env.PORT || 3000, () =>
	console.log("App available on http://localhost:3000")
);
