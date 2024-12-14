import { z } from 'zod';

export const businessDetailSchema = z.object({
  ABN: z.string().nonempty({ message: 'ABN is required' }),
  EffectiveDate: z.string().nonempty({ message: 'Effective Date is required' }),
  ExpiryDate: z.string().nonempty({ message: 'Expiry Date is required' }),
  BusinessName: z.string().nonempty({ message: 'Business Name is required' }),
  JobDescription:  z.string().nonempty({ message: 'Business Description is required' }),
  ANZSICCode: z.number().min(1, 'ANZIC Code is required' ),
  Turnover: z.string().nonempty({ message: 'Annual Turnover is required' }),
  NumberofEmployees: z.number().min(1, { message: 'Number of Employees must be at least 1' }),
  YearBusinessStarted: z.string().nonempty({ message: 'Year Business Started is required' }),
  TypeofBusiness: z.string().nonempty({ message: 'Type of Business is required' }),
  LocationType: z.string().nonempty({ message: 'Location Type is required' }),
  FullAddress: z.string().nonempty({ message: 'Address is required' }),
  policyLevelCoverage: z.enum(['Business Liability', 'Business Interruption', 'Portable Business Content'], { message: 'Invalid Policy Level Coverage' }),
  businessPackPropertyCoverage: z.enum(['Business Building and Contents', 'Equipment Breakdown', 'Theft, Money and Glass'], { message: 'Invalid Business Pack Property Coverages' }),
});

