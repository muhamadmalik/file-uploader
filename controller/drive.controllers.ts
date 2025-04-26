import {
  createFolder,
  deleteFolder,
  getFiles,
  getFolders,
  addFile,
  deleteFile,
  getFile,
  getFolder
} from '../db/models/drive';
import { delCloudFile, uploadToCloudinary } from './upload';

export const getFolderController = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(typeof(parseInt(id)))
    const folder = await getFolder(parseInt(id));

    res.json(folder);
  } catch (error) {
    res.status(500).json({ message: 'Error fetchasdfasdfing folder', error });
  }
};
export const getFoldersController = async (req, res) => {
  try {
    const folder = await getFolders(req.user.id);
    res.json(folder);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching kjkjfolders', error });
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
    console.log(req.user.id)
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
      // return res.render('upload', { message: 'No file uploaded', error: true });
      return res.status(400).json({ message: 'No file uploaded' });
    }

    const cloudinaryUrl = await uploadToCloudinary(req.file.path);
    if (!cloudinaryUrl) {
      return res.status(500).json({ message: 'Cloud upload failed' });
    }

    const filename = req.file.originalname;
    const parsedFolderId = folderId ? parseInt(folderId, 10) : null;

    const newFile = await addFile(
      cloudinaryUrl,
      req.user.id,
      filename,
      parsedFolderId
    );

    // return res.render('upload', {
    //   message: 'File Uploaded successfully',
    //   error: false,
    //   url: cloudinaryUrl,
    // });
    return res
      .status(201)
      .json({ message: 'File Uploaded successfully', file: newFile });
  } catch (error) {
    console.error(error);
    // res.render('upload', { message: 'An error occurred', error: true });
    res
      .status(500)
      .json({
        message: 'An error occurred during file upload',
        error: error.message,
      });
  }
};

export const deleteFileController = async (req, res) => {
  try {
    const { id } = req.params;
    const file = await getFile(parseInt(id));
    if (!file) {
      return res.status(404).json({ message: 'File not found' });
  }
    await delCloudFile(file?.url);
    await deleteFile(parseInt(id));

res.json({ message: 'File deleted successfully', deletedFileId: parseInt(id) });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting file', error: error.message });
  }
}