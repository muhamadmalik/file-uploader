import { createFolder, deleteFolder, getFiles, getFolders, addFile, deleteFile } from "../db/models/drive";

// 🔹 Get all folders of a user
export const getFolder = async (req, res) => {
    try {
        const folders = await getFolders(req.user.id); 
        res.json(folders);
    } catch (error) {
        res.status(500).json({ message: "Error fetching folders", error });
    }
};

// 🔹 Add a folder
export const addFolder = async (req, res) => {
    try {
        const { name } = req.body; // Take folder name from request body
        const folder = await createFolder(name, req.user.id);
        res.status(201).json(folder);
    } catch (error) {
        res.status(500).json({ message: "Error creating folder", error });
    }
};

// 🔹 Delete a folder
export const delFolder = async (req, res) => {
    try {
        const { id } = req.params; // Use req.params for ID
        await deleteFolder(parseInt(id));
        res.json({ message: "Folder deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting folder", error });
    }
};

// 🔹 Get files for a user
export const getFilesController = async (req, res) => {
    try {
        const files = await getFiles(req.user.id);
        res.json(files);
    } catch (error) {
        res.status(500).json({ message: "Error fetching files", error });
    }
};

export const addFileController = async (req, res) => {
    try {
        // const { url, filename, folderId } = req.body;
        // const parsedFolderId = folderId ? parseInt(folderId, 10) : null;
        console.log(req.file)
        // const file = await addFile(url, req.user.id, filename, parsedFolderId);
        // res.status(201).json(file);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error adding file", error: error.message });
    }
};
// export const addFileController = async (req, res) => {
//     try {
//         const { url, filename, folderId } = req.body;
//         const parsedFolderId = folderId ? parseInt(folderId, 10) : null;
//         console.log(req.body)
//         const file = await addFile(url, req.user.id, filename, parsedFolderId);
//         res.status(201).json(file);
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: "Error adding file", error: error.message });
//     }
// };

// 🔹 Delete a file
export const deleteFileController = async (req, res) => {
    try {
        const { id } = req.params;
        await deleteFile(parseInt(id));
        res.json({ message: "File deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting file", error });
    }
};
