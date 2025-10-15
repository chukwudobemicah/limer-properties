import property from "./property";
import propertyType from "./propertyType";
import propertyStatus from "./propertyStatus";
import propertyStructure from "./propertyStructure";
import location from "./location";

export const schemaTypes = [
  // Filter schemas (create these first)
  propertyType,
  propertyStatus,
  propertyStructure,
  location,

  // Main property schema
  property,
];
