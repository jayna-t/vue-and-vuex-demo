<template>
    <div>
      <div style="display: flex, justifyContent: flex-end" v-show="isAuth">
      <h4 style="cursor: pointer" @click="callLogout">Logout</h4>
    </div>
        <form @submit.prevent="onSubmit" class="md-layout center" novalidate>
          <md-card class="md-layout-item md-size-50 md-small-size-100">
            <md-card-header>
                <div class="md-title">Add Task</div>
            </md-card-header>

            <md-card-content>
              <div class="md-layout md-gutter">
                <div class="md-layout-item md-small-size-100">
                  <md-field>
                    <md-input v-show="!editData" type="text" name="name" placeholder="Enter task name" v-model="name" />
                    <md-input v-if="editData" v-model="editData.name" type="text" name="name" placeholder="Enter task name"/>
                  </md-field>
                </div>
              </div>
            </md-card-content>

            <md-card-footer>
                <md-button class="md-primary md-raised" type="submit">Submit/Add</md-button>
            </md-card-footer>
          </md-card>
            
        </form>
        
        <showList :listData="listData" @update-data="updateData" />
    </div>
</template>

<script>

import showList from '../components/ShowList.vue'

export default {
  name: 'List',
  components: {
    showList
  },
  data(){
    return {
      name: "",
      editData: null
    }
  },
  computed: {
    listData() {
      return this.$store.getters.list
    },
    isAuth() {
      return localStorage.getItem('id') ? true: false
    }
  },
  methods: {
    onSubmit() {
      if(this.editData) {
        this.$store.dispatch('updateList', { name: this.editData.name, id: this.editData.id, userId: localStorage.getItem('id') } )
        this.editData.name = ""
      } else {
        this.$store.dispatch('addList', { name: this.name, id: this.listData.length + 1, userId: localStorage.getItem('id') });
        this.name = ''
      }
    },
    updateData(data) {
      this.editData = data
    //   this.$store.dispatch('updateList', data)
    },
    callLogout() {
      localStorage.clear();
      this.$router.push('login')
    }
  }  
}
</script>