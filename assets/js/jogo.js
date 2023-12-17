(() => {

  'use strict'
  
  let deck = [];
  
  const tipos = ['C', 'D', 'H', 'S'],
        especiais = ['A', 'J', 'Q', 'K'];
  
  let pontos = [];
  
  //Referências HTML
  
  const btnPedir = document.querySelector('#btnPedir'),
        btnNovo  = document.querySelector('#btnNovo'),
        btnParar = document.querySelector('#btnParar');
  
  
  const pontosHTML = document.querySelectorAll('small'), 
        divCartasJogador = document.querySelectorAll('.divCartas');

  //inicializar jogo

  const inicializarJogo = ( numeroJogadores = 2) => {

    deck = crearDeck();
    
    pontos = [];

    for (let i = 0; i < numeroJogadores; i++){
      pontos.push(0);
    }

    pontosHTML.forEach( element => element.innerText = 0 );
    divCartasJogador.forEach( element => element.innerHTML = '' );
  
    btnPedir.disabled = false;
    btnParar.disabled = false;    
  }
  
  //Cria um novo deck
  const crearDeck = () => {
  
    deck = [];
  
    for(let i = 2; i <= 10; i++) {
      for(let tipo of tipos) {
        deck.push( i + tipo );
      }
    }
  
    for( let tipo of tipos){
      for(let esp of especiais){
        deck.push( esp + tipo );
      }
    }

    return _.shuffle( deck );
  }
  
  // Pegar uma carta no deck
  const pedirCarta = () => { 
    if ( deck.length === 0 ) {
      throw 'No hay cartas en el deck';
    }
    return deck.pop();
  }
  
  const valorCarta = ( carta ) => {
  
    const valor = carta.substring(0, carta.length -1);
  
    return ( isNaN(valor)) ?
            (valor === 'A') ? 11 : 10
            : valor * 1;  
  }

  // turno 0: jogador 1 - Ultimo turno computador
  const acumulador = ( carta, turno ) => {
    pontos[turno] = pontos[turno] + valorCarta( carta );
    pontosHTML[turno].innerText = pontos[turno];

    return pontos[turno];
  }

  const criarCarta = ( carta, turno ) => {
    const imgCarta = document.createElement('img');
    imgCarta.src = `/assets/cartas/${ carta }.png`;
    imgCarta.classList.add('carta');    
    divCartasJogador[turno].append( imgCarta);
  }

  const vencedor = () => {

    const [ pontosMinimos, pontosComputador ] = pontos;

    setTimeout(() => {
      
      if( pontosComputador === pontosMinimos ){
        alert("Empate '_' ");
      } else if ( pontosMinimos > 21 ) {
        alert('Vitória do computador!! \o/')
      } else if (pontosComputador > 21 ) {
        alert('Vitória do Jogador!! \o/')
      } else {
        alert('Vitória do computador!! \o/')
      }
    }, 100 );

  }
  
  //turno computador
  const turnoComputador = (pontosMinimos) => {

    let pontosComputador = 0;
  
    do{
  
      const carta = pedirCarta();
      pontosComputador = acumulador(carta, pontos.length - 1);  
      criarCarta(carta, pontos.length - 1);
      
    } while( (pontosComputador < pontosMinimos) && (pontosMinimos <= 21) );  

    vencedor();
  }
  
  //Eventos
  
  btnPedir.addEventListener('click', () => {

    const carta = pedirCarta();
    const pontosJogador = acumulador(carta, 0);

    criarCarta(carta, 0); 
  
    if (pontosJogador > 21 ) {
      btnPedir.disabled = true;
      btnParar.disabled = true;
      turnoComputador(pontosJogador);
      
    } else if ( pontosJogador === 21 ) {
      btnPedir.disabled = true;
      btnParar.disabled = true;
      turnoComputador(pontosJogador);
    }
  });
  
  btnNovo.addEventListener('click', () => {
    inicializarJogo();
  });
  
  btnParar.addEventListener('click', () => {
    turnoComputador(pontos[0]);
    btnPedir.disabled = true;
    btnParar.disabled = true;
  });

})()









