
import { api } from "@/features/common/api";
import { useQuery } from "@tanstack/react-query";
import useSecureStorage from "@/features/common/use-storage";
import { createContext, useCallback, useEffect } from "react";
import { User } from "../interfaces/user";
import {
  SignInParams,
  SignUpParams,
  signIn as signInService,
  signUp as signUpService
} from "../services/auth";
import { getUserProfile } from "@/features/profile/services/profile";
// import { AxiosError } from "axios";

type AuthContext = {
  signIn: (user: SignInParams) => Promise<void>;
  signUp: (user: SignUpParams) => Promise<void>;
  signOut: () => void;
} & {
  user: User | null;
  token: string | null;
  isAdmin: boolean;
  isAuthenticated: boolean;
  loading: boolean;
};

export const AuthContext = createContext<AuthContext | null>(null);

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const {
    value: token,
    loading: tokenLoading,
    setItem: setToken,
    
  } = useSecureStorage("token");

 
 

  const getUser = useCallback(async () => {
    if (!token) return null;
    const user = await getUserProfile({ token });
    return user;
  }, [token]);

  const {
    data: user,
    isLoading: userLoading,
    refetch: refetchUser,
  } = useQuery<User | null>({
    queryKey: ["user", token],
    queryFn: getUser,
    enabled: !!token,
  });


  const isAdmin = user?.user_roles.some((role) => role.name === "admin");

  const signIn = async (fields: SignInParams) => {
    const response = await signInService(fields);
    setToken(response.data.access_token);
  };

  const signUp = async (fields: SignUpParams) => {
    const response = await signUpService(fields);
    setToken(response.data.access_token);
  }

  useEffect(() => {
    if (!token) {
      delete api.defaults.headers.Authorization;
      return;
    }
    api.defaults.headers.Authorization = `Bearer ${token}`;
    refetchUser();
  }, [token]);

  const signOut = () => {
    setToken(null);
  };

  const loading = userLoading || tokenLoading;
  const isAuthenticated = !!token && !!user && !loading;

  return (
    <AuthContext.Provider
      value={
        {
          user,
          token,
          isAdmin,
          signIn,
          signOut,
          loading,
          isAuthenticated,
          signUp
        } as AuthContext
      }
    >
      {children}
    </AuthContext.Provider>
  );
}
