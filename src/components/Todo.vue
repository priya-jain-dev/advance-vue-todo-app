<template>
  <v-main>
    <v-container fluid>
      <v-row align="center" justify="center">
        <v-col cols="12" sm="8" md="6" class="ma-5">
          <h1 class="todo-title">#todo</h1>
          <v-card class="pt-6 mt-5 card-view">
            <v-row>
              <v-col cols="8" class="ml-5">
                <v-card-title class="card_title">
                  <b>{{moment().format('MMMM, Do')}}</b>
                  <br />
                </v-card-title>
                <v-card-subtitle class="card-sub-title">
                  <span>{{moment().format('dddd')}}</span>
                </v-card-subtitle>
              </v-col>
              <v-col class="mt-2">
                <v-progress-circular
                  :rotate="360"
                  :size="50"
                  :width="5"
                  class="mr-2"
                  :value="progress"
                  color="#8F8DA5"
                >{{ parseInt(progress) }}</v-progress-circular>
              </v-col>
            </v-row>

            <v-tabs
              v-model="tab"
              background-color="transparent"
              color="#5A5EE7"
              fixed-tabs
              class="mt-5"
            >
              <v-tab v-for="item in items" :key="item">
                <v-container v-if="item == 'Active' && remainingTasks ">
                  <v-badge color="#f57173" :content="remainingTasks">{{ item }}</v-badge>
                </v-container>
                <v-container v-else-if="item == 'Completed' && completedTasks">
                  <v-badge color="#8F8DA5" :content="completedTasks">{{ item }}</v-badge>
                </v-container>
                <v-container v-else>{{ item }}</v-container>
              </v-tab>
            </v-tabs>
            <v-divider></v-divider>
            <v-tabs-items v-model="tab">
              <v-tab-item v-for="(item,index) in items" :key="item">
                <!-- All -->
                <template v-if="index == 0">
                  <v-card color="basil" flat>
                    <v-text-field
                      v-model="task"
                      single-line
                      solo
                      :clear-icon="icons[0]"
                      clearable
                      label="Enter New Todo"
                      type="text"
                      @click:clear="clearMessage"
                      @keydown.enter="create"
                      hint="Press enter to create task"
                      class="my-text-style"
                    >
                      <template v-slot:append>
                        <v-btn depressed rounded color="secondary" class="ma-0" @click="create">Add</v-btn>
                      </template>
                    </v-text-field>
                    <v-card v-if="tasks.length > 0" flat>
                      <v-slide-y-transition class="py-0" group tag="v-list">
                        <template v-for="(task, i) in tasks">
                          <v-divider v-if="i !== 0" :key="`${i}-divider`"></v-divider>
                          <v-list-item :key="`${i}-${task.text}`">
                            <v-list-item-action>
                              <v-checkbox
                                v-model="task.done"
                                :color="task.done && 'accent' || 'secondary'"
                              >
                                <template v-slot:label>
                                  <div
                                    :class="task.done && 'grey--text text-decoration-line-through' || 'black--text'"
                                    class="ml-4"
                                    v-text="task.text"
                                  ></div>
                                </template>
                              </v-checkbox>
                            </v-list-item-action>
                          </v-list-item>
                        </template>
                      </v-slide-y-transition>
                    </v-card>
                    <v-card v-else flat>
                      <img src="../assets/no_data.svg" alt="No data found" height="300">
                    </v-card>
                  </v-card>
                </template>

                <!-- Active -->
                <template v-if="index == 1">
                  <v-card color="basil" flat>
                    <v-text-field
                      v-model="task"
                      single-line
                      solo
                      :clear-icon="icons[0]"
                      clearable
                      label="Enter New Todo"
                      type="text"
                      @click:clear="clearMessage"
                      @keydown.enter="create"
                      hint="Press enter to create task"
                      class="my-text-style"
                    >
                      <template v-slot:append>
                        <v-btn depressed rounded color="secondary" class="ma-0" @click="create">Add</v-btn>
                      </template>
                    </v-text-field>
                    <v-card v-if="remainingTasks" flat>
                      <v-slide-y-transition class="py-0" group tag="v-list">
                        <template v-for="(task, i) in tasks">
                          <template v-if="!task.done">
                            <v-divider v-if="i !== 0" :key="`${i}-divider`"></v-divider>
                            <v-list-item :key="`${i}-${task.text}`">
                              <v-list-item-action>
                                <v-checkbox
                                  v-model="task.done"
                                  :color="task.done && 'accent' || 'secondary'"
                                >
                                  <template v-slot:label>
                                    <div
                                      :class="task.done && 'grey--text text-decoration-line-through' || 'black--text'"
                                      class="ml-4"
                                      v-text="task.text"
                                    ></div>
                                  </template>
                                </v-checkbox>
                              </v-list-item-action>
                            </v-list-item>
                          </template>
                        </template>
                      </v-slide-y-transition>
                    </v-card>
                    <v-card v-else flat>
                      <img src="../assets/no_data.svg" alt="No data found" height="300">
                  </v-card>
                  </v-card>
                </template>

                <!-- Completed -->
                <template v-if="index == 2">
                  <v-card v-if="completedTasks" flat>
                    <v-slide-y-transition class="py-0" group tag="v-list">
                      <template v-for="(task, i) in tasks">
                        <template v-if="task.done">
                          <v-divider v-if="i !== 0" :key="`${i}-divider`"></v-divider>
                          <v-list-item :key="`${i}-${task.text}`">
                            <v-list-item-action >
                              <v-checkbox
                                v-model="task.done"
                                :color="task.done && 'accent' || 'secondary'"
                              >
                                <template v-slot:label>
                                  <div
                                    :class="task.done && 'grey--text text-decoration-line-through' || 'black--text'"
                                    class="ml-4"
                                    v-text="task.text"
                                  ></div>
                                </template>
                              </v-checkbox>
                            </v-list-item-action>
                            <v-spacer></v-spacer>
                            <v-scroll-x-transition>
                              <v-btn text color="accent"  @click="deleteItem(i)">
                                <v-icon color="accent">delete_outline</v-icon>
                              </v-btn>
                            </v-scroll-x-transition>
                          </v-list-item>
                        </template>
                      </template>
                    </v-slide-y-transition>
                    <v-btn
                      color="secondary"
                      class="ma-2 white--text float-right"
                      @click="deleteAll"
                      v-if="completedTasks"
                    >
                      <v-icon left>delete_outline</v-icon>delete all
                    </v-btn>
                  </v-card>
                  <v-card v-else flat>
                    <img src="../assets/no_data.svg" alt="No data found" height="300">
                  </v-card>
                </template>
              </v-tab-item>
            </v-tabs-items>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>

<script>
import { mdiClose } from "@mdi/js";
var moment = require("moment");

export default {
  name: "Todo",
  data() {
    return {
      moment: moment,
      tab: null,
      items: ["All", "Active", "Completed"],
      tasks: [
        {
          done: false,
          text: "Do coding challenge",
        },
        {
          done: false,
          text: "Design, Develop Deploy App",
        },
        {
          done: true,
          text: "Bug fix.",
        },
      ],
      task: null,
      icons: [mdiClose],
      rules: {
          required: value => !!value || 'Required.'
      }
    };
  },
  watch: {
    tasks: {
      handler() { this.saveTasks() },
      deep: true,
    },
  },
  mounted() {
    if (localStorage.getItem('tasks')) {
      try {
        this.tasks = JSON.parse(localStorage.getItem('tasks'));
      } catch(e) {
        localStorage.removeItem('tasks');
      }
    }
  },
  computed: {
    completedTasks() {
      return this.tasks.filter((task) => task.done).length;
    },
    progress() {
      return (this.completedTasks / this.tasks.length) * 100 ? (this.completedTasks / this.tasks.length) * 100 : 0;
    },
    remainingTasks() {
      return this.tasks.length - this.completedTasks;
    },
  },

  methods: {
    create() {
      if(!this.task){
        return;
      }
      this.tasks.push({
        done: false,
        text: this.task,
      });
      this.task = null;
      this.saveTasks();
      
    },
    clearMessage() {
      this.message = "";
    },
    deleteAll(){
      const all_delete = this.tasks.filter((task) => task.done);
      all_delete.forEach(f => this.tasks.splice(this.tasks.findIndex(e => e.text === f.text),1));
      this.saveTasks();
    },
    deleteItem(i){
      this.tasks.splice(i,1);
      this.saveTasks();
    },
    saveTasks(){
      const parsed = JSON.stringify(this.tasks);
      localStorage.setItem('tasks', parsed);
    }
  },
};
</script>

<style scoped>
.todo-title {
  font-style: normal;
  font-weight: bold;
  font-size: 36px;
  line-height: 42px;
  color: whitesmoke;
}
.card-view {
  display: block;
  width: 100%;
  background-color: rgb(254, 254, 255);
  box-shadow: rgba(0, 0, 0, 0.15) 0px 15px 150px;
  margin: auto;
  border-radius: 10px;
  overflow: hidden;
}
.card_title {
  font-size: 30px;
  color: rgb(102, 106, 251);
  letter-spacing: 0.8px;
}
.card-sub-title span {
  display: block;
  margin-top: 15px;
  font-size: 20px;
  color: rgb(168, 169, 202);
  letter-spacing: 0.4px;
  text-align: left;
}
</style>
