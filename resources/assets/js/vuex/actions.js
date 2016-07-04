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

export const updateProfile = ({ dispatch }, dataform, id ) => {
	dispatch('SET_FORM_BUSY',true);
	api.updateProfile( dataform, id, 
		profile => {
			dispatch('CLEAR_FORM');
			dispatch('UPDATE_PROFILE', profile);
		}, 
		errors => { 
			dispatch('SET_ERRORS', errors);
			dispatch('SET_FORM_BUSY',false);
		}
	)
}

export const updateUser = ({ dispatch, state }, dataform, id) => {
	dispatch('SET_FORM_BUSY',true);
	api.updateUser( dataform, id, 
		data => {
			dispatch('CLEAR_FORM');
			dispatch('UPDATE_USERS',data.users);
			if( state.currentUser.id == id)
			{
				dispatch('UPDATE_CURRENT_USER',data.user);
			}
		},
		errors => { 
			dispatch('SET_ERRORS', errors);
			dispatch('SET_FORM_BUSY',false);
		}
	)
}

export const createUser = ({ dispatch }, dataform) => {
	dispatch('SET_FORM_BUSY',true);
	api.createUser( dataform, 
		user => { 
			dispatch('CREATE_USER',user);
			dispatch('CLEAR_FORM');
		},
		errors => { 
			dispatch('SET_ERRORS',errors);
			dispatch('SET_FORM_BUSY',false);
		}
	)
}

export const deleteUser = ({ dispatch }, user) => {
	api.deleteUser( user ,resp => { 
		dispatch('CLEAR_FORM');
		dispatch('DELETE_USER',user);
	})
}

export const updateAvatar = ({ dispatch }, dataform ) => {
	dispatch('SET_FORM_BUSY',true);
	api.uploadAvatar( dataform, 
		data => {
			dispatch('CLEAR_FORM');
			dispatch('UPDATE_CURRENT_USER',data.user);
		},
		errors => { 
			dispatch('SET_ERRORS', errors);
			dispatch('SET_FORM_BUSY',false);
		}
	)
}


export const cancelForm = ({ dispatch }) => {
	dispatch('CLEAR_FORM');
}

export const showForm = ({ dispatch }) => {
	dispatch('SET_FORM_SHOW',true);
}