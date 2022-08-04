import { callbackify } from "util";
import { dataSource } from "../configs/dbconfig.js";

export class DbService {
	static async addTaskToDb(userId, description, callback) {
		var sql =
			"INSERT INTO tasks(description, userId) VALUES ('" +
			description +
			"', '" +
			userId +
			"')";
		dataSource.query(sql, function (err, result) {
			if (err) throw err;
			return callback(result.insertId);
		});
	}

	static async removeTaskFromDb(id) {
		var sql = "DELETE FROM tasks WHERE id='" + id + "'";
		dataSource.query(sql, function (err) {
			if (err) throw err;
		});
	}

	static async getTaskFromDb(taskId, callback) {
		var sql =
			"SELECT id, description, isDone FROM tasks WHERE id='" + taskId + "'";
		dataSource.query(sql, function (err, result) {
			if (err) throw err;
			return callback(result[0]);
		});
	}

	static async getAllTasksFromDb(userId, callback) {
		var sql =
			"SELECT id, description, isDone FROM tasks WHERE userId='" +
			userId +
			"' ";
		dataSource.query(sql, function (err, result) {
			if (err) throw err;
			return callback(result);
		});
	}

	static async addUserToDb(username, password) {
		var sql =
			"INSERT INTO users(username, password) VALUES('" +
			username +
			"', '" +
			password +
			"')";
		dataSource.query(sql, function (err) {
			if (err) throw err;
		});
	}

	static async isUserInDb(username, callback) {
		var sql = "SELECT password FROM users WHERE username='" + username + "' ";
		dataSource.query(sql, function (err, result) {
			if (err) throw err;
			return callback(result);
		});
	}
}
