<template>
	<modal :show.sync="showModal">
		<h2 slot="header" v-show="!image">Seleccione una imagen para el Perfil</h2>
		<template slot="body" >
    		<form id="avatarForm" enctype="multipart/form-data" action="/profiles" method="POST">
            	<input type="file" name="avatar">
            	
        	</form>
		</template>
		<button slot="footer" type="submit" @click.prevent="sendAvatar" class="pull-right btn btn-primary">Actualizar Avatar</button>
	</modal>
</template>
<script>
	import modal from './modal.vue';
	import { uploadAvatar } from '../../vuex/actions';

    export default {
    	data() { 
    		return {
    			image: '',
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
                uploadAvatar
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
			}
		},
		methods: {
			sendAvatar() {
				let formData = new FormData(document.getElementById('avatarForm'));
				this.uploadAvatar(formData)
				this.showModal = false
				this.show = ''
				this.image = ''
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