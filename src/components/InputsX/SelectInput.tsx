import React, { useState,useEffect } from 'react';
import axios from "axios";

const SelectInput: React.FC = ({url,name,optionShowBy,optionValue,setSelecter,selectedValue,toLink,error}) => {
  const [selectedOption, setSelectedOption] = useState<string>("");
  const [errorX, setErrorX] = useState([]);
  const [isOptionSelected, setIsOptionSelected] = useState<boolean>(false);
  const [resData, setResData] = useState([{error:"", message:""}]);
  const changeTextColor = () => {
    setIsOptionSelected(true);
  };
  /*
  const handleToLink =()=>{
    
    
    
  }
  */
  const getData =()=>{
      axios.get(url).then((res)=>{
      setResData(res.data.data);
    // alert(JSON.stringify(res.data.data))
    }).catch((err)=>{
    //  alert("err")
     // alert(JSON.stringify(err))
    })
  }
  useEffect(() => {
    getData()
  }, [])
  
  
  useEffect(() => {
    setSelectedOption(selectedValue)
  }, [selectedValue])
  useEffect(() => {
    setSelecter(name,selectedOption)
  }, [selectedOption])
  useEffect(() => {
    const addOrReplaceError = (index, newItem) => {
    setErrorX((prevItems) => {
      if (index >= 0 && index < prevItems.length) {
        const updatedItems = [...prevItems];
        updatedItems[index] = newItem;
        return updatedItems;
      } else {
        return [...prevItems, newItem];
      }
    });
  };
  error.forEach((errObj,index)=>{
    
     addOrReplaceError(errObj.index,errObj.newError)
  })
  
  
  
  /*
   if (!toLink[Object.keys(toLink)[0]]) {
     addOrReplaceItem(0,{ error: true, message: `Please fast select ${Object.keys(toLink)[0]}` })
  }else{
    addOrReplaceItem(0,{ error: false, message: ` ${Object.keys(toLink)[0]} is selected ` })

  }
  */
  //alert(error[0].message)
  
  }, [error])
  
  
  
  

  return (
    <div className="mb-1 ">
      <name className="mb-2.5 block text-black dark:text-white">
        {' '}
        {name?.split("_")?.join(" ")}
      </name>

      <div className="relative z-20 bg-transparent dark:bg-form-input">
        <select
          value={selectedOption}
        //  onClick={(e)=>{getData}}
          onChange={(e) => {
            setSelectedOption(e.target.value);
            
            changeTextColor();
          }}
          className={`relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-5 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary ${
            isOptionSelected ? 'text-black dark:text-white' : ''
          }`}
        >
          <option value="" disabled className="text-body dark:text-bodydark">
            Select your subject
          </option>
          
          {resData?.map((r,i)=>(
          
          <option key={i}  value={r[optionValue]} className="text-body dark:text-bodydark">
            {r[optionShowBy]}
          </option>
          
            ))}


        </select>
        

        <span className="absolute top-1/2 right-4 z-30 -translate-y-1/2">
          <svg
            className="fill-current"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g opacity="0.8">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M5.29289 8.29289C5.68342 7.90237 6.31658 7.90237 6.70711 8.29289L12 13.5858L17.2929 8.29289C17.6834 7.90237 18.3166 7.90237 18.7071 8.29289C19.0976 8.68342 19.0976 9.31658 18.7071 9.70711L12.7071 15.7071C12.3166 16.0976 11.6834 16.0976 11.2929 15.7071L5.29289 9.70711C4.90237 9.31658 4.90237 8.68342 5.29289 8.29289Z"
                fill=""
              ></path>
            </g>
          </svg>
        </span>
      </div>
{errorX.map((err,index)=>(
     err.error && <div className="text-red-500 text-sm pl-3"> {err?.message}</div>
  ))}
    </div>
  );
};

export default SelectInput;
