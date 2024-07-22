import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AiOutlineLeft } from "react-icons/ai";

function VerificationPage() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [requestSent, setRequestSent] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [verificationStatus, setVerificationStatus] = useState("");
  const [isValidCode, setIsValidCode] = useState(false);

  const handleNameChange = (e) => setName(e.target.value);
  const handlePhoneNumberChange = (e) => {
    if (e.target.value.length <= 15) {
      setPhoneNumber(e.target.value);
    }
  };
  const handleVerificationCodeChange = (e) => {
    if (e.target.value.length <= 6) {
      setVerificationCode(e.target.value);
    }
  };

  const handleRequestClick = () => {
    setRequestSent(true);
    setVerificationStatus("");
    setIsVerified(false);
  };

  const handleVerifyClick = () => {
    if (!verificationCode) {
      setVerificationStatus("인증번호를 입력해주세요.");
      setIsVerified(false);
      setIsValidCode(false);
      return;
    }

    console.log("user_name :", name);
    console.log("phone_number :", phoneNumber);
    console.log("code :", verificationCode);

    if (verificationCode === "123456") {
      setIsVerified(true);
      setIsValidCode(true);
      setVerificationStatus("인증이 완료되었습니다.");
    } else {
      setIsVerified(false);
      setIsValidCode(false);
      setVerificationStatus("잘못된 인증번호를 입력하였습니다.");
    }
  };

  const isFormValid = name && phoneNumber && isValidCode;

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <AiOutlineLeft style={styles.backIcon} onClick={() => navigate(-1)} />
        <span style={styles.headerText}>계좌 등록</span>
      </div>
      <div style={styles.section}>
        <div style={styles.stepContainer}>
          <div style={styles.step}>
            <span style={styles.circleEmpty}>1</span> 본인 명의 계좌 번호 등록
          </div>
          <div style={styles.step}>
            <span style={styles.circleEmpty}>2</span> 약관 동의
          </div>
          <div style={styles.stepActive}>
            <span style={styles.stepNumberActive}>3</span> 본인 인증
          </div>
        </div>
        <label style={styles.label}>
          <span style={styles.labelText}>이름</span>
          <div style={styles.inputContainer}>
            <input
              type="text"
              placeholder="성명입력"
              value={name}
              onChange={handleNameChange}
              style={styles.input}
            />
          </div>
        </label>
        <label style={styles.label}>
          <span style={styles.labelText}>휴대폰번호</span>
          <div style={styles.inputContainer}>
            <input
              type="text"
              placeholder="'-' 없이 숫자만 입력"
              value={phoneNumber}
              onChange={handlePhoneNumberChange}
              style={styles.input}
            />
            <button style={styles.requestButton} onClick={handleRequestClick}>
              {requestSent ? "재전송" : "인증 요청"}
            </button>
          </div>
        </label>
        <label style={styles.label}>
          <span style={styles.labelText}>인증번호</span>
          <div style={styles.inputContainer}>
            <input
              type="text"
              placeholder="인증번호 6자리 입력"
              value={verificationCode}
              onChange={handleVerificationCodeChange}
              style={styles.input}
            />
            <button style={styles.verifyButton} onClick={handleVerifyClick}>
              확인
            </button>
          </div>
        </label>
        <div style={styles.verificationStatus(isValidCode)}>{verificationStatus}</div>
      </div>
      <button
        style={{
          ...styles.button,
          backgroundColor: isFormValid ? "#FF7F50" : "rgba(255, 127, 80, 0.5)",
          boxShadow: isFormValid ? "0px 4px 8px rgba(0, 0, 0, 0.2)" : "none",
        }}
        disabled={!isFormValid}
        onMouseOver={(e) =>
          isFormValid && (e.currentTarget.style.boxShadow = "0px 4px 8px rgba(0, 0, 0, 0.2)")
        }
        onMouseOut={(e) => (e.currentTarget.style.boxShadow = "none")}
        onClick={() => navigate('/accountcomplete')}
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
    marginBottom: "10px",
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
  section: {
    width: "100%",
  },
  stepContainer: {
    display: "flex",
    flexDirection: "column",
    marginBottom: "20px",
  },
  step: {
    fontSize: "16px",
    fontWeight: "bold",
    color: "#666",
    marginBottom: "20px",
    display: "flex",
    alignItems: "center",
  },
  stepActive: {
    fontSize: "16px",
    fontWeight: "bold",
    display: "flex",
    alignItems: "center",
  },
  stepNumberActive: {
    width: "20px",
    height: "20px",
    borderRadius: "50%",
    backgroundColor: "#FF7F50",
    color: "white",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginRight: "5px",
  },
  label: {
    display: "flex",
    flexDirection: "column",
    marginBottom: "10px",
  },
  labelText: {
    fontSize: "14px",
    marginBottom: "5px",
    fontWeight: "bold",

  },
  inputContainer: {
    display: "flex",
  },
  input: {
    flex: 1,
    height: "50px",
    borderRadius: "10px",
    border: "1px solid #ddd",
    padding: "0 10px",
    fontSize: "14px",
    marginRight: "5px",
    outline: "none",
  },
  requestButton: {
    backgroundColor: "#FF7F50",
    color: "white",
    border: "none",
    borderRadius: "10px",
    padding: "0 15px",
    cursor: "pointer",
  },
  verifyButton: {
    backgroundColor: "#FF7F50",
    color: "white",
    border: "none",
    borderRadius: "10px",
    padding: "0 15px",
    cursor: "pointer",
  },
  verificationStatus: (isValidCode) => ({
    fontSize: "14px",
    color: isValidCode ? "black" : "red",
    marginTop: "10px",
  }),
  button: {
    width: "calc(100% - 40px)",
    padding: "12px",
    borderRadius: "20px",
    border: "none",
    color: "white",
    fontSize: "16px",
    fontWeight: "bold",
    cursor: "pointer",
    transition: "background-color 0.3s ease, box-shadow 0.3s ease",
    position: "absolute",
    bottom: "20px",
    left: "50%",
    transform: "translateX(-50%)",
  },
  circleEmpty: {
    display: "inline-block",
    width: "20px",
    height: "20px",
    borderRadius: "50%",
    border: "1px solid #ddd",
    color: "#666",
    textAlign: "center",
    lineHeight: "20px",
    marginRight: "10px",
  },
};

export default VerificationPage;
