import { Router } from 'express';
import { saveBusinessDetail } from './businessDetail';
import { savePropertyDetail, saveEquipmentBreakdownLimit, saveEquipmentFurtherQuestion, saveEquipmentClaimsHistory, saveTheftMoneyAndGlassLimit, saveTheftMoneyAndGlassFurtherQuestions, saveTheftMoneyAndGlassClaimsHistory, saveBuildingAndContentsLimitsAndExcess, saveBuildingAndContentsFurtherQuestions, saveBuildingAndContentsClaimsHistory } from './propertyCovers';

import { saveBusinessInterruptionClaimsHistory, saveBusinessInterruptionLimits, saveBusinessLiabilityCoverageLimit, saveBusinessLiabilityLossHistory, savePortableBusinessClaimsHistory, savePortableBusinessContentsLimit, savePortableBusinessContentsSpecifiedItems } from './policyCovers';

const coveragePaths = Router();
coveragePaths.post('/businessDetail', saveBusinessDetail);
coveragePaths.post('/propertyCovers/property1/propertyDetail/', savePropertyDetail);

coveragePaths.post('/propertyCovers/property1/buildingAndContents/limitandexcess', saveBuildingAndContentsLimitsAndExcess);
coveragePaths.post('/propertyCovers/property1/buildingAndContents/urtherQuestion', saveBuildingAndContentsFurtherQuestions);
coveragePaths.post('/propertyCovers/property1/buildingAndContents/claimsHistory', saveBuildingAndContentsClaimsHistory);

coveragePaths.post('/propertyCovers/property1/theftMoneyAndGlass/limitandexcess', saveTheftMoneyAndGlassLimit);
coveragePaths.post('/propertyCovers/property1/theftMoneyAndGlass/furtherQuestion', saveTheftMoneyAndGlassFurtherQuestions);
coveragePaths.post('/propertyCovers/property1/theftMoneyAndGlass/claimsHistory', saveTheftMoneyAndGlassClaimsHistory);

coveragePaths.post('/propertyCovers/property1/equipmentBreakdown/limitandexcess', saveEquipmentBreakdownLimit);
coveragePaths.post('/propertyCovers/property1/equipmentBreakdown/furtherQuestion', saveEquipmentFurtherQuestion);
coveragePaths.post('/propertyCovers/property1/equipmentBreakdown/claimsHistory', saveEquipmentClaimsHistory);

coveragePaths.post('/policyCovers/businessLiabilityCoverage/limitandexcess', saveBusinessLiabilityCoverageLimit);
coveragePaths.post('/policyCovers/businessLiabilityCoverage/furtherQuestion', saveEquipmentFurtherQuestion);
coveragePaths.post('/policyCovers/businessLiabilityCoverage/lossHistory', saveBusinessLiabilityLossHistory);

coveragePaths.post('/policyCovers/businessInterruptionCoverage/limitandexcess', saveBusinessInterruptionLimits);
coveragePaths.post('/policyCovers/businessInterruptionCoverage/claimsHistory', saveBusinessInterruptionClaimsHistory);


coveragePaths.post('/policyCovers/portableBusinessContentsCoverage/limitandexcess', savePortableBusinessContentsLimit);
coveragePaths.post('/policyCovers/portableBusinessContentsCoverage/specifiedItems', savePortableBusinessContentsSpecifiedItems);
coveragePaths.post('/policyCovers/portableBusinessContentsCoverage/claimsHistory', savePortableBusinessClaimsHistory);

export default coveragePaths