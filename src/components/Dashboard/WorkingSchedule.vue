<template>
  <div class="mb-25 border-0 rounded-0 bg-white working-schedule-box">
    <div
      class="card-body p-15 p-sm-20 p-sm-25 p-lg-30 letter-spacing"
      :style="{ height: isLoaded ? '915px' : '915px' }"
    >
      <div class="mb-15 d-sm-flex align-items-center justify-content-between">
        <h5 class="card-title fw-bold mb-0">Working Schedule</h5>
      </div>
      <ul
        class="schedule-date-list ps-0 mb-0 list-unstyled d-flex flex-wrap text-center"
      >
        <li
          class="col text-black fw-medium"
          v-for="date in dates"
          :key="date.toString()"
          :class="{ active: isToday(date) }"
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
          data-bs-toggle="modal"
          data-bs-target="#addScheduleModal"
          class="card-link-btn text-decoration-none text-primary fw-medium position-relative"
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
          v-else
          v-for="schedule in schedules"
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
    class="modal fade"
    id="addScheduleModal"
    tabindex="-1"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header me-md-20 ms-md-20">
          <h1 class="modal-title fs-5">Add Schedule</h1>
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
              <label for="descTask" class="form-label fw-medium">Type</label>
              <select class="form-select shadow-none text-black fs-md-15">
                <option value="1">Meeting</option>
                <option value="2">Discussion</option>
                <option value="3">Reviews</option>
                <option value="4">Sharing Session</option>
                <option value="5">Others</option>
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
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import LoaderComponent from "@/components/Layouts/Loader.vue";
import { API, setAuthToken } from "@/api";

export default defineComponent({
  name: "WorkingSchedule",
  components: {
    LoaderComponent,
  },
  setup() {
    const isLoading = ref(true);
    const isLoaded = ref(false);
    const search = ref("");
    const availableOptions = ["Muhammad", "Bagas", "Sudibyo", "3122510602"];
    const selected = ["Bagas"];
    let schedules = ref([]);
    let scheduleCounts = ref({});

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
      selected,
      availableOptions,
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
