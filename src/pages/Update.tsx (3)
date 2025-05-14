import MultiInput from '../components/InputsX/MultiInput';
import InputNumber from '../components/InputsX/InputNumber';
import InputTextArea from '../components/InputsX/InputTextArea';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import FileInput from '../components/InputsX/FileInput';
import SelectInput from '../components/InputsX/SelectInput';
import Input from '../components/InputsX/Input';
import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';
import PropTypes from 'prop-types';
import Yo from '../common/Helper/Yo';

const Update = ({ url, inputs, pageName = "Form Layout" }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const [hasFiles, setHasFiles] = useState(false);

  // Fetch initial data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await Yo.get(`${url}${id}`);
     setFormData(response?.data);
     
      } catch (error) {
        toast.error("Failed to load data");
        console.error("Fetch error:", error);
      }
    };
    
    fetchData();
  }, [url, id]);

  // Handle all form changes
  const handleChange = (key, value) => {
    setFormData(prev => ({ ...prev, [key]: value }));
  };

  // Handle file changes
  const handleFileChange = (key, value) => {
    setHasFiles(true);
    handleChange(key, value);
  };

  // Handle multi-input changes
  const handleMulti = (key, value) => {
    handleChange(key, value);
  };

  // Submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (hasFiles) {
        const formDataObj = new FormData();
        
        // Append all data to FormData
        Object.entries(formData).forEach(([key, value]) => {
          if (value instanceof File || Array.isArray(value)) {
            // Handle single file or array of files
            const files = Array.isArray(value) ? value : [value];
            files.forEach(file => formDataObj.append(key, file));
          } else if (typeof value === 'object') {
            formDataObj.append(key, JSON.stringify(value));
          } else {
            formDataObj.append(key, String(value));
          }
        });

        await axios.put(`${url}${id}`, formDataObj, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
      } else {
        await axios.put(`${url}${id}`, formData);
      }
      
      toast.success(`${pageName} updated successfully!`);
      navigate(-1);
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message;
      toast.error(`Error: ${errorMessage}`);
      console.error("Submission error:", error);
    } finally {
      setLoading(false);
    }
  };

  const renderInput = (element, index) => {
    const commonProps = {
      key: index,
      label: element.name,
      name: element.name,
      value: formData[element.name] || '',
      onChange: (e) => handleChange(element.name, e.target.value),
      disabled: loading,
    };

    switch (element.type) {
      case 'text':
        return <Input {...commonProps} placeholder="Enter value" />;
      case 'number':
        return <InputNumber {...commonProps} placeholder="Enter value" />;
      case 'text-area':
        return <InputTextArea {...commonProps} placeholder="Enter value" />;
      case 'option':
        return (
          <SelectInput
            {...commonProps}
            
            setSelecter={handleChange}
            optionValue={element.valueBy}
            optionShowBy={element.optionBy}
            url={element.url}
            selectedValue={formData[element.name] || ''}
            toLink={{ [element.toLink]: formData[element.toLink] } || {}}
            error={[{ index: 0, newError: { error: true, message: "placeholder" } }]}
          />
        );
      case 'file':
        return (
          <FileInput
            {...commonProps}
            onChange={(e) => {
              if (e.target.files.length > 0) {
                handleFileChange(
                  element.name,
                  element.multiple ? Array.from(e.target.files) : e.target.files[0]
                );
              }
            }}
            multiple={element.multiple || false}
          />
        );
      case 'multiInputs':
        return (
          <MultiInput
            key={index}
            value={formData?.variants}
            inputs={element.inputs}
            get={(data) => handleMulti(element.name, data)}
          />
        );
      default:
        return <div key={index}>Unsupported input type</div>;
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
                  {inputs?.map(renderInput)}
                </div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90 disabled:opacity-50"
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

Update.propTypes = {
  url: PropTypes.string.isRequired,
  inputs: PropTypes.arrayOf(
    PropTypes.shape({
      type: PropTypes.oneOf(['text', 'number', 'text-area', 'option', 'file', 'multiInputs']).isRequired,
      name: PropTypes.string.isRequired,
      // Add other prop-specific validations as needed
    })
  ).isRequired,
  pageName: PropTypes.string,
};

export default Update;