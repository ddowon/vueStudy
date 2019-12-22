import firebase from 'firebase'

const config = Object.freeze({
	apiKey: 'AIzaSyCmISmWQXecjiShY-Y-mEkJupQucPzEbjw',
	authDomain: 'pizza-planet-2020.firebaseapp.com',
	databaseURL: 'https://pizza-planet-2020.firebaseio.com',
	projectId: 'pizza-planet-2020',
	storageBucket: 'pizza-planet-2020.appspot.com',
	messagingSenderId: '839717645619'
})

const app = firebase.initializeApp(config)
const db = app.database()

export const menuRef = db.ref('menu')
export const ordersRef = db.ref('orders')

export default {
	menuRef,
	ordersRef
}