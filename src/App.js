import React from 'react'

export default class App extends React.Component {
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
                  <option>Select dropdown</option>
                  <option>With options</option>
                </select>
              </div>
            </div>
          </div>
          <br />
          <div className="column is-half is-offset-one-quarter">
            <table class="table">
              <thead>
                <tr>
                  <th>Jakarta</th>
                  <th>Temperature</th>
                  <th>Variance</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
                <tr>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
                <tr>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
                <tr>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
                <tr>
                  <td></td>
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
