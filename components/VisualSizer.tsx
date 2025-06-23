
import React, { useState, useEffect, useCallback } from 'react';
import { RingSizeEntry, InputType } from '../types';
import { findMatchingSize } from '../utils/conversion';
import ResultsDisplay from './ResultsDisplay';
import { t, getCurrentLocale } from '../i18n';

const CREDIT_CARD_WIDTH_MM = 85.6; // Standard credit card width
const CREDIT_CARD_ASPECT_RATIO = 85.6 / 53.98;
const LOCALSTORAGE_KEY_PIXELS_PER_MM = 'alvetakRingSizer_pixelsPerMm_v1';

// Initial sensible defaults for sliders (CSS pixel values)
const INITIAL_CALIBRATION_RECT_PX_WIDTH = 280; // Approx 85mm at ~96dpi
const MIN_CALIBRATION_RECT_PX_WIDTH = 150; // Min sensible width for calibration object
const MAX_CALIBRATION_RECT_PX_WIDTH = 450; // Max sensible width

const MIN_RING_CIRCLE_PX_DIAMETER = 30; // Approx 10mm
const MAX_RING_CIRCLE_PX_DIAMETER = 100; // Approx 30mm+ for larger sizes
const INITIAL_RING_CIRCLE_PX_DIAMETER = 65; // Approx 20mm at ~96dpi (a common ring size)

type CalibrationStatus = 'initial' | 'calibrating' | 'calibrated';

const VisualSizer: React.FC = () => {
  const [calibrationStatus, setCalibrationStatus] = useState<CalibrationStatus>('initial');
  const [pixelsPerMm, setPixelsPerMm] = useState<number | null>(null);
  
  const [calibrationRectPxWidth, setCalibrationRectPxWidth] = useState<number>(INITIAL_CALIBRATION_RECT_PX_WIDTH);
  const [ringCirclePxDiameter, setRingCirclePxDiameter] = useState<number>(INITIAL_RING_CIRCLE_PX_DIAMETER);

  const [actualRingMmDiameter, setActualRingMmDiameter] = useState<number>(0);
  const [actualRingMmCircumference, setActualRingMmCircumference] = useState<number>(0);
  const [matchedRingSize, setMatchedRingSize] = useState<RingSizeEntry | null>(null);
  
  const [visualSizerTabLabel, setVisualSizerTabLabel] = useState(t('visualSizer.inputTypeLabel'));

   useEffect(() => {
    // Update label if language changes, reflecting calibration status implicitly if needed
    if (calibrationStatus === 'calibrated') {
        setVisualSizerTabLabel(t('visualSizer.inputTypeLabelCalibrated'));
    } else {
        setVisualSizerTabLabel(t('visualSizer.inputTypeLabel'));
    }
  }, [getCurrentLocale(), calibrationStatus]);


  // Load calibration from localStorage on mount
  useEffect(() => {
    const storedPixelsPerMm = localStorage.getItem(LOCALSTORAGE_KEY_PIXELS_PER_MM);
    if (storedPixelsPerMm) {
      const parsedValue = parseFloat(storedPixelsPerMm);
      if (!isNaN(parsedValue) && parsedValue > 0) {
        setPixelsPerMm(parsedValue);
        setCalibrationStatus('calibrated');
        return;
      }
    }
    setCalibrationStatus('initial'); // Default if nothing valid in localStorage
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
      // Reset if not calibrated or pixelsPerMm is invalid
      setActualRingMmDiameter(0);
      setActualRingMmCircumference(0);
      setMatchedRingSize(null);
    }
  }, [ringCirclePxDiameter, pixelsPerMm, calibrationStatus]);


  const handleStartCalibration = () => {
    setCalibrationStatus('calibrating');
  };

  const handleCalibrationSliderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCalibrationRectPxWidth(Number(event.target.value));
  };

  const handleSaveCalibration = () => {
    if (calibrationRectPxWidth > 0) {
      const calculatedPixelsPerMm = calibrationRectPxWidth / CREDIT_CARD_WIDTH_MM;
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
    setCalibrationRectPxWidth(INITIAL_CALIBRATION_RECT_PX_WIDTH);
  };
  
  const handleRingSliderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRingCirclePxDiameter(Number(event.target.value));
  };

  const calibrationRectStyle: React.CSSProperties = {
    width: `${calibrationRectPxWidth}px`,
    height: `${calibrationRectPxWidth / CREDIT_CARD_ASPECT_RATIO}px`,
    backgroundColor: 'rgba(239, 68, 68, 0.5)', // Tailwind rose-500 with opacity
    border: '2px dashed #BE123C', // Tailwind rose-700
    margin: '20px auto',
    transition: 'width 0.1s ease-out, height 0.1s ease-out',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
  };

  const ringCircleStyle: React.CSSProperties = {
    width: `${ringCirclePxDiameter}px`,
    height: `${ringCirclePxDiameter}px`,
    border: '3px solid #F472B6', // Tailwind rose-400
    borderRadius: '50%',
    margin: '20px auto',
    boxSizing: 'content-box',
    transition: 'width 0.1s ease-out, height 0.1s ease-out',
    boxShadow: '0 0 15px rgba(244, 114, 182, 0.4)', // rose-400 with opacity
  };

  // Content for different calibration statuses
  if (calibrationStatus === 'initial') {
    return (
      <div className="p-4 sm:p-6 bg-white/80 backdrop-blur-md rounded-xl shadow-lg text-center animate-fadeIn">
        <h3 className="text-lg sm:text-xl font-semibold text-rose-700 mb-3">{t('visualSizer.calibration.initialTitle')}</h3>
        <p className="text-sm sm:text-base text-rose-600 mb-6 px-2">{t('visualSizer.calibration.initialDesc')}</p>
        <button
          onClick={handleStartCalibration}
          className="px-6 py-3 bg-rose-500 hover:bg-rose-600 text-white font-semibold rounded-lg shadow-md transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-rose-400 focus:ring-offset-2"
        >
          {t('visualSizer.calibration.startCalibrationButton')}
        </button>
      </div>
    );
  }

  if (calibrationStatus === 'calibrating') {
    const estimatedRectMmWidth = pixelsPerMm ? (calibrationRectPxWidth / pixelsPerMm) : (calibrationRectPxWidth / (INITIAL_CALIBRATION_RECT_PX_WIDTH / CREDIT_CARD_WIDTH_MM));
    return (
      <div className="p-4 sm:p-6 bg-white/80 backdrop-blur-md rounded-xl shadow-lg animate-fadeIn">
        <h3 className="text-lg sm:text-xl font-semibold text-rose-700 mb-2 text-center">{t('visualSizer.calibration.calibratingTitle')}</h3>
        <p className="text-xs sm:text-sm text-rose-600 mb-1 text-center px-1" dangerouslySetInnerHTML={{ __html: t('visualSizer.calibration.calibratingDesc1') }} />
        <p className="text-xs sm:text-sm text-rose-600 mb-4 text-center px-1" dangerouslySetInnerHTML={{ __html: t('visualSizer.calibration.calibratingDesc2') }} />
        
        <div
          className="w-full h-auto flex justify-center items-center my-4 sm:my-6 overflow-hidden" // Added overflow-hidden for safety
          style={{ minHeight: `${(MAX_CALIBRATION_RECT_PX_WIDTH / CREDIT_CARD_ASPECT_RATIO) + 40}px` }}
          aria-hidden="true"
        >
          <div style={calibrationRectStyle} />
        </div>

        <div className="mb-4">
          <label htmlFor="calibrationSlider" className="block text-sm font-medium text-slate-700 mb-2 sr-only">{t('visualSizer.calibration.sliderLabel')}</label>
          <input
            type="range"
            id="calibrationSlider"
            min={MIN_CALIBRATION_RECT_PX_WIDTH}
            max={MAX_CALIBRATION_RECT_PX_WIDTH}
            value={calibrationRectPxWidth}
            onChange={handleCalibrationSliderChange}
            className="w-full h-3 bg-slate-200 rounded-lg appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-rose-500 focus:ring-offset-2"
            aria-label={t('visualSizer.calibration.sliderLabel')}
          />
        </div>
         <p className="text-center text-xs text-slate-500 mb-4" aria-live="polite">
          {t('visualSizer.calibration.currentWidth')} <strong>{estimatedRectMmWidth.toFixed(1)} mm</strong>
          <br className="sm:hidden" /> {/* Break line on small screens for better layout */}
          <span className="hidden sm:inline"> | </span> 
          {t('visualSizer.calibration.targetWidth')} {CREDIT_CARD_WIDTH_MM} mm
        </p>
        <button
          onClick={handleSaveCalibration}
          className="w-full px-6 py-3 bg-rose-500 hover:bg-rose-600 text-white font-semibold rounded-lg shadow-md transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-rose-400 focus:ring-offset-2"
        >
          {t('visualSizer.calibration.saveButton')}
        </button>
      </div>
    );
  }

  // calibrationStatus === 'calibrated'
  return (
    <div className="animate-fadeIn"> 
      <div className="text-center mb-4 p-3 bg-rose-50 border border-rose-200 rounded-lg">
        <p className="text-xs sm:text-sm text-rose-700" dangerouslySetInnerHTML={{ __html: t('visualSizer.instructionHighlightCalibrated') }} />
      </div>
      <div
        className="w-full h-auto flex justify-center items-center my-4 sm:my-6"
        style={{ minHeight: `${MAX_RING_CIRCLE_PX_DIAMETER + 40}px`}}
        aria-hidden="true"
      >
        <div style={ringCircleStyle} />
      </div>
      <div className="mb-4 sm:mb-6">
        <label htmlFor="visualSizerSlider" className="block text-sm font-semibold text-slate-700 mb-2 sr-only">
          {t('visualSizer.sliderLabel')}
        </label>
        <input
          type="range"
          id="visualSizerSlider"
          min={MIN_RING_CIRCLE_PX_DIAMETER}
          max={MAX_RING_CIRCLE_PX_DIAMETER}
          value={ringCirclePxDiameter}
          onChange={handleRingSliderChange}
          className="w-full h-3 bg-slate-200 rounded-lg appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-rose-500 focus:ring-offset-2"
          aria-label={t('visualSizer.sliderLabel')}
          aria-valuemin={MIN_RING_CIRCLE_PX_DIAMETER}
          aria-valuemax={MAX_RING_CIRCLE_PX_DIAMETER}
          aria-valuenow={ringCirclePxDiameter}
          aria-describedby="current-dimensions-info"
        />
      </div>
      <div id="current-dimensions-info" className="mb-4 sm:mb-6 text-center space-y-1" aria-live="polite">
        <p className="text-sm sm:text-base text-slate-700">
          {t('visualSizer.diameterLabel')}: <strong className="text-rose-600 font-semibold">{actualRingMmDiameter.toFixed(2)} mm</strong>
        </p>
        <p className="text-sm sm:text-base text-slate-700">
          {t('visualSizer.circumferenceLabel')}: <strong className="text-rose-600 font-semibold">{actualRingMmCircumference.toFixed(2)} mm</strong>
        </p>
      </div>
      
      <ResultsDisplay 
        matchedSize={matchedRingSize} 
        inputValue={actualRingMmDiameter > 0 ? t('visualSizer.calculatedInputValueCalibrated', { value: actualRingMmDiameter.toFixed(2) }) : "N/A"}
        inputTypeLabel={visualSizerTabLabel}
      />
       <div className="mt-6 text-center">
        <button
          onClick={handleRecalibrate}
          className="px-5 py-2 bg-slate-200 hover:bg-slate-300 text-slate-700 text-xs font-medium rounded-md transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2"
        >
          {t('visualSizer.calibration.recalibrateButton')}
        </button>
      </div>
      <div className="mt-6 text-xs text-slate-500 bg-amber-50 p-3 rounded-md border border-amber-200">
        <p className="font-semibold text-amber-700">{t('visualSizer.accuracyDisclaimerTitleCalibrated')}</p>
        <p className="text-amber-600">
          {t('visualSizer.accuracyDisclaimerContentCalibrated')}
        </p>
      </div>
    </div>
  );
};

export default VisualSizer;
