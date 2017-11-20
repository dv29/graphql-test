const Hapi = require('hapi');
const config = require('config');
const { graphqlHapi, graphiqlHapi } = require('apollo-server-hapi');
const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

const schema = require('./user/user.schema');

const IS_PRODUCTION = process.env.NODE_ENV === 'production';

const server = new Hapi.Server();
server.connection({ port: config.get('port') });

const GRAPHQL_PATH = '/graphql';

const plugins = [{
	register: graphqlHapi,
	options: {
		path: GRAPHQL_PATH,
		graphqlOptions: {
			schema,
		},
		route: {
			cors: true,
		},
	},
}];

if (!IS_PRODUCTION) {
	plugins.push({
		register: graphiqlHapi,
		options: {
			path: '/graphiql',
			graphiqlOptions: {
				endpointURL: GRAPHQL_PATH,
			},
		},
	});
}

/**
 * start the server
 * @return {HapiServer}
 */
const start = () => (
	server.register(plugins, (err) => {
		if (err) {
			// TODO: add support for logger, maybe winston logger?
			return console.error(err);
		}

		server.start((error) => {
			if (error) {
				throw error;
			}
			console.log(`Server running at: ${server.info.uri}`); // eslint-disable-line no-console
		});
		return null;
	})
);

const connectToDb = () => {
	// TODO: add authentication to mongodb
	mongoose.connect(`mongodb://${config.get('database.host')}:${config.get('database.port')}/${config.get('database.name')}`)
		.then(() => start())
		.catch(() => {
			setTimeout(() => connectToDb(), 5000);
		});
};

connectToDb();
