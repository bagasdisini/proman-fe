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
            <div class="form-group mb-15 mb-sm-20">
              <label class="d-block text-black fw-semibold mb-10">
                Email Address
              </label>
              <input
                type="email"
                class="form-control shadow-none rounded-0 text-black"
                placeholder="e.g. adam127704@gmail.com"
                v-model="email"
                required
              />
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
import { defineComponent, ref } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";

export default defineComponent({
  name: "ForgotPasswordPage",
  setup() {
    const email = ref("");
    const router = useRouter();

    const handleSubmit = async () => {
      try {
        const response = await axios.post(
          "http://localhost:5000/api/forgot-password",
          {
            email: email.value,
          }
        );

        if (response.status === 200) {
          alert("Please check your email!");
          await router.push({ name: "LoginPage" });
        }
      } catch (error) {
        console.error("Error during forgot password:", error);
      }
    };

    return {
      email,
      handleSubmit,
    };
  },
});
</script>
