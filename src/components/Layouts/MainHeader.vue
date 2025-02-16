<template>
  <header
    id="header"
    :class="[
      'header-area bg-white text-center text-md-start pt-15 pb-15 ps-15 pe-15 ps-md-20 pe-md-20 pe-lg-30 transition mb-25 position-fixed',
      { sticky: isSticky },
    ]"
  >
    <div class="row align-items-center">
      <div class="col-xl-4 col-lg-5 col-md-6">
        <div
          class="header-left-side justify-content-center justify-content-md-start d-flex align-items-center"
        >
          <button
            id="header-burger-menu"
            class="header-burger-menu transition position-relative lh-1 bg-transparent p-0 border-0"
            @click="stateStoreInstance.onChange"
          >
            <i class="flaticon-menu-3"></i>
          </button>
          <form class="search-box">
            <div class="input-group">
              <input
                class="form-control shadow-none rounded-0 border-0"
                placeholder="Search here"
                type="text"
              />
              <button
                class="default-btn position-relative transition border-0 fw-medium text-white pt-8 pb-8 ps-15 pe-15 pt-md-12 pb-md-12 ps-md-20 pe-md-20"
                type="button"
              >
                Search
                <i
                  class="flaticon-search-interface-symbol position-relative ms-5 top-1"
                ></i>
              </button>
            </div>
          </form>
        </div>
      </div>
      <div class="col-xl-8 col-lg-7 col-md-6">
        <div
          class="header-right-side d-flex align-items-center justify-content-center justify-content-md-end"
        >
          <div class="dropdown profile-dropdown">
            <button
              aria-expanded="false"
              class="dropdown-toggle text-start fs-14 text-black-emphasis d-flex align-items-center p-0 position-relative bg-transparent border-0 transition lh-1"
              data-bs-toggle="dropdown"
              type="button"
            >
              <img
                :src="userAvatar"
                alt="admin"
                class="rounded"
                height="44"
                width="44"
              />
              <span class="title d-none d-lg-block ms-10 ms-lg-15">
                <span class="d-block fw-bold mb-5 mb-md-8">{{ userName }}</span>
                <span class="text-body-emphasis fw-semibold fs-13">{{
                  userPosition
                }}</span>
              </span>
            </button>
            <div
              class="dropdown-menu rounded-0 bg-white border-0 start-auto end-0"
            >
              <ul class="ps-0 mb-0 list-unstyled dropdown-body">
                <li
                  class="text-body-secondary fw-semibold transition position-relative"
                >
                  <i class="flaticon-user-2"></i>
                  Change Profile
                  <router-link
                    class="d-block position-absolute start-0 top-0 end-0 bottom-0 text-decoration-none"
                    to="/change-profile"
                  ></router-link>
                </li>
                <li
                  class="text-body-secondary fw-semibold transition position-relative"
                >
                  <i class="flaticon-setting"></i>
                  Change Password
                  <router-link
                    class="d-block position-absolute start-0 top-0 end-0 bottom-0 text-decoration-none"
                    to="/change-password"
                  ></router-link>
                </li>
                <li
                  class="text-body-secondary fw-semibold transition position-relative"
                >
                  <i class="flaticon-logout"></i>
                  Logout
                  <router-link
                    class="d-block position-absolute start-0 top-0 end-0 bottom-0 text-decoration-none"
                    to="/"
                    @click="handleLogout"
                  ></router-link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script lang="ts">
import { defineComponent, onMounted, onUnmounted, ref } from "vue";
import { useRouter } from "vue-router";
import stateStore from "../../utils/store";
import { API, setAuthToken } from "@/api";

export default defineComponent({
  name: "MainHeader",
  setup() {
    const stateStoreInstance = stateStore;
    const isSticky = ref(false);
    const userName = ref("");
    const userPosition = ref("");
    const userAvatar = ref("");
    const router = useRouter();

    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("jwt");
        if (token) {
          setAuthToken(token);
          const response = await API.get("/me");
          userName.value = response.data.name;
          userPosition.value = response.data.position;

          if (response.data.avatar) {
            userAvatar.value = response.data.avatar;
          } else {
            userAvatar.value =
              "https://netray-spaces.s3.nevaobjects.id/proman/avatar/1739388422880783400-CoeJmpzQiD-4201745905.jpeg";
          }
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    onMounted(() => {
      window.addEventListener("scroll", () => {
        let scrollPos = window.scrollY;
        isSticky.value = scrollPos >= 100;
      });
      fetchUserData();

      window.addEventListener("user-updated", fetchUserData);
    });

    onUnmounted(() => {
      window.removeEventListener("user-updated", fetchUserData);
    });

    const handleLogout = () => {
      localStorage.removeItem("jwt");
      setAuthToken(null);
      router.push({ name: "LoginPage" });
    };

    return {
      isSticky,
      stateStoreInstance,
      userName,
      userPosition,
      userAvatar,
      handleLogout,
    };
  },
});
</script>
