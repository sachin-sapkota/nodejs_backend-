import { z } from 'zod';

export const propertyDetailSchema = z.object({
  FullAddress: z.string().min(1, { message: "Address Lookup is required" }),
  JobDescription: z.string().min(1, { message: "Occupation is required" }),
  YearBuilt: z.string().regex(/^\d{4}$/, { message: "Year Built must be a valid year" }),
  FloorConstruction: z.string().min(1, { message: "Floor Construction is required" }),
  RoofConstruction: z.string().min(1, { message: "Roof Construction is required" }),
  WallConstruction: z.string().min(1, { message: "Wall Construction is required" }),
  SandwichPanelorEPS: z
    .number()
    .min(1, { message: "Sandwich Panel or EPS must be a minimum of 1" }),
  NumberOfStories: z.string().min(1, { message: "Number of Stories is required" }),
  LocatedFloor: z.string().min(1, { message: "Located Floor is required" }),
  AreAnyOfTheBuildingsHeritageListed: z.enum(["Yes", "No"], { message: "Heritage Listing must be Yes or No" }),
  InterestedParty: z.string().optional(),
});

export const machineryBreakdownSchema = z.object({
  BlanketCover: z.string().min(1, { message: "Blanket Cover is required" }),
  DeteriorationOfStock: z
    .string()
    .regex(/^\d+(\.\d{1,2})?$/, { message: "Deterioration of Stock must be a valid number" }),
  IncreasedCostOfWorking: z
    .string()
    .regex(/^\d+(\.\d{1,2})?$/, { message: "Increased Cost of Working must be a valid number" }),
  NumberOfMachines: z
    .string()
    .regex(/^\d+$/, { message: "Number of Machines must be a valid integer" }),
  Excess: z.string().min(1, { message: "Excess is required" }),
  ComputersValue: z
    .string()
    .regex(/^\d+(\.\d{1,2})?$/, { message: "Computers Value must be a valid number" }),
  PortableElectronicEquipment: z
    .string()
    .regex(/^\d+(\.\d{1,2})?$/, { message: "Portable Electronic Equipment must be a valid number" }),
  OtherElectronicEquipment: z
    .string()
    .regex(/^\d+(\.\d{1,2})?$/, { message: "Other Electronic Equipment must be a valid number" }),
  ElectronicEquipmentExcess: z.string().min(1, { message: "Excess for Electronic Equipment is required" }),
});

export const equipmentBreakdownFurtherQuestionSchema = z.object({
  ClaimsInLastFiveYears: z.enum(["Yes", "No"], {
    message: "Claims In Last Five Years must be either 'Yes' or 'No'",
  }),
});

export const equipmentBreakdownClaimsHistorySchema = z.object({
  ClaimsInLastFiveYears: z.enum(["Yes", "No"], {
    message: "Claims In Last Five Years must be either 'Yes' or 'No'",
  }),
});

export const businessDetailsSchema = z.object({
  AnnualTurnover: z
    .string()
    .regex(/^\d+(\.\d{1,2})?$/, { message: "Annual Turnover must be a valid number" }),
  NumberOfEmployees: z
    .string()
    .regex(/^\d+$/, { message: "Number of Employees must be a valid integer" }),
  LimitsOfLiability: z.string().min(1, { message: "Limits of Liability is required" }),
  AnnualWages: z
    .string()
    .regex(/^\d+(\.\d{1,2})?$/, { message: "Annual Wages must be a valid number" }),
  PropertyValue: z
    .string()
    .regex(/^\d+(\.\d{1,2})?$/, { message: "Property Value must be a valid number" }),
  ContractorOrLabourHirePayments: z
    .string()
    .regex(/^\d+(\.\d{1,2})?$/, { message: "Contractor or Labour Hire Payments must be a valid number" }),
  TaxAuditSumInsured: z.string().min(1, { message: "Tax Audit Sum Insured is required" }),
  ExcessForEachClaim: z.string().min(1, { message: "Excess for Each Claim is required" }),
  InterestedParty: z.string().min(1, { message: "Interested Party is required" }),
});

const limitAndExcessSchema = z.object({
  SumInsured: z.number().min(0, "Sum Insured must be a positive number"),
  Excess: z.string().regex(/^\$\d+/, "Excess must be a valid dollar amount"),
});

export const buildingAndContentLimitAndExcessSchema = z.object({
  Building: limitAndExcessSchema,
  Contents: limitAndExcessSchema,
  Stock: limitAndExcessSchema,
});

export const buildingAndContentFurtherQuestion = z.object({
  HasBuildingBeenRewired: z.string().min(1, "Has Building Been Rewired is required"),
  RequireFloodCover: z.string().min(1, "Require Flood Cover is required"),
  PropertyUnoccupiedFor30Days: z.string().min(1, "Property Unoccupied For 30 Days is required"),
  ConnectedToTownWater: z.string().min(1, "Connected To Town Water is required"),
  CoveredBySprinklers: z.string().min(1, "Covered By Sprinklers is required"),
  ClaimsInLastFiveYears: z.string().min(1, "Claims In Last Five Years is required"),
});

export const buildingAndContentClaimHistory = z.object({
  ClaimsInLastFiveYears: z.boolean(),
  YearOfLoss: z
    .number()
    .int()
    .min(2000, "Year of Loss must be greater than or equal to 2000") // Adjust as needed
    .max(new Date().getFullYear(), "Year of Loss cannot be in the future"),
  ClaimType: z.string().min(1, "Claim Type is required"), // Validate specific options if needed
  ClaimValue: z.string(),
  Claims: z
    .array(z.string())
    .optional(),
});

export const theftMoneyAndGlassLimitSchema = z.object({
  TheftExcludingTobacco: z.number().min(0, "Theft (Excluding Tobacco) must be a positive number"),
  TheftTobacco: z.number().min(0, "Theft (Tobacco) must be a positive number"),
  TheftExcess: z.string().regex(/^\d+$/, "Theft Excess must be a valid number"),
  AlarmType: z.enum(["Local Alarm", "Monitored Alarm", "No Alarm", "No Security"]),
  DeadlocksOnDoors: z.boolean(),
  SecurityScreensOnWindows: z.string().min(1, "Security Screens On Windows is required"),
  KeyOperatedLocksOnWindows: z.string().min(1, "Key Operated Locks On Windows is required"),
  MoneyDuringBusinessHours: z.number().min(0, "Money on premises during business hours must be a positive number"),
  MoneyOutsideBusinessHours: z.number().min(0, "Money on premises outside business hours must be a positive number"),
  MoneyInLockedSafe: z.number().min(0, "Money in a locked safe must be a positive number"),
  MoneyInTransit: z.number().min(0, "Money in transit must be a positive number"),
  MoneyInPrivateResidence: z.number().min(0, "Money in a private residence must be a positive number"),
  MoneyExcess: z.string().regex(/^\d+$/, "Money Excess must be a valid number"),
  GlassSumInsured: z.string().optional(),
  IlluminatedSignsSumInsured: z.number().min(0, "Illuminated Signs Sum Insured must be a positive number"),
  InterestedParty: z.number().min(0, "Interested Party must be a positive number"),
  GlassExcess: z.string().regex(/^\d+$/, "Glass Excess must be a valid number"),
  PercentageAboveGroundFloor: z.number()
    .min(0, "Percentage must be at least 0")
    .max(100, "Percentage cannot exceed 100"),
  TypeOfGlass: z.enum(["Internal only", "External only", "Internal and External"]),
  PlateOrNonPlate: z.enum(["Plate", "Non-Plate"]),
});

export const theftMoneyAndGlassFurtherQuestionSchema = z.object({
  IsBusinessInSecureBuilding: z.string().min(1, "Is Business In Secure Building is required"),
});

export const theftMoneyAndGlassClaimsHistorySchema = z.object({
  ClaimsInLastFiveYears: z.string().min(1, "Claims In Last Five Years is required"),
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
          .string().min(1, "Claim Value is required"),
      })
    )
    .optional(),
});
