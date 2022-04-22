
//Variavies globais

let id_quizz; // APENAS O NUMERO
const REGEX_URL_IMG = "^((http)|(https)|(ftp)):\/\/+(.)+(?:jpg|gif|png|jpeg)$";
const REGEX_HEXA_COLOR = "^#([A-Fa-f0-9]{6})$";


function renderizarQuizzesServer(){

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
//renderizarQuizzesServer();




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
            document.querySelector("main").innerHTML += `<div class="container">
                                                        <div class="titulo-pergunta">
                                                            <h1>${dados.questions[i].title}</h1>
                                                        </div>
                                                        <div class="perguntas">

                                                        </div>
                                                    </div>`
        }
        
                                                    
    }
        
        

     // COLOQUEI A VERSÃO DA TURMA 4 APENAS PARA VER COMO FICARIA
    const promiseGet = axios.get(`https://mock-api.driven.com.br/api/v6/buzzquizz/quizzes/${elemento.id}`);
    promiseGet.then(quizzes);

}



//Renderizar form do quizz
function renderFormQuizz(){
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

  localStorage.setItem('quizz', {
      title: titulo,
      image: imagem,
      questions: []
  });

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
                                    <button class="form-quizz-btn" onclick="renderFormNiveis(this.parentNode.previousSibling,${numNiveis})">Prosseguir pra criar níveis</button>
                                </div>
                            </form>`;

}

//Renderizaconsole.log("entrou");r níveis do quizz
function renderFormNiveis(el, numNiveis){

   /*  const titulos = [...el.querySelectorAll(".pergunta").childNodes[1]];
    const cores = [...el.querySelectorAll(".pergunta").querySelectorAll(".cor").value];
    const textRespCorr = [...el.querySelectorAll(".resposta.correta").querySelectorAll(".texto").value];
    const imgRespCorr = [...el.querySelectorAll(".resposta.correta").querySelectorAll(".imagem").value];
    const textRespInc1 = [...el.querySelectorAll(".resposta.incorreta").querySelectorAll(".incorreta-um").querySelectorAll(".texto").value];
    const imgRespInc1 = [...el.querySelectorAll(".resposta.incorreta").querySelectorAll(".incorreta-um").querySelectorAll(".imagem").value];
    const textRespInc2 = [...el.querySelectorAll(".resposta.incorreta").querySelectorAll(".incorreta-dois").querySelectorAll(".texto").value];
    const imgRespInc2 = [...el.querySelectorAll(".resposta.incorreta").querySelectorAll(".incorreta-dois").querySelectorAll(".imagem").value];
    const textRespInc3 = [...el.querySelectorAll(".resposta.incorreta").querySelectorAll(".incorreta-tres").querySelectorAll(".texto").value];
    const imgRespInc3 = [...el.querySelectorAll(".resposta.incorreta").querySelectorAll(".incorreta-trs").querySelectorAll(".imagem").value]; */

    console.log(titulos);
   /*  console.log(cores);
    console.log(textRespCorr);
    console.log(imgRespCorr);
    console.log(textRespInc1);
    console.log(imgRespInc1);
    console.log(textRespInc2);
    console.log(textRespInc3);
    console.log(imgRespInc2); */




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
                                    <button class="form-quizz-btn" onclick="salvarQuizz()">Prosseguir pra criar níveis</button>
                                </div>
                            </form>`;

}

function salvarQuizz(){
    console.log("salvei");
}

   
   
   
   





