import { z } from 'zod';

export const propertyCoversSchema = z.object({
    BusinessPack: z.enum(['Business Building and Contents', 'Equipment Breakdown', 'Theft, Money and Glass'], { message: 'Invalid property detail' }),  
});
