import type { FetchABNParams } from "./abnApiTypes";

export interface ABNFilter {
  abn?: string;
  entity_name?: string;
  other_entities?: string;
  entity_type?: string;
  abn_status?: string;
  abn_status_from_date?: { from?: string; to?: string };
  gst_status?: string;
  gst_status_from_date?: { from?: string; to?: string };
  state?: string;
  postcode?: string;
  asic_number?: string;
  replaced?: "Y" | "N";
  record_last_updated?: { from?: string; to?: string };
}

export const mapABNFilterToParams = (filter: ABNFilter): FetchABNParams => {
  const params: FetchABNParams = {};

  // Simple string fields
  if (filter.abn) params.abn = filter.abn;
  if (filter.state) params.state = filter.state;
  if (filter.postcode) params.postcode = filter.postcode;
  if (filter.entity_type) params.entity_type = filter.entity_type;
  if (filter.abn_status) params.abn_status = filter.abn_status;
  if (filter.gst_status) params.gst_status = filter.gst_status;
  if (filter.replaced) params.replaced = filter.replaced;
  if (filter.asic_number) params.asic_number = filter.asic_number;

  // For search, skip empty strings
  const searchVal = filter.entity_name ?? filter.other_entities;
  if (searchVal) params.search = searchVal;

  // Date ranges
  if (filter.abn_status_from_date?.from)
    params.abn_status_from_date_start = filter.abn_status_from_date.from;
  if (filter.abn_status_from_date?.to)
    params.abn_status_from_date_end = filter.abn_status_from_date.to;

  if (filter.gst_status_from_date?.from)
    params.gst_status_from_date_start = filter.gst_status_from_date.from;
  if (filter.gst_status_from_date?.to)
    params.gst_status_from_date_end = filter.gst_status_from_date.to;

  if (filter.record_last_updated?.from)
    params.record_last_updated_start = filter.record_last_updated.from;
  if (filter.record_last_updated?.to)
    params.record_last_updated_end = filter.record_last_updated.to;

  return params;
};
