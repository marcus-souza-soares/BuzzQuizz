
//Variavies globais

let id_quizz; // APENAS O NUMERO
let questions_qtd;
let qtd_acertos = 0;
let porcentagem_acerto; 
let levels;

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
                                                            <button class="make-quizz" onclick="renderFormQuizz()">
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
            container.innerHTML += `<div id=${dados[i].id} class="quizz" style="background-image:linear-gradient(to top, rgba(0,0,0,0.2) 1%, rgba(0,0,0,0.8) 8%, rgba(0,0,0,5) 23%, rgba(0,0,0,0)) ,url('${dados[i].image}')" onclick="paginaQuizz(this.id)">
                                    
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

function paginaQuizz (id) {

    id_quizz = id;
    console.log(id);
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
        levels = dados.levels;
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
    const promiseGet = axios.get(`https://mock-api.driven.com.br/api/v6/buzzquizz/quizzes/${id_quizz}`);
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
        if (document.querySelector(".notscroll") !== null){
            document.querySelector(".notscroll").scrollIntoView();
        }
    }
    setTimeout(proximaPergunta,2000);

    //tratamento das repostas
    if (document.querySelectorAll(".branco").length === questions_qtd){
        alert("Quizz finalizado!");

        porcentagem_acerto = Math.ceil(qtd_acertos / questions_qtd*100);
        console.log(porcentagem_acerto);

        levels.sort(function(a, b){return b.minValue-a.minValue});

        for (i = 0; i < levels.length; i++){

            if (porcentagem_acerto >= levels[i].minValue){
                document.querySelector("main").innerHTML += `<div class="resultado notscroll">
                                                                <div class="titulo-resultado">
                                                                    <h1>${porcentagem_acerto}% de acerto: ${levels[i].title}</h1>
                                                                </div>
                                                                <div>
                                                                    <div><img src="${levels[i].image}"></div>
                                                                    <div class="texto"><p>${levels[i].text}</p></div>
                                                                </div>
                                                            </div>
                                                            <div class="final-links">
                                                                <button class="reset-quiz" onclick="paginaQuizz(id_quizz)">Reiniciar Quiz</button>
                                                                <h2 onclick="renderizarQuizzesServer()">Voltar para home</h2>      
                                                            </div>`
                        proximaPergunta();
                        levels = [];
                        porcentagem_acerto = 0;
                        questions_qtd = 0;
                        qtd_acertos = 0;
                return;
            }
        }
    }   
}


//Renderizar form do quizz
function renderFormQuizz() {
    console.log("entrei no form do quizz");
    const container = document.querySelector(".principal");
    container.innerHTML = ` <form class="form-quizz-stt" action="/">
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
                                    <button type="submit" class="form-quizz-btn">Prosseguir pra criar perguntas</button>
                                </div>
                            </form>`;
    anexarEventos();
}

//Renderizar perguntas do quizz
function renderFormPergs(el) {

    const titulo = el.querySelector(".titulo").value;
    const imagem = el.querySelector(".imagem").value;
    const numPergs = parseInt(el.querySelector(".num-pergs").value);
    const numNiveis = parseInt(el.querySelector(".num-niveis").value);

    localStorage.setItem("quizz", JSON.stringify({
        title: titulo,
        image: imagem,
        questions: [],
        levels: numNiveis
    }));

    let perguntas = [];

    for (let i = 0; i < numPergs; i++) {

        let visibPerg, visibCard = "";

        if (i > 0) {
            visibPerg = "oculto";
        } else {
            visibCard = "oculto";
        }

        perguntas.push(`<div class="form-pergunta">
                            <div id="${visibPerg}">
                                <div class="pergunta">
                                    <h3>Pergunta ${i + 1}</h3>
                                    <input type="text" class="titulo" minlength="20" placeholder="Texto da pergunta" required>
                                    <input type="text"class="cor" pattern="${REGEX_HEXA_COLOR}" placeholder="Cor de fundo da pergunta" required>
                                </div>
                                <div class="resposta correta">
                                    <h3>Resposta correta</h3>
                                    <input type="text" class="texto" placeholder="Resposta correta" required>
                                    <input type="url" class="imagem" pattern="${REGEX_URL_IMG}" placeholder="URL da imagem" required>
                                </div>
                                <div class="resposta incorreta">
                                    <h3>Respostas incorretas</h3>
                                    <div class="incorreta um">
                                        <input type="text" class="texto" placeholder="Resposta incorreta 1" required>
                                        <input type="url" class="imagem" pattern="${REGEX_URL_IMG}" placeholder="URL da imagem 1" required>
                                    </div>
                                    <div class="incorreta dois">
                                        <input type="text" class="texto" placeholder="Resposta incorreta 2">
                                        <input type="url" class="imagem" pattern="${REGEX_URL_IMG}" placeholder="URL da imagem 2">
                                    </div>
                                    <div class="incorreta tres">
                                        <input type="text" class="texto" placeholder="Resposta incorreta 3">
                                        <input type="url" class="imagem" pattern="${REGEX_URL_IMG}" placeholder="URL da imagem 3">
                                    </div>
                                </div>
                            </div>
                            
                            <div class="card" id="${visibCard}">
                                <h3>Pergunta ${i + 1}</h3>
                                <a onclick=alterarVisibilidade(this.parentNode.parentNode.firstElementChild)>
                                    <img src="./assets/img/edit-btn.svg" alt="">
                                </a>
                            </div>
                        </div>`);
    }

    const container = document.querySelector(".principal");

    container.innerHTML = ` <form class="form-quizz-pergs">
                                <h2>Crie suas perguntas</h2>
                                <div>
                                ${perguntas.map(item => item)}
                                </div>
                                <div>
                                    <button type="submit" class="form-quizz-btn">Prosseguir pra criar níveis</button>
                                </div>
                            </form>`;
    anexarEventos();
}

//Renderizar niveis do quiz
function renderFormNiveis(el, numNiveis) {

    let stop = false;

    let dadosPerg = [];

    const perguntas = [...el.querySelectorAll(".form-pergunta")];

    perguntas.map(
        item => {
            let pergunta = {
                title: item.firstElementChild.children[0].children[1].value,
                color: item.firstElementChild.children[0].children[2].value,
                answers: [
                    {
                        text: item.firstElementChild.children[1].children[1].value,
                        image: item.firstElementChild.children[1].children[2].value,
                        isCorrectAnswer: true
                    }
                ]
            }

            const respIncorr = [...item.firstElementChild.children[2].children];

            respIncorr.map(
                resp => {

                    if (respIncorr.indexOf(resp) > 0) {

                        let texto = resp.children[0].value;
                        let url = resp.children[1].value;

                        if (!!texto && !!url) {
                            pergunta.answers.push(
                                {
                                    text: texto,
                                    image: url,
                                    isCorrectAnswer: false
                                }
                            );
                        } else {
                            if (!!texto || !!url) {
                                stop = true;
                            }
                        }
                    }

                }

            );

            dadosPerg.push(pergunta);
        }
    );

    let quizz = JSON.parse(localStorage.getItem("quizz"));
    quizz.questions = dadosPerg;
    localStorage.setItem("quizz", JSON.stringify(quizz));


    let niveis = [];

    for (let i = 0; i < numNiveis; i++) {


        if (stop) {
            alert("Cada resposta deve incluir uma url de imagem e vice-versa");
            break;
        }

        let visibPerg, visibCard, max = "";

        if (i > 0) {
            visibPerg = "oculto";
            max = 100;
        } else {
            visibCard = "oculto";
            max = 0;
        }

        niveis.push(
            `<div class="form-nivel">
                <div id="${visibPerg}">
                    <h3>Nível ${i + 1}</h3>
                    <div class="nivel">
                        <input type="text" minlength="10" placeholder="Título do nível" required>
                        <input type="number" min="0" max="${max}" placeholder="% de acerto mínima" required>
                        <input type="url" pattern="${REGEX_URL_IMG}" placeholder="URL da imagem do nível" required>
                        <input type="text" minlength="30" placeholder="Descrição do nível" required>
                    </div>
                </div>
                <div class="card" id="${visibCard}">
                    <h3>Nível ${i + 1}</h3>
                    <a onclick=alterarVisibilidade(this.parentNode.parentNode.firstElementChild)>
                        <img src="./assets/img/edit-btn.svg" alt="">
                    </a>
                </div>
            </div>`);
    }

    if (!stop) {

        const container = document.querySelector(".principal");

        container.innerHTML = ` <form class="form-quizz-niveis">
                                    <h2>Agora, decida os níveis</h2>
                                    <div>
                                    ${niveis.map(item => item)}
                                    </div>
                                    <div>
                                        <button class="form-quizz-btn">Finalizar Quizz</button>
                                    </div>
                                </form>`;

        anexarEventos();
    }


}

function salvarQuizz(el) {

    let dadosNiveis = [];

    const niveis = [...el.querySelectorAll(".form-nivel")];

    niveis.map(
        item => {
            let nivel = {
                title: item.firstElementChild.children[1].children[0].value,
                image: item.firstElementChild.children[1].children[2].value,
                text: item.firstElementChild.children[1].children[3].value,
                minValue: item.firstElementChild.children[1].children[1].value
            }

            dadosNiveis.push(nivel);
        }
    );


    let quizz = JSON.parse(localStorage.getItem("quizz"));
    quizz.levels = dadosNiveis;
    localStorage.setItem("quizz", JSON.stringify(quizz));

    enviarQuizz(quizz);

}


function enviarQuizz(obj) {


    const promisse = axios.post('https://mock-api.driven.com.br/api/v6/buzzquizz/quizzes', obj);

    promisse.then(resp => {

        let quizzesCriados = JSON.parse(localStorage.getItem("quizzesCriados"));
        if (!!quizzesCriados) {
            quizzesCriados.quizzes.push(resp.data);
            sucessoQuizz(resp.data);
        } else {
            localStorage.setItem("quizzesCriados", JSON.stringify({ quizzes: [resp.data] }));
        }

    });

    promisse.catch(resp => console.log(resp));
}

function sucessoQuizz(obj) {

    const container = document.querySelector(".principal");

    const quizz = `<div id=${obj.id} class="quizz" style="background-image:linear-gradient(to top, rgba(0,0,0,0.2) 1%, rgba(0,0,0,0.8) 8%, rgba(0,0,0,5) 23%, rgba(0,0,0,0)) ,url('${obj.image}')" onclick="paginaQuizz(${obj.id})">
                                    
                                        <div class="titulo">
                                            <h2>${obj.title}</h2>
                                        </div>
                                    </div>`;

    container.innerHTML = `  <div class="container-sucess-quizz">
                                <h2>Seu quizz está pronto!</h2>
                                ${quizz}
                                <button onclick="paginaQuizz(${obj.id})">Acessar Quizz</button>
                                <a href="#" onclick="window.location.reload()">Voltar pra home</a>
                            </div>`;


}

function alterarVisibilidade(el) {
    el.removeAttribute("id");
    el.nextElementSibling.setAttribute("id", "oculto");
}


function anexarEventos() {

    const criarQuizz = document.querySelector(".make-quizz");
    if (!!criarQuizz) {
        criarQuizz.addEventListener("click", (event) => {
            renderFormQuizz();
        });
    }


    const formQuizz = document.querySelector(".form-quizz-stt");
    if (!!formQuizz) {
        formQuizz.addEventListener('submit', (event) => {
            event.preventDefault();
            renderFormPergs(formQuizz);
        });
    }

    const formPergs = document.querySelector(".form-quizz-pergs");
    if (!!formPergs) {
        formPergs.addEventListener('submit', (event) => {
            event.preventDefault();
            const quizz = JSON.parse(localStorage.getItem("quizz"));
            renderFormNiveis(formPergs, parseInt(quizz.levels));
        });
    }

    const formNiveis = document.querySelector(".form-quizz-niveis");
    if (!!formNiveis) {
        formNiveis.addEventListener('submit', (event) => {
            event.preventDefault();
            const quizz = JSON.parse(localStorage.getItem("quizz"));
            salvarQuizz(formNiveis);
        });
    }

}

anexarEventos();


   
   





