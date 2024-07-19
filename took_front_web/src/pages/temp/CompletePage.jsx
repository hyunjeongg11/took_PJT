import React from "react";
import { useNavigate } from "react-router-dom";
import 송금완료 from '../../assets/payment/송금완료.png';
import { formatNumber } from '../../utils/format'; // 숫자 포맷팅 함수 import

function CompletePage({ userName = '사용자', amount }) {
  const navigate = useNavigate();

  const maskName = (name) => {
    if (name.length <= 2) return name;
    const firstChar = name[0];
    const lastChar = name[name.length - 1];
    const middleChars = name.slice(1, -1).replace(/./g, '*');
    return `${firstChar}${middleChars}${lastChar}`;
  };

  const maskedName = maskName(userName);

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        to <span style={styles.headerHighlighted}>{maskedName}</span>,&nbsp; ok!
      </div>
      <img src={송금완료} alt="송금 완료" style={styles.image} />
      <div style={styles.amount}>
        {formatNumber(amount)} 원
      </div>
      <button 
        style={styles.button} 
        onMouseOver={(e) => e.currentTarget.style.boxShadow = '0px 4px 8px rgba(0, 0, 0, 0.2)'}
        onMouseOut={(e) => e.currentTarget.style.boxShadow = 'none'}
        onClick={() => navigate('/')}
      >
        메인으로
      </button>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '90vh',
    backgroundColor: 'white',
    fontFamily: "'Nanum Gothic', sans-serif",
  },
  header: {
    fontFamily: "'Dela Gothic One', sans-serif",
    fontSize: '2rem',
    fontWeight: 'bold',
    color: '#FF7F50',
    marginBottom: '60px',
    textAlign: 'center',
  },
  headerHighlighted: {
    fontFamily: "'Nanum Gothic', sans-serif",
    fontWeight: 'bold',
    color: "black",
    fontSize: '1.8rem',
  },
  image: {
    width: '150px',
    height: '150px',
    marginBottom: '20px',
  },
  amount: {
    fontSize: '1.6rem',
    fontWeight: 'bold',
    color: 'black',
    marginBottom: '80px',
    textAlign: 'center',
  },
  button: {
    padding: '12px 40px',
    backgroundColor: '#FF7F50',
    color: 'white',
    fontSize: '1.1rem',
    fontWeight: 'bold',
    border: 'none',
    borderRadius: '20px',
    cursor: 'pointer',
    marginTop: '0px',
    transition: 'box-shadow 0.3s ease', 
  }
};

export default CompletePage;
