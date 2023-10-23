// Função utilizada para converter valores de graus centígrados para farenheit
function celsiusToFahrenheit(cel_degrees) {
    // Retornando o valor convertido para farenheit
    return (cel_degrees * (9 / 5) + 32);
}

// Função utilizada para converter valores de graus farenheit para centígrados
function fahrenheitToCelsius(fah_degrees) {    
    // Retornando o valor obtido em graus
    return ((fah_degrees - 32) * (5 / 9));
}

// Função utilizada para obter o tema atual da página, baseado nos dados da sessão
function getSessionTheme(){
    // Retornando uma promessa, para que a função possa ser utilizada com async/await
    return new Promise( function(resolve, reject){
        $.get("/theme", function (data) {
            resolve(data.theme);
        });
    });
};

// Função utilizada para definir o tema da página e armazená-lo na sessão
function setSessionTheme(theme){
    $.post("/theme/"+theme);
};

// Função utilizada para alterar o tema da página, baseado no input do usuário
async function toggleAppTheme(onStart = false) {
    
    // Obtendo o tema atual da página
    let currentTheme = await getSessionTheme();
    
    // Definindo variáveis
    let bkgDark = "#121212";
    let bkgLight = "linear-gradient(#315b9f 50%, #0083c97e 100%)";
    let icon_theme = document.getElementById("theme-button-icon");
    let body_color = document.getElementsByTagName("body");


    // Verificando se é a primeira vez que a função é executada
    // Se for a primeira vez as cores são definidas baseadas no tema atual da página baseado no dados da sessão
    if (onStart){

        // Verificando qual o tema atual da página
        if(currentTheme === 'dark'){

            // Alterando o ícone do botão de tema para o ícone do tema escuro
            icon_theme.classList.remove("fa-moon");
            icon_theme.classList.add("fa-sun");

            // Alterando a flag de controle de tema na sessão
            body_color[0].style["background"] = bkgDark;

        }
        else{

            // Alterando o ícone do botão de tema para o ícone do tema claro
            icon_theme.classList.remove("fa-sun");
            icon_theme.classList.add("fa-moon");

            // Alterando a flag de controle de tema na sessão
            body_color[0].style["background"] = bkgLight;
            
        }

    }else{
        // Se não for a primeira vez que a função é executada, o tema é alterado

        if(currentTheme === 'light'){

            // Alterando o ícone do botão de tema para o ícone do tema escuro
            icon_theme.classList.remove("fa-moon");
            icon_theme.classList.add("fa-sun");

            // Alterando a cor do plano de fundo para o tema escuro
            body_color[0].style["background"] = bkgDark;

            // Alterando a flag de controle de tema na sessão
            setSessionTheme('dark');

        }
        else{
            // Alterando o ícone do botão de tema para o ícone do tema claro
            icon_theme.classList.remove("fa-sun");
            icon_theme.classList.add("fa-moon");

            // Alterando a cor do plano de fundo para o tema claro
            body_color[0].style["background"] = bkgLight;
            
            // Alterando a flag de controle de tema na sessão
            setSessionTheme('light');
        }
    };
};


// Função utilizada para aplicar diversas configurações quando a página weather for acessada
function mainCardSpawn() {
    // Determinando valores, com base em elementos da página
    const toggle_metrics = document.getElementById("toggle-metrics");
    const refresh_data = document.getElementById("refresh-data-button");
    const show_data = document.getElementById("show-data-button");
    const main = document.getElementById("main");

    // Condicionando a execução do código à existência do card de temperatura
    // para evitar erros ao carregar a página
    if (main) {
        // Condicionando execução do código, para evitar erros
        if (toggle_metrics) {
            // Atribuindo uma função à ocorrência de eventos (listener)
            toggle_metrics.onclick = function () {
                // Obtendo elemento da página, com o intuito de verificar a unidade de medida utilizada
                let current_metric = document.getElementsByClassName(
                    "current-temperature-metrics"
                )[0].innerHTML;

                // Condicionando ação do listener, baseado na unidade de medidas em exibição
                if (current_metric == "C") {
                    // Ajustando interface do card de temperatura para atender a exibição da nova unidade de medidas
                    document.getElementsByClassName(
                        "current-temperature-metrics"
                    )[0].innerHTML = "F";
                    document.getElementsByClassName(
                        "toggle-temperature-metrics"
                    )[0].innerHTML = "C";

                    // Obtendo lista de elementos que exibem temperatura na página
                    tempCelsius = Array.from(document.getElementsByClassName("temp"));

                    // Laço utilizado para alterar o valor de cada elemento com dados de temperatura, para a unidade de medidas em questão
                    tempCelsius.forEach((element) => {
                        element.innerHTML = Math.round(celsiusToFahrenheit(Number(element.innerHTML)));
                    });

                    // Definindo o conteúdo do elemento que possui a unidade de medidas
                    current_metric = "F";
                } else {
                    // Ajustando interface do card de temperatura para atender a exibição da unidade de medidas padrão
                    document.getElementsByClassName("current-temperature-metrics")[0].innerHTML = "C";
                    document.getElementsByClassName("toggle-temperature-metrics")[0].innerHTML = "F";

                    // Obtendo lista de elementos que exibem temperatura na página
                    tempFarenheit = Array.from(document.getElementsByClassName("temp"));

                    // Laço utilizado para alterar o valor de cada elemento com dados de temperatura, para a unidade de medidas em questão
                    tempFarenheit.forEach((element) => {
                        element.innerHTML = Math.round(fahrenheitToCelsius(Number(element.innerHTML)));
                    });

                    // Definindo o conteúdo do elemento que possui a unidade de medidas
                    current_metric = "C";
                }
            };
        }

        // Condicionando a execução do código, para evitar erros
        if (show_data) {
            // Atribuindo ação à ocorrência de eventos na página (listener)
            show_data.onclick = function () {
                // Obtendo elementos da página
                statistics_container = document.getElementsByClassName("weather-statistics");
                statistics_table = document.getElementsByClassName("weather-statistics-table");
                button = document.getElementById("show-data-button-i");
                button_class = button.className;

                // Verificando o ícone exibido, para determinar qual ação será realizada quando o evento ocorrer
                if (button_class == "fa-solid fa-chevron-down") {
                    // Alterando a classe do elemento
                    button.className = "fa-solid fa-chevron-up";
                    statistics_container[0].classList.add("show");

                    // Criando delay para exibição do dados climáticos adicionais, utilizado para criar uma visualização mais suave
                    setTimeout(function () {
                        statistics_table[0].style.display = "initial";
                    }, 300);
                } else {
                    // Alterando a classe do elemento
                    button.className = "fa-solid fa-chevron-down";
                    statistics_table[0].style.display = "none";

                    // Criando delay para exibição do dados climáticos adicionais, utilizado para criar uma visualização mais suave
                    setTimeout(function () {
                        statistics_container[0].classList.remove("show");
                    }, 100);
                }
            };
        }

        // Condicionando a execução do código, para evitar erros
        if (refresh_data) {
            // Atribuindo ação à ocorrência de eventos
            refresh_data.onclick = function () {
                // Atualizando a página
                window.location.reload(true);
            };
        }

        // Função responsável por atualizar a data de refresh no card de temperatura
        // Para o horário do navegador do usuário, devido a divergências de fuso-horários
        function updateTime() {
            date = new Date();
            currentTime = date.toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
            });
            currentTimeElementList =
                document.getElementsByClassName("current-time");
            currentTimeElementList[0].innerHTML = currentTime;
        }

        // Essa função é utilizada para definir a rotação em graus do ícone que exibe a direção do vento
        function setWindDegrees() {
            icon_rot = document.getElementById("icon-rot");
            wind_deg = Number(document.getElementById("wind-deg").innerHTML);
            wind = wind_deg + 135 + "deg";
            icon_rot.style["rotate"] = wind;
        }

        // Chamando as funções que devem ser executadas assim que a página é carregada, condicionadas a
        // existência do card de temperatura
        updateTime();
        setWindDegrees();
    }
}

// Função utilizada para definir o tema inicial da página, baseado nos dados da sessão
toggleAppTheme(true);

// Função utilizada para executar o código apenas quando a página for carregada
document.addEventListener("DOMContentLoaded", function () {

    // Definindo variáveis
    let is_set = false
    let themeButton = document.querySelector(`.theme-button`);
    
    // Adicionando um listener ao botão de tema
    themeButton.addEventListener(`click`, () => {
        toggleAppTheme();
    });
    // Chamando a função que lida com a exibição dos dados climáticos
    mainCardSpawn();
});
