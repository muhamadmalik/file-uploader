import express from 'express';
import { 
    getFolder, addFolder, delFolder, 
    getFilesController, addFileController, deleteFileController 
} from '../controller/drive.controllers';
import { upload } from '../controller/upload';

const driveRouter = express.Router();


driveRouter.get('/', getFolder); 
driveRouter.post('/', addFolder); 
driveRouter.delete('/:id', delFolder); 

driveRouter.get('/files', getFilesController);
driveRouter.post('/file/upload', upload.single('file') ,addFileController); 
driveRouter.delete('/files/:id', deleteFileController); 

export default driveRouter;                    