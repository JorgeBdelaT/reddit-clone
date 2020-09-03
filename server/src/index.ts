import { MikroORM } from '@mikro-orm/core';

import mikroConfig from './mikro-orm.config';
import { Post } from './entities/Post';

const main = async () => {
  try {
    const orm = await MikroORM.init(mikroConfig);
    await orm.getMigrator().up();

    // const post = orm.em.create(Post, { title: 'my first post' });
    // await orm.em.persistAndFlush(post);
  } catch (error) {
    console.log(error);
  }
};

main();
