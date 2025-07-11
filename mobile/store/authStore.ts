import { UserType } from "@/types/user.types"
import { create } from "zustand"
import AsyncStorage from "@react-native-async-storage/async-storage";
interface AuthStore {
  user: UserType | null;
  token: string | null;
  isLoading: boolean;
  register: (username: string, email: string, password: string) => Promise<any>
}
export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  token: null,
  isLoading: false,
  register: async (username: string, email: string, password: string) => {
    set({ isLoading: true });
    try {
      const response = await fetch("http://192.168.1.7:3000/api/auth/register", {
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
      await AsyncStorage.setItem("user", JSON.stringify(data));
      await AsyncStorage.setItem("token", data.token);
      set({ token: data.token, user: data.user, isLoading: false });
      return {
        success: true
      }
    } catch (error: any) {
      set({ isLoading: false });
      return { success: false, error: error.message };
    }
  }
}))