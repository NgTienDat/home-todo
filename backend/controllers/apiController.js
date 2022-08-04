import { DbService } from "../services/db.service.js";
import bcrypt from "bcryptjs";

const addTask = (req, res) => {
	let description = req.body.description;
	let userId = req.body.userId;
	if (description && Number(userId)) {
		DbService.addTaskToDb(userId, description, function (id) {
			DbService.getTaskFromDb(id, function (task) {
				res.status(200).json(task);
			});
		});
	} else {
		res.status(400).json({ error: "bad inputs!" });
	}
};

const removeTask = (req, res) => {
	let id = req.body.id;
	if (id) {
		DbService.removeTaskFromDb(id);
		res.status(200).json({ message: "task deleted" });
	} else {
		res.status(400).json({ error: "bad input!" });
	}
};

const getTasks = (req, res) => {
	let userId = req.body.id; //will be from token
	if (Number(userId)) {
		DbService.getAllTasksFromDb(userId, function (data) {
			res.status(200).json(data);
		});
	} else {
		res.status(400).json({ error: "Bad input!" });
	}
};

const registerUser = async (req, res) => {
	if (req.body.username && req.body.password) {
		let username = req.body.username;
		let salt = await bcrypt.genSalt();
		let password = await bcrypt.hash(req.body.password.toString(), salt);
		DbService.addUserToDb(username, password).then(() => {
			res.status(200).json({ message: "user added!" });
		});
	} else {
		res.status(400).json({ error: "Bad input!" });
	}
};

const loginUser = (req, res) => {
	if (req.body.username && req.body.password) {
		let username = req.body.username;
		DbService.isUserInDb(username, async function (result) {
			if (
				result.length == 1 &&
				(await bcrypt.compare(req.body.password.toString(), result[0].password))
			) {
				res.status(200).json({ message: "ok" });
				//will send token here
			} else {
				res.status(400).json({ error: "invalid username or password" });
			}
		});
	} else {
		res.status(400).json({ error: "Bad inputs!" });
	}
};

export default { addTask, getTasks, registerUser, loginUser, removeTask };
