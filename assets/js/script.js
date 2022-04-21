
//Variavies globais

let id_quizz; // APENAS O NUMERO



function renderizarQuizzesServer(){

    const container = document.querySelector(".quizzes");
    const quizzes = (obj) => {
        const dados = obj.data;

        for (i = 0; i < dados.length; i++){
            container.innerHTML += `<div id=${dados[i].id} class="quizz" style="background-image:linear-gradient(to top, rgba(0,0,0,0.2) 1%, rgba(0,0,0,0.8) 8%, rgba(0,0,0,5) 23%, rgba(0,0,0,0)) ,url(${dados[i].image})" onclick="paginaQuizz(this)">
                                    
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
       
    }
        
        

     // COLOQUEI A VERSÃO DA TURMA 4 APENAS PARA VER COMO FICARIA
    const promiseGet = axios.get(`https://mock-api.driven.com.br/api/v6/buzzquizz/quizzes/${elemento.id}`);
    promiseGet.then(quizzes);

}