import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";

function AccountPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { selectedName } = location.state || { selectedName: "" };

  const [bank, setBank] = useState(selectedName);
  const [account, setAccount] = useState("");
  const [alias, setAlias] = useState("");

  useEffect(() => {
    if (selectedName) {
      setBank(selectedName);
    }
  }, [selectedName]);

  const isFormValid = bank !== "" && account !== "";

  const handleAccountChange = (e) => setAccount(e.target.value);
  const handleAliasChange = (e) => setAlias(e.target.value);

  const handleNextClick = () => {
    if (isFormValid) {
      navigate("/agreement", { state: { bank, account, alias } });
    }
  };

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
          <div style={styles.selectBox} onClick={() => navigate('/select')}>
            <span style={{ color: bank ? 'black' : '#999' }}>{bank || '은행 / 증권사'}</span>
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
          backgroundColor: isFormValid ? "#FF7F50" : "rgba(255, 127, 80, 0.5)",
          boxShadow: isFormValid ? "0px 4px 8px rgba(0, 0, 0, 0.2)" : "none",
          position: "absolute",
          bottom: "20px",
          left: "50%",
          transform: "translateX(-50%)",
          width: "calc(100% - 40px)"
        }}
        disabled={!isFormValid}
        onMouseOver={(e) =>
          isFormValid && (e.currentTarget.style.boxShadow = "0px 4px 8px rgba(0, 0, 0, 0.2)")
        }
        onMouseOut={(e) => (e.currentTarget.style.boxShadow = "none")}
        onClick={handleNextClick}
      >
        다음
      </button>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "20px",
    fontFamily: "'Nanum Gothic', sans-serif",
    position: "relative",
    height: "100vh",
  },
  header: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: "20px",
    borderBottom: "1px solid #ddd",
    paddingBottom: "10px",
    position: "relative",
  },
  backIcon: {
    position: "absolute",
    left: "10px",
    fontSize: "24px",
    cursor: "pointer",
  },
  headerText: {
    fontSize: "18px",
    fontWeight: "bold",
  },
  form: {
    width: "100%",
    marginBottom: "20px",
  },
  label: {
    display: "flex",
    flexDirection: "column",
    marginBottom: "10px",
  },
  labelText: {
    fontSize: "16px",
    color: "black",
    fontWeight: "bold",
    marginBottom: "15px",
    marginLeft: "20px",
  },
  circleFilled: {
    display: "inline-block",
    width: "20px",
    height: "20px",
    borderRadius: "50%",
    backgroundColor: "#FF7F50",
    color: "white",
    textAlign: "center",
    lineHeight: "20px",
    marginRight: "10px",
  },
  circleEmpty: {
    display: "inline-block",
    width: "20px",
    height: "20px",
    borderRadius: "50%",
    border: "1px solid #ddd",
    color: "black",
    textAlign: "center",
    lineHeight: "20px",
    marginRight: "10px",
  },
  selectBox: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    height: "55px",
    borderRadius: "10px",
    border: "1px solid #ddd",
    padding: "0 10px",
    fontSize: "15px",
    cursor: "pointer",
    color: "#999",
    fontFamily: "'Nanum Gothic', sans-serif",
    marginLeft: "20px",
    marginRight: "20px",
  },
  selectIcon: {
    fontSize: "20px",
    color: "#999",
  },
  input: {
    height: "55px",
    borderRadius: "10px",
    border: "1px solid #ddd",
    padding: "0 10px",
    fontSize: "15px",
    outline: "none",
    fontFamily: "'Nanum Gothic', sans-serif",
    '::placeholder': {
      color: '#999',
    },
    marginLeft: "20px",
    marginRight: "20px",
  },
  infoTextContainer: {
    marginLeft: "20px",
    marginRight: "20px",
    marginBottom: "40px",
  },
  infoText: {
    fontSize: "12px",
    width: "100%",
    border: "none",
    borderBottom: "1px solid #ddd",
    padding: "10px 0",
    outline: "none",
  },
  steps: {
    width: "100%",
    marginBottom: "20px",
  },
  step: {
    fontSize: "16px",
    fontWeight: "bold",
    color: "#666",
    marginBottom: "20px",
    marginLeft: "20px",
  },
  button: {
    padding: "12px",
    borderRadius: "20px",
    border: "none",
    color: "white",
    fontSize: "16px",
    fontWeight: "bold",
    cursor: "pointer",
    transition: "background-color 0.3s ease, box-shadow 0.3s ease",
  },
};

export default AccountPage;
