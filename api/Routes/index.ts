import { Router } from 'express';

import createAuthRoutes from './AuthRoutes';
import Error404Route from './Error404Route';

import createAppContainer from './createContainer';

const router = Router();
const container = createAppContainer();

router.use('/api', createAuthRoutes(container));
router.use('/api', Error404Route);

export default router;