<template>
  <div class="card mb-25 border-0 rounded-0 bg-white letter-spacing">
    <div
      class="card-head box-shadow bg-white d-lg-flex align-items-center justify-content-between p-15 p-sm-20 p-md-25"
    >
      <div class="d-sm-flex align-items-center">
        <form class="search-box position-relative">
          <input
            class="form-control shadow-none text-black rounded-0 border-0"
            placeholder="Search project"
            type="text"
          />
          <button
            class="bg-transparent text-primary transition p-0 border-0"
            type="submit"
          >
            <i class="flaticon-search-interface-symbol"></i>
          </button>
        </form>
      </div>
      <div class="d-sm-flex align-items-center mt-10 mt-lg-0">
        <router-link
          class="default-btn position-relative transition border-0 fw-medium text-white pt-11 pb-11 ps-25 pe-25 pt-md-11 pb-md-11 ps-md-30 pe-md-30 rounded-1 bg-success fs-md-15 fs-lg-16 d-inline-block d-inline-block text-decoration-none"
          to="/create-new-project"
        >
          Add New Project
          <i class="flaticon-plus position-relative ms-5 fs-12"></i>
        </router-link>
        <select
          class="project-select form-select shadow-none fw-semibold rounded-1 mt-10 mt-sm-0 ms-sm-10"
        >
          <option selected>All</option>
          <option value="1">In Process</option>
          <option value="2">On Hold</option>
          <option value="3">Completed</option>
        </select>
      </div>
    </div>
    <div class="card-body p-15 p-sm-20 p-md-25">
      <div class="table-responsive">
        <table class="table text-nowrap align-middle mb-0">
          <thead>
            <tr>
              <th
                class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0 ps-0"
                scope="col"
              >
                PROJECT
              </th>
              <th
                class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0"
                scope="col"
              >
                TYPE
              </th>
              <th
                class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0"
                scope="col"
              >
                START DATE
              </th>
              <th
                class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0"
                scope="col"
              >
                DUE DATE
              </th>
              <th
                class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0"
                scope="col"
              >
                PROGRESS
              </th>
              <th
                class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0"
                scope="col"
              >
                STATUS
              </th>
              <th
                class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0 text-end pe-0"
                scope="col"
              ></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="project in projects" :key="project._id">
              <th
                class="shadow-none title lh-1 fw-medium fs-md-15 fs-lg-16 ps-0"
              >
                <div class="d-flex align-items-center">
                  <img
                    v-if="project.logo"
                    :src="project.logo"
                    alt="project-image"
                    class="rounded-1 me-10"
                    height="37"
                    width="37"
                  />
                  <router-link
                    class="d-block text-decoration-none text-black"
                    to="/project-details"
                  >
                    <span class="d-block">{{ project.name }}</span>
                  </router-link>
                </div>
              </th>
              <td class="shadow-none lh-1 fw-bold text-body-tertiary">
                {{ project.type }}
              </td>
              <td class="shadow-none lh-1 fw-bold text-body-tertiary">
                {{ formatDate(project.start_date) }}
              </td>
              <td class="shadow-none lh-1 fw-bold text-body-tertiary">
                {{ formatDate(project.end_date) }}
              </td>
              <td class="shadow-none lh-1 fw-medium text-body-tertiary">
                <div
                  :aria-valuenow="getProgress(project)"
                  aria-valuemax="100"
                  aria-valuemin="0"
                  class="progress"
                  role="progressbar"
                >
                  <div
                    :style="{ width: getProgress(project) + '%' }"
                    class="progress-bar"
                  ></div>
                </div>
              </td>
              <td class="shadow-none lh-1 fw-medium">
                <span
                  :class="['badge fs-13', getStatusClass(project.status)]"
                  >{{ project.status }}</span
                >
              </td>
              <td
                class="shadow-none lh-1 fw-medium text-body-tertiary text-end pe-0"
              ></td>
            </tr>
          </tbody>
        </table>
      </div>
      <div
        v-if="projects.length"
        class="pagination-area d-md-flex mt-15 mt-md-25 mb-0 justify-content-between align-items-center"
      >
        <p class="mb-0 text-paragraph"></p>
        <nav class="mt-15 mt-md-0">
          <ul class="pagination mb-0">
            <li :class="{ disabled: currentPage === 1 }" class="page-item">
              <button class="page-link" @click="changePage(currentPage - 1)">
                <i class="flaticon-chevron-1"></i>
              </button>
            </li>
            <li v-for="page in totalPages" :key="page" class="page-item">
              <button
                :class="{ active: currentPage === page }"
                class="page-link"
                @click="changePage(page)"
              >
                {{ page }}
              </button>
            </li>
            <li
              :class="{ disabled: currentPage === totalPages }"
              class="page-item"
            >
              <button class="page-link" @click="changePage(currentPage + 1)">
                <i class="flaticon-chevron"></i>
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import { API, setAuthToken } from "@/api";

export default defineComponent({
  name: "ProjectsList",
  setup() {
    const projects = ref([]);
    const currentPage = ref(1);
    const totalPages = ref(1);
    const totalProjects = ref(0);

    const fetchProjects = async (page = 1) => {
      try {
        const token = localStorage.getItem("jwt");
        if (token) {
          setAuthToken(token);

          const response = await API.get(
            `/projects?sort=asc&page=${page}&limit=10`
          );
          const { result, total, pages } = response.data;

          projects.value = result;
          totalProjects.value = total;
          totalPages.value = pages;
          currentPage.value = page;
        }
      } catch (error) {
        console.error("Failed to fetch projects:", error);
      }
    };

    const formatDate = (dateStr: string) => {
      return new Date(dateStr).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
    };

    const getProgress = (project: any) => {
      const { active, testing, completed } = project.task_count;
      const totalTasks = active + testing + completed;
      return totalTasks > 0 ? Math.round((completed / totalTasks) * 100) : 0;
    };

    const getStatusClass = (status: string) => {
      const statusMap: Record<string, string> = {
        active: "text-outline-primary",
        pending: "text-outline-danger",
        completed: "text-outline-success",
      };
      return statusMap[status] || "text-outline-secondary";
    };

    const changePage = (page: number) => {
      if (page >= 1 && page <= totalPages.value) {
        fetchProjects(page);
      }
    };

    onMounted(() => {
      fetchProjects();
    });

    return {
      projects,
      currentPage,
      totalPages,
      totalProjects,
      formatDate,
      getProgress,
      getStatusClass,
      changePage,
    };
  },
});
</script>
