import React from 'react';
import { RingSizeEntry, DisplayCategoryConfigs } from '../types';
import { t } from '../i18n';

interface ResultsDisplayProps {
  matchedSize: RingSizeEntry | null;
  inputValue: string;
  inputTypeLabel: string; // This will now be a pre-translated string
}

const ResultsDisplay: React.FC<ResultsDisplayProps> = ({ matchedSize, inputValue, inputTypeLabel }) => {
  if (!matchedSize) {
    if (!inputValue || inputValue.trim() === "" || inputValue === "0.00 mm (Calculated)") { // Handle initial state for visual sizer
         return (
          <div className="mt-8 p-6 bg-white shadow-xl rounded-xl text-center min-h-[200px] flex flex-col justify-center items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-blue-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
            </svg>
            <p className="text-slate-600 text-lg">{t('resultsDisplay.enterSizePrompt')}</p>
            <p className="text-sm text-slate-500 mt-2">{t('resultsDisplay.selectTypePrompt')}</p>
          </div>
        );
    }
    return (
      <div className="mt-8 p-6 bg-white shadow-xl rounded-xl text-center min-h-[200px] flex flex-col justify-center items-center">
         <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-orange-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75S7.845 2.456 12 3c2.428 0 4.643.89 6.402 2.404m.303 4.095L12.75 12l2.846 2.846m0 0l2.846-2.846M15.596 15.596l-2.846-2.846" />
        </svg>
        <p className="text-slate-700 text-lg font-medium">
          {t('resultsDisplay.noMatchFound', { inputValue: inputValue, inputType: inputTypeLabel })}
        </p>
        <p className="text-sm text-slate-500 mt-2">{t('resultsDisplay.noMatchSuggestion')}</p>
      </div>
    );
  }

  return (
    <div className="mt-8 p-6 bg-white shadow-2xl rounded-xl">
      <h2 className="text-2xl sm:text-3xl font-semibold text-slate-800 mb-6 text-center">
        {t('resultsDisplay.equivalentSizesTitle')}
      </h2>
      <div className="space-y-3">
        {DisplayCategoryConfigs.map(({ key, labelKey }) => {
          const value = matchedSize[key];
          const displayValue = (typeof value === 'number' ? value.toFixed(2) : value) || '-';
          return (
            <div 
              key={key} 
              className="p-4 bg-slate-50 hover:bg-slate-100 transition-colors duration-150 rounded-lg shadow-sm flex justify-between items-center"
            >
              <span className="text-sm sm:text-base font-medium text-slate-700">{t(labelKey)}:</span>
              <span className="text-base sm:text-lg font-bold text-blue-600 tracking-wide">
                {displayValue}
              </span>
            </div>
          );
        })}
      </div>
       <div className="mt-8 text-xs text-slate-500 text-center space-y-1">
        <p>{t('resultsDisplay.disclaimerVariation')}</p>
        <p>{t('resultsDisplay.disclaimerIso')}</p>
        <p>{t('resultsDisplay.disclaimerNoEquivalent')}</p>
      </div>
    </div>
  );
};

export default ResultsDisplay;