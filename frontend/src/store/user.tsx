import { atom } from "recoil";

export const loginAtom = atom({
  key: "loginAtom",
  default: localStorage.getItem("token") ? true : false,
});

export const userAtom = atom({
  key: "userAtom",
  default: {
    name: "",
  },
});
