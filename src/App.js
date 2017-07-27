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
      selectedCity: '',
      fiveDaysWeather: [],
      averageTempAndVariance: {},
    }
  }

  componentDidMount() {
    this.getWeather("Jakarta")
  }

  getWeather(city) {
    Axios.get(`http://api.openweathermap.org/data/2.5/forecast/daily?q=Jakarta&mode=json&units=metric&cnt=5&APPID=481e3bc28e5264e5607c2b65b449bfc1`)
      .then((response) => {
        console.log(response.data)
        this.setState({
          fiveDaysWeather: [...response.data.list]
        })
        this.averageTemperatureAndVariance([...response.data.list])
      })
      .catch((error) => {
        console.log('error', error)
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
      averageTempAndVariance: {...averageData}
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
                <select>
                {this.state.cities.map((city, index) => {
                  return (
                      <option key={index}>{city}</option>
                  )
                })}
              </select>
              </div>
            </div>
          </div>
          <br />
          <div className="column is-half is-offset-one-quarter">
            <table className="table">
              <thead>
                <tr>
                  <th>Jakarta</th>
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
        </div>
      </div>
    )
  }
}
