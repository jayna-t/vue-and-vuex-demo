<template>
    <form @submit.prevent="onSubmit" novalidate class="md-layout center">
        <md-card class="md-layout-item md-size-50 md-small-size-100">
            <md-card-header>
                <div class="md-title">Login</div>
            </md-card-header>

            <md-card-content>
                <!-- email -->
                <div class="md-layout md-gutter">
                    <div class="md-layout-item md-small-size-100">
                        <md-field>
                            <md-input type="email" name="email" placeholder="Enter email" v-model="email" />
                        </md-field>
                    </div>
                </div>
                <!-- password -->
                <div class="md-layout md-gutter">
                    <div class="md-layout-item md-small-size-100">
                        <md-field>
                            <md-input type="password" name="password" placeholder="Enter password" v-model="password" />
                        </md-field>
                    </div>
                </div>
            </md-card-content>

            <md-card-footer>
                <md-button class="md-primary md-raised" type="submit">Login</md-button>
            </md-card-footer>
        </md-card>
      
    </form>
</template>

<script>
    export default {
        name: "Login",
        data() {
            return {
                email: "",
                password: ""
            }
        },
        methods: {
            onSubmit() {
                this.$store.dispatch('addUser', { email: this.email, password: this.password, id: this.$store.getters.user.length + 1 })
                localStorage.setItem('id', this.$store.getters.user.length + 1);
                localStorage.setItem('email', this.email);
                this.$router.push('/')
            }
        }
    }
</script>

<style>
    .center {
        display: flex;
        justify-content: center;
    }
</style>