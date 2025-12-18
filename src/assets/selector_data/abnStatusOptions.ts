//For dropdown
export const abnStatusOptions = [
  { label: "Active", value: "ACT" },
  { label: "Cancelled", value: "CAN" },
];

//To use in table
export const abnStatusLabelMap = Object.fromEntries(
  abnStatusOptions.map((o) => [o.value, o.label])
);
