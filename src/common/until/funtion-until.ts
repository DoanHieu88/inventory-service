import * as bcryptjs from 'bcryptjs';

export const hashPassword = async (password: string) => {
  const saltOrRounds = 10;
  const hash = await bcryptjs.hash(password, saltOrRounds);
  return hash;
};

export const nextChar = (c: string) => {
  return String.fromCharCode(c.charCodeAt(0) + 1);
};
