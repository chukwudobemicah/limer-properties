import property from "./property";
import propertyType from "./propertyType";
import propertyStructure from "./propertyStructure";
import location from "./location";
import city from "./city";
import state from "./state";

export const schemaTypes = [
  // Base schemas (create these first)
  city,
  state,

  // Filter schemas (create these second)
  propertyType,
  propertyStructure,
  location,

  // Main property schema
  property,
];
