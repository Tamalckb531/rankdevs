import { User } from "@/lib/type";
import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist({
  key: "userState",
  storage: typeof window !== "undefined" ? localStorage : undefined,
});

export const userState = atom<User | null>({
  key: "userState",
  default: null,
  effects_UNSTABLE: [persistAtom],
});
