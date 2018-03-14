import React from 'react'
import ReactDOM from 'react-dom'

const App = () => (
  <div>
    <p>Node: {process.versions.node}</p>
    <p>Chromium: {process.versions.chrome}</p>
    <p>Electron: {process.versions.electron}</p>
  </div>
)

ReactDOM.render(<App />, document.getElementById('root'))
