import InputTextArea from './InputTextArea';
import InputNumber from './InputNumber';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SelectInput from './SelectInput';
import FileInput from './FileInput';
import Input from './Input';


const InputX = ({inputs,name,get,value={}}) => {
  const [inputData, setInputData] = useState({});
  const [selecterData, setSelecterData] = useState({});
  const [imgFileData, setImgFileData] = useState({});
  const [loading, setLoading] = useState(false);
  const [callCreateV2, setCallCreateV2] = useState(false);
  const [all, setAll] = useState({});
  
  const handleInputChange = (key, value) => {
    setInputData(prev => ({ ...prev, [key]: value }));
        setAll(prev => ({ ...prev, [key]: value }));

  };

  const handleSelectChange = (key, value) => {
    setSelecterData(prev => ({ ...prev, [key]: value }));
        setAll(prev => ({ ...prev, [key]: value }));

  };

  const handleFileChange = (key, value) => {
    setImgFileData(prev => ({ ...prev, [key]: value }));
    setAll(prev => ({ ...prev, [key]: value }));
    setCallCreateV2(true);
  };
  
  useEffect(()=>{
    get(all)
    console.log(all);
  },[all])
  useEffect(()=>{
    
   // setAll({...value[0]})
    setInputData({...value[0]})
    setSelecterData({...value[0]})
    setImgFileData({...value[0]})
    
    
  },[value])
  
  
  return (
    <>
          <div className="rounded-sm min-w-full border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="p-3">  {name+1}</div>
              <div className="p-6.5">
             
                <div className="mb-4.5 flex flex-col gap-6 md:flex-row md:flex-wrap2 xl:flex-row">
                  {inputs?.map((element, index) => {
                    switch (element.type) {
                      case 'text':
                        return (
                          <Input
                            key={index}
                            label={element.name}
                            placeholder="Enter value"
                            value={inputData[element.name] || ''}
                            onChange={(e) => handleInputChange(element.name, e.target.value)}
                            disabled={false}
                          />
                        );
                      case 'number':
                        return (
                          <InputNumber
                            key={index}
                            label={element.name}
                            placeholder="Enter value"
                            value={inputData[element.name] || ''}
                            onChange={(e) => handleInputChange(element.name, e.target.value)}
                            disabled={false}
                          />
                        );
                      case 'text-area':
                        return (
                          <InputTextArea 
                            key={index}
                            label={element.name}
                            placeholder="Enter value"
                            value={inputData[element.name] || ''}
                            onChange={(e) => handleInputChange(element.name, e.target.value)}
                            disabled={false}
                          />
                        );
                      case 'option':
                        return (
                          <SelectInput
                            key={index}
                            setSelecter={handleSelectChange}
                            optionValue={element.valueBy}
                            name={element.name}
                            optionShowBy={element.optionBy}
                            url={element.url}
                            selectedValue={selecterData[element.name] || ''}
                            toLink={{[element.toLink]:selecterData[element.toLink]}||{}}
                            error=
                            {
                              [
                                {
                                  index:0,
                                newError:
                                {
                                  error:true,
                                  message:"placeholder"
                                  
                                },
                                
                                }
                              ]
                                }
  
                            
                          />
                        );
                      case 'file':
                        return (
                        <FileInput
                            key={index} // Ensure unique key
                            onChange={(e) => {
                              if (e.target.files.length > 0) {
                                handleFileChange(
                                  element.name,
                                  element.multiple ? Array.from(e.target.files) : e.target.files[0]
                                );
                              }
                            }}
                            label={element.name}
                            multiple={element.multiple || false} // Ensure proper boolean value
                           />

                        );
                      case 'multiInputs':
                        return (
                           <MultiInput
                           key={index}
                             inputs={element.inputs}
                             get={(data)=>handleMulti(element.name,data)}
                             
                           />
                        );
                      default:
                        return <div key={index}>Unsupported input type</div>;
                    }
                  })}                </div>
              
              </div>

          </div>
        
    
    </>
  );
}

export default InputX