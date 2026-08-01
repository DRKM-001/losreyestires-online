// API Client for External Authentication
// Integrates with TireRaven ERP Customer Portal API

const API_BASE_URL = '/api/customer';

export interface RegisterData {
  email: string;
  password: string;
  first_name: string;
  last_name: string;
  company?: string;
  phone?: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface AuthResponse {
  success: boolean;
  token: string;
  expires_at: string;
  customer: Customer;
  message?: string;
}

export interface Customer {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  company?: string;
  phone?: string;
  email_verified: boolean;
  created_at?: string;
}

export interface ProfileResponse {
  success: boolean;
  customer: Customer;
}

export interface OrdersResponse {
  success: boolean;
  orders?: Array<Record<string, unknown>>;
  message?: string;
}

export interface OrderResponse {
  success: boolean;
  order?: Record<string, unknown>;
  message?: string;
}

class AuthAPIError extends Error {
  constructor(
    message: string,
    public status?: number,
    public code?: string
  ) {
    super(message);
    this.name = 'AuthAPIError';
  }
}

async function fetchAPI<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`;

  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  try {
    const response = await fetch(url, {
      ...options,
      headers,
    });

    const data = await response.json();

    if (!response.ok) {
      throw new AuthAPIError(
        data.message || data.error || 'An error occurred',
        response.status,
        data.error_code
      );
    }

    return data;
  } catch (error) {
    if (error instanceof AuthAPIError) {
      throw error;
    }
    throw new AuthAPIError('Network error or server unavailable');
  }
}

export const authAPI = {
  /**
   * Register a new customer account
   */
  register: async (data: RegisterData): Promise<AuthResponse> => {
    return fetchAPI<AuthResponse>('/auth/register', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  /**
   * Login with email and password
   */
  login: async (data: LoginData): Promise<AuthResponse> => {
    return fetchAPI<AuthResponse>('/auth/login', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  /**
   * Logout from current session
   */
  logout: async (token: string): Promise<{ success: boolean; message: string }> => {
    return fetchAPI('/auth/logout', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },

  /**
   * Logout from all devices
   */
  logoutAll: async (token: string): Promise<{ success: boolean; message: string }> => {
    return fetchAPI('/auth/logout_all', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },

  /**
   * Refresh JWT token
   */
  refreshToken: async (token: string): Promise<AuthResponse> => {
    return fetchAPI<AuthResponse>('/auth/refresh', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },

  /**
   * Request password reset
   */
  forgotPassword: async (email: string): Promise<{ success: boolean; message: string }> => {
    return fetchAPI('/auth/forgot-password', {
      method: 'POST',
      body: JSON.stringify({ email }),
    });
  },

  /**
   * Reset password with token
   */
  resetPassword: async (
    token: string,
    password: string
  ): Promise<{ success: boolean; message: string }> => {
    return fetchAPI('/auth/reset-password', {
      method: 'POST',
      body: JSON.stringify({ token, password }),
    });
  },

  /**
   * Get customer profile
   */
  getProfile: async (token: string): Promise<ProfileResponse> => {
    return fetchAPI<ProfileResponse>('/profile', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },

  /**
   * Update customer profile
   */
  updateProfile: async (
    token: string,
    data: Partial<Omit<Customer, 'id' | 'email' | 'email_verified' | 'created_at'>>
  ): Promise<ProfileResponse> => {
    return fetchAPI<ProfileResponse>('/profile', {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });
  },

  /**
   * Change password
   */
  changePassword: async (
    token: string,
    currentPassword: string,
    newPassword: string
  ): Promise<{ success: boolean; message: string }> => {
    return fetchAPI('/profile/password', {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        current_password: currentPassword,
        new_password: newPassword,
      }),
    });
  },

  /**
   * Get customer orders
   */
  getOrders: async (token: string, page: number = 1, perPage: number = 20): Promise<OrdersResponse> => {
    return fetchAPI<OrdersResponse>(`/customer/orders?page=${page}&per_page=${perPage}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },

  /**
   * Get single order details
   */
  getOrder: async (token: string, orderId: string): Promise<OrderResponse> => {
    return fetchAPI<OrderResponse>(`/customer/orders/${orderId}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
};

export { AuthAPIError };
