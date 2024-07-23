import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AiOutlineLeft, AiOutlineClose } from "react-icons/ai";
import { banks, stocks } from "../../utils/bankdata";

function SelectPage() {
  const navigate = useNavigate();
  const [selectedTab, setSelectedTab] = useState("은행"); // "은행" 또는 "증권사" 중 하나

  const handleSelect = (name) => {
    let fullName = name;
    if (selectedTab === "은행" && !name.endsWith("뱅크") && !name.endsWith("우체국")) {
      fullName = `${name}은행`;
    }
    navigate("/account", { state: { selectedName: fullName } });
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <AiOutlineLeft style={styles.backIcon} onClick={() => navigate(-1)} />
        <span style={styles.headerText}>계좌 등록</span>
        <AiOutlineClose style={styles.closeIcon} onClick={() => navigate("/account")} />
      </div>
      <div style={styles.tabs}>
        <div style={{ ...styles.tab, borderBottom: selectedTab === "은행" ? "2px solid #FF7F50" : "none" }} onClick={() => setSelectedTab("은행")}>은행</div>
        <div style={{ ...styles.tab, borderBottom: selectedTab === "증권사" ? "2px solid #FF7F50" : "none" }} onClick={() => setSelectedTab("증권사")}>증권사</div>
      </div>
      <div style={styles.grid}>
        {selectedTab === "은행" && banks.map((bank) => (
          <div key={bank.name} style={styles.item} onClick={() => handleSelect(bank.name)}>
            <img src={bank.icon} alt={bank.name} style={styles.icon} />
            <div style={styles.label}>{bank.name}</div>
          </div>
        ))}
        {selectedTab === "증권사" && stocks.map((stock) => (
          <div key={stock.name} style={styles.item} onClick={() => handleSelect(stock.name)}>
            <img src={stock.icon} alt={stock.name} style={styles.icon} />
            <div style={styles.label}>{stock.name}</div>
          </div>
        ))}
      </div>
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
  closeIcon: {
    position: "absolute",
    right: "10px",
    fontSize: "24px",
    cursor: "pointer",
  },
  headerText: {
    fontSize: "18px",
    fontWeight: "bold",
  },
  tabs: {
    display: "flex",
    justifyContent: "space-around",
    width: "100%",
    marginBottom: "20px",
  },
  tab: {
    fontSize: "16px",
    fontWeight: "bold",
    paddingBottom: "10px",
    cursor: "pointer",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    gap: "10px",
  },
  item: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    cursor: "pointer",
  },
  icon: {
    width: "50px",
    height: "50px",
    marginBottom: "5px",
  },
  label: {
    fontSize: "14px",
    textAlign: "center",
  },
};

export default SelectPage;
