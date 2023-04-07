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



document.getElementById("toggle-metrics").onclick = toFahrenheit;

setMainColor();