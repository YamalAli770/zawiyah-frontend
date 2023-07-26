import { create } from "zustand";

const store = (set) => ({
    user: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null,
    setUser: (user) => set({user: user}),
    deleteUser: () => set({ user: null })
});

export const useStore = create(store);