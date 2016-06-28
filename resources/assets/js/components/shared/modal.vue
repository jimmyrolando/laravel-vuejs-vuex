<template>
	<div class="modal-mask" v-show="show" transition="modal" >
	<div class="modal-wrapper">
		<div class="modal-container">
			<div class="modal-header">
				<slot name="header">
				</slot>
			</div>
			<div class="modal-body">
				<slot name="body">
				</slot>
			</div>
			<div class="modal-footer">
				<button v-if="cancel" class="btn btn-danger" @click="show = false">Cancelar</button>
				<slot name="footer">
				</slot>
			</div>
		</div>
	</div>
  </div>
</template>
<script>
	export default {
		props: {
			show: {
			  type: Boolean,
			  required: true,
			  twoWay: true,
			  default: false    
			},
			cancel: {
				type: Boolean,
				default: true
			}
		}
	}
</script>

<style>
	.close-button {
		font-size: 25px;
		font-weight: 100;
		color: tomato;
		position: absolute;
		top: 15px;
		left: 25px;
		cursor: pointer;
	}

	.modal-mask {
	  position: fixed;
	  z-index: 9998;
	  top: 0;
	  left: 0;
	  width: 100%;
	  height: 100%;
	  background-color: rgba(0, 0, 0, .5);
	  display: table;
	  transition: opacity .3s ease;
	}

	.modal-wrapper {
	  display: table-cell;
	  vertical-align: middle;
	}

	@media( min-width: 768px) { 
		.modal-container {
	  		width: 55%;
	  		min-width: 430px;
	  		min-height: 200px
		}
	}



	.modal-container {
	  margin: 0px auto;
	  padding: 20px 30px;
	  background-color: #fff;
	  border-radius: 4px;
	  box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
	  transition: all .3s ease;
	  font-family: Helvetica, Arial, sans-serif;
	  position: relative;
	}

	.modal-header h3 {
	  margin: 0;
	}

	.modal-body {
	  /*margin: 20px 0;*/
	}

	.modal-header, .modal-footer {
		border: none;
	}

	.modal-default-button {
	  float: right;
	}

	/*
	 * the following styles are auto-applied to elements with
	 * v-transition="modal" when their visiblity is toggled
	 * by Vue.js.
	 *
	 * You can easily play with the modal transition by editing
	 * these styles.
	 */

	.modal-enter, .modal-leave {
	  opacity: 0;
	}

	.modal-enter .modal-container,
	.modal-leave .modal-container {
	  -webkit-transform: scale(1.1);
	  transform: scale(1.1);
	}
</style>