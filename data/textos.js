/* Embaralha as alternativas das questões CRIADAS de forma fixa (sempre igual para a mesma questão),
   para que a resposta certa não fique concentrada numa mesma letra. */
window.rodar = function (q) {
  var h = 0;
  for (var i = 0; i < q.id.length; i++) h = (h * 31 + q.id.charCodeAt(i)) >>> 0;
  var n = q.alt.length, k = h % n;
  q.alt = q.alt.slice(k).concat(q.alt.slice(0, k));
  q.c = (q.c - k + n) % n;
  return q;
};

/* Textos-base usados pelas questões de Interpretação de Texto. */
window.TEXTOS = {
  fogo2025: {
    titulo: 'Os agentes ambientais que botam fogo na natureza',
    fonte: 'Prova real – Univali, ACT Itajaí 2025 (Professor Anos Iniciais). Texto adaptado de BBC News Brasil: https://www.bbc.com/portuguese/articles/c1wle9w09evo',
    corpo: 'Caminhonetes com brigadistas avançam entre labaredas no Jalapão, mas não para conter o fogo: são eles que o provocam de forma controlada. Segundo o brigadista Deusimar Cardoso, trata-se de um fogo bom, manso e brando, que se apaga sozinho com o sereno da noite e permite que, pouco depois, se caminhe sobre as cinzas. A prática é conduzida pelo ICMBio e integra o Manejo Integrado do Fogo, uma política que busca prevenir grandes incêndios por meio de queimadas de baixa intensidade no início da estação seca.\n\n' +
      'Essas queimas reduzem o acúmulo de capim seco, altamente inflamável, e criam aceiros naturais. A área queimada permanece protegida por cerca de dois anos, enquanto a vegetação se regenera. Pequenos trechos são queimados de forma alternada, formando um mosaico que favorece espécies com diferentes necessidades em relação ao fogo. Desde que essa estratégia passou a ser adotada, em 2014, incêndios que antes alcançavam até cem mil hectares passaram a raramente ultrapassar três mil.\n\n' +
      'Nem sempre foi assim. Durante anos, os órgãos ambientais adotaram a política de fogo zero, o que gerou conflitos com comunidades quilombolas do Jalapão, como a do Rio Novo. Segundo o morador Manoel Ramos de Jesus, a proibição do fogo e do gado alterou profundamente o modo de vida local e levou ao acúmulo de capim seco. O resultado foi um grande incêndio em 2004, que destruiu áreas extensas e matou animais. Outros incêndios ocorreram nos anos seguintes, afetando comunidades e causando mortes e prejuízos.\n\n' +
      'A mudança de postura ocorreu após uma expedição de técnicos brasileiros à Austrália, em 2014, onde conheceram práticas semelhantes realizadas por comunidades aborígenes. A partir daí, o ICMBio passou a valorizar os saberes tradicionais e implementou o Manejo Integrado do Fogo no Jalapão. Hoje, as comunidades também são autorizadas, em pequena escala, a usar o fogo para renovar pastagens e abrir roças, e o gado criado solto ajuda a manter o capim baixo.\n\n' +
      'Com resultados positivos, a estratégia passou a ser adotada em outras regiões do Cerrado, Pantanal, Pampa e áreas campestres da Amazônia. Os órgãos ambientais passaram a diferenciar queimadas prescritas de incêndios acidentais, reconhecendo que nem todo fogo é destrutivo. A prática foi regulamentada em 2024 pela Política Nacional de Manejo Integrado do Fogo, que reconhece o fogo como parte dos sistemas ecológicos e valoriza os conhecimentos tradicionais, embora proíba seu uso para substituir vegetação nativa.\n\n' +
      'Segundo o biólogo Marco Borges, o fogo sempre fez parte da dinâmica do Cerrado, causado por raios e também pela ação humana ao longo de milênios. Muitas espécies se adaptaram a ele: algumas árvores têm cascas resistentes, certas sementes só germinam após o fogo, e animais desenvolveram estratégias de fuga. Além disso, as queimas controladas emitem menos gases do que grandes incêndios, pois são menos intensas e mais espaçadas.\n\n' +
      'Para Borges, a nova política ajuda a construir uma cultura de convivência com o fogo. Ele próprio realiza queimas prescritas e afirma que, além de proteger o ambiente e as comunidades, observar o fogo controlado pode ser até terapêutico.'
  },
  william2025: {
    titulo: 'A foto do príncipe William aos pés do Cristo Redentor que imita cena histórica de sua mãe, Diana',
    fonte: 'Prova real – Univali, ACT Itajaí 2025 (Agente de Apoio em Educação Especial). Texto adaptado de BBC News Brasil: https://www.bbc.com/portuguese/articles/cwykry022p0o',
    corpo: 'O príncipe de Gales repetiu os passos da mãe ao visitar o Cristo Redentor, no Rio de Janeiro. William posou no mesmo ponto em que Diana, princesa de Gales, foi fotografada há trinta e quatro anos. Ele está no terceiro dia de sua viagem de cinco dias ao Brasil, onde apresentará o Earthshot Prize, prêmio anual criado por sua instituição de caridade.\n\n' +
      'O evento, que reunirá celebridades, será realizado no Museu do Amanhã, no Rio, na noite desta quarta-feira. As apresentações incluirão Kylie Minogue e Shawn Mendes, e cinco projetos receberão o valor de sete milhões de reais cada um. Além disso, o príncipe fará um discurso na COP30, conferência anual da ONU sobre mudanças climáticas, que ocorrerá em Belém, no Pará.\n\n' +
      'Em um dia de céu limpo, o futuro rei permaneceu sozinho por alguns instantes, contemplando o Rio de Janeiro do alto do Corcovado, em um momento de reflexão diante da imponente estátua do Cristo Redentor, uma das maiores esculturas Art Déco do mundo, com trinta metros de altura e vinte e oito metros de largura entre os braços abertos.\n\n' +
      'Diana havia posado no mesmo local em abril de 1991, durante visita de seis dias ao Brasil ao lado do então príncipe Charles. Durante os passeios de William pelo Rio, muitas pessoas relembraram a presença da princesa, falecida em agosto de 1997. Segundo um porta-voz, o príncipe ficou sensibilizado com o carinho dos brasileiros e com as lembranças que ainda cercam a memória de sua mãe.\n\n' +
      'William também reservou um momento de privacidade na capela localizada sob a estátua, enquanto a segurança reforçada restringia temporariamente o acesso público ao monumento. A visita permitiu que ele se reunisse com os quinze finalistas do prêmio Earthshot, antes da cerimônia de entrega.\n\n' +
      'Entre os finalistas deste ano estão a cidade de Guangzhou, na China, por sua rede de transporte público elétrico; a Lagos Fashion Week, na Nigéria, reconhecida pela transformação sustentável da indústria da moda; e Barbados, pela liderança ambiental. O prêmio concede anualmente prêmios em dinheiro em cinco categorias distintas a projetos que buscam restaurar o equilíbrio climático do planeta.\n\n' +
      'O primeiro-ministro britânico, Keir Starmer, participará da cerimônia ao lado de William, antes de ambos seguirem para Belém, onde líderes mundiais discutirão estratégias de contenção e adaptação às mudanças climáticas.\n\n' +
      'Durante os primeiros dias no Brasil, o príncipe participou de um jogo de futebol no Maracanã e praticou vôlei de praia em Copacabana. Na terça-feira, concentrou-se em temas ambientais — foco principal de sua visita —, criticando crimes ligados ao desmatamento da Amazônia durante a conferência United for Wildlife.\n\n' +
      'William também visitou a ilha de Paquetá, onde conversou com moradores, aprendeu sobre a preservação de manguezais e plantou mudas de árvores, encerrando mais um dia de uma viagem que une simbolismo, memória e compromisso com o futuro do planeta.'
  },
  rio: {
    titulo: 'O rio que atravessa a cidade',
    fonte: 'Texto escrito para este site (não caiu em prova).',
    corpo: 'Quem chega a Itajaí pela ponte logo percebe que a cidade foi construída de frente para o rio. Durante séculos, foi pelas águas do Itajaí-Açu que chegaram colonos, mercadorias e notícias. O porto, que hoje movimenta contêineres para o mundo inteiro, nasceu desse encontro entre o rio e o mar.\n\n' +
      'Essa relação, porém, nunca foi simples. O mesmo rio que trouxe riqueza também trouxe enchentes. Em 2008, as chuvas intensas transformaram ruas em canais e obrigaram milhares de famílias a deixar suas casas. Muitos moradores ainda se lembram do barulho da água subindo durante a madrugada.\n\n' +
      'Depois da tragédia, a cidade precisou repensar sua convivência com as águas. Foram construídos sistemas de alerta, e as escolas passaram a discutir o tema com os estudantes. Para os especialistas, não basta erguer muros mais altos: é preciso preservar a mata ciliar, evitar ocupações nas margens e ensinar a população a agir em situações de risco.\n\n' +
      'Hoje, quem caminha pela beira-rio encontra famílias passeando, crianças andando de bicicleta e pescadores à espera do peixe. O rio continua sendo o coração da cidade — um coração que, de vez em quando, bate mais forte e exige respeito.'
  },
  leitura: {
    titulo: 'Ler antes de saber ler',
    fonte: 'Texto escrito para este site (não caiu em prova).',
    corpo: 'Muito antes de reconhecer as letras, a criança já participa do mundo da escrita. Ela observa o adulto que lê a lista do mercado, percebe que o nome dela aparece na mochila e pede que lhe contem a mesma história dezenas de vezes. Nessas situações, aprende que os textos servem para alguma coisa: lembrar, informar, divertir, emocionar.\n\n' +
      'Por isso, pesquisadores afirmam que a alfabetização não começa no primeiro dia de aula. Quando chega à escola, a criança traz hipóteses sobre como a escrita funciona, ainda que essas hipóteses não correspondam às regras convencionais. Cabe ao professor reconhecer esse conhecimento e ajudá-la a avançar.\n\n' +
      'Entretanto, nem todas as crianças têm as mesmas oportunidades. Em casas onde há livros, jornais e conversas sobre o que se lê, o contato com a escrita é cotidiano. Em outras, ele é raro. A escola, portanto, tem um papel decisivo: oferecer a todos aquilo que alguns já receberam em casa.\n\n' +
      'Ler para os alunos todos os dias, expor textos variados na sala e conversar sobre eles não são luxos pedagógicos. São condições para que a aprendizagem da leitura e da escrita aconteça com sentido.'
  }
};
