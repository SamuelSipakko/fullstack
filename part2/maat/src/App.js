import React, { useState, useEffect} from 'react';
import axios from 'axios';
import List from './components/List'


const App = () => {

  const [ lands, setLands ] = useState([])
  const [ search, setSearch ] = useState('')
  const [ show, setShow ] = useState(undefined)
  const [ weather, setWeather ] = useState(undefined)

  useEffect(()=> {
    axios.get('https://restcountries.eu/rest/v2/all')
         .then(response=> setLands(response.data))
  }, [])

  const changeSearch = event => {
    setSearch(event.target.value)
    if (show !== undefined && show.isManual)
      show.isManual = false
    setShow(undefined)
    setWeather(undefined)
  }


  const changeWeather = land => {
    
    axios.get(`http://api.apixu.com/v1/current.json?key=3a3dd6cbe92046c2a6d142032191706&q=${land.latlng.join(',')}`)
         .then(response=> setWeather(response.data))
    setShow(land)
  }

  return (
    <div>
      <h2>Country information</h2>
      Find country by name or capital: <input value={search} onChange={changeSearch}/>

      <List lands={lands} search={search} 
            show={show} setShow={setShow}
            weather={weather} changeWeather={changeWeather}/>
    </div> 
  );
}


export default App;
