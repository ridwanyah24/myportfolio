

export type CreateCompanyResponse = {
    status: 'success' | 'sucess'; // Handling the typo 'sucess' for safety
    data: {
      created_at: string; // ISO 8601 timestamp
      updated_at: string; // ISO 8601 timestamp
      name: string;
      description: string;
    };
  };
  