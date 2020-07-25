import client from '~/httpClient'

const msg = {
	signIn_success: '님 반가워요. :D',
	signOut_success: '님 다음에 또 만나요. :D',
}

export default {
	msg,
	checkAuth: (token) => client.get(`/auth/check`, { headers: { 'x-access-token': token } }),
	signIn: ({ email, password }) => client.post(`/auth/signin`, { email, password })
}