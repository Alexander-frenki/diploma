import { atom, selector } from "recoil";

export const userState = atom({
  key: "User",
  default: {
    email: "",
    firstName: "",
    lastName: "",
    isActivated: false,
    isLoggedIn: false,
    cars: [],
  },
});

export const userSelector = selector({
  key: "UserSelector",
  get: ({ get }) => get(userState),
  set: ({ set }, newValue) => set(userState, { ...newValue, isLoggedIn: true }),
});
