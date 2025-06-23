import React, { useState, useEffect, useCallback } from 'react';
import { InputType, InputTypeLabelKeys, getTranslatedInputTypeLabel } from '../types';
import { getAvailableOptionsForInputType } from '../utils/conversion';
import { t } from '../i18n';

interface InputPanelProps {
  initialInputType?: InputType;
  initialInputValue?: string;
  onInputChange: (type: InputType, value: string) => void;
}

const InputPanel: React.FC<InputPanelProps> = ({ 
  initialInputType = InputType.US_CA, 
  initialInputValue = "7", 
  onInputChange 
}) => {
  const [selectedType, setSelectedType] = useState<InputType>(initialInputType);
  const [inputValue, setInputValue] = useState<string>(initialInputValue);
  const [availableOptions, setAvailableOptions] = useState<string[]>([]);

  const isNumericInput = useCallback((type: InputType) => {
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
  }, [selectedType, onInputChange, isNumericInput]);

   useEffect(() => {
    onInputChange(initialInputType, initialInputValue);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  const handleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newType = e.target.value as InputType;
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

  const handleValueChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const newValue = e.target.value;
    setInputValue(newValue);
    onInputChange(selectedType, newValue);
  };
  
  return (
    <div className="p-6 bg-white shadow-xl rounded-xl space-y-6 transform transition-all hover:shadow-2xl">
      <div>
        <label htmlFor="inputType" className="block text-sm font-semibold text-slate-700 mb-1">
          {t('inputPanel.iKnowMySizeIn')}
        </label>
        <select
          id="inputType"
          value={selectedType}
          onChange={handleTypeChange}
          className="mt-1 block w-full p-3 border border-slate-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-base transition-colors"
          aria-label={t('inputPanel.iKnowMySizeIn')}
        >
          {Object.values(InputType).map((key) => (
            <option key={key} value={key}>{getTranslatedInputTypeLabel(key as InputType)}</option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="inputValue" className="block text-sm font-semibold text-slate-700 mb-1">
          {t('inputPanel.enterSizeValue')}
        </label>
        {isNumericInput(selectedType) ? (
          <input
            type="number"
            id="inputValue"
            value={inputValue}
            onChange={handleValueChange}
            placeholder={
              selectedType === InputType.DIAMETER_MM 
                ? t('inputPanel.placeholderDiameter') 
                : t('inputPanel.placeholderCircumference')
            }
            step="0.01"
            className="mt-1 block w-full p-3 border border-slate-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-base transition-colors"
            aria-label={t('inputPanel.enterSizeValue')}
          />
        ) : (
          <select
            id="inputValue"
            value={inputValue}
            onChange={handleValueChange}
            className="mt-1 block w-full p-3 border border-slate-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-base transition-colors"
            disabled={availableOptions.length === 0}
            aria-label={t('inputPanel.enterSizeValue')}
          >
            {availableOptions.length === 0 && <option value="">{t('inputPanel.noSizesAvailable')}</option>}
            {availableOptions.map(option => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        )}
      </div>
    </div>
  );
};

export default InputPanel;