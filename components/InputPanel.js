import React, { useState, useEffect, useCallback } from 'react';
import { InputType, getTranslatedInputTypeLabel } from '../types.js';
import { getAvailableOptionsForInputType } from '../utils/conversion.js';
import { t } from '../i18n.js';

const InputPanel = ({ 
  initialInputType = InputType.US_CA, 
  initialInputValue = "7", 
  onInputChange 
}) => {
  const [selectedType, setSelectedType] = useState(initialInputType);
  const [inputValue, setInputValue] = useState(initialInputValue);
  const [availableOptions, setAvailableOptions] = useState([]);

  const isNumericInput = useCallback((type) => {
    return type === InputType.DIAMETER_MM || type === InputType.CIRCUMFERENCE_MM;
  }, []);

  useEffect(() => {
    const options = getAvailableOptionsForInputType(selectedType);
    setAvailableOptions(options);

    if (!isNumericInput(selectedType)) {
      if (options.length > 0 && !options.includes(inputValue)) {
        const firstOption = options[0];
        setInputValue(firstOption);
        onInputChange(selectedType, firstOption);
      } else if (options.length > 0 && options.includes(inputValue)) {
        onInputChange(selectedType, inputValue);
      } else if (options.length === 0) {
        setInputValue('');
        onInputChange(selectedType, '');
      }
    } else {
      onInputChange(selectedType, inputValue);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedType, onInputChange, isNumericInput]); // inputValue removed from deps for dropdown behavior

   useEffect(() => {
    onInputChange(initialInputType, initialInputValue);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  const handleTypeChange = (e) => {
    const newType = e.target.value;
    setSelectedType(newType);
    if (isNumericInput(newType)) {
        if (isNaN(parseFloat(inputValue))) {
            setInputValue(''); // Clear if previous value was non-numeric for a text input
        } else {
            // If it was already numeric, keep it. useEffect will propagate.
        }
    }
    // For dropdowns, useEffect will handle setting the value to the first option
  };

  const handleValueChange = (e) => {
    const newValue = e.target.value;
    setInputValue(newValue);
    onInputChange(selectedType, newValue);
  };
  
  return (
    React.createElement('div', { className: "p-6 bg-white shadow-xl rounded-xl space-y-6 transform transition-all hover:shadow-2xl" },
      React.createElement('div', null,
        React.createElement('label', { htmlFor: "inputType", className: "block text-sm font-semibold text-slate-700 mb-1" },
          t('inputPanel.iKnowMySizeIn')
        ),
        React.createElement('select', {
          id: "inputType",
          value: selectedType,
          onChange: handleTypeChange,
          className: "mt-1 block w-full p-3 border border-slate-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-base transition-colors",
          "aria-label": t('inputPanel.iKnowMySizeIn')
        },
          Object.values(InputType).map((key) => (
            React.createElement('option', { key: key, value: key }, getTranslatedInputTypeLabel(key))
          ))
        )
      ),
      React.createElement('div', null,
        React.createElement('label', { htmlFor: "inputValue", className: "block text-sm font-semibold text-slate-700 mb-1" },
          t('inputPanel.enterSizeValue')
        ),
        isNumericInput(selectedType) ? (
          React.createElement('input', {
            type: "number",
            id: "inputValue",
            value: inputValue,
            onChange: handleValueChange,
            placeholder:
              selectedType === InputType.DIAMETER_MM 
                ? t('inputPanel.placeholderDiameter') 
                : t('inputPanel.placeholderCircumference'),
            step: "0.01",
            className: "mt-1 block w-full p-3 border border-slate-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-base transition-colors",
            "aria-label": t('inputPanel.enterSizeValue')
          })
        ) : (
          React.createElement('select', {
            id: "inputValue",
            value: inputValue,
            onChange: handleValueChange,
            className: "mt-1 block w-full p-3 border border-slate-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-base transition-colors",
            disabled: availableOptions.length === 0,
            "aria-label": t('inputPanel.enterSizeValue')
          },
            availableOptions.length === 0 && React.createElement('option', { value: "" }, t('inputPanel.noSizesAvailable')),
            availableOptions.map(option => (
              React.createElement('option', { key: option, value: option }, option)
            ))
          )
        )
      )
    )
  );
};

export default InputPanel;