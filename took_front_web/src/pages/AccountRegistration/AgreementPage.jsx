import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";

function AgreementPage({ checkedItems, setCheckedItems }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [allChecked, setAllChecked] = useState(false);

  const { bank, account } = location.state || {};

  useEffect(() => {
    const allChecked = Object.values(checkedItems).length > 0 && Object.values(checkedItems).every(Boolean);
    setAllChecked(allChecked);
  }, [checkedItems]);

  const handleAllCheckChange = () => {
    const newCheckedState = !allChecked;
    setAllChecked(newCheckedState);
    const newCheckedItems = {
      terms1: newCheckedState,
      terms2: newCheckedState,
      terms3: newCheckedState,
      terms4: newCheckedState,
      terms5: newCheckedState,
      terms6: newCheckedState,
    };
    setCheckedItems(newCheckedItems);
  };

  const handleCheckChange = (name) => {
    setCheckedItems((prev) => ({ ...prev, [name]: !prev[name] }));
  };

  const isFormValid = ["terms1", "terms2", "terms3"].every((term) => checkedItems[term]);

  const handleNavigateDetail = (index) => {
    navigate('/agreementdetail', { state: { scrollToIndex: index } });
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <AiOutlineLeft style={styles.backIcon} onClick={() => navigate(-1)} />
        <span style={styles.headerText}>계좌 등록</span>
      </div>
      <div style={styles.section}>
        <div style={styles.stepContainer}>
          <div style={styles.step} onClick={() => navigate("/account", { state: { bank, account } })}>
            <span style={styles.circleEmpty}>1</span> 본인 명의 계좌 번호 등록
          </div>
          <div style={styles.stepActive}>
            <span style={styles.stepNumberActive}>2</span> 약관 동의
          </div>
        </div>
        <div style={styles.notice}>
          <strong>took에 계좌를 등록하기 위해 약관을 동의해주세요</strong><br />
          설명 및 약관을 이해하였음을 확인합니다.
        </div>
        <div style={styles.termsContainer}>
          <div style={styles.termsLabelContainer}>
            <label style={styles.termsLabel} onClick={handleAllCheckChange}>
              <span style={styles.customCheckbox}>{allChecked ? "🗹" : "☐"}</span>
              전체 동의하기
            </label>
            <AiOutlineRight style={styles.rightIcon} onClick={() => handleNavigateDetail(0)} />
          </div>
          <div style={styles.term}>
            <label style={styles.termLabel} onClick={() => handleCheckChange("terms1")}>
              <span style={styles.customCheckbox}>{checkedItems.terms1 ? "🗹" : "☐"}</span>
              (필수) 상품 이용약관
            </label>
            <AiOutlineRight style={styles.rightIcon} onClick={() => handleNavigateDetail(1)} />
          </div>
          <div style={styles.subTerms}>
            <div style={styles.subTerm}>- 예금거래기본약과</div>
            <div style={styles.subTerm}>- 입출금이자유로운예금 약관</div>
          </div>
          <div style={styles.term}>
            <label style={styles.termLabel} onClick={() => handleCheckChange("terms2")}>
              <span style={styles.customCheckbox}>{checkedItems.terms2 ? "🗹" : "☐"}</span>
              (필수) 불법·탈법 차명거래 금지 설명 <br /> 확인
            </label>
            <AiOutlineRight style={styles.rightIcon} onClick={() => handleNavigateDetail(2)} />
          </div>
          <div style={styles.term}>
            <label style={styles.termLabel} onClick={() => handleCheckChange("terms3")}>
              <span style={styles.customCheckbox}>{checkedItems.terms3 ? "🗹" : "☐"}</span>
              (필수) 예금자보호법 설명 확인
            </label>
            <AiOutlineRight style={styles.rightIcon} onClick={() => handleNavigateDetail(3)} />
          </div>
          <div style={styles.term}>
            <label style={styles.termLabel} onClick={() => handleCheckChange("terms4")}>
              <span style={styles.customCheckbox}>{checkedItems.terms4 ? "🗹" : "☐"}</span>
              (선택) 개인신용정보 선택적 제공 동의
            </label>
            <AiOutlineRight style={styles.rightIcon} onClick={() => handleNavigateDetail(4)} />
          </div>
          <div style={styles.term}>
            <label style={styles.termLabel} onClick={() => handleCheckChange("terms5")}>
              <span style={styles.customCheckbox}>{checkedItems.terms5 ? "🗹" : "☐"}</span>
              (선택) 개인신용정보 선택적 수집 및 <br />이용 동의
            </label>
            <AiOutlineRight style={styles.rightIcon} onClick={() => handleNavigateDetail(5)} />
          </div>
          <div style={styles.term}>
            <label style={styles.termLabel} onClick={() => handleCheckChange("terms6")}>
              <span style={styles.customCheckbox}>{checkedItems.terms6 ? "🗹" : "☐"}</span>
              (선택) 광고성 정보 수신 동의
            </label>
            <AiOutlineRight style={styles.rightIcon} onClick={() => handleNavigateDetail(6)} />
          </div>
        </div>
        <div style={styles.stepInactive}>
        <span style={styles.circleEmpty}>3</span>본인 인증</div>
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
        onClick={() => navigate('/verification', { state: { bank, account } })}
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
    marginBottom: "10px",
  },
  step: {
    fontSize: "16px",
    fontWeight: "bold",
    color: "black",
    marginBottom: "20px",
    display: "flex",
    alignItems: "center",
    cursor: "pointer",
  },
  stepActive: {
    fontSize: "16px",
    fontWeight: "bold",
    display: "flex",
    alignItems: "center",
  },
  stepInactive: {
    fontSize: "16px",
    fontWeight: "bold",
    color: "#666",
    marginBottom: "10px",
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
  notice: {
    fontSize: "14px",
    color: "black",
    marginBottom: "10px",
  },
  termsContainer: {
    border: "1px solid #ddd",
    borderRadius: "10px",
    padding: "20px",
    width: "100%",
    backgroundColor: "#fafafa",
    marginBottom: "10px",
  },
  termsLabelContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  termsLabel: {
    fontSize: "16px",
    fontWeight: "bold",
    marginBottom: "10px",
    display: "flex",
    alignItems: "center",
  },
  term: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: "10px",
  },
  termLabel: {
    display: "flex",
    alignItems: "center",
    fontSize: "14px",
  },
  subTerms: {
    marginBottom: "10px",
  },
  subTerm: {
    fontSize: "14px",
    color: "#555",
    marginLeft: "20px",
    marginBottom: "5px",
  },
  customCheckbox: {
    fontSize: "16px",
    marginRight: "10px",
    cursor: "pointer",
  },
  rightIcon: {
    fontSize: "18px",
    color: "#ddd",
  },
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

export default AgreementPage;
