// Alg para reconhecimento de palavras em um AFND

/*
  DESCRICAO ESTADOS
  Estado Inicial
  Estados Finais por espaco
  Estado atual, caractere lido, proximo estado

  DESCRICAO PALAVRAS
  Uma palavra por linha.
*/


var input_estados =
  "q0\n"+
  "q2\n"+
  "q0 a q1\n"+
  "q1 a q1\n"+
  "q1 b q1\n"+
  "q1 a q2\n";

var input_palavras = "aab\n"+"aba\n"+"aa\n"+"a\n";

// Le linhas
var estados = input_estados.split("\n");
// Remove ultima linha em branco
estados.pop();

// Separa por espacos
for(key in estados){
  estados[key] = estados[key].split(" ");
}
// Define estado inicial e estado final
var estado_inicial = estados.shift();
var estados_finais = estados.shift();
var tabela_transicao = estados;

// Le Palavras
var palavras = input_palavras.split("\n");
palavras.pop();

var validaLetra = function(e_atual, e_finais, transicoes, palavra, i_letra){
  // Se é o ultimo caractere e esta em um estado final
  if(e_finais.indexOf(e_atual) != -1 && i_letra == palavra.length){
    return true;
  }
  if(i_letra < palavra.length){
    var possiveis_estados  = [];
    for(key in transicoes){
      if(transicoes[key][0] == e_atual){
        if(transicoes[key][1] == palavra[i_letra]){
          possiveis_estados.push(transicoes[key][2]);
        }
      }
    }
    console.log("Caractere lido: "+palavra[i_letra]);
    console.log("Estados possiveis: "+possiveis_estados);
    for(key in possiveis_estados){
      console.log("Movimento para: "+possiveis_estados[key]);
      var result = validaLetra(possiveis_estados[key], e_finais, transicoes, palavra, i_letra+1);
      if(result == true)
        return true;
    }
  }
  return false;
}


var validaPalavra = function(e_inicial, e_finais, transicoes, palavra){
  var e_atual = e_inicial[0];
  var i_palavra = 0;
  var contador = 100;

  console.log(validaLetra(e_atual, e_finais, transicoes, palavra, i_palavra));

  return false;
}

validaPalavra(estado_inicial,estados_finais,tabela_transicao, "abaabaabaa");
