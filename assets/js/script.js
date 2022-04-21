
//Variavies globais
let id_quizz;





function renderizarQuizzesServer(){

    const container = document.querySelector(".quizzes");
    const quizzes = (obj) => {
        const dados = obj.data;

        for (i = 0; i < dados.length; i++){
            container.innerHTML += `<div class="quizz" style="background-image:linear-gradient(to top, rgba(0,0,0,0.2) 1%, rgba(0,0,0,0.8) 8%, rgba(0,0,0,5) 23%, rgba(0,0,0,0)) ,url(${dados[i].image})" onclick="paginaQuizz()">
                                    
                                        <div class="titulo">
                                            <h2>${dados[i].title}</h2>
                                        </div>
                                    </div>`
        }

        //GUARDAR O ID DO QUIZ

    } // COLOQUEI A VERSÃO DA TURMA 4 APENAS PARA VER COMO FICARIA
    const promiseGet = axios.get('https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes');
    promiseGet.then(quizzes);
}
renderizarQuizzesServer();




// Parte do código de abrir um quiz - do usuario ou do sever

function paginaQuizz () {

    //@LIMPAR A PÁGINA@
    const container = document.querySelector("body");
    container.innerHTML = `<header>
                                <h1>BuzzQuizz</h1>
                            </header>
                            <nav class="capa">
                                
                            </nav>
                            <main>

                            </main>`

    const quizzes = (obj) => {
        const dados = obj.data;
        //apenas para ver se ta funcionando, o codigo ta sendo construido
        console.log(id_quizz);    
       
    }
        
        

     // COLOQUEI A VERSÃO DA TURMA 4 APENAS PARA VER COMO FICARIA
    const promiseGet = axios.get(`https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes/${id_quizz}`);
    promiseGet.then(quizzes);

}