import { useEffect, useState } from "react";
import { Table } from "antd";
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

const MainLayout = () => {
  const [filters, setFilters] = useState<ABNFilter>({});
  const [tableData, setTableData] = useState<ABNRow[]>([]);
  const [loading, setLoading] = useState(false);

  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
    hasNextPage: false,
    hasPrevPage: false,
  });

  const formatDate = (v?: string) => {
    if (!v) return "-";
    return new Date(v).toISOString().split("T")[0];
  };

  const columns: TableColumnsType<ABNRow> = [
    /* ================= FIXED LEFT ================= */
    {
      title: "ABN",
      dataIndex: "abn",
      key: "abn",
      width: 160,
      fixed: "left",
      className: "font-semibold",
    },
    {
      title: "Entity Name",
      dataIndex: "entity_name",
      key: "entity_name",
      width: 280,
      fixed: "left",
      className: "font-bold",
      ellipsis: true,
    },

    /* ================= SCROLLABLE ================= */
    {
      title: "Entity Type",
      dataIndex: "entity_type",
      key: "entity_type",
      render: (v) => entityTypeLabelMap[v] ?? v ?? "-",
      width: 150,
    },
    {
      title: "ABN Status",
      dataIndex: "abn_status",
      key: "abn_status",
      width: 110,
      align: "center",
      render: (v) => (
        <CustomStatusPill value={v} label={abnStatusLabelMap[v] ?? v ?? "-"} />
      ),
    },
    {
      title: "ABN Status From",
      dataIndex: "abn_status_from_date",
      key: "abn_status_from_date",
      width: 150,
      render: formatDate,
      align: "center",
    },
    {
      title: "GST Status",
      dataIndex: "gst_status",
      key: "gst_status",
      width: 110,
      align: "center",
      render: (v) => (
        <CustomStatusPill value={v} label={abnStatusLabelMap[v] ?? v ?? "-"} />
      ),
    },
    {
      title: "GST Status From",
      dataIndex: "gst_status_from_date",
      key: "gst_status_from_date",
      width: 150,
      render: formatDate,
      align: "center",
    },
    {
      title: "State",
      dataIndex: "state",
      key: "state",
      width: 140,
      render: (v) => stateLabelMap[v] ?? v ?? "-",
    },
    {
      title: "Postcode",
      dataIndex: "postcode",
      key: "postcode",
      width: 100,
      align: "center",
    },
    {
      title: "ASIC Number",
      dataIndex: "asic_number",
      key: "asic_number",
      width: 140,
    },
    {
      title: "ASIC Type",
      dataIndex: "asic_number_type",
      key: "asic_number_type",
      width: 140,
    },
    {
      title: "Replaced",
      dataIndex: "replaced",
      key: "replaced",
      width: 100,
      render: (v) => (v === "Y" ? "Yes" : "No"),
      align: "center",
    },
    {
      title: "Other Entities",
      dataIndex: "other_entities",
      key: "other_entities",
      width: 320,
      ellipsis: true,
      render: (arr: string[]) => (arr?.length ? arr.join(", ") : "-"),
    },
    {
      title: "Last Updated",
      dataIndex: "record_last_updated",
      key: "record_last_updated",
      width: 160,
      render: formatDate,
      align: "center",
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

  const handleTableChange = (pg: any) => {
    fetchABNdata(pg.current, pg.pageSize);
  };

  const handleSearch = (newFilters: ABNFilter) => {
    setFilters(newFilters);
    fetchABNdata(1, pagination.pageSize, newFilters);
  };

  useEffect(() => {
    fetchABNdata();
  }, []);

  return (
    <div className="p-4 relative">
      <SideBar
        filters={filters}
        onFiltersChange={setFilters}
        onSearch={handleSearch}
      />

      <div className=" border border-gray-300 rounded-sm w-full shadow-2xl">
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
    </div>
  );
};

export default MainLayout;
