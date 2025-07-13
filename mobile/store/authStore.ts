import { UserType } from "@/types/user.types"
import { create } from "zustand"
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_URI } from "@/constants/api";
interface AuthStore {
  user: UserType | null;
  token: string | null;
  isLoading: boolean;
  register: (username: string, email: string, password: string) => Promise<any>;
  checkAuth: () => Promise<any>;
  logout: () => Promise<any>;
  login: (email: string, password: string) => Promise<any>;
  isCheckingAuth: boolean
}
export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  token: null,
  isLoading: false,
  isCheckingAuth: true,
  register: async (username: string, email: string, password: string) => {
    set({ isLoading: true });
    try {
      const response = await fetch(`${API_URI}/api/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username, email, password
        })
      })

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Something went wrong.")
      await AsyncStorage.setItem("user", JSON.stringify(data.user));
      await AsyncStorage.setItem("token", data.token);
      set({ token: data.token, user: data.user, isLoading: false });
      return {
        success: true
      }
    } catch (error: any) {
      set({ isLoading: false });
      return { success: false, error: error.message };
    }
  },
  login: async (email: string, password: string) => {
    set({ isLoading: true });
    try {
      const response = await fetch(`${API_URI}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email, password
        })
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Something went wrong.")
      await AsyncStorage.setItem("user", JSON.stringify(data.user));
      await AsyncStorage.setItem("token", data.token);

      set({ token: data.token, user: data.user, isLoading: false });
      return {
        success: true
      }
    } catch (error: any) {
      set({ isLoading: false });
      return { success: false, error: error.message };
    }

  },
  logout: async () => {
    await AsyncStorage.removeItem("token");
    await AsyncStorage.removeItem("user");
    set({ token: null, user: null });
  },
  checkAuth: async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      const userJson = await AsyncStorage.getItem("user");
      const user = userJson ? JSON.parse(userJson) : null;
      set({ token, user });
    } catch (error) {
      console.log("Auth check failed", error);
    } finally {
      set({ isCheckingAuth: false });
    }
  }
}))