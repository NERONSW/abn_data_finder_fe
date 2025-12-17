interface otherEntities {
  name: string;
  type: string;
}

interface IndividualNameParts {
  title?: string;
  given_names: string[];
  family_name: string;
}

export interface ABNRow {
  _id: string;
  abn: string;
  entity_name: string;
  name_type: string;
  other_entities?: otherEntities[];
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
  individual_parts?: IndividualNameParts;
}
