import express from 'express';
import { 
    getFolderController, addFolder, delFolder, getFoldersController, 
    getFilesController, addFileController, deleteFileController 
} from '../controller/drive.controllers';
import { upload } from '../controller/upload';

const driveRouter = express.Router();



driveRouter.delete('/files/:id', deleteFileController); 
driveRouter.get('/files', getFilesController);
driveRouter.post('/file/upload', upload.single('file') , addFileController); 
driveRouter.get('/', getFoldersController); 
driveRouter.get('/:id', getFolderController); 
driveRouter.post('/', addFolder); 
driveRouter.delete('/:id', delFolder);


export default driveRouter;                    