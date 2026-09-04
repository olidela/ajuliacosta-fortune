import { useEffect, useMemo, useState } from "react";
import "./App.css";

const sourceUrl =
  "https://www.gazetadopovo.com.br/conteudo-publicitario/apostas/plataformas-legalizadas/";
const governmentUrl =
  "https://www.gov.br/fazenda/pt-br/composicao/orgaos/secretaria-de-premios-e-apostas/lista-de-empresas";
const usersStorageKey = "ac-fortune-users";
const sessionStorageKey = "ac-fortune-session";

const names =
  `Vaidebet|Betpix365|Obabet|JogaJunto|Bra|xx|Tropino|Bz|55W|Ice|Kbet|Nossabet|1xBet|Betcaixa|Megabet|Xbet Caixa|Baú Bingo|Bet do Milhão|Joga Limpo|Energia.bet|MMA|BetVip|Papigames|EsportivaVip|Cbesportes|Donos da Bola|Vert|CGG|Fanbit|Pixbet|Ganheibet|BetdáSorte|Esporte 365|Bet Aki|Jogo de Ouro|MCGames|Play|Montecarlos|Luck.bet|1 Pra 1|Startbet|Meridian|Pin|Multibet|Ricobet|BrxBet|Aposta1|Apostamax|Aviãobet|Bateu Bet|A247|Hilgardo|Hilgardo Gaming|Esportiva Bet|Versusbet|VS - Versus|Betcopa|Brasil da Sorte|Fybet|Bet4|Aposta Bet|Faz o Bet|Blaze|Jonbet|BetWarrior|Dr. Bingo|BetGorillas|BetBuffalos|BetFalcons|Bravo|Tradicional|Apostatudo|BetFast|Faz1Bet|Tivobet|Brazino777|iJogo|Fogo777|P9|9F|6R|Bet.app|BR4Bet|GoldeBet|Lotogreen|Bacanaplay|PlayUZU|Apostou|B1 Bet|BRBet|Reals|Bingo|Betsson|Betgo|Apostar|Big|Bet.bet|DonaldBet|BullsBet|Jogão|Jogos|Líderbet|Geralbet|UpBetBR|9D|WJCasino|7K|Cassino|Vera|Hiperbet|EstrelaBet|Vupi|F12.bet|Luva.bet|Brasil.bet|Bandbet|Megaposta|Rivalo|Stake|Gingabet|QGBet|VivaSorte|Afun|AI|6Z|Sortenabet|Betou|BetFusion|SorteOnline|Lottoland|Tiger.bet|PQ777|5G|BETesporte|LancedeSorte|Supremabet|Maximabet|Ultrabet|CasadeApostas|BetSul|JogoOnline|Vbet|Vivaro|SeuBet|H2 Bet|4Win|4Play|Pagol|ApostaGanha|Receba|bet365|Novibet|Betfair|Sportingbet|Betboo|Betano|EsportesdaSorte|Onabet|Lottu|BetBoom|Oleybet|Pinnacle|Matchbook|BetEspecial|BolsadeAposta|Fulltbet|BetBra|Alfa.bet|ArenaPlus|BingoPlus|BetMGM|MGM|SeguroBet|King Panda|7Games|Betão|R7|Galerabet|KTO|Bet do Oruam|ReidoPitaco|Pitaco|RdP|Sportybet|Betnacional|Superbet|MagicJackpot|Super.bet|Free.bet`.split(
    "|",
  ).sort(
    (firstName, secondName) =>
      Number(secondName === "Bet do Oruam") -
      Number(firstName === "Bet do Oruam"),
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
  KTO: ["KTO", "https://www.kto.bet.br/", "Site oficial"],
  "Bet do Oruam": ["Bet do Oruam", "https://123rior.vip/", "Site oficial"],
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
    premium: name === "Brasil da Sorte",
    premiumRed: name === "KTO" || name === "Bet do Oruam",
    link: link?.[1],
    license: link?.[2],
  };
});

function App() {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("all");
  const [favorites, setFavorites] = useState([]);
  const [account, setAccount] = useState(null);
  const [authOpen, setAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState("login");
  const [authForm, setAuthForm] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [authError, setAuthError] = useState("");

  useEffect(() => {
    const savedSession = localStorage.getItem(sessionStorageKey);
    if (!savedSession) return;

    const session = JSON.parse(savedSession);
    setAccount(session);
    setFavorites(session.favorites ?? []);
  }, []);

  useEffect(() => {
    if (!account) return;

    const users = JSON.parse(localStorage.getItem(usersStorageKey) ?? "{}");
    users[account.email] = { ...users[account.email], favorites };
    localStorage.setItem(usersStorageKey, JSON.stringify(users));
    localStorage.setItem(
      sessionStorageKey,
      JSON.stringify({ ...account, favorites }),
    );
  }, [account, favorites]);

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
    account
      ? setFavorites((current) =>
          current.includes(name)
            ? current.filter((item) => item !== name)
            : [...current, name],
        )
      : (setAuthMode("login"), setAuthOpen(true));

  const openAuth = (mode) => {
    setAuthMode(mode);
    setAuthError("");
    setAuthOpen(true);
  };

  const handleAuthSubmit = (event) => {
    event.preventDefault();
    const email = authForm.email.trim().toLowerCase();
    const users = JSON.parse(localStorage.getItem(usersStorageKey) ?? "{}");

    if (!email || !authForm.password) {
      setAuthError("Informe e-mail e senha.");
      return;
    }

    if (authMode === "register") {
      if (!authForm.name.trim()) {
        setAuthError("Informe seu nome.");
        return;
      }
      if (users[email]) {
        setAuthError("Este e-mail já possui uma conta.");
        return;
      }
      users[email] = {
        name: authForm.name.trim(),
        password: authForm.password,
        favorites: [],
      };
      localStorage.setItem(usersStorageKey, JSON.stringify(users));
    } else if (!users[email] || users[email].password !== authForm.password) {
      setAuthError("E-mail ou senha incorretos.");
      return;
    }

    const user = users[email];
    setAccount({ name: user.name, email });
    setFavorites(user.favorites ?? []);
    setAuthForm({ name: "", email: "", password: "" });
    setAuthError("");
    setAuthOpen(false);
  };

  const logout = () => {
    localStorage.removeItem(sessionStorageKey);
    setAccount(null);
    setFavorites([]);
    setFilter("all");
  };

  return (
    <main>
      <section className="hero" id="top">
        <div className="hero-copy">
          <div className="hero-brand">
            <img
              className="hero-logo"
              src="/AC-Fortune-optimized.webp"
              alt="AC Fortune logo"
            />
          </div>

          <div className="hero-text">
            <h1>
              Encontre seu
              <br />
              <em>próximo destino</em>
              <br />
              de sorte.
            </h1>
            <p>
              O mapa de fortuna com 188 plataformas listadas pela SPA/MF.
              Explore, salve seus achados e jogue com informação.
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
        <div className="account-bar">
          {account ? (
            <div className="account-signed-in">
              <span>Olá, {account.name}</span>
              <button className="account-button subtle" onClick={logout}>
                Sair
              </button>
            </div>
          ) : (
            <>
              <span>Salve suas bets favoritas em uma conta.</span>
              <button
                className="account-button"
                onClick={() => openAuth("login")}
              >
                Entrar
              </button>
            </>
          )}
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
                className={`platform-card ${platform.featured ? "featured" : ""} ${platform.premium ? "premium" : ""} ${platform.premiumRed ? "premium-red" : ""}`}
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
                {(platform.premium || platform.premiumRed) && (
                  <span className="premium-badge">Patrocinado</span>
                )}
                <h3>{platform.name}</h3>
                {platform.featured ? (
                  <>
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
            src="/AC-Fortune-optimized.webp"
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
      {authOpen && (
        <div className="auth-backdrop" onClick={() => setAuthOpen(false)}>
          <section
            className="auth-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="auth-title"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              className="auth-close"
              onClick={() => setAuthOpen(false)}
              aria-label="Fechar janela de acesso"
            >
              ×
            </button>
            <div className="eyebrow">ÁREA DO USUÁRIO</div>
            <h2 id="auth-title">
              {authMode === "login" ? "Entre para salvar." : "Crie seu acesso."}
            </h2>
            <p>Suas bets favoritas ficam salvas neste navegador.</p>
            <form onSubmit={handleAuthSubmit}>
              {authMode === "register" && (
                <label>
                  Nome
                  <input
                    value={authForm.name}
                    onChange={(event) =>
                      setAuthForm({ ...authForm, name: event.target.value })
                    }
                    autoComplete="name"
                  />
                </label>
              )}
              <label>
                E-mail
                <input
                  type="email"
                  value={authForm.email}
                  onChange={(event) =>
                    setAuthForm({ ...authForm, email: event.target.value })
                  }
                  autoComplete="email"
                />
              </label>
              <label>
                Senha
                <input
                  type="password"
                  value={authForm.password}
                  onChange={(event) =>
                    setAuthForm({ ...authForm, password: event.target.value })
                  }
                  autoComplete={
                    authMode === "login" ? "current-password" : "new-password"
                  }
                />
              </label>
              {authError && <span className="auth-error">{authError}</span>}
              <button className="primary-button auth-submit" type="submit">
                {authMode === "login" ? "Entrar" : "Criar conta"}
              </button>
            </form>
            <button
              className="auth-switch"
              onClick={() => {
                setAuthMode(authMode === "login" ? "register" : "login");
                setAuthError("");
              }}
            >
              {authMode === "login"
                ? "Ainda não tenho conta"
                : "Já tenho uma conta"}
            </button>
          </section>
        </div>
      )}
    </main>
  );
}

export default App;
