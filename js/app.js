/* Estudos ACT Itajaí — app sem servidor.
   Banco de questões em data/*.js (window.BANCO), progresso no localStorage deste aparelho. */
(function () {
  'use strict';

  var CHAVE = 'estudosACT_v1';
  var LETRAS = ['A', 'B', 'C', 'D', 'E'];

  var MATERIAS = {
    port: { nome: 'Interpretação de Texto', icone: '📖', cargos: ['prof', 'agente'] },
    rl: { nome: 'Raciocínio Lógico', icone: '🧮', cargos: ['prof', 'agente'] },
    prof: { nome: 'Conhecimentos Específicos – Professor', icone: '👩‍🏫', cargos: ['prof'] },
    agente: { nome: 'Conhecimentos Específicos – Agente de Apoio', icone: '🤝', cargos: ['agente'] }
  };
  var CARGOS = {
    prof: { nome: 'Professor – Ensino Fundamental Anos Iniciais (1º ao 5º ano / Ed. Integral / EJA)', curto: 'Professor Anos Iniciais', icone: '👩‍🏫', especifica: 'prof' },
    agente: { nome: 'Agente de Apoio em Educação Especial', curto: 'Agente de Apoio', icone: '🤝', especifica: 'agente' }
  };

  var BANCO = (window.BANCO || []).filter(function (q) { return q && q.id && q.alt && q.alt.length; });
  var POR_ID = {};
  BANCO.forEach(function (q) { POR_ID[q.id] = q; });
  var TEXTOS = window.TEXTOS || {};

  /* ---------- armazenamento ---------- */
  function estadoVazio() {
    return { cargo: null, respostas: {}, sessoes: [], atual: null };
  }
  var E = carregar();
  function carregar() {
    try {
      var s = JSON.parse(localStorage.getItem(CHAVE));
      if (s && typeof s === 'object') {
        var v = estadoVazio();
        for (var k in v) if (s[k] === undefined) s[k] = v[k];
        return s;
      }
    } catch (e) { /* sem armazenamento: segue em memória */ }
    return estadoVazio();
  }
  function salvar() {
    try { localStorage.setItem(CHAVE, JSON.stringify(E)); } catch (e) { /* ignora */ }
  }

  /* ---------- utilidades ---------- */
  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }
  function embaralhar(a) {
    a = a.slice();
    for (var i = a.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var t = a[i]; a[i] = a[j]; a[j] = t;
    }
    return a;
  }
  function dataBR(ts) {
    var d = new Date(ts);
    return d.toLocaleDateString('pt-BR') + ' ' + d.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
  }
  function pct(a, b) { return b ? Math.round((a / b) * 100) : 0; }
  function app() { return document.getElementById('app'); }
  function ir(h) { if (location.hash === h) rotear(); else location.hash = h; }
  function materiasDoCargo(c) {
    return Object.keys(MATERIAS).filter(function (m) { return MATERIAS[m].cargos.indexOf(c) >= 0; });
  }
  function questoesDe(m, origem) {
    return BANCO.filter(function (q) {
      return q.m === m && (!origem || origem === 'todas' || q.o === origem);
    });
  }
  function tarjas(q) {
    if (q.o === 'r') {
      return '<span class="tarja real">PROVA REAL – ' + esc(q.f || 'Univali') + '</span>' +
        '<span class="tarja nao-oficial">gabarito resolvido, não oficial</span>';
    }
    return '<span class="tarja criada">QUESTÃO CRIADA – não caiu em prova</span>';
  }
  function statsMateria(m) {
    var qs = questoesDe(m), feitas = 0, certas = 0;
    qs.forEach(function (q) {
      var r = E.respostas[q.id];
      if (r) { feitas++; if (r.ok) certas++; }
    });
    return { total: qs.length, feitas: feitas, certas: certas };
  }
  function idsErrados(m) {
    return questoesDe(m).filter(function (q) { var r = E.respostas[q.id]; return r && !r.ok; })
      .map(function (q) { return q.id; });
  }

  /* ---------- sorteio ---------- */
  // Sorteia priorizando as questões que ainda não foram feitas; depois as erradas; por último as já acertadas.
  function sortear(m, n, origem) {
    var qs = questoesDe(m, origem);
    var novas = [], erradas = [], certas = [];
    qs.forEach(function (q) {
      var r = E.respostas[q.id];
      if (!r) novas.push(q.id); else if (!r.ok) erradas.push(q.id); else certas.push(q.id);
    });
    var lista = embaralhar(novas).concat(embaralhar(erradas), embaralhar(certas));
    return agruparPorTexto(lista.slice(0, n));
  }
  // Questões do mesmo texto-base ficam juntas, para não precisar reler o texto várias vezes.
  function agruparPorTexto(ids) {
    var ordem = [], grupos = {};
    ids.forEach(function (id) {
      var t = POR_ID[id].t || ('_' + id);
      if (!grupos[t]) { grupos[t] = []; ordem.push(t); }
      grupos[t].push(id);
    });
    var out = [];
    ordem.forEach(function (t) { out = out.concat(grupos[t]); });
    return out;
  }

  /* ---------- sessões ---------- */
  function novaSessao(tipo, titulo, ids, extra) {
    var s = {
      id: 's' + Date.now(),
      tipo: tipo, titulo: titulo, qids: ids, resp: {}, pos: 0,
      inicio: Date.now(), fim: null, acertos: null
    };
    if (extra) for (var k in extra) s[k] = extra[k];
    E.sessoes.unshift(s);
    if (E.sessoes.length > 60) E.sessoes.length = 60;
    E.atual = s.id;
    salvar();
    ir('#/quiz');
  }
  function sessao(id) {
    for (var i = 0; i < E.sessoes.length; i++) if (E.sessoes[i].id === id) return E.sessoes[i];
    return null;
  }
  function finalizar(s) {
    var acertos = 0;
    s.qids.forEach(function (id) {
      var q = POR_ID[id]; if (!q) return;
      var r = s.resp[id];
      if (r === undefined) return;
      var ok = r === q.c;
      if (ok) acertos++;
      var ant = E.respostas[id];
      E.respostas[id] = { r: r, ok: ok, t: Date.now(), n: (ant ? ant.n : 0) + 1 };
    });
    s.fim = Date.now();
    s.acertos = acertos;
    if (E.atual === s.id) E.atual = null;
    salvar();
    ir('#/resultado/' + s.id);
  }

  /* ---------- menu ---------- */
  function desenharMenu() {
    var m = document.getElementById('menu');
    if (!E.cargo) { m.innerHTML = ''; return; }
    m.innerHTML =
      '<a href="#/painel">Início</a>' +
      '<a href="#/historico">Histórico</a>' +
      '<a href="#/baixar">⬇ Baixar</a>';
  }

  /* ---------- telas ---------- */
  function telaEscolherCargo() {
    var h = '<h1>Qual é o seu cargo?</h1>' +
      '<p class="sub">Processo Seletivo ACT – Prefeitura de Itajaí · Edital 076/2026 · Banca Univali</p>';
    Object.keys(CARGOS).forEach(function (c) {
      h += '<p><button class="btn grande" data-cargo="' + c + '">' + CARGOS[c].icone + ' ' + esc(CARGOS[c].nome) + '</button></p>';
    });
    h += '<div class="card pequeno">Total no banco: <strong>' + BANCO.length + '</strong> questões. ' +
      'A prova da Univali tem 30 questões com 4 alternativas: 5 de Interpretação de Texto, 5 de Raciocínio Lógico e 20 de Conhecimentos Específicos.</div>';
    app().innerHTML = h;
    app().querySelectorAll('[data-cargo]').forEach(function (b) {
      b.onclick = function () { E.cargo = b.getAttribute('data-cargo'); salvar(); ir('#/painel'); };
    });
  }

  function telaPainel() {
    if (!E.cargo) return ir('#/');
    var c = CARGOS[E.cargo];
    var h = '<h1>' + c.icone + ' ' + esc(c.curto) + '</h1>' +
      '<p class="sub">' + esc(c.nome) + ' · <a href="#/trocar">trocar cargo</a></p>';

    var atual = E.atual && sessao(E.atual);
    if (atual && !atual.fim) {
      var resp = Object.keys(atual.resp).length;
      h += '<div class="card aviso"><strong>Você parou no meio de um estudo:</strong> ' + esc(atual.titulo) +
        ' (' + resp + ' de ' + atual.qids.length + ' respondidas).' +
        '<div class="linha-botoes"><a class="btn" href="#/quiz">▶ Continuar de onde parei</a>' +
        '<button class="btn sec" id="descartar">Descartar</button></div></div>';
    }

    h += '<h2>Matérias</h2><div class="grade">';
    materiasDoCargo(E.cargo).forEach(function (m) {
      var st = statsMateria(m), mt = MATERIAS[m];
      var reais = questoesDe(m, 'r').length;
      h += '<div class="card materia"><h3>' + mt.icone + ' ' + esc(mt.nome) + '</h3>' +
        '<div class="pequeno">' + st.total + ' questões (' + reais + ' de prova real)</div>' +
        '<div class="barra"><span style="width:' + pct(st.feitas, st.total) + '%"></span></div>' +
        '<div class="pequeno">Feitas: ' + st.feitas + '/' + st.total +
        (st.feitas ? ' · Acertos: ' + pct(st.certas, st.feitas) + '%' : '') + '</div>' +
        '<div class="linha-botoes"><a class="btn" href="#/estudar/' + m + '">Estudar</a>' +
        (idsErrados(m).length ? '<button class="btn sec" data-erros="' + m + '">Refazer erradas (' + idsErrados(m).length + ')</button>' : '') +
        '</div></div>';
    });
    h += '</div>';

    h += '<h2>Simulado</h2><div class="card">' +
      '<p>Monta uma prova no formato da Univali: <strong>5 de Interpretação de Texto + 5 de Raciocínio Lógico + 20 Específicas</strong>, sorteadas na hora.</p>' +
      '<label class="opcao"><input type="checkbox" id="crono"> Mostrar cronômetro</label>' +
      '<button class="btn" id="simulado">📝 Começar simulado</button></div>';

    app().innerHTML = h;
    var d = document.getElementById('descartar');
    if (d) d.onclick = function () {
      if (!confirm('Descartar o estudo que estava em andamento? As respostas dele não serão salvas.')) return;
      E.sessoes = E.sessoes.filter(function (s) { return s.id !== E.atual; });
      E.atual = null; salvar(); rotear();
    };
    app().querySelectorAll('[data-erros]').forEach(function (b) {
      b.onclick = function () {
        var m = b.getAttribute('data-erros');
        novaSessao('erros', 'Refazer erradas – ' + MATERIAS[m].nome, agruparPorTexto(embaralhar(idsErrados(m))), { materia: m });
      };
    });
    document.getElementById('simulado').onclick = function () {
      var esp = CARGOS[E.cargo].especifica;
      var ids = sortear('port', 5).concat(sortear('rl', 5), sortear(esp, 20));
      novaSessao('simulado', 'Simulado – ' + CARGOS[E.cargo].curto, ids, { crono: document.getElementById('crono').checked });
    };
  }

  function telaEstudar(m) {
    if (!E.cargo || !MATERIAS[m]) return ir('#/painel');
    var st = statsMateria(m);
    var nr = questoesDe(m, 'r').length, nc = questoesDe(m, 'c').length;
    var h = '<p><a href="#/painel">← Voltar</a></p><h1>' + MATERIAS[m].icone + ' ' + esc(MATERIAS[m].nome) + '</h1>' +
      '<p class="sub">As questões são sorteadas na hora. Primeiro vêm as que você ainda não fez.</p>' +
      '<div class="card"><h2 style="margin-top:0">Quantas questões?</h2>' +
      [5, 10, 20, 40].map(function (n, i) {
        return '<label class="opcao"><input type="radio" name="qtd" value="' + n + '"' + (i === 1 ? ' checked' : '') + '> ' + n + ' questões</label>';
      }).join('') +
      '<label class="opcao"><input type="radio" name="qtd" value="999"> Todas (' + st.total + ')</label>' +
      '<h2>Quais questões?</h2>' +
      '<label class="opcao"><input type="radio" name="org" value="todas" checked> Todas (' + st.total + ')</label>' +
      '<label class="opcao"><input type="radio" name="org" value="r"> Só de provas reais (' + nr + ')</label>' +
      '<label class="opcao"><input type="radio" name="org" value="c"> Só questões criadas (' + nc + ')</label>' +
      '<div class="linha-botoes"><button class="btn grande" id="comecar">🎲 Sortear e começar</button></div></div>' +
      '<p class="pequeno">Você já fez ' + st.feitas + ' de ' + st.total + ' questões desta matéria.</p>';
    app().innerHTML = h;
    document.getElementById('comecar').onclick = function () {
      var n = +app().querySelector('input[name=qtd]:checked').value;
      var org = app().querySelector('input[name=org]:checked').value;
      var ids = sortear(m, n, org);
      if (!ids.length) { alert('Não há questões nesse filtro.'); return; }
      novaSessao('estudo', MATERIAS[m].nome, ids, { materia: m });
    };
  }

  var timer = null;
  function telaQuiz() {
    var s = E.atual && sessao(E.atual);
    if (!s || s.fim) return ir('#/painel');
    if (s.pos >= s.qids.length) s.pos = 0;
    var id = s.qids[s.pos], q = POR_ID[id];
    if (!q) { s.qids.splice(s.pos, 1); salvar(); return telaQuiz(); }
    var respondidas = Object.keys(s.resp).length;

    var h = '<div class="cab-questao" style="justify-content:space-between"><strong>' + esc(s.titulo) + '</strong>' +
      (s.crono ? '<span class="cronometro" id="crono">00:00</span>' : '') + '</div>' +
      '<div class="pequeno">Questão ' + (s.pos + 1) + ' de ' + s.qids.length + ' · ' + respondidas + ' respondidas</div>' +
      '<div class="card">' +
      '<div class="cab-questao">' + tarjas(q) + '</div>' +
      '<div class="pequeno">' + esc(MATERIAS[q.m].nome) + (q.a ? ' · Assunto: ' + esc(q.a) : '') + '</div>';
    if (q.t && TEXTOS[q.t]) {
      h += '<details class="texto-base"' + (s.pos === 0 || s.qids[s.pos - 1] && POR_ID[s.qids[s.pos - 1]] && POR_ID[s.qids[s.pos - 1]].t !== q.t ? ' open' : '') + '>' +
        '<summary>📄 Texto-base: ' + esc(TEXTOS[q.t].titulo) + '</summary><p>' + esc(TEXTOS[q.t].corpo) + '</p>' +
        '<p class="pequeno">' + esc(TEXTOS[q.t].fonte || '') + '</p></details>';
    }
    h += '<div class="enunciado">' + esc(q.e) + '</div><ul class="alts">';
    q.alt.forEach(function (a, i) {
      h += '<li><button class="alt' + (s.resp[id] === i ? ' marcada' : '') + '" data-i="' + i + '"><span class="letra">' + LETRAS[i] + '</span><span>' + esc(a) + '</span></button></li>';
    });
    h += '</ul><div class="navq">' +
      '<button class="btn sec" id="ant"' + (s.pos === 0 ? ' disabled' : '') + '>← Anterior</button>' +
      (s.pos < s.qids.length - 1 ? '<button class="btn" id="prox">Próxima →</button>' : '<button class="btn" id="fim">✔ Finalizar</button>') +
      '</div></div>' +
      '<div class="pequeno">Toque num número para pular para a questão:</div><div class="mapa">' +
      s.qids.map(function (qid, i) {
        return '<button data-p="' + i + '" class="' + (s.resp[qid] !== undefined ? 'resp ' : '') + (i === s.pos ? 'atual' : '') + '">' + (i + 1) + '</button>';
      }).join('') + '</div>' +
      '<div class="linha-botoes"><button class="btn sec" id="fim2">✔ Finalizar e ver o resultado</button>' +
      '<a class="btn sec" href="#/painel">Sair (fica salvo)</a></div>';
    app().innerHTML = h;

    app().querySelectorAll('.alt').forEach(function (b) {
      b.onclick = function () {
        s.resp[id] = +b.getAttribute('data-i'); salvar();
        app().querySelectorAll('.alt').forEach(function (x) { x.classList.remove('marcada'); });
        b.classList.add('marcada');
        var cel = app().querySelector('.mapa button[data-p="' + s.pos + '"]');
        if (cel) cel.classList.add('resp');
      };
    });
    app().querySelectorAll('.mapa button').forEach(function (b) {
      b.onclick = function () { s.pos = +b.getAttribute('data-p'); salvar(); telaQuiz(); topo(); };
    });
    var ant = document.getElementById('ant');
    if (ant) ant.onclick = function () { s.pos--; salvar(); telaQuiz(); topo(); };
    var prox = document.getElementById('prox');
    if (prox) prox.onclick = function () { s.pos++; salvar(); telaQuiz(); topo(); };
    function fim() {
      var faltam = s.qids.length - Object.keys(s.resp).length;
      if (faltam > 0 && !confirm('Ainda faltam ' + faltam + ' questão(ões) sem resposta. Finalizar mesmo assim?')) return;
      finalizar(s);
    }
    var f1 = document.getElementById('fim'); if (f1) f1.onclick = fim;
    document.getElementById('fim2').onclick = fim;

    if (timer) clearInterval(timer);
    if (s.crono) {
      var tick = function () {
        var el = document.getElementById('crono');
        if (!el) { clearInterval(timer); return; }
        var seg = Math.floor((Date.now() - s.inicio) / 1000);
        var hh = Math.floor(seg / 3600), mm = Math.floor(seg % 3600 / 60), ss = seg % 60;
        el.textContent = (hh ? hh + ':' : '') + String(mm).padStart(2, '0') + ':' + String(ss).padStart(2, '0');
      };
      tick(); timer = setInterval(tick, 1000);
    }
  }
  function topo() { window.scrollTo(0, 0); }

  function blocoCorrecao(q, r, num) {
    var ok = r === q.c;
    var h = '<div class="card" id="q' + num + '"><div class="cab-questao"><strong>Questão ' + num + '</strong> ' + tarjas(q) + '</div>' +
      '<div class="pequeno">' + esc(MATERIAS[q.m].nome) + (q.a ? ' · ' + esc(q.a) : '') + '</div>';
    if (q.t && TEXTOS[q.t]) {
      h += '<details class="texto-base"><summary>📄 Ver texto-base</summary><p>' + esc(TEXTOS[q.t].corpo) + '</p></details>';
    }
    h += '<div class="enunciado">' + esc(q.e) + '</div><ul class="alts">';
    q.alt.forEach(function (a, i) {
      var cls = i === q.c ? ' certa' : (i === r ? ' errada' : '');
      h += '<li><div class="alt' + cls + '" style="cursor:default"><span class="letra">' + LETRAS[i] + '</span><span>' + esc(a) + '</span></div></li>';
    });
    h += '</ul><div>' + (r === undefined ? '<span class="res-x">Sem resposta.</span>' :
      ok ? '<span class="res-ok">✅ Você acertou!</span>' :
        '<span class="res-x">❌ Você marcou ' + LETRAS[r] + '.</span>') +
      ' Resposta correta: <strong>' + LETRAS[q.c] + '</strong></div>' +
      (q.x ? '<div class="explicacao">💡 ' + esc(q.x) + '</div>' : '') + '</div>';
    return h;
  }

  function telaResultado(sid) {
    var s = sessao(sid);
    if (!s) return ir('#/painel');
    if (!s.fim) { E.atual = s.id; salvar(); return ir('#/quiz'); }
    var total = s.qids.length;
    var h = '<p><a href="#/painel">← Início</a></p><h1>Resultado</h1><p class="sub">' + esc(s.titulo) + ' · ' + dataBR(s.fim) + '</p>' +
      '<div class="card"><p class="placar">' + s.acertos + ' de ' + total + ' (' + pct(s.acertos, total) + '%)</p>' +
      '<p>' + (pct(s.acertos, total) >= 70 ? 'Muito bem! 🎉' : pct(s.acertos, total) >= 50 ? 'Bom caminho, continue! 💪' : 'Leia as explicações com calma e tente de novo. 📚') + '</p>';
    if (s.tipo === 'simulado') {
      var porM = {};
      s.qids.forEach(function (id) {
        var q = POR_ID[id]; if (!q) return;
        porM[q.m] = porM[q.m] || { t: 0, a: 0 };
        porM[q.m].t++; if (s.resp[id] === q.c) porM[q.m].a++;
      });
      h += '<ul>' + Object.keys(porM).map(function (m) {
        return '<li>' + esc(MATERIAS[m].nome) + ': ' + porM[m].a + '/' + porM[m].t + '</li>';
      }).join('') + '</ul>';
    }
    h += '<div class="mapa">' + s.qids.map(function (id, i) {
      var q = POR_ID[id]; var ok = q && s.resp[id] === q.c;
      return '<button data-ir="q' + (i + 1) + '" class="' + (ok ? 'ok' : 'x') + '">' + (i + 1) + '</button>';
    }).join('') + '</div>' +
      '<div class="linha-botoes">' +
      (s.materia ? '<a class="btn" href="#/estudar/' + s.materia + '">🎲 Sortear mais</a>' : '') +
      '<button class="btn sec" id="refazer">Refazer só as que errei</button>' +
      '<button class="btn sec" id="baixar-res">⬇ Baixar este resultado</button>' +
      '</div></div>';
    s.qids.forEach(function (id, i) { if (POR_ID[id]) h += blocoCorrecao(POR_ID[id], s.resp[id], i + 1); });
    app().innerHTML = h;
    app().querySelectorAll('[data-ir]').forEach(function (b) {
      b.onclick = function () { var el = document.getElementById(b.getAttribute('data-ir')); if (el) el.scrollIntoView({ behavior: 'smooth' }); };
    });
    document.getElementById('refazer').onclick = function () {
      var err = s.qids.filter(function (id) { return POR_ID[id] && s.resp[id] !== POR_ID[id].c; });
      if (!err.length) { alert('Você não errou nenhuma! 🎉'); return; }
      novaSessao('erros', 'Refazer erradas – ' + s.titulo, err, { materia: s.materia });
    };
    document.getElementById('baixar-res').onclick = function () {
      var qs = s.qids.map(function (id) { return POR_ID[id]; }).filter(Boolean);
      baixarArquivo(documentoImpressao('Resultado – ' + s.titulo, qs, true, s.resp), 'resultado-' + new Date(s.fim).toISOString().slice(0, 10) + '.html', 'text/html');
    };
  }

  function telaHistorico() {
    if (!E.cargo) return ir('#/');
    var h = '<p><a href="#/painel">← Início</a></p><h1>Histórico</h1>' +
      '<p class="sub">Tudo o que você já fez neste aparelho. Toque para rever as respostas e explicações.</p>';
    if (!E.sessoes.length) h += '<div class="card">Você ainda não fez nenhum estudo.</div>';
    else {
      h += '<div class="card"><table class="hist"><tr><th>Data</th><th>Estudo</th><th>Resultado</th></tr>';
      E.sessoes.forEach(function (s) {
        h += '<tr><td>' + dataBR(s.fim || s.inicio) + '</td><td><a href="#/resultado/' + s.id + '">' + esc(s.titulo) + '</a></td><td>' +
          (s.fim ? s.acertos + '/' + s.qids.length + ' (' + pct(s.acertos, s.qids.length) + '%)' : '<em>em andamento</em>') + '</td></tr>';
      });
      h += '</table></div>';
    }
    h += '<h2>Seu progresso</h2><div class="card"><p>O progresso fica salvo só neste aparelho. Para passar para outro celular ou computador, baixe o arquivo de backup e abra nele.</p>' +
      '<div class="linha-botoes"><button class="btn sec" id="exp">⬇ Baixar backup do progresso</button>' +
      '<label class="btn sec">⬆ Restaurar backup<input type="file" id="imp" accept=".json,application/json" hidden></label>' +
      '<button class="btn sec" id="zerar">🗑 Apagar meu progresso</button></div></div>';
    app().innerHTML = h;
    document.getElementById('exp').onclick = function () {
      baixarArquivo(JSON.stringify(E), 'progresso-estudos-act.json', 'application/json');
    };
    document.getElementById('imp').onchange = function (ev) {
      var f = ev.target.files[0]; if (!f) return;
      var rd = new FileReader();
      rd.onload = function () {
        try {
          var d = JSON.parse(rd.result);
          if (!d || typeof d.respostas !== 'object') throw new Error();
          E = d; var v = estadoVazio(); for (var k in v) if (E[k] === undefined) E[k] = v[k];
          salvar(); alert('Progresso restaurado!'); rotear();
        } catch (e) { alert('Esse arquivo não é um backup válido.'); }
      };
      rd.readAsText(f);
    };
    document.getElementById('zerar').onclick = function () {
      if (!confirm('Apagar todo o seu progresso e histórico deste aparelho? Isso não pode ser desfeito.')) return;
      var c = E.cargo; E = estadoVazio(); E.cargo = c; salvar(); rotear();
    };
  }

  /* ---------- download ---------- */
  function documentoImpressao(titulo, qs, comGabarito, respostas) {
    var css = 'body{font-family:Arial,sans-serif;max-width:800px;margin:20px auto;padding:0 16px;color:#111;line-height:1.5}' +
      'h1{font-size:20px}h2{font-size:16px;margin-top:28px;border-bottom:1px solid #999}' +
      '.q{margin:18px 0;page-break-inside:avoid}.tj{font-size:11px;font-weight:bold;padding:2px 6px;border:1px solid;border-radius:4px}' +
      '.r{color:#1f5fbf}.c{color:#8a6100}.txt{background:#f3f3f3;padding:8px 12px;white-space:pre-line;font-size:14px}' +
      '.en{white-space:pre-line}ol{list-style:upper-alpha}.gab{font-size:14px}.ok{color:#1e8a4c}.x{color:#c0392b}';
    var h = '<!doctype html><html lang="pt-BR"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>' + esc(titulo) + '</title><style>' + css + '</style></head><body>' +
      '<h1>' + esc(titulo) + '</h1><p style="font-size:13px">Estudos ACT Itajaí · gerado em ' + dataBR(Date.now()) +
      '<br><span class="tj r">PROVA REAL</span> = retirada de prova anterior da Univali (gabarito resolvido, não oficial) · ' +
      '<span class="tj c">QUESTÃO CRIADA</span> = escrita no estilo da banca, não caiu em prova.</p>';
    var textoMostrado = {};
    qs.forEach(function (q, i) {
      h += '<div class="q">';
      if (q.t && TEXTOS[q.t] && !textoMostrado[q.t]) {
        textoMostrado[q.t] = true;
        h += '<p><strong>Texto-base: ' + esc(TEXTOS[q.t].titulo) + '</strong></p><div class="txt">' + esc(TEXTOS[q.t].corpo) + '</div><p style="font-size:12px">' + esc(TEXTOS[q.t].fonte || '') + '</p>';
      }
      h += '<p><strong>Questão ' + (i + 1) + '</strong> ' +
        (q.o === 'r' ? '<span class="tj r">PROVA REAL – ' + esc(q.f || '') + '</span>' : '<span class="tj c">QUESTÃO CRIADA</span>') +
        ' <small>' + esc(MATERIAS[q.m].nome) + (q.a ? ' · ' + esc(q.a) : '') + '</small></p>' +
        (q.t && TEXTOS[q.t] ? '<p style="font-size:12px"><em>(Use o texto-base "' + esc(TEXTOS[q.t].titulo) + '")</em></p>' : '') +
        '<div class="en">' + esc(q.e) + '</div><ol>' + q.alt.map(function (a) { return '<li>' + esc(a) + '</li>'; }).join('') + '</ol></div>';
    });
    if (comGabarito) {
      h += '<h2>Gabarito comentado</h2>';
      qs.forEach(function (q, i) {
        var linha = '<p class="gab"><strong>' + (i + 1) + ' – ' + LETRAS[q.c] + '</strong>';
        if (respostas) {
          var r = respostas[q.id];
          linha += r === undefined ? ' <span class="x">(sem resposta)</span>' :
            r === q.c ? ' <span class="ok">(você acertou)</span>' : ' <span class="x">(você marcou ' + LETRAS[r] + ')</span>';
        }
        h += linha + (q.x ? ' — ' + esc(q.x) : '') + '</p>';
      });
    }
    return h + '</body></html>';
  }
  function baixarArquivo(conteudo, nome, tipo) {
    var blob = new Blob(['﻿' + conteudo], { type: tipo + ';charset=utf-8' });
    var url = URL.createObjectURL(blob);
    var a = document.createElement('a');
    a.href = url; a.download = nome; document.body.appendChild(a); a.click();
    setTimeout(function () { URL.revokeObjectURL(url); a.remove(); }, 1000);
  }
  function imprimir(html) {
    var w = window.open('', '_blank');
    if (!w) { alert('O navegador bloqueou a nova janela. Use o botão "Baixar arquivo" e abra o arquivo para imprimir.'); return; }
    w.document.open(); w.document.write(html); w.document.close();
    setTimeout(function () { w.focus(); w.print(); }, 400);
  }

  function telaBaixar() {
    if (!E.cargo) return ir('#/');
    var ms = materiasDoCargo(E.cargo);
    var h = '<p><a href="#/painel">← Início</a></p><h1>⬇ Baixar e imprimir</h1>' +
      '<p class="sub">Escolha o que quer levar. O arquivo abre em qualquer celular ou computador, mesmo sem internet.</p>' +
      '<div class="card"><h2 style="margin-top:0">Matérias</h2>' +
      ms.map(function (m) {
        return '<label class="opcao"><input type="checkbox" name="mat" value="' + m + '" checked> ' + MATERIAS[m].icone + ' ' + esc(MATERIAS[m].nome) + ' (' + questoesDe(m).length + ')</label>';
      }).join('') +
      '<h2>Quais questões?</h2>' +
      '<label class="opcao"><input type="radio" name="org" value="todas" checked> Todas</label>' +
      '<label class="opcao"><input type="radio" name="org" value="r"> Só de provas reais</label>' +
      '<label class="opcao"><input type="radio" name="org" value="c"> Só questões criadas</label>' +
      '<label class="opcao"><input type="radio" name="org" value="erradas"> Só as que eu errei</label>' +
      '<h2>Gabarito</h2>' +
      '<label class="opcao"><input type="checkbox" id="gab" checked> Incluir gabarito comentado no final</label>' +
      '<div class="linha-botoes">' +
      '<button class="btn" data-acao="html">⬇ Baixar arquivo (.html)</button>' +
      '<button class="btn sec" data-acao="doc">⬇ Baixar para Word (.doc)</button>' +
      '<button class="btn sec" data-acao="pdf">🖨 Imprimir / Salvar em PDF</button>' +
      '</div></div>';
    app().innerHTML = h;
    app().querySelectorAll('[data-acao]').forEach(function (b) {
      b.onclick = function () {
        var mats = Array.prototype.map.call(app().querySelectorAll('input[name=mat]:checked'), function (x) { return x.value; });
        var org = app().querySelector('input[name=org]:checked').value;
        var qs = [];
        mats.forEach(function (m) {
          var lista = org === 'erradas' ? idsErrados(m).map(function (id) { return POR_ID[id]; }) : questoesDe(m, org);
          qs = qs.concat(agruparPorTexto(lista.map(function (q) { return q.id; })).map(function (id) { return POR_ID[id]; }));
        });
        if (!qs.length) { alert('Nenhuma questão com essas opções.'); return; }
        var titulo = 'Questões – ' + CARGOS[E.cargo].curto;
        var html = documentoImpressao(titulo, qs, document.getElementById('gab').checked);
        var acao = b.getAttribute('data-acao');
        if (acao === 'html') baixarArquivo(html, 'questoes-act-itajai.html', 'text/html');
        else if (acao === 'doc') baixarArquivo(html, 'questoes-act-itajai.doc', 'application/msword');
        else imprimir(html);
      };
    });
  }

  /* ---------- roteador ---------- */
  function rotear() {
    if (timer) { clearInterval(timer); timer = null; }
    var p = (location.hash || '#/').slice(2).split('/');
    desenharMenu();
    switch (p[0]) {
      case '': E.cargo ? telaPainel() : telaEscolherCargo(); break;
      case 'trocar': telaEscolherCargo(); break;
      case 'painel': telaPainel(); break;
      case 'estudar': telaEstudar(p[1]); break;
      case 'quiz': telaQuiz(); break;
      case 'resultado': telaResultado(p[1]); break;
      case 'historico': telaHistorico(); break;
      case 'baixar': telaBaixar(); break;
      default: telaPainel();
    }
    topo();
  }
  window.addEventListener('hashchange', rotear);
  rotear();
})();
