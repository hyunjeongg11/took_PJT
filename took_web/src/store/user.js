import create from "zustand";

export const useUser = create((set) => ({
    id: '',
    gender: '',
    name: '',
    email: '',
    birth: '',
    phone: '',
    setName: (name) => {
        set(() => ({
            name: name,
        }))
    },
    setEmail: (email) => {
        set(() => ({email: email}))
    },
    setPhone: (phone) => {
        set(() => ({phone: phone}))
    },
    
    
}))