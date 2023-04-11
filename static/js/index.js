function celsiusToFahrenheit(cel_degrees) {
    fah_degrees = cel_degrees * (9 / 5) + 32;
    return fah_degrees;
}
function fahrenheitToCelsius(fah_degrees) {
    cel_degrees = (fah_degrees - 32) * (5 / 9);
    return cel_degrees;
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
function setWindDegrees(){
    icon_rot = document.getElementById("icon-rot");
    wind_deg = Number(document.getElementById("wind-deg").innerHTML);
    
    wind = wind_deg + 135 + "deg";

    icon_rot.style["rotate"] = wind;
}

function toFahrenheit(){

    current_metric = document.getElementsByClassName("current-temperature-metrics")[0].innerHTML;

    if (current_metric == "C" ){

        document.getElementsByClassName("current-temperature-metrics")[0].innerHTML = "F";
        document.getElementsByClassName("toggle-temperature-metrics")[0].innerHTML = "C";
        temp = document.getElementsByClassName("temp")
        
        for(i = 0; i < temp.length; i++){
            celsius = Number(temp[i].innerHTML);
            temp[i].innerHTML = Math.round( celsiusToFahrenheit( celsius ) );
        }
        current_metric = "F";
    }else{

        document.getElementsByClassName("current-temperature-metrics")[0].innerHTML = "C";
        document.getElementsByClassName("toggle-temperature-metrics")[0].innerHTML = "F";
        temp = document.getElementsByClassName("temp")
        
        for(i = 0; i < temp.length; i++){
            fahrenheit = Number(temp[i].innerHTML);
            temp[i].innerHTML = Math.round( fahrenheitToCelsius( fahrenheit ) );
        }
        current_metric = "C";

    }
}
function toShowStatistics(){
    statistics_container = document.getElementsByClassName("weather-statistics");
    
    statistics_table = document.getElementsByClassName("weather-statistics-table");    

    button = document.getElementById("show-data-button-i");
    button_class = button.className;

    if (button_class == "fa-solid fa-chevron-down"){
        button.className = "fa-solid fa-chevron-up";
        statistics_container[0].classList.add('show');
        setTimeout(
            function(){
                statistics_table[0].style.display = 'initial';
            }
            ,300);
    }
    else{
        button.className = "fa-solid fa-chevron-down";
        statistics_table[0].style.display = 'none'
        setTimeout(
            function(){
                statistics_container[0].classList.remove('show');
            }
        ,100);
    }
}
function toRefresh(){
    window.location.reload(true);
}
document.getElementById("toggle-metrics").onclick = toFahrenheit;

document.getElementById("refresh-data-button").onclick = toRefresh;

document.getElementById("show-data-button").onclick = toShowStatistics;

setMainColor();
setWindDegrees();