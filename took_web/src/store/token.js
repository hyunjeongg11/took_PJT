import { create } from 'zustand';

export const useToken = create((set) => ({
    jwt: '',
    setToken: (token) => set(() => ({ jwt: token})),
}));