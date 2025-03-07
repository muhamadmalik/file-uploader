import {
  createFolder,
  deleteFolder,
  getFiles,
  getFolders,
  addFile,
  deleteFile,
  getFile,
} from '../db/models/drive';
import { delCloudFile, uploadToCloudinary } from './upload';

export const getFolder = async (req, res) => {
  try {
    const folders = await getFolders(req.user.id);
    res.json(folders);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching folders', error });
  }
};

export const addFolder = async (req, res) => {
  try {
    const { name } = req.body;
    const folder = await createFolder(name, req.user.id);
    res.status(201).json(folder);
  } catch (error) {
    res.status(500).json({ message: 'Error creating folder', error });
  }
};

export const delFolder = async (req, res) => {
  try {
    const { id } = req.params;
    await deleteFolder(parseInt(id));
    res.json({ message: 'Folder deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting folder', error });
  }
};

export const getFilesController = async (req, res) => {
  try {
    const files = await getFiles(req.user.id);
    res.json(files);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching files', error });
  }
};

export const addFileController = async (req, res) => {
  const { folderId } = req.body;
  try {
    if (!req.file) {
      return res.render('upload', { message: 'No file uploaded', error: true });
    }

    const cloudinaryUrl = await uploadToCloudinary(req.file.path);
    if (!cloudinaryUrl) {
      return res.render('upload', { message: 'Upload failed', error: true });
    }

    const filename = req.file.originalname;
    const parsedFolderId = folderId ? parseInt(folderId, 10) : null;

    await addFile(cloudinaryUrl, req.user.id, filename, parsedFolderId);

    return res.render('upload', {
      message: 'File Uploaded successfully',
      error: false,
      url: cloudinaryUrl,
    });
  } catch (error) {
    console.error(error);
    res.render('upload', { message: 'An error occurred', error: true });
  }
};

export const deleteFileController = async (req, res) => {
  try {
    const { id } = req.params;
    const file = await getFile(parseInt(id));
    await delCloudFile(file?.url);
    await deleteFile(parseInt(id));

    res.json({ message: 'File deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting file', error });
  }
};
