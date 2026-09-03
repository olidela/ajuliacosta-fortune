# ajuliacosta fortune

## Publicar no Netlify

1. Acesse [netlify.com](https://www.netlify.com/) e crie uma conta.
2. Escolha **Add new site > Import an existing project**.
3. Conecte o repositório do projeto ou use **Deploy manually** com a pasta `dist`.
4. O arquivo `netlify.toml` configura automaticamente `npm run build` e a pasta `dist`.
5. Em **Domain management**, adicione `ajuliacosta.com.br`.
6. No painel DNS da HostGator, configure os registros exibidos pelo Netlify.

O Netlify fornece HTTPS gratuitamente depois da propagação do DNS.

## Desenvolvimento

Use `npm run dev` para iniciar o ambiente local e `npm run preview` para conferir o build de produção.

This template provides a minimal setup to get React working in Vite with HMR and some Oxlint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the Oxlint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and Oxlint's TypeScript related rules in your project.
