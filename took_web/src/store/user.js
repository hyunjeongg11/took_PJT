import create from 'zustand';

export const useUser = create((set) => ({
  id: '',
  seq: null,
  gender: '',
  name: '',
  email: '',
  birth: '',
  phone: '',
  isLoggedIn: false,
  setName: (name) => {
    set(() => ({
      name: name,
    }));
  },
  setUserSeq: (seq) => {
    set(() => ({
      seq: seq,
    }));
  },
  setEmail: (email) => {
    set(() => ({ email: email }));
  },
  setPhone: (phone) => {
    set(() => ({ phone: phone }));
  },
  setLoggedIn: () => set(() => ({ isLoggedIn: true })),
  setLoggedOut: () => set(() => ({ isLoggedIn: false })),
}));
