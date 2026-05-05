import type { Lang } from "./i18n"

export interface UiStrings {
  // Hero
  heroKicker: string
  heroTitle: string
  heroLead: string
  heroReadOnline: string
  // Common buttons
  downloadPdf: string
  // Header / reader chrome
  defaultHeaderTitle: string
  defaultHeaderSubtitle: string
  introduction: string
  appendixPrefix: string
  partPrefix: string
  // Table of contents
  tocHeading: string
  tocPart: string
  tocIntro: string
  tocAppendix: string
  // Footer
  footerReadOnline: string
  footerTagline: string
  // Download dropdown
  downloadOptionEnglish: string
  downloadOptionSpanish: string
  // Language switcher (a11y)
  langSwitchLabel: string
}

const en: UiStrings = {
  heroKicker: "The Sovereign Reconstruction Blueprint",
  heroTitle: "The Path to a First-World Venezuela",
  heroLead:
    "The 10-year Blueprint to Rebuild a First-Class Global Economy. The most comprehensive sovereign reconstruction undertaken in the 21st century.",
  heroReadOnline: "Read online",
  downloadPdf: "Download PDF",
  defaultHeaderTitle: "Venezuela First World",
  defaultHeaderSubtitle: "The Sovereign Reconstruction Blueprint",
  introduction: "Introduction",
  appendixPrefix: "Appendix",
  partPrefix: "Part",
  tocHeading: "Table of Contents",
  tocPart: "Part",
  tocIntro: "INTRO",
  tocAppendix: "APPENDIX",
  footerReadOnline: "Read Online",
  footerTagline: "The Sovereign Reconstruction Blueprint",
  downloadOptionEnglish: "English",
  downloadOptionSpanish: "Español",
  langSwitchLabel: "Switch language",
}

const es: UiStrings = {
  heroKicker: "El Plan de Reconstrucción Soberana",
  heroTitle: "El camino hacia una Venezuela del primer mundo",
  heroLead:
    "El plan de 10 años para reconstruir una economía global de primera clase. La reconstrucción soberana más completa emprendida en el siglo XXI.",
  heroReadOnline: "Leer en línea",
  downloadPdf: "Descargar PDF",
  defaultHeaderTitle: "Venezuela Primer Mundo",
  defaultHeaderSubtitle: "El Plan de Reconstrucción Soberana",
  introduction: "Introducción",
  appendixPrefix: "Apéndice",
  partPrefix: "Parte",
  tocHeading: "Tabla de contenido",
  tocPart: "Parte",
  tocIntro: "INTRO",
  tocAppendix: "APÉNDICE",
  footerReadOnline: "Leer en línea",
  footerTagline: "El Plan de Reconstrucción Soberana",
  downloadOptionEnglish: "English",
  downloadOptionSpanish: "Español",
  langSwitchLabel: "Cambiar idioma",
}

const dictionaries: Record<Lang, UiStrings> = { en, es }

export function getStrings(lang: Lang): UiStrings {
  return dictionaries[lang]
}
