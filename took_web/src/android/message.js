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

export const postLoginInfoToApp = (id, pwd, userSeq) => {
  if (window.Android) {
    window.Android.getTokenFromWeb(id, pwd, parseInt(userSeq, 10));
    window.Android.showToast(id);
  }
};
