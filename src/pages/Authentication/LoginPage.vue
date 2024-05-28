<template>
  <div class="row justify-content-center">
    <div class="col-md-8 col-lg-7 col-xl-6 col-xxl-5 col-xxxl-4">
      <div class="card mb-25 border-0 rounded-4 bg-white authentication-card">
        <div class="card-body letter-spacing">
          <h4 class="text-black fw-bold mb-0 text-center">
            Sign In To Your Account!
          </h4>
          <form>
            <div class="form-group mb-15 mb-sm-20 mb-md-25">
              <label class="d-block text-black fw-semibold mb-10">
                Email Address
              </label>
              <input
                  type="email"
                  class="form-control shadow-none rounded-0 text-black"
                  placeholder="e.g. adam127704@gmail.com"
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
              />
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
              <router-link to="/home" style="text-decoration: none; color: inherit;">Sign In Now</router-link>
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

export default defineComponent({
  name: "LoginPage",
});
</script>