import React from 'react';
import { t } from '../i18n.js';

const CornerLoupe = ({
  cornerType,
  calibrationRectPxHeight,
  calibrationRectCurrentWidth,
  loupeSizePx,
  loupeZoomFactor,
  crosshairExtensionPx,
  lGuideArmLengthPx,
  lGuideArmThicknessPx,
  lGuideArmColor,
  calibrationRectBorderColor,
  crosshairColor,
  calibrationRectBgColor,
}) => {
  const focalXCard = cornerType === 'top-right' ? calibrationRectCurrentWidth : 0;
  const focalYCard = 0; 

  const scaledContentWrapperStyle = {
    position: 'absolute',
    transform: `scale(${loupeZoomFactor})`,
    left: `${loupeSizePx / 2 - focalXCard * loupeZoomFactor}px`,
    top: `${loupeSizePx / 2 - focalYCard * loupeZoomFactor}px`,
    width: `${calibrationRectCurrentWidth + crosshairExtensionPx * 2 + lGuideArmLengthPx * 2}px`,
    height: `${calibrationRectPxHeight + crosshairExtensionPx * 2 + lGuideArmLengthPx * 2}px`,
    transformOrigin: 'top left',
  };

  const loupeLabel = cornerType === 'top-left' 
    ? t('visualSizer.calibration.loupeTopLeftTitle') 
    : t('visualSizer.calibration.loupeTopRightTitle');

  return (
    React.createElement('div', { className: "flex flex-col items-center" },
      React.createElement('div', {
        "aria-label": loupeLabel,
        role: "img",
        className: "rounded-md",
        style: {
          width: loupeSizePx,
          height: loupeSizePx,
          overflow: 'hidden',
          position: 'relative',
          border: '1px solid #a1a1aa', // zinc-400
          backgroundColor: '#f8fafc', // slate-50
          boxShadow: '0 1px 3px rgba(0,0,0,0.1), 0 1px 2px rgba(0,0,0,0.06)',
        }
      },
        React.createElement('div', { style: scaledContentWrapperStyle },
          React.createElement('div', { style: {
            position: 'absolute',
            left: 0, 
            top: 0,
            width: calibrationRectCurrentWidth,
            height: calibrationRectPxHeight,
            backgroundColor: calibrationRectBgColor,
          } }),
          React.createElement('div', { style: {
            position: 'absolute',
            left: 0, 
            top: 0,
            width: calibrationRectCurrentWidth,
            height: calibrationRectPxHeight,
            border: `2px dashed ${calibrationRectBorderColor}`,
            boxSizing: 'border-box',
          } }),
          
          // L-Shaped Guides (Top-Left)
          React.createElement('div', { style: { position: 'absolute', top: `-${lGuideArmThicknessPx / 2}px`, left: `-${lGuideArmLengthPx}px`, width: `${lGuideArmLengthPx}px`, height: `${lGuideArmThicknessPx}px`, backgroundColor: lGuideArmColor } }),
          React.createElement('div', { style: { position: 'absolute', top: `-${lGuideArmLengthPx}px`, left: `-${lGuideArmThicknessPx / 2}px`, width: `${lGuideArmThicknessPx}px`, height: `${lGuideArmLengthPx}px`, backgroundColor: lGuideArmColor } }),

          // L-Shaped Guides (Top-Right)
          React.createElement('div', { style: { position: 'absolute', top: `-${lGuideArmThicknessPx / 2}px`, left: `${calibrationRectCurrentWidth}px`, width: `${lGuideArmLengthPx}px`, height: `${lGuideArmThicknessPx}px`, backgroundColor: lGuideArmColor } }),
          React.createElement('div', { style: { position: 'absolute', top: `-${lGuideArmLengthPx}px`, left: `${calibrationRectCurrentWidth - (lGuideArmThicknessPx / 2)}px`, width: `${lGuideArmThicknessPx}px`, height: `${lGuideArmLengthPx}px`, backgroundColor: lGuideArmColor } }),
          
          // Horizontal Crosshair
          React.createElement('div', { style: {
            position: 'absolute',
            left: -crosshairExtensionPx,
            width: calibrationRectCurrentWidth + 2 * crosshairExtensionPx,
            top: `calc(${calibrationRectPxHeight / 2}px - ${1 / 2}px)`,
            height: '1px',
            backgroundColor: crosshairColor,
          } }),
          // Vertical Crosshair
          React.createElement('div', { style: {
            position: 'absolute',
            top: -crosshairExtensionPx,
            height: calibrationRectPxHeight + 2 * crosshairExtensionPx,
            left: `calc(${calibrationRectCurrentWidth / 2}px - ${1 / 2}px)`,
            width: '1px',
            backgroundColor: crosshairColor,
          } })
        )
      ),
      React.createElement('p', { className: "text-xs text-slate-600 mt-1" }, loupeLabel)
    )
  );
};

export default CornerLoupe;
