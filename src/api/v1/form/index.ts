import { Router } from 'express';
import { verifyAccessToken } from '../../../common/middleware/authMiddleware';
import {
  saveCoverageSelection,
  savePropertyCovers,
  savePolicyCovers,
} from './formController';

const formRouter = Router();

formRouter.use(verifyAccessToken); 

formRouter.post('/coverage-selection', saveCoverageSelection);
formRouter.post('/property-covers', savePropertyCovers);
formRouter.post('/policy-covers', savePolicyCovers);

export default formRouter