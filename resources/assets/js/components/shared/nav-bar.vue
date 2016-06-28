<template>
    <nav class="navbar navbar-default navbar-static-top">
        <div class="container">
            <div class="navbar-header">

                <!-- Collapsed Hamburger -->
                <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#app-navbar-collapse">
                    <span class="sr-only">Toggle Navigation</span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                </button>

                <!-- Branding Image -->
                <a class="navbar-brand" href="/">
                    Prueba4
                </a>
            </div>

            <div class="collapse navbar-collapse" id="app-navbar-collapse">
                <!-- Left Side Of Navbar -->
                <ul class="nav navbar-nav">
                    <li v-if="logged"><a href="/home">Dashboard</a></li>
                    <li v-if="currentUser.role=='admin'"><a href="/admin">Administrar</a></li>
                </ul>

                <!-- Right Side Of Navbar -->
                <ul class="nav navbar-nav navbar-right">
                    <!-- Authentication Links -->
                        <li v-if="!logged"><a href="/login">Login</a></li>
                        <li v-if="!logged"><a href="/register">Registro</a></li>
                        <li class="dropdown" v-if="logged">
                            <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false" style="position:relative; padding-left:50px;">
                            <img class="avatar-thumb" :src="currentUser.avatar" >
                                {{ currentUser.name }} <span class="caret"></span>
                            </a>
                            <ul class="dropdown-menu" role="menu">
                                <li><a href="/profile"><i class="fa fa-btn fa-user"></i>Perfil</a></li>
                                <li role="separator" class="divider"></li>
                                <li><a href="/logout" @click.prevent="logout"><i class="fa fa-btn fa-sign-out"></i>Logout</a></li>
                            </ul>
                        </li>
                </ul>
            </div>
        </div>
    </nav>
</template>
<script>

    import { logout } from '../../vuex/actions';

    export default {
        vuex: {
            getters: {
                currentUser: state => state.currentUser,
                logged: state => state.logged
            },
            actions: {
                logout
            }
        }
    }
</script>
<style>
    .avatar-thumb {
        width:  32px; 
        height: 32px; 
        position:   absolute; 
        top:    10px; 
        left:   10px; 
        border-radius:  50%
    }
</style>