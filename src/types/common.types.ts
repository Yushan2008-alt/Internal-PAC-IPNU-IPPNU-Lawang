import { UserRole } from "@/lib/constants";

export interface CurrentUser {
  id: string;
  email: string;
  role: UserRole;
  fullName: string;
  departmentId: string | null;
  departmentName?: string;
  avatarUrl?: string | null;
}

export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

export interface PaginationParams {
  page: number;
  pageSize: number;
  search?: string;
}

export interface PaginatedResult<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}
