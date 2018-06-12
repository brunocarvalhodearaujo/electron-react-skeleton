/**
 * @flow
 */

import React, { Component, ReactNode } from 'react'
import PropTypes from 'prop-types'
import './App.css'

type Props = {
  children: ReactNode
}

type State = {}

/**
 * App is described here.
 *
 * @example
 * ```jsx
 * <App />
 * ```
 *
 * @since 11/06/2018
 */
export default class App extends Component<Props, State> {
  static propTypes = {
    children: PropTypes.element
  }

  static defaultProps = {}

  render () {
    return (
      <div className='App'>
        <p>Node: {process.versions.node}</p>
        <p>Chromium: {process.versions.chrome}</p>
        <p>Electron: {process.versions.electron}</p>
      </div>
    )
  }
}
