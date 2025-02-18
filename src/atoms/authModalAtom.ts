import { atom } from "recoil";

export interface AuthModalState {
  open: boolean;
  view: "login" | "register" | "resetPassword";
}

const defaultModalState: AuthModalState = {
  open: false,
  view: "login",
};

const AUTH_MODAL_KEY = "authModalState";
export const authModalState = atom<AuthModalState>({
  key:
    typeof window !== "undefined"
      ? AUTH_MODAL_KEY
      : AUTH_MODAL_KEY + Math.random(),
  default: defaultModalState,
});
