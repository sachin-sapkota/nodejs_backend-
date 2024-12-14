
import { RequestHandler } from 'express';
import { saveToSession } from '../formController';
import { Request, Response } from 'express';
import { JWTPayload } from '../../../../types';
import { businessInterruptionClaimHistorySchema, businessInterruptionLimitAndExcessSchema, businessLiabilityCoverageFurtherQuestionSchema, businessLiabilityCoverageLimitSchema, businessLiabilityLossHistorySchema, portableBusinessContentClaimSchema, portableBusinessContentLimitAndExcessSchema, portableBusinessContentSpecifiedItemsSchema } from '../../../../common/validations/formValidations/CoverageSelection/policyCoverSchema';
export interface AuthenticatedRequest extends Request {
    user?: JWTPayload;
}


export const saveBusinessLiabilityCoverageLimit: RequestHandler = async (req: AuthenticatedRequest, res: Response) => {
    try {
        const email = req?.user?.email;
        if (!email) {
            res.status(400).json({ message: 'User email not found' });
            return
        }
        const formData = businessLiabilityCoverageLimitSchema.parse(req.body);

        await saveToSession(email, 'businessLiabilityCoverageLimit', formData);

        res.status(200).json({ message: 'Business Liability Coverage Limit saved successfully', data: formData });
    } catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ message: 'Validation failed', errors: error });
            return
        }
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const saveBusinessLiabilityCoverageFurtherQuestion: RequestHandler = async (req: AuthenticatedRequest, res: Response) => {
    try {
        const email = req?.user?.email;
        if (!email) {
            res.status(400).json({ message: 'User email not found' });
            return
        }
        const formData = businessLiabilityCoverageFurtherQuestionSchema.parse(req.body);

        await saveToSession(email, 'businessLiabilityCoverageFurtherQuestion', formData);

        res.status(200).json({ message: 'Business Liability Coverage Limit saved successfully', data: formData });
    } catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ message: 'Validation failed', errors: error });
            return
        }
        res.status(500).json({ message: 'Internal server error' });
    }


};
export const saveBusinessLiabilityLossHistory: RequestHandler = async (req: AuthenticatedRequest, res: Response) => {
    try {
        const email = req?.user?.email;
        if (!email) {
            res.status(400).json({ message: 'User email not found' });
            return
        }
        const formData = businessLiabilityLossHistorySchema.parse(req.body);

        await saveToSession(email, 'businessLiabilityLossHistory', formData);

        res.status(200).json({ message: 'Business Liability Coverage Limit saved successfully', data: formData });
    } catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ message: 'Validation failed', errors: error });
            return
        }
        res.status(500).json({ message: 'Internal server error' });
    }


};

export const savePortableBusinessContentsLimit: RequestHandler = async (req: AuthenticatedRequest, res: Response) => {
    try {
        const email = req?.user?.email;
        if (!email) {
            res.status(400).json({ message: 'User email not found' });
            return
        }
        const formData = portableBusinessContentLimitAndExcessSchema.parse(req.body);

        await saveToSession(email, 'portableBusinessContentLimitAndExcess', formData);

        res.status(200).json({ message: 'portable Business Content Limit And Excess saved successfully', data: formData });
    } catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ message: 'Validation failed', errors: error });
            return
        }
        res.status(500).json({ message: 'Internal server error' });
    }
};
export const savePortableBusinessContentsSpecifiedItems: RequestHandler = async (req: AuthenticatedRequest, res: Response) => {
    try {
        const email = req?.user?.email;
        if (!email) {
            res.status(400).json({ message: 'User email not found' });
            return
        }
        const formData = portableBusinessContentLimitAndExcessSchema.parse(req.body);

        await saveToSession(email, 'portableBusinessContentsSpecifiedItems', formData);

        res.status(200).json({ message: 'Portable Business Contents Specified Items saved successfully', data: formData });
    } catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ message: 'Validation failed', errors: error });
            return
        }
        res.status(500).json({ message: 'Internal server error' });
    }
}
export const savePortableBusinessClaimsHistory: RequestHandler = async (req: AuthenticatedRequest, res: Response) => {
    try {
        const email = req?.user?.email;
        if (!email) {
            res.status(400).json({ message: 'User email not found' });
            return
        }
        const formData = portableBusinessContentClaimSchema.parse(req.body);

        await saveToSession(email, 'PortableBusinessClaimsHistory', formData);

        res.status(200).json({ message: 'Portable Business Claims History saved successfully', data: formData });
    } catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ message: 'Validation failed', errors: error });
            return
        }
        res.status(500).json({ message: 'Internal server error' });
    }
};
export const saveBusinessInterruptionLimits: RequestHandler = async (req: AuthenticatedRequest, res: Response) => {
    try {
        const email = req?.user?.email;
        if (!email) {
            res.status(400).json({ message: 'User email not found' });
            return
        }
        const formData = businessInterruptionLimitAndExcessSchema.parse(req.body);

        await saveToSession(email, 'businessInterruptionLimitAndExcess', formData);

        res.status(200).json({ message: 'Business Interruption Limit And Excess saved successfully', data: formData });
    } catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ message: 'Validation failed', errors: error });
            return
        }
        res.status(500).json({ message: 'Internal server error' });
    }
};
export const saveBusinessInterruptionClaimsHistory: RequestHandler = async (req: AuthenticatedRequest, res: Response) => {
    try {
        const email = req?.user?.email;
        if (!email) {
            res.status(400).json({ message: 'User email not found' });
            return
        }
        const formData = businessInterruptionClaimHistorySchema.parse(req.body);

        await saveToSession(email, 'businessInterruptionClaimsHistory', formData);

        res.status(200).json({ message: 'Business Interruption Claims History saved successfully', data: formData });
    } catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ message: 'Validation failed', errors: error });
            return
        }
        res.status(500).json({ message: 'Internal server error' });
    }
};


