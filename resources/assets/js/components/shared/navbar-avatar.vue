<template >
	<a href="#" class="dropdown-toggle text-capitalize" data-toggle="dropdown" role="button" aria-expanded="false" style="position:relative; padding-left:50px;">
    <img class="avatar-thumb text-capitalize" alt=" " :src="currentUser.avatar" v-show="currentUser.avatar">
        {{ currentUser.name }} <span class="caret"></span>
    </a>
</template>
<script>
    export default {
        vuex: {
            getters: {
                currentUser: state => state.currentUser,
            }
        }
    }
</script>
<style>
    .avatar-thumb {
        top: 10px; 
        left: 10px; 
        width: 32px; 
        height: 32px; 
        position: absolute; 
        border-radius: 50%;
    }
</style>