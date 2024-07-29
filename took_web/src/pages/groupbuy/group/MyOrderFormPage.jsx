import BackButton from '../../../components/common/BackButton';
import { useState } from 'react';

const initialData = [{ name: '', option: '', etc: '' }];

function MyOrderFormPage() {
  const [myData, setMyData] = useState(initialData);
  const [total, setTotal] = useState('');

  const handleChange = (idx, field, value) => {
    const newData = myData.map((item, index) =>
      index === idx ? { ...item, [field]: value } : item
    );
    setMyData(newData);
  };

  const addNewItem = () => {
    setMyData([...myData, { name: '', option: '', etc: '' }]);
  };

  return (
    <div className="flex flex-col pt-5 bg-white max-w-screen min-h-screen">
      <div className="flex flex-col px-5 w-full">
        <div className="flex flex-col px-5 w-full">
          <BackButton />
          <div className="mx-6 text-2xl text-main font-extrabold">
            공구 <span className="font-dela">took !</span>
          </div>
        </div>
        <div className="flex flex-col pt-10 pb-1 mt-6 bg-main rounded-2xl shadow-gray-400 shadow-md">
          <div className="flex flex-col px-4 text-xs text-white">
            <div className="text-lg font-bold">내 구매 정보 등록</div>
            <hr className="text-white w-full mx-auto text-opacity-40 my-3" />

            {myData.map((data, idx) => (
              <div
                key={idx}
                className="flex text-sm flex-col items-start py-3 px-5 mt-5 text-main bg-secondary rounded-xl shadow-md shadow-orange-800 font-medium"
              >
                <label className="w-full flex justify-between items-center">
                  물품명
                  <input
                    type="text"
                    value={data.name}
                    onChange={(e) => handleChange(idx, 'name', e.target.value)}
                    className="ml-4 mt-2 p-2 rounded-md bg-secondary text-right  focus:outline-none focus:ring-2 focus:ring-main"
                  />
                </label>
                <label className="w-full flex justify-between items-center mt-2">
                  선택옵션
                  <input
                    type="text"
                    value={data.option}
                    onChange={(e) =>
                      handleChange(idx, 'option', e.target.value)
                    }
                    className="ml-4 mt-2 p-2 rounded-md bg-secondary text-right  focus:outline-none focus:ring-2 focus:ring-main"
                  />
                </label>
                <label className="w-full flex justify-between items-center mt-2">
                  기타사항
                  <input
                    type="text"
                    value={data.etc}
                    onChange={(e) => handleChange(idx, 'etc', e.target.value)}
                    className="ml-4 mt-2 p-2 rounded-md bg-secondary text-right  focus:outline-none focus:ring-2 focus:ring-main"
                  />
                </label>
              </div>
            ))}
            <div
              className="self-center mt-4 text-xs underline cursor-pointer"
              onClick={addNewItem}
            >
              상품 추가하기
            </div>
          </div>
          <div className="flex text-sm flex-col items-start py-3 px-5 m-4 text-main bg-secondary rounded-xl shadow-md shadow-orange-800 font-semibold">
            <label className="w-full flex justify-between items-center">
              총 금액
              <input
                type="text"
                value={total}
                onChange={(e) => setTotal(e.target.value)}
                className="ml-4 py-2 p-2 rounded-md bg-secondary text-right  focus:outline-none focus:ring-2 focus:ring-main"
              />
            </label>
          </div>
        </div>
        <div className="px-16 py-3 my-6 text-md text-center font-bold text-white bg-main rounded-xl shadow-gray-400 shadow-md">
          등록하기
        </div>
      </div>
    </div>
  );
}

export default MyOrderFormPage;
