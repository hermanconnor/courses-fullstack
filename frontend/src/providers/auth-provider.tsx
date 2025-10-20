import { createContext, useContext, useState, type ReactNode } from "react";
import type { AuthSuccessResponse, Credentials, User } from "@/lib/types";
import type { SignInFormData, SignUpFormData } from "@/lib/validation-schemas";
import { api } from "@/api/axiosConfig";

interface AuthContextType {
  authUser: User | null;
  credentials: Credentials | null;
  signUp: (data: SignUpFormData) => Promise<void>;
  signIn: (creds: SignInFormData) => Promise<void>;
  signOut: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [credentials, setCredentials] = useState<Credentials | null>(null);
  const [authUser, setAuthUser] = useState<User | null>(null);

  const signUp = async (data: SignUpFormData): Promise<void> => {
    try {
      const { emailAddress, password, firstName, lastName } = data;
      const encodedCredentials = btoa(`${emailAddress}:${password}`);

      const response = await api.post(
        "/users",
        { firstName, lastName, emailAddress, password },
        {
          headers: {
            Authorization: `Basic ${encodedCredentials}`,
          },
        },
      );

      const userData: AuthSuccessResponse = response.data;
      const newUser = { ...userData.data.user };

      setAuthUser(newUser);
      setCredentials({ emailAddress, password });
    } catch (error) {
      console.error("Signup failed:", error);
      setAuthUser(null);
      setCredentials(null);
      throw error;
    }
  };

  const signIn = async (creds: SignInFormData): Promise<void> => {
    const { emailAddress, password } = creds;
    const encodedCredentials = btoa(`${emailAddress}:${password}`);

    try {
      const response = await api.get("/users", {
        headers: {
          Authorization: `Basic ${encodedCredentials}`,
        },
      });

      const userData: AuthSuccessResponse = response.data;
      const user = { ...userData.data.user };

      setAuthUser(user);
      setCredentials({ emailAddress, password });
    } catch (error) {
      console.error("Login failed:", error);
      setAuthUser(null);
      setCredentials(null);
      throw error;
    }
  };

  const signOut = (): void => {
    setAuthUser(null);
    setCredentials(null);
  };

  const value: AuthContextType = {
    authUser,
    credentials,
    signUp,
    signIn,
    signOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
};
