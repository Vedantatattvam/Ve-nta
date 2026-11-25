export interface SisterRepository {
  id: string;
  name: string;
  sanskritName: string;
  domain: string;
  url: string;
  subtitle: string;
  description: string;
}

export const SISTER_REPOSITORIES: SisterRepository[] = [
  {
    id: "rasasarani",
    name: "RasaSāraṇī",
    sanskritName: "रससारणी",
    domain: "rasasarani.in",
    url: "https://rasasarani.in",
    subtitle: "Alaṅkāraśāstra, Poetics & Aesthetic Theory",
    description:
      "A sister scholarly repository dedicated to Indian aesthetics, Rasa theory, Nāṭyaśāstra, Kāvyaśāstra, and classical Sanskrit poetics.",
  },
  {
    id: "tarkavidya",
    name: "TarkaVidyā",
    sanskritName: "तर्कविद्या",
    domain: "tarkavidya.com",
    url: "https://tarkavidya.com",
    subtitle: "Nyāya, Vaiśeṣika & Indian Logic",
    description:
      "A sister scholarly repository dedicated to Nyāya-Vaiśeṣika, Navya-Nyāya dialectics, Pramāṇaśāstra, and classical Indian epistemology.",
  },
];
