import { Router } from 'express';
import multer from 'multer';

import uploadConfig from './config/upload';

import OrphanagesController from './controllers/OrphanagesController';

const routes = Router();
const upload = multer(uploadConfig);

routes.get('/v1/orphanages', OrphanagesController.index);
routes.get('/v1/orphanages/:id', OrphanagesController.show);
routes.post(
  '/v1/orphanages',
  upload.array('images'),
  OrphanagesController.store
);

export default routes;
