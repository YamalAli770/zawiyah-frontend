import { create } from "zustand";

const store = (set) => ({
    user: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null,
    auth: localStorage.getItem("auth") ? JSON.parse(localStorage.getItem("auth")) : null,

    setUser: (user) => set({ user: user }),
    deleteUser: () => set({ user: null }),

    setAuth: (auth) => set({ auth: auth }),
    deleteAuth: () => set({ auth: null })
});

export const useStore = create(store);