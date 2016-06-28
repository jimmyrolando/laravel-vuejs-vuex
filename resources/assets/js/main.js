import Vue from 'vue'
import Resource from 'vue-resource'

Vue.use(Resource)

import store from './vuex/store'
import profile from './components/profile.vue'
import admin from './components/admin.vue'
import NavBar from './components/shared/nav-bar.vue'

import { getCurrentUser } from './vuex/actions'

window.App = new Vue({
	el: 'body',
	store,
	vuex: {
		actions: {
			getCurrentUser
		}
	},
	components: { profile,  NavBar, admin },
	ready() {
		this.getCurrentUser();
	},
	methods: {
		initMap() {
			this.$broadcast('google-loaded')
		}
	}
});
