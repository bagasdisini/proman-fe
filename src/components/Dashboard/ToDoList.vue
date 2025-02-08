<template>
  <div class="mb-25 border-0 rounded-0 bg-white to-do-list-box">
    <div
      class="card-body p-15 p-sm-20 p-md-25 p-lg-30 letter-spacing align-items-center"
      :style="{ height: isLoaded ? 'auto' : '446px' }"
    >
      <div
        class="mb-15 mb-md-25 d-sm-flex align-items-center justify-content-between"
      >
        <h5 class="card-title fw-bold mb-0">To Do List</h5>
        <span
          data-bs-toggle="modal"
          data-bs-target="#addTaskModal"
          class="card-link-btn text-decoration-none text-primary fw-medium position-relative d-inline-block mt-10 mt-sm-0"
        >
          Add A New Task
        </span>
      </div>

      <loader-component v-if="isLoading" style="margin: 35% auto" />
      <ul
        class="to-do-list ps-0 list-unstyled mb-0 custom-card-todo"
        v-if="isLoaded"
      >
        <div
          v-if="sortedTasks.length === 0"
          class="text-center text-muted fw-bold text-dark-emphasis"
          style="font-size: medium; margin: auto"
        >
          Congratulations! You've unlocked the rare 'Do Nothing' achievement. 🎉
        </div>
        <li
          class="to-do-list-item ps-8 pe-5 d-flex align-items-center justify-content-between"
          v-for="task in sortedTasks"
          :key="task._id"
        >
          <div class="form-check mb-0 fs-md-15 fs-lg-16 text-black fw-medium">
            <input
              class="form-check-input shadow-none"
              type="checkbox"
              :id="'task' + task._id"
              :checked="task.status === 'completed'"
            />
            <label class="form-check-label" :for="'task' + task._id">
              {{ task.name }}
            </label>
          </div>
          <div class="dropdown">
            <button
              class="dropdown-toggle position-relative top-2 lh-1 bg-transparent border-0 shadow-none p-0 transition"
              type="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <i class="flaticon-dots"></i>
            </button>
            <ul class="dropdown-menu">
              <li>
                <a
                  class="dropdown-item d-flex align-items-center"
                  href="javascript:void(0);"
                >
                  <i class="flaticon-view lh-1 me-8"></i>
                  View
                </a>
              </li>
              <li
                data-bs-toggle="modal"
                data-bs-target="#editTaskModal"
                type="button"
              >
                <a
                  class="dropdown-item d-flex align-items-center"
                  href="javascript:void(0);"
                >
                  <i class="flaticon-pen lh-1 me-8"></i>
                  Edit
                </a>
              </li>
              <li
                data-bs-toggle="modal"
                data-bs-target="#deleteTaskModal"
                type="button"
              >
                <a
                  class="dropdown-item d-flex align-items-center"
                  href="javascript:void(0);"
                >
                  <i class="flaticon-delete lh-1 me-8"></i>
                  Delete
                </a>
              </li>
            </ul>
          </div>
        </li>
      </ul>
    </div>
  </div>
  <div class="modal fade" id="addTaskModal" tabindex="-1" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header me-md-20 ms-md-20">
          <h1 class="modal-title fs-5">Add New Task</h1>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body me-md-20 ms-md-20">
          <form>
            <div class="mb-mb-15 mb-md-20">
              <label for="titleTask" class="form-label fw-medium">Title</label>
              <input
                type="text"
                class="form-control shadow-none text-black fs-md-15 fs-lg-16"
                id="titleTask"
              />
            </div>
            <div class="mb-mb-15 mb-md-20">
              <label for="descTask" class="form-label fw-medium"
                >Description</label
              >
              <textarea
                class="form-control shadow-none fs-md-15 text-black"
                id="descTask"
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
                    type="date"
                    class="form-control shadow-none text-black fs-md-15"
                    id="startDate"
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
                    type="date"
                    class="form-control shadow-none text-black fs-md-15"
                    id="endDate"
                  />
                </div>
              </div>
            </div>
            <div class="mb-mb-15 mb-md-20">
              <label for="descTask" class="form-label fw-medium"
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
                    @click.prevent="removeContributor(index)"
                  >
                    &times;
                  </button>
                </span>
              </div>
              <form @submit.prevent="addContributor">
                <input
                  v-model="search"
                  class="form-control fs-md-15 text-black shadow-none"
                  list="datalistOptions"
                  id="dataList"
                  placeholder="Type to search..."
                />
              </form>
              <datalist id="datalistOptions">
                <option
                  v-for="(contributor, index) in availableOptions"
                  :key="index"
                  :value="contributor"
                ></option>
              </datalist>
            </div>
            <div class="mb-mb-15 mb-md-20">
              <label for="descTask" class="form-label fw-medium">Status</label>
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
            type="button"
            class="btn btn-secondary"
            data-bs-dismiss="modal"
          >
            Close
          </button>
          <button type="button" class="btn btn-primary" data-bs-dismiss="modal">
            Create
          </button>
        </div>
      </div>
    </div>
  </div>
  <div class="modal fade" id="editTaskModal" tabindex="-1" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header me-md-20 ms-md-20">
          <h1 class="modal-title fs-5">Edit Task</h1>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body me-md-20 ms-md-20">
          <form>
            <div class="mb-mb-15 mb-md-20">
              <label for="titleTask" class="form-label fw-medium">Title</label>
              <input
                type="text"
                class="form-control shadow-none text-black fs-md-15 fs-lg-16"
                id="titleTask"
              />
            </div>
            <div class="mb-mb-15 mb-md-20">
              <label for="descTask" class="form-label fw-medium"
                >Description</label
              >
              <textarea
                class="form-control shadow-none fs-md-15 text-black"
                id="descTask"
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
                    type="date"
                    class="form-control shadow-none text-black fs-md-15"
                    id="startDate"
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
                    type="date"
                    class="form-control shadow-none text-black fs-md-15"
                    id="endDate"
                  />
                </div>
              </div>
            </div>
            <div class="mb-mb-15 mb-md-20">
              <label for="descTask" class="form-label fw-medium"
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
                    @click.prevent="removeContributor(index)"
                  >
                    &times;
                  </button>
                </span>
              </div>
              <form @submit.prevent="addContributor">
                <input
                  v-model="search"
                  class="form-control fs-md-15 text-black shadow-none"
                  list="datalistOptions"
                  id="dataList"
                  placeholder="Type to search..."
                />
              </form>
              <datalist id="datalistOptions">
                <option
                  v-for="(contributor, index) in availableOptions"
                  :key="index"
                  :value="contributor"
                ></option>
              </datalist>
            </div>
            <div class="mb-mb-15 mb-md-20">
              <label for="descTask" class="form-label fw-medium">Status</label>
              <select class="form-select shadow-none text-black fs-md-15">
                <option value="1">Progress</option>
                <option value="2">Done</option>
                <option value="3">Canceled</option>
              </select>
            </div>
          </form>
        </div>
        <div class="modal-footer me-md-20 ms-md-20">
          <button
            type="button"
            class="btn btn-secondary"
            data-bs-dismiss="modal"
          >
            Close
          </button>
          <button type="button" class="btn btn-warning" data-bs-dismiss="modal">
            Edit
          </button>
        </div>
      </div>
    </div>
  </div>
  <div class="modal fade" id="deleteTaskModal" tabindex="-1" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header me-md-20 ms-md-20">
          <h1 class="modal-title fs-5">Delete Task</h1>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body me-md-20 ms-md-20">
          <span style="font-size: large"
            >Are you sure you want to delete this task?</span
          >
        </div>
        <div class="modal-footer me-md-20 ms-md-20">
          <button
            type="button"
            class="btn btn-secondary"
            data-bs-dismiss="modal"
          >
            Close
          </button>
          <button type="button" class="btn btn-danger" data-bs-dismiss="modal">
            Delete
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, ref } from "vue";
import { API, setAuthToken } from "@/api";
import LoaderComponent from "@/components/Layouts/Loader.vue";

export default defineComponent({
  name: "ToDoList",
  components: {
    LoaderComponent,
  },
  setup() {
    const isLoading = ref(true);
    const isLoaded = ref(false);
    const tasks = ref<any[]>([]);

    const fetchData = async () => {
      try {
        const token = localStorage.getItem("jwt");
        if (token) {
          setAuthToken(token);
          const taskResponse = await API.get("/me/tasks");

          if (taskResponse.data && Array.isArray(taskResponse.data)) {
            tasks.value = taskResponse.data.filter(
              (task) => task.status === "active"
            );
          }
        }
      } catch (error) {
        console.error("Error fetching tasks:", error);
      } finally {
        isLoading.value = false;
        isLoaded.value = true;
      }
    };

    onMounted(fetchData);

    const sortedTasks = computed(() => {
      return [...tasks.value].sort((a, b) => {
        return (
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        );
      });
    });

    return {
      isLoading,
      isLoaded,
      sortedTasks,
    };
  },
});
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
