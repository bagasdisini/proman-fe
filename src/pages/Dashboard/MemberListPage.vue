<template>
  <div class="card mb-25 border-0 rounded-0 bg-white letter-spacing">
    <div
      class="card-head box-shadow bg-white d-lg-flex align-items-center justify-content-between p-15 p-sm-20 p-md-25"
    >
      <div class="d-flex align-items-center">
        <form class="search-box position-relative me-15">
          <input
            class="form-control shadow-none text-black rounded-0 border-0"
            placeholder="Search user"
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
      <div class="d-sm-flex align-items-center">
        <a
          class="default-btn position-relative transition border-0 fw-medium text-white pt-11 pb-11 ps-25 pe-25 pt-md-12 pb-md-12 ps-md-30 pe-md-30 rounded-1 bg-success fs-md-15 fs-lg-16 d-inline-block me-10 mb-10 mb-lg-0 text-decoration-none"
          data-bs-target="#createNewUserModal"
          data-bs-toggle="modal"
          href="#"
        >
          Add New User
          <i class="flaticon-plus position-relative ms-5 fs-12"></i>
        </a>
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
                FULL NAME
              </th>
              <th
                class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0"
                scope="col"
              >
                EMAIL
              </th>
              <th
                class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0"
                scope="col"
              >
                PHONE
              </th>
              <thf
                class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0"
                scope="col"
              >
                POSITION
              </thf>
              <th
                class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0"
                scope="col"
              >
                JOINING DATE
              </th>
              <th
                class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0"
                scope="col"
              >
                PROJECTS
              </th>
              <th
                class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0 text-end pe-0"
                scope="col"
              ></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="user in users" :key="user._id">
              <th
                class="shadow-none lh-1 fw-medium text-black-emphasis title ps-0"
              >
                <div class="d-flex align-items-center">
                  <div class="d-flex align-items-center ms-5 fs-md-15 fs-lg-16">
                    <img
                      v-if="user.avatar"
                      :src="user.avatar"
                      alt="user"
                      class="rounded-circle me-8"
                      height="24"
                      width="24"
                    />
                    {{ user.name }}
                  </div>
                </div>
              </th>
              <td class="shadow-none lh-1 fw-medium text-primary">
                {{ user.email }}
              </td>
              <td class="shadow-none lh-1 fw-medium text-black-emphasis">
                {{ user.phone }}
              </td>
              <td class="shadow-none lh-1 fw-medium text-muted">
                {{ user.position }}
              </td>
              <td class="shadow-none lh-1 fw-medium text-muted">
                {{ formatDate(user.created_at) }}
              </td>
              <td class="shadow-none lh-1 fw-medium text-muted">
                {{ user.total_project }}
              </td>
              <td
                class="shadow-none lh-1 fw-medium text-body-tertiary text-end pe-0"
              ></td>
            </tr>
          </tbody>
        </table>
      </div>

      <div
        v-if="users.length"
        class="pagination-area d-md-flex mt-15 mt-sm-20 mt-md-25 justify-content-between align-items-center"
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
  name: "MemberList",
  components: {},
  setup() {
    const users = ref([]);
    const currentPage = ref(1);
    const totalPages = ref(1);
    const totalUsers = ref(0);

    const fetchUsers = async (page = 1) => {
      try {
        const token = localStorage.getItem("jwt");
        if (token) {
          setAuthToken(token);

          const response = await API.get(
            `/users?sort=asc&page=${page}&limit=10`
          );
          const { result, total, pages } = response.data;

          users.value = result;
          totalUsers.value = total;
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

    const changePage = (page: number) => {
      if (page >= 1 && page <= totalPages.value) {
        fetchUsers(page);
      }
    };

    onMounted(() => {
      fetchUsers();
    });

    return {
      users,
      currentPage,
      totalPages,
      totalUsers,
      formatDate,
      changePage,
    };
  },
});
</script>
