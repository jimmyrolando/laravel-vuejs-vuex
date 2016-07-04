<template>
	<modal v-if="form.show">
		<template slot="header">
			<h2 >Create New User</h2>
		</template>

		<template slot="body" >
    		<form id="createForm" role="form" method="POST">
				<div class="form-group" >
                    <label for="name">Role</label>
                    <select name="role" id="role" class="form-control" v-model="user.role">
			    		<option value="admin">Admin</option>
			    		<option value="user">User</option>
			    	</select>
                </div>

                <div class="form-group" :class="{'has-error': form.errors.name }">
                    <label for="name">User Name</label>
                    <input id="name" type="text" class="form-control" name="name" value="">
                    <span class="help-block" v-if="form.errors.name">
			            {{ form.errors.name }}
				    </span>
                </div>

                <div class="form-group" :class="{'has-error': form.errors.email }">
                    <label for="email">Email</label>
                    <input id="email" type="email" class="form-control" name="email" value="">
                    <span class="help-block" v-if="form.errors.email">
				            {{ form.errors.email }}
				    </span>
                </div>

                <div class="form-group" :class="{'has-error': form.errors.password }">
                    <label for="password">Password</label>
                    <input id="password" type="text" class="form-control" name="password">
                    <span class="help-block" v-if="form.errors.password">
				        {{ form.errors.password }}
				    </span>
                </div> 
            </form>
		</template>

		<template slot="footer">
			<button class=" btn btn-default" @click="cancelForm">Cancel</button>
            <button :disabled="form.busy" @click="sendForm" class=" btn btn-info">
            	Create User <i v-if="form.busy" class="fa fa-spinner fa-pulse fa-fw"></i>
            </button>
		</template>
	</modal>
</template>
<script>
	import modal from './modal.vue';
	import { createUser, cancelForm } from '../../vuex/actions';
	import { form } from '../../vuex/getters';

    export default {
    	components: { modal },
    	data() { 
    		return {
    			user: {
    				name: '',
					email: '',
					password: '',
					role: 'user'
    			}
    		}
    	},
    	vuex: {
    		getters: { form },
            actions: { createUser, cancelForm }
        },
    	props: {
			model: {
				type: Object,
				required: true
			}
		},
		methods: {
			sendForm() {
				let formData = new FormData(document.getElementById('createForm'));
				this.createUser(formData)
			}
		}
    }
</script>
<style>

</style>