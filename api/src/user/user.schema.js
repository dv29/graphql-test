const {
	GraphQLObjectType,
	GraphQLString,
	GraphQLSchema,
	GraphQLList,
} = require('graphql');
const User = require('./user.model');

const UserType = new GraphQLObjectType({
	name: 'UserType',
	fields: () => ({
		id: { type: GraphQLString },
		name: { type: GraphQLString },
		surname: { type: GraphQLString },
		location: { type: GraphQLString },
	}),
});

const getProjections = (fields) => (
	fields.fieldNodes[0].selectionSet.selections.reduce((projections, selection) => {
		projections[selection.name.value] = true;
		return projections;
	}, {})
);

const RootQuery = new GraphQLObjectType({
	name: 'RootQueryType',
	fields: {
		users: {
			type: new GraphQLList(UserType),
			args: {
				searchText: { type: GraphQLString },
			},
			resolve: (parentValue, { searchText }, source, fields) => (
				searchText ?
					User.find({ $text: { $search: searchText } }, getProjections(fields)) :
					User.find({})
			),
		},
	},
});

module.exports = new GraphQLSchema({
	query: RootQuery,
});
