# CharTableJs
Uma classe javascript que ajuda a criar tabelas que se ajustam de acordo com o tamanho de cada campo usando apenas caracteres

### Adicionando CharTableJs ao projeto
- Adicione o arquivo CharTableJs.mjs ao projeto, pode ser fazendo o download do arquivo ou até mesmo apenas copiando e colando o conteúdo para um arquivo no projeto. O arquivo pode ser *.js ou *.mjs

### Como usar
Importe a classe CharTableJs
```javascript
import { CharTableJs } from './exemplo/CharTableJs.mjs'
```
Crie um objeto apartir da classe
```javascript
const tabelaExemplo = new CharTableJs(colunasTabela)
```
O parâmetro do construtor da classe vai ser um array, cada item do array representa uma coluna da tabela, que podem ter ou não informações sobre o alinhamento de cada campo da tabela.

Existem três tipos de alinhamento, `right`, `center`, `centerRight`, `centerLeft` e `left`. Lembrando que tanto faz se escrito tudo maiúsculo, minusculo, camelCase, etc.
- **right**: Alinha o conteúdo à direita;
- **left**: Alinha o conteúdo à esquerda;
- **center**: Centraliza o conteúdo. Por padrão, essa opção traz o mesmo resultado que o `centerRight`;
  - **centerRight**: Ao centralizar, caso o espaço de cada lado do conteúdo não possa ser igualmente distribuído, acumula maior parte do espaço à _esquerda_, deixando o conteúdo em sí mais para a _direita_;
  - **centerLeft**: Ao centralizar, caso o espaço de cada lado do conteúdo não possa ser igualmente distribuído, acumula maior parte do espaço à _direita_, deixando o conteúdo em sí mais para a _esquerda_;

Cada coluna da tabela pode ser definida de 3 formas:
```javascript
const colunasTabela = [
    "Coluna 1",
    "Coluna 2": "center",
    "Coluna 3": ["left"],
    "Coluna 4": ["left", left],
]
```

- **Coluna 1:** Tanto o cabeçalho como as informações da coluna terão o alinhamento parão `center`
- **Coluna 2:** O conteúdo terá o alinhamento informado, enquanto o cabeçalho continuará com o alinhamento padrão `center`
- **Coluna 3:** Quando informado um array com uma única posição, o cabeçalho terá o alinhamento informado, enquanto o conteúdo continuará com o alinhamento padrão `center`
- **Coluna 4**: Quando informado um array com duas posições, o cabeçalho terá o alinhamento informado no índice `0`, enquanto o conteúdo terá o alinhamento informado no índice `1`

Para criar as linhas da tabela, usa-se a função `row()`:

Pode ser passando um array:
```javascript
tabelaExemplo.row([1, "José", 29, 'M'])
```

Ou pode ser passando um objeto, específicando cada coluna:
```javascript
tabelaExemplo.row({
    "ID": 1,
    "Nome": "José",
    "Idade": 29,
    "Sexo": 'M',
});
```

### Exemplo

Criando a tabela
```javascript
const tabela = new CharTableJs([
    "ID",
    {"Nome": ["center"]},
    {"Idade atual": "center"},
    {"Saldo": ["left", "left"]},
])
```

Inserindo as linhas usando `array`
```javascript
// Ao inserir as linhas com array, a ordem das informações
// devem seguir a ordem em que as colunas foram definidas
tabela.row([1, "José Henrrique dos Santos", 29, 12000])
tabela.row([2, "Maria Pereira de Amargos", 8, 20.40])
tabela.row([3, "Emanuel Borgex", 18, 522.21])
tabela.row([4, "Jerônimo"]) // Não é necessário informar todos os campos
tabela.row([5, "Pedro henrrique", 10, 0])
```

Inserindo as linhas usando `objeto`
```javascript
// Ao inserir linhas com objetos, cada atributo do objeto de parâmetro representa uma coluna,
// e o valor desse atributo será o valor da linha
tabela.row({
    "ID": 6,
    "Nome": "Mario Garcia",
    "Idade atual": 30,
    "Saldo": 10000,
})
tabela.row({ // A ordem dos campos não precisa orecusa ser a mesma das colunas
    "Idade atual": 20,
    "ID": 7,
    "Saldo": 600.90,
    "Nome": "Adriana Losangels",
})
tabela.row({
    "Idade atual": 60,
    "Saldo": 10505265,
    "ID": 7, // Não precisa informar todos os campos
})
```

Resultado final
```
+---------------------------------------------------------+
| ID |           Nome            | Idade atual |    Saldo |
|----+---------------------------+-------------+----------|
| 1  | José Henrrique dos Santos |     29      |    12000 |
| 2  | Maria Pereira de Amargos  |      8      |     20.4 |
| 3  | Emanuel Borgex            |     18      |   522.21 |
| 4  | Jerônimo                  |             |          |
| 5  | Pedro henrrique           |     10      |        0 |
| 6  | Mario Garcia              |     30      |    10000 |
| 7  | Adriana Losangels         |     20      |    600.9 |
| 7  |                           |     60      | 10505265 |
+---------------------------------------------------------+
```
