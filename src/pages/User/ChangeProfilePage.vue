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
                :class="{ 'is-invalid': errors.name }"
                class="form-control shadow-none rounded-0 text-black"
                placeholder="John Doe"
                type="text"
              />
              <div v-if="errors.name" class="invalid-feedback">
                {{ errors.name }}
              </div>
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
                :class="{ 'is-invalid': errors.phone }"
                class="form-control shadow-none rounded-0 text-black"
                placeholder="0851-2221-2223"
                type="text"
              />
              <div v-if="errors.phone" class="invalid-feedback">
                {{ errors.phone }}
              </div>
            </div>
          </div>
          <div class="col-md-6">
            <div class="form-group mb-15 mb-sm-20 mb-md-25">
              <label class="d-block text-black fw-semibold mb-10">
                Email Address
              </label>
              <input
                v-model="email"
                :class="{ 'is-invalid': errors.email }"
                class="form-control shadow-none rounded-0 text-black"
                placeholder="example@email.com"
                type="email"
              />
              <div v-if="errors.email" class="invalid-feedback">
                {{ errors.email }}
              </div>
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
              <label class="d-block text-black fw-semibold mb-10">
                Position
              </label>
              <select
                v-model="position"
                :class="{ 'is-invalid': errors.position }"
                class="form-select shadow-none text-black fs-md-15"
              >
                <option disabled value="">Select a position</option>
                <option v-for="pos in positions" :key="pos" :value="pos">
                  {{ pos }}
                </option>
              </select>
              <div v-if="errors.position" class="invalid-feedback">
                {{ errors.position }}
              </div>
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
                :disabled="loading"
                class="default-btn transition border-0 fw-medium text-white pt-10 pb-10 ps-25 pe-25 pt-md-11 pb-md-11 ps-md-35 pe-md-35 rounded-1 fs-md-15 fs-lg-16 bg-secondary"
                type="button"
                @click="getConfirmationCode"
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

  <div
    ref="toastRef"
    aria-atomic="true"
    aria-live="assertive"
    class="toast align-items-center text-bg-primary border-0 position-fixed bottom-1 end-0 m-3"
    role="alert"
  >
    <div class="d-flex">
      <div class="toast-body fs-md-15 fs-lg-16">
        {{ message }}
      </div>
      <button
        aria-label="Close"
        class="btn-close shadow-none btn-close-white me-2 m-auto"
        data-bs-dismiss="toast"
        type="button"
      ></button>
    </div>
  </div>

  <div
    ref="errorToastRef"
    aria-atomic="true"
    aria-live="assertive"
    class="toast align-items-center text-bg-danger border-0 position-fixed bottom-1 end-0 m-3"
    role="alert"
  >
    <div class="d-flex">
      <div class="toast-body fs-md-15 fs-lg-16">
        {{ errorMessage }}
      </div>
      <button
        aria-label="Close"
        class="btn-close shadow-none btn-close-white me-2 m-auto"
        data-bs-dismiss="toast"
        type="button"
      ></button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import { API, setAuthToken } from "@/api";
import VueCropper from "vue-cropperjs";
import { Toast } from "bootstrap";
import "cropperjs/dist/cropper.css";

export default defineComponent({
  name: "ProfileSettings",
  components: { VueCropper },
  setup() {
    const full_name = ref("");
    const phone = ref("");
    const email = ref("");
    const position = ref("");
    const verification_code = ref("");
    const imageUrl = ref("");
    const selectedFile = ref<File | null>(null);
    const selectedImage = ref("");
    const showCropper = ref(false);
    const positions = ref<string[]>([]);
    const loading = ref(false);
    const loadingUpdate = ref(false);
    const message = ref("");
    const errorMessage = ref("");
    const errors = ref<Record<string, string>>({});

    const toastRef = ref<HTMLDivElement | null>(null);
    const errorToastRef = ref<HTMLDivElement | null>(null);
    let toastInstance: Toast | null = null;
    let errorToastInstance: Toast | null = null;

    onMounted(() => {
      getProfile();
      fetchPositions();

      if (toastRef.value) {
        toastInstance = new Toast(toastRef.value, {
          autohide: true,
          delay: 2500,
        });
      }
      if (errorToastRef.value) {
        errorToastInstance = new Toast(errorToastRef.value, {
          autohide: true,
          delay: 2500,
        });
      }
    });

    const showToast = () => {
      if (toastInstance) {
        errorToastInstance?.hide();
        toastInstance.show();
      }
    };

    const showErrorToast = () => {
      if (errorToastInstance) {
        toastInstance?.hide();
        errorToastInstance.show();
      }
    };

    const getConfirmationCode = async () => {
      message.value = "";
      loading.value = true;

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

        message.value = response.data.message;
        showToast();
      } catch (error) {
        console.error("Error getting confirmation code:", error);
      } finally {
        loading.value = false;
      }
    };

    const fetchPositions = async () => {
      const username = process.env.VUE_APP_API_USERNAME;
      const password = process.env.VUE_APP_API_PASSWORD;
      const basicAuth = "Basic " + btoa(`${username}:${password}`);

      try {
        const response = await API.get("/option/type/position", {
          headers: {
            Authorization: basicAuth,
            Accept: "application/json",
          },
        });

        if (response.data && Array.isArray(response.data)) {
          positions.value = response.data;
        }
      } catch (error) {
        console.error("Error fetching positions:", error);
      }
    };

    const getProfile = async () => {
      try {
        const token = localStorage.getItem("jwt");
        if (token) {
          setAuthToken(token);
          const meResponse = await API.get("/me");
          full_name.value = meResponse.data.name;
          phone.value = meResponse.data.phone;
          email.value = meResponse.data.email;
          position.value = meResponse.data.position;
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };

    const updateProfile = async (event: Event) => {
      errors.value = {};
      errorMessage.value = "";

      loadingUpdate.value = true;
      event.preventDefault();

      const formData = new FormData();
      formData.append("name", full_name.value);
      formData.append("email", email.value);
      formData.append("phone", phone.value);
      formData.append("verification_code", verification_code.value);
      formData.append("position", position.value);

      if (selectedFile.value) {
        formData.append("avatar", selectedFile.value, "profile.png");
      }

      try {
        const token = localStorage.getItem("jwt");
        if (token) setAuthToken(token);

        const response = await API.put("/me", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        message.value = "Profile changed successfully!";
        showToast();

        window.dispatchEvent(new Event("user-updated"));

        verification_code.value = "";
        imageUrl.value = "";
        selectedImage.value = "";
        selectedFile.value = null;
      } catch (error: any) {
        if (error.response) {
          const response = error.response;

          if (response.status !== 200) {
            const data = response.data;

            if (typeof data.message === "string") {
              errorMessage.value = data.message;
              showErrorToast();
            }

            if (Array.isArray(data.errors)) {
              data.errors.forEach((err: { field: string; message: string }) => {
                errors.value[err.field] = err.message;
              });
            }
          }
        } else {
          console.error("Unexpected error:", error);
        }
      } finally {
        loadingUpdate.value = false;
      }
    };

    const openFilePicker = () => {
      const fileInput = document.getElementById(
        "fileInput"
      ) as HTMLInputElement;
      fileInput.click();
    };

    const handleFileChange = (event: Event) => {
      const input = event.target as HTMLInputElement;
      selectedFile.value = input.files?.[0] || null;
      if (selectedFile.value) {
        const reader = new FileReader();
        reader.onload = (e) => {
          selectedImage.value = e.target?.result as string;
          showCropper.value = true;
        };
        reader.readAsDataURL(selectedFile.value);
      }
    };

    const cancelCrop = () => {
      showCropper.value = false;
      selectedImage.value = "";
      selectedFile.value = null;
    };

    return {
      full_name,
      phone,
      email,
      position,
      verification_code,
      imageUrl,
      selectedFile,
      selectedImage,
      showCropper,
      positions,
      loading,
      message,
      errorMessage,
      errors,
      toastRef,
      errorToastRef,
      getConfirmationCode,
      showToast,
      showErrorToast,
      getProfile,
      updateProfile,
      openFilePicker,
      handleFileChange,
      cancelCrop,
    };
  },
  methods: {
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
