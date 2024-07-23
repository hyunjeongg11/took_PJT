import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AiOutlineLeft } from 'react-icons/ai';
import check from '../../assets/payment/check.png';

function AccountCompletePage() {
  const navigate = useNavigate();
  const bankName = '국민은행'; // 임시로 설정된 은행명
  const accountNumber = '123-456789-01'; // 임시로 설정된 계좌번호

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <AiOutlineLeft style={styles.backIcon} onClick={() => navigate(-1)} />
        <span style={styles.headerText}>계좌 등록</span>
      </div>
      <div style={styles.content}>
        <div style={styles.checkIconContainer}>
          {/* <div style={styles.checkIcon}>✔</div> */}
          <img src={check} alt="check" style={styles.image} />
        </div>
        <div style={styles.text}>
          계좌 등록이 <br />
          완료되었습니다.
        </div>
        <div style={styles.infoContainer}>
          <div style={styles.infoText}>은행명 : {bankName}</div>
          <div style={styles.infoText}>계좌번호 : {accountNumber}</div>
        </div>
      </div>
      <button style={styles.button} onClick={() => navigate('/')}>
        완료
      </button>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
    fontFamily: "'Nanum Gothic', sans-serif",
    height: '70vh',
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
  headerText: {
    fontSize: '18px',
    fontWeight: 'bold',
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  checkIconContainer: {
    backgroundColor: '#FF7F50',
    borderRadius: '50%',
    width: '60px',
    height: '60px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '20px',
  },
  checkIcon: {
    color: 'white',
    fontSize: '36px',
  },
  text: {
    textAlign: 'center',
    fontSize: '25px',
    fontWeight: 'bold',
    marginBottom: '20px',
  },
  infoContainer: {
    width: '250px',
    // textAlign: "center",
    borderTop: '1px solid #ddd',
    paddingTop: '10px',
    borderBottom: '1px solid #ddd',
    marginTop: '20px',
  },
  infoText: {
    fontSize: '16px',
    marginBottom: '10px',
    marginLeft: '5px',
  },
  button: {
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
  image: {
    width: '40px',
  },
};

export default AccountCompletePage;
