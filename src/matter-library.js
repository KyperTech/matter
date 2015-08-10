import Firebase from 'firebase';
import axios from 'axios';

const serverUrl = 'http://localhost:4000';
const fbUrl = 'https://pruvit.firebaseio.com';

if (typeof Firebase == 'undefined') {
	console.error('Firebase is required to use Matter');
}
if (typeof axios == 'undefined') {
	console.error('Axios is required to use Matter');
}

//TODO: Set axios interceptor

let Matter = {
	signup(signupData) {
		axios.post(serverUrl + '/signup', {
		})
			.then(function(response) {
			  console.log(response);
			})
			['catch'](function(response) {
			  console.log(response);
			});
	},

	login(loginData) {
		if (!loginData || !loginData.password || !loginData.username) {
			throw new Error('Username/Email and Password are required to login');
		}
		return axios.put(serverUrl + '/login', loginData, {
		}).then(function(response) {
			//TODO: Save token locally
			console.log(response);
			if (localStorage.getItem('matter') === null) {
				window.localStorage.setItem('matter', response.data.token);
				console.log('token set to storage:', window.localStorage.getItem('matter'));
			}
			return response.data;
		})['catch'](function(response) {
			console.log(response);
		});
	},

	logout() {
		axios.put(serverUrl + '/logout', {
		}).then(function(response) {
		  console.log(response);
		})['catch'](function(response) {
		  console.log(response);
		});
	},

	getCurrentUser() {
		//TODO: Check Current user variable
		axios.get(serverUrl + '/user', {
		}).then(function(response) {
			//TODO: Save user information locally
			console.log(response);
		})['catch'](function(response) {
			console.log(response);
		});
	},

	getAuthToken() {
		//TODO: Load token from storage

	},

	getApps() {
		//TODO:Set authentication header
		axios.get(serverUrl + '/apps', {
		}).then(function(response) {
		  console.log(response);
		})['catch'](function(response) {
		  console.log(response);
		});
	}

};

export default Matter;

