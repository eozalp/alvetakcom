import { t } from './i18n.js';

// Enum InputType converted to a JS object
export const InputType = {
  DIAMETER_MM: "DIAMETER_MM",
  CIRCUMFERENCE_MM: "CIRCUMFERENCE_MM",
  US_CA: "US_CA",
  UK_AU_NZ_IE_ZA: "UK_AU_NZ_IE_ZA",
  EU_ISO: "EU_ISO",
  JP_CN_SA: "JP_CN_SA",
  CH: "CH",
  IT_ES_NL_TR: "IT_ES_NL_TR"
};

// Keys for translation, to be used with the t() function
export const InputTypeLabelKeys = {
  [InputType.DIAMETER_MM]: "inputType.diameter_mm",
  [InputType.CIRCUMFERENCE_MM]: "inputType.circumference_mm",
  [InputType.US_CA]: "inputType.us_ca",
  [InputType.UK_AU_NZ_IE_ZA]: "inputType.uk_au_nz_ie_za",
  [InputType.EU_ISO]: "inputType.eu_iso",
  [InputType.JP_CN_SA]: "inputType.jp_cn_sa",
  [InputType.CH]: "inputType.ch",
  [InputType.IT_ES_NL_TR]: "inputType.it_es_nl_tr",
};

// Helper function to get the translated label for an InputType
export function getTranslatedInputTypeLabel(inputType) {
  return t(InputTypeLabelKeys[inputType]);
}

// Maps InputType to the corresponding key in RingSizeEntry for direct lookups
export const SizeSystemKeys = {
  [InputType.DIAMETER_MM]: 'diameter_mm',
  [InputType.CIRCUMFERENCE_MM]: 'circumference_mm',
  [InputType.US_CA]: 'us_ca',
  [InputType.UK_AU_NZ_IE_ZA]: 'uk_au_nz_ie_za',
  [InputType.EU_ISO]: 'eu_iso',
  [InputType.JP_CN_SA]: 'jp_cn_sa',
  [InputType.CH]: 'ch',
  [InputType.IT_ES_NL_TR]: 'it_es_nl_tr',
};

// Defines the order and label keys for displaying results
export const DisplayCategoryConfigs = [
  { key: "diameter_mm", labelKey: "displayCategory.diameter_mm" },
  { key: "circumference_mm", labelKey: "displayCategory.circumference_mm" },
  { key: "us_ca", labelKey: "displayCategory.us_ca" },
  { key: "uk_au_nz_ie_za", labelKey: "displayCategory.uk_au_nz_ie_za" },
  { key: "eu_iso", labelKey: "displayCategory.eu_iso" },
  { key: "jp_cn_sa", labelKey: "displayCategory.jp_cn_sa" },
  { key: "ch", labelKey: "displayCategory.ch" },
  { key: "it_es_nl_tr", labelKey: "displayCategory.it_es_nl_tr" },
];