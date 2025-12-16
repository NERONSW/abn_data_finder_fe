//For dropdown
export const replacedOptions = [
  { label: "Yes", value: "Y" },
  { label: "No", value: "N" },
];

//To use in table
export const stateLabelMap = Object.fromEntries(
  replacedOptions.map((o) => [o.value, o.label])
);
