export type PtClusterId =
  | "capacidade-tamanho"
  | "concorrentes-alternativas"
  | "drones-gis-topografia"
  | "audiovisual-cinema-raw"
  | "engenharia-bim-3d-b2b"
  | "whatsapp-email-operadoras";

export type CompactPageSeed = {
  slug: string;
  cluster: PtClusterId;
  enEquivalent: string;
  vol: number;
  cpc: number;
  intent: "transactional" | "commercial" | "informational";
  kw: string;
  secKws: string[];
  pills: string[];
  h1: string;
  title: string;
  desc: string;
  eyebrow: string;
  intro: string;
  cta: string;
  note: string;
  secHeading: string;
  secBody: string;
  compName: string;
  compBest: string;
  compLimit: string;
  compAngle: string;
  faq1Q: string;
  faq1A: string;
  faq2Q: string;
  faq2A: string;
};
