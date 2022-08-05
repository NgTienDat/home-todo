import express from "express";
import cors from "cors";
import { router } from "./routers/apiRouter.js";
import { dataSource } from "./configs/dbconfig.js";
import { authenticationMiddleware } from "./middleware/auth.middleware.js";

var corsOptions = {
	origin: ["http://localhost:4200"],
	credentials: true,
};
const app = express();

dataSource.connect(function (err) {
	if (err) throw err;
	console.log("db connected!");
});

app.use(cors(corsOptions));
app.use(express.json());
app.use(authenticationMiddleware);
app.use("/api", router);

app.listen(process.env.PORT || 3000, () =>
	console.log("App available on http://localhost:3000")
);
