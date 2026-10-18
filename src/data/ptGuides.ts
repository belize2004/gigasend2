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
    title: "Por que o upload cai aos 99% no Brasil (e solução) | Gigasend",
    metaDescription:
      "Veja por que envios acima de 20 GB dão timeout na Claro, Vivo e Starlink e como o streaming multiparte HTTP/3 em São Paulo e Rio resolve quedas aos 99%.",
    h1: "Por que o upload de arquivos grandes é lento ou cai aos 99% nas operadoras brasileiras",
    eyebrow: "Engenharia de redes e borda • IX.br São Paulo (GRU) e Rio (GIG)",
    readTime: "6 min de leitura",
    primaryKeyword: "upload de arquivo grande caindo em 99 por cento",
    summary:
      "Quando você tenta enviar um arquivo de 50 GB ou 100 GB para servidores localizados na Virgínia (EUA) ou na Europa, o protocolo TCP sofre com latência alta (> 140 ms), perda de pacotes e resets de sessão NAT nas operadoras brasileiras.",
    sections: [
      {
        heading: "1. O gargalo da latência internacional (RTT > 140 ms) no TCP",
        body: "Plataformas tradicionais de transferência recebem seus dados em datacenters nos Estados Unidos ou na Europa. Em uma conexão de fibra óptica de 300 Mbps a 600 Mbps da Claro, Vivo ou Oi Fibra, qualquer microperda de pacotes ao atravessar cabos submarinos reduz drasticamente a janela de transmissão TCP, derrubando sua velocidade real de upload para uma fração da banda contratada.",
      },
      {
        heading: "2. Por que o upload trava exatamente aos 99% no navegador?",
        body: "Muitos serviços antigos enviam o arquivo como um único fluxo HTTP monolítico (single-stream POST) ou exigem que o servidor de destino remonte e compacte o pacote inteiro antes de confirmar o recebimento. Se a sessão expirar durante essa etapa final — ou se houver uma troca de satélite na Starlink (handover de 2 a 4 segundos) — o navegador perde o soquete e todo o envio é descartado.",
      },
      {
        heading: "3. A solução: streaming multiparte HTTP/3 na borda de São Paulo e Rio de Janeiro",
        body: "O Gigasend fatia automaticamente seu arquivo de 50 GB, 100 GB ou 500 GB em blocos independentes diretamente na memória do navegador (sem ocupar o disco rígido) e transmite múltiplos fluxos paralelos para os servidores CDN de São Paulo (GRU) e Rio de Janeiro (GIG). Cada bloco é validado com hash criptográfico SHA-256 assim que chega à borda brasileira.",
      },
    ],
    relatedPtSlugs: [
      { href: "/pt/upload-arquivos-grandes-claro-vivo-oi-fibra", label: "Upload rápido na Claro, Vivo e Oi Fibra" },
      { href: "/pt/enviar-arquivos-pesados-starlink-brasil", label: "Enviar arquivos pesados via Starlink no Brasil" },
      { href: "/pt/resolver-erro-upload-travado-99-por-cento-timeout", label: "Resolver erro de upload travado aos 99%" },
      { href: "/pt/calculadora-tempo-upload", label: "Calculadora de tempo de upload na fibra brasileira" },
    ],
  },
  {
    slug: "calculadora-custo-transferencia-arquivos-pre-pago-vs-assinatura",
    enEquivalent: "/guides/large-file-transfer-cost-calculator",
    title: "Custo de envio: pré-pago de 12 meses vs mensalidade | Gigasend",
    metaDescription:
      "Comparativo financeiro para produtoras, drones e engenharia no Brasil: economize até 80% trocando assinaturas mensais em dólar ou Sedex por pacotes de 12 meses.",
    h1: "Análise de custo: pacotes pré-pagos (12 meses) vs assinaturas mensais e envio de HD via Sedex",
    eyebrow: "Gestão financeira para produtoras, drones e engenharia B2B",
    readTime: "5 min de leitura",
    primaryKeyword: "transferir arquivos grandes sem assinatura mensal",
    summary:
      "Produtoras audiovisuais, pilotos de drone e escritórios de engenharia operam por projetos e safras. Pagar mensalidades fixas em dólar durante meses sem gravações ou despachar SSDs pelos Correios drena a margem de lucro.",
    sections: [
      {
        heading: "1. O custo oculto das assinaturas mensais (WeTransfer Pro, Dropbox, Frame.io)",
        body: "Assinaturas tradicionais cobram de US$ 15 a US$ 30 todos os meses (US$ 180 a US$ 360 por ano por usuário), independentemente de você ter enviado 10 arquivos ou nenhum. Pior: quando você precisa entregar um pacote de 250 GB ou 500 GB de uma só vez, muitas dessas contas ainda barram o envio no teto de 200 GB.",
      },
      {
        heading: "2. A armadilha da cobrança por download (MASV) e do frete de HD/SSD via Sedex",
        body: "Plataformas pay-as-you-go estrangeiras como o MASV cobram US$ 0,25 por GB em cada download: se 4 pessoas da agência ou construtora baixarem um projeto de 100 GB (400 GB baixados), você paga US$ 100 por uma única entrega. Já comprar um SSD externo + frete Sedex entre estados custa facilmente R$ 550 a R$ 900 e leva dias para chegar.",
      },
      {
        heading: "3. Como funciona o modelo pré-pago de 12 meses do Gigasend (US$ 20/100 GB • US$ 180/1 TB)",
        body: "No Gigasend você envia até 10 GB gratuitamente (com retenção de 3 dias). Para volumes maiores, você ativa pacotes pré-pagos (US$ 10 por 50 GB, US$ 20 por 100 GB, US$ 180 por 1 TB ou US$ 800 por 5 TB) com validade de 12 meses inteiros. Não há cobrança mensal recorrente e seu cliente baixa com zero cadastro na velocidade máxima da CDN em São Paulo e Rio.",
      },
    ],
    relatedPtSlugs: [
      { href: "/pt/planos", label: "Ver planos pré-pagos do Gigasend (US$ 20/100 GB • US$ 180/1 TB)" },
      { href: "/pt/comparar", label: "Comparativo Gigasend vs WeTransfer, Drive e MASV" },
      { href: "/pt/substituir-envio-hd-externo-pendrive-correios", label: "Substituir envio de HD externo via Sedex" },
      { href: "/pt/alternativa-masv-filemail-smash-brasil", label: "Alternativa mais barata ao MASV no Brasil" },
    ],
  },
  {
    slug: "como-entregar-mapeamento-drone-anac-sisant-ortomosaico-lidar",
    enEquivalent: "/guides/transfer-large-files-without-failed-uploads",
    title: "Como entregar ortomosaicos GeoTIFF e LiDAR (ANAC) | Gigasend",
    metaDescription:
      "Manual técnico para drones comerciais (ANAC SISANT) e topografia: entregue ortofotos GeoTIFF, nuvens LiDAR (.LAS/.LAZ) e projetos Pix4D/Metashape sem erro ZIP.",
    h1: "Como entregar levantamentos de drone (ANAC SISANT), ortomosaicos GeoTIFF e LiDAR para clientes",
    eyebrow: "Engenharia cartográfica, aerofotogrametria e topografia no Brasil",
    readTime: "7 min de leitura",
    primaryKeyword: "como entregar arquivos de aerolevantamento para clientes",
    summary:
      "Com mais de 186.000 drones comerciais registrados no SISANT da ANAC, o maior gargalo das empresas de aerolevantamento deixou de ser o voo em campo e passou a ser a entrega de pacotes de 30 GB a 300 GB para o contratante.",
    sections: [
      {
        heading: "1. Por que o Google Drive corrompe entregas de ortomosaicos e Shapefiles?",
        body: "Quando você sobe uma pasta de projeto contendo um ortomosaico GeoTIFF (.tif + .tfw), curvas de nível (.dwg), nuvem de pontos (.las/.laz) e camadas Shapefile (.shp, .shx, .dbf, .prj) no Google Drive, a plataforma divide o download do cliente em múltiplos arquivos .ZIP arbitrários de 2 GB. O engenheiro do cliente descompacta apenas a primeira parte e perde os arquivos auxiliares de projeção SIRGAS 2000.",
      },
      {
        heading: "2. Descarregamento direto do campo via Starlink (caminhonete → escritório)",
        body: "Equipes que operam DJI Mavic 3 Enterprise RTK, Mavic 3 Multispectral ou Matrice 350 RTK com sensor LiDAR Zenmuse L2 em fazendas no Mato Grosso, Goiás ou minas em Minas Gerais usam o Gigasend para enviar os cartões SD direto do campo via Starlink para a equipe de processamento no escritório.",
      },
      {
        heading: "3. Entrega executiva com zero cadastro para o engenheiro ou incorporadora",
        body: "Ao finalizar o processamento no Agisoft Metashape, Pix4Dmapper ou DJI Terra, gere um único link no Gigasend. O engenheiro da construtora, mineradora ou fazenda clica no link e baixa os 50 GB ou 200 GB direto na máquina de trabalho, sem precisar criar conta ou pedir liberação de acesso.",
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
    title: "Enviar 50 GB–500 GB sem lotar o Google Drive ou SSD | Gigasend",
    metaDescription:
      "Aprenda como funciona a transferência transitória direta do navegador: envie 50 GB, 100 GB ou 500 GB sem ocupar sua cota do Google Drive e sem duplicar o SSD.",
    h1: "Como transferir arquivos gigantes sem lotar sua cota da nuvem ou duplicar o SSD local",
    eyebrow: "Arquitetura de transferência transitória vs armazenamento em nuvem",
    readTime: "5 min de leitura",
    primaryKeyword: "enviar arquivo maior que 15gb sem google drive",
    summary:
      "Usar cofres de armazenamento permanente (Google Drive, Dropbox ou OneDrive) como correio de arquivos pesados obriga você a pagar por terabytes de espaço só para entregar um projeto que o cliente vai baixar uma única vez.",
    sections: [
      {
        heading: "1. Por que compactar pastas de 80 GB em .ZIP lota o SSD do seu Mac ou PC?",
        body: "Se você tem uma pasta de 80 GB no computador e tenta criar um arquivo .ZIP antes de enviar, o sistema operacional precisa de mais 80 GB livres no SSD para escrever o arquivo compactado — travando computadores com discos quase cheios. No Gigasend, o fatiamento ocorre em blocos na memória RAM em tempo real durante o upload.",
      },
      {
        heading: "2. Pare de lotar os 15 GB do seu Gmail/Google Drive com entregas de clientes",
        body: "A cota gratuita de 15 GB do Google é compartilhada entre o Google Drive, o Gmail e o Google Fotos. Subir um único vídeo 4K de 16 GB bloqueia o recebimento de e-mails da sua conta profissional até que você apague arquivos ou assine planos mensais.",
      },
      {
        heading: "3. Fluxo limpo: suba, entregue com 1 clique e mantenha sua nuvem livre",
        body: "Com o Gigasend, você transfere até 10 GB gratuitamente (ou pacotes de 50 GB, 100 GB e 1 TB válidos por 12 meses) em um canal dedicado de trânsito rápido em São Paulo e Rio de Janeiro, mantendo seu Google Drive e seu SSD local 100% livres.",
      },
    ],
    relatedPtSlugs: [
      { href: "/pt/alternativa-google-drive-arquivos-grandes", label: "Alternativa ao Google Drive para arquivos grandes" },
      { href: "/pt/enviar-arquivo-15gb-gratis", label: "Enviar arquivo de 15 GB sem lotar o Drive" },
      { href: "/pt/enviar-pastas-grandes-sem-compactar-zip", label: "Enviar pastas grandes sem compactar em .ZIP" },
      { href: "/pt/enviar-arquivos-pesados", label: "Enviar arquivos pesados (até 10 GB grátis)" },
    ],
  },
  {
    slug: "como-enviar-videos-4k-raw-whatsapp-email-sem-comprimir",
    enEquivalent: "/guides/file-transfer-vs-cloud-storage-vs-media-review",
    title: "Enviar vídeos 4K/RAW no WhatsApp sem comprimir | Gigasend",
    metaDescription:
      "Saiba como mandar vídeos 4K/8K, Apple ProRes e Blackmagic RAW pelo WhatsApp ou Gmail/Outlook no Brasil mantendo 100% do bitrate original e sem pedir login.",
    h1: "Como enviar vídeos 4K, ProRes e BRAW no WhatsApp e e-mail sem perder qualidade",
    eyebrow: "Guia para produtoras, filmmakers, editores e agências de social media",
    readTime: "6 min de leitura",
    primaryKeyword: "como enviar video pesado no whatsapp sem perder qualidade",
    summary:
      "Enviar um vídeo diretamente pelo WhatsApp reduz a resolução, destrói a gradação de cor 10-bit e barra qualquer arquivo acima de 2 GB. Veja como entregar o arquivo master original por link direto.",
    sections: [
      {
        heading: "1. O que o WhatsApp faz com o seu vídeo 4K?",
        body: "Mesmo quando enviado como 'Documento', o WhatsApp impõe um teto rígido de 2 GB e frequentemente trava o aplicativo no celular do cliente ao tentar baixar vídeos grandes. E quando enviado como mídia normal, o algoritmo reduz o bitrate em até 85%, gerando macroblocos visíveis no Instagram Reels, TikTok ou YouTube.",
      },
      {
        heading: "2. Como superar os 25 MB do Gmail e os 20 MB do Outlook corporativo",
        body: "Servidores de e-mail corporativos rejeitam qualquer anexo de vídeo em alta definição. Ao subir seu arquivo .MOV, .MP4, ProRes ou BRAW no Gigasend, você obtém um link HTTPS limpo e confiável que passa por qualquer filtro corporativo.",
      },
      {
        heading: "3. O fluxo de 1 clique no celular ou computador do cliente",
        body: "Você cola o link do Gigasend diretamente na conversa do WhatsApp ou no corpo do e-mail. Seu cliente toca no link e baixa o vídeo 4K/8K original na velocidade máxima dos servidores CDN de São Paulo e Rio de Janeiro — com zero cadastro e sem precisar instalar nenhum aplicativo.",
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
