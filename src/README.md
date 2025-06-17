# sv

Everything you need to build a Svelte project, powered by [`sv`](https://github.com/sveltejs/cli).

## Creating a project

If you're seeing this, you've probably already done this step. Congrats!

```bash
# create a new project in the current directory
npx sv create

# create a new project in my-app
npx sv create my-app
```

## Developing

Once you've created a project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Building

To create a production version of your app:

```bash
npm run build
```

You can preview the production build with `npm run preview`.

> To deploy your app, you may need to install an [adapter](https://svelte.dev/docs/kit/adapters) for your target environment.

## Features

Requisitos Funcionais (RF)

RF01 - Gestão de Gastos Pessoais :black_square_button:

O sistema deve permitir o cadastro de receitas e despesas categorizadas. :white_check_mark:

O usuário poderá visualizar gráficos e relatórios de gastos. :black_square_button:

O sistema deve permitir a definição de orçamentos mensais por categoria. :black_square_button:

Deve ser possível importar extratos bancários nos formatos CSV e OFX. :black_square_button:

O sistema deve enviar notificações caso os gastos ultrapassem a média mensal. :black_square_button:

RF02 - Definição de Objetivos Financeiros :black_square_button:

O usuário poderá criar metas financeiras personalizadas. :black_square_button:

O sistema deve acompanhar e exibir o progresso das metas. :black_square_button:

O sistema deve permitir a automação de transferências para poupança baseadas nas metas. :black_square_button:

RF03 - Cobrança de Amigos :black_square_button:

O usuário poderá criar cobranças para dividir contas com amigos. :black_square_button:

O sistema deve permitir a geração de links de pagamento via Pix, boleto ou transferência. :black_square_button:

Deve ser possível visualizar o histórico de cobranças e pagamentos recebidos. :black_square_button:

O sistema deve enviar lembretes automáticos para cobranças pendentes. :black_square_button:

RF04 - Calendário Financeiro :black_square_button:

O sistema deve permitir o agendamento de contas a pagar e receber. :black_square_button:

O usuário poderá integrar o calendário financeiro com o Google Calendar. :black_square_button:

O sistema deve permitir a configuração de eventos financeiros recorrentes. :black_square_button:

O sistema deve enviar notificações de vencimento de contas. :black_square_button:

TODO: Pedir ajuda André
Ler os dados dos inputs no back-end e fazer a pesquisa
validação nos formulários (Importante)
load nos formulários, não precisar recarregar a tela
Login (back-end) , cadastro, esqueci minha senha