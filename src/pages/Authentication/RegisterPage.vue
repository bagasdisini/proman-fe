<template>
  <div class="row justify-content-center">
    <div class="col-md-8 col-lg-7 col-xl-6 col-xxl-5 col-xxxl-4">
      <div class="card mb-25 border-0 rounded-4 bg-white authentication-card">
        <div class="card-body letter-spacing">
          <h4 class="text-black fw-bold mb-0 text-center">
            Create Your Account
          </h4>
          <form @submit.prevent="handleSubmit">
            <div class="form-group mb-15 mb-sm-20 mb-md-25">
              <label class="d-block text-black fw-semibold mb-10">Name</label>
              <input
                type="text"
                class="form-control shadow-none rounded-0 text-black"
                placeholder="e.g. Jacob Adam"
                v-model="name"
                required
              />
            </div>
            <div class="form-group mb-15 mb-sm-20 mb-md-25">
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
              />
            </div>
            <div class="form-group mb-15 mb-sm-20 mb-md-25">
              <label class="d-block text-black fw-semibold mb-10">
                Confirm Password
              </label>
              <input
                type="password"
                class="form-control shadow-none rounded-0 text-black"
                placeholder="**************"
                v-model="confirmPassword"
                required
              />
            </div>
            <button
              class="default-btn transition border-0 fw-medium text-white rounded-1 fs-md-15 fs-lg-16 bg-success d-block w-100"
              type="submit"
            >
              Register Now
            </button>
            <span
              class="d-block text-muted text-center mt-15 mt-md-30 mb-12 mb-md-20 fs-md-15 fs-lg-16"
            >
              Already Have An Account?
            </span>
            <router-link
              to="/login"
              class="default-btn with-border transition fw-medium rounded-1 fs-md-15 fs-lg-16 d-block w-100 text-decoration-none text-center"
            >
              Log In Now
            </router-link>
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
  name: "RegisterPage",
  setup() {
    const name = ref("");
    const email = ref("");
    const password = ref("");
    const confirmPassword = ref("");
    const router = useRouter();

    const handleSubmit = async () => {
      if (password.value !== confirmPassword.value) {
        alert("Passwords do not match");
        return;
      }

      try {
        const response = await axios.post(
          "http://localhost:5000/api/register",
          {
            name: name.value,
            email: email.value,
            password: password.value,
            confirm_password: confirmPassword.value,
          }
        );

        if (response.status === 200) {
          alert("Registration successful!");
          await router.push({ name: "LoginPage" });
        }
      } catch (error) {
        console.error("Error during registration:", error);
      }
    };

    return {
      name,
      email,
      password,
      confirmPassword,
      handleSubmit,
    };
  },
});
</script>
