import Vue from 'vue'
import Resource from 'vue-resource'

Vue.use(Resource)

export default {
	getCurrentUser (cb, ecb = null) {
	  	Vue.http.get('profiles').then(
	  		(resp) => cb(resp.data.user),
	  		(resp) => ecb(resp.data)
	  	);
	},

	getAllUsers (cb, ecb = null) {
	  	Vue.http.get('users').then(
	  		(resp) => cb(resp.data.users),
	  		(resp) => ecb(resp.data)
	  	);
	},

  	uploadAvatar (formData, cb, ecb = null ) {
	    Vue.http.post('avatar', formData).then(
	  		(resp) => cb(resp.data),
	  		(resp) => ecb(resp.data)
	  	);
	},

	updateProfile (formData, id, cb, ecb = null ) {
	    Vue.http.post('profiles/'+id, formData).then(
	  		(resp) => cb(resp.data.user),
	  		(resp) => ecb(resp.data)
	  	);
	},

	updateUser (formData, id, cb, ecb = null ) {
	    Vue.http.post('users/'+id, formData).then(
	  		(resp) => cb(resp.data),
	  		(resp) => ecb(resp.data)
	  	);
	},

	deleteUser (user, cb) {
	    Vue.http.post('users/'+user.id,{'_method': 'DELETE'} ).then(
	  		(resp) => cb(resp.data)
	  	);
	},
	
	createUser (formData, cb, ecb = null ) {
	    Vue.http.post('users', formData).then(
	  		(resp) => cb(resp.data.user),
	  		(resp) => ecb(resp.data)
	  	);
	},
}