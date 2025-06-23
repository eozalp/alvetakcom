import React from 'react';
import { DisplayCategoryConfigs } from '../types.js';
import { t } from '../i18n.js';

const ResultsDisplay = ({ matchedSize, inputValue, inputTypeLabel }) => {
  if (!matchedSize) {
    if (!inputValue || inputValue.trim() === "" || inputValue === "0.00 mm (Calculated)") { // Handle initial state for visual sizer
         return (
          React.createElement('div', { className: "mt-8 p-6 bg-white shadow-xl rounded-xl text-center min-h-[200px] flex flex-col justify-center items-center" },
            React.createElement('svg', { xmlns: "http://www.w3.org/2000/svg", className: "h-12 w-12 text-blue-400 mb-4", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", strokeWidth: 1.5 },
              React.createElement('path', { strokeLinecap: "round", strokeLinejoin: "round", d: "M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" })
            ),
            React.createElement('p', { className: "text-slate-600 text-lg" }, t('resultsDisplay.enterSizePrompt')),
            React.createElement('p', { className: "text-sm text-slate-500 mt-2" }, t('resultsDisplay.selectTypePrompt'))
          )
        );
    }
    return (
      React.createElement('div', { className: "mt-8 p-6 bg-white shadow-xl rounded-xl text-center min-h-[200px] flex flex-col justify-center items-center" },
         React.createElement('svg', { xmlns: "http://www.w3.org/2000/svg", className: "h-12 w-12 text-orange-400 mb-4", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", strokeWidth: 1.5 },
          React.createElement('path', { strokeLinecap: "round", strokeLinejoin: "round", d: "M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75S7.845 2.456 12 3c2.428 0 4.643.89 6.402 2.404m.303 4.095L12.75 12l2.846 2.846m0 0l2.846-2.846M15.596 15.596l-2.846-2.846" })
        ),
        React.createElement('p', { className: "text-slate-700 text-lg font-medium" },
          t('resultsDisplay.noMatchFound', { inputValue: inputValue, inputType: inputTypeLabel })
        ),
        React.createElement('p', { className: "text-sm text-slate-500 mt-2" }, t('resultsDisplay.noMatchSuggestion'))
      )
    );
  }

  return (
    React.createElement('div', { className: "mt-8 p-6 bg-white shadow-2xl rounded-xl" },
      React.createElement('h2', { className: "text-2xl sm:text-3xl font-semibold text-slate-800 mb-6 text-center" },
        t('resultsDisplay.equivalentSizesTitle')
      ),
      React.createElement('div', { className: "space-y-3" },
        DisplayCategoryConfigs.map(({ key, labelKey }) => {
          const value = matchedSize[key];
          const displayValue = (typeof value === 'number' ? value.toFixed(2) : value) || '-';
          return (
            React.createElement('div', {
              key: key,
              className: "p-4 bg-slate-50 hover:bg-slate-100 transition-colors duration-150 rounded-lg shadow-sm flex justify-between items-center"
            },
              React.createElement('span', { className: "text-sm sm:text-base font-medium text-slate-700" }, t(labelKey), ":"),
              React.createElement('span', { className: "text-base sm:text-lg font-bold text-blue-600 tracking-wide" },
                displayValue
              )
            )
          );
        })
      ),
       React.createElement('div', { className: "mt-8 text-xs text-slate-500 text-center space-y-1" },
        React.createElement('p', null, t('resultsDisplay.disclaimerVariation')),
        React.createElement('p', null, t('resultsDisplay.disclaimerIso')),
        React.createElement('p', null, t('resultsDisplay.disclaimerNoEquivalent'))
      )
    )
  );
};

export default ResultsDisplay;