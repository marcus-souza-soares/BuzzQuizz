
//Variavies globais

let id_quizz; // APENAS O NUMERO



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

        let questions_list = dados.questions.length;

        for (i = 0; i < questions_list; i++){
            document.querySelector("main").innerHTML += `<div id="container${i}" class="container">
                                                            <div  class="titulo-pergunta">
                                                                <h1>${dados.questions[i].title}</h1>
                                                            </div>
                                                            <div id="pergunta${i}" class="alternativas">

                                                            </div>
                                                        </div>`
            document.querySelector(`#container${i} .titulo-pergunta`).style.backgroundColor = dados.questions[i].color;

            const renderAlternativas = dados.questions[i].answers.map(function (resposta) {
            document.querySelector(`#pergunta${i}`).innerHTML +=    `<div>
                                                                        <img src="${resposta.image}">
                                                                        <h2>${resposta.text}</h2>
                                                                    </div>`
            });
    
        }
        
                                                    
    }
        
        

     // COLOQUEI A VERSÃO DA TURMA 4 APENAS PARA VER COMO FICARIA
    const promiseGet = axios.get(`https://mock-api.driven.com.br/api/v6/buzzquizz/quizzes/${elemento.id}`);
    promiseGet.then(quizzes);

}

//Função para adicionar eventos dos componentes renderizados
function anexarEventos(){
    document.querySelector(".make-quizz").addEventListener("click", function () {
        renderFormQuizz();
    });
}

anexarEventos();

//Renderizar form do quizz
function renderFormQuizz(){
    const container = document.querySelector(".principal");

    container.innerHTML = ` <div class="form-quizz-stt">
                                <div>
                                    <h2>Comece pelo começo</h2>
                                    <div class="box-inputs">
                                        <input type="text" placeholder="Título do seu quizz">
                                        <input type="text" placeholder="URL da imagem do seu quizz">
                                        <input type="text" placeholder="Quantidade de perguntas do quizz">
                                        <input type="text" placeholder="Quantidade de níveis do quizz">
                                    </div>
                                </div>
                                <div>
                                    <button onclick="renderFormPergs()">Prosseguir pra criar perguntas</button>
                                </div>
                            </div>`;

    
}