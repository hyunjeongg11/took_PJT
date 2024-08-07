import backIcon from '../../assets/common/back.svg';
import { useNavigate } from 'react-router-dom';

const BackButton = () => {
  const navigate = useNavigate();
  const handleBackClick = () => {
    navigate(-1);
  };
  return (
    <img
      src={backIcon}
      alt="뒤로"
      className="w-6 h-6 mx-6 mt-6 absolute top-0 left-0 opacity-80"
      onClick={handleBackClick}
    />
  );
};

export default BackButton;
