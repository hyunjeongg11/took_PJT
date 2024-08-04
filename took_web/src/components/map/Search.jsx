import React, { useState } from 'react';
import useInput from '../../hooks/useInput';
import { usePosition } from '../../store/position';
import { keywordSearch, getAddr } from '../../utils/map';

const Search = ({ getDirections, setStartCoord }) => {
  const [searchPageFull, setSearchPageFull] = useState('DEFAULT');
  const [startSearchList, setStartSearchList] = useState([]);

  const {
    value: startInput,
    onChange: onStartInput,
    setValue: setStartInput,
  } = useInput();

  const { latitude, longitude } = usePosition();

  const inputHandler = async (input, setSearchList) => {
    try {
      const result = await keywordSearch(input);
      console.log(result);
      setSearchList(
        result.map((el) => ({
          label: el.place_name,
          x: Number(el.x),
          y: Number(el.y),
          road_address_name: el.road_address_name,
          address_name: el.address_name,
        }))
      );
    } catch (error) {
      console.error(`Error: ${error}`);
    }
  };

  const getCurrentLocation = async () => {
    try {
      const result = await getAddr(latitude, longitude);
      console.log(result);
      setStartCoord([longitude, latitude]);
      setStartInput(result);
    } catch (error) {
      console.error(`Error: ${error}`);
    }
  };

  return (
    <form
      className="flex flex-col gap-y-2 pb-4"
      onSubmit={(e) => getDirections(e)}
    >
      <div className="flex items-center w-full text-xs placeholder-slate-400 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
        <input
          placeholder="출발지"
          className="w-[90%] text-xs placeholder-slate-400 bg-gray-100 rounded-lg py-3 px-3"
          value={startInput}
          onClick={() => setSearchPageFull('START')}
          onChange={(e) => {
            onStartInput(e);
            inputHandler(startInput, setStartSearchList);
          }}
        />
        <button
          type="button"
          className="w-[10%] flex justify-end pr-3"
          onClick={getCurrentLocation}
        ></button>
      </div>
      {searchPageFull === 'START' && startSearchList.length > 0 && (
        <div className="flex flex-col gap-y-2 rounded-lg overflow-auto">
          {startSearchList.map((el, index) => (
            <div
              key={index}
              className="px-3 py-3 bg-gray-100 rounded-lg text-xs hover:bg-gray-200"
              onClick={() => {
                setStartInput(el.label);
                setStartCoord([el.x, el.y]);
                setStartSearchList([]);
                setSearchPageFull('DEFAULT');
              }}
            >
              <div>
                <p className="font-semibold pb-0.5">{el.label}</p>
                {el.road_address_name ? (
                  <p className="text-slate-500">{el.road_address_name}</p>
                ) : (
                  <p className="text-slate-500">{el.address_name}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      <input
        type="submit"
        className="bg-primary-default w-full font-medium text-sm text-white py-2.5 px-4 rounded-lg hover:bg-opacity-80"
        value="검색"
      />
    </form>
  );
};

export default Search;
