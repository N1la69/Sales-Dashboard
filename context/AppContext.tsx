"use client";

import { PermissionSet } from "@/app/generated/prisma/wasm";
import { SafeUser } from "@/CustomModels/UserModel";
import React, { createContext, useContext, useEffect, useReducer } from "react";

// ---------------------------
// Types
// ---------------------------
type UserTypeUI = {
  user: SafeUser | null;
  permissions: PermissionSet | null;
};

type State = {
  user: UserTypeUI | null;
  loading: boolean;
  error: string | null;
};

type Action =
  | { type: "SET_USER"; payload: UserTypeUI | null }
  | { type: "SET_LOADING"; payload: boolean }
  | { type: "SET_ERROR"; payload: string | null };

type AppContextType = {
  state: State;
  dispatch: React.Dispatch<Action>;
};

// ---------------------------
// Initial State
// ---------------------------
const initialState: State = {
  user: null,
  loading: true,
  error: null,
};

// ---------------------------
// Reducer
// ---------------------------
function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "SET_USER":
      return { ...state, user: action.payload, loading: false };
    case "SET_LOADING":
      return { ...state, loading: action.payload };
    case "SET_ERROR":
      return { ...state, error: action.payload, loading: false };
    default:
      return state;
  }
}

// ---------------------------
// Context Creation
// ---------------------------
const AppContext = createContext<AppContextType | undefined>(undefined);

// ---------------------------
// Provider
// ---------------------------
export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const fetchUser = async () => {
      dispatch({ type: "SET_LOADING", payload: true });

      try {
        const res = await fetch("/api/user/auth/verify-user", {
          method: "GET",
          credentials: "include", // ensures cookie is sent
        });
        const data = await res.json();
        if (!data.success) throw new Error(data.message);
        dispatch({ type: "SET_USER", payload: data.data });
      } catch (error: any) {
        console.error("❌ Fetch user error:", error);
        dispatch({ type: "SET_ERROR", payload: error.message });
      }
    };

    fetchUser();
  }, []);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

// ---------------------------
// Hook for consuming
// ---------------------------
export const useAppContext = (): AppContextType => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
};
