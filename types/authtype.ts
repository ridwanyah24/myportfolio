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

export type Project = {
  created_at: string; // ISO date string
  updated_at: string; // ISO date string
  name: string;       // Project name
  description: string; // Project description
  url: string;        // Project URL
  image: string;      // Project image (likely a URL or file path)
};

export type GetProjects = {
  status: "success" | "error"; // Could handle error cases in the future
  data: Project[];            // Array of projects
};
