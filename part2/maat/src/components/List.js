import React from 'react'
import './List.css'
import { highlight } from './highlight';



const showDetailed = (land,search,setShow,weather,changeWeather) => {
    const {name,capital,population,languages,flag} = land

    const weatherElement = () => {
        if(weather === undefined) {
            changeWeather(land)
            return <p>Weather loading...</p>
        }
        if(weather.current.temp_c === undefined)
            return <p>Weather information not available.</p>

        return (
            <div>
                <h3>Weather in {capital}</h3>
                <p><b>temperature: {weather.current.temp_c} Celsius</b></p>
                <img src={`http:${weather.current.condition.icon}`} alt='weather'/>
                <p><b>wind: {weather.current.wind_kph} kps direction {weather.current.wind_dir}</b></p>
            </div>
        )
    }

    const handleBnt = () => () => {
        land.isManual = false
        setShow(undefined)
    }
    
    const backToList = land.isManual
        ? <button className='btn' onClick={handleBnt()}>back to list</button>
        : <span />

    return (
        <div>
            <h2>{name}&nbsp;&nbsp;{backToList}</h2>
            <p>Capital: {land.isManual ? capital : highlight(capital,search)}</p>
            <p>Population: {population}</p>
            <h3>languages</h3>
            <ul>
                {languages.map((v,i)=><li key={i}>{v.name}</li>)}
            </ul>
            <img src={flag} className='img' alt={`${name} country flag`}/>
            {weatherElement()}
        </div>
    )
}



const List = ({lands, search, show, setShow, weather, changeWeather}) => {
    
    
    const srcLow = search.toLowerCase()
    const toShow = lands.filter((land)=> land.name.toLowerCase().includes(srcLow)
                                      || land.capital.toLowerCase().includes(srcLow))

    const checkCapital = (land,key) => {
        if(land.capital.toLowerCase().includes(srcLow))
            return (
                <span key={key} className='span'>
                        - {highlight(land.capital,search)}
                </span>
            )
        return;
    }

    const changeShow = newShow => () => {
        const expanded = newShow
        expanded.isManual = true
        setShow(expanded)
      }

    if (show !== undefined)
        return showDetailed(show,search,setShow,weather,changeWeather)

    if (search === '')
        return <div></div>;

    if (toShow.length > 10)
        return <p className='red'>Too many matches. Specify another filter</p>
    
    if (toShow.length > 1)
        return(
            <div>
                {toShow.map((land,i)=> { return (
                    <p key={i}>
                        {highlight(land.name,search)}
                        {checkCapital(land,i)}
                        &nbsp;
                        <button className='btn' onClick={changeShow(land)}>show</button>
                    </p>
                )})}
            </div>
        )
    
    if (toShow.length > 0) {
        return showDetailed(toShow[0],search,setShow,weather,changeWeather)
    }

    return <p className='red'>No matches. Specify another filter</p>
}


export default List