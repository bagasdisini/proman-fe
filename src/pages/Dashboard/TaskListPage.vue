<template>
  <div class="row">
    <div
      v-for="(tasks, status) in groupedTasksWithDefaults"
      :key="status"
      class="col-lg-6 col-xxxl-3"
    >
      <div class="card mb-25 border-0 rounded-0 bg-white kanban-title-card">
        <div class="card-body p-15 p-sm-20 letter-spacing">
          <div class="d-flex align-items-center justify-content-between">
            <h5 class="card-title fw-bold mb-0 fs-lg-18">
              {{ statusLabels[status] }}
            </h5>
          </div>
        </div>
      </div>

      <div v-if="tasks.length > 0">
        <div
          v-for="task in tasks"
          :key="task._id"
          class="card mb-25 border-0 rounded-0 bg-white kanban-card"
        >
          <div class="card-body p-15 p-sm-20 letter-spacing">
            <div
              class="mb-10 d-flex align-items-center justify-content-between"
            >
              <span class="d-block fs-md-15 fw-bold text-black">{{
                task.name
              }}</span>
            </div>
            <p class="text-paragraph lh-base fs-md-15">
              {{ task.description }}
            </p>
            <span
              :class="getDueDateClass(task.end_date)"
              class="d-block position-relative"
            >
              {{ formatDueDate(task.end_date) }}
            </span>
          </div>
        </div>
      </div>

      <div v-else class="p-3 text-center text-muted">
        No tasks in this category
      </div>

      <a
        v-if="status === 'active'"
        class="add-another-task-btn mb-25 letter-spacing d-block w-100 fs-md-15 fw-medium text-center text-decoration-none position-relative bg-white transition text-success"
        data-bs-target="#addTaskModal"
        data-bs-toggle="modal"
        href="#"
      >
        Add Another Task <i class="ph-bold ph-plus"></i>
      </a>
    </div>
  </div>
  <div id="addTaskModal" aria-hidden="true" class="modal fade" tabindex="-1">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header me-md-20 ms-md-20">
          <h1 class="modal-title fs-5">Add New Task</h1>
          <button
            aria-label="Close"
            class="btn-close"
            data-bs-dismiss="modal"
            type="button"
          ></button>
        </div>
        <div class="modal-body me-md-20 ms-md-20">
          <form>
            <div class="mb-mb-15 mb-md-20">
              <label class="form-label fw-medium" for="titleTask">Title</label>
              <input
                id="titleTask"
                class="form-control shadow-none text-black fs-md-15 fs-lg-16"
                type="text"
              />
            </div>
            <div class="mb-mb-15 mb-md-20">
              <label class="form-label fw-medium" for="descTask"
                >Description</label
              >
              <textarea
                id="descTask"
                class="form-control shadow-none fs-md-15 text-black"
                rows="3"
              ></textarea>
            </div>
            <div class="mb-mb-15 mb-md-20 row">
              <div class="col-md-6">
                <div class="form-group mb-15 mb-sm-20 mb-md-25">
                  <label
                    class="d-block text-black fw-semibold mb-10"
                    for="startDate"
                  >
                    Start Date
                  </label>
                  <input
                    id="startDate"
                    class="form-control shadow-none text-black fs-md-15"
                    type="date"
                  />
                </div>
              </div>
              <div class="col-md-6">
                <div class="form-group mb-15 mb-sm-20 mb-md-25">
                  <label
                    class="d-block text-black fw-semibold mb-10"
                    for="endDate"
                  >
                    End Date
                  </label>
                  <input
                    id="endDate"
                    class="form-control shadow-none text-black fs-md-15"
                    type="date"
                  />
                </div>
              </div>
            </div>
            <div class="mb-mb-15 mb-md-20">
              <label class="form-label fw-medium" for="descTask"
                >Contributor</label
              >
              <div class="selected-contributors">
                <span
                  v-for="(contributor, index) in selected"
                  :key="index"
                  class="selected-contributor"
                >
                  {{ contributor }}
                  <button
                    class="remove-button"
                    @click="removeContributor(index)"
                  >
                    &times;
                  </button>
                </span>
              </div>
              <input
                id="dataList"
                v-model="search"
                class="form-control fs-md-15 text-black shadow-none"
                list="datalistOptions"
                placeholder="Type to search..."
                @keyup.enter="addContributor"
              />
              <datalist id="datalistOptions">
                <option
                  v-for="(contributor, index) in availableOptions"
                  :key="index"
                  :value="contributor"
                ></option>
              </datalist>
            </div>
            <div class="mb-mb-15 mb-md-20">
              <label class="form-label fw-medium" for="descTask">Status</label>
              <select
                class="form-select shadow-none text-black fs-md-15"
                disabled
              >
                <option value="1">Progress</option>
                <option value="2">Testing</option>
                <option value="3">Done</option>
                <option value="4">Canceled</option>
              </select>
            </div>
          </form>
        </div>
        <div class="modal-footer me-md-20 ms-md-20">
          <button
            class="btn btn-secondary"
            data-bs-dismiss="modal"
            type="button"
          >
            Close
          </button>
          <button class="btn btn-primary" data-bs-dismiss="modal" type="button">
            Create
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, onMounted, ref } from "vue";
import { API, setAuthToken } from "@/api";

export default {
  name: "TaskList",
  setup() {
    const tasks = ref([]);
    const statusLabels = {
      active: "In Progress",
      testing: "In Testing",
      completed: "Completed",
      canceled: "Canceled",
    };

    const getMonthRange = () => {
      const now = new Date();
      const firstDay = new Date(now.getFullYear(), now.getMonth(), 1).getTime();
      const lastDay = new Date(
        now.getFullYear(),
        now.getMonth() + 1,
        0,
        23,
        59,
        59
      ).getTime();
      return { start: firstDay, end: lastDay };
    };

    const fetchTasks = async () => {
      try {
        const token = localStorage.getItem("jwt");
        if (token) {
          setAuthToken(token);

          const { start, end } = getMonthRange();
          const response = await API.get(`/me/tasks?start=${start}&end=${end}`);
          tasks.value = response.data;
        }
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    const groupedTasks = computed(() => {
      return tasks.value.reduce((acc, task) => {
        if (!acc[task.status]) {
          acc[task.status] = [];
        }
        acc[task.status].push(task);
        return acc;
      }, {});
    });

    const groupedTasksWithDefaults = computed(() => {
      const defaultStatuses = {
        active: [],
        testing: [],
        completed: [],
        canceled: [],
      };
      return { ...defaultStatuses, ...groupedTasks.value };
    });

    const formatDueDate = (dateString) => {
      const dueDate = new Date(dateString);
      const now = new Date();

      const diffTime = dueDate - now;
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

      const options = { day: "2-digit", month: "short", year: "numeric" };
      const formattedDate = dueDate.toLocaleDateString("en-GB", options);

      if (diffDays < 0) {
        return `${formattedDate} (Overdue ${diffDays}d)`;
      } else {
        return `${formattedDate} (${diffDays}d)`;
      }
    };

    const getDueDateClass = (dateString) => {
      const dueDate = new Date(dateString);
      const now = new Date();
      const diffDays = Math.ceil((dueDate - now) / (1000 * 60 * 60 * 24));

      if (diffDays < 0) return "text-danger";
      if (diffDays < 7) return "text-warning";
      return "text-success";
    };

    onMounted(fetchTasks);

    return {
      tasks,
      groupedTasks,
      statusLabels,
      formatDueDate,
      groupedTasksWithDefaults,
      getDueDateClass,
    };
  },

  data() {
    const search = ref("");
    const availableOptions = [
      "San Francisco",
      "New York",
      "Seattle",
      "Los Angeles",
      "Chicago",
    ];
    const selected = ["San Francisco"];

    return {
      search,
      selected,
      availableOptions,
    };
  },
  methods: {
    addContributor() {
      if (this.search) {
        this.selected.push(this.search);
        this.search = "";
      }
    },
    removeContributor(index) {
      this.selected.splice(index, 1);
    },
  },
};
</script>

<style scoped>
.selected-contributors {
  display: flex;
  flex-wrap: wrap;
  margin-top: 10px;
}

.selected-contributor {
  background-color: #f0f0f0;
  border-radius: 4px;
  padding: 5px 10px;
  margin-right: 5px;
  margin-bottom: 5px;
}

.remove-button {
  margin-left: 5px;
  border: none;
  background-color: transparent;
  color: #888;
  cursor: pointer;
}
</style>
