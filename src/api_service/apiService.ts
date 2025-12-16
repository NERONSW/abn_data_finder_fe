import axios from "axios";
import type { ABN, FetchABNParams } from "../assets/interfaces/abnApiTypes.ts";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const fetchABNDataApi = async (
  params: FetchABNParams
): Promise<{
  data: ABN[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
  };
}> => {
  try {
    const response = await axios.get(`${API_BASE_URL}api/abn-data`, {
      params,
    });

    return {
      data: response?.data?.data ?? [],
      pagination: response?.data?.pagination,
    };
  } catch (error) {
    console.error("API Error: Failed to load ABN data", error);
    throw new Error("Failed to load ABN data.");
  }
};
