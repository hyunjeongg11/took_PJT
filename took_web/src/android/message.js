export const msgToAndroid = (message) => {
  if (window.Android) {
    window.Android.showToast(message);
  }
};

export const getUserLocation = () => {
  if (window.Android) {
    window.Android.getLocation();
  }
};

export const postLoginInfoToApp = (id, pwd) => {
  if (window.Android) {
    window.Android.getTokenFromWeb(id, pwd);
    window.Android.showToast(id);
  }
};
