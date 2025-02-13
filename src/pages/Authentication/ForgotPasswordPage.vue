<template>
  <div class="row justify-content-center">
    <div class="col-md-8 col-lg-7 col-xl-6 col-xxl-5 col-xxxl-4">
      <div class="card mb-25 border-0 rounded-4 bg-white authentication-card">
        <div class="card-body letter-spacing">
          <h4 class="text-black fw-bold mb-0 text-center">Forgot Password?</h4>
          <p class="mb-0 fs-md-15 fs-lg-16 text-paragraph text-center sub-text">
            Enter your email address below and we will send you the recovered
            password
          </p>
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
            <div
              v-if="message"
              class="alert alert-success alert-dismissible d-flex align-items-center fs-md-15 fs-lg-16"
              role="alert"
            >
              <i
                class="flaticon-check-mark-1 lh-1 fs-20 position-relative top-1 me-8"
              ></i>
              <span>{{ message }}</span>
              <button
                type="button"
                class="btn-close shadow-none"
                @click="message = ''"
                aria-label="Close"
              ></button>
            </div>
            <div class="form-group mb-15 mb-sm-20">
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
            <button
              class="default-btn transition border-0 fw-medium text-white rounded-1 fs-md-15 fs-lg-16 d-block w-100"
              type="submit"
            >
              Submit
            </button>
            <div class="text-center mt-15 mt-sm-20 mt-md-25">
              <router-link
                to="/login"
                class="link-btn text-decoration-none text-primary fw-medium fs-md-15 fs-lg-16 position-relative"
              >
                <i class="ph-bold ph-arrow-left"></i>
                Back To Sign In
              </router-link>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { API } from "@/api";

export default defineComponent({
  name: "ForgotPasswordPage",
  data() {
    return {
      email: "",
      errors: {} as Record<string, string>,
      message: "",
      errorMessage: "",
    };
  },
  methods: {
    async handleSubmit() {
      this.errors = {};
      this.message = "";
      this.errorMessage = "";

      try {
        const response = await API.post("/forgot-password", {
          email: this.email,
        });

        this.message = response.data.message;
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
