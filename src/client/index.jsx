// @flow

import 'babel-polyfill'

import React from 'react'
import ReactDOM from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import { BrowserRouter } from 'react-router-dom'

import App from '../shared/app'
import { APP_CONTAINER_SELECTOR, JSS_SSR_SELECTOR  } from '../shared/config'

import $ from 'jquery'
import Tether from 'tether'

window.jQuery = $
window.Tether = Tether
require('bootstrap')

const rootEl = document.querySelector(APP_CONTAINER_SELECTOR)

const wrapApp = AppComponent =>
	<BrowserRouter>
		<AppContainer>
			<AppComponent />
		</AppContainer>
	</BrowserRouter>

ReactDOM.render(wrapApp(App), rootEl)

const jssServerSide = document.querySelector(JSS_SSR_SELECTOR)
// flow-disable-next-line
jssServerSide.parentNode.removeChild(jssServerSide)

if (module.hot) {
	// flow-disable-next-line
	module.hot.accept('../shared/app', () => {
		// eslint-disable-next-line global-require
		const NextApp = require('../shared/app').default
		ReactDOM.render(wrapApp(NextApp), rootEl)
	})
}
