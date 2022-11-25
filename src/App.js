/* eslint-disable import/no-anonymous-default-export */
import React, { useState } from 'react';
import './App.css';
import { Card } from './components/card.js'
import './components/card.scss';
import TextField from '@mui/material/TextField';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { regular } from '@fortawesome/fontawesome-svg-core/import.macro';


function App () {

  const API_KEY = '1087e5c031ed525d1b99bde53f2d571e';
  const API_GEOCODING_BASE = 'http://api.openweathermap.org/geo/1.0';
  const API_FORECAST_BASE = 'http://api.openweathermap.org/data/2.5';
  const [query, setQuery] = useState('');
  const [city, setCity] = useState([]);
  const [country, setCountry] = useState([]);
  const [clima, setClima] = useState([]);

  const basicFetch = async (API_BASE, endpoint) => {
    const req = await fetch(`${API_BASE}${endpoint}`);
    const json = await req.json();
    return json;
  }

  const forecast = async (lat, lon) => {
    const searchResult = basicFetch(API_FORECAST_BASE, `/forecast?lat=${lat}&lon=${lon}&units=metric&lang=pt_br&appid=${API_KEY}`);
    let cardsInfo = [];
    Promise.all([searchResult]).then(async (res) => {
      for (let i = 0; i < res[0].list.length; i++) {
        if (res[0].list[i].dt < (parseInt(res[0].list[0].dt) + 259200)) {
          let dateOptions = {
            weekday: 'short',
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric'
          };
          let dataIni = new Date(res[0].list[i].dt * 1000);
          let dataFin = Intl.DateTimeFormat('pt-BR', dateOptions).format(dataIni);
          let cardInfo = {
            index: res[0].list[i].dt,
            data: dataFin, 
            temp_atual: res[0].list[i].main.temp, 
            sens_term: res[0].list[i].main.feels_like, 
            temp_min: res[0].list[i].main.temp_min, 
            temp_max: res[0].list[i].main.temp_max, 
            umi: res[0].list[i].main.humidity, 
            desc: res[0].list[i].weather[0].description, 
            vel_vento: parseInt(res[0].list[i].wind.speed) * 3.6, 
            nuvens: res[0].list[i].clouds.all, 
            icone: `http://openweathermap.org/img/wn/${res[0].list[i].weather[0].icon}@2x.png`
          };
          cardsInfo.push(cardInfo);
        }
      }
    });
    console.log(cardsInfo);
    setClima(cardsInfo);
  }

  const geocoding = (event) => {
    if (event.key === "Enter") {
      if (query !== "") {
        console.log(query);
        const searchResult = basicFetch(API_GEOCODING_BASE, `/direct?q=${query}&appid=${API_KEY}`);
        Promise.all([searchResult]).then((res) => {
          setCity(res[0][0].local_names.pt);
          setCountry(res[0][0].country);
          forecast(res[0][0].lat, res[0][0].lon);
        });
      } else {
        setQuery('Digite o nome de uma cidade para sua previsão meteorológica');
      }
    }
  }

  return(
    <div className="page">
      <TextField id="outlined-basic" variant="outlined" fullWidth label="Pesquise por uma cidade" value={query} onChange={event => setQuery(event.target.value)} onKeyPress={geocoding}/>
      <div className="wrapper">
        {
          clima.map((clima) => {
            return (
              <Card key={clima.index} icone={clima.icone} data={clima.data} desc={clima.desc} temp_atual={clima.temp_atual} sens_term={clima.sens_term} temp_min={clima.temp_min} temp_max={clima.temp_max} nuvens={clima.nuvens} umi={clima.umi} vel_vento={clima.vel_vento} />
            )
          })
        }
      </div>
    </div>
  );
}

export default App;