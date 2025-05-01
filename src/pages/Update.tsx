import MultiInput from '../components/InputsX/MultiInput';
import InputNumber from '../components/InputsX/InputNumber';
import InputTextArea from '../components/InputsX/InputTextArea';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import FileInput from '../components/InputsX/FileInput';
import SelectInput from '../components/InputsX/SelectInput';
import Input from '../components/InputsX/Input';
import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';

const Update = ({ url, inputs, pageName = "Form Layout" }) => {
  const { id } = useParams();
  const [inputData, setInputData] = useState({});
  const [selecterData, setSelecterData] = useState({});
  const [imgFileData, setImgFileData] = useState({});
  const [loading, setLoading] = useState(false);
  const [callCreateV2, setCallCreateV2] = useState(false);
  const [allData, setAllData] = useState({});
  const [maltiData, setMultiData] = useState([]);


  useEffect(() => {
    axios.get(`${url}`+id)
      .then((res) => {
     // alert(JSON.stringify(res.data.data))
      setAllData(res.data.data)
      setInputData(res.data.data)
       // console.log("Fetched Data:", res.data.data);
      })
      .catch((err) => {
        alert("Error fetching data");
      });
  }, [url]);

  const handleInputChange = (key, value) => {
    setInputData(prev => ({ ...prev, [key]: value }));
  };

  const handleSelectChange = (key, value) => {
    setSelecterData(prev => ({ ...prev, [key]: value }));
  };

  const handleFileChange = (key, value) => {
    setImgFileData(prev => ({ ...prev, [key]: value }));
    setCallCreateV2(true);
  };


const handleMulti = (key, value) => {
        setMultiData(prev => ({ ...prev, [key]: value }));

  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (callCreateV2) {
        const formData = new FormData();
       const  sendX= { ...allData,...inputData, ...selecterData, ...imgFileData }
        Object.keys(sendX).forEach((key, value) => {
        formData.append(key, sendX[key]);
        });

        await axios.put(url+id, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
      } else {
        //alert(JSON.stringify( {...allData, ...inputData, ...selecterData, ...imgFileData }));
        await axios.put(url+id, {...allData, ...inputData, ...selecterData, ...imgFileData });
      }

      toast.success("Form submitted successfully! "); 
    } catch (error) {
            toast.error("An error occurred: " + error.message); 

     // alert(`Error: ${JSON.stringify(error.response?.data || error.message)}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Breadcrumb pageName={pageName} />

      <div className="grid grid-cols-1 gap-9 sm:grid-cols-2 md:grid-cols-1">
        <div className="flex flex-col gap-9">
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                Edit {pageName || ""}
              </h3>
            </div>
            <form onSubmit={handleSubmit}>
               <div className="p-6.5">
                <div className="mb-4.5 flex flex-col gap-6 md:flex-row md:flex-wrap xl:flex-row">
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
                            selectedValue={allData[element?.name]}
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
                  })}
                </div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90"
                  disabled={loading}
                >
                  {loading ? "Submitting..." : `Update ${pageName}`}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Update;
