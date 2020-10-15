import { Router } from 'express';

import OrphanagesController from './controllers/OrphanagesController';

const routes = Router();

routes.get('/v1/orphanages', OrphanagesController.index);
routes.get('/v1/orphanages/:id', OrphanagesController.show);
routes.post('/v1/orphanages', OrphanagesController.store);

export default routes;
