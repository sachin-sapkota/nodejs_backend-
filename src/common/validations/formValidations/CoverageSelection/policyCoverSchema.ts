import { z } from 'zod';

export const businessLiabilityCoverageLimitSchema = z.object({
  ProductCode: z
    .string()
    .regex(/^\d+$/, { message: "Product Code must be a valid number" }),
  ProductVersion: z
    .string()
    .min(1, { message: "Product Version is required" }),
  AnnualTurnover: z
    .string()
    .regex(/^\d+(\.\d{1,2})?$/, { message: "Annual Turnover must be a valid number" }),
  NumberOfEmployees: z
    .string()
    .regex(/^[0-9]+$/, { message: "Number of Employees must be a valid integer" }),
  LimitsOfLiability: z.string().optional(),
  AnnualWages: z
    .string()
    .regex(/^\d+(\.\d{1,2})?$/, { message: "Annual Wages must be a valid number" }),
  PropertyValue: z
    .string()
    .regex(/^\d+(\.\d{1,2})?$/, { message: "Property Value must be a valid number" }),
  ContractorOrLabourHirePayments: z
    .string()
    .regex(/^\d+(\.\d{1,2})?$/, { message: "Contractor or Labour Hire Payments must be a valid number" }),
  TaxAuditSumInsured: z.string().optional(),
  ExcessForEachClaim: z.string().optional(),
  InterestedParty: z.string().optional(),
});

export const businessLiabilityCoverageFurtherQuestionSchema = z.object({
  ImportOrExportGoods: z.enum(["Yes", "No"], {
    message: "Does the Business import or export goods? must be either 'Yes' or 'No'",
  }),
  ClaimsInLastFiveYears: z.enum(["Yes", "No"], {
    message: "Claims In Last Five Years? must be either 'Yes' or 'No'",
  }),
  ImportOrExportFromUSOrCanada: z.enum(["Yes", "No"], {
    message: "Does the business import or export goods from the US or Canada? must be either 'Yes' or 'No'",
  }),
});

export const businessLiabilityLossHistorySchema = z.object({
  ClaimsInLastFiveYears: z.boolean(),
  Claims: z
    .array(
      z.object({
        YearOfLoss: z
          .number()
          .int()
          .min(2000, "Year of Loss must be greater than or equal to 2000")
          .max(new Date().getFullYear(), "Year of Loss cannot be in the future"),
        ClaimType: z.string().min(1, "Claim Type is required"),
        ClaimValue: z.string().optional(),
      })
    )
    .optional(),
});

export const businessInterruptionLimitAndExcessSchema = z.object({
  AnnualTurnover: z
    .string()
    .regex(/^\$\d+$/, "Annual Turnover must be a valid dollar amount"),
  IndemnityPeriod: z.enum(["3 Months", "6 Months", "12 Months"]),
  AnnualGrossProfit: z
    .string()
    .regex(/^\$\d+$/, "Annual Gross Profit must be a valid dollar amount"),
  AdditionalIncreaseCostOfWork: z
    .string()
    .regex(/^\$\d+$/, "Additional Increase Cost of Work must be a valid dollar amount"),
  ClaimPreparationCost: z
    .string()
    .regex(/^\$\d+$/, "Claim Preparation Cost must be a valid dollar amount"),
  InterestedParty: z.string().optional(),
  Excess: z.enum(["$750", "$1000", "$1500"]),
});

export const businessInterruptionClaimHistorySchema = z.object({
  ClaimsInLastFiveYears: z.boolean(),
  Claims: z
    .array(
      z.object({
        YearOfLoss: z
          .number()
          .int()
          .min(2000, "Year of Loss must be greater than or equal to 2000")
          .max(new Date().getFullYear(), "Year of Loss cannot be in the future"),
        ClaimType: z.string().min(1, "Claim Type is required"),
        ClaimValue: z
          .string()
          .regex(/^\$\d+$/, "Claim Value must be a valid dollar amount"),
      })
    )
    .optional(),
});

export const portableBusinessContentLimitAndExcessSchema = z.object({
  BlanketCoverContent: z.string().optional(),
  Excess: z.string().optional(),
  BlanketCoverStock: z.string().optional(),
  InterestedParty: z.string().optional(),
});

export const portableBusinessContentSpecifiedItemsSchema = z.object({
  Category: z.string().optional(),
  Description: z.string().min(1, "Description is required"), // Ensures the field is not empty
  ReplacementValue: z
    .string()
    .regex(/^\$\d+$/, "Replacement Value must be a valid dollar amount")
    .refine((val) => parseInt(val.replace("$", ""), 10) > 0, "Replacement Value must be greater than 0"),
});

export const portableBusinessContentClaimSchema = z.object({
  ClaimsInLastFiveYears: z.boolean(),
  Claims: z
    .array(
      z.object({
        YearOfLoss: z
          .number()
          .int()
          .min(2000, "Year of Loss must be greater than or equal to 2000")
          .max(new Date().getFullYear(), "Year of Loss cannot be in the future"),
        ClaimType: z.string().min(1, "Claim Type is required"),
        ClaimValue: z.string().optional(),
      })
    )
    .optional(),
});

