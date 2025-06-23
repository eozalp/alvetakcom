
import React, { useState, useEffect } from 'react';
import { InputType } from '../types.js';
import { findMatchingSize } from '../utils/conversion.js';
import ResultsDisplay from './ResultsDisplay.js';
import CornerLoupe from './CornerLoupe.js'; // Import the new component
import { t, getCurrentLocale } from '../i18n.js';

const CALIBRATION_REF_VERTICAL_MM = 85.6;
const CALIBRATION_HORIZONTAL_MM_FOR_ASPECT = 53.98;
const LOCALSTORAGE_KEY_CALIBRATION_DATA = 'alvetakRingSizer_calibrationData_v4';

const INITIAL_CALIBRATION_RECT_PX_HEIGHT = 300;
const MIN_CALIBRATION_RECT_PX_HEIGHT = 150;
const MAX_CALIBRATION_RECT_PX_HEIGHT = 600;

const MIN_RING_CIRCLE_PX_DIAMETER = 30;
const MAX_RING_CIRCLE_PX_DIAMETER = 100;
const INITIAL_RING_CIRCLE_PX_DIAMETER = 65;

const MIN_EFFECTIVE_PPI = 70;
const MAX_EFFECTIVE_PPI = 500;

const CROSSHAIR_EXTENSION_PX = 15;
const L_GUIDE_ARM_LENGTH_PX = 10;
const L_GUIDE_ARM_THICKNESS_PX = 1.5;
const L_GUIDE_ARM_COLOR = '#374151'; 
const CALIBRATION_RECT_BORDER_COLOR = '#B91C1C';
const CALIBRATION_RECT_BG_COLOR = 'rgba(239, 68, 68, 0.5)';
const CROSSHAIR_COLOR = 'rgba(185, 28, 28, 0.7)';

const LOUPE_SIZE_PX = 100; 
const LOUPE_ZOOM_FACTOR = 2.5; 


const VisualSizer = () => {
  const [calibrationStatus, setCalibrationStatus] = useState('initial');
  const [pixelsPerMm, setPixelsPerMm] = useState(null);
  
  const [calibrationRectPxHeight, setCalibrationRectPxHeight] = useState(INITIAL_CALIBRATION_RECT_PX_HEIGHT);
  const [ringCirclePxDiameter, setRingCirclePxDiameter] = useState(INITIAL_RING_CIRCLE_PX_DIAMETER);

  const [actualRingMmDiameter, setActualRingMmDiameter] = useState(0);
  const [actualRingMmCircumference, setActualRingMmCircumference] = useState(0);
  const [matchedRingSize, setMatchedRingSize] = useState(null);
  
  const [visualSizerTabLabel, setVisualSizerTabLabel] = useState(t('visualSizer.inputTypeLabel'));
  const [calibrationWarning, setCalibrationWarning] = useState(null);
  const [recalibrationPrompt, setRecalibrationPrompt] = useState(null);


   useEffect(() => {
    if (calibrationStatus === 'calibrated') {
        setVisualSizerTabLabel(t('visualSizer.inputTypeLabelCalibrated'));
    } else {
        setVisualSizerTabLabel(t('visualSizer.inputTypeLabel'));
    }
  }, [getCurrentLocale(), calibrationStatus]);


  useEffect(() => {
    const rawData = localStorage.getItem(LOCALSTORAGE_KEY_CALIBRATION_DATA);
    if (rawData) {
      try {
        const data = JSON.parse(rawData);
        if (data && typeof data.storedPixelsPerMm === 'number' && typeof data.devicePixelRatioAtCalibration === 'number') {
          if (data.devicePixelRatioAtCalibration !== window.devicePixelRatio) {
            setPixelsPerMm(null);
            setCalibrationStatus('initial');
            setRecalibrationPrompt(t('visualSizer.calibration.dprMismatchPrompt'));
            localStorage.removeItem(LOCALSTORAGE_KEY_CALIBRATION_DATA); 
          } else {
            setPixelsPerMm(data.storedPixelsPerMm);
            setCalibrationStatus('calibrated');
            setRecalibrationPrompt(null);
          }
          return;
        }
      } catch (error) {
        console.error("Failed to parse calibration data:", error);
        localStorage.removeItem(LOCALSTORAGE_KEY_CALIBRATION_DATA);
      }
    }
    setPixelsPerMm(null);
    setCalibrationStatus('initial');
    setRecalibrationPrompt(null);
  }, []);

  useEffect(() => {
    if (calibrationStatus === 'calibrated' && pixelsPerMm && pixelsPerMm > 0) {
      const currentMmDiameter = ringCirclePxDiameter / pixelsPerMm;
      setActualRingMmDiameter(currentMmDiameter);
      setActualRingMmCircumference(currentMmDiameter * Math.PI);
      const newMatchedSize = findMatchingSize(InputType.DIAMETER_MM, currentMmDiameter);
      setMatchedRingSize(newMatchedSize);
    } else {
      setActualRingMmDiameter(0);
      setActualRingMmCircumference(0);
      setMatchedRingSize(null);
    }
  }, [ringCirclePxDiameter, pixelsPerMm, calibrationStatus]);


  const handleStartCalibration = () => {
    setCalibrationStatus('calibrating');
    setCalibrationWarning(null); 
  };

  const handleCalibrationSliderChange = (event) => {
    setCalibrationRectPxHeight(Number(event.target.value));
  };

  const handleSaveCalibration = () => {
    if (calibrationRectPxHeight > 0) {
      const calculatedPpm = calibrationRectPxHeight / CALIBRATION_REF_VERTICAL_MM;
      const currentDpr = window.devicePixelRatio || 1; 
      const effectivePpi = Math.round(calculatedPpm * currentDpr * 25.4); 

      if (effectivePpi < MIN_EFFECTIVE_PPI || effectivePpi > MAX_EFFECTIVE_PPI) {
        setCalibrationWarning(t('visualSizer.calibration.ppiWarning', { ppi: effectivePpi, min: MIN_EFFECTIVE_PPI, max: MAX_EFFECTIVE_PPI }));
      } else {
        setCalibrationWarning(null);
      }

      setPixelsPerMm(calculatedPpm);
      const dataToStore = {
        storedPixelsPerMm: calculatedPpm,
        devicePixelRatioAtCalibration: currentDpr,
      };
      localStorage.setItem(LOCALSTORAGE_KEY_CALIBRATION_DATA, JSON.stringify(dataToStore));
      setCalibrationStatus('calibrated');
      setRingCirclePxDiameter(INITIAL_RING_CIRCLE_PX_DIAMETER); 
      setRecalibrationPrompt(null); 
    }
  };
  
  const handleRecalibrate = () => {
    setCalibrationStatus('calibrating');
    setCalibrationRectPxHeight(INITIAL_CALIBRATION_RECT_PX_HEIGHT);
    setPixelsPerMm(null); 
    setCalibrationWarning(null); 
    setRecalibrationPrompt(null); 
    localStorage.removeItem(LOCALSTORAGE_KEY_CALIBRATION_DATA); 
  };
  
  const handleRingSliderChange = (event) => {
    setRingCirclePxDiameter(Number(event.target.value));
  };

  const calibrationRectCurrentWidth = calibrationRectPxHeight * (CALIBRATION_HORIZONTAL_MM_FOR_ASPECT / CALIBRATION_REF_VERTICAL_MM);

  const calibrationRectStyle = {
    height: `${calibrationRectPxHeight}px`,
    width: `${calibrationRectCurrentWidth}px`,
    backgroundColor: CALIBRATION_RECT_BG_COLOR, 
    border: `2px dashed ${CALIBRATION_RECT_BORDER_COLOR}`, 
    transition: 'width 0.1s ease-out, height 0.1s ease-out',
    boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
    position: 'relative', 
  };

  const extendedCrosshairLineBaseStyle = {
    position: 'absolute',
    backgroundColor: CROSSHAIR_COLOR,
    pointerEvents: 'none',
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
        recalibrationPrompt && (
          React.createElement('p', { className: "text-sm text-orange-600 bg-orange-50 border border-orange-200 p-3 rounded-md mb-4" }, recalibrationPrompt)
        ),
        React.createElement('p', { className: "text-sm sm:text-base text-rose-600 mb-6 px-2" }, t('visualSizer.calibration.initialDesc')),
        React.createElement('button', {
          onClick: handleStartCalibration,
          className: "px-6 py-3 bg-rose-500 hover:bg-rose-600 text-white font-semibold rounded-lg shadow-md transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-rose-400 focus:ring-offset-2",
          "aria-label": t('visualSizer.calibration.startCalibrationButton')
        }, t('visualSizer.calibration.startCalibrationButton'))
      )
    );
  }

  if (calibrationStatus === 'calibrating') {
    const tempPpmForDisplay = pixelsPerMm || (INITIAL_CALIBRATION_RECT_PX_HEIGHT / CALIBRATION_REF_VERTICAL_MM); 
    const estimatedRectMmHeight = calibrationRectPxHeight / (tempPpmForDisplay || 1);

    const loupeProps = {
      calibrationRectPxHeight,
      calibrationRectCurrentWidth,
      loupeSizePx: LOUPE_SIZE_PX,
      loupeZoomFactor: LOUPE_ZOOM_FACTOR,
      crosshairExtensionPx: CROSSHAIR_EXTENSION_PX,
      lGuideArmLengthPx: L_GUIDE_ARM_LENGTH_PX,
      lGuideArmThicknessPx: L_GUIDE_ARM_THICKNESS_PX,
      lGuideArmColor: L_GUIDE_ARM_COLOR,
      calibrationRectBorderColor: CALIBRATION_RECT_BORDER_COLOR,
      crosshairColor: CROSSHAIR_COLOR,
      calibrationRectBgColor: CALIBRATION_RECT_BG_COLOR,
    };
    
    return (
      React.createElement('div', { className: "p-4 sm:p-6 bg-white/80 backdrop-blur-md rounded-xl shadow-lg animate-fadeIn" },
        React.createElement('h3', { className: "text-lg sm:text-xl font-semibold text-rose-700 mb-2 text-center" }, t('visualSizer.calibration.calibratingTitle')),
        recalibrationPrompt && (
            React.createElement('p', { className: "text-sm text-orange-600 bg-orange-50 border border-orange-200 p-3 rounded-md mb-3 text-center"}, recalibrationPrompt)
        ),
        React.createElement('p', { className: "text-xs sm:text-sm text-rose-600 mb-1 text-center px-1", dangerouslySetInnerHTML: { __html: t('visualSizer.calibration.calibratingDesc1VerticalBottomAlign') } }),
        React.createElement('p', { className: "text-xs sm:text-sm text-rose-600 mb-4 text-center px-1 font-medium", dangerouslySetInnerHTML: { __html: t('visualSizer.calibration.calibratingDesc2VerticalBottomAlign', { value: CALIBRATION_REF_VERTICAL_MM }) } }),
        
        React.createElement('div', { className: "flex justify-around items-start mb-3 sm:mb-4 px-2", style: { minHeight: `${LOUPE_SIZE_PX + 30}px`} },
            React.createElement(CornerLoupe, { cornerType: "top-left", ...loupeProps }),
            React.createElement(CornerLoupe, { cornerType: "top-right", ...loupeProps })
        ),

        React.createElement('div', {
          className: "w-full flex flex-col justify-end items-center my-2 sm:my-4 overflow-visible",
          style: { minHeight: `${MAX_CALIBRATION_RECT_PX_HEIGHT + 40 + (CROSSHAIR_EXTENSION_PX * 2)}px` },
          "aria-label": t('visualSizer.calibration.areaLabel'),
          role: "img"
        },
          React.createElement('div', { style: {...calibrationRectStyle, position: 'relative'}, 
               "aria-description": t('visualSizer.calibration.rectDescription', {height: calibrationRectPxHeight, width: Math.round(calibrationRectCurrentWidth)})},
            React.createElement('div', { style: {
                ...extendedCrosshairLineBaseStyle, 
                left: `-${CROSSHAIR_EXTENSION_PX}px`, 
                right: `-${CROSSHAIR_EXTENSION_PX}px`, 
                top: '50%', 
                height: '1px', 
                transform: 'translateY(-50%)' 
            } }),
            React.createElement('div', { style: {
                ...extendedCrosshairLineBaseStyle, 
                top: `-${CROSSHAIR_EXTENSION_PX}px`, 
                bottom: `-${CROSSHAIR_EXTENSION_PX}px`, 
                left: '50%', 
                width: '1px', 
                transform: 'translateX(-50%)' 
            } }),

            React.createElement('div', { style: { position: 'absolute', top: `-${L_GUIDE_ARM_THICKNESS_PX / 2}px`, left: `-${L_GUIDE_ARM_LENGTH_PX}px`, width: `${L_GUIDE_ARM_LENGTH_PX}px`, height: `${L_GUIDE_ARM_THICKNESS_PX}px`, backgroundColor: L_GUIDE_ARM_COLOR }, "aria-hidden": "true" }),
            React.createElement('div', { style: { position: 'absolute', top: `-${L_GUIDE_ARM_LENGTH_PX}px`, left: `-${L_GUIDE_ARM_THICKNESS_PX / 2}px`, width: `${L_GUIDE_ARM_THICKNESS_PX}px`, height: `${L_GUIDE_ARM_LENGTH_PX}px`, backgroundColor: L_GUIDE_ARM_COLOR }, "aria-hidden": "true" }),

            React.createElement('div', { style: { position: 'absolute', top: `-${L_GUIDE_ARM_THICKNESS_PX / 2}px`, right: `-${L_GUIDE_ARM_LENGTH_PX}px`, width: `${L_GUIDE_ARM_LENGTH_PX}px`, height: `${L_GUIDE_ARM_THICKNESS_PX}px`, backgroundColor: L_GUIDE_ARM_COLOR }, "aria-hidden": "true" }),
            React.createElement('div', { style: { position: 'absolute', top: `-${L_GUIDE_ARM_LENGTH_PX}px`, right: `-${L_GUIDE_ARM_THICKNESS_PX / 2}px`, width: `${L_GUIDE_ARM_THICKNESS_PX}px`, height: `${L_GUIDE_ARM_LENGTH_PX}px`, backgroundColor: L_GUIDE_ARM_COLOR }, "aria-hidden": "true" }),

            React.createElement('div', { style: { position: 'absolute', bottom: `-${L_GUIDE_ARM_THICKNESS_PX / 2}px`, left: `-${L_GUIDE_ARM_LENGTH_PX}px`, width: `${L_GUIDE_ARM_LENGTH_PX}px`, height: `${L_GUIDE_ARM_THICKNESS_PX}px`, backgroundColor: L_GUIDE_ARM_COLOR }, "aria-hidden": "true" }),
            React.createElement('div', { style: { position: 'absolute', bottom: `-${L_GUIDE_ARM_LENGTH_PX}px`, left: `-${L_GUIDE_ARM_THICKNESS_PX / 2}px`, width: `${L_GUIDE_ARM_THICKNESS_PX}px`, height: `${L_GUIDE_ARM_LENGTH_PX}px`, backgroundColor: L_GUIDE_ARM_COLOR }, "aria-hidden": "true" }),
            
            React.createElement('div', { style: { position: 'absolute', bottom: `-${L_GUIDE_ARM_THICKNESS_PX / 2}px`, right: `-${L_GUIDE_ARM_LENGTH_PX}px`, width: `${L_GUIDE_ARM_LENGTH_PX}px`, height: `${L_GUIDE_ARM_THICKNESS_PX}px`, backgroundColor: L_GUIDE_ARM_COLOR }, "aria-hidden": "true" }),
            React.createElement('div', { style: { position: 'absolute', bottom: `-${L_GUIDE_ARM_LENGTH_PX}px`, right: `-${L_GUIDE_ARM_THICKNESS_PX / 2}px`, width: `${L_GUIDE_ARM_THICKNESS_PX}px`, height: `${L_GUIDE_ARM_LENGTH_PX}px`, backgroundColor: L_GUIDE_ARM_COLOR }, "aria-hidden": "true" })
          )
        ),

        React.createElement('div', { className: "mb-6" },
          React.createElement('label', { htmlFor: "calibrationSlider", className: "block text-sm font-medium text-slate-700 mb-2 sr-only" }, t('visualSizer.calibration.sliderLabelVertical')),
          React.createElement('input', {
            type: "range",
            id: "calibrationSlider",
            min: MIN_CALIBRATION_RECT_PX_HEIGHT,
            max: MAX_CALIBRATION_RECT_PX_HEIGHT,
            value: calibrationRectPxHeight,
            onChange: handleCalibrationSliderChange,
            className: "w-full h-3 bg-slate-200 rounded-lg appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-rose-500 focus:ring-offset-2",
            "aria-label": t('visualSizer.calibration.sliderLabelVertical'),
            "aria-valuemin": MIN_CALIBRATION_RECT_PX_HEIGHT,
            "aria-valuemax": MAX_CALIBRATION_RECT_PX_HEIGHT,
            "aria-valuenow": calibrationRectPxHeight
          })
        ),
         React.createElement('p', {className: "text-center text-xs text-slate-500 mb-4", "aria-live":"polite"}, 
          t('visualSizer.calibration.currentHeight') + " ", React.createElement('strong', null, estimatedRectMmHeight.toFixed(1) + " mm"),
          React.createElement('br', {className: "sm:hidden"}),
          React.createElement('span', {className: "hidden sm:inline"}, " (" + t('visualSizer.calibration.targetHeight') + " " + CALIBRATION_REF_VERTICAL_MM + " mm)"),
          React.createElement('span', {className: "sm:hidden block mt-1"}, "(" + t('visualSizer.calibration.targetHeight') + " " + CALIBRATION_REF_VERTICAL_MM + " mm)")
        ),
        React.createElement('button', {
          onClick: handleSaveCalibration,
          className: "w-full px-6 py-3 bg-rose-500 hover:bg-rose-600 text-white font-semibold rounded-lg shadow-md transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-rose-400 focus:ring-offset-2",
          "aria-label": t('visualSizer.calibration.saveButton')
        }, t('visualSizer.calibration.saveButton')),
        calibrationWarning && (
           React.createElement('div', { className: "mt-3 text-xs text-orange-700 bg-orange-50 border border-orange-200 p-2.5 rounded-md text-left",
             dangerouslySetInnerHTML: { __html: calibrationWarning } 
           })
        )
      )
    );
  }

  return (
    React.createElement('div', { className: "animate-fadeIn" }, 
      React.createElement('div', { className: "text-center mb-4 p-3 bg-rose-50 border border-rose-200 rounded-lg" },
        React.createElement('p', { className: "text-xs sm:text-sm text-rose-700", dangerouslySetInnerHTML: { __html: t('visualSizer.instructionHighlightCalibrated') } })
      ),
      React.createElement('div', {
        className: "w-full h-auto flex justify-center items-center my-4 sm:my-6",
        style: { minHeight: `${MAX_RING_CIRCLE_PX_DIAMETER + 40}px`},
        "aria-label": t('visualSizer.ringAreaLabel'),
        role: "img"
      },
        React.createElement('div', { style: ringCircleStyle, "aria-description": t('visualSizer.ringDescription', { diameter: ringCirclePxDiameter })})
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
        inputTypeLabel: visualSizerTabLabel
      }),
      React.createElement('div', { className: "mt-6 text-center" },
        React.createElement('button', {
          onClick: handleRecalibrate,
          className: "px-5 py-2 bg-slate-200 hover:bg-slate-300 text-slate-700 text-xs font-medium rounded-md transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2",
          "aria-label": t('visualSizer.calibration.recalibrateButton')
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
