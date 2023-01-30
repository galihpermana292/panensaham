import React from "react";
import { useState } from "react";

const AutoCompleteInput = ({ listIndices, onActon }) => {
  const [contituens, setConstituens] = useState([]);
  const [isShow, setIsShow] = useState(false);
  const [valueInput, setValueInput] = useState("ALL");
  //   console.log(listIndices);
  const searchIndices = (e) => {
    setValueInput(e);
    let filter = [];
    listIndices.map((val) => {
      if (val.toLowerCase().search(e.toLowerCase()) != -1) {
        filter.push(val);
      } else {
        // filter.push(val);
      }
    });
    // console.log(filter);
    setConstituens(filter);

    // console.log(listIndices.includes(e));
  };

  return (
    <div
      onMouseLeave={() => setIsShow(false)}
      className="border-2 outline-none"
    >
      <input
        className="px-2"
        placeholder="selectIndex"
        onChange={(e) => searchIndices(e.target.value)}
        value={valueInput}
        onMouseEnter={() => {
          setIsShow(true);
          setConstituens(listIndices);
        }}
        // onMouseLeave={() => setIsShow(false)}
        // onBlur={() => setIsShow(false)}
      ></input>
      <div
        className={`absolute ${isShow ? "block" : "hidden"}  z-10 bg-white  ${
          contituens.length > 10 ? "h-56 overflow-y-scroll" : null
        }  py-1  `}
      >
        <p
          onClick={() => {
            setValueInput("ALL");
            setIsShow(false);
            onActon("ALL");
          }}
          className="hover:bg-green-100 mx-4 cursor-pointer"
          //   key={index}
        >
          ALL
        </p>
        {contituens.map((val, index) => {
          return (
            <p
              onClick={() => {
                setValueInput(val);
                setIsShow(false);
                onActon(val);
              }}
              className="hover:bg-green-100 mx-4 cursor-pointer"
              key={index}
            >
              {val}
            </p>
          );
        })}
      </div>
    </div>
  );
};

export default AutoCompleteInput;
