<template>
    <!-- list data -->
    <div>
      <md-list v-for="(list,index) in listData" v-bind:key="index">
        <md-list-item>
          {{ list.name + ' by ' + email }}
          <md-button class="md-primary md-raised">Edit</md-button>
          <md-button class="md-accent md-raised">Delete</md-button>
        </md-list-item>
      </md-list>
        
    </div>
</template>

<script>
export default {
    data() {
        return {
            email: localStorage.getItem('email'), 
        }
    },
    props:{
        listData: {
            type: Array
        },
    },
      methods: {
    onSubmit() {
      if(this.isEdit) {
        this.$store.dispatch('updateList', { name: this.editData.name, id: this.editData.id, userId: localStorage.getItem('id') } )
      } else {
        this.$store.dispatch('addList', { name: this.name, id: this.listData.length + 1 });
        this.name = ''
      }
    },
    deleteData(data) {
      this.$store.dispatch('deleteList', data)
    },
    callEdit(data) {
      this.$emit('update-data',data)
    }
  }
}
</script>