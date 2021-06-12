// Criando uma váriavel com o método Math
var numeroAleatorio= Math.floor(Math.random() * 100) + 1;

// Pegando classes do HTML
var palpites = document.querySelector('.palpites');
var ultimoResultado = document.querySelector('.ultimoResultado');
var baixoOuAlto = document.querySelector('.baixoOuAlto');
var envioPalpite = document.querySelector('.envioPalpite');
var campoPalpite = document.querySelector('.campoPalpite');
var novoJogo = document.querySelector('.novoJogo');

// Variaveis
var contagemPalpites = 1;
var botaoReinicio;
campoPalpite.focus(); //Quando Iniciar a página o foco vai direto para o selecionado

// Função
const conferirPalpite = () => {
    var palpiteUsuario = Number(campoPalpite.value); //Transformando o input em number. Só para garantir
    if (contagemPalpites === 1) {
        palpites.textContent = 'Palpites anteriores: ';
    }
    palpites.textContent += palpiteUsuario + ' '; //Adicionando um espaço para os palpites anteriores

    if (palpiteUsuario === numeroAleatorio) { 
        ultimoResultado.textContent = 'Parabéns! Você acertou!';
        ultimoResultado.style.backgroundColor = '#618b25';
        baixoOuAlto.textContent = ''; //Se acertar o baixoOuAlto = vazio
        configFimDeJogo(); //Função fim de jogo
    } else if (contagemPalpites === 10) {
        ultimoResultado.textContent = '!!!FIM DE JOGO!!!';
        baixoOuAlto.textContent = ''; //Se errar o baixoOuAlto = vazio
        configFimDeJogo(); //Função fim de jogo
    } else {
        ultimoResultado.textContent = 'Errado!';
        ultimoResultado.style.color = 'white'
        ultimoResultado.style.backgroundColor = '#d62839';
        if (palpiteUsuario < numeroAleatorio) {
            baixoOuAlto.textContent = 'Seu palpite está muito baixo!';
        } else if (palpiteUsuario > numeroAleatorio) {
            baixoOuAlto.textContent = 'Seu palpite está muito alto!';
        }
    }

    contagemPalpites++; //+1 a cada nova instrução do input
    campoPalpite.value = '';
    campoPalpite.focus();
}

envioPalpite.addEventListener('click', conferirPalpite); //Evento ao clicar no botão

campoPalpite.addEventListener('keyup', function(e){ //Evento se apertar a tecla ENTER enquanto estiver no input
    var key = e.which || e.keyCode;
    if (key == 13) { // codigo da tecla enter
        conferirPalpite();
    }
});

const configFimDeJogo = ()=> {
    campoPalpite.disabled = true; //Desabilitando o botão como no atributo do HTML
    envioPalpite.disabled = true; //Desabilitando o botão como no atributo do HTML
    novoJogo.textContent = 'Iniciar novo jogo'; //Texto botão
    novoJogo.style.display = 'block'; //Trocando display 
    novoJogo.addEventListener('click', reiniciarJogo);
}

const reiniciarJogo = () =>{
    contagemPalpites = 1;
  
    var reiniciarParas = document.querySelectorAll('.resultadoParas p');
    for (var i = 0 ; i < reiniciarParas.length ; i++) { //Esvazia cada paragrafo. Cria uma variavel i. para cada i = a p, i +1 e p = esvazia
      reiniciarParas[i].textContent = '';
    }

    novoJogo.style.display = 'none';
  
    campoPalpite.disabled = false;
    envioPalpite.disabled = false;
    campoPalpite.value = '';
    campoPalpite.focus();
  
    ultimoResultado.style.backgroundColor = 'white';
  
    numeroAleatorio = Math.floor(Math.random() * 100) + 1; // Novo número
}

