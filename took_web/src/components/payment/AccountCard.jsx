import React from "react";
// import { formatAccountNumber } from '../../utils/accountNumFormat'
import { formatNumber } from '../../utils/format';



const bankImages = import.meta.glob('../../assets/payment/bank/*.png', {
    eager: true,
  });
  const stockImages = import.meta.glob('../../assets/payment/stock/*.png', {
    eager: true,
  });
  

function AccountCard({ accounts, onClose, onSelect }) {
  const getImagePath = (bankName) => {
    if (bankName.endsWith('은행')) {
      bankName = bankName.slice(0, -2);
      return bankImages[`../../assets/payment/bank/${bankName}.png`].default;
    }
    if (bankName.endsWith('증권')) {
      bankName = bankName.slice(0, -2);
      return stockImages[`../../assets/payment/stock/${bankName}.png`].default;
    }
    return bankImages[`../../assets/payment/bank/${bankName}.png`].default;
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-4 rounded-2xl max-w-[300px] w-full text-center">
        <div className="mb-4 text-lg font-bold">출금계좌 선택</div>
        {accounts.map((account, index) => (
          <div
            key={index}
            onClick={() => onSelect(account)}
            className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center"
          >
            <img
              src={getImagePath(account.bankName)}
              alt={`${account.bankName} 로고`}
              className="w-10 h-10 mr-2"
            />
            <div className="text-left">
              <div className="text-sm font-bold">{account.bankName}</div>
              <div className="text-xs">{account.accountNum} ({formatNumber(account.balance)}원)</div>
              <div className="text-xs text-gray-500">{account.accountName}</div>
            </div>
          </div>
        ))}
        <button onClick={onClose} className="mt-4 bg-gray-200 text-gray-700 px-4 py-2 rounded-md">닫기</button>
      </div>
    </div>
  );
}

export default AccountCard;
