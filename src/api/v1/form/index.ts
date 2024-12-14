import { Router } from 'express';
import { verifyAccessToken } from '../../../common/middleware/authMiddleware';
import coveragePaths from './CoverageSelection'

const formRouter = Router();

formRouter.use(verifyAccessToken);

formRouter.use('/coverage-selection', coveragePaths);


export default formRouter