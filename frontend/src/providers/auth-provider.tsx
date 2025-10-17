import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
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
  api.interceptors.request.use(
    (config) => {
      const storedCredentials = localStorage.getItem("userCredentials");
      if (storedCredentials) {
        try {
          const { emailAddress, password } = JSON.parse(storedCredentials);
          const encodedCredentials = btoa(`${emailAddress}:${password}`);
          config.headers["Authorization"] = `Basic ${encodedCredentials}`;
        } catch (error) {
          console.error("Failed to parse credentials", error);
        }
      }

      return config;
    },
    (error) => {
      return Promise.reject(error);
    },
  );

  // Response interceptor to handle authentication errors
  api.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response && error.response.status === 401) {
        console.warn("Unauthorized request, please sign in.");
        signOut();
      }

      return Promise.reject(error);
    },
  );

  const [authUser, setAuthUser] = useState<User | null>(() => {
    try {
      const storedUser = localStorage.getItem("authUser");
      return storedUser ? JSON.parse(storedUser) : null;
    } catch (error) {
      console.error("Failed to parse authenticated user", error);
      return null;
    }
  });

  const [credentials, setCredentials] = useState<Credentials | null>(() => {
    try {
      const storedCredentials = localStorage.getItem("userCredentials");
      return storedCredentials ? JSON.parse(storedCredentials) : null;
    } catch (error) {
      console.error("Failed to parse user credentials", error);
      return null;
    }
  });

  useEffect(() => {
    if (authUser) {
      localStorage.setItem("authUser", JSON.stringify(authUser));
    } else {
      localStorage.removeItem("authUser");
    }
  }, [authUser]);

  useEffect(() => {
    if (credentials) {
      localStorage.setItem("userCredentials", JSON.stringify(credentials));
    } else {
      localStorage.removeItem("userCredentials");
    }
  }, [credentials]);

  const signUp = async (data: SignUpFormData): Promise<void> => {
    try {
      // Create Basic Auth credentials
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

      // Update state
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

      console.log(response.data);
      const userData: AuthSuccessResponse = response.data;
      const user = { ...userData.data.user };

      // Update state
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
    localStorage.removeItem("authUser");
    localStorage.removeItem("userCredentials");
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
