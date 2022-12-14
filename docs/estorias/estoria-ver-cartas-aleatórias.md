# Título: Ver cartas aleatórias

# Narrativa:

**Como** um usuário

**Eu** quero poder visualizar a listagem de cartas aleatórias com imagem de cachorros

**Para** conseguir alterar sua ordem

**E** conseguir adicionar mais cartas

# Critério de aceitação:

## Cenário 1: Nome do usuário aparece na tela de listagem de cartas

**Dado** que eu estou na tela de listagem de cartas aleatórias

**Então** deve aparecer o nome do usuário no canto superior direito

## Cenário 2: Listagem de cartas está sendo carregadas

**Dado** que eu estou na tela de listagem de cartas aleatórias

**E** as cartas ainda não foram carregadas

**Então** deve ser apresentado um loading

## Cenário 3: Listagem de cartas foram carregadas

**Dado** que eu estou na tela de listagem de cartas aleatórias

**E** as fotos das 5 cartas iniciais já carregaram

**Então** deve ser apresentado 5 cartas com fotos aleatórias para mim

**E** as cada carta deve conter os seguintes campos:

- nome;
- imagem;
- descrição;
- um valor aleatório de 0 a 10 que podemos chamar de pontos;

## Cenário 4: Puxar uma nova carta

**Dado** que eu estou na tela de listagem de cartas aleatórias

**E** o botão "Puxar uma nova carta aleatoriamente" está habilitado

**Quando** eu clicar no botão "Puxar uma nova carta aleatoriamente"

**Então** deve ser acrescentada uma nova carta aleatória na lista de cartas

**E** essa nova carta deve estar no final da lista

## Cenário 5: Cliquei no botão de "Puxar uma nova carta aleatoriamente" 3 vezes

**Dado** que eu já cliquei no botão de "Puxar uma nova carta aleatoriamente" 3 vezes

**Então** o botão "Puxar uma nova carta aleatoriamente" deve estar desabilitado

**E** o texto do botão deve mudar para
"Limite atingido (3x)"

## Cenário 7: Cliquei no botão "Embaralhar cartas"

**Dado** que eu estou na tela de listagem de cartas aleatórias

**Quando** eu clicar no botão "Embaralhar cartas"

**Então** a ordem das cartas que estão na tela deve mudar

## Cenário 8: Entrei na tela de cartas aleatórias sem o nome do usuário

**Dado** que eu estou na tela de listagem de cartas aleatórias

**E** não defini o nome do usuário

**Então** eu devo ser redirecionado para a tela de cadastro do usuário
