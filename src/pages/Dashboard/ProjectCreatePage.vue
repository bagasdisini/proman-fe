<template>
  <div class="card mb-25 border-0 rounded-0 bg-white create-new-project-box">
    <div class="card-body p-15 p-sm-20 p-md-25 p-lg-30 letter-spacing">
      <form>
        <div class="row">
          <div class="col-md-12">
            <div class="form-group mb-15 mb-sm-20 mb-md-25">
              <label class="d-block text-black fw-semibold mb-10">
                Project Title
              </label>
              <input
                class="form-control shadow-none rounded-0 text-black"
                placeholder="e.g. AI Machine Learning"
                type="text"
              />
            </div>
          </div>
          <div class="col-md-12">
            <div class="form-group mb-15 mb-sm-20 mb-md-25">
              <label class="d-block text-black fw-semibold mb-10">
                Project Description
              </label>
              <div class="mb-0">
                <QuillEditor
                  placeholder="Write your meta description"
                  theme="snow"
                  toolbar="full"
                />
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
                  class="form-control shadow-none rounded-0 text-black"
                  type="date"
                />
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
                  class="form-control shadow-none rounded-0 text-black"
                  type="date"
                />
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
                  class="form-select shadow-none text-black fs-md-15"
                >
                  <option value="frontend">Frontend</option>
                  <option value="backend">Backend</option>
                  <option value="review">Review</option>
                  <option value="presentation">Presentation</option>
                  <option value="etc">Etc</option>
                </select>
              </div>
            </div>
          </div>
          <div class="col-md-12">
            <div class="form-group mb-15 mb-sm-20 mb-md-25">
              <label class="d-block text-black fw-semibold mb-10">
                Add Team Members
              </label>
              <select class="form-select shadow-none fw-semibold rounded-0">
                <option selected>Victor James</option>
                <option value="1">James Andy</option>
                <option value="2">Alina Smith</option>
                <option value="3">David Warner</option>
                <option value="4">Adam Smith</option>
                <option value="5">Jonathon Ronan</option>
              </select>
            </div>
          </div>
          <div class="col-md-12">
            <div class="form-group mb-15 mb-sm-20 mb-md-25">
              <label class="d-block text-black fw-semibold mb-10">
                Project Preview Image
              </label>
            </div>
          </div>
          <div class="col-md-12">
            <div class="form-group mb-15 mb-sm-20 mb-md-25">
              <label class="d-block text-black fw-semibold mb-10">
                Attached Files
              </label>
              <div class="file-upload text-center position-relative">
                <span class="d-block text-muted">
                  Drop Files Here Or
                  <span class="text-black fw-medium position-relative">
                    Click To Upload
                  </span>
                </span>
                <input
                  class="d-block shadow-none border-0 position-absolute start-0 end-0 top-0 bottom-0 z-1 opacity-0"
                  type="file"
                />
              </div>
            </div>
          </div>
          <div class="col-md-12">
            <button
              class="default-btn transition border-0 fw-medium text-white pt-10 pb-10 ps-25 pe-25 pt-md-11 pb-md-11 ps-md-35 pe-md-35 rounded-1 fs-md-15 fs-lg-16 bg-success"
              type="submit"
            >
              Create Project
            </button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "CreateNewProject",
});
</script>
