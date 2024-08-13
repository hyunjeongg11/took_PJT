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

export const postLoginInfoToApp = (userSeq, jwt) => {
  if (window.Android) {
    window.Android.getTokenFromWeb(userSeq, jwt);
    window.Android.showToast(userSeq);
  }
};
