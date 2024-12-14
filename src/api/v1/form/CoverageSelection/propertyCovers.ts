import { propertyDetailSchema, machineryBreakdownSchema, equipmentBreakdownFurtherQuestionSchema, equipmentBreakdownClaimsHistorySchema, buildingAndContentLimitAndExcessSchema, buildingAndContentFurtherQuestion, buildingAndContentClaimHistory, theftMoneyAndGlassLimitSchema, theftMoneyAndGlassFurtherQuestionSchema, theftMoneyAndGlassClaimsHistorySchema } from '../../../../common/validations/formValidations/CoverageSelection/propertyCoverSchema';
import { RequestHandler } from 'express';
import { saveToSession } from '../formController';
import { Request, Response } from 'express';
import { JWTPayload } from '../../../../types';
export interface AuthenticatedRequest extends Request {
    user?: JWTPayload;
}   


export const savePropertyDetail: RequestHandler = async (req: AuthenticatedRequest, res: Response) => {
    try {
        const email = req?.user?.email;
        if (!email) {
            res.status(400).json({ message: 'User email not found' });
            return
        }
        const formData = propertyDetailSchema.parse(req.body);

        await saveToSession(email, 'propertyDetail', formData);

        res.status(200).json({ message: 'Property covers saved successfully', data: formData });
    } catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ message: 'Validation failed', errors: error });
            return
        }
        res.status(500).json({ message: 'Internal server error' });
    }
};
export const saveEquipmentBreakdownLimit: RequestHandler = async (req: AuthenticatedRequest, res: Response) => {
    try {
        const email = req?.user?.email;
        if (!email) {
            res.status(400).json({ message: 'User email not found' });
            return
        }
        const formData = machineryBreakdownSchema.parse(req.body);

        await saveToSession(email, 'equipmentBreakdownlimit', formData);

        res.status(200).json({ message: 'Equipment Breakdown limit and access saved successfully', data: formData });
    } catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ message: 'Validation failed', errors: error });
            return
        }
        res.status(500).json({ message: 'Internal server error' });
    }
};
export const saveEquipmentFurtherQuestion: RequestHandler = async (req: AuthenticatedRequest, res: Response) => {
    try {
        const email = req?.user?.email;
        if (!email) {
            res.status(400).json({ message: 'User email not found' });
            return
        }
        const formData = equipmentBreakdownFurtherQuestionSchema.parse(req.body);

        await saveToSession(email, 'equipmentFurtherQuestion', formData);

        res.status(200).json({ message: 'Equipment Further Question saved successfully', data: formData });
    } catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ message: 'Validation failed', errors: error });
            return
        }
        res.status(500).json({ message: 'Internal server error' });
    }
};
export const saveEquipmentClaimsHistory: RequestHandler = async (req: AuthenticatedRequest, res: Response) => {
    try {
        const email = req?.user?.email;
        if (!email) {
            res.status(400).json({ message: 'User email not found' });
            return
        }
        const formData = equipmentBreakdownClaimsHistorySchema.parse(req.body);

        await saveToSession(email, 'equipmentClaimsHistory', formData);

        res.status(200).json({ message: 'Equipment Claims History saved successfully', data: formData });
    } catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ message: 'Validation failed', errors: error });
            return
        }
        res.status(500).json({ message: 'Internal server error' });
    }
};
export const saveBuildingAndContentsLimitsAndExcess: RequestHandler = async (req: AuthenticatedRequest, res: Response) => {
    try {
        const email = req?.user?.email;
        if (!email) {
            res.status(400).json({ message: 'User email not found' });
            return
        }
        const formData = buildingAndContentLimitAndExcessSchema.parse(req.body);

        await saveToSession(email, 'buildingAndContentsLimitsAndExcess', formData);

        res.status(200).json({ message: 'Building And Contents Limits And Excess saved successfully', data: formData });
    } catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ message: 'Validation failed', errors: error });
            return
        }
        res.status(500).json({ message: 'Internal server error' });
    }
};
export const saveBuildingAndContentsFurtherQuestions: RequestHandler = async (req: AuthenticatedRequest, res: Response) => {
    try {
        const email = req?.user?.email;
        if (!email) {
            res.status(400).json({ message: 'User email not found' });
            return
        }
        const formData = buildingAndContentFurtherQuestion.parse(req.body);

        await saveToSession(email, 'buildingAndContentsFurtherQuestions', formData);

        res.status(200).json({ message: 'Building And Contents Further Questions saved successfully', data: formData });
    } catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ message: 'Validation failed', errors: error });
            return
        }
        res.status(500).json({ message: 'Internal server error' });
    }
};
export const saveBuildingAndContentsClaimsHistory: RequestHandler = async (req: AuthenticatedRequest, res: Response) => {
    try {
        const email = req?.user?.email;
        if (!email) {
            res.status(400).json({ message: 'User email not found' });
            return
        }
        const formData = buildingAndContentClaimHistory.parse(req.body);

        await saveToSession(email, 'buildingAndContentsFurtherQuestions', formData);

        res.status(200).json({ message: 'Building And Contents ClaimsHistory saved successfully', data: formData });
    } catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ message: 'Validation failed', errors: error });
            return
        }
        res.status(500).json({ message: 'Internal server error' });
    }
};
export const saveTheftMoneyAndGlassLimit: RequestHandler = async (req: AuthenticatedRequest, res: Response) => {
    try {
        const email = req?.user?.email;
        if (!email) {
            res.status(400).json({ message: 'User email not found' });
            return
        }
        const formData = theftMoneyAndGlassLimitSchema.parse(req.body);

        await saveToSession(email, 'theftMoneyAndGlassLimit', formData);

        res.status(200).json({ message: 'Theft Money And Glass Limit saved successfully', data: formData });
    } catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ message: 'Validation failed', errors: error });
            return
        }
        res.status(500).json({ message: 'Internal server error' });
    }
};
export const saveTheftMoneyAndGlassFurtherQuestions: RequestHandler = async (req: AuthenticatedRequest, res: Response) => {
    try {
        const email = req?.user?.email;
        if (!email) {
            res.status(400).json({ message: 'User email not found' });
            return
        }
        const formData = theftMoneyAndGlassFurtherQuestionSchema.parse(req.body);

        await saveToSession(email, 'theftMoneyAndGlassFurtherQuestions', formData);

        res.status(200).json({ message: 'Theft Money And Glass Further Questions saved successfully', data: formData });
    } catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ message: 'Validation failed', errors: error });
            return
        }
        res.status(500).json({ message: 'Internal server error' });
    }
};
export const saveTheftMoneyAndGlassClaimsHistory: RequestHandler = async (req: AuthenticatedRequest, res: Response) => {
    try {
        const email = req?.user?.email;
        if (!email) {
            res.status(400).json({ message: 'User email not found' });
            return
        }
        const formData = theftMoneyAndGlassClaimsHistorySchema.parse(req.body);

        await saveToSession(email, 'theftMoneyAndGlassClaimsHistory', formData);

        res.status(200).json({ message: 'Theft Money And Glass Claims History saved successfully', data: formData });
    } catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ message: 'Validation failed', errors: error });
            return
        }
        res.status(500).json({ message: 'Internal server error' });
    }
};







