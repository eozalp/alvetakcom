
import React, { useState, useEffect, useCallback } from 'react';
import { InputType } from '../types.js';
import { findMatchingSize } from '../utils/conversion.js';
import ResultsDisplay from './ResultsDisplay.js';
import { t, getCurrentLocale } from '../i18n.js';

const CALIBRATION_REF_VERTICAL_MM = 85.6;  // Standard credit card long edge (width), now oriented vertically for calibration.
const CALIBRATION_HORIZONTAL_MM_FOR_ASPECT = 53.98; // Standard credit card short edge (height), now horizontal.
const LOCALSTORAGE_KEY_PIXELS_PER_MM = 'ringSizerCalibration_pixelsPerMm_v3'; // Incremented version for new orientation

// Initial sensible defaults for sliders (CSS pixel values) for matching the long edge (85.6mm) vertically
const INITIAL_CALIBRATION_RECT_PX_HEIGHT = 300; // Approx 85.6mm at ~90-100dpi
const MIN_CALIBRATION_RECT_PX_HEIGHT = 200;     // Min sensible height for 85.6mm
const MAX_CALIBRATION_RECT_PX_HEIGHT = 500;     // Max sensible height for 85.6mm

const MIN_RING_CIRCLE_PX_DIAMETER = 30; 
const MAX_RING_CIRCLE_PX_DIAMETER = 100; 
const INITIAL_RING_CIRCLE_PX_DIAMETER = 65;

const VisualSizer = () => {
  const [calibrationStatus, setCalibrationStatus] = useState('initial'); // 'initial', 'calibrating', 'calibrated'
  const [pixelsPerMm, setPixelsPerMm] = useState(null);
  
  const [calibrationRectPxHeight, setCalibrationRectPxHeight] = useState(INITIAL_CALIBRATION_RECT_PX_HEIGHT);
  const [ringCirclePxDiameter, setRingCirclePxDiameter] = useState(INITIAL_RING_CIRCLE_PX_DIAMETER);

  const [actualRingMmDiameter, setActualRingMmDiameter] = useState(0);
  const [actualRingMmCircumference, setActualRingMmCircumference] = useState(0);
  const [matchedRingSize, setMatchedRingSize] = useState(null);

  // Load calibration from localStorage on mount
  useEffect(() => {
    const storedPixelsPerMm = localStorage.getItem(LOCALSTORAGE_KEY_PIXELS_PER_MM);
    if (storedPixelsPerMm) {
      const parsedValue = parseFloat(storedPixelsPerMm);
      if (!isNaN(parsedValue) && parsedValue > 0) {
        setPixelsPerMm(parsedValue);
        setCalibrationStatus('calibrated');
      } else {
        localStorage.removeItem(LOCALSTORAGE_KEY_PIXELS_PER_MM); // Remove invalid entry
        setCalibrationStatus('initial'); 
      }
    } else {
      setCalibrationStatus('initial');
    }
  }, []);

  // Effect for when pixelsPerMm is set (after calibration) or ringCirclePxDiameter changes
  useEffect(() => {
    if (calibrationStatus === 'calibrated' && pixelsPerMm && pixelsPerMm > 0) {
      const currentMmDiameter = ringCirclePxDiameter / pixelsPerMm;
      setActualRingMmDiameter(currentMmDiameter);
      setActualRingMmCircumference(currentMmDiameter * Math.PI);
      const newMatchedSize = findMatchingSize(InputType.DIAMETER_MM, currentMmDiameter);
      setMatchedRingSize(newMatchedSize);
    } else {
      // Reset if not calibrated
      setActualRingMmDiameter(0);
      setActualRingMmCircumference(0);
      setMatchedRingSize(null);
    }
  }, [ringCirclePxDiameter, pixelsPerMm, calibrationStatus]);


  const handleStartCalibration = () => {
    setCalibrationStatus('calibrating');
  };

  const handleCalibrationSliderChange = (event) => {
    setCalibrationRectPxHeight(Number(event.target.value));
  };

  const handleSaveCalibration = () => {
    if (calibrationRectPxHeight > 0) {
      const calculatedPixelsPerMm = calibrationRectPxHeight / CALIBRATION_REF_VERTICAL_MM;
      setPixelsPerMm(calculatedPixelsPerMm);
      localStorage.setItem(LOCALSTORAGE_KEY_PIXELS_PER_MM, calculatedPixelsPerMm.toString());
      setCalibrationStatus('calibrated');
      // Reset ring sizer to initial diameter after new calibration
      setRingCirclePxDiameter(INITIAL_RING_CIRCLE_PX_DIAMETER);
    }
  };

  const handleRecalibrate = () => {
    setCalibrationStatus('calibrating');
     // Reset to initial slider positions for a fresh calibration
    setCalibrationRectPxHeight(INITIAL_CALIBRATION_RECT_PX_HEIGHT);
  };
  
  const handleRingSliderChange = (event) => {
    setRingCirclePxDiameter(Number(event.target.value));
  };

  const calibrationRectStyle = {
    height: `${calibrationRectPxHeight}px`,
    width: `${calibrationRectPxHeight * (CALIBRATION_HORIZONTAL_MM_FOR_ASPECT / CALIBRATION_REF_VERTICAL_MM)}px`, // Rectangle is taller than wide
    backgroundColor: 'rgba(239, 68, 68, 0.6)', // Tailwind red-500 with opacity
    border: '2px dashed #DC2626', // Tailwind red-600
    margin: '20px auto',
    transition: 'width 0.1s ease-out, height 0.1s ease-out',
    boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
  };

  const ringCircleStyle = {
    width: `${ringCirclePxDiameter}px`,
    height: `${ringCirclePxDiameter}px`,
    border: '3px solid #3B82F6', 
    borderRadius: '50%',
    margin: '20px auto',
    boxSizing: 'content-box',
    transition: 'width 0.1s ease-out, height 0.1s ease-out',
    boxShadow: '0 0 15px rgba(59, 130, 246, 0.4)', 
  };

  if (calibrationStatus === 'initial') {
    return (
      React.createElement('div', { className: "p-4 sm:p-6 bg-white/80 backdrop-blur-md rounded-xl shadow-lg text-center animate-fadeIn" },
        React.createElement('h3', { className: "text-lg sm:text-xl font-semibold text-rose-700 mb-3" }, t('visualSizer.calibration.initialTitle')),
        React.createElement('p', { className: "text-sm sm:text-base text-rose-600 mb-6" }, t('visualSizer.calibration.initialDesc')),
        React.createElement('button', {
          onClick: handleStartCalibration,
          className: "px-6 py-3 bg-rose-500 hover:bg-rose-600 text-white font-semibold rounded-lg shadow-md transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-rose-400 focus:ring-offset-2"
        }, t('visualSizer.calibration.startCalibrationButton'))
      )
    );
  }

  if (calibrationStatus === 'calibrating') {
    // Estimate current mm height based on an uncalibrated assumption or last calibration for display purposes
    const tempApproxPixelsPerMm = pixelsPerMm || (INITIAL_CALIBRATION_RECT_PX_HEIGHT / CALIBRATION_REF_VERTICAL_MM);
    const estimatedRectMmHeight = calibrationRectPxHeight / tempApproxPixelsPerMm;

    return (
      React.createElement('div', { className: "p-4 sm:p-6 bg-white/80 backdrop-blur-md rounded-xl shadow-lg animate-fadeIn" },
        React.createElement('h3', { className: "text-lg sm:text-xl font-semibold text-rose-700 mb-2 text-center" }, t('visualSizer.calibration.calibratingTitle')),
        React.createElement('p', { className: "text-xs sm:text-sm text-rose-600 mb-1 text-center px-1", dangerouslySetInnerHTML: { __html: t('visualSizer.calibration.calibratingDesc1LongEdgeVertical') } }),
        React.createElement('p', { className: "text-xs sm:text-sm text-rose-600 mb-4 text-center px-1 font-medium", dangerouslySetInnerHTML: { __html: t('visualSizer.calibration.calibratingDesc2LongEdgeVertical', { value: CALIBRATION_REF_VERTICAL_MM }) } }),
        
        React.createElement('div', {
          className: "w-full h-auto flex justify-center items-center my-4 sm:my-6 overflow-hidden",
          style: { minHeight: `${MAX_CALIBRATION_RECT_PX_HEIGHT + 40}px` } 
        },
          React.createElement('div', { style: calibrationRectStyle, "aria-hidden": "true" })
        ),

        React.createElement('div', { className: "mb-6" },
          React.createElement('label', { htmlFor: "calibrationSlider", className: "block text-sm font-medium text-slate-700 mb-2 sr-only" }, t('visualSizer.calibration.sliderLabelVertical')), // Re-use label, meaning is "adjust vertical dimension"
          React.createElement('input', {
            type: "range",
            id: "calibrationSlider",
            min: MIN_CALIBRATION_RECT_PX_HEIGHT,
            max: MAX_CALIBRATION_RECT_PX_HEIGHT,
            value: calibrationRectPxHeight,
            onChange: handleCalibrationSliderChange,
            className: "w-full h-3 bg-slate-200 rounded-lg appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-rose-500 focus:ring-offset-2",
            "aria-label": t('visualSizer.calibration.sliderLabelVertical')
          })
        ),
        React.createElement('p', {className: "text-center text-xs text-slate-500 mb-4", "aria-live":"polite"}, 
          t('visualSizer.calibration.currentHeight') + ` ${estimatedRectMmHeight.toFixed(1)} mm` + 
          ` (${t('visualSizer.calibration.targetHeight')} ${CALIBRATION_REF_VERTICAL_MM} mm)`
        ),
        React.createElement('button', {
          onClick: handleSaveCalibration,
          className: "w-full px-6 py-3 bg-rose-500 hover:bg-rose-600 text-white font-semibold rounded-lg shadow-md transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-rose-400 focus:ring-offset-2"
        }, t('visualSizer.calibration.saveButton'))
      )
    );
  }

  // calibrationStatus === 'calibrated'
  return (
    React.createElement('div', { className: "animate-fadeIn" }, 
      React.createElement('div', { className: "text-center mb-4 p-3 bg-rose-50 border border-rose-200 rounded-lg" },
        React.createElement('p', { className: "text-xs sm:text-sm text-rose-700", dangerouslySetInnerHTML: { __html: t('visualSizer.instructionHighlightCalibrated') } })
      ),
      React.createElement('div', {
        className: "w-full h-auto flex justify-center items-center my-4 sm:my-6",
        style: { minHeight: `${MAX_RING_CIRCLE_PX_DIAMETER + 40}px`},
        "aria-hidden": "true"
      },
        React.createElement('div', { style: ringCircleStyle })
      ),
      React.createElement('div', { className: "mb-4 sm:mb-6" },
        React.createElement('label', { htmlFor: "visualSizerSlider", className: "block text-sm font-semibold text-slate-700 mb-2 sr-only" },
          t('visualSizer.sliderLabel')
        ),
        React.createElement('input', {
          type: "range",
          id: "visualSizerSlider",
          min: MIN_RING_CIRCLE_PX_DIAMETER,
          max: MAX_RING_CIRCLE_PX_DIAMETER,
          value: ringCirclePxDiameter,
          onChange: handleRingSliderChange,
          className: "w-full h-3 bg-slate-200 rounded-lg appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-rose-500 focus:ring-offset-2",
          "aria-label": t('visualSizer.sliderLabel'),
          "aria-valuemin": MIN_RING_CIRCLE_PX_DIAMETER,
          "aria-valuemax": MAX_RING_CIRCLE_PX_DIAMETER,
          "aria-valuenow": ringCirclePxDiameter,
          "aria-describedby": "current-dimensions-info"
        })
      ),
      React.createElement('div', { id: "current-dimensions-info", className: "mb-4 sm:mb-6 text-center space-y-1", "aria-live": "polite" },
        React.createElement('p', { className: "text-sm sm:text-base text-slate-700" },
          t('visualSizer.diameterLabel'), ": ", React.createElement('strong', { className: "text-rose-600 font-semibold" }, actualRingMmDiameter.toFixed(2), " mm")
        ),
        React.createElement('p', { className: "text-sm sm:text-base text-slate-700" },
          t('visualSizer.circumferenceLabel'), ": ", React.createElement('strong', { className: "text-rose-600 font-semibold" }, actualRingMmCircumference.toFixed(2), " mm")
        )
      ),
       React.createElement(ResultsDisplay, {
        matchedSize: matchedRingSize,
        inputValue: actualRingMmDiameter > 0 ? t('visualSizer.calculatedInputValueCalibrated', { value: actualRingMmDiameter.toFixed(2) }) : "N/A",
        inputTypeLabel: t('visualSizer.inputTypeLabelCalibrated') 
      }),
      React.createElement('div', { className: "mt-6 text-center" },
        React.createElement('button', {
          onClick: handleRecalibrate,
          className: "px-5 py-2 bg-slate-200 hover:bg-slate-300 text-slate-700 text-xs font-medium rounded-md transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2"
        }, t('visualSizer.calibration.recalibrateButton'))
      ),
      React.createElement('div', { className: "mt-6 text-xs text-slate-500 bg-amber-50 p-3 rounded-md border border-amber-200" },
        React.createElement('p', { className: "font-semibold text-amber-700" }, t('visualSizer.accuracyDisclaimerTitleCalibrated')),
        React.createElement('p', { className: "text-amber-600" },
          t('visualSizer.accuracyDisclaimerContentCalibrated')
        )
      )
    )
  );
};

export default VisualSizer;
