import React from 'react'
import ReactDOM from 'react-dom'
import { shallow } from 'enzyme'

import App from './App'

describe('<App> component ', () => {

/*
==================================================================
OUTPUT TEST
Shallow testing main parts that should exist in the app
==================================================================
*/

  const appWrapper = shallow(<App />)

  it('renders correctly', () => {
    expect(appWrapper).toHaveLength(1)
  })

  it('renders a <section>', () => {
    const appSection = appWrapper.find('section')
    expect(appSection).toHaveLength(1)
  })

  it('renders a form', () => {
    const appForm = appWrapper.find('.field')
    expect(appForm).toHaveLength(1)
  })

  it('renders a table', () => {
    const appTable = appWrapper.find('table')
    expect(appTable).toHaveLength(1)
  })
})

