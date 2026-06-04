const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

interface ApiResponse<T> {
  data: T;
  meta?: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}

interface ApiError {
  message: string;
  statusCode: number;
}

function getToken(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('token');
}

export async function fetchApi<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<ApiResponse<T>> {
  const token = getToken();
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...(options.headers || {}),
  };

  if (token) {
    (headers as Record<string, string>)['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers,
  });

  const data = await response.json();

  if (!response.ok) {
    const error: ApiError = {
      message: data.message || 'An error occurred',
      statusCode: response.status,
    };
    throw error;
  }

  return data;
}

// Auth
export async function register(body: { email: string; password: string; name: string }) {
  return fetchApi<{ token: string }>('/auth/register', {
    method: 'POST',
    body: JSON.stringify(body),
  });
}

export async function login(body: { email: string; password: string }) {
  return fetchApi<{ token: string }>('/auth/login', {
    method: 'POST',
    body: JSON.stringify(body),
  });
}

export async function getProfile() {
  return fetchApi<{ id: string; email: string; name: string }>('/auth/me');
}

// Colleges
export interface College {
  id: string;
  name: string;
  location: string;
  type: 'GOVERNMENT' | 'PRIVATE' | 'DEEMED';
  fees: number;
  rating: number;
  established: number;
  overview?: string;
  website?: string;
  image?: string;
  courses?: Course[];
  placements?: Placement[];
  reviews?: Review[];
}

export interface Course {
  id: string;
  name: string;
  duration: string;
  fees: number;
  seats: number;
}

export interface Placement {
  id: string;
  year: number;
  avgPackage: number;
  highestPackage: number;
  placementRate: number;
  topRecruiters: string[];
}

export interface Review {
  id: string;
  rating: number;
  title: string;
  body: string;
  author: string;
  batch: string;
  createdAt: string;
}

export interface SearchParams {
  search?: string;
  location?: string;
  type?: string;
  minFees?: number;
  maxFees?: number;
  minRating?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  page?: number;
  limit?: number;
}

export async function searchColleges(params: SearchParams = {}) {
  const query = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== '' && value !== null) {
      query.append(key, String(value));
    }
  });
  const queryString = query.toString();
  return fetchApi<College[]>(`/colleges${queryString ? `?${queryString}` : ''}`);
}

export async function getCollege(id: string) {
  return fetchApi<College>(`/colleges/${id}`);
}

export async function compareColleges(ids: string[]) {
  return fetchApi<College[]>(`/compare?ids=${ids.join(',')}`);
}

// Saved
export async function getSavedColleges() {
  return fetchApi<College[]>('/saved');
}

export async function saveCollege(collegeId: string) {
  return fetchApi<{ id: string }>(`/saved/${collegeId}`, { method: 'POST' });
}

export async function unsaveCollege(collegeId: string) {
  return fetchApi<{ id: string }>(`/saved/${collegeId}`, { method: 'DELETE' });
}

export async function checkSaveStatus(collegeId: string) {
  return fetchApi<{ isSaved: boolean }>(`/saved/${collegeId}/status`);
}
