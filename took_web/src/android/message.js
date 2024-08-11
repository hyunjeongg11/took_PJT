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

export const postRefreshTokenToApp = (refreshToken) => {
  if (window.Android) {
    window.Android.getTokenFromWeb(refreshToken);
  }
};
