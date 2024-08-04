window.kakao = window.kakao || {};

const places = new window.kakao.maps.services.Places();
const geocoder = new window.kakao.maps.services.Geocoder();

export const keywordSearch = (input) => {
  return new Promise((resolve, reject) => {
    const callback = (result, status) => {
      if (status === window.kakao.maps.services.Status.OK) {
        resolve(result);
      } else {
        reject(status);
      }
    };
    places.keywordSearch(input, callback);
  });
};

export const getAddr = (lat, lng) => {
  const coord = new window.kakao.maps.LatLng(lat, lng);

  return new Promise((resolve, reject) => {
    const callback = (result, status) => {
      if (status === window.kakao.maps.services.Status.OK) {
        const arr = { ...result };
        if (arr[0].road_address !== null) {
          const _arr = arr[0].road_address.address_name;
          resolve(_arr);
        } else {
          const _arr = arr[0].address.address_name;
          resolve(_arr);
        }
      } else {
        reject(status);
      }
    };
    geocoder.coord2Address(coord.getLng(), coord.getLat(), callback);
  });
};
