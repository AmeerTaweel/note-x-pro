<template>
  <v-container class="word-break">
    <v-text-field class="my-2" label="Title" :color="colorPrimary" v-model="note.title"/>
    <v-textarea class="my-2" label="Body" :color="colorPrimary" auto-grow clearable counter outlined v-model="note.text"/>
    <v-select class="my-2" label="Priority" item-text="disp" item-value="val" return-object :color="colorPrimary" v-model="priority" :items="priorityTypes" chips />
    <v-combobox class="my-2" label="Tags" :color="colorPrimary" v-model="note.tags" hint="Click enter after each tag." persistent-hint hide-selected multiple chips deletable-chips clearable/>
    <v-btn class="my-2" :color="colorAccent" dark @click="save">Save</v-btn>
    <v-snackbar v-model="errorSnackbar" bottom color="error" :timeout="5000">
      Note title and body can't be empty.
      <v-btn dark text icon @click="errorSnackbar = false">
        <v-icon>close</v-icon>
      </v-btn>
    </v-snackbar>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    errorSnackbar: false,
    priority: {
        disp: `Low Priority`,
        val: {
            num: 1,
            color: `green`
        }
    },
    priorityTypes: [{
        disp: `Low Priority`,
        val: {
            num: 1,
            color: `green`
        }
    }, {
        disp: `Medium Priority`,
        val: {
            num: 2,
            color: `orange`
        }
    }, {
        disp: `High Priority`,
        val: {
            num: 3,
            color: `red`
        }
    }],
    note: {
        title: ``,
        text: ``,
        priority: {},
        tags: []
    }
  }),
  props: {
    edit: Boolean,
    index: Number
  },
  methods: {
    save(){
        let note = this.note
        if(!note.title.length || !note.text.length){
            this.errorSnackbar = true
        }else{
            note.priority = this.priority.val
            note.time = new Date(Date.now()).toLocaleString()
            note.mls = Date.now()
            for(let i = 0; i < note.tags.length; i++){
                note.tags[i] = note.tags[i].trim()
                note.tags[i] = note.tags[i].replace(` `, `_`)
            }
            this.$emit('save-note', note)
        }
    }
  },
  created() {
      if(this.edit){
          this.note = this.$store.state.notes[this.index]
          this.priority = this.priorityTypes[this.note.priority.num - 1]
      }
  }
}
</script>
