import { Sequelize } from 'sequelize-typescript';

import { User } from 'src/modules/common/entities/users/user.entity';
import { Chatroom } from 'src/modules/messenger/entities/chatroom/chatroom.entity';
import { UsersChatrooms } from 'src/modules/messenger/entities/users-chatrooms/users-chatroom.entity';
import { Category } from 'src/modules/ecommerce/entities/category/category.entity';
import { Product } from 'src/modules/ecommerce/entities/product/product.entity';
import { Message } from 'src/modules/messenger/entities/message/message.entity';
import { PurchaseHistory } from 'src/modules/ecommerce/entities/purchase-history/purchase-history.entity';
import { Blog } from 'src/modules/blog/entities/blog/blog.entity';
import { Post } from 'src/modules/blog/entities/post/post.entity';
import { Comment } from 'src/modules/blog/entities/comments/comment.entity';
import { Follower } from 'src/modules/blog/entities/followers/follower.entity';
import { PostsUsers } from 'src/modules/blog/entities/posts-users/posts-users.entity';
import { CommentsUsers } from 'src/modules/blog/entities/comments-users/comments-users.entity';
import { Card } from 'src/modules/ecommerce/entities/card/card.entity';
import { SEQUELIZE_PROVIDER } from 'src/modules/common/constants/providers';
import configuration from 'config/configuration';

const config = configuration();

export const database = async (): Promise<Sequelize> => {
  const sequelize = new Sequelize(config.database);
  sequelize.addModels([
    User,
    Category,
    Product,
    PurchaseHistory,
    Chatroom,
    UsersChatrooms,
    Message,
    Blog,
    Post,
    Comment,
    PostsUsers,
    Follower,
    CommentsUsers,
    Card,
  ]);
  await sequelize.sync();

  return sequelize;
};

export const databaseProviders = [
  {
    provide: SEQUELIZE_PROVIDER,
    useFactory: async () => database(),
  },
];
