
//Variavies globais

let id_quizz; // APENAS O NUMERO
let questions_qtd;
let qtd_acertos = 0;
let porcentagem_acerto; 

const REGEX_URL_IMG = "^((http)|(https)|(ftp)):\/\/+(.)+(?:jpg|gif|png|jpeg)$";
const REGEX_HEXA_COLOR = "^#([A-Fa-f0-9]{6})$";


function renderizarQuizzesServer(){

    document.querySelector("body").innerHTML = `    <header>
                                                        <h1>BuzzQuizz</h1>
                                                    </header>
                                                    <div class="principal">
                                                        <div class="myquizzes">
                                                            <p>
                                                                Você não criou nenhum <br>quizz ainda :(
                                                            </p>
                                                            <button class="make-quizz">
                                                                Criar Quizz
                                                            </button>
                                                        </div>

                                                        <nav>
                                                            <h1 class="title" >Todos os quizzes</h1>
                                                            <div class="quizzes">


                                                            
                                                        </nav>
                                                    </div>
                                                    <script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
                                                    <script src="assets/js/script.js"></script>   `

    const container = document.querySelector(".quizzes");
    const quizzes = (obj) => {
        const dados = obj.data;

        for (i = 0; i < dados.length; i++){
            container.innerHTML += `<div id=${dados[i].id} class="quizz" style="background-image:linear-gradient(to top, rgba(0,0,0,0.2) 1%, rgba(0,0,0,0.8) 8%, rgba(0,0,0,5) 23%, rgba(0,0,0,0)) ,url('${dados[i].image}')" onclick="paginaQuizz(this)">
                                    
                                        <div class="titulo">
                                            <h2>${dados[i].title}</h2>
                                        </div>
                                    </div>`

        }
    } // COLOQUEI A VERSÃO DA TURMA 4 APENAS PARA VER COMO FICARIA
    const promiseGet = axios.get('https://mock-api.driven.com.br/api/v6/buzzquizz/quizzes');
    promiseGet.then(quizzes);
}
renderizarQuizzesServer();




// Parte do código de abrir um quiz - do usuario ou do sever

function paginaQuizz (elemento) {

    id_quizz = elemento.id;
    console.log(id_quizz);
    //@LIMPAR A PÁGINA@
    const container = document.querySelector("body");
    container.innerHTML = `<header>
                                <h1>BuzzQuizz</h1>
                            </header>
                            <nav class="capa">
                                <img src="">
                                <div></div>
                                <h1></h1>
                            </nav>
                            <main>
                                
                            </main>
                            
                            <script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
                            <script src="assets/js/script.js"></script> `
    
    const quizzes = (obj) => {

        const dados = obj.data;
        console.log(dados)
        //dar um jeito de fazer com que a 
        document.querySelector(".capa img").src = dados.image;
        document.querySelector(".capa h1").innerHTML = dados.title;

        questions_qtd = dados.questions.length;


        for (i = 0; i < questions_qtd; i++){
            document.querySelector("main").innerHTML += `<div id="container${i}" class="container notscroll">
                                                            <div  class="titulo-pergunta">
                                                                <h1>${dados.questions[i].title}</h1>
                                                            </div>
                                                            <div id="pergunta${i}" class="alternativas">

                                                            </div>
                                                            <div></div>
                                                        </div>`
            document.querySelector(`#container${i} .titulo-pergunta`).style.backgroundColor = dados.questions[i].color;

            //embaralhamento das respostas
            let sorted_answes = dados.questions[i].answers.sort(comparador);
            function comparador() { 
                return Math.random() - 0.5; 
            }
            
            const renderAlternativas = sorted_answes.map(function (resposta) {
            document.querySelector(`#pergunta${i}`).innerHTML +=    `<div class="${resposta.isCorrectAnswer}" onclick="quizzClicado(this)">
                                                                        <img src="${resposta.image}">
                                                                        <h2>${resposta.text}</h2>
                                                                    </div>`
            });
        }
                                                    
    }
    const promiseGet = axios.get(`https://mock-api.driven.com.br/api/v6/buzzquizz/quizzes/${elemento.id}`);
    promiseGet.then(quizzes);
}

function quizzClicado(el){

    // adiciona +1 a cada acerto
    if (el.classList.contains("true")){
        qtd_acertos+=1;
        console.log(qtd_acertos)
    }
    
    //estilo do clique
    function estiloPerguntas () {
        el.parentNode.parentNode.querySelector(".container > div:nth-child(3)").classList.add("branco");
        el.style.zIndex = "1";
        

        let respostas_falsas = el.parentNode.querySelectorAll(".false");
        for (i = 0; i < respostas_falsas.length; i++){

            respostas_falsas[i].style.color="#FF4B4B";
        }

        el.parentNode.querySelector(".true").querySelector("h2").style.color = "#009C22";
        el.parentNode.parentNode.classList.remove("notscroll");
    } estiloPerguntas();

    //scroll pra proxima pergunta
    let proximaPergunta = () => {
        document.querySelector(".notscroll").scrollIntoView();
    }
    setTimeout(proximaPergunta,2000);

    //tratamento das repostas
    if (document.querySelectorAll(".branco").length === questions_qtd){
        alert("Quizz finalizado!");

        porcentagem_acerto = (qtd_acertos / questions_qtd*100);
        console.log(porcentagem_acerto);
    }
    
}




//Renderizar form do quizz
function renderFormQuizz(){
    console.log("entrei no form do quizz");
    const container = document.querySelector(".principal");
    container.innerHTML = ` <form class="form-quizz-stt" onsubmit="event.preventDefault()">
                                <div>
                                    <h2>Comece pelo começo</h2>
                                    <div class="box-inputs">
                                        <input class="titulo" type="text" minlength="20" maxlength="65" placeholder="Título do seu quizz" required>
                                        <input class="imagem" type="url" pattern="${REGEX_URL_IMG}" placeholder="URL da imagem do seu quizz" required>
                                        <input class="num-pergs" type="number" min="3" placeholder="Quantidade de perguntas do quizz" required>
                                        <input class="num-niveis" type="number" min="2" placeholder="Quantidade de níveis do quizz" required>
                                    </div>
                                </div>
                                <div>
                                    <button class="form-quizz-btn" onclick="renderFormPergs(this.parentNode.parentNode)">Prosseguir pra criar perguntas</button>
                                </div>
                            </form>`;


    
}

//Renderizar perguntas do quizz
function renderFormPergs(el){
 
   const titulo = el.querySelector(".titulo").value;
   const imagem = el.querySelector(".imagem").value;
   const numPergs = parseInt(el.querySelector(".num-pergs").value);
   const numNiveis = parseInt(el.querySelector(".num-niveis").value);

  localStorage.setItem("quizz", JSON.stringify({
      title: titulo,
      image: imagem,
      questions: [],
      levels: []
  }));

   let perguntas = [];

   for(let i = 0; i < numPergs; i++){ 

        perguntas.push(`<div class="form-pergunta">
                            <div class="pergunta">
                                <h3>Pergunta tal</h3>
                                <input type="text" class="titulo" minlength="20" placeholder="Texto da pergunta" required>
                                <input type="text"class="cor" pattern="${REGEX_HEXA_COLOR}" placeholder="Cor de fundo da pergunta" required>
                            </div>
                            <div class="resposta correta">
                                <h3>Resposta correta</h3>
                                <input type="text" class="texto" placeholder="Resposta correta" required>
                                <input type="url" class="imagem" pattern="${REGEX_URL_IMG}" placeholder="URL da imagem">
                            </div>
                            <div class="resposta incorreta">
                                <h3>Respostas incorretas</h3>
                                <div class="incorreta-um">
                                    <input type="text" class="texto" placeholder="Resposta incorreta 1" required>
                                    <input type="url" class="imagem" pattern="${REGEX_URL_IMG}" placeholder="URL da imagem 1">
                                </div>
                                <div class="incorreta-dois">
                                    <input type="text" class="texto" placeholder="Resposta incorreta 2">
                                    <input type="url" class="imagem" pattern="${REGEX_URL_IMG}" placeholder="URL da imagem 2">
                                </div>
                                <div class="incorreta-tres">
                                    <input type="text" class="texto" placeholder="Resposta incorreta 3">
                                    <input type="url" class="imagem" pattern="${REGEX_URL_IMG}" placeholder="URL da imagem 3">
                                </div>
                            </div>
                        </div>`);
    };
    
    const container = document.querySelector(".principal");

    container.innerHTML =  ` <form class="form-quizz-pergs" onsubmit="event.preventDefault()">
                                <div>
                                ${perguntas.map(item => item)}
                                </div>
                                <div>
                                    <button class="form-quizz-btn" onclick="renderFormNiveis(this.parentNode.parentNode,${numNiveis})">Prosseguir pra criar níveis</button>
                                </div>
                            </form>`;

}

//Renderizaconsole.log("entrou");r níveis do quizz
function renderFormNiveis(el, numNiveis){
    
    let dadosPerg = [];

    const perguntas = [...el.querySelectorAll(".form-pergunta")];

    perguntas.map(
        item => {
            let pergunta = {
                title: item.children[0].children[1].value,
                color: item.children[0].children[2].value,
                answers: [
                    {
                        text: item.children[1].children[1].value,
                        image: item.children[1].children[2].value,
						isCorrectAnswer: true
                    }
                ]
            }

            const respIncorr = [...item.children[2].children];

            respIncorr.map(
                resp => {
                    if(respIncorr.indexOf(resp) > 0 && !!resp.children[0].value){
                        pergunta.answers.push(
                            {
                                text: resp.children[0].value,
                                image: resp.children[1].value,
                                isCorrectAnswer: false 
                            }
                        )
                    }
                }
                
            );

            dadosPerg.push(pergunta);
        }
    );

    console.log(dadosPerg);

    let quizz = JSON.parse(localStorage.getItem("quizz"));
    quizz.questions = dadosPerg;
    localStorage.setItem("quizz", JSON.stringify(quizz));


    let niveis = [];

    for(let i = 0; i < numNiveis; i++){
        niveis.push(
            `<div class="form-nivel">
                <h3>Nível tal</h3>
                <div class="nivel">
                    <input type="text" minlength="10" placeholder="Título do nível" required>
                    <input type="number" min="0" max="100" placeholder="% de acerto mínima" required>
                    <input type="url" pattern="${REGEX_URL_IMG}" placeholder="URL da imagem do nível" required>
                    <input type="text" minlength="30" placeholder="Descrição do nível" required>
                </div>
            </div>`);
    }

    const container = document.querySelector(".principal");

    container.innerHTML =  ` <form class="form-quizz-niveis" onsubmit="event.preventDefault()">
                                ${niveis.map(item => item)}
                                <div>
                                    <button class="form-quizz-btn" onclick="salvarQuizz(this.parentNode.parentNode)">Prosseguir pra criar níveis</button>
                                </div>
                            </form>`;

}

function salvarQuizz(el){

    let dadosNiveis = [];
    
    const niveis = [...el.querySelectorAll(".form-nivel")]; 

    niveis.map(
        item => {
            let nivel = {
                title: item.children[1].children[0].value,
				image: item.children[1].children[2].value,
				text: item.children[1].children[3].value,
				minValue: item.children[1].children[1].value
            }

            dadosNiveis.push(nivel);
        }
    );

    console.log(dadosNiveis);

    let quizz = JSON.parse(localStorage.getItem("quizz"));
    quizz.levels = dadosNiveis;
    localStorage.setItem("quizz", JSON.stringify(quizz));

    enviarQuizz(quizz);

}


function enviarQuizz(obj){

    console.log(obj);

    const promisse = axios.post('https://mock-api.driven.com.br/api/v6/buzzquizz/quizzes', obj);

    promisse.then(resp => {
        console.log(resp);
        let quizzesCriados = JSON.parse(localStorage.getItem("quizzesCriados"));
        if(!!quizzesCriados){
            quizzesCriados.quizzes.push(resp.data);
        }else{
            localStorage.setItem("quizzesCriados", JSON.stringify({ quizzes: [resp.data]}));
        }

    });

    promisse.catch(resp => console.log(resp));
}

function anexarEventos(){
    document.querySelector(".make-quizz").addEventListener("click", function (evnt){
        renderFormQuizz();
    });
}

anexarEventos();

   
   
   
   





