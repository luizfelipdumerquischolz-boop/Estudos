# Estudos ACT Itajaí

Site de estudos para o **Processo Seletivo ACT – Prefeitura de Itajaí (Edital 076/2026, banca Univali)**.
Tem duas trilhas:

- **Professor – Ensino Fundamental Anos Iniciais (1º ao 5º ano / Educação Integral / EJA)**
- **Agente de Apoio em Educação Especial**

## O que o site faz

- **Banco de questões** com 4 alternativas (A a D), como na prova da Univali.
  - <span>🟦</span> **PROVA REAL**: questões das provas da Univali de 2025 (Edital 047/2025). O gabarito oficial não estava disponível, então as respostas foram resolvidas e explicadas para estudo (**não oficial**).
  - <span>🟨</span> **QUESTÃO CRIADA**: escritas no estilo da banca a partir do edital. **Não caíram em prova.**
- **Sorteio na hora**: a pessoa escolhe a matéria e a quantidade. Primeiro vêm as questões que ela ainda não fez, depois as que errou.
- **Progresso salvo no aparelho** (localStorage): cada pessoa vê só o que ela fez. Dá para sair no meio e **continuar de onde parou**.
- **Resultado com gabarito comentado** ao finalizar, **histórico** e opção **refazer só as erradas**.
- **Simulado** no formato da prova: 5 de Interpretação + 5 de Raciocínio Lógico + 20 Específicas, com cronômetro opcional.
- **Download**: arquivo `.html`, arquivo para Word (`.doc`) ou impressão/PDF, com ou sem gabarito. Também há backup e restauração do progresso para trocar de aparelho.

## Como adicionar questões

As questões ficam em `data/`:

| Arquivo | Conteúdo |
|---|---|
| `data/textos.js` | textos-base de interpretação |
| `data/reais.js` | questões de provas reais |
| `data/portugues.js` | Interpretação de Texto (criadas) |
| `data/raciocinio.js` | Raciocínio Lógico (criadas) |
| `data/professor.js` | Específicas do Professor (criadas) |
| `data/agente.js` | Específicas do Agente de Apoio (criadas) |

Para criar uma questão, copie uma linha `Q('id', 'Assunto', 'Enunciado', ['A', 'B', 'C', 'D'], índiceDaCorreta, 'Explicação')`.
O índice da correta começa em 0 (0 = primeira alternativa escrita). Use um `id` novo e único.
Nas questões criadas, as alternativas são embaralhadas automaticamente, de forma fixa, para a resposta certa não cair sempre na mesma letra.

## Rodar localmente

Não precisa de servidor: basta abrir o `index.html` no navegador.
