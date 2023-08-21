function isSetDarkTheme() {
    const cookie_list = document.cookie.split(";");
    let is_set = false;

    {
        cookie_list.map(element => {
            element === "theme=dark-theme" && (is_set = true);
        });
    }
    return is_set;
}

function changeTheme(is_set) {
    if (is_set) {
        
        // Variável utilizada para verificar se o card main é exibido
        let main_exists = document.getElementById("main");

        // Determinando valores, com base em elementos da página
        let icon_theme = document.getElementById("theme-button-icon");
        let icon_search = document.getElementById("search-button-icon");
        let body_color = document.getElementsByTagName("body");

        let items = document.getElementsByClassName("bd-white");
        let bd_white_elements = Array.from(items);
        items = document.getElementsByClassName("no-bd");
        let no_bd_elements = Array.from(items);

        // Alterando a classe para exibir o botão de tema apropriado
        icon_theme.classList.remove("fa-moon");
        icon_theme.classList.add("fa-sun");

        // Alterando a classe para exibir os ícones da página com o tema escuro
        icon_search.classList.add("color-warm");

        if (main_exists) {
            let icon_show_data = document.getElementById("show-data-button-i");
            let icon_refresh_data = document.getElementById(
                "refresh-data-button-i"
            );
            icon_show_data.classList.add("color-warm");
            icon_refresh_data.classList.add("color-warm");
        }

        // Alterando cor do texto placeholder para o tema claro
        document.documentElement.style.setProperty(
            "--placeholder-color",
            "#e6e2d3"
        );

        // Alterando o valor da flag e modificando a cor do plano de fundo
        toggleThemeFlag = true;
        body_color[0].style["background"] = "#121212";

        // Atualizado:
        // O laço antigo foi substituído por JSX
        {
            bd_white_elements.map((element) => {
                element.classList.add("bd-warm", "color-warm");
            });
        }

        // Laço criado para incluir as classes bd-warm e color-warm, com o objetivo
        // de alterar o estilo dos elementos da página, para o tema escuro
        // for (i = 0; i < bd_white_elements.length; i++) {
        //     bd_white_elements[i].classList.add("bd-warm");
        //     bd_white_elements[i].classList.add("color-warm");
        // }

        // Atualizado:
        // O laço antigo foi substituído por JSX

        {
            no_bd_elements.map((element) => {
                element.classList.add("bd-warm", "color-warm");
            });
        }

        // Esse segundo laço é utilizado para manipular elementos que não possuam borda
        // nesta situação incluir borda com cor diferente
        // for (i = 0; i < no_bd_elements.length; i++) {
        //     no_bd_elements[i].classList.add("bd-warm");
        //     no_bd_elements[i].classList.add("color-warm");
        // }

        document.cookie = "theme=dark-theme";
        // console.log("Alterado para o tema escuro");
    }
}
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

let theme = document.getElementById("theme-button");

// Função utilizada para alterar o tema da página, baseado no input do usuário
theme.onclick = function () {
    // console.log("Clicou no botão tema");

    // Variável utilizada para verificar se o card main é exibido
    let main_exists = document.getElementById("main");

    // Determinando valores, com base em elementos da página
    let icon_theme = document.getElementById("theme-button-icon");
    let icon_search = document.getElementById("search-button-icon");
    let body_color = document.getElementsByTagName("body");

    let items = document.getElementsByClassName("bd-white");
    let bd_white_elements = Array.from(items);
    items = document.getElementsByClassName("no-bd");
    let no_bd_elements = Array.from(items);

    // Verificando se o tema atual é claro (flag falsa)
    if (!isSetDarkTheme()) {
        // Alterando a classe para exibir o botão de tema apropriado
        icon_theme.classList.remove("fa-moon");
        icon_theme.classList.add("fa-sun");

        // Alterando a classe para exibir os ícones da página com o tema escuro
        icon_search.classList.add("color-warm");

        if (main_exists) {
            let icon_show_data = document.getElementById("show-data-button-i");
            let icon_refresh_data = document.getElementById(
                "refresh-data-button-i"
            );
            icon_show_data.classList.add("color-warm");
            icon_refresh_data.classList.add("color-warm");
        }

        // Alterando cor do texto placeholder para o tema claro
        document.documentElement.style.setProperty(
            "--placeholder-color",
            "#e6e2d3"
        );

        // Alterando o valor da flag e modificando a cor do plano de fundo
        toggleThemeFlag = true;
        body_color[0].style["background"] = "#121212";

        // Atualizado:
        // O laço antigo foi substituído por JSX
        {
            bd_white_elements.map((element)=>{
                element.classList.add("bd-warm", "color-warm");
            });
        }

        // Atualizado:
        // O laço antigo foi substituído por JSX
        {
            no_bd_elements.map((element)=>{
                element.classList.add("bd-warm", "color-warm");
            });
        }

        // Esse segundo laço é utilizado para manipular elementos que não possuam borda
        // nesta situação incluir borda com cor diferente
        // for (i = 0; i < no_bd_elements.length; i++) {
        //     no_bd_elements[i].classList.add("bd-warm");
        //     no_bd_elements[i].classList.add("color-warm");
        // }

        document.cookie = "theme=dark-theme";
        // console.log("Alterado para o tema escuro");
    } else {
        
        // Alterando a classe para exibir o botão de tema adequado
        icon_theme.classList.remove("fa-sun");
        icon_theme.classList.add("fa-moon");

        // Alterando a classe para exibir os ícones da página com o tema claro
        icon_search.classList.remove("color-warm");

        if (main_exists) {
            let icon_show_data = document.getElementById("show-data-button-i");
            let icon_refresh_data = document.getElementById(
                "refresh-data-button-i"
            );
            icon_show_data.classList.remove("color-warm");
            icon_refresh_data.classList.remove("color-warm");
        }

        // Alterando cor do texto placeholder para o tema claro
        document.documentElement.style.setProperty(
            "--placeholder-color",
            "#757575"
        );

        // Alterando o valor da flag e modificando a cor do plano de fundo para o padrão
        toggleThemeFlag = false;
        body_color[0].style["background"] = "#f7f7f7";

        // Atualizado:
        // O laço antigo foi substituído por JSX
        {
            bd_white_elements.map((element)=>{
                element.classList.remove("bd-warm", "color-warm");
            });
        }

        // Laço criado para remover as classes bd-warm e color-warm, com o objetivo
        // de alterar o estilo dos elementos da página, para o tema claro
        // for (i = 0; i < bd_white_elements.length; i++) {
        //     bd_white_elements[i].classList.remove("bd-warm");
        //     bd_white_elements[i].classList.remove("color-warm");
        // }

        // Atualizado:
        // O laço antigo foi substituído por JSX
        {
            no_bd_elements.map((element)=>{
                element.classList.remove("bd-warm", "color-warm");
            });
        }

        // Esse segundo laço é utilizado para manipular elementos que não possuam borda
        // neste caso remover a borda do tema escuro
        // for (i = 0; i < no_bd_elements.length; i++) {
        //     no_bd_elements[i].classList.remove("bd-warm");
        //     no_bd_elements[i].classList.remove("color-warm");
        // }

        document.cookie = "theme=light-theme";
        // console.log("Alterado para o tema claro");
    }
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
                    temp = document.getElementsByClassName("temp");

                    for (i = 0; i < temp.length; i++) {
                        celsius = Number(temp[i].innerHTML);
                        temp[i].innerHTML = Math.round(
                            celsiusToFahrenheit(celsius)
                        );
                    }

                    // Definindo o conteúdo do elemento que possui a unidade de medidas
                    current_metric = "F";
                } else {
                    // Ajustando interface do card de temperatura para atender a exibição da unidade de medidas padrão
                    document.getElementsByClassName(
                        "current-temperature-metrics"
                    )[0].innerHTML = "C";
                    document.getElementsByClassName(
                        "toggle-temperature-metrics"
                    )[0].innerHTML = "F";

                    // Obtendo lista de elementos que exibem temperatura na página
                    temp = document.getElementsByClassName("temp");

                    // Laço utilizado para alterar o valor de cada elemento com dados de temperatura, para a unidade de medidas em questão
                    for (i = 0; i < temp.length; i++) {
                        fahrenheit = Number(temp[i].innerHTML);
                        temp[i].innerHTML = Math.round(
                            fahrenheitToCelsius(fahrenheit)
                        );
                    }

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
                statistics_container =
                    document.getElementsByClassName("weather-statistics");
                statistics_table = document.getElementsByClassName(
                    "weather-statistics-table"
                );
                button = document.getElementById("show-data-button-i");
                button_class = button.className;

                // Verificando o ícone exibido, para determinar qual ação será realizada quando o evento ocorrer
                if (button_class == "fa-solid fa-chevron-down") {
                    // Alterando a classe do elemento
                    button.className = "fa-solid fa-chevron-up";
                    statistics_container[0].classList.add("show");

                    // Criando delay para exibição do dados climáticos adicionais, utilizado para criar uma
                    // visualização mais suave
                    setTimeout(function () {
                        statistics_table[0].style.display = "initial";
                    }, 300);
                } else {
                    // Alterando a classe do elemento
                    button.className = "fa-solid fa-chevron-down";
                    statistics_table[0].style.display = "none";

                    // Criando delay para exibição do dados climáticos adicionais, utilizado para criar uma
                    // visualização mais suave
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

        // Função criada para alterar a cor do card temperatura, baseado na hora do navegador do usuário,
        // a partir das 18h, o card passa a apresentar uma cor mais escura.
        function setMainColor() {
            date = new Date();
            hour = date.getHours();
            main_temperature = document.getElementsByClassName("main");
            bg = "linear-gradient(#032233,#0083c97e) no-repeat";

            // Verificando a hora do dia para alterar a cor do card.
            if (hour > 17 || hour < 06) {
                main_temperature[0].style["background"] = bg;
            }
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
        setMainColor();
        setWindDegrees();
    }
}

document.addEventListener("DOMContentLoaded", function () {
    // Funções executadas ao abrir a página, independente do conteúdo existente
    let is_set = false
    is_set = isSetDarkTheme()
    changeTheme(is_set);
    mainCardSpawn();
});
