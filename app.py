from flask import Flask, render_template, redirect, url_for, request, session
from datetime import datetime
from environment import TOKEN
import requests, hashlib, bleach

now = datetime.now()
key = f'{now.year}{now.month}{now.day}{now.hour}{now.minute}{now.second}{now.microsecond}'
session_key = hashlib.sha256(key.encode()).hexdigest()

app = Flask(__name__)
app.config['PERMANENT_SESSION_LIFETIME'] = 1800
app.secret_key = session_key

# Função criada para converter M/s para Km/h
def ms_to_kmh(speed_ms : float) -> float:
    speed_km : float = speed_ms * 3.6
    return speed_km

# Rota principal
@app.route('/', methods=['GET', 'POST'])
def index():
    # Verificando se o método utilizado é POST
    if request.method == 'POST':
        # Armazenando o valor da cidade pesquisada pelo usuário
        city_name = request.form['city_name']
        # Verificando se o valor da cidade é vazio
        if city_name == '':
            # Se o valor for vazio, redireciona o usuário para a página principal
            return redirect('/')
        else:
            # Se o valor não for vazio, armazena o valor da cidade na sessão e redireciona o usuário para a página de clima
            session['city_name'] = city_name
            return redirect( f'/weather/{city_name}' )
    else:
        # Se o método utilizado for GET, verifica se o valor da cidade está armazenado na sessão
        city_name = session.get('city_name', '')
        city_name = bleach.clean(city_name)
        return render_template('./html/index.html', city_name=city_name)

# Essa rota obtém a cidade pesquisada pelo usuário e baseado no valor, redireciona à outra página
@app.route('/',methods=['POST'])
def index_post():
    city_name = request.form['city_name']
    if city_name == '':
        return redirect('/')
    else:
        return redirect( f'/weather/{city_name}')

# Rota criada para redirecionar o usuário para a página correta
@app.route('/weather')
def weather():    
    return redirect('/')

# Rota para acessar a página About
@app.route('/about')
def about():
    city_name = session.get('city_name', '')
    city_name = bleach.clean(city_name)
    if city_name == '':
        return render_template('./html/about.html')
    else:
        return render_template('/html/about.html', city_name=city_name)

# Rota para acessar a página Home
@app.route('/home')
def home():
    return redirect('/')

# Rota utilizada para exibir os dados climáticos ao usuário
@app.route('/weather/<parameter>')
def weather_city(parameter):
    city_name = session.get('city_name', '')
    city_name = bleach.clean(city_name)
    
    if parameter == 'home':
        return redirect('/')

    elif parameter == 'about':
        return redirect('/about')


    # Armazenando valores da chave da API e do nome da cidade
    token        = TOKEN
    city         = parameter.replace('%20',' ').replace('ã','a').replace('õ','o').replace('ç','c')

    # Obtendo dados a partir da API e armazenando a resposta em uma variável
    response     = requests.get(f'http://api.openweathermap.org/data/2.5/weather?q={city}&units=metric&lang=pt_br&APPID={token}')

    if response.status_code == 200:
        
        # Extraindo os valores do request para JSON
        json         = response.json()

        # Buscando dados do dicionários no arquivo JSON
        weather_dict = json['weather']
        main         = json['main']
        wind         = json['wind']
        clouds       = json['clouds']
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
        country      = sys.get('country').upper()
        temp         = round( main.get('temp') )
        temp_min     = round( main.get('temp_min') )
        temp_max     = round( main.get('temp_max') )
        feels_like   = round( main.get('feels_like') )
        description  = weather.get('description').title()
        humidity     = main.get('humidity')
        pressure     = main.get('pressure')
        visibility   = round( json.get('visibility') / 1000 )
        speed        = round( ms_to_kmh( wind.get('speed') ) )
        deg          = wind.get('deg')
        cloudness    = clouds.get('all')
        sunrise      = sunrise_time
        sunset       = sunset_time
    else:
        # Caso o código de retorno ao chamar a API não seja 200
        # as variáveis receberão o valor N/A
        city         = 'N/A'
        country      = 'N/A'
        temp         = 'N/A'
        temp_min     = 'N/A'
        temp_max     = 'N/A'
        feels_like   = 'N/A'
        description  = 'N/A'
        humidity     = 'N/A'
        pressure     = 'N/A'
        visibility   = 'N/A'
        speed        = 'N/A'
        deg          = 'N/A'
        cloudness    = 'N/A'
        sunrise      = 'N/A'
        sunset       = 'N/A'
        current_time = 'N/A'

    # Retornando a página index.html e as variáveis que serão utilizadas
    return render_template('./html/card.html',
                           city         = city,
                           country      = country,
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
                           cloudness    = cloudness,
                           deg          = deg,
                           sunrise      = sunrise,
                           sunset       = sunset,
                           city_name    = parameter)

# Rota para acessar a API
@app.route('/api/v1/<parameter>', methods=['GET'])
def getapiv1(parameter):
    
    if parameter == 'home':
        return redirect('/')

    if parameter == 'about':
        return redirect('/about')
    
    # Armazenando valores da chave da API e do nome da cidade
    token        = TOKEN
    city         = parameter.replace('%20',' ').replace('ã','a').replace('õ','o').replace('ç','c')

    # Obtendo dados a partir da API e armazenando a resposta em uma variável
    response     = requests.get(f'http://api.openweathermap.org/data/2.5/weather?q={city}&units=metric&lang=pt_br&APPID={token}')

    # Verificando o código de retorno ao chamar a API
    if response.status_code == 200:

        # Armazenando o conteúdo de response em json
        json     = response.json()

        # Retornando ao usuário o arquivo json com os dados para a cidade informada como parâmetro
        return json
    else:

        return "Erro! Não foi possível obter os dados. Tente novamente mais tarde."

if __name__ == '__main__':
    app.run()

