interface CustomStatusPillProps {
  value: string;
  label: string;
}

const CustomStatusPill = ({ value, label }: CustomStatusPillProps) => {
  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium
        ${
          value === "ACT"
            ? "text-[#13a688] border border-[#13a688] bg-[#dcfce7]"
            : value === "CAN"
            ? "text-[#e92e16] border border-[#e92e16] bg-[#fbd5d0]"
            : "text-[#b93815] border border-[#f9dbaf] bg-[#fef6ee]"
        }
      `}
    >
      {label}
    </span>
  );
};

export default CustomStatusPill;
