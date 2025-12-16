// Determine API base URL
// In development mode, FORCE localhost to prevent accidental production API calls
const getApiBaseUrl = () => {
  // If in development mode, ALWAYS use localhost (ignore .env if it has production URL)
  if (import.meta.env.DEV) {
    const envUrl = import.meta.env.VITE_API_BASE_URL as string | undefined;
    // Check if env has production URL and warn
    if (envUrl && envUrl.includes('admin.purplegridmarketing.com')) {
      console.warn('⚠️ WARNING: .env has production URL but you are in DEV mode.');
      console.warn('⚠️ Forcing localhost API. Update .env to: VITE_API_BASE_URL=http://localhost:8000/api');
      return 'http://localhost:8000/api';
    }
    return (envUrl?.replace(/\/$/, '') || 'http://localhost:8000/api');
  }
  // In production build, use environment variable or default to production
  return (import.meta.env.VITE_API_BASE_URL as string | undefined)?.replace(/\/$/, '') ||
    'https://admin.purplegridmarketing.com/api';
};

const apiBaseUrl = getApiBaseUrl();

// Debug: Log the API base URL in development
// if (import.meta.env.DEV) {
//   console.log('🔧 API Base URL:', apiBaseUrl);
//   console.log('🔧 VITE_API_BASE_URL env:', import.meta.env.VITE_API_BASE_URL);
//   console.log('🔧 Mode:', import.meta.env.MODE);
// }

type ContactPayload = {
  name: string;
  email: string;
  message: string;
  phone?: string;
  subject?: string;
};

export type User = {
  id: number;
  name: string;
  email: string;
  role_id?: number;
};

type AuthResponse = {
  token: string;
  user: User;
};

class ApiError extends Error {
  status: number;
  details?: unknown;

  constructor(message: string, status: number, details?: unknown) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.details = details;
  }
}

const handleResponse = async (response: Response) => {
  const data = await response.json().catch(() => null);

  if (!response.ok) {
    const message = (data as { message?: string } | null)?.message ?? 'Request failed';
    const errors = (data as { errors?: unknown } | null)?.errors ?? data;
    throw new ApiError(message, response.status, errors);
  }

  return data;
};

export const submitContactInquiry = async (payload: ContactPayload) => {
  const response = await fetch(`${apiBaseUrl}/contact`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify(payload),
  });

  return handleResponse(response);
};

export const registerUser = async (payload: {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
  company?: string;
  role_id?: number;
}) => {
  const response = await fetch(`${apiBaseUrl}/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify(payload),
  });

  return handleResponse(response) as Promise<AuthResponse>;
};

export const loginUser = async (payload: { email: string; password: string }) => {
  const response = await fetch(`${apiBaseUrl}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify(payload),
  });

  return handleResponse(response) as Promise<AuthResponse>;
};

export const fetchCurrentUser = async (token: string) => {
  const response = await fetch(`${apiBaseUrl}/me`, {
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });

  return handleResponse(response) as Promise<User>;
};

export const logoutUser = async (token: string) => {
  const response = await fetch(`${apiBaseUrl}/logout`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });

  if (response.status === 401) {
    return;
  }

  return handleResponse(response);
};

export const requestPasswordReset = async (email: string) => {
  const response = await fetch(`${apiBaseUrl}/forgot-password`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({ email }),
  });

  return handleResponse(response) as Promise<{ success: boolean; message: string; token?: string }>;
};

export const resetPassword = async (payload: {
  email: string;
  token: string;
  password: string;
  password_confirmation: string;
}) => {
  const response = await fetch(`${apiBaseUrl}/reset-password`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify(payload),
  });

  return handleResponse(response) as Promise<{ success: boolean; message: string }>;
};

export type AmazonFormPayload = {
  niche?: string;
  location?: string;
  revenue?: string;
  adBudget?: string;
  businessType?: string;
  gridTeam?: string[];
  email?: string;
  name?: string;
  phone?: string;
};

export const submitAmazonForm = async (payload: AmazonFormPayload) => {
  const response = await fetch(`${apiBaseUrl}/amazon-form`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({
      niche: payload.niche,
      location: payload.location,
      revenue: payload.revenue,
      ad_budget: payload.adBudget,
      business_type: payload.businessType,
      grid_team: payload.gridTeam,
      email: payload.email,
      name: payload.name,
      phone: payload.phone,
    }),
  });

  return handleResponse(response) as Promise<{ success: boolean; message: string; data?: unknown }>;
};

export { apiBaseUrl, ApiError };
