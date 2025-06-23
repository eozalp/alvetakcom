// This is a sample dataset. A comprehensive list would be much larger.
// Sizes can vary slightly by jeweler. This chart aims for common values.
// EU/ISO is often based on circumference in mm. Some EU countries use other systems.
// CH (Switzerland) sizes are often (EU Size - 40).
// IT/ES/NL/TR often use EU sizes minus a specific offset or their own system.
// For simplicity, some of these systems might share values or be close approximations in this sample.
// "-" indicates no direct common equivalent or data not available for this simplified chart.

export const ringSizeData = [
  // Smaller Sizes
  { id: 1, diameter_mm: 11.95, circumference_mm: 37.54, us_ca: "0", uk_au_nz_ie_za: "A", eu_iso: "37.5", jp_cn_sa: "-", ch: "-", it_es_nl_tr: "-" },
  { id: 2, diameter_mm: 12.37, circumference_mm: 38.86, us_ca: "1", uk_au_nz_ie_za: "B", eu_iso: "39", jp_cn_sa: "1", ch: "-", it_es_nl_tr: "-" },
  { id: 3, diameter_mm: 12.78, circumference_mm: 40.15, us_ca: "1.5", uk_au_nz_ie_za: "C", eu_iso: "40", jp_cn_sa: "1", ch: "0.5", it_es_nl_tr: "0" }, // CH usually EU-40
  { id: 4, diameter_mm: 13.21, circumference_mm: 41.50, us_ca: "2", uk_au_nz_ie_za: "D", eu_iso: "41.5", jp_cn_sa: "2", ch: "1.5", it_es_nl_tr: "1" },
  { id: 5, diameter_mm: 13.61, circumference_mm: 42.76, us_ca: "2.5", uk_au_nz_ie_za: "E", eu_iso: "42.75", jp_cn_sa: "3", ch: "2.75", it_es_nl_tr: "3" },
  { id: 6, diameter_mm: 14.05, circumference_mm: 44.14, us_ca: "3", uk_au_nz_ie_za: "F", eu_iso: "44", jp_cn_sa: "4", ch: "4", it_es_nl_tr: "4" },
  { id: 7, diameter_mm: 14.45, circumference_mm: 45.40, us_ca: "3.5", uk_au_nz_ie_za: "G", eu_iso: "45.5", jp_cn_sa: "5", ch: "5.5", it_es_nl_tr: "5" },
  { id: 8, diameter_mm: 14.86, circumference_mm: 46.68, us_ca: "4", uk_au_nz_ie_za: "H", eu_iso: "46.5", jp_cn_sa: "6", ch: "6.5", it_es_nl_tr: "6" },
  { id: 9, diameter_mm: 15.27, circumference_mm: 47.97, us_ca: "4.5", uk_au_nz_ie_za: "I", eu_iso: "48", jp_cn_sa: "7", ch: "8", it_es_nl_tr: "8" },
  // Common Adult Sizes
  { id: 10, diameter_mm: 15.70, circumference_mm: 49.32, us_ca: "5", uk_au_nz_ie_za: "J½", eu_iso: "49.5", jp_cn_sa: "9", ch: "9.5", it_es_nl_tr: "9" }, // Adjusted EU slightly for J 1/2
  { id: 11, diameter_mm: 16.10, circumference_mm: 50.58, us_ca: "5.5", uk_au_nz_ie_za: "K½", eu_iso: "50.5", jp_cn_sa: "10", ch: "10.5", it_es_nl_tr: "10" },
  { id: 12, diameter_mm: 16.51, circumference_mm: 51.87, us_ca: "6", uk_au_nz_ie_za: "L½", eu_iso: "52", jp_cn_sa: "11", ch: "12", it_es_nl_tr: "12" },
  { id: 13, diameter_mm: 16.92, circumference_mm: 53.16, us_ca: "6.5", uk_au_nz_ie_za: "M½", eu_iso: "53", jp_cn_sa: "12", ch: "13", it_es_nl_tr: "13" },
  { id: 14, diameter_mm: 17.35, circumference_mm: 54.51, us_ca: "7", uk_au_nz_ie_za: "N½", eu_iso: "54.5", jp_cn_sa: "13", ch: "14.5", it_es_nl_tr: "14" },
  { id: 15, diameter_mm: 17.75, circumference_mm: 55.76, us_ca: "7.5", uk_au_nz_ie_za: "O½", eu_iso: "55.75", jp_cn_sa: "15", ch: "15.75", it_es_nl_tr: "16" }, // IT/ES often different
  { id: 16, diameter_mm: 18.19, circumference_mm: 57.15, us_ca: "8", uk_au_nz_ie_za: "P½", eu_iso: "57", jp_cn_sa: "16", ch: "17", it_es_nl_tr: "17" },
  { id: 17, diameter_mm: 18.53, circumference_mm: 58.21, us_ca: "8.5", uk_au_nz_ie_za: "Q½", eu_iso: "58.25", jp_cn_sa: "17", ch: "18.25", it_es_nl_tr: "18" },
  { id: 18, diameter_mm: 18.89, circumference_mm: 59.34, us_ca: "9", uk_au_nz_ie_za: "R½", eu_iso: "59.5", jp_cn_sa: "18", ch: "19.5", it_es_nl_tr: "19" },
  { id: 19, diameter_mm: 19.41, circumference_mm: 60.98, us_ca: "9.5", uk_au_nz_ie_za: "S½", eu_iso: "61", jp_cn_sa: "19", ch: "21", it_es_nl_tr: "21" },
  { id: 20, diameter_mm: 19.84, circumference_mm: 62.33, us_ca: "10", uk_au_nz_ie_za: "T½", eu_iso: "62.5", jp_cn_sa: "20", ch: "22.5", it_es_nl_tr: "22" },
  { id: 21, diameter_mm: 20.20, circumference_mm: 63.46, us_ca: "10.5", uk_au_nz_ie_za: "U½", eu_iso: "63.5", jp_cn_sa: "22", ch: "23.5", it_es_nl_tr: "23" },
  { id: 22, diameter_mm: 20.68, circumference_mm: 64.97, us_ca: "11", uk_au_nz_ie_za: "V½", eu_iso: "65", jp_cn_sa: "23", ch: "25", it_es_nl_tr: "25" },
  { id: 23, diameter_mm: 21.08, circumference_mm: 66.22, us_ca: "11.5", uk_au_nz_ie_za: "W½", eu_iso: "66.25", jp_cn_sa: "24", ch: "26.25", it_es_nl_tr: "26" },
  { id: 24, diameter_mm: 21.49, circumference_mm: 67.51, us_ca: "12", uk_au_nz_ie_za: "X½", eu_iso: "67.5", jp_cn_sa: "25", ch: "27.5", it_es_nl_tr: "27" },
  { id: 25, diameter_mm: 21.89, circumference_mm: 68.77, us_ca: "12.5", uk_au_nz_ie_za: "Y½", eu_iso: "68.75", jp_cn_sa: "26", ch: "28.75", it_es_nl_tr: "29" },
  // Larger Sizes
  { id: 26, diameter_mm: 22.33, circumference_mm: 70.15, us_ca: "13", uk_au_nz_ie_za: "Z½", eu_iso: "70", jp_cn_sa: "27", ch: "30", it_es_nl_tr: "30" },
  { id: 27, diameter_mm: 22.60, circumference_mm: 71.00, us_ca: "13.5", uk_au_nz_ie_za: "Z+1", eu_iso: "71", jp_cn_sa: "28", ch: "31", it_es_nl_tr: "31" },
  { id: 28, diameter_mm: 23.01, circumference_mm: 72.28, us_ca: "14", uk_au_nz_ie_za: "Z+2", eu_iso: "72.25", jp_cn_sa: "29", ch: "32.25", it_es_nl_tr: "32" },
  { id: 29, diameter_mm: 23.42, circumference_mm: 73.57, us_ca: "14.5", uk_au_nz_ie_za: "Z+3", eu_iso: "73.5", jp_cn_sa: "30", ch: "33.5", it_es_nl_tr: "33" },
  { id: 30, diameter_mm: 23.83, circumference_mm: 74.86, us_ca: "15", uk_au_nz_ie_za: "Z+4", eu_iso: "75", jp_cn_sa: "31", ch: "35", it_es_nl_tr: "35" },
];