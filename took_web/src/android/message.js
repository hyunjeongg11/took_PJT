export const msgToAndroid = ({ message, data }) => {
  if (window.Android) {
    window.Android.showToast('message');
    const res = window.Android.performAction('data');
    console.log(res);
  }
};
