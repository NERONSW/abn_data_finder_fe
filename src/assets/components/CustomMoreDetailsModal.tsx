import { Modal } from "antd";
import { entityTypeLabelMap } from "../selector_data/entityTypeOption";
import type { ABNRow } from "../interfaces/abnTableRowTypes";
import { nameTypeLabelMap } from "../selector_data/nameTypeOptions";

interface EntityDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  record: ABNRow | null;
}

const CustomMoreDetailsModal = ({
  isOpen,
  onClose,
  record,
}: EntityDetailModalProps) => {
  return (
    <Modal
      title={<span className="text-lg font-bold">Extra Entity Details</span>}
      centered
      open={isOpen}
      onCancel={() => onClose()}
      footer={null}
      width={600}
    >
      <div className="flex flex-col gap-6 p-2">
        {/* Name section */}
        {record?.individual_parts && (
          <div className="bg-slate-50 p-4 rounded-lg border border-slate-100">
            <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
              {entityTypeLabelMap[record.entity_type]}
            </h4>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-gray-500 m-0">Family Name</p>
                <p className="text-base font-bold text-slate-800 uppercase">
                  {record.individual_parts.family_name}
                </p>
              </div>
              <div>
                <p className="text-xs text-gray-500 m-0">Given Names</p>
                <p className="text-base font-semibold text-slate-700">
                  {record.individual_parts.title &&
                    `${record.individual_parts.title} `}
                  {record.individual_parts.given_names.join(" ")}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Other entities section */}
        {record?.other_entities && record.other_entities.length > 0 ? (
          <div>
            <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-2">
              Other Entities
              <span className="bg-slate-200 text-slate-600 px-2 py-0.5 rounded-full text-[10px]">
                {record.other_entities.length}
              </span>
            </h4>

            <div className="max-h-60 overflow-y-auto border rounded-md divide-y divide-slate-100">
              {record.other_entities.map((ent, idx) => (
                <div
                  key={idx}
                  className="p-3 hover:bg-slate-50 flex justify-between items-center transition-colors"
                >
                  <span className="font-medium text-slate-700">{ent.name}</span>
                  {ent.type && (
                    <span className="text-[11px] text-blue-600 bg-blue-50 px-2 py-1 rounded font-medium">
                      {nameTypeLabelMap[ent.type] || ent.type}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="text-center py-4 text-gray-400 italic text-sm">
            No other entities registered for this ABN.
          </div>
        )}
      </div>
    </Modal>
  );
};

export default CustomMoreDetailsModal;
