//For dropdown
export const gstStatusOptions = [
  { label: "Active", value: "ACT" },
  { label: "Cancelled", value: "CAN" },
  { label: "Non", value: "NON" },
];

//To use in table
export const gstStatusLabelMap = Object.fromEntries(
  gstStatusOptions.map((o) => [o.value, o.label])
);
