<template>
	<div class="container">
		<div class="row">
		 	<div class="col-md-10 col-md-offset-1 clearfix">
				<button @click="createUser()" class="btn btn-success pull-right" style="margin-bottom:10px;">Nuevo Usuario</button>
			</div>
		</div>
        <div class="row">
            <div class="col-md-10 col-md-offset-1">

                <div class="panel panel-default">
                    <div class="panel-body">
                        <div class="media" v-for="user in users">
                        	<div class="controls">
                        		<i @click="editUser(user)" class="fa fa-2x fa-pencil tm-edit"></i>
                        		<i @click="deleteUser(user)" class="fa fa-2x fa-trash tm-delete"></i>
                        	</div>
							<div class="media-left media-middle ">

								<a href="#" @click.prevent="editUser(user)">
									<img class="media-object avatar-admin" :src="user.avatar" alt="{{ user.name }}">
									
								</a>
								
							</div>
							<div class="media-body">
							<p class=""></p>
								<h5 class="media-heading"><strong >{{ user.name.toUpperCase() }}</strong> <span> ({{ user.role }})</span></h5>
								<h4>{{ user.full_name }}</h4>
								<h5>{{ user.birth_date }}</h5>
								<h5>{{ user.address }}</h5>
								<h5>{{ user.zip_code }}</h5>
							</div>
						</div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <component :is="currentModal" :model="editedUser" :show.sync="currentModal"></component>
</template>
<script>
    import CreateUser from './shared/create-user.vue';
	import UpdateUser from './shared/update-user.vue';
	import { getAllUsers, deleteUser } from '../vuex/actions';

	export default {
		components: { 
            CreateUser, UpdateUser
        },
        data() {
            return {
                currentModal: '',
                editedUser: null
            }
        },
		vuex: {
			getters:{
				users: state => state.users,
			},
			actions: {
				getAllUsers,
				deleteUser
			}
		},
		created() {
			this.getAllUsers()
		},
		methods: {
			deleteUser(user) {
				this.deleteUser(user)
			},
            editUser(user) {
                this.editedUser = user
                this.currentModal = 'update-user'
            },
            createUser() {
                this.editedUser = { }
                this.currentModal = 'create-user'
            }
		}
	}
</script>
<style>
	.avatar-admin {
        width:100px; 
        height:100px; 
        border-radius:50%; 
        margin-right:25px; 
        float: left;
    }
    .media {
    	position: relative;
    }
    .controls {
    	position: absolute;
    	top: 35%;
    	right: 20px;
    }

    .controls i {
    	margin-left: 10px;
    }

    i.tm-edit {
    	color: rgba(14, 125, 247, 0.44);
    }

    i.tm-edit:hover {
    	color: #0e7df7;
    }

    i.tm-delete {
    	color: rgba(255, 112, 86, 0.64);
    }
    i.tm-delete:hover {
    	color: tomato;
    }

    .media::after {
    	content: '';
    	width: 100%;
    	border-bottom: 1px dashed lightgray;
    	display: block;
    	margin: 0 auto;
    }

    .media:last-child::after {
    	border-bottom: none;
    }
	
</style>