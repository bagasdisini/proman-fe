<template>
  <div class="card mb-25 border-0 rounded-0 bg-white profile-settings-card">
    <div class="card-body p-15 p-sm-20 p-md-25 p-lg-30 letter-spacing">
      <form>
        <div class="row">
          <div class="col-md-6">
            <div class="form-group mb-15 mb-sm-20 mb-md-25">
              <label class="d-block text-black fw-semibold mb-10">
                Full Name
              </label>
              <input
                :value="full_name"
                type="text"
                class="form-control shadow-none rounded-0 text-black"
                placeholder="John Doe"
              />
            </div>
          </div>
          <div class="col-md-6">
            <div class="form-group mb-15 mb-sm-20 mb-md-25">
              <label class="d-block text-black fw-semibold mb-10">
                Phone No
              </label>
              <input
                :value="phone"
                type="text"
                class="form-control shadow-none rounded-0 text-black"
                placeholder="0851-2221-2223"
              />
            </div>
          </div>
          <div class="col-md-6">
            <div class="form-group mb-15 mb-sm-20 mb-md-25">
              <label class="d-block text-black fw-semibold mb-10">
                Email Address
              </label>
              <input
                :value="email"
                type="email"
                class="form-control shadow-none rounded-0 text-black"
                placeholder="example@email.com"
              />
            </div>
          </div>
          <div class="col-md-6">
            <div class="form-group mb-15 mb-sm-20 mb-md-25">
              <label class="d-block text-black fw-semibold mb-10">
                Email Confirmation Code
              </label>
              <input
                type="email"
                class="form-control shadow-none rounded-0 text-black"
                placeholder="123456"
              />
            </div>
          </div>
          <div class="col-md-12">
            <div class="form-group mb-15 mb-sm-20 mb-md-25">
              <label class="d-block text-black fw-semibold mb-10">
                Upload Your Profile Picture
              </label>

              <ImageUpload />
            </div>
          </div>
          <div class="col-md-12">
            <div class="d-flex align-items-center justify-content-between">
              <button
                class="default-btn transition border-0 fw-medium text-white pt-10 pb-10 ps-25 pe-25 pt-md-11 pb-md-11 ps-md-35 pe-md-35 rounded-1 fs-md-15 fs-lg-16 bg-secondary"
                type="submit"
              >
                Get Confirmation Code
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
</template>

<script lang="ts">
import { defineComponent } from "vue";
import BlotFormatter from "quill-blot-formatter";
import ImageUploader from "quill-image-uploader";
import axios from "axios";
import { API, setAuthToken } from "@/api";

export default defineComponent({
  name: "ProfileSettings",
  components: {},
  data() {
    return {
      full_name: "",
      phone: "",
      email: "",
      verification_code: "",
    };
  },
  mounted() {
    this.getProfile();
  },
  methods: {
    async getProfile() {
      const token = localStorage.getItem("jwt");
      if (token) {
        setAuthToken(token);
        const meResponse = await API.get("/me");
        this.full_name = meResponse.data.name;
        this.phone = meResponse.data.phone;
        this.email = meResponse.data.email;
      }
    },
  },

  setup: () => {
    const modules = {
      module: BlotFormatter,
      ImageUploader,
      options: {
        upload: (file: string | Blob) => {
          return new Promise((resolve, reject) => {
            const formData = new FormData();
            formData.append("image", file);

            axios
              .post("/upload-image", formData)
              .then((res: { data: { url: unknown } }) => {
                console.log(res);
                resolve(res.data.url);
              })
              .catch((err: unknown) => {
                reject("Upload failed");
                console.error("Error:", err);
              });
          });
        },
      },
    };
    return { modules };
  },
});
</script>
