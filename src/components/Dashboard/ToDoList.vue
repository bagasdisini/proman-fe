<template>
  <div class="mb-25 border-0 rounded-0 bg-white to-do-list-box">
    <div
      :style="{ height: isLoaded ? '445px' : '445px' }"
      class="card-body p-15 p-sm-20 p-md-25 p-lg-30 letter-spacing align-items-center"
    >
      <div
        class="mb-15 mb-md-25 d-sm-flex align-items-center justify-content-between"
      >
        <h5 class="card-title fw-bold mb-0">To Do List</h5>
        <span
          class="card-link-btn text-decoration-none text-primary fw-medium position-relative d-inline-block mt-10 mt-sm-0"
          data-bs-target="#addTaskModal"
          data-bs-toggle="modal"
        >
          Add A New Task
        </span>
      </div>

      <loader-component v-if="isLoading" style="margin: 35% auto" />
      <ul
        v-if="isLoaded"
        class="to-do-list ps-0 list-unstyled mb-0 custom-card-todo"
      >
        <div
          v-if="sortedTasks.length === 0"
          class="text-center text-muted fw-bold text-dark-emphasis"
          style="font-size: medium; margin: auto"
        >
          There is no task that has been created yet.
        </div>
        <li
          v-for="task in sortedTasks"
          :key="task._id"
          class="to-do-list-item ps-8 pe-5 d-flex align-items-center justify-content-between"
        >
          <div class="form-check mb-0 fs-md-15 fs-lg-16 text-black fw-medium">
            <input
              :id="'task' + task._id"
              :checked="task.status === 'completed'"
              class="form-check-input shadow-none"
              type="checkbox"
            />
            <label :for="'task' + task._id" class="form-check-label">
              {{ task.name }}
            </label>
          </div>
          <div class="dropdown">
            <button
              aria-expanded="false"
              class="dropdown-toggle position-relative top-2 lh-1 bg-transparent border-0 shadow-none p-0 transition"
              data-bs-toggle="dropdown"
              type="button"
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
                data-bs-target="#editTaskModal"
                data-bs-toggle="modal"
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
                data-bs-target="#deleteTaskModal"
                data-bs-toggle="modal"
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
            <div
              v-if="errorMessage"
              class="alert alert-danger alert-dismissible d-flex align-items-center fs-md-15 fs-lg-16"
              role="alert"
            >
              <i
                class="flaticon-warning lh-1 fs-20 position-relative top-1 me-8"
              ></i>
              <span>{{ errorMessage }}</span>
              <button
                aria-label="Close"
                class="btn-close shadow-none"
                type="button"
                @click="errorMessage = ''"
              ></button>
            </div>
            <div class="mb-mb-15 mb-md-20">
              <label class="form-label fw-medium" for="titleTask">Title</label>
              <input
                id="titleTask"
                v-model="taskForm.name"
                :class="{ 'is-invalid': errors.name }"
                class="form-control shadow-none text-black fs-md-15 fs-lg-16"
                type="text"
              />
              <div v-if="errors.name" class="invalid-feedback">
                {{ errors.name }}
              </div>
            </div>
            <div class="mb-mb-15 mb-md-20">
              <label class="form-label fw-medium" for="descTask"
                >Description</label
              >
              <textarea
                id="descTask"
                v-model="taskForm.description"
                :class="{ 'is-invalid': errors.description }"
                class="form-control shadow-none fs-md-15 text-black"
                rows="3"
              ></textarea>
              <div v-if="errors.description" class="invalid-feedback">
                {{ errors.description }}
              </div>
            </div>
            <div class="mb-mb-15 mb-md-20">
              <label class="form-label fw-medium">Project</label>
              <div class="input-group">
                <input
                  v-model="projectSearch"
                  :class="{ 'is-invalid': errors.project_id }"
                  class="form-control fs-md-15 text-black shadow-none"
                  placeholder="Type to search projects..."
                  @focus="showProjectDropdown = true"
                  @input="searchProjects"
                />
                <div v-if="errors.project_id" class="invalid-feedback">
                  {{ errors.project_id }}
                </div>
              </div>
              <div
                v-if="projectResults.length > 0 && showProjectDropdown"
                class="dropdown-menu show w-100"
              >
                <div
                  v-for="project in projectResults"
                  :key="project._id"
                  class="dropdown-item"
                  @click="selectProject(project)"
                >
                  {{ project.name }}
                </div>
              </div>
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
                    v-model="taskForm.start_date"
                    :class="{ 'is-invalid': errors.start_date }"
                    class="form-control shadow-none text-black fs-md-15"
                    type="date"
                  />
                  <div v-if="errors.start_date" class="invalid-feedback">
                    {{ errors.start_date }}
                  </div>
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
                    v-model="taskForm.end_date"
                    :class="{ 'is-invalid': errors.end_date }"
                    class="form-control shadow-none text-black fs-md-15"
                    type="date"
                  />
                  <div v-if="errors.end_date" class="invalid-feedback">
                    {{ errors.end_date }}
                  </div>
                </div>
              </div>
            </div>
            <div class="mb-mb-15 mb-md-20">
              <label class="form-label fw-medium">Contributors</label>
              <div class="selected-contributors mb-2">
                <span
                  v-for="(contributor, index) in selectedContributors"
                  :key="contributor._id"
                  class="selected-contributor"
                >
                  {{ contributor.name }}
                  <button
                    class="remove-button"
                    @click.prevent="removeContributor(index)"
                  >
                    &times;
                  </button>
                </span>
              </div>
              <div class="input-group">
                <input
                  v-model="search"
                  :class="{ 'is-invalid': errors.contributor }"
                  class="form-control fs-md-15 text-black shadow-none"
                  placeholder="Type to search users..."
                  @input="searchUsers"
                />
                <div v-if="errors.contributor" class="invalid-feedback">
                  {{ errors.contributor }}
                </div>
              </div>
              <div
                v-if="searchResults.length > 0 && search !== ''"
                class="dropdown-menu show w-100"
              >
                <div
                  v-for="user in searchResults"
                  :key="user._id"
                  class="dropdown-item"
                  @click="addContributor(user)"
                >
                  {{ user.name }} ({{ user.email }})
                </div>
              </div>
            </div>
            <div class="mb-mb-15 mb-md-20">
              <label class="form-label fw-medium" for="taskType">Status</label>
              <select
                id="taskType"
                v-model="taskForm.type"
                :class="{ 'is-invalid': errors.type }"
                class="form-select shadow-none text-black fs-md-15"
                disabled
              >
                <option value="progress">Progress</option>
                <option value="testing">Testing</option>
                <option value="done">Done</option>
                <option value="canceled">Canceled</option>
              </select>
              <div v-if="errors.type" class="invalid-feedback">
                {{ errors.type }}
              </div>
            </div>
          </form>
        </div>
        <div class="modal-footer me-md-20 ms-md-20">
          <button
            class="btn btn-secondary"
            data-bs-dismiss="modal"
            type="button"
            @click="resetForm"
          >
            Close
          </button>
          <button class="btn btn-primary" type="button" @click="submitTask">
            Create
          </button>
        </div>
      </div>
    </div>
  </div>
  <div id="editTaskModal" aria-hidden="true" class="modal fade" tabindex="-1">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header me-md-20 ms-md-20">
          <h1 class="modal-title fs-5">Edit Task</h1>
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
                    @click.prevent="removeContributor(index)"
                  >
                    &times;
                  </button>
                </span>
              </div>
              <form @submit.prevent="addContributor">
                <input
                  id="dataList"
                  v-model="search"
                  class="form-control fs-md-15 text-black shadow-none"
                  list="datalistOptions"
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
              <label class="form-label fw-medium" for="descTask">Status</label>
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
            class="btn btn-secondary"
            data-bs-dismiss="modal"
            type="button"
          >
            Close
          </button>
          <button class="btn btn-warning" data-bs-dismiss="modal" type="button">
            Edit
          </button>
        </div>
      </div>
    </div>
  </div>
  <div id="deleteTaskModal" aria-hidden="true" class="modal fade" tabindex="-1">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header me-md-20 ms-md-20">
          <h1 class="modal-title fs-5">Delete Task</h1>
          <button
            aria-label="Close"
            class="btn-close"
            data-bs-dismiss="modal"
            type="button"
          ></button>
        </div>
        <div class="modal-body me-md-20 ms-md-20">
          <span style="font-size: large"
            >Are you sure you want to delete this task?</span
          >
        </div>
        <div class="modal-footer me-md-20 ms-md-20">
          <button
            class="btn btn-secondary"
            data-bs-dismiss="modal"
            type="button"
          >
            Close
          </button>
          <button class="btn btn-danger" data-bs-dismiss="modal" type="button">
            Delete
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, reactive, ref } from "vue";
import { API, setAuthToken } from "@/api";
import LoaderComponent from "@/components/Layouts/Loader.vue";
import { Modal } from "bootstrap";

interface User {
  _id: string;
  name: string;
  email: string;
}

interface Project {
  _id: string;
  name: string;
}

interface TaskForm {
  name: string;
  description: string;
  start_date: string;
  end_date: string;
  project_id: string;
  type: string;
}

export default defineComponent({
  name: "ToDoList",
  components: {
    LoaderComponent,
  },
  data() {
    return {
      errors: {} as Record<string, string>,
      errorMessage: "",
    };
  },
  setup() {
    const isLoading = ref(true);
    const isLoaded = ref(false);

    const tasks = ref<any[]>([]);

    const search = ref("");
    const searchResults = ref<User[]>([]);
    const selectedContributors = ref<User[]>([]);
    const loading = ref(false);

    const projectSearch = ref("");
    const projectResults = ref<Project[]>([]);
    const selectedProject = ref<Project | null>(null);
    const showProjectDropdown = ref(false);

    const taskForm = reactive<TaskForm>({
      name: "",
      description: "",
      start_date: "",
      end_date: "",
      project_id: "",
      type: "progress",
    });

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

    onMounted(() => {
      fetchData();

      document.addEventListener("click", (e) => {
        const target = e.target as HTMLElement;
        if (!target.closest(".input-group")) {
          showProjectDropdown.value = false;
        }
      });
    });

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
      tasks,
      search,
      searchResults,
      selectedContributors,
      projectSearch,
      projectResults,
      selectedProject,
      showProjectDropdown,
      loading,
      taskForm,
    };
  },

  methods: {
    async searchUsers() {
      if (this.search.trim().length < 2) {
        this.searchResults = [];
        return;
      }

      try {
        this.loading = true;

        const token = localStorage.getItem("jwt");
        setAuthToken(token);

        const response = await API.get(`/users?q=${this.search}`);

        this.searchResults = response.data.result || [];
      } catch (error) {
        console.error("Error searching users:", error);
        this.searchResults = [];
      } finally {
        this.loading = false;
      }
    },

    async searchProjects() {
      if (this.projectSearch.trim().length < 2) {
        this.projectResults = [];
        return;
      }

      try {
        this.loading = true;
        this.showProjectDropdown = true;

        const token = localStorage.getItem("jwt");
        setAuthToken(token);

        const response = await API.get(`/projects?q=${this.projectSearch}`);

        this.projectResults = response.data.result || [];
      } catch (error) {
        console.error("Error searching projects:", error);
        this.projectResults = [];
      } finally {
        this.loading = false;
      }
    },

    selectProject(project: Project) {
      this.selectedProject = project;
      this.taskForm.project_id = project._id;
      this.projectSearch = project.name;
      this.showProjectDropdown = false;
    },

    addContributor(user: User) {
      const exists = this.selectedContributors.some((c) => c._id === user._id);
      if (!exists) {
        this.selectedContributors.push(user);
      }
      this.search = "";
      this.searchResults = [];
    },

    removeContributor(index: number) {
      this.selectedContributors.splice(index, 1);
    },

    async submitTask() {
      try {
        this.loading = true;
        this.errors = {};
        this.errorMessage = "";

        const startDate = new Date(this.taskForm.start_date).getTime();
        const endDate = new Date(this.taskForm.end_date).getTime();

        const contributorIds = this.selectedContributors
          .map((c) => c._id)
          .join(",");

        const payload = {
          name: this.taskForm.name,
          description: this.taskForm.description,
          start_date: startDate,
          end_date: endDate,
          type: this.taskForm.type,
          contributor: contributorIds,
          project_id: this.taskForm.project_id,
        };

        const token = localStorage.getItem("jwt");
        setAuthToken(token);

        const response = await API.post("/task", payload);

        const modalElement = document.getElementById("addTaskModal");
        if (modalElement) {
          const modalInstance = Modal.getInstance(modalElement as Element);
          if (modalInstance) {
            modalInstance.hide();
          }
        }

        this.fetchData();
        this.resetForm();
      } catch (error) {
        if (error instanceof Error && "response" in error) {
          const response = (
            error as { response: { status: number; data: any } }
          ).response;

          if (response.status !== 200) {
            const data = response.data;

            if (typeof data.message === "string") {
              this.errorMessage = data.message;
            }

            if (Array.isArray(data.errors)) {
              data.errors.forEach((err: { field: string; message: string }) => {
                this.errors[err.field] = err.message;
              });
            }
          }
        } else {
          console.error("Unexpected error:", error);
        }
      } finally {
        this.loading = false;
      }
    },

    resetForm() {
      this.taskForm.name = "";
      this.taskForm.description = "";
      this.taskForm.start_date = "";
      this.taskForm.end_date = "";
      this.taskForm.project_id = "";
      this.taskForm.type = "progress";
      this.selectedContributors = [];
      this.selectedProject = null;
      this.projectSearch = "";
      this.search = "";
      this.searchResults = [];
      this.projectResults = [];
      this.errors = {};
      this.errorMessage = "";
    },

    async fetchData() {
      try {
        const token = localStorage.getItem("jwt");
        if (token) {
          setAuthToken(token);
          const taskResponse = await API.get("/me/tasks");

          if (taskResponse.data && Array.isArray(taskResponse.data)) {
            this.tasks = taskResponse.data.filter(
              (task) => task.status === "active"
            );
          }

          this.sortedTasks = this.tasks.sort((a, b) => {
            const startDateA = new Date(a.start_date).getTime();
            const startDateB = new Date(b.start_date).getTime();
            return startDateB - startDateA;
          });
        }
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    },
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
