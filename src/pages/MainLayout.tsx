import { useEffect, useState } from "react";
import { Table, Tooltip, Typography } from "antd";
import type { TableColumnsType } from "antd";
import { fetchABNDataApi } from "../api_service/apiService.ts";
import SideBar from "./SideBar.tsx";
import type { ABNRow } from "../assets/interfaces/abnTableRowTypes.ts";
import { entityTypeLabelMap } from "../assets/selector_data/entityTypeOption.ts";
import { abnStatusLabelMap } from "../assets/selector_data/abnStatusOptions.ts";
import { stateLabelMap } from "../assets/selector_data/stateOptions.ts";
import CustomStatusPill from "../assets/components/CustomStatusPill.tsx";
import {
  mapABNFilterToParams,
  type ABNFilter,
} from "../assets/interfaces/filterTypes.ts";
import type { FetchABNParams } from "../assets/interfaces/abnApiTypes.ts";
import { nameTypeLabelMap } from "../assets/selector_data/nameTypeOptions.ts";
import { ListChevronsIcon } from "../assets/icons/Icons.tsx";
import CustomMoreDetailsModal from "../assets/components/CustomMoreDetailsModal.tsx";

const MainLayout = () => {
  const [filters, setFilters] = useState<ABNFilter>({});
  const [tableData, setTableData] = useState<ABNRow[]>([]);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState<ABNRow | null>(null);

  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
    hasNextPage: false,
    hasPrevPage: false,
  });

  const { Text } = Typography;

  //Helper function to format date
  const formatDate = (v?: string) => {
    if (!v) return "-";
    return new Date(v).toISOString().split("T")[0];
  };

  //Table columns
  const columns: TableColumnsType<ABNRow> = [
    {
      title: "ABN",
      dataIndex: "abn",
      key: "abn",
      width: 60,
      fixed: "left",
      render: (v) => (
        <Text copyable={{ text: v }}>
          <span className="font-mono font-semibold text-[13px]">{v}</span>
        </Text>
      ),
    },
    {
      title: "Name And Name Type",
      key: "entity",
      width: 180,
      fixed: "left",
      align: "center",
      ellipsis: true,
      render: (_, record) => {
        const isLong = record.entity_name && record.entity_name.length > 40;
        const displayName = isLong
          ? `${record.entity_name.slice(0, 40)}...`
          : record.entity_name;

        return (
          <div className="flex flex-col gap-1 items-center justify-center">
            {isLong ? (
              <Tooltip placement="bottom" title={record.entity_name}>
                <span className="font-semibold cursor-help text-center">
                  {displayName}
                </span>
              </Tooltip>
            ) : (
              <span className="font-semibold text-center">{displayName}</span>
            )}
            <span className="text-[12px] tracking-wider text-gray-400 text-center">
              ({nameTypeLabelMap[record.name_type] || record.name_type})
            </span>
          </div>
        );
      },
    },
    {
      title: "Entity Type",
      dataIndex: "entity_type",
      key: "entity_type",
      width: 150,
      align: "center",
      render: (v) => (
        <span className="font-semibold text-[13px] text-center">
          {entityTypeLabelMap[v]}
        </span>
      ),
    },
    {
      title: "Location",
      key: "location",
      width: 80,
      align: "center",
      render: (_, record) => (
        <div className="flex flex-col items-center gap-1">
          {record.state ? (
            <Tooltip placement="bottom" title={stateLabelMap[record.state]}>
              <span
                className="px-2 py-0.5 bg-gray-100 text-gray-700 text-[11px] font-bold rounded border
           border-gray-200 uppercase tracking-tighter cursor-pointer"
              >
                {record.state}
              </span>
            </Tooltip>
          ) : (
            <span
              className="px-2 py-0.5 bg-gray-100 text-gray-700 text-[11px] font-bold rounded border
           border-gray-200 uppercase tracking-tighter cursor-pointer"
            >
              N/A
            </span>
          )}
          <span className="text-[12px] font-medium text-gray-400">
            Postcode {record.postcode || "----"}
          </span>
        </div>
      ),
    },
    {
      title: "ABN Status",
      key: "abn_status_combined",
      width: 100,
      align: "center",
      render: (_, record) => (
        <div className="flex flex-col items-center justify-center gap-1">
          <CustomStatusPill
            value={record.abn_status}
            label={abnStatusLabelMap[record.abn_status] ?? record.abn_status}
          />
          <span className="text-[12px] font-medium text-gray-400">
            Since: {formatDate(record.abn_status_from_date)}
          </span>
        </div>
      ),
    },
    {
      title: "GST Status",
      key: "gst_status",
      width: 100,
      align: "center",
      render: (_, record) =>
        record.gst_status ? (
          <div className="flex flex-col items-center justify-center gap-1">
            <CustomStatusPill
              value={record.gst_status}
              label={abnStatusLabelMap[record.gst_status] ?? record.gst_status}
            />
            {record.gst_status !== "NON" ? (
              <span className="text-[12px] font-medium text-gray-400">
                Since: {formatDate(record.gst_status_from_date)}
              </span>
            ) : null}
          </div>
        ) : (
          "-"
        ),
    },
    {
      title: "ASIC No",
      dataIndex: "asic_number",
      key: "asic_number",
      width: 100,
      align: "center",
      render: (v) =>
        v ? (
          <Text copyable={{ text: v }}>
            <span className="font-mono font-semibold text-[13px]">{v}</span>
          </Text>
        ) : (
          <span className="text-gray-400 italic">—</span>
        ),
    },
    {
      title: "Metadata",
      key: "technical",
      width: 120,
      render: (_, record) => (
        <div className="text-[12px] font-medium text-gray-400">
          <div>Updated: {formatDate(record.record_last_updated)}</div>
          <div>Replaced: {record.replaced === "Y" ? "Yes" : "No"}</div>
        </div>
      ),
    },
    {
      title: "Details",
      key: "details",
      width: 60,
      align: "center",
      render: (_, record) => {
        const hasExtraData =
          record.individual_parts ||
          (record.other_entities && record.other_entities?.length > 0);

        return hasExtraData ? (
          <Tooltip title="View additional details">
            <span
              className=" flex items-center justify-center cursor-pointer"
              onClick={() => {
                showDetails(record);
              }}
            >
              <ListChevronsIcon size={20} />
            </span>
          </Tooltip>
        ) : (
          <span className="text-gray-300">—</span>
        );
      },
    },
  ];

  //function to ABN data
  const fetchABNdata = async (
    page = 1,
    limit = 10,
    appliedFilters: ABNFilter = filters
  ) => {
    try {
      setLoading(true);

      const params: FetchABNParams = mapABNFilterToParams(appliedFilters);

      const res = await fetchABNDataApi({
        page,
        limit,
        ...params,
      });
      setTableData(res.data);
      setPagination({
        current: res.pagination.page,
        pageSize: res.pagination.limit,
        total: res.pagination.total,
        hasNextPage: res.pagination.hasNextPage,
        hasPrevPage: res.pagination.hasPrevPage,
      });
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  //Handle pagination
  const handleTableChange = (pg: any) => {
    fetchABNdata(pg.current, pg.pageSize);
  };

  //Handle search
  const handleSearch = (newFilters: ABNFilter) => {
    setFilters(newFilters);
    fetchABNdata(1, pagination.pageSize, newFilters);
  };

  //function to set data and open modal
  const showDetails = (record: ABNRow) => {
    setSelectedRecord(record);
    setIsModalOpen(true);
  };

  //Close modal and reset state
  const onMoreDetailsModalClose = () => {
    setIsModalOpen(false);
    setSelectedRecord(null);
  };

  useEffect(() => {
    fetchABNdata();
  }, []);

  return (
    <div className="p-6 relative">
      {/* Sidebar */}
      <SideBar
        filters={filters}
        onFiltersChange={setFilters}
        onSearch={handleSearch}
      />

      {/* Table Component */}
      <div className=" border border-gray-300 rounded-sm w-full shadow-2xl bg-white">
        <span className="w-full text-center text-2xl p-4 block border-b border-b-gray-300 font-bold">
          ABN Data Finder
        </span>
        <Table<ABNRow>
          rowKey="_id"
          columns={columns}
          dataSource={tableData}
          loading={loading}
          pagination={{
            current: pagination.current,
            pageSize: pagination.pageSize,
            total: pagination.total,
            showSizeChanger: true,
            showTotal: (total) => `Total ${total.toLocaleString()} records`,
          }}
          onChange={handleTableChange}
          scroll={{ x: 2200 }}
        />
      </div>

      {/* Modal */}
      <CustomMoreDetailsModal
        record={selectedRecord}
        isOpen={isModalOpen}
        onClose={() => {
          onMoreDetailsModalClose();
        }}
      />
    </div>
  );
};

export default MainLayout;
