//For dropdown
export const gstStatusOptions = [
  { label: "Active", value: "ACT" },
  { label: "Cancelled", value: "CAN" },
];

//To use in table
export const gstStatusLabelMap = Object.fromEntries(
  gstStatusOptions.map((o) => [o.value, o.label])
);
