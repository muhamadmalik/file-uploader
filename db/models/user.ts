import db from '../config/prisma';

export const createUser = async (username: string, password: string) => {
    
  return await db.user.create({
    data: { username, password },
  });
};

export const findUser = async (username: string) => {
  return await db.user.findUnique({
    where: { username },
  });
};

export const findUserById = async (id: number) => {
  return await db.user.findUnique({
    where: { id },
    include: {
      files: true,
      folders: {
        include: { files: true },
      },
    },
  });
};

export const getUsers = async () => {
  return await db.user.findMany();
};
