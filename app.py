from flask import Flask, render_template, redirect, url_for, request
from datetime import datetime
import requests

app     = Flask(__name__)

token   = ''
city    = ''
# Função criada para converter M/s para Km/h
def ms_to_kmh(speed_ms : float) -> float:
    speed_km : float = speed_ms * 3.6
    return speed_km

@app.route('/')
def index():
    # Obtendo dados a partir da API e armazenando a resposta em uma variável
    response     = requests.get(f'http://api.openweathermap.org/data/2.5/weather?q={city}&units=metric&lang=pt_br&APPID={token}')
    json         = response.json()

    # Buscando dados do dicionários no arquivo JSON
    weather_dict = json['weather']
    main         = json['main']
    wind         = json['wind']
    dt           = json['dt']
    sys          = json['sys']

    # Obtendo dia e hora atual, convertendo para HH:MM e armazenando em uma variável
    current_time = datetime.fromtimestamp(dt).strftime('%H:%M')
    sunrise_time = datetime.fromtimestamp( sys.get('sunrise') ).strftime('%H:%M')
    sunset_time  = datetime.fromtimestamp( sys.get('sunset') ).strftime('%H:%M')

    # Manipulação de dicionários
    dict_aux     = weather_dict[0]
    weather      = dict_aux

    temp         = round( main.get('temp') )
    temp_min     = round( main.get('temp_min') )
    temp_max     = round( main.get('temp_max') )
    feels_like   = round( main.get('feels_like') )
    description  = weather.get('description').capitalize()
    humidity     = main.get('humidity')
    pressure     = main.get('pressure')
    visibility   = round( json.get('visibility') / 1000 )
    speed        = round( ms_to_kmh( wind.get('speed') ) )
    sunrise      = sunrise_time
    sunset       = sunset_time

    # Retornando a página index.html e as variáveis que serão utilizadas
    return render_template('./html/index.html',
                           temp         = temp,
                           temp_min     = temp_min,
                           temp_max     = temp_max,
                           description  = description, 
                           feels_like   = feels_like, 
                           humidity     = humidity, 
                           current_time = current_time, 
                           pressure     = pressure,
                           visibility   = visibility,
                           speed        = speed,
                           sunrise      = sunrise,
                           sunset       = sunset,)



if __name__ == '__main__':
    app.run(debug=True)