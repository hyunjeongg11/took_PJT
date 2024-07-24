// src/utils/format.js
export const formatNumber = (number) => {
  if (typeof number === 'number') {
      return number.toLocaleString(); 
  }
  
  if (typeof number === 'string') {
      number = parseFloat(number.replace(/,/g, ''));
      return isNaN(number) ? '' : number.toLocaleString(); 
  }

  return '';
};

export default formatNumber;
