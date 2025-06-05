# Modelagem dos processos de negócio

<span style="color:red">Pré-requisitos: <a href="02-Especificacao.md"> Especificação do projeto</a></span>

> **Links úteis**:
>
> * [Modelagem de processos AS-IS x TO-BE](https://dheka.com.br/modelagem-as-is-to-be/)
> * [20 dicas práticas de modelagem de processos](https://dheka.com.br/20-dicas-praticas-de-modelagem-de-processos/)

---

## Modelagem da situação atual (Modelagem AS IS)

Atualmente, a gestão de estoque, produção e vendas na empresa parceira Eiffel Cortes Selecionados é feita de forma manual ou por meio de planilhas eletrônicas. Essa abordagem, embora comum entre pequenos empreendedores, apresenta diversas limitações, como:

* **Falta de rastreabilidade** dos produtos e insumos utilizados na produção;
* **Risco elevado de erros manuais**, como duplicação de dados, esquecimento de prazos de validade e controle ineficaz de lotes;
* **Baixa eficiência operacional**, com retrabalho frequente e dificuldade de manter atualizadas as fichas técnicas;
* **Ausência de notificações automáticas**, como alertas de estoque baixo ou produtos vencendo;
* **Dificuldade na análise de dados**, uma vez que os registros não são centralizados ou padronizados.

Esses problemas geram desperdício de insumos, perdas financeiras e comprometem a qualidade dos produtos comercializados, além de dificultar o crescimento e a profissionalização da operação.

**Modelos AS-IS em BPMN** foram elaborados para os seguintes processos:

* Cadastro manual de insumos e receitas em planilhas;
* Registro de entradas e saídas no estoque via cadernos ou Excel;
* Falta de integração entre produção, estoque e vendas.

---

## Descrição geral da proposta (Modelagem TO BE)

A proposta do sistema **GastroFlow** visa automatizar e integrar os processos de gestão de estoque, fichas técnicas, produção e vendas. Com a introdução da tecnologia, espera-se:

* Eliminação de controles manuais, substituídos por uma interface digital e intuitiva;
* Redução do desperdício por meio de **alertas de validade** e **estoque mínimo**;
* Automatização do **cálculo de custo de produção e precificação** com base em insumos e margem configurável;
* Rastreabilidade completa dos produtos e insumos com controle de lote;
* Atualizações automáticas de estoque conforme produção e vendas;
* Padronização de receitas e agilidade no planejamento de produção em escala.

**Limites da solução**:

* A plataforma, inicialmente, não prevê integração com sistemas de emissão fiscal ou ERP completos;
* Necessidade de conexão com a internet para sincronização de dados com o banco Turso DB (embora haja suporte local);
* Dependência de uso contínuo e correto pelos usuários para assegurar a qualidade dos dados.

**Alinhamento estratégico**:

* A proposta está alinhada com os objetivos da Eiffel Cortes Selecionados de profissionalização da operação, crescimento sustentável, controle de qualidade e digitalização dos processos internos.

**Modelos TO-BE em BPMN** foram elaborados para os seguintes processos:

* Cadastro e gestão de insumos, produtos e fornecedores com alertas automáticos;
* Registro de produção baseado em fichas técnicas automatizadas;
* Vendas e baixa automática no estoque com geração de relatórios;
* Ajuste dinâmico da produção em escala.

---

## Modelagem dos processos

[PROCESSO 1 - Cadastro e controle de insumos e produtos](./processes/processo-1-controle-de-insumos.md "Detalhamento do processo 1.")

[PROCESSO 2 - Produção e rastreabilidade baseada em ficha técnica](./processes/processo-2-producao-ficha-tecnica.md "Detalhamento do processo 2.")

---

## Indicadores de desempenho

| **Indicador**                         | **Objetivos**                                              | **Descrição**                                                              | **Fonte de dados**         | **Fórmula de cálculo**                                                 |
| ------------------------------------- | ---------------------------------------------------------- | -------------------------------------------------------------------------- | -------------------------- | ---------------------------------------------------------------------- |
| Taxa de desperdício de insumos        | Reduzir perdas operacionais                                | Mede o percentual de insumos descartados por vencimento                    | Tabela Insumo              | (quantidade de insumos vencidos / total de insumos cadastrados) \* 100 |
| Tempo médio de produção               | Avaliar a eficiência do processo produtivo                 | Tempo médio entre início e fim do processo de produção                     | Tabela Receita             | soma de tempos de produção / número total de produções                 |
| Percentual de produtos fora do prazo  | Garantir qualidade e validade dos produtos comercializados | Mede quantos produtos foram mantidos no estoque após a data de validade    | Tabela Produto             | (número de produtos vencidos / total de produtos) \* 100               |
| Taxa de acerto no controle de estoque | Verificar precisão entre estoque real e registrado         | Mede discrepância entre estoque físico e sistema                           | Tabela Produto + Auditoria | (número de itens corretos / total de itens auditados) \* 100           |
| Margem de lucro por produto           | Otimizar a rentabilidade                                   | Calcula a margem de lucro real por item com base em custo e valor de venda | Tabela Produto + Receita   | ((valor de venda - custo de produção) / custo de produção) \* 100      |

