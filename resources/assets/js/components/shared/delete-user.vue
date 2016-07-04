<template>
	<modal v-if="form.show">
		<template slot="header" class="text-center">
			<h2 class="text-center text-capitalize">Delete User {{ model.name }}? </h2>
		</template>

		<template slot="header">
			
			<p class="text-center"><br>Please note that this operations <strong>cannot be undone!</strong></p>
		</template>
		
		<template slot="footer">
			<button class=" btn btn-default" @click="cancelForm">Cancel</button>
            <button :disabled="form.busy" @click="deleteUser(model)" class=" btn btn-danger">Delete User</button>
		</template>
	</modal>
</template>
<script>
	import modal from './modal.vue';
	import { deleteUser, cancelForm } from '../../vuex/actions';
	import { form } from '../../vuex/getters';

    export default {
    	components: { modal },
    	vuex: {
    		getters: { form },
            actions: { deleteUser, cancelForm }
        },
    	props: {
			model: {
				type: Object,
				required: true
			}
		}
    }
</script>
<style>
	@media( min-width: 768px) { 
		.modal-container small {
	  		width: 35%;
	  		min-width: 430px;
		}
	}
</style>