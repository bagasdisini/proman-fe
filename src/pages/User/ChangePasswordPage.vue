<template>
  <div class="card mb-25 border-0 rounded-0 bg-white profile-settings-card">
    <div class="card-body p-15 p-sm-20 p-md-25 p-lg-30 letter-spacing">
      <form @submit.prevent="handleSubmit">
        <div class="row">
          <div class="col-md-12">
            <div class="form-group mb-15 mb-sm-20 mb-md-25">
              <label class="d-block text-black fw-semibold mb-10">
                Old Password <span class="text-danger">*</span>
              </label>
              <input
                required
                type="password"
                class="form-control shadow-none rounded-0 text-black"
                placeholder="**************"
                v-model="old_password"
                :class="{ 'is-invalid': errors.old_password }"
              />
              <div v-if="errors.old_password" class="invalid-feedback">
                {{ errors.old_password }}
              </div>
            </div>
          </div>
          <div class="col-md-12">
            <div class="form-group mb-15 mb-sm-20 mb-md-25">
              <label class="d-block text-black fw-semibold mb-10">
                New Password <span class="text-danger">*</span>
              </label>
              <input
                required
                type="password"
                class="form-control shadow-none rounded-0 text-black"
                placeholder="**************"
                v-model="new_password"
                :class="{ 'is-invalid': errors.new_password }"
              />
              <div v-if="errors.new_password" class="invalid-feedback">
                {{ errors.new_password }}
              </div>
            </div>
          </div>
          <div class="col-md-12">
            <div class="form-group mb-15 mb-sm-20 mb-md-25">
              <label class="d-block text-black fw-semibold mb-10">
                Confirm Password <span class="text-danger">*</span>
              </label>
              <input
                required
                type="password"
                class="form-control shadow-none rounded-0 text-black"
                placeholder="**************"
                v-model="confirm_password"
                :class="{ 'is-invalid': errors.confirm_password }"
              />
              <div v-if="errors.confirm_password" class="invalid-feedback">
                {{ errors.confirm_password }}
              </div>
            </div>
          </div>
          <div class="col-md-12">
            <div class="form-group mb-15 mb-sm-20 mb-md-25">
              <label class="d-block text-black fw-semibold mb-10">
                Email Confirmation Code <span class="text-danger">*</span>
              </label>
              <input
                required
                type="text"
                class="form-control shadow-none rounded-0 text-black"
                placeholder="123456"
                v-model="verification_code"
              />
            </div>
          </div>
          <div class="col-md-12">
            <div class="d-flex align-items-center justify-content-between">
              <button
                type="button"
                @click="getConfirmationCode"
                class="default-btn transition border-0 fw-medium text-white pt-10 pb-10 ps-25 pe-25 pt-md-11 pb-md-11 ps-md-35 pe-md-35 rounded-1 fs-md-15 fs-lg-16 bg-secondary"
                :disabled="loading"
              >
                {{ loading ? "Sending..." : "Get Confirmation Code" }}
              </button>
              <button
                class="default-btn transition border-0 fw-medium text-white pt-10 pb-10 ps-25 pe-25 pt-md-11 pb-md-11 ps-md-35 pe-md-35 rounded-1 fs-md-15 fs-lg-16 bg-success"
                type="submit"
              >
                Save Profile
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  </div>
  <div
    class="toast align-items-center text-bg-primary border-0 position-fixed bottom-1 end-0 m-3"
    ref="toast"
    role="alert"
    aria-live="assertive"
    aria-atomic="true"
  >
    <div class="d-flex">
      <div class="toast-body fs-md-15 fs-lg-16">
        {{ message }}
      </div>
      <button
        type="button"
        class="btn-close shadow-none btn-close-white me-2 m-auto"
        data-bs-dismiss="toast"
        aria-label="Close"
      ></button>
    </div>
  </div>

  <div
    class="toast align-items-center text-bg-danger border-0 position-fixed bottom-1 end-0 m-3"
    ref="errorToast"
    role="alert"
    aria-live="assertive"
    aria-atomic="true"
  >
    <div class="d-flex">
      <div class="toast-body fs-md-15 fs-lg-16">
        {{ errorMessage }}
      </div>
      <button
        type="button"
        class="btn-close shadow-none btn-close-white me-2 m-auto"
        data-bs-dismiss="toast"
        aria-label="Close"
      ></button>
    </div>
  </div>
</template>

<script lang="ts">
import { API, setAuthToken } from "@/api";
import { Toast } from "bootstrap";
import { defineComponent } from "vue";

export default defineComponent({
  name: "ChangePassword",
  data() {
    return {
      old_password: "",
      new_password: "",
      confirm_password: "",
      verification_code: "",
      loading: false,
      message: "",
      toastInstance: null,
      errorToastInstance: null,
      errors: {} as Record<string, string>,
      errorMessage: "",
    };
  },
  mounted() {
    this.toastInstance = new Toast(this.$refs.toast, {
      autohide: true,
      delay: 2500,
    });
    this.errorToastInstance = new Toast(this.$refs.errorToast, {
      autohide: true,
      delay: 2500,
    });
  },
  methods: {
    async getConfirmationCode() {
      this.message = "";
      this.loading = true;

      try {
        const token = localStorage.getItem("jwt");
        let email = "";

        if (token) {
          setAuthToken(token);
          const meResponse = await API.get("/me");
          email = meResponse.data.email;
        }

        const url = `/verification-code/${encodeURIComponent(email)}`;
        const response = await API.post(
          url,
          {},
          {
            auth: {
              username: "admin",
              password: "admin",
            },
          }
        );

        this.message = response.data.message;
        this.showToast();
      } finally {
        this.loading = false;
        this.showToast();
      }
    },

    async handleSubmit(event) {
      this.errors = {};
      this.errorMessage = "";

      event.preventDefault();

      try {
        await API.put("/me/password", {
          old_password: this.old_password,
          new_password: this.new_password,
          confirm_password: this.confirm_password,
          verification_code: this.verification_code,
        });

        this.message = "Password changed successfully!";
        this.showToast();

        this.old_password = "";
        this.new_password = "";
        this.confirm_password = "";
        this.verification_code = "";
      } catch (error) {
        if (error instanceof Error && "response" in error) {
          const response = (
            error as { response: { status: number; data: any } }
          ).response;

          if (response.status !== 200) {
            const data = response.data;

            if (typeof data.message === "string") {
              this.errorMessage = data.message;
              this.showErrorToast();
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

    showToast() {
      if (this.toastInstance) {
        this.errorToastInstance.hide();
        this.toastInstance.show();
      }
    },

    showErrorToast() {
      if (this.errorToastInstance) {
        this.toastInstance.hide();
        this.errorToastInstance.show();
      }
    },
  },
});
</script>
