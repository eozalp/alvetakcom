// Embed translations directly
const embeddedTranslations = {
  en: {
    "app.title": "alvetak: International Ring Size Converter",
    "app.subtitle": "Find ring sizes with manual entry or our visual on-screen sizer. Your companion by alvetak.",
    "app.tabListLabel": "Ring Sizing Methods",
    "app.manualTab": "Manual Size Entry",
    "app.visualTab": "Visual Ring Sizer",
    "app.visualSizer.title": "Visual On-Screen Sizer",
    "app.visualSizer.instruction": "Place your ring on the screen. Adjust the slider until the blue circle's inner edge aligns with your ring's inner edge.",
    "app.footer.copyright": "alvetak. For reference purposes only.",
    "app.footer.professionalAdvice": "Always confirm your size with a professional jeweler for important purchases.",
    "app.footer.decorativeLogoAlt": "alvetak decorative element",
    "app.loading": "Loading application...",

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
    "visualSizer.instructionHighlight": "Adjust the slider below until the <strong class=\"font-semibold\">inner edge of the blue circle</strong> aligns with the <strong class=\"font-semibold\">inner edge of your ring</strong>.",
    "visualSizer.sliderLabel": "Adjust Ring Diameter",
    "visualSizer.diameterLabel": "Diameter",
    "visualSizer.circumferenceLabel": "Circumference",
    "visualSizer.calculatedInputValue": "{{value}} mm (Calculated)",
    "visualSizer.accuracyDisclaimerTitle": "Accuracy Disclaimer:",
    "visualSizer.accuracyDisclaimerContent": "This visual sizer relies on a standard screen PPI. Actual screen PPI varies, potentially affecting accuracy. For precise measurements, consult a professional jeweler."
  },
  tr: {
    "app.title": "alvetak: Uluslararası Yüzük Ölçüsü Dönüştürücü",
    "app.subtitle": "Manuel girişle veya görsel ekran ölçerimizle yüzük ölçülerini bulun. alvetak yardımcınız.",
    "app.tabListLabel": "Yüzük Ölçüsü Bulma Yöntemleri",
    "app.manualTab": "Manuel Ölçü Girişi",
    "app.visualTab": "Görsel Yüzük Ölçer",
    "app.visualSizer.title": "Görsel Ekran Üzeri Ölçer",
    "app.visualSizer.instruction": "Yüzüğünüzü ekrana yerleştirin. Mavi dairenin iç kenarı yüzüğünüzün iç kenarıyla hizalanana kadar kaydırıcıyı ayarlayın.",
    "app.footer.copyright": "alvetak. Sadece referans amaçlıdır.",
    "app.footer.professionalAdvice": "Önemli alışverişler için bedeninizi her zaman bir profesyonel kuyumcuya danışarak teyit edin.",
    "app.footer.decorativeLogoAlt": "alvetak dekoratif öğe",
    "app.loading": "Uygulama yükleniyor...",

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
    "visualSizer.instructionHighlight": "Aşağıdaki kaydırıcıyı, <strong class=\"font-semibold\">mavi dairenin iç kenarı</strong> yüzüğünüzün <strong class=\"font-semibold\">iç kenarıyla</strong> hizalanana kadar ayarlayın.",
    "visualSizer.sliderLabel": "Yüzük Çapını Ayarla",
    "visualSizer.diameterLabel": "Çap",
    "visualSizer.circumferenceLabel": "Çevre",
    "visualSizer.calculatedInputValue": "{{value}} mm (Hesaplandı)",
    "visualSizer.accuracyDisclaimerTitle": "Doğruluk Uyarısı:",
    "visualSizer.accuracyDisclaimerContent": "Bu görsel ölçer standart bir ekran PPI değerine dayanır. Gerçek ekran PPI değeri değişiklik gösterebilir ve bu durum doğruluğu etkileyebilir. Kesin ölçümler için bir profesyonel kuyumcuya danışın."
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
  console.log('i18n initialized. Translations are embedded. Current locale:', currentLocale);
  return currentLocale;
}

export function setLocale(locale) {
  if (embeddedTranslations[locale]) {
    currentLocale = locale;
    localStorage.setItem('ringSizerAppLang', locale);
  } else {
    console.warn(`Locale ${locale} data not found. Defaulting to 'en'.`);
    currentLocale = 'en'; // Should not happen if en is always embedded
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
    translation = key; // Return the key itself if not found
  }

  if (replacements && translation) {
    Object.entries(replacements).forEach(([placeholder, value]) => {
      const regex = new RegExp(`\\{\\{${placeholder}\\}\\}`, 'g');
      translation = translation.replace(regex, String(value));
    });
  }
  return translation || key; // Ensure some string is returned
}