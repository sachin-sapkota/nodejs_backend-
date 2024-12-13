import { z } from 'zod';

export const policyCoversSchema = z.object({
  businessLiability: z.string().nonempty({ message: 'Business Liability details are required' }),
  portableBusinessContent: z.string().nonempty({ message: 'Portable Business Content details are required' }),
});
