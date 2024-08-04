import create from 'zustand';

export const usePosition = create((set) => ({
  latitude: null,
  longitude: null,
  setPosition: ({ latitude, longitude }) => {
    set(() => ({ latitude: latitude, longitude: longitude }));
  },
}));
