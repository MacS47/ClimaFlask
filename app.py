from flask import Flask, render_template, redirect, url_for, request
from datetime import datetime
import requests

app = Flask(__name__)

# Função criada para converter M/s para Km/h
def ms_to_kmh(speed_ms : float) -> float:
    speed_km : float = speed_ms * 3.6
    return speed_km

@app.route('/')
def index():
    return render_template('./html/index.html')

# Essa rota obtém a cidade pesquisada pelo usuário e baseado no valor
# redireciona à outra página
@app.route('/',methods=['POST'])
def index_post():
    city_name = request.form['city_name']
    if city_name == '':
        return redirect('/')
    else:
        return redirect( f'/weather/{city_name}' )


@app.route('/weather/<city_name>')
def weather(city_name):
    
    # Armazenando valores da chave da API e do nome da cidade
    token        = ''
    city         = city_name

    # Obtendo dados a partir da API e armazenando a resposta em uma variável
    response     = requests.get(f'http://api.openweathermap.org/data/2.5/weather?q={city}&units=metric&lang=pt_br&APPID={token}')

    if response.status_code == 200:
        
        # Extraindo os valores do request para JSON
        json         = response.json()

        # Buscando dados do dicionários no arquivo JSON
        weather_dict = json['weather']
        main         = json['main']
        wind         = json['wind']
        dt           = json['dt']
        sys          = json['sys']

        # Obtendo dia e hora atual, nascer e por do sol, convertendo para HH:MM e armazenando em variáveis
        current_time = datetime.fromtimestamp(dt).strftime('%H:%M')
        sunrise_time = datetime.fromtimestamp( sys.get('sunrise') ).strftime('%H:%M')
        sunset_time  = datetime.fromtimestamp( sys.get('sunset') ).strftime('%H:%M')

        # Manipulação de dicionários
        dict_aux     = weather_dict[0]
        weather      = dict_aux

        # Carregando valores para variáveis que serão utilizadas no HTML
        city         = json.get('name').title()
        temp         = round( main.get('temp') )
        temp_min     = round( main.get('temp_min') )
        temp_max     = round( main.get('temp_max') )
        feels_like   = round( main.get('feels_like') )
        description  = weather.get('description').title()
        humidity     = main.get('humidity')
        pressure     = main.get('pressure')
        visibility   = round( json.get('visibility') / 1000 )
        speed        = round( ms_to_kmh( wind.get('speed') ) )
        sunrise      = sunrise_time
        sunset       = sunset_time
    else:
        # Caso o código de retorno ao chamar a API não seja 200
        # as variáveis receberão o valor N/A
        city         = 'N/A'
        temp         = 'N/A'
        temp_min     = 'N/A'
        temp_max     = 'N/A'
        feels_like   = 'N/A'
        description  = 'N/A'
        humidity     = 'N/A'
        pressure     = 'N/A'
        visibility   = 'N/A'
        speed        = 'N/A'
        sunrise      = 'N/A'
        sunset       = 'N/A'
        current_time = 'N/A'

    # Retornando a página index.html e as variáveis que serão utilizadas
    return render_template('./html/card.html',
                           city         = city,
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
    app.run(host="0.0.0.0",debug=True)

    