const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
	"node-complete",
	"root",
	"RambabuSQLServer135@",
	{
		dialect: "mysql",
		host: "localhost",
	}
);

module.exports = sequelize;
