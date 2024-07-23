import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function PwdPage() {
  const [input, setInput] = useState('');
  const [isError, setIsError] = useState(false);
  const [attemptCount, setAttemptCount] = useState(0);
  const navigate = useNavigate();

  const correctPassword = '123456'; // 지금은 기본 비밀번호 "123456"으로 설정

  const handleButtonClick = (value) => {
    if (input.length < 6) {
      setInput(input + value);
    }
  };

  const handleDelete = () => {
    setInput(input.slice(0, -1));
  };

  const handleInputChange = () => {
    if (input.length === 6) {
      console.log(input); // 최종 입력된 비밀번호 콘솔에 출력
      if (input === correctPassword) {
        alert('비밀번호가 맞습니다!');
        setInput('');
        setIsError(false);
        setAttemptCount(0); // 성공 시 시도 횟수 초기화
      } else {
        setIsError(true);
        setAttemptCount((prev) => prev + 1);
        setInput('');
      }
    }
  };

  useEffect(() => {
    handleInputChange();
  }, [input]);

  useEffect(() => {
    if (attemptCount >= 5) {
      alert('비밀번호 입력 횟수 초과!');
      // 추가적인 처리 (예: 화면 전환, 잠금 등)
    }
  }, [attemptCount]);

  const renderDots = () => {
    const dots = [];
    for (let i = 0; i < 6; i++) {
      dots.push(
        <span
          key={i}
          style={i < input.length ? styles.activeDot : styles.inactiveDot}
        >
          ●
        </span>
      );
    }
    return dots;
  };

  return (
    <div style={styles.container}>
      <div style={styles.headerContainer}>
        <div style={styles.header}>took!</div>
        <div style={styles.closeIcon} onClick={() => navigate(-1)}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="white"
            width="24px"
            height="24px"
          >
            <path d="M0 0h24v24H0V0z" fill="none" />
            <path d="M18.3 5.71a1 1 0 00-1.41 0L12 10.59 7.11 5.7a1 1 0 00-1.41 1.41L10.59 12l-4.89 4.88a1 1 0 001.41 1.41L12 13.41l4.89 4.88a1 1 0 001.41-1.41L13.41 12l4.89-4.88a1 1 0 000-1.41z" />
          </svg>
        </div>
      </div>
      <div style={styles.subheader}>
        {isError ? (
          <div style={styles.errorMessage}>
            비밀번호가 맞지 않아요 <br /> 다시 입력해주세요{' '}
            <span style={styles.attemptCount}> {attemptCount}/5</span>
          </div>
        ) : (
          '간편 비밀번호 입력'
        )}
      </div>
      <div style={styles.passwordDots}>{renderDots()}</div>
      <div style={styles.keypad}>
        {Array.from({ length: 9 }, (_, i) => (
          <button
            key={i + 1}
            style={styles.keypadButton}
            onClick={() => handleButtonClick(i + 1)}
          >
            {i + 1}
          </button>
        ))}
        <div style={styles.emptySpace}></div>
        <button
          style={styles.keypadButton}
          onClick={() => handleButtonClick(0)}
        >
          0
        </button>
        <button
          style={{ ...styles.keypadButton, ...styles.deleteButton }}
          onClick={handleDelete}
        >
          ⌫
        </button>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    backgroundColor: '#FF7F50',
    fontFamily: "'Nanum Gothic', sans-serif",
    position: 'relative',
  },
  headerContainer: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '0 20px',
    position: 'relative',
  },
  header: {
    fontFamily: "'Dela Gothic One', sans-serif",
    fontSize: '2rem',
    color: 'white',
    marginBottom: '10px',
    textAlign: 'center',
  },
  closeIcon: {
    position: 'absolute',
    right: '20px',
    top: '-20px', // Adjust this value to move the icon further upwards
    cursor: 'pointer',
  },
  subheader: {
    fontSize: '1.2rem',
    color: 'white',
    marginBottom: '20px',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  errorMessage: {
    color: 'white',
    textAlign: 'center',
    whiteSpace: 'pre-line',
  },
  attemptCount: {
    color: 'black',
  },
  passwordDots: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: '20px',
  },
  inactiveDot: {
    fontSize: '1.3rem',
    color: 'gray',
    margin: '0 5px',
  },
  activeDot: {
    fontSize: '1.3rem',
    color: 'white',
    margin: '0 5px',
  },
  keypad: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '20px',
    alignItems: 'center',
    marginTop: '40px',
  },
  keypadButton: {
    fontSize: '1.5rem',
    padding: '20px',
    color: 'white',
    backgroundColor: 'transparent',
    border: 'none',
    cursor: 'pointer',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  deleteButton: {
    textAlign: 'center',
  },
  emptySpace: {
    gridColumn: 'span 1',
  },
};

export default PwdPage;
