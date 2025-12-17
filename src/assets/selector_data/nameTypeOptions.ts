//For dropdown
export const nameTypeOptions = [
  { label: "Legal Name", value: "LGL" },
  { label: "Main Name", value: "MN" },
  { label: "Trading Name", value: "TRD" },
  { label: "Business Name", value: "BN" },
  { label: "Deductible Gift Recipient", value: "DGR" },
  { label: "Other Name", value: "OTN" },
];

//To use in table
export const nameTypeLabelMap = Object.fromEntries(
  nameTypeOptions.map((o) => [o.value, o.label])
);
