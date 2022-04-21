
//Variavies globais
let id_quizz;





function renderizarQuizzesServer(){


    const container = document.querySelector(".quizzes");
    const quizzes = (obj) => {
        const dados = obj.data;

        for (i = 0; i < dados.length; i++){
            container.innerHTML += `<div class="quizz" style="background-image:url(${dados[i].image})" onclick="paginaQuizz()">
                                    
                                        <div class="titulo">
                                            <h2>${dados[i].title}</h2>
                                        </div>
                                    </div>`
        }
        
        

    } // COLOQUEI A VERSÃO DA TURMA 4 APENAS PARA VER COMO FICARIA
    const promiseGet = axios.get('https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes');
    promiseGet.then(quizzes);
}
renderizarQuizzesServer();




// Parte do código de abrir um quiz

function paginaQuizz () {

    //@LIMPAR A PÁGINA@
    const container = document.querySelector(".principal");
    container.innerHTML = ""

    const quizzes = (obj) => {
        const dados = obj.data;
        //apenas para ver se ta funcionando, o codigo ta sendo construido do teste.js
            console.log("123456")
       
    }
        
        

     // COLOQUEI A VERSÃO DA TURMA 4 APENAS PARA VER COMO FICARIA
    const promiseGet = axios.get('https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes');
    promiseGet.then(quizzes);

}