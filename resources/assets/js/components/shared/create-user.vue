<template>
	<modal :show.sync="showModal">
		<h2 slot="header" >Crear Nuevo Usuario</h2>
		<template slot="body" >
    		<form id="userCreateForm" role="form" method="POST">

    					<div class="form-group">
                            <label for="name">Role</label>
                            <select name="role" id="role" class="form-control" v-model="user.role">
					    		<option value="admin">Administrador</option>
					    		<option value="user">Usuario</option>
					    	</select>
                        </div>
                        <div class="form-group">
                            <label for="name">Nombre de Usuario</label>
                            <input id="name" type="text" class="form-control" name="name" value="">
                        </div>

                        <div class="form-group">
                            <label for="email">Correo Electrónico</label>
                            <input id="email" type="email" class="form-control" name="email" value="">
                        </div>

                        <div class="form-group">
                            <label for="password">Contraseña</label>
                            <input id="password" type="text" class="form-control" name="password">
                        </div>
                    </form>
		</template>
		<button slot="footer" type="submit" @click.prevent="sendUser" class="pull-right btn btn-primary">Crear Usuario</button>
	</modal>
</template>
<script>
	import modal from './modal.vue';
	import { createUser } from '../../vuex/actions';

    export default {
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
    	computed: {
    		showModal: {
    			get () {
			      return this.show != ''
			    },
			    set (val) {
			      this.show = ''
			    }
            }
    	},
    	vuex: {
            actions: {
                createUser
            }
        },
    	components: {
    		modal
    	},
    	props: {
			show: {
			  type: String,
			  required: true,
			  twoWay: true   
			},
			model: {
				type: Object,
				required: true
			}
		},
		methods: {
			sendUser() {
				let formData = new FormData(document.getElementById('userCreateForm'));
				this.createUser(formData)
				if( ! this.errors )
				{
					this.showModal = false
					this.show = ''
					return
				}
				// console.log(this.errors)
			}
		}
    }
</script>
<style>
	@media( min-width: 768px) { 
		.modal-container {
	  		width: 35%;
	  		min-width: 430px;
	  		min-height: 200px
		}
	}
</style>