import './App.css';
import React from "react";
import Info from "./component/info";
import Form from "./component/form";
import Weather from "./component/weather";

const API = {
    key: "e30e95c9872afcd0f3debf0ed38f7d4f",
    base_url: "https:\\api.openweathermap.org/data/2.5/weather"
};

class App extends React.Component {
    state = {
        temp: undefined,
        city: undefined,
        country: undefined,
        sunrise: undefined,
        sunset: undefined,
        error: undefined
    }

    gettingWeather = async (event) => {
        event.preventDefault();

        const city = event.target.elements.city.value;

        if (city){
            const api_url = await fetch(`${API.base_url}?q=${city}&appid=${API.key}`);
            const data = await api_url.json();
            console.log(data);

            if (data.name) {
                let date = new Date();
                date.setTime(data.sys.sunrise);
                let sunrise_date = date.getHours() + ":" + date.getMinutes();

                date.setTime(data.sys.sunset);
                let sunset_date = date.getHours() + ":" + date.getMinutes();

                let tempCelsius = Math.round(data.main.temp-273.15);

                this.setState({
                    temp: tempCelsius,
                    city: data.name,
                    country: data.sys.country,
                    sunrise: sunrise_date,
                    sunset: sunset_date,
                    error: ""
                });
            }else {
                this.setState({
                    error: "That city's name doesn't exist!"
                });
            }


        } else {
            this.setState({
                error: "Enter city's name!"
            });
        }

    }

    render() {
        return (
            <div className="wrapper">
                <div className="main">
                    <div className="container">
                        <div className="row">
                            <div className="col-sm-5 info">
                                <Info />
                            </div>
                            <div className="col-sm-7 form">
                                <Form text = "Hello" weatherMethod = {this.gettingWeather} />
                                <Weather state = {this.state} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}


export default App;