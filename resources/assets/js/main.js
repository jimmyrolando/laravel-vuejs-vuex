import Vue from 'vue'

import store from './vuex/store'
import profile from './components/profile.vue'
import admin from './components/admin.vue'
import NavbarAvatar from './components/shared/navbar-avatar.vue'

import { getCurrentUser } from './vuex/actions'

window.App = new Vue({
	el: 'body',
	store,
	components: { profile, admin, NavbarAvatar },
	vuex: {
		actions: {
			getCurrentUser
		}
	},
	created() {
		this.getCurrentUser();
	},
	methods: {
		initMap() {
			this.$broadcast('google-loaded')
		}
	}
});
