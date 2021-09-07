/* eslint-disable no-console */
import { ESClient } from 'src/modules/common/providers/elastic-search/elastic-search.provider';
import { User } from 'src/modules/common/entities/users/new-user.entity';

const es = ESClient();
export const usersIndex = 'users';
export const usersType = '_doc';

export const searchUserFields = ['firstName', 'lastName', 'email'];

export const deleteESUser = async (user: User): Promise<void> => {
  try {
    const { id } = user;
    await es.delete({
      index: usersIndex,
      type: usersType,
      id,
    });
  } catch (e) {
    console.error(e);
  }
};

export const createESUser = async (user: User): Promise<void> => {
  try {
    const { firstName, id, lastName, email } = user;

    const { body } = await es.exists({
      index: usersIndex,
      id,
    });

    if (body) {
      await deleteESUser(user);
    }

    await es.create(
      {
        index: usersIndex,
        type: usersType,
        id,
        body: { firstName, lastName, email },
      },
      (err, resp, status) => {
        if (err) {
          console.error(err, status);
        } else {
          console.log('Successfully Created Index', status, resp);
        }
      }
    );
  } catch (e) {
    console.error(e);
  }
};
