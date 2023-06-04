//grabbing the typeDefs exports
const typeDefs = require('./typeDefs');
//grabbing the resolvers exports
const resolvers = require('./resolvers');

//exporting both of these to be used in server
module.exports = { typeDefs, resolvers };
