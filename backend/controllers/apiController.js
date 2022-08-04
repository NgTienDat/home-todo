const hello = (request, response) => {
	response.json({ greetings: "Hello!" });
};

export default { hello };
