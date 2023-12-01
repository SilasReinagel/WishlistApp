import userbase from 'userbase-js'
import './app.css'
import App from './App.svelte'
import { Buffer } from 'buffer'
import { isLoggedIn } from './appState'

globalThis.Buffer = Buffer
userbase.init({ appId: 'bad04cca-4504-4a71-8948-015600e05334' }).then(session => isLoggedIn.set(!!session.user))

const app = new App({
  target: document.getElementById('app'),
})

export default app
