import React from 'react';
import { t } from '../i18n';

interface CornerLoupeProps {
  cornerType: 'top-left' | 'top-right';
  calibrationRectPxHeight: number;
  calibrationRectCurrentWidth: number;
  loupeSizePx: number;
  loupeZoomFactor: number;
  crosshairExtensionPx: number;
  lGuideArmLengthPx: number;
  lGuideArmThicknessPx: number;
  lGuideArmColor: string;
  calibrationRectBorderColor: string;
  crosshairColor: string;
  calibrationRectBgColor: string;
}

const CornerLoupe: React.FC<CornerLoupeProps> = ({
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
  // Determine the focal point (the corner of the card) in the card's own coordinate system.
  // (0,0) is the top-left of the card.
  const focalXCard = cornerType === 'top-right' ? calibrationRectCurrentWidth : 0;
  const focalYCard = 0; // Both loupes are for top corners

  const scaledContentWrapperStyle: React.CSSProperties = {
    position: 'absolute',
    transform: `scale(${loupeZoomFactor})`,
    // Adjust 'left' and 'top' to pan the scaled content.
    // We want the focal point (focalXCard, focalYCard) of the *original card*
    // to appear at the center of the loupe (loupeSizePx / 2, loupeSizePx / 2).
    left: `${loupeSizePx / 2 - focalXCard * loupeZoomFactor}px`,
    top: `${loupeSizePx / 2 - focalYCard * loupeZoomFactor}px`, // focalYCard is 0 for top corners
    width: `${calibrationRectCurrentWidth + crosshairExtensionPx * 2 + lGuideArmLengthPx * 2}px`, // Ensure enough space for guides
    height: `${calibrationRectPxHeight + crosshairExtensionPx * 2 + lGuideArmLengthPx * 2}px`,// Ensure enough space for guides
    transformOrigin: 'top left', // Should not be needed if left/top are correct
  };

  const loupeLabel = cornerType === 'top-left' 
    ? t('visualSizer.calibration.loupeTopLeftTitle') 
    : t('visualSizer.calibration.loupeTopRightTitle');

  return (
    <div className="flex flex-col items-center">
      <div
        aria-label={loupeLabel}
        role="img"
        className="rounded-md"
        style={{
          width: loupeSizePx,
          height: loupeSizePx,
          overflow: 'hidden',
          position: 'relative',
          border: '1px solid #a1a1aa', // zinc-400
          backgroundColor: '#f8fafc', // slate-50
          boxShadow: '0 1px 3px rgba(0,0,0,0.1), 0 1px 2px rgba(0,0,0,0.06)',
        }}
      >
        <div style={scaledContentWrapperStyle}>
          {/* Main Calibration Rectangle (partial, for background color and context) */}
          <div style={{
            position: 'absolute',
            left: 0, 
            top: 0,
            width: calibrationRectCurrentWidth,
            height: calibrationRectPxHeight,
            backgroundColor: calibrationRectBgColor, // Use the actual rect background
          }} />

          {/* Dashed Border of Main Calibration Rectangle */}
          <div style={{
            position: 'absolute',
            left: 0, 
            top: 0,
            width: calibrationRectCurrentWidth,
            height: calibrationRectPxHeight,
            border: `2px dashed ${calibrationRectBorderColor}`,
            boxSizing: 'border-box',
          }} />
          
          {/* L-Shaped Guides */}
          {/* Top-Left L-Guide */}
          <div style={{ position: 'absolute', top: `-${lGuideArmThicknessPx / 2}px`, left: `-${lGuideArmLengthPx}px`, width: `${lGuideArmLengthPx}px`, height: `${lGuideArmThicknessPx}px`, backgroundColor: lGuideArmColor }} />
          <div style={{ position: 'absolute', top: `-${lGuideArmLengthPx}px`, left: `-${lGuideArmThicknessPx / 2}px`, width: `${lGuideArmThicknessPx}px`, height: `${lGuideArmLengthPx}px`, backgroundColor: lGuideArmColor }} />

          {/* Top-Right L-Guide */}
          <div style={{ position: 'absolute', top: `-${lGuideArmThicknessPx / 2}px`, left: `${calibrationRectCurrentWidth}px`, width: `${lGuideArmLengthPx}px`, height: `${lGuideArmThicknessPx}px`, backgroundColor: lGuideArmColor }} />
          <div style={{ position: 'absolute', top: `-${lGuideArmLengthPx}px`, left: `${calibrationRectCurrentWidth - (lGuideArmThicknessPx / 2)}px`, width: `${lGuideArmThicknessPx}px`, height: `${lGuideArmLengthPx}px`, backgroundColor: lGuideArmColor }} />
          
          {/* Extended Central Crosshairs */}
          {/* Horizontal Crosshair */}
          <div style={{
            position: 'absolute',
            left: -crosshairExtensionPx,
            width: calibrationRectCurrentWidth + 2 * crosshairExtensionPx,
            top: `calc(${calibrationRectPxHeight / 2}px - ${1 / 2}px)`,
            height: '1px',
            backgroundColor: crosshairColor,
          }} />
          {/* Vertical Crosshair */}
          <div style={{
            position: 'absolute',
            top: -crosshairExtensionPx,
            height: calibrationRectPxHeight + 2 * crosshairExtensionPx,
            left: `calc(${calibrationRectCurrentWidth / 2}px - ${1 / 2}px)`,
            width: '1px',
            backgroundColor: crosshairColor,
          }} />
        </div>
      </div>
      <p className="text-xs text-slate-600 mt-1">{loupeLabel}</p>
    </div>
  );
};

export default CornerLoupe;
