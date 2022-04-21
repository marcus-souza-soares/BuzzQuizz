

function renderizarQuizzesServer(){


    const container = document.querySelector(".quizzes");
    const quizzes = (obj) => {
        const dados = obj.data;

        for (i = 0; i < dados.length; i++){
            container.innerHTML += `<div class="quizz">
                                        <img src=${dados[i].image}>
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

