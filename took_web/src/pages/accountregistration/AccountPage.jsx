import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { AiOutlineLeft, AiOutlineRight } from 'react-icons/ai';
import { MdBackspace } from 'react-icons/md';

function AccountPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { selectedName, savedAccount, savedPassword } = location.state || {
    selectedName: '',
    savedAccount: '',
    savedPassword: '',
  };

  const [bank, setBank] = useState(selectedName);
  const [account, setAccount] = useState(savedAccount || '');
  const [password, setPassword] = useState(savedPassword || '');
  const [alias, setAlias] = useState('');
  const [showKeypad, setShowKeypad] = useState(false);
  const [keypadNumbers, setKeypadNumbers] = useState([]);

  useEffect(() => {
    generateRandomKeypad();
  }, [showKeypad]);

  useEffect(() => {
    if (selectedName) {
      setBank(selectedName);
    }
  }, [selectedName]);

  const generateRandomKeypad = () => {
    const numbers = [...Array(10).keys()];
    for (let i = numbers.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [numbers[i], numbers[j]] = [numbers[j], numbers[i]];
    }
    setKeypadNumbers(numbers);
  };

  const handleAccountChange = (e) => {
    setAccount(e.target.value);
    setShowKeypad(false);
  };

  const handleAliasChange = (e) => setAlias(e.target.value);

  const handleNextClick = () => {
    console.log('bank_name: ', bank);
    console.log('account_num: ', account);
    console.log('account_pwd : ', password);
    console.log('accountName : ', alias);
    if (isFormValid) {
      navigate('/agreement', { state: { bank, account, alias } });
    }
  };

  const handleKeypadClick = (value) => {
    if (value === 'backspace') {
      setPassword(password.slice(0, -1));
    } else if (value === 'confirm') {
      setShowKeypad(false);
    } else if (password.length < 4) {
      setPassword(password + value);
    }
  };

  const handlePasswordFocus = () => {
    setPassword('');
    setShowKeypad(true);
    if (document.activeElement) {
      document.activeElement.blur(); // Remove focus from the current input to close the native keyboard
    }
  };

  const isFormValid = bank !== '' && account !== '' && password.length === 4;

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <AiOutlineLeft style={styles.backIcon} onClick={() => navigate(-1)} />
        <span style={styles.headerText}>계좌 등록</span>
      </div>
      <div style={styles.form}>
        <label style={styles.label}>
          <span style={styles.labelText}>
            <span style={styles.circleFilled}>1</span> 본인 명의 계좌 번호 등록
          </span>
          <div
            style={styles.selectBox}
            onClick={() =>
              navigate('/select', {
                state: { savedAccount: account, savedPassword: password },
              })
            }
          >
            <span style={{ color: bank ? 'black' : '#999' }}>
              {bank || '은행 / 증권사'}
            </span>
            <AiOutlineRight style={styles.selectIcon} />
          </div>
        </label>
        <label style={styles.label}>
          <input
            type="text"
            placeholder="계좌 번호 등록"
            value={account}
            onChange={handleAccountChange}
            style={styles.input}
            onFocus={() => setShowKeypad(false)}
          />
        </label>
        <label style={styles.label}>
          <input
            type="password"
            placeholder="계좌 비밀번호 (4자리)"
            value={password.replace(/./g, '●')}
            onFocus={handlePasswordFocus}
            readOnly
            style={styles.input}
          />
        </label>
        <div style={styles.infoTextContainer}>
          <input
            type="text"
            placeholder="(선택) 계좌별칭 등록 / 최대16글자"
            value={alias}
            onChange={handleAliasChange}
            maxLength="16"
            style={{ ...styles.infoText, color: alias ? 'black' : '#999' }}
          />
        </div>
      </div>
      <div style={styles.steps}>
        <div style={styles.step}>
          <span style={styles.circleEmpty}>2</span> 약관 동의
        </div>
        <div style={styles.step}>
          <span style={styles.circleEmpty}>3</span> 본인 인증
        </div>
      </div>
      <button
        style={{
          ...styles.button,
          backgroundColor: isFormValid ? '#FF7F50' : 'rgba(255, 127, 80, 0.5)',
          boxShadow: isFormValid ? '0px 4px 8px rgba(0, 0, 0, 0.2)' : 'none',
          position: 'absolute',
          bottom: '20px',
          left: '50%',
          transform: 'translateX(-50%)',
          width: 'calc(100% - 40px)',
        }}
        disabled={!isFormValid}
        onMouseOver={(e) =>
          isFormValid &&
          (e.currentTarget.style.boxShadow = '0px 4px 8px rgba(0, 0, 0, 0.2)')
        }
        onMouseOut={(e) => (e.currentTarget.style.boxShadow = 'none')}
        onClick={handleNextClick}
      >
        다음
      </button>
      {showKeypad && (
        <div style={styles.keypad}>
          {keypadNumbers.map((number) => (
            <button
              key={number}
              onClick={() => handleKeypadClick(number.toString())}
              style={styles.key}
            >
              {number}
            </button>
          ))}
          <button
            onClick={() => handleKeypadClick('backspace')}
            style={styles.key}
          >
            <MdBackspace size={24} />
          </button>
          <button
            onClick={() => handleKeypadClick('confirm')}
            style={styles.key}
          >
            확인
          </button>
        </div>
      )}
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
    position: 'relative',
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
  headerText: {
    fontSize: '18px',
    fontWeight: 'bold',
  },
  form: {
    width: '100%',
    marginBottom: '20px',
  },
  label: {
    display: 'flex',
    flexDirection: 'column',
    marginBottom: '10px',
  },
  labelText: {
    fontSize: '16px',
    color: 'black',
    fontWeight: 'bold',
    marginBottom: '15px',
  },
  circleFilled: {
    display: 'inline-block',
    width: '20px',
    height: '20px',
    borderRadius: '50%',
    backgroundColor: '#FF7F50',
    color: 'white',
    textAlign: 'center',
    lineHeight: '20px',
    marginRight: '10px',
  },
  circleEmpty: {
    display: 'inline-block',
    width: '20px',
    height: '20px',
    borderRadius: '50%',
    color: '#666',
    border: '1px solid #ddd',
    textAlign: 'center',
    lineHeight: '20px',
    marginRight: '10px',
  },
  selectBox: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: '55px',
    borderRadius: '10px',
    border: '1px solid #ddd',
    padding: '0 10px',
    fontSize: '15px',
    cursor: 'pointer',
    color: '#999',
    fontFamily: "'Nanum Gothic', sans-serif",
  },
  selectIcon: {
    fontSize: '20px',
    color: '#999',
  },
  input: {
    height: '55px',
    borderRadius: '10px',
    border: '1px solid #ddd',
    padding: '0 10px',
    fontSize: '15px',
    outline: 'none',
    fontFamily: "'Nanum Gothic', sans-serif",
    '::placeholder': {
      color: '#999',
    },
  },
  infoTextContainer: {
    marginBottom: '40px',
  },
  infoText: {
    fontSize: '12px',
    width: '100%',
    border: 'none',
    borderBottom: '1px solid #ddd',
    padding: '10px 0',
    outline: 'none',
  },
  steps: {
    width: '100%',
    marginBottom: '20px',
  },
  step: {
    fontSize: '16px',
    fontWeight: 'bold',
    color: '#666',
    marginBottom: '20px',
  },
  button: {
    padding: '12px',
    borderRadius: '20px',
    border: 'none',
    color: 'white',
    fontSize: '16px',
    fontWeight: 'bold',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease, box-shadow 0.3s ease',
  },
  keypad: {
    position: 'fixed',
    bottom: 0,
    left: 0,
    width: '100%',
    backgroundColor: '#FF7F50',
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gridGap: '10px',
    padding: '10px',
    zIndex: 1000,
  },
  key: {
    backgroundColor: '#FF7F50',
    border: 'none',
    color: 'white',
    fontSize: '24px',
    padding: '15px',
    borderRadius: '10px',
    textAlign: 'center',
    cursor: 'pointer',
    outline: 'none',
  },
};

export default AccountPage;
