export interface LoginRequest {
  email?: string | null;
  password?: string | null;
}


export interface RegisterRequest {
  firstName?: string | null;
  lastName?: string | null;
  email?: string | null;
  password?: string | null;
}

export interface AuthResponse {
  firstName: string | null;
  lastName: string | null;
  token: string;
  email: string;
  role: string;
}

export interface RegisterResponse {
  message?: string | null | undefined;
}
