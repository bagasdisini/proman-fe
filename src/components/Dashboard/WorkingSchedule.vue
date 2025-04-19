<template>
  <div class="mb-25 border-0 rounded-0 bg-white working-schedule-box">
    <div
      :style="{ height: isLoaded ? '915px' : '915px' }"
      class="card-body p-15 p-sm-20 p-sm-25 p-lg-30 letter-spacing"
    >
      <div class="mb-15 d-sm-flex align-items-center justify-content-between">
        <h5 class="card-title fw-bold mb-0">Working Schedule</h5>
      </div>
      <ul
        class="schedule-date-list ps-0 mb-0 list-unstyled d-flex flex-wrap text-center"
      >
        <li
          v-for="date in dates"
          :key="date.toString()"
          :class="{ active: isToday(date) }"
          class="col text-black fw-medium"
        >
          <span class="d-block fw-bold text-dark-emphasis">{{
            date.toLocaleDateString("default", { weekday: "short" })
          }}</span>
          {{ date.getDate() }}
        </li>
      </ul>
      <div
        class="mt-15 mt-md-20 mb-12 d-flex align-items-center justify-content-between"
      >
        <h6 class="card-title fw-bold mb-0">Todays Schedule</h6>
        <span
          class="card-link-btn text-decoration-none text-primary fw-medium position-relative"
          data-bs-target="#addScheduleModal"
          data-bs-toggle="modal"
        >
          Add A Schedule
        </span>
      </div>
      <div
        v-if="schedules.length === 0"
        class="text-center text-muted fw-bold text-dark-emphasis"
        style="font-size: medium; margin: 60% auto"
      >
        There is no schedule for today.
      </div>
      <loader-component v-if="isLoading" style="margin: 60% auto" />
      <div
        v-if="isLoaded"
        class="schedule-list mt-15 mt-md-20 custom-card-work-schedule"
      >
        <div v-if="schedules.length === 0"></div>
        <div
          v-for="schedule in schedules"
          v-else
          :key="schedule.id"
          class="list-item pt-15 bg-f2f1f9 pb-15 pt-md-20 pb-md-20 ps-20 pe-15 position-relative d-sm-flex justify-content-between align-items-center"
        >
          <div class="content">
            <div class="d-flex align-items-center mb-5">
              <h6 class="fw-medium mb-0">
                {{ schedule.start_time }} - {{ schedule.end_time }}
              </h6>
            </div>
            <span class="d-block text-black fw-semibold fs-md-15 mb-1">{{
              schedule.name
            }}</span>
            <span class="d-block text-muted fs-12 fw-medium">{{
              schedule.contributor.join(", ")
            }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div
    id="addScheduleModal"
    aria-hidden="true"
    class="modal fade"
    tabindex="-1"
  >
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header me-md-20 ms-md-20">
          <h1 class="modal-title fs-5">Add Schedule</h1>
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
            <div class="mb-15 mb-md-20">
              <label class="form-label fw-medium" for="titleTask">Title</label>
              <input
                id="titleTask"
                v-model="scheduleForm.name"
                :class="{ 'is-invalid': errors.name }"
                class="form-control shadow-none text-black fs-md-15 fs-lg-16"
                type="text"
              />
              <div v-if="errors.name" class="invalid-feedback">
                {{ errors.name }}
              </div>
            </div>
            <div class="mb-15 mb-md-20">
              <label class="form-label fw-medium" for="descTask"
                >Description</label
              >
              <textarea
                id="descTask"
                v-model="scheduleForm.description"
                :class="{ 'is-invalid': errors.description }"
                class="form-control shadow-none fs-md-15 text-black"
                rows="3"
              ></textarea>
              <div v-if="errors.description" class="invalid-feedback">
                {{ errors.description }}
              </div>
            </div>
            <div class="mb-15 mb-md-20 row">
              <div class="col-md-6">
                <div class="form-group mb-15 mb-sm-20 mb-md-25">
                  <label
                    class="d-block text-black fw-semibold mb-10"
                    for="startDate"
                    >Start Date</label
                  >
                  <input
                    id="startDate"
                    v-model="scheduleForm.start_date"
                    :class="{ 'is-invalid': errors.start_date }"
                    class="form-control shadow-none text-black fs-md-15"
                    type="date"
                  />
                  <div v-if="errors.start_date" class="invalid-feedback">
                    {{ errors.start_date }}
                  </div>
                </div>
                <div class="form-group mb-15 mb-sm-20 mb-md-25">
                  <label
                    class="d-block text-black fw-semibold mb-10"
                    for="startTime"
                    >Start Time</label
                  >
                  <input
                    id="startTime"
                    v-model="scheduleForm.start_time"
                    :class="{ 'is-invalid': errors.start_time }"
                    class="form-control shadow-none text-black fs-md-15"
                    type="time"
                  />
                  <div v-if="errors.start_time" class="invalid-feedback">
                    {{ errors.start_time }}
                  </div>
                </div>
              </div>
              <div class="col-md-6">
                <div class="form-group mb-15 mb-sm-20 mb-md-25">
                  <label
                    class="d-block text-black fw-semibold mb-10"
                    for="endDate"
                    >End Date</label
                  >
                  <input
                    id="endDate"
                    v-model="scheduleForm.end_date"
                    :class="{ 'is-invalid': errors.end_date }"
                    class="form-control shadow-none text-black fs-md-15"
                    type="date"
                  />
                  <div v-if="errors.end_date" class="invalid-feedback">
                    {{ errors.end_date }}
                  </div>
                </div>
                <div class="form-group mb-15 mb-sm-20 mb-md-25">
                  <label
                    class="d-block text-black fw-semibold mb-10"
                    for="endTime"
                    >End Time</label
                  >
                  <input
                    id="endTime"
                    v-model="scheduleForm.end_time"
                    :class="{ 'is-invalid': errors.end_time }"
                    class="form-control shadow-none text-black fs-md-15"
                    type="time"
                  />
                  <div v-if="errors.end_time" class="invalid-feedback">
                    {{ errors.end_time }}
                  </div>
                </div>
              </div>
            </div>
            <div class="mb-15 mb-md-20">
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
            <div class="mb-15 mb-md-20">
              <label class="form-label fw-medium" for="scheduleType"
                >Type</label
              >
              <select
                id="scheduleType"
                v-model="scheduleForm.type"
                :class="{ 'is-invalid': errors.type }"
                class="form-select shadow-none text-black fs-md-15"
              >
                <option value="meeting">Meeting</option>
                <option value="discussion">Discussion</option>
                <option value="review">Review</option>
                <option value="presentation">Presentation</option>
                <option value="etc">Etc</option>
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
          <button class="btn btn-primary" type="button" @click="submitSchedule">
            Create
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from "vue";
import LoaderComponent from "@/components/Layouts/Loader.vue";
import { API, setAuthToken } from "@/api";

interface User {
  _id: string;
  name: string;
  email: string;
  avatar?: string;
  position?: string;
}

interface ScheduleForm {
  name: string;
  description: string;
  start_date: string;
  start_time: string;
  end_date: string;
  end_time: string;
  type: string;
}

export default defineComponent({
  name: "WorkingSchedule",
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

    let schedules = ref([]);
    let scheduleCounts = ref({});

    const search = ref("");
    const searchResults = ref<User[]>([]);
    const selectedContributors = ref<User[]>([]);
    const loading = ref(false);

    const scheduleForm = reactive<ScheduleForm>({
      name: "",
      description: "",
      start_date: "",
      start_time: "",
      end_date: "",
      end_time: "",
      type: "meeting",
    });

    const fetchSchedules = async () => {
      const startTime = performance.now();

      try {
        const token = localStorage.getItem("jwt");
        if (token) {
          setAuthToken(token);

          const start = new Date();
          start.setHours(0, 0, 0, 0);
          const end = new Date();
          end.setHours(23, 59, 59, 999);

          const response = await API.get(
            `/me/schedules?start=${start.getTime()}&end=${end.getTime()}`
          );

          if (response.data) {
            let fetchedSchedules = response.data
              .map((schedule) => ({
                id: schedule.id,
                name: schedule.name,
                contributor: schedule.contributor,
                start_time: schedule.start_time,
                end_time: schedule.end_time,
                type: schedule.type,
              }))
              .sort((a, b) => a.start_time.localeCompare(b.start_time));

            const counts = fetchedSchedules.reduce((acc, schedule) => {
              acc[schedule.type] = (acc[schedule.type] || 0) + 1;
              return acc;
            }, {});

            schedules.value = fetchedSchedules;
            scheduleCounts.value = counts;
          }
        }
      } catch (error) {
        console.error("Error fetching schedules:", error);
      }

      const endTime = performance.now();
      const requestDuration = endTime - startTime;

      const minDelay = 100;
      const remainingTime = Math.max(minDelay - requestDuration, 0);

      setTimeout(() => {
        isLoading.value = false;
        isLoaded.value = true;
      }, remainingTime);
    };

    const getDates = () => {
      const now = new Date();
      let dates: Date[] = [];
      for (let i = -3; i <= 3; i++) {
        const newDate = new Date(now);
        newDate.setDate(now.getDate() + i);
        dates.push(newDate);
      }
      return dates;
    };

    fetchSchedules();
    return {
      isLoading,
      isLoaded,
      search,
      searchResults,
      selectedContributors,
      loading,
      scheduleForm,
      schedules,
      scheduleCounts,
      dates: getDates(),
    };
  },
  methods: {
    isToday(date) {
      const today = new Date();
      return (
        date.getDate() === today.getDate() &&
        date.getMonth() === today.getMonth() &&
        date.getFullYear() === today.getFullYear()
      );
    },

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

    async submitSchedule() {
      try {
        this.loading = true;
        this.errors = {};
        this.errorMessage = "";

        const startDate = new Date(this.scheduleForm.start_date).getTime();
        const endDate = new Date(this.scheduleForm.end_date).getTime();

        const contributorIds = this.selectedContributors
          .map((c) => c._id)
          .join(",");

        const payload = {
          name: this.scheduleForm.name,
          description: this.scheduleForm.description,
          start_date: startDate,
          start_time: this.scheduleForm.start_time,
          end_date: endDate,
          end_time: this.scheduleForm.end_time,
          type: this.scheduleForm.type,
          contributor: contributorIds,
        };

        const token = localStorage.getItem("jwt");
        setAuthToken(token);

        const response = await API.post("/schedule", payload);

        this.resetForm();
        this.$emit("close");
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
      this.scheduleForm.name = "";
      this.scheduleForm.description = "";
      this.scheduleForm.start_date = "";
      this.scheduleForm.start_time = "";
      this.scheduleForm.end_date = "";
      this.scheduleForm.end_time = "";
      this.scheduleForm.type = "meeting";
      this.selectedContributors = [];
      this.search = "";
      this.searchResults = [];
      this.errors = {};
      this.errorMessage = "";
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

.dropdown-menu {
  max-height: 200px;
  overflow-y: auto;
}

.dropdown-item {
  cursor: pointer;
}

.dropdown-item:hover {
  background-color: #f8f9fa;
}
</style>
