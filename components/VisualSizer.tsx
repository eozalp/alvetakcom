
import React, { useState, useEffect, useCallback } from 'react';
import { RingSizeEntry, InputType } from '../types';
import { findMatchingSize } from '../utils/conversion';
import ResultsDisplay from './ResultsDisplay';
import CornerLoupe from './CornerLoupe'; // Import the new component
import { t, getCurrentLocale } from '../i18n';

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
const L_GUIDE_ARM_COLOR = '#374151'; // cool-gray-700
const CALIBRATION_RECT_BORDER_COLOR = '#B91C1C';
const CALIBRATION_RECT_BG_COLOR = 'rgba(239, 68, 68, 0.5)';
const CROSSHAIR_COLOR = 'rgba(185, 28, 28, 0.7)';

const LOUPE_SIZE_PX = 100; // Size of the loupe viewport (width and height)
const LOUPE_ZOOM_FACTOR = 2.5; // Magnification factor for the loupe


type CalibrationStatus = 'initial' | 'calibrating' | 'calibrated';

interface StoredCalibrationData {
  storedPixelsPerMm: number;
  devicePixelRatioAtCalibration: number;
}

const VisualSizer: React.FC = () => {
  const [calibrationStatus, setCalibrationStatus] = useState<CalibrationStatus>('initial');
  const [pixelsPerMm, setPixelsPerMm] = useState<number | null>(null);
  
  const [calibrationRectPxHeight, setCalibrationRectPxHeight] = useState<number>(INITIAL_CALIBRATION_RECT_PX_HEIGHT);
  const [ringCirclePxDiameter, setRingCirclePxDiameter] = useState<number>(INITIAL_RING_CIRCLE_PX_DIAMETER);

  const [actualRingMmDiameter, setActualRingMmDiameter] = useState<number>(0);
  const [actualRingMmCircumference, setActualRingMmCircumference] = useState<number>(0);
  const [matchedRingSize, setMatchedRingSize] = useState<RingSizeEntry | null>(null);
  
  const [visualSizerTabLabel, setVisualSizerTabLabel] = useState(t('visualSizer.inputTypeLabel'));
  const [calibrationWarning, setCalibrationWarning] = useState<string | null>(null);
  const [recalibrationPrompt, setRecalibrationPrompt] = useState<string | null>(null);


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
        const data: StoredCalibrationData = JSON.parse(rawData);
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

  const handleCalibrationSliderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
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
      const dataToStore: StoredCalibrationData = {
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
  
  const handleRingSliderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRingCirclePxDiameter(Number(event.target.value));
  };

  const calibrationRectCurrentWidth = calibrationRectPxHeight * (CALIBRATION_HORIZONTAL_MM_FOR_ASPECT / CALIBRATION_REF_VERTICAL_MM);

  const calibrationRectStyle: React.CSSProperties = {
    height: `${calibrationRectPxHeight}px`,
    width: `${calibrationRectCurrentWidth}px`,
    backgroundColor: CALIBRATION_RECT_BG_COLOR, 
    border: `2px dashed ${CALIBRATION_RECT_BORDER_COLOR}`, 
    transition: 'width 0.1s ease-out, height 0.1s ease-out',
    boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
    position: 'relative', 
  };

  const extendedCrosshairLineBaseStyle: React.CSSProperties = {
    position: 'absolute',
    backgroundColor: CROSSHAIR_COLOR,
    pointerEvents: 'none',
  };
  
  const ringCircleStyle: React.CSSProperties = {
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
      <div className="p-4 sm:p-6 bg-white/80 backdrop-blur-md rounded-xl shadow-lg text-center animate-fadeIn">
        <h3 className="text-lg sm:text-xl font-semibold text-rose-700 mb-3">{t('visualSizer.calibration.initialTitle')}</h3>
        {recalibrationPrompt && (
          <p className="text-sm text-orange-600 bg-orange-50 border border-orange-200 p-3 rounded-md mb-4">{recalibrationPrompt}</p>
        )}
        <p className="text-sm sm:text-base text-rose-600 mb-6 px-2">{t('visualSizer.calibration.initialDesc')}</p>
        <button
          onClick={handleStartCalibration}
          className="px-6 py-3 bg-rose-500 hover:bg-rose-600 text-white font-semibold rounded-lg shadow-md transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-rose-400 focus:ring-offset-2"
          aria-label={t('visualSizer.calibration.startCalibrationButton')}
        >
          {t('visualSizer.calibration.startCalibrationButton')}
        </button>
      </div>
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
      <div className="p-4 sm:p-6 bg-white/80 backdrop-blur-md rounded-xl shadow-lg animate-fadeIn">
        <h3 className="text-lg sm:text-xl font-semibold text-rose-700 mb-2 text-center">{t('visualSizer.calibration.calibratingTitle')}</h3>
        {recalibrationPrompt && (
            <p className="text-sm text-orange-600 bg-orange-50 border border-orange-200 p-3 rounded-md mb-3 text-center">{recalibrationPrompt}</p>
        )}
        <p className="text-xs sm:text-sm text-rose-600 mb-1 text-center px-1" dangerouslySetInnerHTML={{ __html: t('visualSizer.calibration.calibratingDesc1VerticalBottomAlign') }} />
        <p className="text-xs sm:text-sm text-rose-600 mb-4 text-center px-1 font-medium" dangerouslySetInnerHTML={{ __html: t('visualSizer.calibration.calibratingDesc2VerticalBottomAlign', { value: CALIBRATION_REF_VERTICAL_MM }) }} />
        
        {/* Corner Loupes */}
        <div className="flex justify-around items-start mb-3 sm:mb-4 px-2" 
             style={{ minHeight: `${LOUPE_SIZE_PX + 30}px`}}> {/* Added padding for label below loupe */}
          <CornerLoupe cornerType="top-left" {...loupeProps} />
          <CornerLoupe cornerType="top-right" {...loupeProps} />
        </div>

        <div
          className="w-full flex flex-col justify-end items-center my-2 sm:my-4 overflow-visible" 
          style={{ minHeight: `${MAX_CALIBRATION_RECT_PX_HEIGHT + 40 + (CROSSHAIR_EXTENSION_PX * 2)}px` }} 
          aria-label={t('visualSizer.calibration.areaLabel')}
          role="img" 
        >
          <div style={{...calibrationRectStyle, position: 'relative'}} 
               aria-description={t('visualSizer.calibration.rectDescription', {height: calibrationRectPxHeight, width: Math.round(calibrationRectCurrentWidth)})}>
            {/* Extended Horizontal Crosshair */}
            <div style={{
                ...extendedCrosshairLineBaseStyle, 
                left: `-${CROSSHAIR_EXTENSION_PX}px`, 
                right: `-${CROSSHAIR_EXTENSION_PX}px`, 
                top: '50%', 
                height: '1px', 
                transform: 'translateY(-50%)' 
            }} />
            {/* Extended Vertical Crosshair */}
            <div style={{
                ...extendedCrosshairLineBaseStyle, 
                top: `-${CROSSHAIR_EXTENSION_PX}px`, 
                bottom: `-${CROSSHAIR_EXTENSION_PX}px`, 
                left: '50%', 
                width: '1px', 
                transform: 'translateX(-50%)' 
            }} />

            {/* L-Shaped Corner Guides */}
            {/* Top-Left L-Guide */}
            <div style={{ position: 'absolute', top: `-${L_GUIDE_ARM_THICKNESS_PX / 2}px`, left: `-${L_GUIDE_ARM_LENGTH_PX}px`, width: `${L_GUIDE_ARM_LENGTH_PX}px`, height: `${L_GUIDE_ARM_THICKNESS_PX}px`, backgroundColor: L_GUIDE_ARM_COLOR }} aria-hidden="true" />
            <div style={{ position: 'absolute', top: `-${L_GUIDE_ARM_LENGTH_PX}px`, left: `-${L_GUIDE_ARM_THICKNESS_PX / 2}px`, width: `${L_GUIDE_ARM_THICKNESS_PX}px`, height: `${L_GUIDE_ARM_LENGTH_PX}px`, backgroundColor: L_GUIDE_ARM_COLOR }} aria-hidden="true" />

            {/* Top-Right L-Guide */}
            <div style={{ position: 'absolute', top: `-${L_GUIDE_ARM_THICKNESS_PX / 2}px`, right: `-${L_GUIDE_ARM_LENGTH_PX}px`, width: `${L_GUIDE_ARM_LENGTH_PX}px`, height: `${L_GUIDE_ARM_THICKNESS_PX}px`, backgroundColor: L_GUIDE_ARM_COLOR }} aria-hidden="true" />
            <div style={{ position: 'absolute', top: `-${L_GUIDE_ARM_LENGTH_PX}px`, right: `-${L_GUIDE_ARM_THICKNESS_PX / 2}px`, width: `${L_GUIDE_ARM_THICKNESS_PX}px`, height: `${L_GUIDE_ARM_LENGTH_PX}px`, backgroundColor: L_GUIDE_ARM_COLOR }} aria-hidden="true" />

            {/* Bottom-Left L-Guide */}
            <div style={{ position: 'absolute', bottom: `-${L_GUIDE_ARM_THICKNESS_PX / 2}px`, left: `-${L_GUIDE_ARM_LENGTH_PX}px`, width: `${L_GUIDE_ARM_LENGTH_PX}px`, height: `${L_GUIDE_ARM_THICKNESS_PX}px`, backgroundColor: L_GUIDE_ARM_COLOR }} aria-hidden="true" />
            <div style={{ position: 'absolute', bottom: `-${L_GUIDE_ARM_LENGTH_PX}px`, left: `-${L_GUIDE_ARM_THICKNESS_PX / 2}px`, width: `${L_GUIDE_ARM_THICKNESS_PX}px`, height: `${L_GUIDE_ARM_LENGTH_PX}px`, backgroundColor: L_GUIDE_ARM_COLOR }} aria-hidden="true" />
            
            {/* Bottom-Right L-Guide */}
            <div style={{ position: 'absolute', bottom: `-${L_GUIDE_ARM_THICKNESS_PX / 2}px`, right: `-${L_GUIDE_ARM_LENGTH_PX}px`, width: `${L_GUIDE_ARM_LENGTH_PX}px`, height: `${L_GUIDE_ARM_THICKNESS_PX}px`, backgroundColor: L_GUIDE_ARM_COLOR }} aria-hidden="true" />
            <div style={{ position: 'absolute', bottom: `-${L_GUIDE_ARM_LENGTH_PX}px`, right: `-${L_GUIDE_ARM_THICKNESS_PX / 2}px`, width: `${L_GUIDE_ARM_THICKNESS_PX}px`, height: `${L_GUIDE_ARM_LENGTH_PX}px`, backgroundColor: L_GUIDE_ARM_COLOR }} aria-hidden="true" />
          </div>
        </div>

        <div className="mb-6">
          <label htmlFor="calibrationSlider" className="block text-sm font-medium text-slate-700 mb-2 sr-only">{t('visualSizer.calibration.sliderLabelVertical')}</label>
          <input
            type="range"
            id="calibrationSlider"
            min={MIN_CALIBRATION_RECT_PX_HEIGHT}
            max={MAX_CALIBRATION_RECT_PX_HEIGHT}
            value={calibrationRectPxHeight}
            onChange={handleCalibrationSliderChange}
            className="w-full h-3 bg-slate-200 rounded-lg appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-rose-500 focus:ring-offset-2"
            aria-label={t('visualSizer.calibration.sliderLabelVertical')}
            aria-valuemin={MIN_CALIBRATION_RECT_PX_HEIGHT}
            aria-valuemax={MAX_CALIBRATION_RECT_PX_HEIGHT}
            aria-valuenow={calibrationRectPxHeight}
          />
        </div>
         <p className="text-center text-xs text-slate-500 mb-4" aria-live="polite">
          {t('visualSizer.calibration.currentHeight')} <strong>{estimatedRectMmHeight.toFixed(1)} mm</strong>
          <br className="sm:hidden" />
          <span className="hidden sm:inline"> ({t('visualSizer.calibration.targetHeight')} {CALIBRATION_REF_VERTICAL_MM} mm)</span>
          <span className="sm:hidden block mt-1">({t('visualSizer.calibration.targetHeight')} {CALIBRATION_REF_VERTICAL_MM} mm)</span>
        </p>
        <button
          onClick={handleSaveCalibration}
          className="w-full px-6 py-3 bg-rose-500 hover:bg-rose-600 text-white font-semibold rounded-lg shadow-md transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-rose-400 focus:ring-offset-2"
          aria-label={t('visualSizer.calibration.saveButton')}
        >
          {t('visualSizer.calibration.saveButton')}
        </button>
        {calibrationWarning && (
           <div className="mt-3 text-xs text-orange-700 bg-orange-50 border border-orange-200 p-2.5 rounded-md text-left"
             dangerouslySetInnerHTML={{ __html: calibrationWarning }} 
           />
        )}
      </div>
    );
  }

  // Calibrated state
  return (
    <div className="animate-fadeIn"> 
      <div className="text-center mb-4 p-3 bg-rose-50 border border-rose-200 rounded-lg">
        <p className="text-xs sm:text-sm text-rose-700" dangerouslySetInnerHTML={{ __html: t('visualSizer.instructionHighlightCalibrated') }} />
      </div>
      <div
        className="w-full h-auto flex justify-center items-center my-4 sm:my-6"
        style={{ minHeight: `${MAX_RING_CIRCLE_PX_DIAMETER + 40}px`}}
        aria-label={t('visualSizer.ringAreaLabel')}
        role="img"
      >
        <div style={ringCircleStyle} aria-description={t('visualSizer.ringDescription', { diameter: ringCirclePxDiameter })} />
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
          aria-label={t('visualSizer.calibration.recalibrateButton')}
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
