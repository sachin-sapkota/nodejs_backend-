import { Request, Response } from 'express';
import { redisClient } from '../../../common/config/redis';
import { coverageSelectionSchema } from '../../../common/validations/formValidations/coverageSelectionValidation';
import { propertyCoversSchema } from '../../../common/validations/formValidations/propertyCoversValidation';
import { policyCoversSchema } from '../../../common/validations/formValidations/policyCoversValidation';
import { JWTPayload } from '../../../types';
import { RequestHandler } from 'express';
const SESSION_EXPIRY = 60 * 60 * 24 * 5; //5 days expiry for redis
export interface AuthenticatedRequest extends Request {
    user?: JWTPayload;
}

const getOrCreateSession = async (email: string) => {
    const sessionKey = `${email}:FormData`;
    const existingSession = await redisClient.get(sessionKey);

    if (!existingSession) {
        const newSession = {};
        await redisClient.set(sessionKey, JSON.stringify(newSession), { EX: SESSION_EXPIRY });
        return newSession;
    }

    return JSON.parse(existingSession);
};



const saveToSession = async (email: string, key: string, data: any) => {
    const sessionKey = `${email}:FormData`;
    const session = await getOrCreateSession(email);
    session[key] = data;
    await redisClient.set(sessionKey, JSON.stringify(session), { EX: SESSION_EXPIRY });
};


export const saveCoverageSelection: RequestHandler = async (req: AuthenticatedRequest, res: Response) => {
    try {
        const email = req?.user?.email; 
        if (!email) {
            res.status(400).json({ message: 'User email not found' });
            return
        }
        const formData = coverageSelectionSchema.parse(req.body);

        await saveToSession(email, 'coverageSelection', formData);

        res.status(200).json({ message: 'Coverage selection saved successfully', data: formData });
    } catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ message: 'Validation failed', errors: error });
            return;
        }
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Handler for Property Covers
export const savePropertyCovers: RequestHandler = async (req: AuthenticatedRequest, res: Response) => {
    try {
        const email = req?.user?.email;
        if (!email) {
            res.status(400).json({ message: 'User email not found' });
            return
        }
        const formData = propertyCoversSchema.parse(req.body);

        await saveToSession(email, 'propertyCovers', formData);

        res.status(200).json({ message: 'Property covers saved successfully', data: formData });
    } catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ message: 'Validation failed', errors: error });
            return
        }
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Handler for Policy Covers
export const savePolicyCovers = async (req: AuthenticatedRequest, res: Response) => {
    try {
        const email = req?.user?.email; // Retrieved from access token
        if (!email) {
            res.status(400).json({ message: 'User email not found' });
            return
        }
        const formData = policyCoversSchema.parse(req.body);

        await saveToSession(email, 'policyCovers', formData);

        res.status(200).json({ message: 'Policy covers saved successfully', data: formData });
    } catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ message: 'Validation failed', errors: error });
            return
        }
        res.status(500).json({ message: 'Internal server error' });
    }
};



