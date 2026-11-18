/* QUESTÕES CRIADAS – Raciocínio Lógico e Matemática.
   Escritas no estilo da banca Univali, seguindo o edital 076/2026. NÃO caíram em prova. */
window.BANCO = window.BANCO || [];
(function () {
  function Q(id, a, e, alt, c, x) { return window.rodar({ id: id, m: 'rl', a: a, o: 'c', e: e, alt: alt, c: c, x: x }); }
  window.BANCO.push(
    /* --- Proposições e conectivos --- */
    Q('cr01', 'Proposições', 'Qual das sentenças abaixo é uma PROPOSIÇÃO (pode ser classificada como verdadeira ou falsa)?', [
      'Que dia lindo!', 'Feche a porta.', 'Itajaí fica em Santa Catarina.', 'Quantos alunos vieram hoje?'], 2,
      'Proposição é uma frase declarativa que pode ser V ou F. Exclamações, ordens e perguntas não são proposições.'),
    Q('cr02', 'Sentenças abertas', 'A sentença "x + 3 = 10" é considerada', [
      'uma proposição verdadeira.', 'uma proposição falsa.', 'uma sentença aberta, pois seu valor depende de x.', 'uma tautologia.'], 2,
      'Sentenças com variável (x, "ele", "ela") não têm valor lógico definido até que a variável seja conhecida. São sentenças abertas.'),
    Q('cr03', 'Conectivos – conjunção', 'Sabendo que p: "A prova tem 30 questões" é VERDADEIRA e q: "A prova tem 5 alternativas por questão" é FALSA, o valor lógico de "p e q" é', [
      'verdadeiro, pois p é verdadeira.', 'falso, pois na conjunção basta uma ser falsa.', 'verdadeiro, pois ao menos uma é verdadeira.', 'indeterminado.'], 1,
      'Conjunção (E, ∧): só é verdadeira se AS DUAS forem verdadeiras. Como q é falsa, "p e q" é falsa.'),
    Q('cr04', 'Conectivos – disjunção', 'Sendo p falsa e q verdadeira, a proposição "p ou q" é', [
      'falsa', 'verdadeira', 'uma contradição', 'sem valor lógico'], 1,
      'Disjunção (OU, ∨): basta UMA ser verdadeira. Só é falsa quando as duas são falsas.'),
    Q('cr05', 'Conectivos – condicional', 'Em qual situação a proposição "Se estudo, então passo" é FALSA?', [
      'Estudo e passo.', 'Não estudo e passo.', 'Estudo e não passo.', 'Não estudo e não passo.'], 2,
      'O condicional (se... então) só é falso no caso "Vera Fischer": antecedente Verdadeiro e consequente Falso (V → F = F).'),
    Q('cr06', 'Conectivos – bicondicional', 'A proposição "Vou à praia se, e somente se, fizer sol" é VERDADEIRA quando', [
      'faz sol e não vou à praia.', 'não faz sol e vou à praia.', 'faz sol e vou à praia.', 'em nenhuma situação.'], 2,
      'O bicondicional é verdadeiro quando as duas partes têm o MESMO valor (V e V, ou F e F). "Faz sol e vou à praia" é V-V. (F-F também tornaria verdadeiro.)'),
    Q('cr07', 'Tabela-verdade', 'Quantas linhas tem a tabela-verdade de uma proposição composta por 4 proposições simples distintas?', [
      '8', '12', '16', '32'], 2,
      'Número de linhas = 2ⁿ, onde n é o número de proposições simples. 2⁴ = 16.'),
    Q('cr08', 'Tabela-verdade', 'A tabela-verdade da proposição (p ∧ q) → r tem quantas linhas?', [
      '4', '6', '8', '9'], 2,
      'Há 3 proposições simples (p, q, r): 2³ = 8 linhas.'),

    /* --- Negação, De Morgan, equivalências --- */
    Q('cr09', 'Negação', 'A negação de "Todos os alunos fizeram a tarefa" é', [
      'Nenhum aluno fez a tarefa.', 'Algum aluno não fez a tarefa.', 'Todos os alunos não fizeram a tarefa.', 'Alguns alunos fizeram a tarefa.'], 1,
      'Para negar "todos", basta mostrar UM que não: "Algum (pelo menos um) aluno não fez". Negar "todo" NÃO é "nenhum".'),
    Q('cr10', 'Negação', 'A negação de "Nenhuma criança chegou atrasada" é', [
      'Todas as crianças chegaram atrasadas.', 'Alguma criança chegou atrasada.', 'Nenhuma criança chegou no horário.', 'Alguma criança não chegou atrasada.'], 1,
      'Negação de "nenhum" é "algum" (pelo menos um): "Alguma criança chegou atrasada".'),
    Q('cr11', 'Leis de De Morgan', 'Segundo as Leis de De Morgan, a negação de "Ana é professora E João é agente" é', [
      'Ana não é professora e João não é agente.', 'Ana não é professora ou João não é agente.', 'Ana é professora ou João é agente.', 'Se Ana é professora, João não é agente.'], 1,
      'De Morgan: ~(p ∧ q) = ~p ∨ ~q. Nega as duas partes e troca o E pelo OU.'),
    Q('cr12', 'Leis de De Morgan', 'A negação de "Chove ou faz frio" é', [
      'Não chove ou não faz frio.', 'Não chove e não faz frio.', 'Chove e faz frio.', 'Se não chove, faz frio.'], 1,
      'De Morgan: ~(p ∨ q) = ~p ∧ ~q. Nega as duas partes e troca o OU pelo E.'),
    Q('cr13', 'Negação do condicional', 'A negação de "Se a escola tem rampa, então é acessível" é', [
      'Se a escola não tem rampa, então não é acessível.', 'A escola tem rampa e não é acessível.', 'A escola não tem rampa ou é acessível.', 'A escola não tem rampa e é acessível.'], 1,
      'Negação do condicional: ~(p → q) = p ∧ ~q. Regra do "MANÉ": MAntém a primeira E NEga a segunda.'),
    Q('cr14', 'Equivalência lógica', 'Uma proposição equivalente a "Se estudo, então aprendo" é', [
      'Se aprendo, então estudo.', 'Se não estudo, então não aprendo.', 'Se não aprendo, então não estudo.', 'Estudo e aprendo.'], 2,
      'Contrapositiva: p → q ≡ ~q → ~p (inverte e nega as duas). Cuidado: "Se aprendo, então estudo" e "Se não estudo, então não aprendo" NÃO são equivalentes; essa é uma pegadinha clássica.'),
    Q('cr15', 'Equivalência lógica', 'A proposição "Se chove, então levo guarda-chuva" é equivalente a', [
      'Chove e não levo guarda-chuva.', 'Não chove ou levo guarda-chuva.', 'Chove ou levo guarda-chuva.', 'Não chove e levo guarda-chuva.'], 1,
      'Outra equivalência do condicional: p → q ≡ ~p ∨ q ("NEYMAR": NEga a primeira OU MAntém a segunda).'),
    Q('cr16', 'Tautologia', 'Qual das proposições abaixo é uma TAUTOLOGIA (sempre verdadeira)?', [
      'p ∧ ~p', 'p ∨ ~p', 'p → ~p', 'p ∧ q'], 1,
      '"p ou não p" é sempre verdadeira: uma das duas sempre vale (ex.: "Chove ou não chove"). "p e não p" é sempre falsa (contradição).'),

    /* --- Argumentação e diagramas --- */
    Q('cr17', 'Diagramas lógicos', 'Todos os professores são formados. Alguns formados são pós-graduados. Com base apenas nessas informações, é CORRETO concluir que', [
      'todos os professores são pós-graduados.', 'alguns professores são pós-graduados.', 'nenhum professor é pós-graduado.', 'não é possível concluir que algum professor seja pós-graduado.'], 3,
      'Desenhe: "professores" dentro de "formados". Os pós-graduados podem estar em uma parte dos formados que não toca os professores. Não dá para garantir nada.'),
    Q('cr18', 'Diagramas lógicos', 'Nenhum gato é cachorro. Todo filhote é gato. Logo,', [
      'algum filhote é cachorro.', 'nenhum filhote é cachorro.', 'todo cachorro é filhote.', 'algum cachorro é gato.'], 1,
      '"Filhote" fica dentro de "gato", e "gato" não tem nada em comum com "cachorro". Logo, nenhum filhote é cachorro.'),
    Q('cr19', 'Lógica de argumentação', 'Considere: "Se Lia passar no concurso, fará uma festa. Lia não fez festa." Conclui-se que', [
      'Lia passou no concurso.', 'Lia não passou no concurso.', 'Lia fará festa depois.', 'Nada se pode concluir.'], 1,
      'Modus tollens: se p → q e q é falso (não fez festa), então p é falso (não passou).'),
    Q('cr20', 'Lógica de argumentação', 'Considere: "Se fizer sol, vamos à praia. Fomos à praia." É CORRETO afirmar que', [
      'fez sol, necessariamente.', 'não fez sol.', 'não se pode concluir se fez sol ou não.', 'choveu.'], 2,
      'Afirmar o consequente é uma falácia: podemos ter ido à praia por outro motivo. Não dá para concluir que fez sol.'),
    Q('cr21', 'Dedução', 'Três amigas, Ana, Bia e Carla, são professora, agente e diretora, não necessariamente nessa ordem. Ana não é professora. Bia não é professora nem agente. Quem é a agente?', [
      'Ana', 'Bia', 'Carla', 'Não é possível saber.'], 0,
      'Bia não é professora nem agente, então é diretora. Ana não é professora, então é agente. Carla é a professora.'),
    Q('cr22', 'Sequências lógicas', 'Qual é o próximo número da sequência: 2, 6, 18, 54, ...?', [
      '108', '162', '72', '216'], 1,
      'Cada termo é o anterior multiplicado por 3 (progressão geométrica): 54 × 3 = 162.'),
    Q('cr23', 'Sequências lógicas', 'Na sequência 1, 4, 9, 16, 25, ..., o 7º termo é', [
      '36', '42', '49', '64'], 2,
      'São quadrados perfeitos: 1², 2², 3²... O 7º termo é 7² = 49.'),

    /* --- Conjuntos --- */
    Q('cr24', 'Operações com conjuntos', 'Numa escola, 60 alunos fazem Arte, 45 fazem Música e 20 fazem as duas atividades. Quantos alunos fazem pelo menos uma das atividades?', [
      '105', '85', '125', '65'], 1,
      'União: n(A ∪ M) = 60 + 45 − 20 = 85. Subtrai-se a interseção para não contar duas vezes.'),
    Q('cr25', 'Operações com conjuntos', 'Dados A = {1, 2, 3, 4} e B = {3, 4, 5}, o conjunto A − B é', [
      '{5}', '{3, 4}', '{1, 2}', '{1, 2, 5}'], 2,
      'A − B = elementos que estão em A e NÃO estão em B: {1, 2}.'),
    Q('cr26', 'Operações com conjuntos', 'Em uma pesquisa com 100 professores, 70 usam tablet, 50 usam notebook e 10 não usam nenhum dos dois. Quantos usam os dois aparelhos?', [
      '20', '30', '40', '10'], 1,
      'Usam pelo menos um: 100 − 10 = 90. Então 70 + 50 − x = 90, logo x = 30.'),

    /* --- Combinatória e probabilidade --- */
    Q('cr27', 'Princípio fundamental da contagem', 'Uma professora tem 3 blusas e 4 saias. De quantas maneiras diferentes pode se vestir usando uma blusa e uma saia?', [
      '7', '12', '24', '34'], 1,
      'Princípio multiplicativo: 3 × 4 = 12 combinações.'),
    Q('cr28', 'Permutação', 'Quantos anagramas tem a palavra AMOR?', [
      '12', '16', '24', '4'], 2,
      'Permutação de 4 letras distintas: 4! = 4 × 3 × 2 × 1 = 24.'),
    Q('cr29', 'Arranjo', 'Em uma eleição com 6 candidatos, de quantas formas podem ser escolhidos um presidente e um vice?', [
      '15', '30', '36', '12'], 1,
      'A ordem importa (presidente ≠ vice), então é arranjo: 6 × 5 = 30.'),
    Q('cr30', 'Combinação', 'Uma escola vai escolher 2 de seus 5 agentes para um curso. Quantas duplas diferentes são possíveis?', [
      '10', '20', '25', '5'], 0,
      'A ordem não importa: C(5,2) = 5 × 4 ÷ 2 = 10.'),
    Q('cr31', 'Probabilidade', 'Ao lançar um dado comum de 6 faces, qual a probabilidade de sair um número par?', [
      '1/6', '1/3', '1/2', '2/3'], 2,
      'Pares: 2, 4, 6 = 3 casos favoráveis em 6 possíveis. 3/6 = 1/2.'),
    Q('cr32', 'Probabilidade', 'Uma caixa tem 4 bolas azuis e 6 vermelhas. Retirando uma bola ao acaso, a probabilidade de ser azul é', [
      '40%', '60%', '4%', '25%'], 0,
      'P = 4 ÷ 10 = 0,4 = 40%.'),
    Q('cr33', 'Probabilidade', 'Lançando uma moeda duas vezes, qual a probabilidade de sair cara nas duas?', [
      '1/2', '1/3', '1/4', '3/4'], 2,
      'Eventos independentes: 1/2 × 1/2 = 1/4. Espaço amostral: CC, CK, KC, KK.'),

    /* --- Números, porcentagem, regra de três, médias --- */
    Q('cr34', 'Porcentagem', 'Um material escolar custava R$ 80,00 e teve aumento de 15%. Qual o novo preço?', [
      'R$ 92,00', 'R$ 95,00', 'R$ 88,00', 'R$ 96,00'], 0,
      '15% de 80 = 0,15 × 80 = 12. Novo preço: 80 + 12 = 92. (Ou 80 × 1,15 = 92.)'),
    Q('cr35', 'Porcentagem', 'Uma turma tem 25 alunos, dos quais 5 têm laudo de deficiência. Que porcentagem da turma isso representa?', [
      '5%', '15%', '20%', '25%'], 2,
      '5 ÷ 25 = 0,2 = 20%.'),
    Q('cr36', 'Porcentagem – descontos sucessivos', 'Um produto teve desconto de 10% e, depois, mais 10% sobre o novo valor. O desconto total foi de', [
      '20%', '19%', '21%', '18%'], 1,
      '100 → 90 (−10%) → 81 (−10% de 90 = −9). Desconto total: 100 − 81 = 19%. Descontos sucessivos não se somam.'),
    Q('cr37', 'Regra de três inversa', 'Quatro agentes organizam uma sala em 6 horas. Mantendo o mesmo ritmo, em quanto tempo 8 agentes organizariam a mesma sala?', [
      '12 horas', '3 horas', '4 horas', '2 horas'], 1,
      'Mais agentes = menos tempo (inversamente proporcional): 4 × 6 = 8 × x, logo x = 3 horas.'),
    Q('cr38', 'Regra de três composta', 'Se 5 professores corrigem 200 provas em 4 horas, quantas provas 10 professores corrigem em 6 horas, no mesmo ritmo?', [
      '400', '500', '600', '800'], 2,
      'Dobrar os professores dobra as provas (400 em 4 h). Passar de 4 h para 6 h multiplica por 1,5: 400 × 1,5 = 600.'),
    Q('cr39', 'Frações', 'Uma professora usou 2/5 de um pacote de folhas na segunda-feira e 1/3 na terça. Que fração do pacote sobrou?', [
      '4/15', '11/15', '3/8', '1/5'], 0,
      'Usou 2/5 + 1/3 = 6/15 + 5/15 = 11/15. Sobrou 1 − 11/15 = 4/15.'),
    Q('cr40', 'Números decimais', 'O resultado de 0,25 × 0,4 + 1,5 é', [
      '1,6', '1,1', '2,5', '1,65'], 0,
      'Primeiro a multiplicação: 0,25 × 0,4 = 0,1. Depois a soma: 0,1 + 1,5 = 1,6.'),
    Q('cr41', 'Média aritmética simples', 'As notas de uma aluna foram 6, 8, 7 e 9. Qual a média aritmética?', [
      '7', '7,5', '8', '7,25'], 1,
      '(6 + 8 + 7 + 9) ÷ 4 = 30 ÷ 4 = 7,5.'),
    Q('cr42', 'Média ponderada', 'Num concurso, a prova objetiva tem peso 3 e a de títulos peso 1. Uma candidata tirou 8 na objetiva e 4 em títulos. Sua média ponderada é', [
      '6', '7', '6,5', '7,5'], 1,
      '(8 × 3 + 4 × 1) ÷ (3 + 1) = (24 + 4) ÷ 4 = 28 ÷ 4 = 7.'),
    Q('cr43', 'Interpretação de tabelas', 'Uma escola registrou a frequência de alunos em três meses: março, 420; abril, 380; maio, 400. Qual afirmação é correta?', [
      'A frequência cresceu continuamente.', 'Abril teve a maior frequência.', 'A média mensal foi de 400 alunos.', 'De abril para maio houve queda.'], 2,
      'Média: (420 + 380 + 400) ÷ 3 = 1.200 ÷ 3 = 400. A frequência caiu em abril e subiu em maio.'),
    Q('cr44', 'Interpretação de gráficos', 'Em um gráfico de setores (pizza), o setor que representa 25% do total corresponde a um ângulo de', [
      '25°', '45°', '90°', '180°'], 2,
      'O círculo inteiro tem 360°. 25% de 360° = 90°, ou seja, um quarto do círculo.')
  );
})();
