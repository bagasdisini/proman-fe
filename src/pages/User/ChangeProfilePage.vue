<template>
  <div class="card mb-25 border-0 rounded-0 bg-white profile-settings-card">
    <div class="card-body p-15 p-sm-20 p-md-25 p-lg-30 letter-spacing">
      <form @submit.prevent="updateProfile">
        <div class="row">
          <div class="col-md-6">
            <div class="form-group mb-15 mb-sm-20 mb-md-25">
              <label class="d-block text-black fw-semibold mb-10">
                Full Name
              </label>
              <input
                v-model="full_name"
                class="form-control shadow-none rounded-0 text-black"
                placeholder="John Doe"
                type="text"
              />
            </div>
          </div>
          <!-- Phone -->
          <div class="col-md-6">
            <div class="form-group mb-15 mb-sm-20 mb-md-25">
              <label class="d-block text-black fw-semibold mb-10">
                Phone No
              </label>
              <input
                v-model="phone"
                class="form-control shadow-none rounded-0 text-black"
                placeholder="0851-2221-2223"
                type="text"
              />
            </div>
          </div>
          <div class="col-md-6">
            <div class="form-group mb-15 mb-sm-20 mb-md-25">
              <label class="d-block text-black fw-semibold mb-10">
                Email Address
              </label>
              <input
                v-model="email"
                class="form-control shadow-none rounded-0 text-black"
                placeholder="example@email.com"
                type="email"
              />
            </div>
          </div>
          <div class="col-md-6">
            <div class="form-group mb-15 mb-sm-20 mb-md-25">
              <label class="d-block text-black fw-semibold mb-10">
                Email Confirmation Code <span class="text-danger">*</span>
              </label>
              <input
                v-model="verification_code"
                class="form-control shadow-none rounded-0 text-black"
                placeholder="123456"
                required
                type="text"
              />
            </div>
          </div>
          <div class="col-md-12">
            <div class="form-group mb-15 mb-sm-20 mb-md-25">
              <label class="d-block text-black fw-semibold mb-10"
                >Upload Your Profile Picture</label
              >
              <div
                :class="{ 'disabled-upload': showCropper }"
                class="file-upload text-center position-relative"
              >
                <img
                  v-if="imageUrl"
                  :src="imageUrl"
                  alt="Uploaded Image"
                  class="preview-image"
                />
                <span class="d-block text-muted">
                  <span
                    class="text-black fw-medium position-relative"
                    @click="openFilePicker"
                    >Click To Upload</span
                  >
                </span>
                <input
                  ref="fileInput"
                  accept="image/*"
                  class="d-block shadow-none border-0 position-absolute start-0 end-0 top-0 bottom-0 z-1 opacity-0"
                  type="file"
                  @change="handleFileChange"
                />
              </div>
            </div>
          </div>
          <div class="col-md-12">
            <div class="d-flex align-items-center justify-content-between">
              <button
                class="default-btn transition border-0 fw-medium text-white pt-10 pb-10 ps-25 pe-25 pt-md-11 pb-md-11 ps-md-35 pe-md-35 rounded-1 fs-md-15 fs-lg-16 bg-secondary"
                type="button"
                @click="getConfirmationCode"
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
  <div v-if="showCropper" class="modal-overlay">
    <div class="modal-content">
      <h5 class="text-center">Crop Your Image</h5>
      <vue-cropper
        ref="cropper"
        :aspect-ratio="1"
        :src="selectedImage"
        drag-mode="move"
        preview=".preview-box"
      />
      <div class="d-flex justify-content-between mt-3">
        <button class="btn btn-secondary" @click="cancelCrop">Cancel</button>
        <button class="btn btn-primary" @click="cropImage">Crop & Save</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { API, setAuthToken } from "@/api";
import VueCropper from "vue-cropperjs";
import "cropperjs/dist/cropper.css";

// TODO: Make an modal, and get confirmation code

export default defineComponent({
  name: "ProfileSettings",
  components: { VueCropper },
  data() {
    return {
      full_name: "",
      phone: "",
      email: "",
      verification_code: "",
      imageUrl: "",
      selectedFile: null as File | null,
      selectedImage: "",
      showCropper: false,
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
    openFilePicker() {
      (this.$refs.fileInput as HTMLInputElement).click();
    },
    handleFileChange(event: Event) {
      const input = event.target as HTMLInputElement;
      this.selectedFile = input.files?.[0] || null;
      if (this.selectedFile) {
        const reader = new FileReader();
        reader.onload = (e) => {
          this.selectedImage = e.target?.result as string;
          this.showCropper = true;
        };
        reader.readAsDataURL(this.selectedFile);
      }
    },
    cancelCrop() {
      this.showCropper = false;
      this.selectedImage = "";
    },
    cropImage() {
      const cropper = this.$refs.cropper as any;
      const croppedCanvas = cropper.getCroppedCanvas();
      if (croppedCanvas) {
        croppedCanvas.toBlob((blob) => {
          this.selectedFile = blob;
          this.imageUrl = URL.createObjectURL(blob);
          this.showCropper = false;
        }, "image/png");
      }
    },
    async updateProfile() {
      const formData = new FormData();
      formData.append("name", this.full_name);
      formData.append("email", this.email);
      formData.append("phone", this.phone);
      formData.append("verification_code", this.verification_code);
      formData.append("position", "Frontend Engineer");

      if (this.selectedFile) {
        formData.append("avatar", this.selectedFile, "profile.png");
      }

      try {
        const token = localStorage.getItem("jwt");
        if (token) setAuthToken(token);

        const response = await API.put("/me", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
      } catch (error) {
        console.error("Update failed", error);
      }
    },
  },
});
</script>

<style scoped>
.preview-image {
  max-width: 100%;
  max-height: 300px;
  margin-bottom: 30px;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal-content {
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  width: 400px;
}

.preview-box {
  width: 100px;
  height: 100px;
  border: 1px solid #ddd;
  margin-top: 10px;
}

.disabled-upload {
  pointer-events: none;
  opacity: 0.5;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-content {
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  width: 400px;
  z-index: 1001;
}
</style>
