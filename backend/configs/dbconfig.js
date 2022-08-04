import mysql from "mysql2";
var connection = {
	host: "localhost",
	user: "root",
	password: "123456",
	database: "todoappdb",
};

export const dataSource = mysql.createConnection(connection);
