import db from '../config/prisma';

export const getFiles = async (userId) => {
  return await db.file.findMany({ where: { userId } });
};
export const addFile = async (url, userId, filename: string, folderId: null | number = null) => {
  return await db.file.create({ data: { url, userId, filename, folderId } });
};
export const deleteFile = async (id) => {
  return await db.file.delete({ where: { id } });
};

export const createFolder = async (name, userId) => {
  return await db.folder.create({ data: { name, userId } });
};
export const getFolders = async (userId) => {
  return await db.folder.findMany({ where: { userId } });
};
export const deleteFolder = async (id) => {
  return db.folder.delete({ where: { id } });
};
