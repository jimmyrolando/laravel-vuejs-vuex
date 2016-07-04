<template>
	<modal v-if="form.show">
		<template slot="header">
			<h2 class="text-capitalize">Edit {{ model.name + "'s" }} Profile</h2>
		</template>

		<template slot="body" >
    		<form id="profileForm" enctype="multipart/form-data" method="POST">
    			<input type="hidden" name="_method" value="PATCH">

				<div class="form-group" :class="{'has-error': form.errors.full_name }">
					<label for="full_name">Full Name</label>
					<input :value="model.full_name" type="text" class="form-control" id="full_name" name="full_name" placeholder="Nombres y Apellidos">
					<span class="help-block" v-if="form.errors.full_name">
			            {{ form.errors.full_name }}
				    </span>
				</div>

				<div class="row">
				  	<div class="form-group col-md-4" :class="{'has-error': form.errors.birth_date }">
				    	<label for="birth_date">Birth Date</label>
				    	<input v-model="user.birth_date" :value="model.birth_date" type="date" max="{{ minDate }}" class="form-control" id="birth_date" name="birth_date" placeholder="Fecha de Nacimiento">
				    	<span class="help-block" v-if="form.errors.birth_date">
			            	{{ form.errors.birth_date }}
				    	</span>
					</div>

				  	<div class="form-group col-md-8" :class="{'has-error': form.errors.avatar }">
				    	<label for="avatar">Avatar</label>
				    	<input type="file" id="avatar" name="avatar">
				    	<span class="help-block" v-if="form.errors.avatar">
			            	{{ form.errors.avatar }}
				    	</span>
				  	</div>
				</div>

				<div class="row">
					<div class="form-group col-md-9" :class="{'has-error': form.errors.address }">
						<label for="address">Address</label>
						<input v-model="user.address" :value="model.address" type="text" class="form-control" id="address" name="address" placeholder="Calle Av Barrio Urbanización, Ciudad, Estado, Pais">
						<span class="help-block" v-if="form.errors.address">
				            {{ form.errors.address }}
					    </span>
					</div>

					<div class="form-group col-md-3" :class="{'has-error': form.errors.zip_code }">
						<label for="zip_code">Zip Code</label>
						<input v-model="user.zip_code" :value="model.zip_code" type="text" class="form-control" id="zip_code" name="zip_code" placeholder="Codigo Postal">
						<span class="help-block" v-if="form.errors.zip_code">
				            {{ form.errors.zip_code }}
					    </span>
					</div>
				</div>
        	</form>
		</template>
		<template slot="footer">
			<button class=" btn btn-default" @click="cancelForm">Cancel</button>
			<button :disabled="form.busy" @click="sendForm" class=" btn btn-info">
            	Update User <i v-if="form.busy" class="fa fa-spinner fa-pulse fa-fw"></i>
            </button>
		</template>
	</modal>
</template>
<script>
	import modal from './modal.vue';
	import { updateProfile, cancelForm } from '../../vuex/actions';
	import { form } from '../../vuex/getters';

    export default {
    	components: { modal	},
    	vuex: {
    		getters: { form },
            actions: { updateProfile, cancelForm  }
        },
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
    	computed: {
            minDate: function() {
            	let today= new Date()
            	let year = today.getFullYear() - 18
            	let month = today.getMonth() + 1
            	let day = today.getDate()

            	month = month > 9 ? month: '0'+month 
            	
            	day = day > 9 ? day: '0'+day 

            	return year +'-'+month+'-'+day
            }
    	},
    	props: {
			model: {
				type: Object,
				required: true
			}
		},
		methods: {
			sendForm() {
				let formData = new FormData(document.getElementById('profileForm'));
				this.updateProfile(formData, this.model.id)
			}
		}
    }
</script>
<style>

</style>