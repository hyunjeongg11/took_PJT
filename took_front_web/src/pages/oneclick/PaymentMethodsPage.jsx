// src/pages/oneclick/PaymentMethodsPage.jsx
import React, { useState } from 'react';
import { AiOutlineLeft, AiOutlineMore } from 'react-icons/ai';
import { formatAccountNumber } from '../../utils/accountNumFormat';

const initialAccounts = [
  { bank_name: '국민은행', account_num: '1234567891011', account_name: '별명 미설정' },
  { bank_name: '신한은행', account_num: '9876543210123', account_name: 'Deep Dream' },
  { bank_name: '우리은행', account_num: '1231231231231', account_name: '우리 계좌' },
];

const bankImages = import.meta.glob('../../assets/payment/bank/*.png', { eager: true });
const stockImages = import.meta.glob('../../assets/payment/stock/*.png', { eager: true });

const getImagePath = (bankName) => {
  if (bankName.endsWith("은행")) {
    bankName = bankName.slice(0, -2);
    return bankImages[`../../assets/payment/bank/${bankName}.png`].default;
  }
  if (bankName.endsWith("증권")) {
    bankName = bankName.slice(0, -2);
    return stockImages[`../../assets/payment/stock/${bankName}.png`].default;
  }
  return bankImages[`../../assets/payment/bank/${bankName}.png`].default;
};

const PaymentMethodsPage = () => {
  const [accounts, setAccounts] = useState(initialAccounts);
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
    <div style={styles.container}>
      <div style={styles.header}>
        <AiOutlineLeft style={styles.backIcon} onClick={() => window.history.back()} />
        <span style={styles.headerText}>결제수단 관리</span>
        <AiOutlineMore style={styles.moreIcon} />
      </div>
      <div style={styles.accountList}>
        <div style={styles.accountCount}>등록 계좌 <span style={styles.accountLength}>{accounts.length}</span>개</div>
        {accounts.map((account, index) => (
          <div
            key={index}
            style={{
              ...styles.accountItem,
              backgroundColor: draggingIndex === index ? '#f0f0f0' : '#fff',
              opacity: draggingIndex === index ? 0.5 : 1,
            }}
            draggable
            onDragStart={(e) => onDragStart(e, index)}
            onDragOver={() => onDragOver(index)}
            onDragEnd={onDragEnd}
          >
            <div style={styles.dragIcon}>≡</div>
            <div style={styles.accountDetails}>
              <img
                src={getImagePath(account.bank_name)}
                alt={`${account.bank_name} 로고`}
                style={styles.bankLogo}
              />
              <div style={styles.accountInfo}>
                <div style={styles.bankName}>
                  {account.bank_name}
                  {index === 0 && <span style={styles.primaryBadge}>주계좌</span>}
                </div>
                <div style={styles.accountNum}>{formatAccountNumber(account.account_num)}</div>
                <div style={styles.accountName}>{account.account_name}</div>
              </div>
            </div>
            <button style={styles.deleteButton} onClick={() => handleDelete(index)}>삭제</button>
          </div>
        ))}
      </div>
      <button style={styles.addAccountButton}>+ 결제 수단 추가</button>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
    fontFamily: "'Nanum Gothic', sans-serif",
    height: '100vh',
  },
  header: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '20px',
    borderBottom: '1px solid #ddd',
    paddingBottom: '10px',
    position: 'relative',
  },
  backIcon: {
    position: 'absolute',
    left: '10px',
    fontSize: '24px',
    cursor: 'pointer',
  },
  moreIcon: {
    position: 'absolute',
    right: '10px',
    fontSize: '24px',
    cursor: 'pointer',
  },
  headerText: {
    fontSize: '18px',
    fontWeight: 'bold',
  },
  accountList: {
    width: '100%',
  },
  accountCount: {
    marginBottom: '10px',
    fontSize: '14px',
    color: '#666',
  },
  accountLength: {
    marginBottom: '10px',
    fontSize: '14px',
    color: '#666',
    fontWeight: 'bold',
  },
  accountItem: {
    display: 'flex',
    alignItems: 'center',
    padding: '10px 0',
    borderBottom: '1px solid #ddd',
    cursor: 'grab',
    transition: 'background-color 0.2s, opacity 0.2s',
    position: 'relative',
  },
  dragIcon: {
    fontSize: '20px',
    marginRight: '10px',
  },
  accountDetails: {
    display: 'flex',
    alignItems: 'center',
    marginLeft: '10px',
    flex: 1,
  },
  bankLogo: {
    width: '40px',
    height: '40px',
    marginRight: '10px',
  },
  accountInfo: {
    display: 'flex',
    flexDirection: 'column',
  },
  bankName: {
    display: 'flex',
    alignItems: 'center',
    fontSize: '16px',
    fontWeight: 'bold',
  },
  primaryBadge: {
    backgroundColor: 'rgba(255, 127, 80, 0.24)',
    color: '#FF7F50',
    fontSize: '10px',
    marginLeft: '10px',
    padding: '2px 5px',
    borderRadius: '10px',
  },
  accountNum: {
    fontSize: '14px',
    color: 'black',
  },
  accountName: {
    fontSize: '14px',
    color: '#999',
  },
  deleteButton: {
    border: '1px solid rgba(0, 0, 0, 0.22)',
    background: '#fff',
    fontSize: '14px',
    color: '#000',
    cursor: 'pointer',
    borderRadius: '10px',
    padding: '5px 10px',
    position: 'absolute',
    right: '10px',
  },
  addAccountButton: {
    width: 'calc(100% - 40px)',
    padding: '12px',
    borderRadius: '20px',
    border: 'none',
    color: 'white',
    fontSize: '16px',
    fontWeight: 'bold',
    cursor: 'pointer',
    backgroundColor: '#FF7F50',
    marginTop: '20px',
    position: 'absolute',
    bottom: '20px',
    left: '50%',
    transform: 'translateX(-50%)',
  },
};

export default PaymentMethodsPage;
