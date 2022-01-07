import React  from 'react'
import ReactDOM from 'react-dom'

import App from './containers/App'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(React.createElement(App), document.querySelector('#app'))
})