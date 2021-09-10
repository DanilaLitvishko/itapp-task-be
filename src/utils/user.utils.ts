import * as bcrypt from 'bcrypt';

export const createPasswordHash = async (password: string): Promise<string> => {
  const saltRounds = 10;
  const salt = await bcrypt.genSalt(saltRounds);
  const hash = await bcrypt.hash(password, salt);
  return hash;
};

export const checkPassword = async (
  oldPassword: string,
  newPassword: string,
): Promise<boolean> => {
  return bcrypt.compare(newPassword, oldPassword);
};
