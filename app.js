// let titulo = document.querySelector('h1');
// titulo.innerHTML = 'Jogo do número secreto!';

// let paragrafo = document.querySelector('p');
// paragrafo.innerHTML = 'Escolha um número entre 1 e 10';



let listaNumerosSorteados = [];
let numeroLimite = 10;
let numeroSecreto = gerarNumeroAleatorio();
let tentativas = 1;

function escreverNaTela(tag, texto){
  let campo = document.querySelector(tag);
  campo.innerHTML = texto;
  responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate:1.2} );
}

exibirMensagemInicial();

function exibirMensagemInicial() {
  escreverNaTela('h1', 'Jogo do número secreto!');
  escreverNaTela('p', 'Escolha um número entre 1 e 100');
}

function verificarChute(){ 
  let chute = document.querySelector('input').value;
  if (chute == numeroSecreto) {
    escreverNaTela('h1', 'Acertou!');
    let palavraTentativa = tentativas > 1 ? 'tentativas' : 'tentativa';
    let mensagemTentativas = `Você descobriu o número secreto com ${tentativas} ${palavraTentativa}!`
    escreverNaTela('p', mensagemTentativas);
    document.getElementById('reiniciar').removeAttribute('disabled');
  } else if (chute > numeroSecreto) {
    escreverNaTela('p', 'O número secreto é menor');
  } else {
    escreverNaTela('p', 'O número secreto é maior');
    tentativas++;
    limparChute()
  }
  
}

function gerarNumeroAleatorio(){
  let numeroEscolhido = parseInt(Math.random() * numeroLimite + 1);
  let elementosNaLista = listaNumerosSorteados.length;

  if (elementosNaLista == numeroLimite) {
    listaNumerosSorteados = [];
  }

  if(listaNumerosSorteados.includes(numeroEscolhido)) {
    return gerarNumeroAleatorio();
  } else {
    listaNumerosSorteados.push(numeroEscolhido);
    return numeroEscolhido;
  }
}

function limparChute(){
  chute = document.querySelector('input');
  chute.value = '';
}

function novoJogo() {
  numeroSecreto = gerarNumeroAleatorio();
  limparChute();
  tentativas = 1;
  exibirMensagemInicial();
  document.getElementById('reiniciar').setAttribute('disabled', true);
}
