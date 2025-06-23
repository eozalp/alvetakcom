import React, { useState, useEffect } from 'react';
import { InputType } from '../types.js';
import { findMatchingSize } from '../utils/conversion.js';
import ResultsDisplay from './ResultsDisplay.js';
import { t, getCurrentLocale } from '../i18n.js'; // Import t and getCurrentLocale

const ASSUMED_PPI = 96; // Pixels Per Inch
const MM_PER_INCH = 25.4;

const MIN_PIXEL_DIAMETER = 40; 
const MAX_PIXEL_DIAMETER = 120; 
const INITIAL_PIXEL_DIAMETER = 70;

const VisualSizer = () => {
  const [pixelDiameter, setPixelDiameter] = useState(INITIAL_PIXEL_DIAMETER);
  const [mmDiameter, setMmDiameter] = useState(0);
  const [mmCircumference, setMmCircumference] = useState(0);
  const [matchedRingSize, setMatchedRingSize] = useState(null);
  
  // This state is to ensure ResultsDisplay gets a translated inputTypeLabel
  const [visualSizerLabel, setVisualSizerLabel] = useState(t('visualSizer.inputTypeLabel'));

  useEffect(() => {
    // Update label if language changes
    setVisualSizerLabel(t('visualSizer.inputTypeLabel'));
  }, [getCurrentLocale()]); // Re-run if locale changes

  useEffect(() => {
    const currentMmDiameter = (pixelDiameter / ASSUMED_PPI) * MM_PER_INCH;
    const currentMmCircumference = currentMmDiameter * Math.PI;

    setMmDiameter(currentMmDiameter);
    setMmCircumference(currentMmCircumference);

    const newMatchedSize = findMatchingSize(InputType.DIAMETER_MM, currentMmDiameter);
    setMatchedRingSize(newMatchedSize);
  }, [pixelDiameter]);

  const handleSliderChange = (event) => {
    setPixelDiameter(Number(event.target.value));
  };

  const circleStyle = {
    width: `${pixelDiameter}px`,
    height: `${pixelDiameter}px`,
    border: '2px solid #3B82F6', 
    borderRadius: '50%',
    margin: '20px auto',
    boxSizing: 'content-box', 
    transition: 'width 0.1s ease-out, height 0.1s ease-out',
  };

  return (
    React.createElement('div', null, 
      React.createElement('div', { className: "text-center mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg" },
        React.createElement('p', { className: "text-xs sm:text-sm text-blue-700", dangerouslySetInnerHTML: { __html: t('visualSizer.instructionHighlight') } })
      ),
      React.createElement('div', {
        className: "w-full h-auto flex justify-center items-center my-4 sm:my-6",
        style: { minHeight: `${MAX_PIXEL_DIAMETER + 40}px` },
        "aria-hidden": "true"
      },
        React.createElement('div', { style: circleStyle })
      ),
      React.createElement('div', { className: "mb-4 sm:mb-6" },
        React.createElement('label', { htmlFor: "visualSizerSlider", className: "block text-sm font-semibold text-slate-700 mb-2 sr-only" },
          t('visualSizer.sliderLabel')
        ),
        React.createElement('input', {
          type: "range",
          id: "visualSizerSlider",
          min: MIN_PIXEL_DIAMETER,
          max: MAX_PIXEL_DIAMETER,
          value: pixelDiameter,
          onChange: handleSliderChange,
          className: "w-full h-3 bg-slate-200 rounded-lg appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2",
          "aria-label": t('visualSizer.sliderLabel'),
          "aria-valuemin": MIN_PIXEL_DIAMETER,
          "aria-valuemax": MAX_PIXEL_DIAMETER,
          "aria-valuenow": pixelDiameter,
          "aria-describedby": "current-dimensions-info"
        })
      ),
      React.createElement('div', { id: "current-dimensions-info", className: "mb-4 sm:mb-6 text-center space-y-1", "aria-live": "polite" },
        React.createElement('p', { className: "text-sm sm:text-base text-slate-700" },
          t('visualSizer.diameterLabel'), ": ", React.createElement('strong', { className: "text-blue-600 font-semibold" }, mmDiameter.toFixed(2), " mm")
        ),
        React.createElement('p', { className: "text-sm sm:text-base text-slate-700" },
          t('visualSizer.circumferenceLabel'), ": ", React.createElement('strong', { className: "text-blue-600 font-semibold" }, mmCircumference.toFixed(2), " mm")
        )
      ),
      React.createElement(ResultsDisplay, {
        matchedSize: matchedRingSize,
        inputValue: mmDiameter > 0 ? t('visualSizer.calculatedInputValue', { value: mmDiameter.toFixed(2) }) : "N/A",
        inputTypeLabel: visualSizerLabel
      }),
      React.createElement('div', { className: "mt-6 text-xs text-slate-500 bg-amber-50 p-3 rounded-md border border-amber-200" },
        React.createElement('p', { className: "font-semibold text-amber-700" }, t('visualSizer.accuracyDisclaimerTitle')),
        React.createElement('p', { className: "text-amber-600" },
          t('visualSizer.accuracyDisclaimerContent')
        )
      )
    )
  );
};

export default VisualSizer;