import React, { useState } from 'react';
// import { formatAccountNumber } from '../../utils/accountNumFormat';
import BackButton from '../../components/common/BackButton';

const tempData = [
  {
    bank_name: '국민은행',
    account_num: '1234567891011',
    account_name: '별명 미설정',
  },
  {
    bank_name: '신한은행',
    account_num: '9876543210123',
    account_name: 'Deep Dream',
  },
  {
    bank_name: '우리은행',
    account_num: '1231231231231',
    account_name: '우리 계좌',
  },
];

const bankImages = import.meta.glob('../../assets/payment/bank/*.png', {
  eager: true,
});
const stockImages = import.meta.glob('../../assets/payment/stock/*.png', {
  eager: true,
});

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

const PaymentMethodsPage = () => {
  const [accounts, setAccounts] = useState(tempData);
  const [draggingIndex, setDraggingIndex] = useState(null);

  const onDragStart = (e, index) => {
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/html', e.target.parentNode);
    setDraggingIndex(index);
  };

  const onDragOver = (index) => {
    if (draggingIndex === index) return;

    const tempAccounts = [...accounts];
    const [draggedItem] = tempAccounts.splice(draggingIndex, 1);
    tempAccounts.splice(index, 0, draggedItem);

    setDraggingIndex(index);
    setAccounts(tempAccounts);
  };

  const onDragEnd = () => {
    setDraggingIndex(null);
  };

  const handleDelete = (index) => {
    const newAccounts = accounts.filter((_, i) => i !== index);
    setAccounts(newAccounts);
  };

  return (
    <div className="flex flex-col items-center p-5 h-screen font-nanum">
      <div className="w-full flex items-center justify-between mb-5 border-b border-gray-300 pb-2 ">
        <BackButton />
        <span className="text-lg font-bold mx-auto">결제수단 관리</span>
      </div>
      <div className="w-full">
        <div className="mb-2 text-sm text-gray-600">
          등록 계좌 <span className="font-bold">{accounts.length}</span>개
        </div>
        {accounts.map((account, index) => (
          <div
            key={index}
            className={`flex items-center py-2 border-b border-gray-300 cursor-grab transition duration-200 relative ${draggingIndex === index ? 'bg-gray-200 opacity-50' : 'bg-white'}`}
            draggable
            onDragStart={(e) => onDragStart(e, index)}
            onDragOver={() => onDragOver(index)}
            onDragEnd={onDragEnd}
          >
            <div className="text-lg mr-2">≡</div>
            <div className="flex items-center ml-2 flex-1">
              <img
                src={getImagePath(account.bank_name)}
                alt={`${account.bank_name} 로고`}
                className="w-10 h-10 mr-2"
              />
              <div className="flex flex-col">
                <div className="flex items-center text-lg font-bold">
                  {account.bank_name}
                  {index === 0 && (
                    <span className="bg-orange-100 text-main text-xs ml-2 px-2 py-1 rounded-full">
                      주계좌
                    </span>
                  )}
                </div>
                <div className="text-sm text-black">
                  {account.account_num}
                </div>
                <div className="text-sm text-gray-500">
                  {account.account_name}
                </div>
              </div>
            </div>
            <button
              className="border border-gray-400 bg-white text-sm text-black cursor-pointer rounded-full px-3 py-1 absolute right-2"
              onClick={() => handleDelete(index)}
            >
              삭제
            </button>
          </div>
        ))}
      </div>
      <button className="w-[calc(100%-40px)] py-3 rounded-full border-none text-white text-lg font-bold cursor-pointer bg-main-500 mt-5 absolute bottom-5 left-1/2 transform -translate-x-1/2">
        + 결제 수단 추가
      </button>
    </div>
  );
};

export default PaymentMethodsPage;
