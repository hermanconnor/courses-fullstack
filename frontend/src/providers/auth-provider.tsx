import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import type { InternalAxiosRequestConfig } from "axios";
import type { AuthSuccessResponse, Credentials, User } from "@/lib/types";
import type { SignInFormData, SignUpFormData } from "@/lib/validation-schemas";
import { api, API_BASE_URL } from "@/api/axiosConfig";

interface AuthContextType {
  user: User | null;
  credentials: Credentials | null;
  signUp: (data: SignUpFormData) => Promise<void>;
  signIn: (creds: SignInFormData) => Promise<void>;
  signOut: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [credentials, setCredentials] = useState<Credentials | null>(null);

  useEffect(() => {
    const initializeAuth = () => {
      try {
        const storedCredentials = localStorage.getItem("userCredentials");
        const storedUser = localStorage.getItem("authUser");

        if (storedCredentials && storedUser) {
          setCredentials(JSON.parse(storedCredentials));
          setUser(JSON.parse(storedUser));
        }
      } catch (error) {
        console.error("Failed to load auth data:", error);
        // Clear potentially corrupted data
        localStorage.removeItem("userCredentials");
        localStorage.removeItem("authUser");
      }
    };

    initializeAuth();
  }, []);

  // Setup Axios interceptors whenever token changes
  useEffect(() => {
    // Request interceptor to attach Authorization header
    const requestInterceptor = api.interceptors.request.use(
      (config: InternalAxiosRequestConfig) => {
        if (credentials) {
          const { emailAddress, password } = credentials;
          const encodedCredentials = btoa(`${emailAddress}:${password}`);
          config.headers["Authorization"] = `Basic ${encodedCredentials}`;
        }

        return config;
      },
      (error) => {
        return Promise.reject(error);
      },
    );

    // Response interceptor to handle authentication errors
    const responseInterceptor = api.interceptors.response.use(
      (response) => response,
      (error) => {
        // Handle 401 Unauthorized - token expired or invalid
        if (error.response?.status === 401) {
          console.warn("Unauthorized - logging out user");
          signOut();
        }
        return Promise.reject(error);
      },
    );

    // Cleanup: Remove interceptors when component unmounts
    return () => {
      api.interceptors.request.eject(requestInterceptor);
      api.interceptors.response.eject(responseInterceptor);
    };
  }, [credentials]);

  const signUp = async (data: SignUpFormData): Promise<void> => {
    try {
      // Create Basic Auth credentials
      const { emailAddress, password, firstName, lastName } = data;
      const encodedCredentials = btoa(`${emailAddress}:${password}`);

      const response = await api.post(
        `${API_BASE_URL}/users`,
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
      setUser(newUser);
      setCredentials({ emailAddress, password });

      // Persist to localStorage
      localStorage.setItem("userCredentials", JSON.stringify(credentials));
      localStorage.setItem("authUser", JSON.stringify(newUser));
    } catch (error) {
      console.error("Signup failed:", error);
      throw error;
    }
  };

  const signIn = async (creds: SignInFormData): Promise<void> => {
    try {
      const { emailAddress, password } = creds;
      const encodedCredentials = btoa(`${emailAddress}:${password}`);

      const response = await api.get(`${API_BASE_URL}/users`, {
        headers: {
          Authorization: `Basic ${encodedCredentials}`,
        },
      });

      const userData: AuthSuccessResponse = response.data;
      const user = { ...userData.data.user };

      // Update state
      setUser(user);
      setCredentials({ emailAddress, password });

      // Persist to localStorage
      localStorage.setItem("userCredentials", JSON.stringify(credentials));
      localStorage.setItem("authUser", JSON.stringify(user));
    } catch (error) {
      console.error("Login failed:", error);
      throw error;
    }
  };

  const signOut = (): void => {
    setUser(null);
    setCredentials(null);
    localStorage.removeItem("authUser");
    localStorage.removeItem("userCredentials");
  };

  const value: AuthContextType = {
    user,
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
