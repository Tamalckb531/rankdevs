// store/useUserStore.ts
import { User } from "@/lib/type";
import { create } from "zustand";
import { persist } from "zustand/middleware";

type UserState = {
  user: User | null;
  setUser: (user: User | null) => void;
};

const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      user: null,
      setUser: (user) => set({ user }),
    }),
    {
      name: "userState", // key in localStorage
    }
  )
);

export default useUserStore;

//?  const user = useUserStore((state) => state.user);
//?  const setUser = useUserStore((state) => state.setUser);
