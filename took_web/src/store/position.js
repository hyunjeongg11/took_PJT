import create from 'zustand';

export const usePosition = create((set) => ({
  latitude: 35.09362058403008,
  longitude: 128.8556517902862,
  setPosition: ({ latitude, longitude }) => {
    set(() => ({ latitude: latitude, longitude: longitude }));
  },
}));
