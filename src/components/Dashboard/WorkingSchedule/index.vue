<template>
  <div class="mb-25 border-0 rounded-0 bg-white working-schedule-box">
    <div
      class="card-body p-15 p-sm-20 p-sm-25 p-lg-30 letter-spacing"
      :style="{ height: isLoaded ? 'auto' : '915px' }"
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
      <loader-component v-if="isLoading" style="margin: 60% auto" />
      <ul v-if="isLoaded" class="info-list ps-0 mb-0 list-unstyled">
        <li class="d-inline-block">
          <div class="d-flex align-items-center">
            <span
              class="d-block w-10 h-10 bg-primary rounded-circle me-8"
            ></span>
            <span class="fw-bold">
              2
              <span class="text-muted fw-semibold">Meetings</span>
            </span>
          </div>
        </li>
        <li class="d-inline-block">
          <div class="d-flex align-items-center">
            <span
              class="d-block w-10 h-10 bg-success rounded-circle me-8"
            ></span>
            <span class="fw-bold">
              2
              <span class="text-muted fw-semibold">Discussion</span>
            </span>
          </div>
        </li>
        <li class="d-inline-block">
          <div class="d-flex align-items-center">
            <span class="d-block w-10 h-10 bg-info rounded-circle me-8"></span>
            <span class="fw-bold">
              2
              <span class="text-muted fw-semibold">Reviews</span>
            </span>
          </div>
        </li>
      </ul>
      <div
        v-if="isLoaded"
        class="schedule-list mt-15 mt-md-20 custom-card-work-schedule"
      >
        <div
          v-for="schedule in schedules"
          :key="schedule.id"
          :class="[
            'list-item pt-15 pb-15 pt-md-20 pb-md-20 ps-20 pe-15 position-relative d-sm-flex justify-content-between align-items-center',
            schedule.bgClass,
          ]"
        >
          <div class="content">
            <div class="d-flex align-items-center mb-5">
              <h6 class="fw-medium mb-0">
                {{ schedule.time }}
              </h6>
            </div>
            <span class="d-block text-black fw-semibold fs-md-15 mb-1">
              {{ schedule.title }}
            </span>
            <span class="d-block text-muted fs-12 fw-medium">
              Lead by
              <span :class="schedule.class">{{ schedule.leadBy }}</span>
            </span>
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
import workingSchedule from "./workingSchedule.json";
import LoaderComponent from "@/components/Layouts/Loader.vue";

export default defineComponent({
  name: "WorkingSchedule",
  components: {
    LoaderComponent,
  },
  data() {
    const isLoading = ref(true);
    const isLoaded = ref(false);
    const search = ref("");
    const availableOptions = [
      "Muhammad",
      "Bagas",
      "Sudibyo",
      "3122510602",
    ];
    const selected = ["Bagas"];

    const fetchData = () => {
      setTimeout(() => {
        isLoading.value = false;
        isLoaded.value = true;
      }, 100);
    };

    fetchData();
    return {
      schedules: workingSchedule,
      dates: this.getDates(),
      isLoading,
      isLoaded,
      search,
      selected,
      availableOptions,
    };
  },
  methods: {
    getDates() {
      const now = new Date();
      let dates: Date[] = [];
      for (let i = -3; i <= 3; i++) {
        const newDate = new Date(now);
        newDate.setDate(now.getDate() + i);
        dates.push(newDate);
      }
      return dates;
    },
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
