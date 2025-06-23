import { t } from './i18n';

export interface RingSizeEntry {
  id: number;
  diameter_mm: number;
  circumference_mm: number;
  us_ca: string;
  uk_au_nz_ie_za: string; // UK, Australia, New Zealand, Ireland, South Africa
  eu_iso: string; // Europe (ISO 8653), often circumference, or specific French/German sizes
  jp_cn_sa: string; // Japan, China, South America
  ch: string; // Switzerland
  it_es_nl_tr: string; // Italy, Spain, Netherlands, Turkey
}

export enum InputType {
  DIAMETER_MM = "DIAMETER_MM",
  CIRCUMFERENCE_MM = "CIRCUMFERENCE_MM",
  US_CA = "US_CA",
  UK_AU_NZ_IE_ZA = "UK_AU_NZ_IE_ZA",
  EU_ISO = "EU_ISO",
  JP_CN_SA = "JP_CN_SA",
  CH = "CH",
  IT_ES_NL_TR = "IT_ES_NL_TR"
}

// Keys for translation, to be used with the t() function
export const InputTypeLabelKeys: Record<InputType, string> = {
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
export function getTranslatedInputTypeLabel(inputType: InputType): string {
  return t(InputTypeLabelKeys[inputType]);
}

// Maps InputType to the corresponding key in RingSizeEntry for direct lookups
export const SizeSystemKeys: Record<InputType, keyof RingSizeEntry | null> = {
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
export const DisplayCategoryConfigs: { key: keyof RingSizeEntry; labelKey: string }[] = [
  { key: "diameter_mm", labelKey: "displayCategory.diameter_mm" },
  { key: "circumference_mm", labelKey: "displayCategory.circumference_mm" },
  { key: "us_ca", labelKey: "displayCategory.us_ca" },
  { key: "uk_au_nz_ie_za", labelKey: "displayCategory.uk_au_nz_ie_za" },
  { key: "eu_iso", labelKey: "displayCategory.eu_iso" },
  { key: "jp_cn_sa", labelKey: "displayCategory.jp_cn_sa" },
  { key: "ch", labelKey: "displayCategory.ch" },
  { key: "it_es_nl_tr", labelKey: "displayCategory.it_es_nl_tr" },
];