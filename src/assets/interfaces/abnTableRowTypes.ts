export interface ABNRow {
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
