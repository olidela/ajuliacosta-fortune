import { useMemo, useState } from "react";
import "./App.css";

const sourceUrl =
  "https://www.gazetadopovo.com.br/conteudo-publicitario/apostas/plataformas-legalizadas/";
const governmentUrl =
  "https://www.gov.br/fazenda/pt-br/composicao/orgaos/secretaria-de-premios-e-apostas/lista-de-empresas";

const names =
  `Vaidebet|Betpix365|Obabet|JogaJunto|Bra|xx|Tropino|Bz|55W|Ice|Kbet|Nossabet|1xBet|Betcaixa|Megabet|Xbet Caixa|Baú Bingo|Bet do Milhão|Joga Limpo|Energia.bet|MMA|BetVip|Papigames|EsportivaVip|Cbesportes|Donos da Bola|Vert|CGG|Fanbit|Pixbet|Ganheibet|BetdáSorte|Esporte 365|Bet Aki|Jogo de Ouro|MCGames|Play|Montecarlos|Luck.bet|1 Pra 1|Startbet|Meridian|Pin|Multibet|Ricobet|BrxBet|Aposta1|Apostamax|Aviãobet|Bateu Bet|A247|Hilgardo|Hilgardo Gaming|Esportiva Bet|Versusbet|VS - Versus|Betcopa|Brasil da Sorte|Fybet|Bet4|Aposta Bet|Faz o Bet|Blaze|Jonbet|BetWarrior|Dr. Bingo|BetGorillas|BetBuffalos|BetFalcons|Bravo|Tradicional|Apostatudo|BetFast|Faz1Bet|Tivobet|Brazino777|iJogo|Fogo777|P9|9F|6R|Bet.app|BR4Bet|GoldeBet|Lotogreen|Bacanaplay|PlayUZU|Apostou|B1 Bet|BRBet|Reals|Bingo|Betsson|Betgo|Apostar|Big|Bet.bet|DonaldBet|BullsBet|Jogão|Jogos|Líderbet|Geralbet|UpBetBR|9D|WJCasino|7K|Cassino|Vera|Hiperbet|EstrelaBet|Vupi|F12.bet|Luva.bet|Brasil.bet|Bandbet|Megaposta|Rivalo|Stake|Gingabet|QGBet|VivaSorte|Afun|AI|6Z|Sortenabet|Betou|BetFusion|SorteOnline|Lottoland|Tiger.bet|PQ777|5G|BETesporte|LancedeSorte|Supremabet|Maximabet|Ultrabet|CasadeApostas|BetSul|JogoOnline|Vbet|Vivaro|SeuBet|H2 Bet|4Win|4Play|Pagol|ApostaGanha|Receba|bet365|Novibet|Betfair|Sportingbet|Betboo|Betano|EsportesdaSorte|Onabet|Lottu|BetBoom|Oleybet|Pinnacle|Matchbook|BetEspecial|BolsadeAposta|Fulltbet|BetBra|Alfa.bet|ArenaPlus|BingoPlus|BetMGM|MGM|SeguroBet|King Panda|7Games|Betão|R7|Galerabet|KTO|ReidoPitaco|Pitaco|RdP|Sportybet|Betnacional|Superbet|MagicJackpot|Super.bet|Free.bet`.split(
    "|",
  );

const linkedPlatforms = {
  BR4Bet: ["BR4bet", "https://gdpzen.com/ir-br4bet-legalizadas", "0066/2024"],
  BetdáSorte: [
    "BetdáSorte",
    "https://gdpzen.com/ir-betdasorte-legalizadas",
    "0042/2024",
  ],
  Brazino777: [
    "Brazino777",
    "https://gdpzen.com/ir-brazino777-legalizadas",
    "0023/2024",
  ],
  BETesporte: [
    "BETesporte",
    "https://gdpzen.com/ir-betesporte-legalizadas",
    "0033/2024",
  ],
  ZeroUmBet: ["ZeroUmBet", "https://gdpzen.com/ir-zeroum", "Decisão judicial"],
  GoldeBet: [
    "Gol de Bet",
    "https://gdpzen.com/ir-goldebet-legalizadas",
    "0066/2024",
  ],
  "Brasil da Sorte": [
    "Brasil da Sorte",
    "https://gdpzen.com/ir-brasildasorte-legalizadas",
    "0075/2024",
  ],
  Líderbet: [
    "Líderbet",
    "https://gdpzen.com/ir-liderbet-legalizadas",
    "0096/2024",
  ],
  PlayUZU: [
    "PlayUZU",
    "https://gdpzen.com/ir-playuzu-legalizadas",
    "0074/2024",
  ],
  Pitaco: ["Pitaco", "https://gdpzen.com/ir-pitaco-legalizadas", "0003/2024"],
};

const platforms = names.map((name, index) => {
  const link = linkedPlatforms[name];
  return {
    name,
    number: index + 1,
    featured: Boolean(link),
    link: link?.[1],
    license: link?.[2],
  };
});

function App() {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("all");
  const [favorites, setFavorites] = useState([]);

  const filteredPlatforms = useMemo(
    () =>
      platforms.filter((platform) => {
        const matchesQuery = platform.name
          .toLowerCase()
          .includes(query.toLowerCase());
        const matchesFilter =
          filter === "all" ||
          (filter === "featured" && platform.featured) ||
          (filter === "favorites" && favorites.includes(platform.name));
        return matchesQuery && matchesFilter;
      }),
    [favorites, filter, query],
  );

  const toggleFavorite = (name) =>
    setFavorites((current) =>
      current.includes(name)
        ? current.filter((item) => item !== name)
        : [...current, name],
    );

  return (
    <main>
      <nav className="topbar">
        <a className="brand" href="#top" aria-label="AC Fortune home">
          <img
            className="brand-logo"
            src="/AC%20Fortune.png"
            alt="AC Fortune logo"
          />
        </a>
        <div className="nav-links">
          <a href="#diretorio">Mapa da sorte</a>
          <a href="#sobre">Sobre a fortune</a>
          <a href="#como-funciona">Como verificar</a>
        </div>
        <a
          className="source-link"
          href={governmentUrl}
          target="_blank"
          rel="noreferrer"
        >
          Fonte oficial <span>↗</span>
        </a>
      </nav>
      <section className="hero" id="top">
        <div className="hero-copy">
          <div className="eyebrow">
            <span className="live-dot"></span> QUEST #01 · ATUALIZADO EM 03 SET
            2026
          </div>
          <h1>
            Encontre seu
            <br />
            <em>próximo destino</em>
            <br />
            de sorte.
          </h1>
          <p>
            O mapa de fortuna com 188 plataformas listadas pela SPA/MF. Explore,
            salve seus achados e jogue com informação.
          </p>
          <div className="hero-actions">
            <a className="primary-button" href="#diretorio">
              Abrir o mapa <span>↓</span>
            </a>
            <a
              className="text-button"
              href={sourceUrl}
              target="_blank"
              rel="noreferrer"
            >
              Ler a fonte ↗
            </a>
          </div>
        </div>
        <div className="hero-art">
          <div className="orbit orbit-one"></div>
          <div className="orbit orbit-two"></div>
          <div className="constellation">
            ✦<span>✧</span>✦
          </div>
          <div className="stamp">
            <strong>188</strong>
            <span>
              PORTAIS
              <br />
              DE FORTUNA
            </span>
          </div>
          <div className="location-pin">✦</div>
          <div className="hero-note">
            Sua jornada começa
            <br />
            com uma boa escolha.
          </div>
          <div className="quest-card">
            <span>MAPA DA SORTE</span>
            <strong>01</strong>
            <small>descobrir · conferir · jogar</small>
          </div>
        </div>
      </section>
      <section className="directory-section" id="diretorio">
        <div className="section-heading">
          <div>
            <div className="eyebrow">01 / MAPA DA SORTE</div>
            <h2>
              Escolha seu
              <br />
              <span>próximo destino.</span>
            </h2>
          </div>
          <p>
            Busque por nome, filtre os portais com link e salve seus achados
            para consultar depois.
          </p>
        </div>
        <div className="controls">
          <label className="search">
            <span>⌕</span>
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Buscar plataforma..."
              aria-label="Buscar plataforma"
            />
          </label>
          <div className="filters">
            <button
              className={filter === "all" ? "active" : ""}
              onClick={() => setFilter("all")}
            >
              Todas <b>188</b>
            </button>
            <button
              className={filter === "featured" ? "active" : ""}
              onClick={() => setFilter("featured")}
            >
              Links da matéria <b>10</b>
            </button>
            <button
              className={filter === "favorites" ? "active" : ""}
              onClick={() => setFilter("favorites")}
            >
              Salvas <b>{favorites.length}</b>
            </button>
          </div>
        </div>
        <div className="directory-meta">
          <span>{filteredPlatforms.length} resultados</span>
          <span>
            <i className="legend-dot"></i> Link disponível na matéria
          </span>
        </div>
        <div className="platform-grid">
          {filteredPlatforms.map((platform) => {
            const platformHref = platform.link ?? sourceUrl;

            return (
              <article
                className={`platform-card ${platform.featured ? "featured" : ""}`}
                key={platform.name}
              >
                <div className="card-top">
                  <span className="card-number">
                    {String(platform.number).padStart(3, "0")}
                  </span>
                  <button
                    className={`favorite ${favorites.includes(platform.name) ? "saved" : ""}`}
                    onClick={() => toggleFavorite(platform.name)}
                    aria-label={`Salvar ${platform.name}`}
                  >
                    {favorites.includes(platform.name) ? "★" : "☆"}
                  </button>
                </div>
                <h3>{platform.name}</h3>
                {platform.featured ? (
                  <>
                    <span className="status">
                      <i></i> Link na matéria
                    </span>
                    <div className="card-footer">
                      <small>Registro {platform.license}</small>
                      <a href={platformHref} target="_blank" rel="noreferrer">
                        Abrir link ↗
                      </a>
                    </div>
                  </>
                ) : (
                  <>
                    <span className="status muted">Nome citado na lista</span>
                    <div className="card-footer">
                      <small>Fonte da matéria</small>
                      <a href={platformHref} target="_blank" rel="noreferrer">
                        Ver na fonte ↗
                      </a>
                    </div>
                  </>
                )}
              </article>
            );
          })}
        </div>
        {filteredPlatforms.length === 0 && (
          <div className="empty">
            Nenhuma plataforma encontrada. Tente outro termo.
          </div>
        )}
      </section>
      <section className="brand-section" id="sobre">
        <div className="brand-section-mark">✦</div>
        <div className="brand-section-intro">
          <div className="eyebrow">A MARCA POR TRÁS DO MAPA</div>
          <h2>
            Sorte é melhor
            <br />
            <span>com direção.</span>
          </h2>
          <p>
            A ajuliacosta fortune nasceu para transformar uma busca confusa em
            uma jornada mais clara, curiosa e consciente.
          </p>
        </div>
        <div className="brand-principles">
          <article>
            <span>01</span>
            <strong>Curadoria</strong>
            <p>
              Reunimos nomes e links encontrados em fontes públicas para
              facilitar sua pesquisa.
            </p>
          </article>
          <article>
            <span>02</span>
            <strong>Transparência</strong>
            <p>
              O mapa informa. A confirmação da autorização deve ser feita na
              fonte oficial.
            </p>
          </article>
          <article>
            <span>03</span>
            <strong>Consciência</strong>
            <p>
              Fortuna não é promessa. Jogue apenas por entretenimento e dentro
              dos seus limites.
            </p>
          </article>
        </div>
      </section>
      <section className="verify-section" id="como-funciona">
        <div className="verify-illustration">
          <div className="verify-ring">✓</div>
          <div className="verify-label">
            SPA
            <br />
            <span>MF</span>
          </div>
        </div>
        <div className="verify-copy">
          <div className="eyebrow">02 / ANTES DE APOSTAR</div>
          <h2>
            O selo ajuda.
            <br />
            <span>A fonte oficial decide.</span>
          </h2>
          <p>
            Os links desta página são os que aparecem na matéria de origem. Para
            confirmar se uma plataforma está autorizada hoje, consulte
            diretamente a lista da Secretaria de Prêmios e Apostas.
          </p>
          <a
            className="primary-button dark"
            href={governmentUrl}
            target="_blank"
            rel="noreferrer"
          >
            Consultar SPA/MF <span>↗</span>
          </a>
        </div>
      </section>
      <footer>
        <div className="footer-brand">
          <img
            className="brand-logo footer-logo"
            src="/AC%20Fortune.png"
            alt="AC Fortune logo"
          />
        </div>
        <p>
          Diretório informativo independente.
          <br />
          Apostas não são investimento.
        </p>
        <div className="footer-warning">
          <strong>18+</strong>
          <span>
            Jogue com responsabilidade.
            <br />
            Aposte apenas o que pode perder.
          </span>
        </div>
        <a href={sourceUrl} target="_blank" rel="noreferrer">
          Fonte e metodologia ↗
        </a>
      </footer>
    </main>
  );
}

export default App;
