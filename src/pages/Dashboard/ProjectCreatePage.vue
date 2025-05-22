<template>
  <div class="card mb-25 border-0 rounded-0 bg-white create-new-project-box">
    <div class="card-body p-15 p-sm-20 p-md-25 p-lg-30 letter-spacing">
      <form @submit.prevent="submitCreateProject">
        <div class="row">
          <div class="col-md-12">
            <div class="form-group mb-15 mb-sm-20 mb-md-25">
              <label class="d-block text-black fw-semibold mb-10">
                Project Title
              </label>
              <input
                v-model="projectTitle"
                :class="{ 'is-invalid': errors.name }"
                class="form-control shadow-none rounded-0 text-black"
                placeholder="e.g. AI Machine Learning"
                type="text"
              />
              <div v-if="errors.name" class="invalid-feedback">
                {{ errors.name }}
              </div>
            </div>
          </div>
          <div class="col-md-12">
            <div class="form-group mb-15 mb-sm-20 mb-md-25">
              <label class="d-block text-black fw-semibold mb-10">
                Project Description
              </label>
              <div :class="{ 'is-invalid': errors.description }">
                <QuillEditor
                  ref="quillEditor"
                  v-model:content="projectDescription"
                  contentType="html"
                  placeholder="Write your description"
                  theme="snow"
                  toolbar="full"
                />
              </div>
              <div v-if="errors.description" class="invalid-feedback d-block">
                {{ errors.description }}
              </div>
            </div>
          </div>
          <div class="col-md-4">
            <div class="form-group mb-15 mb-sm-20 mb-md-25">
              <label class="d-block text-black fw-semibold mb-10">
                Project Start Date
              </label>
              <div class="input-group">
                <span class="input-group-text rounded-0 fs-14 text-muted">
                  <i class="flaticon-calendar lh-1 position-relative top-1"></i>
                </span>
                <input
                  v-model="projectStartDate"
                  :class="{ 'is-invalid': errors.start_date }"
                  class="form-control shadow-none rounded-0 text-black"
                  type="date"
                />
              </div>
              <div v-if="errors.start_date" class="invalid-feedback d-block">
                {{ errors.start_date }}
              </div>
            </div>
          </div>
          <div class="col-md-4">
            <div class="form-group mb-15 mb-sm-20 mb-md-25">
              <label class="d-block text-black fw-semibold mb-10">
                Project End Date
              </label>
              <div class="input-group">
                <span class="input-group-text rounded-0 fs-14 text-muted">
                  <i class="flaticon-calendar lh-1 position-relative top-1"></i>
                </span>
                <input
                  v-model="projectEndDate"
                  :class="{ 'is-invalid': errors.end_date }"
                  class="form-control shadow-none rounded-0 text-black"
                  type="date"
                />
              </div>
              <div v-if="errors.end_date" class="invalid-feedback d-block">
                {{ errors.end_date }}
              </div>
            </div>
          </div>
          <div class="col-md-4">
            <div class="form-group mb-15 mb-sm-20 mb-md-25">
              <label class="d-block text-black fw-semibold mb-10">
                Project Type
              </label>
              <div class="input-group">
                <select
                  id="scheduleType"
                  v-model="projectType"
                  :class="{ 'is-invalid': errors.type }"
                  class="form-select shadow-none text-black fs-md-15"
                >
                  <option value="frontend">Frontend</option>
                  <option value="backend">Backend</option>
                  <option value="mobile">Mobile</option>
                  <option value="desktop">Desktop</option>
                  <option value="monitor">Monitor</option>
                  <option value="tool">Tool</option>
                  <option value="etc">Etc</option>
                </select>
              </div>
              <div v-if="errors.type" class="invalid-feedback d-block">
                {{ errors.type }}
              </div>
            </div>
          </div>
          <div class="col-md-12">
            <div class="form-group mb-15 mb-sm-20 mb-md-25">
              <label class="d-block text-black fw-semibold mb-10">
                Contributors
              </label>
              <div class="selected-contributors mb-2">
                <span
                  v-for="(contributor, index) in selectedContributors"
                  :key="contributor._id"
                  class="selected-contributor"
                >
                  {{ contributor.name }}
                  <button
                    class="remove-button"
                    @click.prevent="removeContributor(index)"
                  >
                    &times;
                  </button>
                </span>
              </div>
              <div class="input-group">
                <input
                  v-model="search"
                  :class="{ 'is-invalid': errors.contributor }"
                  class="form-control fs-md-15 text-black shadow-none"
                  placeholder="Type to search users..."
                  @input="searchUsers"
                />
                <div v-if="errors.contributor" class="invalid-feedback">
                  {{ errors.contributor }}
                </div>
              </div>
              <div
                v-if="searchResults.length > 0 && search !== ''"
                class="dropdown-menu show w-100"
              >
                <div
                  v-for="user in searchResults"
                  :key="user._id"
                  class="dropdown-item"
                  @click="addContributor(user)"
                >
                  {{ user.name }} ({{ user.email }})
                </div>
              </div>
            </div>
          </div>
          <div class="col-md-12">
            <div class="form-group mb-15 mb-sm-20 mb-md-25">
              <label class="d-block text-black fw-semibold mb-10">
                Project Logo
              </label>
              <div
                :class="{
                  'disabled-upload': showCropper,
                  'is-invalid': errors.logo,
                }"
                class="file-upload text-center position-relative"
              >
                <img
                  v-if="imageUrl"
                  :src="imageUrl"
                  alt="Uploaded Logo"
                  class="preview-image"
                />
                <span class="d-block text-muted">
                  <span
                    class="text-black fw-medium position-relative"
                    style="cursor: pointer"
                    @click="openFilePicker"
                    >Click To Upload</span
                  >
                </span>
                <input
                  id="logoFileInput"
                  ref="fileInput"
                  accept="image/*"
                  class="d-block shadow-none border-0 position-absolute start-0 end-0 top-0 bottom-0 z-1 opacity-0"
                  style="cursor: pointer"
                  type="file"
                  @change="handleFileChange"
                />
              </div>
              <div v-if="errors.logo" class="invalid-feedback d-block">
                {{ errors.logo }}
              </div>
            </div>
          </div>
          <div class="col-md-12">
            <div class="form-group mb-15 mb-sm-20 mb-md-25">
              <label class="d-block text-black fw-semibold mb-10">
                Attached Files
              </label>
              <div class="selected-attachments mb-2">
                <span
                  v-for="(file, index) in attachmentFiles"
                  :key="index"
                  class="selected-attachment"
                >
                  {{ file.name }}
                  <button
                    class="remove-button"
                    @click.prevent="removeAttachment(index)"
                  >
                    &times;
                  </button>
                </span>
              </div>
              <div
                :class="{ 'is-invalid': errors.attachments }"
                class="file-upload text-center position-relative"
              >
                <span class="d-block text-muted">
                  <span
                    class="text-black fw-medium position-relative"
                    style="cursor: pointer"
                    @click="openAttachmentFilePicker"
                  >
                    Click To Upload Attachments
                  </span>
                </span>
                <input
                  ref="attachmentInput"
                  class="d-block shadow-none border-0 position-absolute start-0 end-0 top-0 bottom-0 z-1 opacity-0"
                  multiple
                  style="cursor: pointer"
                  type="file"
                  @change="handleAttachmentChange"
                />
              </div>
              <div v-if="errors.attachments" class="invalid-feedback d-block">
                {{ errors.attachments }}
              </div>
            </div>
          </div>
          <div class="col-md-12">
            <div v-if="globalErrorMessage" class="alert alert-danger">
              {{ globalErrorMessage }}
            </div>
            <button
              :disabled="isSubmitting"
              class="default-btn transition border-0 fw-medium text-white pt-10 pb-10 ps-25 pe-25 pt-md-11 pb-md-11 ps-md-35 pe-md-35 rounded-1 fs-md-15 fs-lg-16 bg-success"
              type="submit"
            >
              <span
                v-if="isSubmitting"
                aria-hidden="true"
                class="spinner-border spinner-border-sm"
                role="status"
              ></span>
              {{ isSubmitting ? "Creating..." : "Create Project" }}
            </button>
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
        style="max-height: 400px"
      />
      <div class="d-flex justify-content-between mt-3">
        <button class="btn btn-secondary" @click="cancelCrop">Cancel</button>
        <button class="btn btn-primary" @click="cropImage">Crop & Save</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from "vue";
import { API, setAuthToken } from "@/api"; // Ensure API is correctly set up
import VueCropper from "vue-cropperjs";
import "cropperjs/dist/cropper.css";
import { QuillEditor } from "@vueup/vue-quill";
import "@vueup/vue-quill/dist/vue-quill.snow.css";
import { useRouter } from "vue-router";

interface User {
  _id: string;
  name: string;
  email: string;
}

interface ApiError {
  field: string;
  message: string;
}

export default defineComponent({
  name: "CreateNewProject",
  components: { VueCropper, QuillEditor },
  setup() {
    const router = useRouter();

    const projectTitle = ref("");
    const projectDescription = ref(""); // For QuillEditor, use v-model:content
    const projectStartDate = ref("");
    const projectEndDate = ref("");
    const projectType = ref("frontend"); // Default value

    const search = ref("");
    const searchResults = ref<User[]>([]);
    const selectedContributors = ref<User[]>([]);

    const logoFile = ref<File | Blob | null>(null); // For the cropped logo
    const selectedImage = ref(""); // For cropper source
    const showCropper = ref(false);
    const imageUrl = ref(""); // For logo preview

    const attachmentFiles = ref<File[]>([]);
    const attachmentInput = ref<HTMLInputElement | null>(null);
    const quillEditor = ref<any>(null); // Ref for QuillEditor instance

    const errors = ref<Record<string, string>>({});
    const globalErrorMessage = ref("");
    const isSubmitting = ref(false);

    const fileInput = ref<HTMLInputElement | null>(null); // Ref for logo file input

    const openFilePicker = () => {
      if (fileInput.value) {
        fileInput.value.click();
      }
    };

    const handleFileChange = (event: Event) => {
      const input = event.target as HTMLInputElement;
      const file = input.files?.[0] || null;
      if (file) {
        logoFile.value = file; // Store original file temporarily
        const reader = new FileReader();
        reader.onload = (e) => {
          selectedImage.value = e.target?.result as string;
          showCropper.value = true;
        };
        reader.readAsDataURL(file);
      }
      // Reset file input to allow re-selection of the same file
      if (input) {
        input.value = "";
      }
    };

    const cancelCrop = () => {
      showCropper.value = false;
      selectedImage.value = "";
      logoFile.value = null; // Clear stored original file
      imageUrl.value = ""; // Clear preview if any was set before crop
    };

    const cropper = ref<any>(null); // Ref for vue-cropper component

    const cropImage = () => {
      if (cropper.value) {
        const croppedCanvas = cropper.value.getCroppedCanvas();
        if (croppedCanvas) {
          croppedCanvas.toBlob((blob: Blob | null) => {
            if (blob) {
              logoFile.value = blob; // This is the cropped image blob
              imageUrl.value = URL.createObjectURL(blob); // Update preview with cropped image
            }
            showCropper.value = false;
          }, "image/png"); // Or appropriate type e.g. image/jpeg
        }
      }
    };

    const searchUsers = async () => {
      if (search.value.trim().length < 2) {
        searchResults.value = [];
        return;
      }
      try {
        const token = localStorage.getItem("jwt");
        setAuthToken(token);
        const response = await API.get(`/users?q=${search.value}`);
        searchResults.value = response.data.result || [];
      } catch (error) {
        console.error("Error searching users:", error);
        searchResults.value = [];
      }
    };

    const addContributor = (user: User) => {
      const exists = selectedContributors.value.some((c) => c._id === user._id);
      if (!exists) {
        selectedContributors.value.push(user);
        errors.value.contributor = ""; // Clear error on add
      }
      search.value = "";
      searchResults.value = [];
    };

    const removeContributor = (index: number) => {
      selectedContributors.value.splice(index, 1);
    };

    const openAttachmentFilePicker = () => {
      if (attachmentInput.value) {
        attachmentInput.value.click();
      }
    };

    const handleAttachmentChange = (event: Event) => {
      const input = event.target as HTMLInputElement;
      if (input.files) {
        // Convert FileList to array and add to existing files
        const newFiles = Array.from(input.files);
        // You might want to add checks for duplicates or limits here
        attachmentFiles.value.push(...newFiles);
        errors.value.attachments = ""; // Clear error on add
      }
      // Reset file input to allow re-selection of the same file if needed
      if (input) {
        input.value = "";
      }
    };

    const removeAttachment = (index: number) => {
      attachmentFiles.value.splice(index, 1);
    };

    // Watch for changes in projectDescription to ensure it's not empty if Quill is touched
    watch(projectDescription, (newValue) => {
      if (newValue && errors.value.description) {
        if (newValue !== "<p><br></p>") {
          // Quill's default empty state
          errors.value.description = "";
        }
      }
    });

    const resetForm = () => {
      projectTitle.value = "";
      if (quillEditor.value) {
        quillEditor.value.setHTML(""); // Clear Quill editor content
      }
      projectDescription.value = ""; // Also reset the bound ref
      projectStartDate.value = "";
      projectEndDate.value = "";
      projectType.value = "frontend";
      selectedContributors.value = [];
      logoFile.value = null;
      imageUrl.value = "";
      attachmentFiles.value = [];
      search.value = "";
      searchResults.value = [];
      errors.value = {};
      globalErrorMessage.value = "";
      if (fileInput.value) fileInput.value.value = "";
      if (attachmentInput.value) attachmentInput.value.value = "";
    };

    return {
      projectTitle,
      projectDescription,
      projectStartDate,
      projectEndDate,
      projectType,
      search,
      searchResults,
      selectedContributors,
      logoFile,
      selectedImage,
      showCropper,
      imageUrl,
      fileInput, // Expose ref for logo input
      openFilePicker,
      handleFileChange,
      cancelCrop,
      cropImage,
      cropper, // Expose cropper ref
      searchUsers,
      addContributor,
      removeContributor,
      attachmentFiles,
      attachmentInput, // Expose ref for attachment input
      openAttachmentFilePicker,
      handleAttachmentChange,
      removeAttachment,
      errors,
      globalErrorMessage,
      isSubmitting,
      quillEditor, // Expose Quill editor ref
      resetForm,
    };
  },
  methods: {
    async submitCreateProject() {
      this.errors = {}; // Clear previous errors
      this.globalErrorMessage = "";
      this.isSubmitting = true;

      // Validate Quill editor content (basic check)
      let currentDescription = this.projectDescription;
      if (this.quillEditor) {
        // Quill might return '<p><br></p>' for an empty editor
        currentDescription = this.quillEditor.getHTML();
        if (currentDescription === "<p><br></p>") {
          currentDescription = ""; // Treat as empty
        }
      }

      const formData = new FormData();
      formData.append("name", this.projectTitle);
      formData.append("description", currentDescription);

      if (this.projectStartDate) {
        formData.append(
          "start_date",
          new Date(this.projectStartDate).getTime().toString()
        );
      } else {
        formData.append("start_date", ""); // Send empty if not set, or handle as error client-side first
      }
      if (this.projectEndDate) {
        formData.append(
          "end_date",
          new Date(this.projectEndDate).getTime().toString()
        );
      } else {
        formData.append("end_date", ""); // Send empty if not set
      }

      if (this.selectedContributors.length > 0) {
        formData.append(
          "contributor",
          this.selectedContributors.map((c) => c._id).join(",")
        );
      }

      formData.append("type", this.projectType);

      if (this.logoFile instanceof Blob) {
        // logoFile now holds the Blob after cropping
        formData.append(
          "logo",
          this.logoFile,
          (this.logoFile as File).name || "logo.png"
        );
      }

      if (this.attachmentFiles.length > 0) {
        this.attachmentFiles.forEach((file) => {
          formData.append("attachments", file, file.name);
        });
      }

      try {
        const token = localStorage.getItem("jwt");
        setAuthToken(token); // Ensure this sets the header correctly in your API instance

        const response = await API.post("/project", formData);

        // Handle success
        this.resetForm(); // Reset the form fields
        this.$router.push("/project-list");
      } catch (error: any) {
        if (error.response && error.response.data) {
          if (
            error.response.data.errors &&
            Array.isArray(error.response.data.errors)
          ) {
            // Handle validation errors
            error.response.data.errors.forEach((err: ApiError) => {
              this.errors[err.field] = err.message;
            });
          } else if (error.response.data.message) {
            // Handle other types of errors from API if they have a 'message' field
            this.globalErrorMessage = error.response.data.message;
          } else {
            this.globalErrorMessage =
              "An unexpected error occurred. Please try again.";
          }
        } else {
          this.globalErrorMessage =
            "Network error or server is not responding.";
        }
      } finally {
        this.isSubmitting = false;
      }
    },
  },
});
</script>

<style scoped>
.preview-image {
  max-width: 100%;
  max-height: 200px;
  margin-bottom: 15px;
  border: 1px solid #ddd;
  padding: 5px;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7); /* Darker overlay */
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1050; /* Ensure it's above other content */
}

.modal-content {
  background: white;
  padding: 25px; /* More padding */
  border-radius: 8px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3); /* Softer shadow */
  width: 90%;
  max-width: 500px; /* Max width for modal */
  z-index: 1051;
}

/* Ensure vue-cropperjs image is responsive within modal */
.modal-content .vue-cropperjs {
  max-height: 400px; /* Or a suitable max height */
  width: 100%;
}
.modal-content .vue-cropperjs img {
  max-width: 100%;
  display: block;
}

.preview-box {
  /* This class was in your original code but not used in template for preview */
  width: 100px;
  height: 100px;
  border: 1px solid #ddd;
  margin-top: 10px;
  overflow: hidden; /* Ensure preview content fits */
}

.disabled-upload {
  pointer-events: none;
  opacity: 0.5;
}

.selected-contributors,
.selected-attachments {
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 10px; /* Use margin-bottom instead of margin-top for consistency */
}

.selected-contributor,
.selected-attachment {
  background-color: #e9ecef;
  border-radius: 4px;
  padding: 6px 12px;
  margin-right: 6px;
  margin-bottom: 6px;
  font-size: 0.9rem; /* Slightly smaller font */
  display: flex; /* For aligning text and button */
  align-items: center;
}

.remove-button {
  margin-left: 8px;
  border: none;
  background-color: transparent;
  color: #6c757d;
  cursor: pointer;
  font-size: 1.1rem;
  padding: 0;
  line-height: 1;
}
.remove-button:hover {
  color: #dc3545;
}

.is-invalid {
  border-color: #dc3545;
}
.is-invalid .ql-toolbar,
.is-invalid .ql-container {
  border-color: #dc3545 !important;
}

.invalid-feedback {
  display: none;
  width: 100%;
  margin-top: 0.25rem;
  font-size: 0.875em;
  color: #dc3545;
}

.is-invalid ~ .invalid-feedback,
.form-control.is-invalid ~ .invalid-feedback,
.form-select.is-invalid ~ .invalid-feedback,
.file-upload.is-invalid ~ .invalid-feedback,
div.is-invalid + .invalid-feedback {
  display: block;
}

.file-upload {
  border: 1px dashed #ced4da;
  padding: 20px;
  cursor: pointer;
}
.file-upload.is-invalid {
  border-color: #dc3545;
}

:deep(.ql-toolbar) {
  border-top-left-radius: 0.25rem;
  border-top-right-radius: 0.25rem;
}
:deep(.ql-container) {
  border-bottom-left-radius: 0.25rem;
  border-bottom-right-radius: 0.25rem;
  min-height: 150px;
}

.default-btn .spinner-border {
  margin-right: 5px;
  vertical-align: text-bottom;
}
</style>
