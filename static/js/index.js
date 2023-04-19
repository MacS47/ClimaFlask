
function celsiusToFahrenheit(cel_degrees) {
    fah_degrees = cel_degrees * (9 / 5) + 32;
    return fah_degrees;
}
function fahrenheitToCelsius(fah_degrees) {
    cel_degrees = (fah_degrees - 32) * (5 / 9);
    return cel_degrees;
}
function changeTheme() {
    
    let theme = document.getElementById("theme-button");
    let icon_theme = document.getElementById("theme-button-icon");
    let body_color = document.getElementsByTagName("body");
    
    let toggleThemeFlag = false;
    let bd_white_elements = document.getElementsByClassName("bd-white");

    if (theme){

        theme.onclick = function() {
            if (toggleThemeFlag == false) {
                
                icon_theme.classList.remove("fa-moon");
                icon_theme.classList.add("fa-sun");

                toggleThemeFlag = true;
                body_color[0].style["background"] = "#121212";


                for (i = 0; i < bd_white_elements.length; i++) {
                    bd_white_elements[i].classList.add("bd-warm");
                    bd_white_elements[i].classList.add("color-warm");
                }
            } else {
                
                icon_theme.classList.remove("fa-sun");
                icon_theme.classList.add("fa-moon");

                toggleThemeFlag = false;
                body_color[0].style["background"] = "#f7f7f7";

                for (i = 0; i < bd_white_elements.length; i++) {
                    bd_white_elements[i].classList.remove("bd-warm");
                    bd_white_elements[i].classList.remove("color-warm");
                }
            }
        }
    }
}
function mainCardSpawn(){

    const toggle_metrics = document.getElementById("toggle-metrics");
    const refresh_data = document.getElementById("refresh-data-button");
    const show_data = document.getElementById("show-data-button");
    const main = document.getElementById("main");

    if (main){

        if (toggle_metrics) {
            toggle_metrics.onclick = function () {
                
                current_metric = document.getElementsByClassName("current-temperature-metrics")[0].innerHTML;
        
                if (current_metric == "C") {
                    document.getElementsByClassName("current-temperature-metrics")[0].innerHTML = "F";
                    document.getElementsByClassName("toggle-temperature-metrics")[0].innerHTML = "C";
                    temp = document.getElementsByClassName("temp");
        
                    for (i = 0; i < temp.length; i++) {
                        celsius = Number(temp[i].innerHTML);
                        temp[i].innerHTML = Math.round(celsiusToFahrenheit(celsius));
                    }
                    current_metric = "F";
                } else {
                    document.getElementsByClassName("current-temperature-metrics")[0].innerHTML = "C";
                    document.getElementsByClassName("toggle-temperature-metrics")[0].innerHTML = "F";
                    temp = document.getElementsByClassName("temp");
        
                    for (i = 0; i < temp.length; i++) {
                        fahrenheit = Number(temp[i].innerHTML);
                        temp[i].innerHTML = Math.round(fahrenheitToCelsius(fahrenheit));
                    }
                    current_metric = "C";
                }
            }
        }
        if (show_data) {
            show_data.onclick = function() {
                statistics_container =
                    document.getElementsByClassName("weather-statistics");
        
                statistics_table = document.getElementsByClassName(
                    "weather-statistics-table"
                );
        
                button = document.getElementById("show-data-button-i");
                button_class = button.className;
        
                if (button_class == "fa-solid fa-chevron-down") {
                    button.className = "fa-solid fa-chevron-up";
                    statistics_container[0].classList.add("show");
                    setTimeout(function () {
                        statistics_table[0].style.display = "initial";
                    }, 300);
                } else {
                    button.className = "fa-solid fa-chevron-down";
                    statistics_table[0].style.display = "none";
                    setTimeout(function () {
                        statistics_container[0].classList.remove("show");
                    }, 100);
                }
            }
        }
        if (refresh_data){
            refresh_data.onclick = function() {
                window.location.reload(true);
            }
        }

        function updateTime() {
            date = new Date();
            currentTime = date.toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
            });
            currentTimeElementList = document.getElementsByClassName("current-time");
            currentTimeElementList[0].innerHTML = currentTime;
        }
        function setMainColor() {
            date = new Date();
            hour = date.getHours();
            main = document.getElementsByClassName("main");
            bg = "linear-gradient(#032233,#0083c97e) no-repeat";

            if (hour > 17 || hour < 06) {
                main[0].style["background"] = bg;
            }
        }
        function setWindDegrees() {
            icon_rot = document.getElementById("icon-rot");
            wind_deg = Number(document.getElementById("wind-deg").innerHTML);
            wind = wind_deg + 135 + "deg";
            icon_rot.style["rotate"] = wind;
        }
        
        updateTime();
        setMainColor();
        setWindDegrees();
    }
}

changeTheme();
mainCardSpawn();
