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
    }
  }

  componentDidMount() {
    this.getWeather("Jakarta")
  }

  getWeather(city) {
    Axios.get(`http://api.openweathermap.org/data/2.5/forecast/daily?q=${city}&mode=json&units=metric&cnt=5&APPID=481e3bc28e5264e5607c2b65b449bfc1`)
      .then((response) => {
        console.log(response.data.list)
        this.setState({
          fiveDaysWeather: response.data.list
        })
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
                      <td>{`${parseInt(weather.temp.day)} C`}</td>
                      <td>{`${(weather.temp.max-weather.temp.min).toFixed(2)} C`}</td>
                    </tr>
                  )
                })}
                <tr>
                  <td><strong>Average</strong></td>
                  <td></td>
                  <td></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    )
  }
}
