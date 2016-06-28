<template>
	<modal :show.sync="showModal" :cancel="cancel">
		<h2 slot="header">Actualizar Usuario: {{ model.name }}</h2>
		<template slot="body" >
    		<form id="userProfileForm" method="POST">
    			<input type="hidden" name="_method" value="PATCH">

    				<div class="form-group">
					    <label for="role">Role</label>
					    <select name="role" id="role" class="form-control" v-model="thisRole">
					    	<option value="admin">Administrador</option>
					    	<option value="user">Usuario</option>
					    </select>
				    
				  	</div>

            	  <div class="form-group">
				    <label for="full_name">Nombre Completo <span class="error" v-show="user.full_name == ''">*</span></label>
				    <input v-model="user.full_name" :value="model.full_name" type="text" class="form-control" id="full_name" name="full_name" placeholder="Nombres y Apellidos">
				  </div>

				  <div class="row">
				  <div class="form-group col-md-4">
				    <label for="birth_date">Fecha de Nacimiento <span class="error" v-show="user.birth_date == ''">*</span></label>
				    <input v-model="user.birth_date" :value="model.birth_date" type="date"
				     max="{{ minDate }}" class="form-control" id="birth_date" name="birth_date" placeholder="Fecha de Nacimiento">
				  </div>
				  <div class="form-group col-md-8">
				    <label for="avatar">Foto de Perfil</label>
				    <input type="file" id="avatar" name="avatar">
				  </div>
				  </div>
				  <div class="form-group">
				    <label for="address">Dirección <span class="error" v-show="user.address == ''">*</span></label>
				    <input v-model="user.address" :value="model.address" type="text" class="form-control" id="address" name="address" placeholder="Calle Av Barrio Urbanización, Ciudad, Estado, Pais">

				  </div>
				  <div class="row">
				  		<div class="form-group col-md-4">
					    <label for="zip_code">Codigo Postal <span class="error" v-show="user.zip_code == ''">*</span></label>
					    <input v-model="user.zip_code" :value="model.zip_code" type="text" class="form-control" id="zip_code" name="zip_code" placeholder="Codigo Postal">
					  </div>
				  </div>
				  <p v-show="!validateForm"><span class="error">*</span> Requeridos</p>
        	</form>
		</template>
		<template slot="footer">
		<button v-if="validateForm" type="submit" @click.prevent="sendUser" class="pull-right btn btn-primary">Actualizar Perfil</button>
		</template>

	</modal>
</template>
<script>
	import modal from './modal.vue';
	import { updateUser } from '../../vuex/actions';

    export default {
    	data() {
    		return {
    			user: {
    				full_name: '',
					birth_date: '',
					address: '',
					zip_code: '',
					role: ''
    			}
    		}
    	},
    	components: { modal	},
    	computed: {
    		showModal: {
    			get () {
			      return this.show != ''
			    },
			    set (val) {
			      this.show = ''
			    }
            },
            cancel: function() {
            	return this.show != 'create-profile'
            },
            minDate: function() {
            	let today= new Date()
            	let year = today.getFullYear() - 18
            	let month = today.getMonth() + 1
            	let day = today.getDate()

            	month = month > 9 ? month: '0'+month 
            	
            	day = day > 9 ? day: '0'+day 

            	return year +'-'+month+'-'+day
            },
            validateForm: function() {
            	if( ! this.user.full_name || ! this.user.birth_date || ! this.user.address || ! this.user.zip_code)
            	{
            		return false
            	}

            	return true
            },
			thisRole: {
				get () {
				  return this.model.role
				},
				set (val) {
				  this.user.role = val
				}
			}
    	},
    	vuex: {
            actions: {
                updateUser
            }
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
				let formData = new FormData(document.getElementById('userProfileForm'));
				this.updateUser(formData, this.model.id)
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
	.error {
		color: red;
	}
</style>