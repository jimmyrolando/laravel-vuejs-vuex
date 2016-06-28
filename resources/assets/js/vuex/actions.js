import api from '../api'

export const getCurrentUser = ({ dispatch }) => {
	api.getCurrentUser( user => { 
		if( ! user )
		{
			dispatch('LOGOUT_USER');
			return 	
		}

		dispatch('LOGIN_USER', user);
	})
}

export const getAllUsers = ({ dispatch }) => {
	api.getAllUsers( users => {
		if( users )
		{
			dispatch('GET_ALL_USERS',users)
		}
	})
}

export const uploadAvatar = ({ dispatch }, dataform ) => {
	api.uploadAvatar( dataform , avatar => { 
		dispatch('UPDATE_AVATAR', avatar);
	},
		resp => {  }
	)
}

export const uploadProfile = ({ dispatch }, dataform, id ) => {
	api.uploadProfile( dataform, id, profile => { 
		dispatch('UPDATE_PROFILE', profile);
	}, resp => { 
		for (var item in resp.data) {
		  console.log( resp.data[item][0]);
		}
	})
}

export const logout = ({ dispatch }) => {
	api.logout( resp => { 
		dispatch('LOGOUT_USER');
		location.reload(true);
	})
}

export const deleteUser = ({ dispatch }, user) => {
	api.deleteUser( user ,resp => { 
		dispatch('DELETE_USER',user);
	})
}

export const updateUser = ({ dispatch }, dataform, id) => {
	api.updateUser( dataform, id, data => { 
		dispatch('UPDATE_USER',data.users);
		dispatch('UPDATE_CURRENT_USER',data.user);
		
	})
}

export const createUser = ({ dispatch }, dataform) => {
	api.createUser( dataform, user => { 
		dispatch('CREATE_USER',user);
	})
}