import InputTextArea from './InputTextArea';
import InputNumber from './InputNumber';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SelectInput from './SelectInput';
import FileInput from './FileInput';
import Input from './Input';
import PropTypes from 'prop-types';

const InputX = ({ inputs, name, get, value = {} }) => {
  const [allData, setAllData] = useState({});
  const [loading, setLoading] = useState(false);

  // Handle all input changes uniformly
  const handleChange = (key, value) => {
    setAllData(prev => ({ ...prev, [key]: value }));
  };

  // Initialize with default values
  useEffect(() => {
    if (value && Object.keys(value).length > 0) {
      setAllData(prev => ({ ...prev, ...value }));
    }
  }, [value]);

  // Notify parent of changes
  useEffect(() => {
    get(allData);
  }, [allData, get]);

  const renderInput = (element, index) => {
    const commonProps = {
      key: index,
      label: element.name,
      value: allData[element.name] || '',
      disabled: false,
      onChange: (e) => handleChange(element.name, e.target.value)
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
            name={element.name}
            optionShowBy={element.optionBy}
            url={element.url}
            selectedValue={allData[element.name] || ''}
            toLink={{ [element.toLink]: allData[element.toLink] } || {}}
            error={[{ index: 0, newError: { error: true, message: "placeholder" } }]}
          />
        );
      case 'file':
        return (
          <FileInput
            {...commonProps}
            onChange={(e) => {
              if (e.target.files.length > 0) {
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
    <div className="rounded-sm min-w-full border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="p-3">{name + 1}</div>
      <div className="p-6.5">
        <div className="mb-4.5 flex flex-col gap-6 md:flex-row md:flex-wrap2 xl:flex-row">
          {inputs?.map(renderInput)}
        </div>
      </div>
    </div>
  );
};

InputX.propTypes = {
  inputs: PropTypes.arrayOf(
    PropTypes.shape({
      type: PropTypes.oneOf(['text', 'number', 'text-area', 'option', 'file', 'multiInputs']).isRequired,
      name: PropTypes.string.isRequired,
      // Add other prop type validations as needed
    })
  ).isRequired,
  name: PropTypes.string,
  get: PropTypes.func.isRequired,
  value: PropTypes.object,
};

export default InputX;