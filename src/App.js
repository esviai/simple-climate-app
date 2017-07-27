import React from 'react'
import Axios from 'axios'

export default class App extends React.Component {
  constructor() {
    super()
    this.state = {
      cities: [
        "Jakarta",
        "Tokyo",
        "London",
      ],
      selectedCity: 'Jakarta',
      fiveDaysWeather: [],
      averageTempAndVariance: {},
      isRetrievingDataError: false,
    }
    this.handleSelectCity = this.handleSelectCity.bind(this)
  }

  componentDidMount() {
    this.getWeather("Jakarta")
  }

  componentDidUpdate(prevProps, prevState) {
    if(prevState.selectedCity !== this.state.selectedCity) {
      this.getWeather(this.state.selectedCity)
    }
  }

  getWeather(city) {
    Axios.get(`http://api.openweathermap.org/data/2.5/forecast/daily?q=${city}&mode=json&units=metric&cnt=5&APPID=481e3bc28e5264e5607c2b65b449bfc1`)
      .then((response) => {
        this.setState({
          fiveDaysWeather: [...response.data.list],
        })
        this.averageTemperatureAndVariance([...response.data.list])
      })
      .catch((error) => {
        this.setState({
          isRetrievingWeatherError: true,
        })
      })
  }

  parseDate(date) {
    let convertedDate = new Date(date*1000)
    let year = convertedDate.getFullYear()
    let month = (convertedDate.getMonth() + 1) < 10 ? `0${convertedDate.getMonth()+1}` : convertedDate.getMonth()+1
    let dDate = convertedDate.getDate()
    return `${year}-${month}-${dDate}`
  }

  averageTemperatureAndVariance(data) {
    let sumData = {temp: 0, variance: 0}
    data.map((datum) => {
      sumData["temp"] += datum.temp.day
      sumData["variance"] += (datum.temp.max - datum.temp.min)
    })
    let averageData = {temp: `${parseInt(sumData.temp/data.length, 10)} C`, variance: `${(sumData.variance/data.length).toFixed(2)} C`}
    this.setState({
      averageTempAndVariance: {...averageData},
    })
  }

  handleSelectCity(event) {
    this.setState({
      selectedCity: event.target.value,
    })
  }

  render() {
    return (
      <div className="App">
        <section className="hero">
          <div className="hero-body">
            <div className="container">
              <h1 className="title">
                Simple Climate App
              </h1>
            </div>
          </div>
        </section>
        <br />
        <div className="container">
          <div className="field">
            <label className="label">City: </label>
            <div className="control">
              <div className="select">
                <select value={this.state.selectedCity} onChange={this.handleSelectCity}>
                  {this.state.cities.map((city, index) => {
                    return (
                      <option
                        key={index}
                        value={city}
                      >
                        {city}
                      </option>
                    )
                  })}
                </select>
              </div>
            </div>
          </div>
          <br />
          { this.state.isRetrievingDataError ? (
            <div className="column is-half is-offset-one-quarter">
              <p className="subtitle">Sorry, we are currently unable to retrieve data</p>
            </div>
          ) : (
            <div className="column is-half is-offset-one-quarter">
              <table className="table">
                <thead>
                  <tr>
                    <th>{this.state.selectedCity}</th>
                    <th>Temperature</th>
                    <th>Variance</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.fiveDaysWeather.map((weather, index) => {
                    return (
                      <tr key={index}>
                        <td>{this.parseDate(weather.dt)}</td>
                        <td>{`${parseInt(weather.temp.day, 10)} C`}</td>
                        <td>{`${(weather.temp.max-weather.temp.min).toFixed(2)} C`}</td>
                      </tr>
                    )
                  })}
                  <tr>
                    <td><strong>Average</strong></td>
                    <td>{this.state.averageTempAndVariance.temp}</td>
                    <td>{this.state.averageTempAndVariance.variance}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          )
          }
        </div>
      </div>
    )
  }
}
