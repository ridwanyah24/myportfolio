export type AuthResponse = {
    email: string;
    password: string;
  };

export type ApiResponse = {
    data: { user: AuthResponse; accessToken: string; isAuth: boolean; };
    status: 'success';
    access_token: string;
  };