import InputTextArea from '../components/InputsX/InputTextArea';
import InputNumber from '../components/InputsX/InputNumber';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import MultiInput from '../components/InputsX/MultiInput';
import FileInput from '../components/InputsX/FileInput';
import SelectInput from '../components/InputsX/SelectInput';
import Input from '../components/InputsX/Input';
import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';
import PropTypes from 'prop-types';

const Create = ({ url, inputs, pageName = "Form Layout", children }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const [hasFiles, setHasFiles] = useState(false);

  const handleChange = (key, value) => {
    setFormData(prev => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
if (hasFiles) {
  const formDataX = new FormData();

  Object.entries(formData).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      const allFiles = value.every(file => file instanceof File);
      if (allFiles) {
        value.forEach(file => {
          formDataX.append(key, file);
        });
      } else {
        formDataX.append(key, JSON.stringify(value));
      }
    } else {
      formDataX.append(key, value instanceof File ? value : String(value));
    }
  });

  await axios.post(url, formDataX, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
} else {
  await axios.post(url, formData);
}

      
      toast.success(`${pageName} created successfully!`);
      navigate(-1);
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message;
      toast.error(`Error: ${errorMessage}`);
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
            linkTo={element.toLink}
            linkToValue={formData[element.toLink] || ''}
            error={[{ index: 0, newError: { error: true, message: "placeholder" } }]}
          />
        );
      case 'file':
        return (
          <FileInput
            {...commonProps}
            onChange={(e) => {
              if (e.target.files.length > 0) {
                setHasFiles(true);
                handleChange(
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
           inputs={element.inputs}
            get={(data) => handleChange(element.name, data)}
          />
        );
      default:
        return <div key={index}>Unsupported input type</div>;
    }
  };

  return (
    <>
      <Breadcrumb 
        pageName={pageName} 
        link={[
          { link: null, to: '/' },
          { link: "Create", to: '#' }
        ]} 
      />

      <div className="grid grid-cols-1 gap-9 sm:grid-cols-2 md:grid-cols-1">
        <div className="flex flex-col gap-9">
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                Create {pageName || ""}
              </h3>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="p-6.5">
                <div className="mb-4.5 flex flex-col gap-6 md:flex-row md:flex-wrap xl:flex-row">
                  {inputs?.map(renderInput)}
                  {React.Children.map(children, child => 
                    React.isValidElement(child) 
                      ? React.cloneElement(child, {
                          send: (key, data) => handleChange(key, data),
                        })
                      : child
                  )}
                </div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90 disabled:opacity-50"
                  disabled={loading}
                >
                  {loading ? "Submitting..." : `Create ${pageName}`}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

Create.propTypes = {
  url: PropTypes.string.isRequired,
  inputs: PropTypes.arrayOf(
    PropTypes.shape({
      type: PropTypes.oneOf(['text', 'number', 'text-area', 'option', 'file', 'multiInputs']).isRequired,
      name: PropTypes.string.isRequired,
      // Add other prop-specific validations
    })
  ).isRequired,
  pageName: PropTypes.string,
  children: PropTypes.node,
};

export default Create;