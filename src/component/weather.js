import React from "react";

const Weather = (props) => {
    return (
        <div className="infoWeath">
            {props.state.city &&
                <div>
                    <p>Location: {props.state.city}, {props.state.country}</p>
                    <p>Temperature: {props.state.temp}&deg;C</p>
                    <p>Sunrise: {props.state.sunrise}</p>
                    <p>Sunset: {props.state.sunset}</p>
                </div>
            }
            <p className="error"> {props.state.error} </p>
        </div>
    )
}

export default Weather;