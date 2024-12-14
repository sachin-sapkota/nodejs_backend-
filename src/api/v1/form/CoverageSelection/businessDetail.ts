import { businessDetailSchema } from '../../../../common/validations/formValidations/CoverageSelection/businessDetailSchema';
import { RequestHandler } from 'express';
import { saveToSession } from '../formController';
import { Request, Response } from 'express';
import { JWTPayload } from '../../../../types';
export interface AuthenticatedRequest extends Request {
    user?: JWTPayload;
}   

export const saveBusinessDetail: RequestHandler = async (req: AuthenticatedRequest, res: Response) => {
    try {
        const email = req?.user?.email;
        if (!email) {
            res.status(400).json({ message: 'User email not found' });
            return
        }
        const formData = businessDetailSchema.parse(req.body);

        await saveToSession(email, 'businessDetail', formData);

        res.status(200).json({ success: true, message: 'Coverage selection saved successfully', data: formData });
    } catch (error) {
        if (error instanceof Error) {
            res.status(400).json({success: false, message: 'Validation failed', errors: error });
            return;
        }
        res.status(500).json({ message: 'Internal server error' });
    }
};


