import { useEffect, useState } from "react";
import { Table } from "antd";
import type { TableColumnsType } from "antd";
//import { createStyles } from "antd-style";

import { fetchABNDataApi } from "../api_service/apiService.ts";

const TableLayout = () => {
  const [tableData, setTableData] = useState<ABNRow[]>([]);

  interface ABNRow {
    _id: string;
    abn: string;
    entity_name: string;
    other_entities: string[];
    entity_type: string;
    abn_status: string;
    abn_status_from_date: string;
    gst_status?: string;
    gst_status_from_date?: string;
    state?: string;
    postcode?: string;
    asic_number?: string;
    asic_number_type?: string;
    replaced?: "Y" | "N";
    record_last_updated: string;
  }

  const columns: TableColumnsType<ABNRow> = [
    /* ================= FIXED LEFT ================= */
    {
      title: "ABN",
      dataIndex: "abn",
      key: "abn",
      width: 160,
      fixed: "left",
    },
    {
      title: "Entity Name",
      dataIndex: "entity_name",
      key: "entity_name",
      width: 280,
      fixed: "left",
      ellipsis: true,
    },

    /* ================= SCROLLABLE ================= */
    {
      title: "Entity Type",
      dataIndex: "entity_type",
      key: "entity_type",
      width: 120,
    },
    {
      title: "ABN Status",
      dataIndex: "abn_status",
      key: "abn_status",
      width: 110,
    },
    {
      title: "ABN Status From",
      dataIndex: "abn_status_from_date",
      key: "abn_status_from_date",
      width: 150,
      render: (v) => new Date(v).toLocaleDateString(),
    },
    {
      title: "GST Status",
      dataIndex: "gst_status",
      key: "gst_status",
      width: 110,
      render: (v) => v ?? "-",
    },
    {
      title: "GST Status From",
      dataIndex: "gst_status_from_date",
      key: "gst_status_from_date",
      width: 150,
      render: (v) => (v ? new Date(v).toLocaleDateString() : "-"),
    },
    {
      title: "State",
      dataIndex: "state",
      key: "state",
      width: 90,
    },
    {
      title: "Postcode",
      dataIndex: "postcode",
      key: "postcode",
      width: 100,
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
      render: (v) => new Date(v).toLocaleDateString(),
    },

    /* ================= FIXED RIGHT ================= */
    {
      title: "Action",
      key: "action",
      fixed: "right",
      width: 120,
      render: (_, record) => (
        <a onClick={() => console.log("View ABN:", record.abn)}>View</a>
      ),
    },
  ];

  //function to fetch menu items
  const fetchMenuItems = async () => {
    try {
      const data = await fetchABNDataApi({
        page: 1,
        limit: 10,
      });

      console.log("data :", data);

      setTableData(data?.data);
    } catch (error: any) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchMenuItems();
  }, []);

  return (
    <div>
      <Table<ABNRow>
        rowKey="_id"
        columns={columns}
        dataSource={tableData}
        //loading={loading}
        //   pagination={{
        //     current: pagination?.page,
        //     pageSize: pagination?.limit,
        //     total: pagination?.total,
        //     showSizeChanger: true,
        //   }}
        scroll={{ x: 2200 }} // REQUIRED
      />
    </div>
  );
};

export default TableLayout;
