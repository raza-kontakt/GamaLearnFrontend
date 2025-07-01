import { createContext, useContext, ReactNode } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import api from "../utils/axios";

interface Examiner {
  id: number;
  name: string;
  userName: string;
}

interface AuthContextType {
  user: Examiner | null;
  login: (userName: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  isLoading: boolean;
  isLoggedIn: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const queryClient = useQueryClient();

  const { data, isLoading, refetch } = useQuery<Examiner | null>({
    queryKey: ["me"],
    queryFn: async () => {
      try {
        const res = await api.get("/examiners/me");
        return res.data;
      } catch {
        return null;
      }
    },
    retry: false,
    refetchOnWindowFocus: false,
  });

  const loginMutation = useMutation({
    mutationFn: async ({
      userName,
      password,
    }: {
      userName: string;
      password: string;
    }) => {
      await api.post("/examiners/login", { userName, password });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["me"] });
    },
  });

  const logoutMutation = useMutation({
    mutationFn: async () => {
      await api.post("/examiners/logout", {});
    },
    onSuccess: () => {
      queryClient.setQueryData(["me"], null);
      queryClient.clear();
    },
  });

  const login = async (userName: string, password: string) => {
    await loginMutation.mutateAsync({ userName, password });
    await refetch();
  };

  const logout = async () => {
    await logoutMutation.mutateAsync();
  };

  return (
    <AuthContext.Provider
      value={{
        user: data ?? null,
        login,
        logout,
        isLoading,
        isLoggedIn: !!data || false,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};
