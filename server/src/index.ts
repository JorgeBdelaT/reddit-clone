import 'reflect-metadata';
import { MikroORM } from '@mikro-orm/core';
import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';

import mikroConfig from './mikro-orm.config';
import { PORT } from './constants';
import { HelloResolver } from './resolvers/hello';
import { PostResolver } from './resolvers/post';

const main = async () => {
  try {
    // Database connection
    const orm = await MikroORM.init(mikroConfig);
    await orm.getMigrator().up();

    // App initialization
    const app = express();

    const apolloServer = new ApolloServer({
      schema: await buildSchema({
        validate: false,
        resolvers: [HelloResolver, PostResolver],
      }),
      context: () => ({ em: orm.em }),
    });

    apolloServer.applyMiddleware({ app });

    app.listen(PORT, () => {
      console.log(`app running on port ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
};

main();
