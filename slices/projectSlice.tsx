import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ProjectResponse } from "../types/authtype";


type ProjectState = {
    project: ProjectResponse | null;
    isLoading: boolean;
    error: string | null;
  };
  
  const initialState: ProjectState = {
    project: null,
    isLoading: false,
    error: null,
  };
  
const projectSlice = createSlice({
    name: 'project',
    initialState,
    reducers: {
      
    },
});



export const { } = projectSlice.actions;