<template>
	<modal v-if="form.show">
		<template slot="header">
			<h2 class="text-center">Select a Profile's Image</h2>
		</template>

		<template slot="body" >
    		<form id="avatarForm" enctype="multipart/form-data" method="POST">
            	<div class="form-group" :class="{'has-error': form.errors.avatar }">
			    	<input type="file" id="avatar" name="avatar">
			    	<span class="help-block" v-if="form.errors.avatar">
		            	{{ form.errors.avatar }}
			    	</span>
				</div>
        	</form>
		</template>

		<template slot="footer">
			<button class="btn btn-default" @click="cancelForm">Cancel</button>
			<button :disabled="form.busy" @click="sendForm" class=" btn btn-info">
            	Update User <i v-if="form.busy" class="fa fa-spinner fa-pulse fa-fw"></i>
            </button>
		</template>
	</modal>
</template>
<script>
	import modal from './modal.vue';
	import { updateAvatar, cancelForm } from '../../vuex/actions';
	import { form } from '../../vuex/getters';

    export default {
    	components: { modal },
    	data() { 
    		return {
    			image: '',
    		}
    	},
    	vuex: {
    		getters: { form },
            actions: { updateAvatar, cancelForm }
        },
    	props: {
			model: {
				type: Object,
				required: true
			}
		},
		methods: {
			sendForm() {
				let formData = new FormData(document.getElementById('avatarForm'));
				this.updateAvatar(formData)
			}
		}
    }
</script>
<style>

</style>