import db from '../config/prisma';

export const getFiles = async (userId) => {
  return await db.file.findMany({ where: { userId } });
};

export const createFolder = async (name, userId) => {
  return await db.folder.create({ data: { name, userId } });
};
export const addFile = async (url, userId, filename, folderId) => {
  return await db.file.create({ data: { url, userId, filename, folderId } });
};

export const deleteFile = async (id) => {
  return await db.file.delete({ where: { id } });
};
