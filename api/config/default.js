module.exports = {
	port: process.env.PORT || 4001,
	database: {
		host: process.env.DB_HOST,
		port: process.env.DB_PORT,
		name: 'zen_dev',
	},
};
