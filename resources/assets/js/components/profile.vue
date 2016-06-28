<template>
    <div class="container">
        <div class="row">
            <div class="col-md-8 col-md-offset-2">
                <img :src="currentUser.avatar" class="avatar" @click="currentModal = 'update-avatar'">    
                <h2>{{ currentUser.name }} <small>(role:{{ currentUser.role }})</small> <i class="fa fa fa-pencil edit" @click="currentModal = 'update-profile'"></i></h2>
                <h4>{{ currentUser.full_name }}</h4>
                <h4>{{ currentUser.birth_date }}</h4>
                <h4>{{ currentUser.address }}</h4>
                <h4>{{ currentUser.zip_code }}</h4>
            </div>
        </div><br>
        <div class="row">
            <div class="col-md-8 col-md-offset-2">
                <div id="map"></div>
            </div>
        </div>
        <component :is="currentModal" :show.sync="currentModal"></component>
    </div>
</template>
<script>
    import UpdateAvatar from './shared/update-avatar.vue';
    import UpdateProfile from './shared/update-profile.vue';
    import CreateProfile from './shared/update-profile.vue';

    export default {
        components: { 
            UpdateAvatar, UpdateProfile, CreateProfile
        },
        data() {
            return {
                currentModal: '',
                map: null,
                geocoder: null,
                marker: null
            }
        },
        vuex: {
            getters: {
                currentUser: state => state.currentUser
            }
        },
        ready() {
            if( ! this.currentUser.full_name == '' )
            {
                this.currentModal = 'create-profile'
            }
        },
        methods: {
            geocodeAddress() {
                let geocoder = this.geocoder;
                let map = this.map;
                let address = this.currentUser.address;

                geocoder.geocode({'address': address  }, function(results, status) {
                    if (status === google.maps.GeocoderStatus.OK) {
                      map.setCenter(results[0].geometry.location);
                        if( this.marker ) this.marker.setMap(null);
                        this.marker = new google.maps.Marker({
                            map: map,
                            position: results[0].geometry.location
                        });
                    }
                });
            }

        },
        events: {
            'google-loaded'() {
               this.map = new google.maps.Map(document.getElementById('map'), {
                    zoom: 15,
                    center: {lat: 0, lng: 0}
                });
               this.geocoder = new google.maps.Geocoder();
            }
        },
        watch: {
            'currentUser': function (val, oldVal) {
                if(this.currentUser.address)
                {
                   this.geocodeAddress()
                }
            }
        }
    }
</script>
<style>       
    .avatar {
        width:180px; 
        height:180px; 
        border-radius:50%; 
        margin-right:25px; 
        float: left;
    }
    .avatar:hover{
        cursor: pointer;
    }

    #map {
        height: 300px;
    }
    .edit {
        cursor: pointer;
        font-size: .7em;
        color: lightgray;
    }
    .edit:hover {
        color: gray;
    }

</style>