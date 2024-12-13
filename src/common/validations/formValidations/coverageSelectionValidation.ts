import { z } from 'zod';

export const coverageSelectionSchema = z.object({
  abn: z.string().nonempty({ message: 'ABN is required' }),
  effectiveDate: z.string().nonempty({ message: 'Effective Date is required' }),
  expiryDate: z.string().nonempty({ message: 'Expiry Date is required' }),
  businessName: z.string().nonempty({ message: 'Business Name is required' }),
  anzicCode: z.string().nonempty({ message: 'ANZIC Code is required' }),
  annualTurnover: z.string().nonempty({ message: 'Annual Turnover is required' }),
  numberOfEmployees: z.number().min(1, { message: 'Number of Employees must be at least 1' }),
  address: z.string().nonempty({ message: 'Address is required' }),
  policyLevelCoverage: z.enum(['Business Liability', 'Business Interruption', 'Portable Business Content'], { message: 'Invalid Policy Level Coverage' }),
  businessPackPropertyCoverages: z.enum(['Business Building and Contents', 'Equipment Breakdown', 'Theft, Money and Glass'], { message: 'Invalid Business Pack Property Coverages' }),

});
