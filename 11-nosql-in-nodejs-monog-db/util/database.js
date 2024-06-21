const { MongoClient } = require("mongodb");

let _db;

const uri = "Your cluster URI";
// "mongodb+srv://patidarrambabu135:<password>@learningnodecluster01.q631tqm.mongodb.net/shop?retryWrites=true&w=majority&appName=LearningNodeCluster01";

const mongoConnect = (callback) => {
	MongoClient.connect(uri)
		.then((client) => {
			console.log("connected");
			_db = client.db();
			callback();
		})
		.catch((err) => {
			console.log(err);
			throw err;
		});
};

const getDb = () => {
	if (_db) {
		return _db;
	}
	throw "No database found!";
};

module.exports = { mongoConnect, getDb };
