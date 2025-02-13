<template>
  <div class="row justify-content-center">
    <div class="col-md-8 col-lg-7 col-xl-6 col-xxl-5 col-xxxl-4">
      <div class="card mb-25 border-0 rounded-4 bg-white authentication-card">
        <div class="card-body letter-spacing">
          <h4 class="text-black fw-bold mb-0 text-center">
            Sign In To Your Account!
          </h4>
          <form @submit.prevent="handleSubmit">
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
                type="button"
                class="btn-close shadow-none"
                @click="errorMessage = ''"
                aria-label="Close"
              ></button>
            </div>
            <div class="form-group mb-15 mb-sm-20 mb-md-25">
              <label class="d-block text-black fw-semibold mb-10">
                Email Address
              </label>
              <input
                type="email"
                class="form-control shadow-none rounded-0 text-black"
                placeholder="example@email.com"
                v-model="email"
                required
                :class="{ 'is-invalid': errors.email }"
              />
              <div v-if="errors.email" class="invalid-feedback">
                {{ errors.email }}
              </div>
            </div>
            <div class="form-group mb-15 mb-sm-20 mb-md-25">
              <label class="d-block text-black fw-semibold mb-10">
                Password
              </label>
              <input
                type="password"
                class="form-control shadow-none rounded-0 text-black"
                placeholder="**************"
                v-model="password"
                required
                :class="{ 'is-invalid': errors.password }"
              />
              <div v-if="errors.password" class="invalid-feedback">
                {{ errors.password }}
              </div>
            </div>
            <div
              class="d-flex align-items-center justify-content-between mb-15 mb-md-20"
            >
              <router-link
                to="/forgot-password"
                class="forgot-password-btn fs-md-15 fs-lg-16 text-decoration-none position-relative text-primary"
              >
                Forgot Password?
              </router-link>
            </div>
            <button
              class="default-btn transition border-0 fw-medium text-white rounded-1 fs-md-15 fs-lg-16 bg-success d-block w-100"
              type="submit"
            >
              Sign In Now
            </button>
            <span
              class="d-block text-muted text-center mt-15 mt-md-30 mb-12 mb-md-20 fs-md-15 fs-lg-16"
            >
              Don’t have an account?
            </span>
            <router-link
              to="/register"
              class="default-btn with-border transition fw-medium rounded-1 fs-md-15 fs-lg-16 d-block w-100 text-decoration-none text-center"
            >
              Create Account
            </router-link>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { API, setAuthToken } from "@/api";

export default defineComponent({
  name: "LoginPage",
  data() {
    return {
      email: "",
      password: "",
      errors: {} as Record<string, string>,
      errorMessage: "",
    };
  },
  methods: {
    async handleSubmit() {
      this.errors = {};
      this.errorMessage = "";

      try {
        const response = await API.post("/login", {
          email: this.email,
          password: this.password,
        });

        const token = response.data.token;
        localStorage.setItem("jwt", token);
        setAuthToken(token);

        this.$router.push({ name: "HomePage" });
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
      }
    },
  },
});
</script>
