
// Embed translations directly
const embeddedTranslations = {
  en: {
    "app.title": "alvetak: International Ring Size Converter",
    "app.subtitle": "Find ring sizes with manual entry or our visual on-screen sizer. Your companion by alvetak.",
    "app.tabListLabel": "Ring Sizing Methods",
    "app.manualTab": "Manual Size Entry",
    "app.visualTab": "Visual Ring Sizer",
    "app.visualSizer.title": "Visual On-Screen Sizer",
    "app.visualSizer.instruction": "Ensure your screen is calibrated, then place your ring on the screen and use the slider.",
    "app.footer.copyright": "alvetak. For reference purposes only.",
    "app.footer.professionalAdvice": "Always confirm your size with a professional jeweler for important purchases.",
    "app.footer.decorativeLogoAlt": "alvetak decorative element",
    "app.loading": "Loading application...",
    "app.installBanner.text": "Install alvetak Ring Sizer for quick offline access!",
    "app.installBanner.installButton": "Install App",
    "app.installBanner.dismissButton": "Dismiss",

    "inputType.diameter_mm": "Diameter (mm)",
    "inputType.circumference_mm": "Circumference (mm)",
    "inputType.us_ca": "US / Canada",
    "inputType.uk_au_nz_ie_za": "UK / AU / NZ / IE / ZA",
    "inputType.eu_iso": "Europe (ISO / French)",
    "inputType.jp_cn_sa": "Japan / China / S. America",
    "inputType.ch": "Switzerland",
    "inputType.it_es_nl_tr": "Italy / Spain / NL / Turkey",

    "displayCategory.diameter_mm": "Diameter (mm)",
    "displayCategory.circumference_mm": "Circumference (mm)",
    "displayCategory.us_ca": "US / Canada",
    "displayCategory.uk_au_nz_ie_za": "UK / AU / NZ / IE / ZA",
    "displayCategory.eu_iso": "Europe (ISO / French)",
    "displayCategory.jp_cn_sa": "Japan / China / S. America",
    "displayCategory.ch": "Switzerland",
    "displayCategory.it_es_nl_tr": "Italy / Spain / NL / Turkey",

    "inputPanel.iKnowMySizeIn": "I know my size in:",
    "inputPanel.enterSizeValue": "Enter Size Value:",
    "inputPanel.placeholderDiameter": "e.g., 17.35",
    "inputPanel.placeholderCircumference": "e.g., 54.5",
    "inputPanel.noSizesAvailable": "No sizes available for this type",

    "resultsDisplay.enterSizePrompt": "Enter a size above to see conversions.",
    "resultsDisplay.selectTypePrompt": "Select your known measurement type and value.",
    "resultsDisplay.noMatchFound": "No matching size found for \"{{inputValue}}\" in {{inputType}}.",
    "resultsDisplay.noMatchSuggestion": "Please check your input or try a different value. This chart contains common sizes; very small, large, or custom sizes may not be listed.",
    "resultsDisplay.equivalentSizesTitle": "Equivalent International Sizes",
    "resultsDisplay.disclaimerVariation": "* Ring sizes can vary slightly by jeweler and country. This chart provides common approximations.",
    "resultsDisplay.disclaimerIso": "* EU/ISO sizes often correspond to the ring's inner circumference in millimeters. CH (Swiss) sizes are often EU size - 40.",
    "resultsDisplay.disclaimerNoEquivalent": "* '-' indicates no direct common equivalent in this chart or data not available.",

    "visualSizer.inputTypeLabel": "Visual Sizer",
    "visualSizer.inputTypeLabelCalibrated": "Visual Sizer (Calibrated)",
    "visualSizer.instructionHighlightCalibrated": "Place your ring on screen. Adjust the slider until the <strong class=\"font-semibold\">inner edge of the circle</strong> matches your ring's <strong class=\"font-semibold\">inner edge</strong>.",
    "visualSizer.sliderLabel": "Adjust Ring Diameter",
    "visualSizer.diameterLabel": "Diameter",
    "visualSizer.circumferenceLabel": "Circumference",
    "visualSizer.calculatedInputValue": "{{value}} mm (Calculated - Needs Calibration)",
    "visualSizer.calculatedInputValueCalibrated": "{{value}} mm (Calibrated)",
    "visualSizer.accuracyDisclaimerTitle": "Accuracy Disclaimer (Pre-Calibration):",
    "visualSizer.accuracyDisclaimerContent": "This visual sizer relies on a standard screen PPI. For precise measurements, calibrate your screen or consult a professional jeweler.",
    "visualSizer.ringAreaLabel": "Ring sizing area with adjustable blue circle",
    "visualSizer.ringDescription": "Blue circle with current diameter of {{diameter}} pixels",

    "visualSizer.calibration.initialTitle": "Screen Calibration Needed",
    "visualSizer.calibration.initialDesc": "For accurate visual sizing, let's quickly calibrate your screen using a standard credit card.",
    "visualSizer.calibration.startCalibrationButton": "Start Calibration",
    "visualSizer.calibration.calibratingTitle": "Calibrate Your Screen",
    "visualSizer.calibration.calibratingDesc1VerticalBottomAlign": "Take any standard credit/debit card. Hold it so its <strong class=\"font-semibold text-rose-600\">long edge is vertical</strong>. Align the <strong class=\"font-semibold text-rose-600\">bottom edge of your card</strong> with the <strong class=\"font-semibold text-rose-600\">bottom dashed border of the red rectangle on screen</strong>. Ensure the card is <strong class=\"font-semibold text-rose-600\">flat</strong> against your screen and view <strong class=\"font-semibold text-rose-600\">directly head-on</strong>. Check browser page zoom is 100%.",
    "visualSizer.calibration.calibratingDesc2VerticalBottomAlign": "Adjust the slider until the <strong class=\"font-semibold text-rose-600\">top dashed border of the red rectangle</strong> aligns with the <strong class=\"font-semibold text-rose-600\">top edge of your card</strong>. Use the <strong class=\"font-semibold text-rose-600\">extended crosshair lines</strong> for edge alignment. Align your <strong class=\"font-semibold text-rose-600\">card's corners</strong> with the <strong class=\"font-semibold text-rose-600\">corners of the red dashed rectangle</strong>; the small gray <strong class=\"font-semibold text-rose-600\">L-shaped guides</strong> should then be visible just outside your card's corners. The rectangle's height should match your card's long edge (approx. {{value}}mm).",
    "visualSizer.calibration.sliderLabelVertical": "Adjust Calibration Rectangle Height",
    "visualSizer.calibration.currentHeight": "Rectangle Height:",
    "visualSizer.calibration.targetHeight": "Target:",
    "visualSizer.calibration.saveButton": "Save Calibration & Measure Ring",
    "visualSizer.calibration.recalibrateButton": "Recalibrate Screen",
    "visualSizer.calibration.dprMismatchPrompt": "Your screen's pixel density or zoom level appears to have changed since the last calibration. Please recalibrate for accurate measurements.",
    "visualSizer.calibration.ppiWarning": "Screen density ({{ppi}} PPI) seems unusual. For best results: <ul class='list-disc list-inside mt-1 text-left'><li class='ml-2'>Ensure the card is <strong>flat</strong> against screen.</li><li class='ml-2'>View screen <strong>directly head-on</strong>.</li><li class='ml-2'>Check browser page zoom is 100%.</li></ul>If alignment is correct, you can still save.",
    "visualSizer.calibration.areaLabel": "Screen calibration area with adjustable red rectangle, extended crosshairs, and L-shaped corner guides.",
    "visualSizer.calibration.rectDescription": "Red calibration rectangle currently {{height}} pixels high and {{width}} pixels wide.",
    "visualSizer.calibration.loupeTopLeftTitle": "Top-Left Corner",
    "visualSizer.calibration.loupeTopRightTitle": "Top-Right Corner",
    
    "visualSizer.accuracyDisclaimerTitleCalibrated": "Accuracy Note:",
    "visualSizer.accuracyDisclaimerContentCalibrated": "Accuracy depends on precise screen calibration and how you align the ring. For critical measurements, always consult a professional jeweler."
  },
  tr: {
    "app.title": "alvetak: Uluslararası Yüzük Ölçüsü Dönüştürücü",
    "app.subtitle": "Manuel girişle veya görsel ekran ölçerimizle yüzük ölçülerini bulun. alvetak yardımcınız.",
    "app.tabListLabel": "Yüzük Ölçüsü Bulma Yöntemleri",
    "app.manualTab": "Manuel Ölçü Girişi",
    "app.visualTab": "Görsel Yüzük Ölçer",
    "app.visualSizer.title": "Görsel Ekran Üzeri Ölçer",
    "app.visualSizer.instruction": "Ekranınızın kalibre edildiğinden emin olun, ardından yüzüğünüzü ekrana yerleştirin ve kaydırıcıyı kullanın.",
    "app.footer.copyright": "alvetak. Sadece referans amaçlıdır.",
    "app.footer.professionalAdvice": "Önemli alışverişler için bedeninizi her zaman bir profesyonel kuyumcuya danışarak teyit edin.",
    "app.footer.decorativeLogoAlt": "alvetak dekoratif öğe",
    "app.loading": "Uygulama yükleniyor...",
    "app.installBanner.text": "Hızlı çevrimdışı erişim için alvetak Yüzük Ölçer'i yükleyin!",
    "app.installBanner.installButton": "Uygulamayı Yükle",
    "app.installBanner.dismissButton": "Kapat",

    "inputType.diameter_mm": "Çap (mm)",
    "inputType.circumference_mm": "Çevre (mm)",
    "inputType.us_ca": "ABD / Kanada",
    "inputType.uk_au_nz_ie_za": "BK / AU / NZ / IE / ZA",
    "inputType.eu_iso": "Avrupa (ISO / Fransız)",
    "inputType.jp_cn_sa": "Japonya / Çin / G. Amerika",
    "inputType.ch": "İsviçre",
    "inputType.it_es_nl_tr": "İtalya / İspanya / NL / Türkiye",

    "displayCategory.diameter_mm": "Çap (mm)",
    "displayCategory.circumference_mm": "Çevre (mm)",
    "displayCategory.us_ca": "ABD / Kanada",
    "displayCategory.uk_au_nz_ie_za": "BK / AU / NZ / IE / ZA",
    "displayCategory.eu_iso": "Avrupa (ISO / Fransız)",
    "displayCategory.jp_cn_sa": "Japonya / Çin / G. Amerika",
    "displayCategory.ch": "İsviçre",
    "displayCategory.it_es_nl_tr": "İtalya / İspanya / NL / TR",

    "inputPanel.iKnowMySizeIn": "Ölçümü bildiğim sistem:",
    "inputPanel.enterSizeValue": "Ölçü Değerini Girin:",
    "inputPanel.placeholderDiameter": "örn: 17.35",
    "inputPanel.placeholderCircumference": "örn: 54.5",
    "inputPanel.noSizesAvailable": "Bu tip için uygun ölçü bulunamadı",

    "resultsDisplay.enterSizePrompt": "Dönüşümleri görmek için yukarıya bir ölçü girin.",
    "resultsDisplay.selectTypePrompt": "Bildiğiniz ölçü türünü ve değerini seçin.",
    "resultsDisplay.noMatchFound": "{{inputType}} sisteminde \"{{inputValue}}\" için eşleşen ölçü bulunamadı.",
    "resultsDisplay.noMatchSuggestion": "Lütfen girdinizi kontrol edin veya farklı bir değer deneyin. Bu tablo yaygın ölçüleri içerir; çok küçük, büyük veya özel ölçüler listelenmemiş olabilir.",
    "resultsDisplay.equivalentSizesTitle": "Eşdeğer Uluslararası Ölçüler",
    "resultsDisplay.disclaimerVariation": "* Yüzük ölçüleri kuyumcuya ve ülkeye göre biraz farklılık gösterebilir. Bu tablo yaygın yaklaşımları sunar.",
    "resultsDisplay.disclaimerIso": "* AB/ISO ölçüleri genellikle yüzüğün milimetre cinsinden iç çevresine karşılık gelir. CH (İsviçre) ölçüleri genellikle AB ölçüsü - 40'tır.",
    "resultsDisplay.disclaimerNoEquivalent": "* '-' işareti, bu tabloda doğrudan yaygın bir eşdeğerin olmadığını veya verinin mevcut olmadığını gösterir.",

    "visualSizer.inputTypeLabel": "Görsel Ölçer",
    "visualSizer.inputTypeLabelCalibrated": "Görsel Ölçer (Kalibre Edildi)",
    "visualSizer.instructionHighlightCalibrated": "Yüzüğünüzü ekrana yerleştirin. Kaydırıcıyı, <strong class=\"font-semibold\">dairenin iç kenarı</strong> yüzüğünüzün <strong class=\"font-semibold\">iç kenarıyla</strong> eşleşene kadar ayarlayın.",
    "visualSizer.sliderLabel": "Yüzük Çapını Ayarla",
    "visualSizer.diameterLabel": "Çap",
    "visualSizer.circumferenceLabel": "Çevre",
    "visualSizer.calculatedInputValue": "{{value}} mm (Hesaplandı - Kalibrasyon Gerekli)",
    "visualSizer.calculatedInputValueCalibrated": "{{value}} mm (Kalibre Edildi)",
    "visualSizer.accuracyDisclaimerTitle": "Doğruluk Uyarısı (Kalibrasyon Öncesi):",
    "visualSizer.accuracyDisclaimerContent": "Bu görsel ölçer standart bir ekran PPI değerine dayanır. Doğru ölçümler için ekranınızı kalibre edin veya profesyonel bir kuyumcuya danışın.",
    "visualSizer.ringAreaLabel": "Ayarlanabilir mavi daireli yüzük ölçüm alanı",
    "visualSizer.ringDescription": "Mevcut çapı {{diameter}} piksel olan mavi daire",

    "visualSizer.calibration.initialTitle": "Ekran Kalibrasyonu Gerekli",
    "visualSizer.calibration.initialDesc": "Doğru görsel ölçüm için, standart bir kredi kartı kullanarak ekranınızı hızlıca kalibre edelim.",
    "visualSizer.calibration.startCalibrationButton": "Kalibrasyonu Başlat",
    "visualSizer.calibration.calibratingTitle": "Ekranınızı Kalibre Edin",
    "visualSizer.calibration.calibratingDesc1VerticalBottomAlign": "Herhangi bir standart kredi/banka kartı alın. Kartı <strong class=\"font-semibold text-rose-600\">uzun kenarı dikey</strong> olacak şekilde tutun. <strong class=\"font-semibold text-rose-600\">Kartınızın alt kenarını</strong> ekrandaki <strong class=\"font-semibold text-rose-600\">kırmızı kesikli dikdörtgenin alt kenarı</strong> ile hizalayın. Kartın ekrana <strong class=\"font-semibold text-rose-600\">tamamen düz</strong> yaslandığından ve ekrana <strong class=\"font-semibold text-rose-600\">tam karşıdan</strong> baktığınızdan emin olun. Tarayıcı sayfa yakınlaştırmasının %100 olduğunu kontrol edin.",
    "visualSizer.calibration.calibratingDesc2VerticalBottomAlign": "Aşağıdaki kaydırıcıyı, <strong class=\"font-semibold text-rose-600\">kırmızı kesikli dikdörtgenin üst kenarı</strong> fiziksel <strong class=\"font-semibold text-rose-600\">kartınızın üst kenarıyla</strong> tam olarak eşleşene kadar ayarlayın. Kenar hizalaması için <strong class=\"font-semibold text-rose-600\">uzatılmış artı işaret çizgilerini</strong> kullanın. <strong class=\"font-semibold text-rose-600\">Kartınızın köşelerini</strong> <strong class=\"font-semibold text-rose-600\">kırmızı kesikli dikdörtgenin köşeleriyle</strong> hizalayın; küçük gri <strong class=\"font-semibold text-rose-600\">L şeklindeki kılavuzlar</strong> kartınızın köşelerinin hemen dışında görünür olmalıdır. Dikdörtgenin yüksekliği kartınızın uzun kenarının uzunluğuyla (yaklaşık {{value}}mm) eşleşmelidir.",
    "visualSizer.calibration.sliderLabelVertical": "Kalibrasyon Dikdörtgen Yüksekliğini Ayarla",
    "visualSizer.calibration.currentHeight": "Dikdörtgen Yüksekliği:",
    "visualSizer.calibration.targetHeight": "Hedef:",
    "visualSizer.calibration.saveButton": "Kalibrasyonu Kaydet & Yüzüğü Ölç",
    "visualSizer.calibration.recalibrateButton": "Ekranı Yeniden Kalibre Et",
    "visualSizer.calibration.dprMismatchPrompt": "Ekranınızın piksel yoğunluğu veya yakınlaştırma seviyesi son kalibrasyondan bu yana değişmiş görünüyor. Doğru ölçümler için lütfen yeniden kalibre edin.",
    "visualSizer.calibration.ppiWarning": "Ekran yoğunluğu ({{ppi}} PPI) alışılmadık görünüyor. En iyi sonuçlar için: <ul class='list-disc list-inside mt-1 text-left'><li class='ml-2'>Kartın ekrana <strong>tamamen düz</strong> yaslandığından emin olun.</li><li class='ml-2'>Ekrana <strong>tam karşıdan</strong> bakın.</li><li class='ml-2'>Tarayıcı sayfa yakınlaştırmasının %100 olduğunu kontrol edin.</li></ul>Hizalama doğruysa, yine de kaydedebilirsiniz.",
    "visualSizer.calibration.areaLabel": "Ayarlanabilir kırmızı dikdörtgen, uzatılmış artı işareti çizgileri ve L-şeklinde köşe kılavuzları içeren ekran kalibrasyon alanı.",
    "visualSizer.calibration.rectDescription": "Kırmızı kalibrasyon dikdörtgeni şu anda {{height}} piksel yüksekliğinde ve {{width}} piksel genişliğinde.",
    "visualSizer.calibration.loupeTopLeftTitle": "Sol Üst Köşe",
    "visualSizer.calibration.loupeTopRightTitle": "Sağ Üst Köşe",
    
    "visualSizer.accuracyDisclaimerTitleCalibrated": "Doğruluk Notu:",
    "visualSizer.accuracyDisclaimerContentCalibrated": "Doğruluk, hassas ekran kalibrasyonuna ve yüzüğü nasıl hizaladığınıza bağlıdır. Kritik ölçümler için daima profesyonel bir kuyumcuya danışın."
  }
};

let currentLocale = 'en'; // Default before initialization

// Synchronously get preferred locale and set it.
export function initI18n() {
  const storedLocale = localStorage.getItem('ringSizerAppLang');
  if (storedLocale && (storedLocale === 'en' || storedLocale === 'tr')) {
    currentLocale = storedLocale;
  } else {
    const browserLang = navigator.language.split('-')[0].toLowerCase();
    currentLocale = browserLang === 'tr' ? 'tr' : 'en';
  }
  return currentLocale;
}

export function setLocale(locale) {
  if (embeddedTranslations[locale]) {
    currentLocale = locale;
    localStorage.setItem('ringSizerAppLang', locale);
  } else {
    console.warn(`Locale ${locale} data not found. Defaulting to 'en'.`);
    currentLocale = 'en';
    localStorage.setItem('ringSizerAppLang', 'en');
  }
}

export function getCurrentLocale() {
  return currentLocale;
}

export function t(key, replacements) {
  let translation = embeddedTranslations[currentLocale]?.[key] || embeddedTranslations['en']?.[key];

  if (translation === undefined) {
    console.warn(`Translation key "${key}" not found for locale "${currentLocale}" or fallback "en".`);
    translation = key;
  }

  if (replacements && translation) {
    Object.entries(replacements).forEach(([placeholder, value]) => {
      const regex = new RegExp(`\\{\\{${placeholder}\\}\\}`, 'g');
      translation = translation.replace(regex, String(value));
    });
  }
  return translation || key;
}
