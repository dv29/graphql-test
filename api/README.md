Install docker from https://www.docker.com/ depending on your system.

Install docker compose from https://docs.docker.com/compose/install/#install-compose

Move to api directory and run `docker-compose up`

After everything is up run `docker exec graphql-api npm run seed` to seed db with fake data
This will add 100 users

React app is running at : `http://localhost:3000`

Api is running at : `http://localhost:4001`

Graphiql is running at : `http://localhost:4001/graphiql`
Graphql is running at : `http://localhost:4001/graphql`
