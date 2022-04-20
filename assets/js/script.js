
function renderizarQuizzesServer(){


    const container = document.querySelector(".quizzes");
    const quizzes = (obj) => {
        const dados = obj.data;


        container.innerHTML += `<div class="quizz">
                                    <img src=${dados.image}>
                                    <h2>${dados.title}</h2>
                                </div>`

    } 
    const promiseGet = axios.get('https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes/2');
    promiseGet.then(quizzes);
}
renderizarQuizzesServer();




console.log("teste de git");