import { MikroORM } from '@mikro-orm/core';
import path from 'path';

import { PRODUCTION, POSTGRES_PSW } from './constants';
import { Post } from './entities/Post';

export default {
  migrations: {
    path: path.join(__dirname, './migrations'), // path to the folder with migrations
    pattern: /^[\w-]+\d+\.[tj]s$/, // regex pattern for the migration files
  },
  entities: [Post],
  type: 'postgresql',
  dbName: 'reddit-clone',
  password: POSTGRES_PSW,
  debug: PRODUCTION,
} as Parameters<typeof MikroORM.init>[0];
