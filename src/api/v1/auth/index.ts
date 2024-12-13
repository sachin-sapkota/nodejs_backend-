import { Router } from 'express';
import { signupHandler } from './signup';
import { emailVerificationHandler } from './verification';
import { loginInitHandler, loginVerifyHandler } from './login';
const router = Router();

router.post('/signup',  signupHandler);
router.get('/verification/email/:token', emailVerificationHandler);
router.post('/login', loginInitHandler); 
router.post('/login/verify', loginVerifyHandler); 

export default router;
