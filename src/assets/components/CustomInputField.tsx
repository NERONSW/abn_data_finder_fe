import { Tooltip } from "antd";
import { InfoIcon } from "../icons/Icons";

type InputType = "text" | "number";

interface CustomInputProps {
  label: string;
  value?: string | number;
  type?: InputType;
  placeholder?: string;
  info?: boolean;
  info_data?: string;
  onChange: (value: string) => void;
}

const CustomInputField = ({
  label,
  value = "",
  type = "text",
  placeholder,
  info,
  info_data,
  onChange,
}: CustomInputProps) => {
  return (
    <div className="flex flex-col gap-1">
      <div className="flex gap-2 items-center justify-start">
        <span className="text-[12px] font-semibold">{label}</span>
        {info ? (
          <Tooltip placement="rightTop" title={info_data}>
            <span className="cursor-pointer inline-flex">
              <InfoIcon size={14} />
            </span>
          </Tooltip>
        ) : null}
      </div>

      <input
        type={type}
        value={value}
        placeholder={placeholder}
        className="border border-gray-300 outline-none focus:border-[#1677ff] hover:border-[#4096ff] p-1.5 w-full rounded-sm text-[12px]"
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
};

export default CustomInputField;
