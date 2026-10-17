export type PtEngineeringGuide = {
  slug: string;
  enEquivalent: string;
  title: string;
  metaDescription: string;
  h1: string;
  eyebrow: string;
  readTime: string;
  primaryKeyword: string;
  summary: string;
  sections: Array<{
    heading: string;
    body: string;
  }>;
  relatedPtSlugs: Array<{
    href: string;
    label: string;
  }>;
};

export const PT_ENGINEERING_GUIDES: PtEngineeringGuide[] = [
  {
    slug: "por-que-upload-de-arquivos-grandes-e-lento-ou-cai",
    enEquivalent: "/guides/why-large-file-transfers-are-slow",
    title: "Por Que o Upload Cai em 99% no Brasil (e Solução) | GigaSend",
    metaDescription:
      "Veja por que envios acima de 20GB dão timeout na Claro, Vivo e Starlink e como o streaming multiparte HTTP/3 em São Paulo e Rio resolve quedas em 99%.",
    h1: "Por Que o Upload de Arquivos Grandes É Lento ou Cai em 99% nas Operadoras Brasileiras",
    eyebrow: "Engenharia de Redes & Borda • IX.br São Paulo (GRU) & Rio (GIG)",
    readTime: "6 min de leitura",
    primaryKeyword: "upload de arquivo grande caindo em 99 por cento",
    summary:
      "Quando você tenta enviar um arquivo de 50GB ou 100GB para servidores localizados na Virgínia (EUA) ou na Europa, o protocolo TCP sofre com latência alta (>140ms), perda de pacotes e resets de sessão NAT nas operadoras brasileiras.",
    sections: [
      {
        heading: "1. O Gargalo da Latência Internacional (RTT > 140ms) no TCP",
        body: "Plataformas tradicionais de transferência recebem seus dados em datacenters nos Estados Unidos ou na Europa. Em uma conexão de fibra óptica de 300 Mbps a 600 Mbps da Claro, Vivo ou Oi Fibra, qualquer micro-perda de pacotes ao atravessar cabos submarinos reduz drasticamente a janela de transmissão TCP, derrubando sua velocidade real de upload para uma fração da banda contratada.",
      },
      {
        heading: "2. Por Que o Upload Trava Exatamente em 99% no Navegador?",
        body: "Muitos serviços antigos enviam o arquivo como um único fluxo HTTP monolítico (single-stream POST) ou exigem que o servidor de destino remonte e compacte o pacote inteiro antes de confirmar o recebimento. Se a sessão expirar durante essa etapa final — ou se houver uma troca de satélite na Starlink (handover de 2 a 4 segundos) — o navegador perde o soquete e todo o envio é descartado.",
      },
      {
        heading: "3. A Solução: Streaming Multiparte HTTP/3 na Borda de São Paulo e Rio de Janeiro",
        body: "O GigaSend fatia automaticamente seu arquivo de 50GB, 100GB ou 500GB em blocos independentes diretamente na memória do navegador (sem ocupar o disco rígido) e transmite múltiplos fluxos paralelos para os servidores CDN de São Paulo (GRU) e Rio de Janeiro (GIG). Cada bloco é validado com hash criptográfico SHA-256 assim que chega à borda brasileira.",
      },
    ],
    relatedPtSlugs: [
      { href: "/pt/upload-arquivos-grandes-claro-vivo-oi-fibra", label: "Upload rápido na Claro, Vivo e Oi Fibra" },
      { href: "/pt/enviar-arquivos-pesados-starlink-brasil", label: "Enviar arquivos pesados via Starlink no Brasil" },
      { href: "/pt/resolver-erro-upload-travado-99-por-cento-timeout", label: "Resolver erro de upload travado em 99%" },
      { href: "/pt/calculadora-tempo-upload", label: "Calculadora de tempo de upload na fibra brasileira" },
    ],
  },
  {
    slug: "calculadora-custo-transferencia-arquivos-pre-pago-vs-assinatura",
    enEquivalent: "/guides/large-file-transfer-cost-calculator",
    title: "Custo de Envio: Pré-Pago 12 Meses vs Mensalidade | GigaSend",
    metaDescription:
      "Comparativo financeiro para produtoras, drones e engenharia no Brasil: economize até 80% trocando assinaturas mensais em dólar ou Sedex por pacotes de 12 meses.",
    h1: "Análise de Custo: Pacotes Pré-Pagos (12 Meses) vs Assinaturas Mensais e Envio de HD via Sedex",
    eyebrow: "Gestão Financeira para Produtoras, Drones & Engenharia B2B",
    readTime: "5 min de leitura",
    primaryKeyword: "transferir arquivos grandes sem assinatura mensal",
    summary:
      "Produtoras audiovisuais, pilotos de drone e escritórios de engenharia operam por projetos e safras. Pagar mensalidades fixas em dólar durante meses sem gravações ou despachar SSDs pelos Correios drena a margem de lucro.",
    sections: [
      {
        heading: "1. O Custo Oculto das Assinaturas Mensais (WeTransfer Pro, Dropbox, Frame.io)",
        body: "Assinaturas tradicionais cobram de US$ 15 a US$ 30 todos os meses (US$ 180 a US$ 360 por ano por usuário), independentemente de você ter enviado 10 arquivos ou nenhum. Pior: quando você precisa entregar um pacote de 250GB ou 500GB de uma só vez, muitas dessas contas ainda barram o envio no teto de 200GB.",
      },
      {
        heading: "2. A Armadilha da Cobrança por Download (MASV) e do Frete de HD/SSD via Sedex",
        body: "Plataformas pay-as-you-go estrangeiras como o MASV cobram US$ 0,25 por GB em cada download: se 4 pessoas da agência ou construtora baixarem um projeto de 100GB (400GB baixados), você paga US$ 100 por uma única entrega. Já comprar um SSD externo + frete Sedex entre estados custa facilmente R$ 550 a R$ 900 e leva dias para chegar.",
      },
      {
        heading: "3. Como Funciona o Modelo Pré-Pago de 12 Meses do GigaSend ($20/100GB • $180/1TB)",
        body: "No GigaSend você envia até 25GB gratuitamente. Para volumes maiores, você ativa pacotes pré-pagos ($10 por 50GB, $20 por 100GB ou $180 por 1TB) com validade de 12 meses inteiros. Não há cobrança mensal recorrente e seu cliente baixa com Zero Cadastro na velocidade máxima da CDN em São Paulo e Rio.",
      },
    ],
    relatedPtSlugs: [
      { href: "/pt/planos", label: "Ver planos pré-pagos do GigaSend ($20/100GB • $180/1TB)" },
      { href: "/pt/comparar", label: "Comparativo GigaSend vs WeTransfer, Drive e MASV" },
      { href: "/pt/substituir-envio-hd-externo-pendrive-correios", label: "Substituir envio de HD externo via Sedex" },
      { href: "/pt/alternativa-masv-filemail-smash-brasil", label: "Alternativa mais barata ao MASV no Brasil" },
    ],
  },
  {
    slug: "como-entregar-mapeamento-drone-anac-sisant-ortomosaico-lidar",
    enEquivalent: "/guides/transfer-large-files-without-failed-uploads",
    title: "Como Entregar Ortomosaicos GeoTIFF e LiDAR (ANAC) | GigaSend",
    metaDescription:
      "Manual técnico para drones comerciais (ANAC SISANT) e topografia: entregue ortofotos GeoTIFF, nuvens LiDAR (.LAS/.LAZ) e projetos Pix4D/Metashape sem erro ZIP.",
    h1: "Como Entregar Levantamentos de Drone (ANAC SISANT), Ortomosaicos GeoTIFF e LiDAR para Clientes",
    eyebrow: "Engenharia Cartográfica, Aerofotogrametria & Topografia no Brasil",
    readTime: "7 min de leitura",
    primaryKeyword: "como entregar arquivos de aerolevantamento para clientes",
    summary:
      "Com mais de 186.000 drones comerciais registrados no SISANT da ANAC, o maior gargalo das empresas de aerolevantamento deixou de ser o voo em campo e passou a ser a entrega de pacotes de 30GB a 300GB para o contratante.",
    sections: [
      {
        heading: "1. Por Que o Google Drive Corrompe Entregas de Ortomosaicos e Shapefiles?",
        body: "Quando você sobe uma pasta de projeto contendo um ortomosaico GeoTIFF (.tif + .tfw), curvas de nível (.dwg), nuvem de pontos (.las/.laz) e camadas Shapefile (.shp, .shx, .dbf, .prj) no Google Drive, a plataforma divide o download do cliente em múltiplos arquivos .ZIP arbitrários de 2GB. O engenheiro do cliente descompacta apenas a primeira parte e perde os arquivos auxiliares de projeção SIRGAS 2000.",
      },
      {
        heading: "2. Descarregamento Direto do Campo via Starlink (Caminhonete -> Escritório)",
        body: "Equipes que operam DJI Mavic 3 Enterprise RTK, Mavic 3 Multispectral ou Matrice 350 RTK com sensor LiDAR Zenmuse L2 em fazendas no Mato Grosso, Goiás ou minas em Minas Gerais usam o GigaSend para enviar os cartões SD direto do campo via Starlink para a equipe de processamento no escritório.",
      },
      {
        heading: "3. Entrega Executiva com Zero Cadastro para o Engenheiro ou Incorporadora",
        body: "Ao finalizar o processamento no Agisoft Metashape, Pix4Dmapper ou DJI Terra, gere um único link no GigaSend. O engenheiro da construtora, mineradora ou fazenda clica no link e baixa os 50GB ou 200GB direto na máquina de trabalho, sem precisar criar conta ou pedir liberação de acesso.",
      },
    ],
    relatedPtSlugs: [
      { href: "/pt/transferir-ortomosaico-tiff", label: "Transferir ortomosaicos GeoTIFF (.TIFF/.TFW)" },
      { href: "/pt/enviar-nuvem-de-pontos-lidar-las-laz", label: "Enviar nuvem de pontos LiDAR (.LAS/.LAZ)" },
      { href: "/pt/enviar-projeto-pix4d-agisoft-metashape", label: "Enviar projetos Pix4D e Agisoft Metashape" },
      { href: "/pt/transferir-dados-drone-dji-rtk-starlink-campo", label: "Transferir dados de drone RTK via Starlink" },
    ],
  },
  {
    slug: "como-enviar-arquivos-pesados-sem-lotar-hd-ou-nuvem",
    enEquivalent: "/guides/send-large-files-without-filling-computer",
    title: "Enviar 50GB–500GB Sem Lotar o Google Drive ou SSD | GigaSend",
    metaDescription:
      "Aprenda como funciona a transferência transitória direta do navegador: envie 50GB, 100GB ou 500GB sem ocupar sua cota do Google Drive e sem duplicar o SSD.",
    h1: "Como Transferir Arquivos Gigantes Sem Lotar Sua Cota da Nuvem ou Duplicar o SSD Local",
    eyebrow: "Arquitetura de Transferência Transitória vs Armazenamento em Nuvem",
    readTime: "5 min de leitura",
    primaryKeyword: "enviar arquivo maior que 15gb sem google drive",
    summary:
      "Usar cofres de armazenamento permanente (Google Drive, Dropbox ou OneDrive) como correio de arquivos pesados obriga você a pagar por terabytes de espaço só para entregar um projeto que o cliente vai baixar uma única vez.",
    sections: [
      {
        heading: "1. Por Que Compactar Pastas de 80GB em .ZIP Lota o SSD do Seu Mac ou PC?",
        body: "Se você tem uma pasta de 80GB no computador e tenta criar um arquivo .ZIP antes de enviar, o sistema operacional precisa de mais 80GB livres no SSD para escrever o arquivo compactado — travando computadores com discos quase cheios. No GigaSend, o fatiamento ocorre em blocos na memória RAM em tempo real durante o upload.",
      },
      {
        heading: "2. Pare de Lotar os 15GB do Seu Gmail/Google Drive com Entregas de Clientes",
        body: "A cota gratuita de 15GB do Google é compartilhada entre o Google Drive, o Gmail e o Google Fotos. Subir um único vídeo 4K de 16GB bloqueia o recebimento de e-mails da sua conta profissional até que você apague arquivos ou assine planos mensais.",
      },
      {
        heading: "3. Fluxo Limpo: Suba, Entregue com 1 Clique e Mantenha Sua Nuvem Livre",
        body: "Com o GigaSend, você transfere até 25GB gratuitamente (ou pacotes de 50GB, 100GB e 1TB válidos por 12 meses) em um canal dedicado de trânsito rápido em São Paulo e Rio de Janeiro, mantendo seu Google Drive e seu SSD local 100% livres.",
      },
    ],
    relatedPtSlugs: [
      { href: "/pt/alternativa-google-drive-arquivos-grandes", label: "Alternativa ao Google Drive para arquivos grandes" },
      { href: "/pt/enviar-arquivo-15gb-gratis", label: "Enviar arquivo de 15GB grátis sem lotar o Drive" },
      { href: "/pt/enviar-pastas-grandes-sem-compactar-zip", label: "Enviar pastas grandes sem compactar em .ZIP" },
      { href: "/pt/enviar-arquivos-pesados", label: "Enviar arquivos pesados (até 25GB grátis)" },
    ],
  },
  {
    slug: "como-enviar-videos-4k-raw-whatsapp-email-sem-comprimir",
    enEquivalent: "/guides/file-transfer-vs-cloud-storage-vs-media-review",
    title: "Enviar Vídeos 4K/RAW no WhatsApp Sem Comprimir | GigaSend",
    metaDescription:
      "Saiba como mandar vídeos 4K/8K, Apple ProRes e Blackmagic RAW pelo WhatsApp ou Gmail/Outlook no Brasil mantendo 100% do bitrate original e sem pedir login.",
    h1: "Como Enviar Vídeos 4K, ProRes e BRAW no WhatsApp e E-mail Sem Perder Qualidade",
    eyebrow: "Guia para Produtoras, Filmmakers, Editores e Agências de Social Media",
    readTime: "6 min de leitura",
    primaryKeyword: "como enviar video pesado no whatsapp sem perder qualidade",
    summary:
      "Enviar um vídeo diretamente pelo WhatsApp reduz a resolução, destrói a gradação de cor 10-bit e barra qualquer arquivo acima de 2GB. Veja como entregar o arquivo master original por link direto.",
    sections: [
      {
        heading: "1. O Que o WhatsApp Faz com o Seu Vídeo 4K?",
        body: "Mesmo quando enviado como 'Documento', o WhatsApp impõe um teto rígido de 2GB e frequentemente trava o aplicativo no celular do cliente ao tentar baixar vídeos grandes. E quando enviado como mídia normal, o algoritmo reduz o bitrate em até 85%, gerando macroblocos visíveis no Instagram Reels, TikTok ou YouTube.",
      },
      {
        heading: "2. Como Superar os 25MB do Gmail e 20MB do Outlook Corporativo",
        body: "Servidores de e-mail corporativos rejeitam qualquer anexo de vídeo em alta definição. Ao subir seu arquivo .MOV, .MP4, ProRes ou BRAW no GigaSend, você obtém um link HTTPS limpo e confiável que passa por qualquer filtro corporativo.",
      },
      {
        heading: "3. O Fluxo de 1 Clique no Celular ou Computador do Cliente",
        body: "Você cola o link do GigaSend diretamente na conversa do WhatsApp ou no corpo do e-mail. Seu cliente toca no link e baixa o vídeo 4K/8K original na velocidade máxima dos servidores CDN de São Paulo e Rio de Janeiro — com Zero Cadastro e sem precisar instalar nenhum aplicativo.",
      },
    ],
    relatedPtSlugs: [
      { href: "/pt/como-enviar-video-pesado-whatsapp-sem-perder-qualidade", label: "Enviar vídeo pesado no WhatsApp sem perder qualidade" },
      { href: "/pt/enviar-arquivos-grandes-por-email-gmail-outlook", label: "Enviar arquivos grandes por e-mail (Gmail/Outlook)" },
      { href: "/pt/transferir-videos-4k", label: "Transferir vídeos 4K e 8K sem compressão" },
      { href: "/pt/enviar-prores-raw", label: "Enviar Apple ProRes 422 HQ e ProRes RAW" },
    ],
  },
];

export const ptGuideMap = new Map(PT_ENGINEERING_GUIDES.map((g) => [g.slug, g]));
