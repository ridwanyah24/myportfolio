export type AuthResponse = {
    email: string;
    password: string;
  };

export type ApiResponse = {
  access_token: string;
  isAuthenticated: boolean;
  status: string;
  
};

  export type ProjectResponse = {
    status: 'success' | 'sucess'; // Handling the typo 'sucess' for safety
    data: {
      created_at: string; // ISO 8601 timestamp
      updated_at: string; // ISO 8601 timestamp
      name: string;
      description: string;
      url: string;
      image: string;
    };
};
