import { create } from "zustand";

const store = (set) => ({
    user: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null,

    auth: localStorage.getItem("auth") ? JSON.parse(localStorage.getItem("auth")) : null,

    cart: localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : null,

    // ! User
    setUser: (user) => set({ user: user }),
    deleteUser: () => set({ user: null }),

    // ! Auth (JWT)
    setAuth: (auth) => set({ auth: { accessToken: auth }}),
    deleteAuth: () => set({ auth: null }),

    // ! Cart
    setCart: (cart) => set({ cart: cart }),
    deleteCart: () => set({ cart: null }),
});

export const useStore = create(store);