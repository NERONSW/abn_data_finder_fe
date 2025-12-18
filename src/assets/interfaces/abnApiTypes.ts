interface otherEntities {
  name: string;
  type: string;
}

interface IndividualNameParts {
  title?: string;
  given_names: string[];
  family_name: string;
}
export interface ABN {
  _id: string;
  abn: string;
  entity_name: string;
  name_type: string;
  other_entities?: otherEntities[];
  state: string;
  postcode?: string;
  entity_type: string;
  abn_status: string;
  abn_status_from_date: string;
  gst_status?: string;
  gst_status_from_date?: string;
  asic_number?: string;
  replaced: "Y" | "N";
  record_last_updated: string;
  individual_parts?: IndividualNameParts;
}

export interface FetchABNParams {
  page?: number;
  limit?: number;
  abn?: string;
  name_type?: string;
  state?: string;
  postcode?: string;
  entity_type?: string;
  abn_status?: string;
  gst_status?: string;
  replaced?: "Y" | "N";
  asic_number?: string;
  search?: string;

  abn_status_from_date_start?: string;
  abn_status_from_date_end?: string;

  gst_status_from_date_start?: string;
  gst_status_from_date_end?: string;

  record_last_updated_start?: string;
  record_last_updated_end?: string;
}
