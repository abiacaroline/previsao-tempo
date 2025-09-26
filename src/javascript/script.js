document.querySelector('#pesquisa').addEventListener('submit', async (event) =>{
    event.preventDefault();

    const cityName = document.querySelector('#city_name').value;

    if(!cityName){
        document.querySelector('#clima').classList.remove('show');
        showAlert("Você precisa digitar uma cidade!");
        return;
    }

    const apiKey = '0d963485b218715c1404098d8d78ff9c'
    const apiUrl =`https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(cityName)}&appid=${apiKey}&units=metric&lang=pt`

    const resultado = await fetch(apiUrl);
    const json = await resultado.json();
    
    if(json.cod === 200) {
        showInfo({
            city: json.name,
            country: json.sys.country,
            temp: json.main.temp,
            tempMax: json.main.temp_max,
            tempMin: json.main.temp_min,
            description: json.weather[0].description,
            tempIcon: json.weather[0].icon,
            windSpeed: json.wind.speed,
            humidity: json.main.humidity
        })
    } else{
        document.querySelector('#clima').classList.remove('show');

        showAlert(`
            Não foi possível localizar.
            
            <img src= "src/images/imagem.png">
    `)
        
    }

});

function showInfo(json) {
    showAlert('');

    document.querySelector('#clima').classList.add('show');

    document.querySelector('#title').innerHTML = `${json.city}, ${json.country}`;

    document.querySelector('#temp_value').innerHTML = `${json.temp.toFixed(1).toString().replace('.',',')}<sup> C°</sup>`

    document.querySelector('#temp_description').innerHTML = `${json.description}`;
    document.querySelector('#umidade').innerHTML = `${json.humidity}%`;
    document.querySelector('#vento').innerHTML = `${json.windSpeed.toFixed(1)}km/h`;

    document.querySelector('#temp_max').innerHTML = `${json.tempMax.toFixed(1).toString().replace('.',',')}<sup> C°</sup>`
    
    document.querySelector('#temp_min').innerHTML = `${json.tempMin.toFixed(1).toString().replace('.',',')}<sup> C°</sup>`

    document.querySelector('#temp_img').setAttribute('src', `https://openweathermap.org/img/wn/${json.tempIcon}@2x.png`)
}

function showAlert(msg) {
    document.querySelector('#alert').innerHTML = msg;
}