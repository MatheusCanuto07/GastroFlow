# Especificação do projeto

<span style="color:red">Pré-requisitos: <a href="01-Contexto.md"> Documentação de contexto</a></span>

Esta seção apresenta a especificação do sistema GastroFlow, com foco na modelagem de personas, histórias de usuários, requisitos funcionais e não funcionais, além das restrições do projeto. Para a elaboração desta especificação, utilizamos técnicas como mapa de empatia, histórias de usuários (User Stories), classificação MoSCoW para priorização dos requisitos, e o diagrama de casos de uso para visualização gráfica das interações do sistema.

## Personas

### Persona 1 - Ricardo Machado

- **Idade:** 35 anos
- **Ocupação:** Fundador e proprietário da Eiffel Cortes Selecionados
- **Descrição:** 
  Apaixonado pela charcutaria artesanal, Ricardo é responsável pela gestão do negócio e pela produção de embutidos e defumados. Tem dificuldades com ferramentas digitais, mas reconhece a necessidade de automatizar o controle de estoque e melhorar a gestão da produção.
- **Objetivos:** 
  - Garantir o controle eficiente do estoque e das fichas técnicas.
  - Reduzir desperdícios e melhorar a organização da produção.
  - Expandir o negócio com segurança e qualidade.
- **Frustrações:** 
  - Métodos manuais sujeitos a erros.
  - Dificuldade em rastrear prazos de validade e quantidades.

---

### Persona 2 - Amanda Souza

- **Idade:** 28 anos
- **Ocupação:** Estoquista da Eiffel Cortes Selecionados
- **Descrição:** 
  Responsável pelo registro e controle de entradas e saídas de insumos. Amanda é organizada, mas sobrecarregada com o controle manual de estoque.
- **Objetivos:** 
  - Automatizar o registro de entradas e saídas.
  - Receber alertas automáticos sobre validade e necessidade de reposição.
- **Frustrações:** 
  - Falta de um sistema que agilize o monitoramento em tempo real.
  - Medo de perder prazos importantes por falhas humanas.

---

### Persona 3 - João Lima

- **Idade:** 40 anos
- **Ocupação:** Consultor de negócios para pequenos produtores
- **Descrição:** 
  Auxilia empreendedores como Ricardo na digitalização de seus processos. Valoriza soluções simples, acessíveis e customizáveis para pequenos negócios.
- **Objetivos:** 
  - Ajudar seus clientes a melhorar a eficiência e competitividade.
  - Indicar soluções que promovam a inclusão digital.
- **Frustrações:** 
  - Falta de sistemas acessíveis e adaptáveis à realidade de pequenos produtores.

## Histórias de Usuário

Com base na análise das personas, foram identificadas as seguintes histórias de usuários:

| EU COMO... `PERSONA`                | QUERO/PRECISO ... `FUNCIONALIDADE`                                   | PARA ... `MOTIVO/VALOR`                                                 |
|-------------------------------------|---------------------------------------------------------------------|-------------------------------------------------------------------------|
| Ricardo Machado (Gestor)           | Cadastrar novos fornecedores                                       | Para manter o controle das compras e o relacionamento com fornecedores |
| Amanda Souza (Estoquista)          | Ser alertada quando um insumo estiver próximo do vencimento         | Para evitar desperdício e prejuízo financeiro                           |
| Ricardo Machado (Gestor)           | Monitorar o estoque de produtos finalizados                         | Para garantir que a produção esteja adequada à demanda                  |
| Amanda Souza (Estoquista)          | Registrar a entrada de novos insumos                                 | Para atualizar o estoque e manter o controle preciso                    |
| Ricardo Machado (Chefe de Produção)| Consultar as fichas técnicas das receitas                            | Para garantir a padronização e qualidade dos produtos                   |
| Ricardo Machado (Gestor)           | Acompanhar relatórios de vendas e estoque                            | Para tomar decisões estratégicas sobre produção e compras               |
| Amanda Souza (Estoquista)          | Registrar a saída de insumos                                         | Para manter a rastreabilidade e o controle do estoque                   |
| João Lima (Consultor)              | Indicar um sistema fácil de usar para seus clientes                  | Para ajudar pequenos negócios a se digitalizarem sem complicação        |


## Requisitos

### Requisitos Funcionais

#### RF-001: Cadastro de Usuário

- **Descrição:** O sistema deve permitir o cadastro de usuários com perfis de permissão e acesso pré-estabelecidos.
- **Atores:** Gestor
- **Prioridade:** Essencial
- **Entradas e Pré-condições:**
  - Usuário autenticado com permissão para cadastrar outro usuário.
  - Informações obrigatórias: nome, tipo de usuário, login e senha.
- **Saídas e Pós Condições:**
  - Usuário cadastrado com sucesso e acesso ao sistema liberado.

---

#### RF-002: Cadastro de Insumos

- **Descrição:** O sistema deve permitir o cadastro de insumos utilizados na produção, incluindo nome, categoria, fornecedor, data de validade e quantidade disponível.
- **Atores:** Estoquista
- **Prioridade:** Essencial
- **Entradas e Pré-condições:**
  - Usuário autenticado com permissão para cadastrar insumos.
  - Informações obrigatórias: nome, quantidade, validade, fornecedor.
- **Saídas e Pós Condições:**
  - Insumo cadastrado com sucesso e disponível para consulta.
  - Atualização do estoque conforme novos insumos são adicionados.

---

#### RF-003: Controle de Estoque de Insumos

- **Descrição:** O sistema deve registrar o estoque de insumos, registrando entradas, saídas e notificando sobre quantidades abaixo do mínimo necessário ou produtos próximos do vencimento.
- **Atores:** Estoquista
- **Prioridade:** Essencial
- **Entradas e Pré-condições:**
  - Usuário autenticado com permissão para gerenciar o estoque.
  - Informações obrigatórias: insumo, quantidade movimentada, tipo de movimentação (entrada/saída), data.
- **Saídas e Pós Condições:**
  - Atualização do saldo do insumo no estoque.
  - Notificações automáticas de insumos com estoque baixo ou vencimento próximo.

---

#### RF-004: Gestão de Receitas e Fichas Técnicas

- **Descrição:** O sistema deve permitir o cadastro e gerenciamento de receitas e fichas técnicas, associando insumos utilizados, quantidades e modo de preparo.
- **Atores:** Chefe de Produção
- **Prioridade:** Essencial
- **Entradas e Pré-condições:**
  - Usuário autenticado com permissão para cadastrar receitas.
  - Informações obrigatórias: nome da receita, insumos utilizados, quantidades, modo de preparo.
- **Saídas e Pós Condições:**
  - Receita registrada no sistema e disponível para consulta.
  - Redução automática do estoque ao registrar a produção da receita.

---

#### RF-005: Registro de Produção

- **Descrição:** O sistema deve permitir o registro da produção de produtos acabados, descontado automaticamente os insumos utilizados e atualizando o estoque.
- **Atores:** Chefe de Produção, Estoquista
- **Prioridade:** Essencial
- **Entradas e Pré-condições:**
  - Usuário autenticado com permissão para registrar produção.
  - Seleção da receita a ser produzida.
  - Quantidade a ser produzida.
- **Saídas e Pós Condições:**
  - Insumos necessários são descontados do estoque.
  - Produtos acabados são adicionados ao estoque.

---

#### RF-006: Cadastro e Gerenciamento de Fornecedores

- **Descrição:** O sistema deve permitir o cadastro e gerenciamento de fornecedores, incluindo nome, contato, produtos fornecidos e histórico de compras.
- **Atores:** Gestor
- **Prioridade:** Essencial
- **Entradas e Pré-condições:**
  - Usuário autenticado com permissão para gerenciar fornecedores.
  - Informações obrigatórias: nome, CNPJ/CPF, contato, produtos fornecidos.
- **Saídas e Pós Condições:**
  - Fornecedor cadastrado e disponível para consulta.
  - Relatórios de compras por fornecedor.

---

#### RF-007: Registro de Vendas e Saída de Produtos

- **Descrição:** O sistema deve permitir o registro das vendas realizadas, garantindo a correta baixa de estoque dos produtos vendidos.
- **Atores:** Gestor
- **Prioridade:** Essencial
- **Entradas e Pré-condições:**
  - Usuário autenticado com permissão para registrar vendas.
  - Informações obrigatórias: produto vendido, quantidade, data, cliente (opcional).
- **Saídas e Pós Condições:**
  - Atualização do estoque com a saída dos produtos vendidos.
  - Geração de relatório de vendas para análise.

---

#### RF-008: Gestão de Produtos Acabados

- **Descrição:** O sistema deve permitir o registro, monitoramento e controle dos produtos acabados, incluindo informações como nome, lote, data de fabricação, data de validade, quantidade disponível e status de armazenamento. Deve também fornecer alertas para produtos próximos do vencimento, permitindo que sejam priorizados para venda ou reprocessamento, reduzindo desperdícios.
- **Atores:** Gestor, Estoquista (apenas consulta)
- **Prioridade:** Essencial
- **Entradas e Pré-condições:**
  - Cadastro dos produtos finalizados no sistema, incluindo lote, data de fabricação e validade.
  - Registro automático ou manual das quantidades produzidas e movimentação no estoque.
- **Saídas e Pós Condições:**
  - Relatórios de controle de estoque de produtos acabados.
  - Alertas para produtos próximos do vencimento.
  - Histórico de movimentação dos produtos finalizados.

---

#### RF-009: Ajuste Dinâmico de Fichas Técnicas para Produção em Escala

- **Descrição:** O sistema deve permitir que o usuário expanda uma ficha técnica de receita para produção em massa. O usuário poderá selecionar uma receita de produção e definir a quantidade desejada para a produção. O sistema deve ajustar automaticamente as quantidades dos insumos necessários, de acordo com a quantidade selecionada. Além disso, o sistema deve atualizar o estoque de insumos e de produtos acabados após a finalização da produção, considerando as quantidades consumidas e produzidas.
- **Atores:** Chefe de Produção
- **Prioridade:** Importante
- **Entradas e Pré-condições:**
  - Receitas cadastradas no sistema com as quantidades de insumos necessárias para a produção de uma unidade do produto.
  - Estoque de insumos e produtos acabados atualizado.
  - Quantidade de produção definida pelo usuário.
- **Saídas e Pós Condições:**
  - Ajuste automático nas quantidades de insumos de acordo com a produção.
  - Atualização do estoque de insumos após o consumo.
  - Atualização do estoque de produtos acabados após a finalização da produção.

---

### Requisitos Não Funcionais

#### RNF-001: Tempo de Resposta

- **Descrição:** O tempo de resposta para qualquer ação realizada no sistema, como consulta de estoque, cadastro de insumos e registro de vendas, não deve ultrapassar 2 segundos em condições normais de operação.
- **Prioridade:** Essencial

---

#### RNF-002: Segurança de Acesso

- **Descrição:** O sistema deve implementar autenticação e controle de acesso baseado em perfis de usuário, garantindo que apenas usuários autorizados possam acessar determinadas funcionalidades.
- **Prioridade:** Essencial

---

#### RNF-003: Backup e Recuperação de Dados

- **Descrição:** O sistema deve realizar backups automáticos periódicos dos dados localmente e permitir a sincronização com um serviço de armazenamento externo opcional. Deve permitir a restauração completa dos dados em caso de falha.
- **Prioridade:** Essencial

---

#### RNF-004: Escalabilidade

- **Descrição:** O sistema deve suportar o crescimento da base de dados sem perda significativa de desempenho, permitindo o gerenciamento de um grande volume de insumos, receitas e registros de vendas.
- **Prioridade:** Essencial

---

#### RNF-005: Compatibilidade com Sistemas Operacionais

- **Descrição:** O sistema deve ser compatível com os sistemas operacionais Windows 10 e 11 e, opcionalmente, com distribuições Linux específicas.
- **Prioridade:** Importante

---

#### RNF-006: Interface Adaptável à Resolução da Tela

- **Descrição:** A interface deve se ajustar corretamente a diferentes resoluções de tela, garantindo boa usabilidade em monitores convencionais e telas maiores.
- **Prioridade:** Importante

---

### Requisitos de Domínio

#### RD-001: Controle de Validade dos Insumos

- **Descrição:** O sistema deve garantir que os insumos cadastrados no estoque tenham seu prazo de validade registrado e monitorado, alertando o usuário sobre itens próximos do vencimento.
- **Funcionalidade de Referência:** Gestão de Estoque
- **Prioridade:** Essencial
- **Entradas e Pré-condições:**
  - Cadastro de insumos com data de validade.
  - Acesso de usuário autorizado.
- **Saídas e Pós Condições:**
  - Relatórios e alertas sobre insumos próximos do vencimento.
  - Atualização automática da situação dos insumos no estoque.

---

#### RD-002: Rastreabilidade de Insumos e Produtos

- **Descrição:** O sistema deve permitir o rastreamento completo dos insumos utilizados em cada produto final, garantindo a conformidade com normas sanitárias e facilitando auditorias.
- **Funcionalidade de Referência:** Ficha Técnica de Produção
- **Prioridade:** Importante
- **Entradas e Pré-condições:**
  - Cadastro de insumos vinculados às receitas.
  - Controle de lote dos insumos utilizados.
- **Saídas e Pós Condições:**
  - Relatório de rastreamento detalhado de cada produto.
  - Identificação de lotes em caso de necessidade de recall.

---

#### RD-003: Precificação Baseada em Custo de Produção

- **Descrição:** O sistema deve calcular automaticamente o custo de produção de cada produto com base nos insumos utilizados, permitindo a definição do preço de venda com base em margens de lucro configuráveis.
- **Funcionalidade de Referência:** Gestão de Receitas e Precificação
- **Prioridade:** Essencial
- **Entradas e Pré-condições:**
  - Cadastro de insumos com custo unitário atualizado.
  - Cadastro da ficha técnica das receitas.
- **Saídas e Pós Condições:**
  - Sugestão de preço de venda baseada no custo e na margem definida.
  - Relatório de lucratividade por produto.

---

#### RD-004: Controle de Lotes e Estoque Mínimo

- **Descrição:** O sistema deve permitir o gerenciamento de lotes de insumos e produtos acabados, além de alertar quando o estoque atingir níveis críticos.
- **Funcionalidade de Referência:** Gestão de Estoque
- **Prioridade:** Importante
- **Entradas e Pré-condições:**
  - Cadastro de lotes e definição de estoque mínimo por item.
- **Saídas e Pós Condições:**
  - Notificações sobre necessidade de reposição.
  - Relatórios de movimentação de estoque.


## Restrições

O projeto GastroFlow apresenta as seguintes restrições, que devem ser consideradas durante o desenvolvimento e implantação da solução:

| ID  | Restrição |
|------|----------|
| R-001 | O projeto deverá ser entregue até o final do semestre letivo de 2025 (Julho). |
| R-002 | O custo total do projeto não deve exceder os limites orçamentários definidos pela equipe e pela instituição parceira. |
| R-003 | A implantação do sistema será realizada exclusivamente utilizando as tecnologias definidas: Svelte, SvelteKit, TursoDB e Vercel. |
| R-004 | A infraestrutura de produção será limitada aos recursos gratuitos ou mais básicos disponibilizados pelas plataformas de hospedagem (Vercel) e banco de dados (TursoDB). |
| R-005 | O sistema deverá ser compatível prioritariamente com navegadores web modernos, não sendo prevista a criação de aplicativos nativos para dispositivos móveis. |
| R-006 | A manutenção e atualização do sistema seguirão ciclos trimestrais, conforme a proposta de implantação definida, podendo impactar o cronograma de novas funcionalidades. |


## Diagrama de casos de uso

