import "./Weather.css"
import axios from "axios"
import { useState, useEffect } from "react"


const Weather = () => {
    const apikey = 'ac969f608daad0e2235bf44b6272868e'
    const [newdata, setNewdata] = useState(null)
    const [userInput, setUserInput] = useState("")
    const [showResult, setShowResult] = useState(false);
    const [userError, setUserError] = useState(null)

   const displayCard = async () => {
        if (!userInput) return; // prevent empty search
        await weatherData();     // fetch data
        setShowResult(true);
        setUserError(null)     // trigger React to show result container
};

    const weatherData = async () => {
        try {
            let thedata = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${userInput}&appid=${apikey}`)
            setNewdata(thedata.data)
            setUserError(null)
        } catch (error) {
            setUserError("City not found, tryy again!!!")
            setNewdata(null)
        }
    }

    // useEffect(() => {
    //     weatherData()
    // }, [userInput])
    

    return  (
        <div className="outer-container">
            <div className="container">
                <div className="userSearch">
                    <input type="text" className="search" placeholder="search city" value={userInput} onChange={(e) => setUserInput(e.target.value)}/>
                    <button className="btn" onClick={displayCard}>Search</button>
                </div>
                {/* end of search container */}
        

    { userError && <div>{userError}</div>} 
    
    { showResult == false ? <></> :  <div className="result-container">
                <div className="result">
                    <div className="weathericon">
                        ⛈️
                    </div>
                         <div className="weatherdetails">
                        <div className="date">{newdata.list[0].dt_txt}</div>
                        <div className="condition">{newdata.list[0].weather[0].description} {newdata.list[0].main.temp}℃</div>
                        <div className="location">{newdata.city.name}, {newdata.city.country}</div>
                    </div>

                </div>
                {/* end of result */}
                <div className="moredetails">
                    <div className="more">
                        <div className="wind">Wind now</div>
                        <div className="windlevel">{newdata.list[0].wind.speed}<span>km</span></div>
                    </div>
                    <div className="more">
                        <div className="wind">Humidity</div>
                        <div className="windlevel">{newdata.list[0].main.humidity}<span>%</span></div>
                    </div>
                    <div className="more">
                        <div className="wind">Pressure</div>
                        <div className="windlevel">{newdata.list[0].main.pressure}<span>Pa</span> </div>
                    </div>
                </div>
             </div>}
            </div>
        </div>
    )
}

export default Weather

