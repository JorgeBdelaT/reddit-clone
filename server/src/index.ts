import 'reflect-metadata';
import { MikroORM } from '@mikro-orm/core';
import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';
import redis from 'redis';
import session from 'express-session';
import connectRedis from 'connect-redis';

import mikroConfig from './mikro-orm.config';
import { PORT, REDIS_SECRET, PRODUCTION } from './constants';
import { HelloResolver } from './resolvers/hello';
import { PostResolver } from './resolvers/post';
import { UserResolver } from './resolvers/user';
import { MyContext } from './types';

const main = async () => {
  try {
    // Database connection
    const orm = await MikroORM.init(mikroConfig);
    await orm.getMigrator().up();

    // App initialization
    const app = express();

    const RedisStore = connectRedis(session);
    const redisClient = redis.createClient();

    app.use(
      session({
        name: 'qid',
        store: new RedisStore({
          client: redisClient,
          disableTouch: true,
          host: '127.0.0.1',
          port: 6379,
        }),
        cookie: {
          maxAge: 1000 * 60 * 60 * 24 * 365 * 10,
          httpOnly: true,
          sameSite: 'lax', // csrf
          secure: PRODUCTION,
        },
        saveUninitialized: false,
        secret: REDIS_SECRET,
        resave: false,
      })
    );

    const apolloServer = new ApolloServer({
      schema: await buildSchema({
        validate: false,
        resolvers: [HelloResolver, PostResolver, UserResolver],
      }),
      context: ({ req, res }): MyContext => ({ em: orm.em, req, res }),
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
