const User = require('./user.model');
const faker = require('faker');
const mongoose = require('mongoose');
const config = require('config');
mongoose.Promise = require('bluebird');


const connectToDb = () => {
	// TODO: add authentication to mongodb
	mongoose
		.connect(`mongodb://${config.get('database.host')}:${config.get('database.port')}/${config.get('database.name')}`, {
			useMongoClient: true,
		})
		.then(() => {
			const seedData = [];

			for (let i = 0; i < 100; i++) {
				seedData.push({
					name: faker.name.firstName(),
					surname: faker.name.lastName(),
					location: faker.fake('{{address.city}}, {{address.countryCode}}'),
				});
			}

			User
				.collection
				.remove()
				.then(() => User.create(seedData))
				.then(() => process.exit())
				.catch(console.error);
		})
		.catch(() => {
			setTimeout(() => connectToDb(), 5000);
		});
};

connectToDb();
