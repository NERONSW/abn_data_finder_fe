import { useState } from "react";
import { DatePicker, Select } from "antd";
import { SlidersHorizontalIcon } from "../assets/icons/Icons";
import type { ABNFilter } from "../assets/interfaces/filterTypes";
import CustomInputField from "../assets/components/CustomInputField";
import "./styles.css";
import { entityTypeOptions } from "../assets/selector_data/entityTypeOption";
import { abnStatusOptions } from "../assets/selector_data/abnStatusOptions";
import { gstStatusOptions } from "../assets/selector_data/gstStatusOptions ";
import { stateOptions } from "../assets/selector_data/stateOptions";
import { replacedOptions } from "../assets/selector_data/replacedOptions";
import dayjs from "dayjs";

interface SideBarProps {
  filters: ABNFilter;
  onFiltersChange: React.Dispatch<React.SetStateAction<ABNFilter>>;
  onSearch: (filters: ABNFilter) => void;
}

const SideBar = ({ filters, onFiltersChange, onSearch }: SideBarProps) => {
  const [openSibebar, setOpenSibebar] = useState(false);

  const { RangePicker } = DatePicker;

  console.log("filters :", filters);

  const setOrDeleteFilter = <T extends Record<string, any>>(
    prev: T,
    key: keyof T,
    value: any
  ): T => {
    const next = { ...prev };

    if (
      value === undefined ||
      value === null ||
      value === "" ||
      (Array.isArray(value) && value.length === 0)
    ) {
      delete next[key];
    } else {
      next[key] = value;
    }

    return next;
  };

  return (
    <div
      className={`fixed top-0 left-0 h-screen z-50 bg-white border-r border-r-gray-400 shadow-2xl transition-transform duration-300 ease-in-out 
          ${openSibebar ? "translate-x-0" : "-translate-x-full"} w-70`}
    >
      <span
        className="absolute top-[50%] -right-10 border border-gray-400 p-2 cursor-pointer rounded-sm bg-white text-blue-600"
        onClick={() => {
          setOpenSibebar(!openSibebar);
        }}
      >
        <SlidersHorizontalIcon size={20} />
      </span>

      <div className="max-h-screen py-4 pl-2 pr-1 flex flex-col gap-2">
        <span className=" mb-2">Filter Options</span>
        <div className="overflow-auto custom-scrollbar mb-2">
          <div className="flex flex-col gap-2">
            <CustomInputField
              label="Entity Name"
              type="text"
              value={filters.entity_name}
              onChange={(value) =>
                onFiltersChange((prev) =>
                  setOrDeleteFilter(prev, "entity_name", value)
                )
              }
            />

            <CustomInputField
              label="ABN"
              type="number"
              value={filters.abn}
              onChange={(value) =>
                onFiltersChange((prev) => setOrDeleteFilter(prev, "abn", value))
              }
            />

            <CustomInputField
              label="Asic Number"
              type="number"
              value={filters.asic_number}
              onChange={(value) =>
                onFiltersChange((prev) =>
                  setOrDeleteFilter(prev, "asic_number", value)
                )
              }
            />

            <div className="flex flex-col">
              <span className=" text-[12px] font-semibold">Entity Type</span>
              <Select
                mode="multiple"
                allowClear
                style={{ width: "100%" }}
                value={filters.entity_type?.split(",")}
                placeholder="Please select"
                showSearch={{ optionFilterProp: "label" }}
                onChange={(val: string[]) => {
                  onFiltersChange((prev) =>
                    setOrDeleteFilter(
                      prev,
                      "entity_type",
                      val.length ? val.join(",") : undefined
                    )
                  );
                }}
                options={entityTypeOptions}
              />
            </div>
            <div className="flex flex-col">
              <span className=" text-[12px] font-semibold">ABN Status</span>
              <Select
                allowClear
                style={{ width: "100%" }}
                value={filters.abn_status}
                placeholder="Please select"
                onChange={(value?: string) => {
                  onFiltersChange((prev) =>
                    setOrDeleteFilter(prev, "abn_status", value)
                  );
                }}
                options={abnStatusOptions}
              />
            </div>

            <div className="flex flex-col">
              <span className=" text-[12px] font-semibold">GST Status</span>
              <Select
                allowClear
                style={{ width: "100%" }}
                value={filters.gst_status}
                placeholder="Please select"
                onChange={(value?: string) => {
                  onFiltersChange((prev) =>
                    setOrDeleteFilter(prev, "gst_status", value)
                  );
                }}
                options={gstStatusOptions}
              />
            </div>

            <div className="flex flex-col">
              <span className=" text-[12px] font-semibold">Replaced</span>
              <Select
                allowClear
                style={{ width: "100%" }}
                value={filters.replaced}
                placeholder="Please select"
                onChange={(value?: "Y" | "N") => {
                  onFiltersChange((prev) =>
                    setOrDeleteFilter(prev, "replaced", value)
                  );
                }}
                options={replacedOptions}
              />
            </div>

            <div className="flex flex-col">
              <span className=" text-[12px] font-semibold">State</span>
              <Select
                mode="multiple"
                allowClear
                style={{ width: "100%" }}
                value={filters.state?.split(",")}
                placeholder="Please select"
                showSearch={{ optionFilterProp: "label" }}
                onChange={(val: string[]) => {
                  onFiltersChange((prev) =>
                    setOrDeleteFilter(
                      prev,
                      "state",
                      val.length ? val.join(",") : undefined
                    )
                  );
                }}
                options={stateOptions}
              />
            </div>

            <div className="flex flex-col">
              <span className=" text-[12px] font-semibold">
                ABN Status From
              </span>
              <RangePicker
                format="YYYY-MM-DD"
                value={
                  filters.abn_status_from_date?.from &&
                  filters.abn_status_from_date?.to
                    ? [
                        dayjs(filters.abn_status_from_date.from),
                        dayjs(filters.abn_status_from_date.to),
                      ]
                    : undefined
                }
                onChange={(dates, dateStrings) => {
                  onFiltersChange((prev) =>
                    setOrDeleteFilter(
                      prev,
                      "abn_status_from_date",
                      dates
                        ? {
                            from: dateStrings[0],
                            to: dateStrings[1],
                          }
                        : undefined
                    )
                  );
                }}
              />
            </div>

            <div className="flex flex-col">
              <span className=" text-[12px] font-semibold">
                GST Status From
              </span>
              <RangePicker
                format="YYYY-MM-DD"
                value={
                  filters.gst_status_from_date?.from &&
                  filters.gst_status_from_date?.to
                    ? [
                        dayjs(filters.gst_status_from_date.from),
                        dayjs(filters.gst_status_from_date.to),
                      ]
                    : undefined
                }
                onChange={(dates, dateStrings) => {
                  onFiltersChange((prev) =>
                    setOrDeleteFilter(
                      prev,
                      "gst_status_from_date",
                      dates
                        ? {
                            from: dateStrings[0],
                            to: dateStrings[1],
                          }
                        : undefined
                    )
                  );
                }}
              />
            </div>

            <div className="flex flex-col">
              <span className=" text-[12px] font-semibold">
                Record Last Updated
              </span>
              <RangePicker
                format="YYYY-MM-DD"
                value={
                  filters.record_last_updated?.from &&
                  filters.record_last_updated?.to
                    ? [
                        dayjs(filters.record_last_updated.from),
                        dayjs(filters.record_last_updated.to),
                      ]
                    : undefined
                }
                onChange={(dates, dateStrings) => {
                  onFiltersChange((prev) =>
                    setOrDeleteFilter(
                      prev,
                      "record_last_updated",
                      dates
                        ? {
                            from: dateStrings[0],
                            to: dateStrings[1],
                          }
                        : undefined
                    )
                  );
                }}
              />
            </div>
          </div>
        </div>
        <button
          className="mt-auto py-2 px-4 border rounded-sm bg-blue-600 text-white w-full cursor-pointer hover:bg-blue-500 disabled:cursor-not-allowed"
          disabled={Object.keys(filters).length === 0}
          onClick={() => {
            onSearch(filters);
          }}
        >
          Search
        </button>
        <button
          className="mt-auto py-2 px-4 border rounded-sm bg-red-400 text-white w-full cursor-pointer hover:bg-red-300 disabled:cursor-not-allowed"
          disabled={Object.keys(filters).length === 0}
          onClick={() => {
            const emptyFilters: ABNFilter = {};
            onFiltersChange(emptyFilters);
            onSearch(emptyFilters);
          }}
        >
          Clear Filters
        </button>
      </div>
    </div>
  );
};

export default SideBar;
