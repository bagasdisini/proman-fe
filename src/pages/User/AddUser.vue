<template>
  <div class="card mb-25 border-0 rounded-0 bg-white add-user-card">
    <div class="card-body p-15 p-sm-20 p-md-25 p-lg-30 letter-spacing">
      <form>
        <div class="row">
          <div class="col-md-6">
            <div class="form-group mb-15 mb-sm-20 mb-md-25">
              <label class="d-block text-black fw-semibold mb-10">
                First Name
              </label>
              <input
                class="form-control shadow-none rounded-0 text-black"
                placeholder="e.g. Adam"
                type="text"
              />
            </div>
          </div>
          <div class="col-md-6">
            <div class="form-group mb-15 mb-sm-20 mb-md-25">
              <label class="d-block text-black fw-semibold mb-10">
                Last Name
              </label>
              <input
                class="form-control shadow-none rounded-0 text-black"
                placeholder="e.g. Smith"
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
                class="form-control shadow-none rounded-0 text-black"
                placeholder="e.g. adam127704@gmail.com"
                type="email"
              />
            </div>
          </div>
          <div class="col-md-6">
            <div class="form-group mb-15 mb-sm-20 mb-md-25">
              <label class="d-block text-black fw-semibold mb-10">
                Phone No
              </label>
              <input
                class="form-control shadow-none rounded-0 text-black"
                placeholder="e.g. +001 321 4567"
                type="text"
              />
            </div>
          </div>
          <div class="col-md-6">
            <div class="form-group mb-15 mb-sm-20 mb-md-25">
              <label class="d-block text-black fw-semibold mb-10">
                Address
              </label>
              <input
                class="form-control shadow-none rounded-0 text-black"
                placeholder="add your address here"
                type="passowrd"
              />
            </div>
          </div>
          <div class="col-md-6">
            <div class="form-group mb-15 mb-sm-20 mb-md-25">
              <label class="d-block text-black fw-semibold mb-10">
                Country
              </label>
              <select class="form-select shadow-none fw-semibold rounded-0">
                <option selected>United States</option>
                <option value="1">Canada</option>
                <option value="2">Germany</option>
                <option value="3">Switzerland</option>
                <option value="4">Australia</option>
                <option value="5">Sweden</option>
              </select>
            </div>
          </div>
          <div class="col-md-12">
            <div class="form-group mb-15 mb-sm-20 mb-md-25">
              <label class="d-block text-black fw-semibold mb-10">
                Add Some Info
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
          <div class="col-md-12">
            <div class="form-group mb-15 mb-sm-20 mb-md-25">
              <label class="d-block text-black fw-semibold mb-10">Status</label>
              <div
                class="form-check fs-md-15 fs-lg-16 text-black mb-0 d-inline-block me-15 me-md-25"
              >
                <input
                  id="activeRadio"
                  checked
                  class="form-check-input shadow-none"
                  name="communicationRadio"
                  type="radio"
                />
                <label class="form-check-label" for="activeRadio">
                  Active
                </label>
              </div>
              <div
                class="form-check fs-md-15 fs-lg-16 text-black mb-0 d-inline-block me-15 me-md-25"
              >
                <input
                  id="deactivatedRadio"
                  class="form-check-input shadow-none"
                  name="communicationRadio"
                  type="radio"
                />
                <label class="form-check-label" for="deactivatedRadio">
                  Deactivated
                </label>
              </div>
              <div
                class="form-check fs-md-15 fs-lg-16 text-black mb-0 d-inline-block me-15 me-md-25"
              >
                <input
                  id="blockedRadio"
                  class="form-check-input shadow-none"
                  name="communicationRadio"
                  type="radio"
                />
                <label class="form-check-label" for="blockedRadio">
                  Blocked
                </label>
              </div>
            </div>
          </div>
          <div class="col-md-12">
            <div class="form-group mb-15 mb-sm-20 mb-md-25">
              <label class="d-block text-black fw-semibold mb-10">
                Designation
              </label>
              <input
                class="form-control shadow-none rounded-0 text-black"
                placeholder="add users designation"
                type="text"
              />
            </div>
          </div>
          <div class="col-md-6">
            <div class="form-group mb-15 mb-sm-20 mb-md-25">
              <label class="d-block text-black fw-semibold mb-10">
                Company Name
              </label>
              <input
                class="form-control shadow-none rounded-0 text-black"
                placeholder="e.g. EnvyTheme Software"
                type="text"
              />
            </div>
          </div>
          <div class="col-md-6">
            <div class="form-group mb-15 mb-sm-20 mb-md-25">
              <label class="d-block text-black fw-semibold mb-10">
                Company Website
              </label>
              <input
                class="form-control shadow-none rounded-0 text-black"
                placeholder="http//website.com"
                type="text"
              />
            </div>
          </div>
          <div class="col-md-12">
            <div class="form-group mb-15 mb-sm-20 mb-md-25">
              <label class="d-block text-black fw-semibold mb-10">
                Who Will Be Able To See Your Profile?
              </label>
              <div
                class="form-check fs-md-15 fs-lg-16 text-black mb-0 d-inline-block me-15 me-md-25"
              >
                <input
                  id="onlyMeRadio"
                  checked
                  class="form-check-input shadow-none"
                  name="communicationRadio"
                  type="radio"
                />
                <label class="form-check-label" for="onlyMeRadio">
                  Only Me
                </label>
              </div>
              <div
                class="form-check fs-md-15 fs-lg-16 text-black mb-0 d-inline-block me-15 me-md-25"
              >
                <input
                  id="onlyFriendsRadio"
                  class="form-check-input shadow-none"
                  name="communicationRadio"
                  type="radio"
                />
                <label class="form-check-label" for="onlyFriendsRadio">
                  Only Friends
                </label>
              </div>
              <div
                class="form-check fs-md-15 fs-lg-16 text-black mb-0 d-inline-block me-15 me-md-25"
              >
                <input
                  id="everyoneRadio"
                  class="form-check-input shadow-none"
                  name="communicationRadio"
                  type="radio"
                />
                <label class="form-check-label" for="everyoneRadio">
                  Everyone
                </label>
              </div>
            </div>
          </div>
          <div class="col-md-12">
            <label class="d-block text-black fw-semibold mb-10">
              Add Social Media Link
            </label>
            <div class="row">
              <div class="col-md-6">
                <div class="form-group mb-15 mb-sm-20 mb-md-25">
                  <div class="input-group">
                    <span
                      class="input-group-text rounded-0 fs-14 fw-bold text-primary"
                    >
                      <i class="ph-bold ph-facebook-logo lh-1 fs-md-18"></i>
                    </span>
                    <input
                      class="form-control shadow-none rounded-0 text-black"
                      placeholder="facebook@example.com"
                      type="text"
                    />
                  </div>
                </div>
              </div>
              <div class="col-md-6">
                <div class="form-group mb-15 mb-sm-20 mb-md-25">
                  <div class="input-group">
                    <span
                      class="input-group-text rounded-0 fs-14 fw-bold text-primary"
                    >
                      <i class="ph-fill ph-twitter-logo lh-1 fs-md-18"></i>
                    </span>
                    <input
                      class="form-control shadow-none rounded-0 text-black"
                      placeholder="twitter@example.com"
                      type="text"
                    />
                  </div>
                </div>
              </div>
              <div class="col-md-6">
                <div class="form-group mb-15 mb-sm-20 mb-md-25">
                  <div class="input-group">
                    <span
                      class="input-group-text rounded-0 fs-14 fw-bold text-primary"
                    >
                      <i class="ph-bold ph-linkedin-logo lh-1 fs-md-18"></i>
                    </span>
                    <input
                      class="form-control shadow-none rounded-0 text-black"
                      placeholder="linkedin@example.com"
                      type="text"
                    />
                  </div>
                </div>
              </div>
              <div class="col-md-6">
                <div class="form-group mb-15 mb-sm-20 mb-md-25">
                  <div class="input-group">
                    <span
                      class="input-group-text rounded-0 fs-14 fw-bold text-primary"
                    >
                      <i class="ph-bold ph-instagram-logo lh-1 fs-md-18"></i>
                    </span>
                    <input
                      class="form-control shadow-none rounded-0 text-black"
                      placeholder="instagram@example.com"
                      type="text"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-md-12">
            <div class="form-group mb-15 mb-sm-20 mb-md-25">
              <label class="d-block text-black fw-semibold mb-10">
                Upload User’s Profile Picture
              </label>
            </div>
          </div>
          <div class="col-md-12">
            <div class="d-flex align-items-center justify-content-between">
              <button
                class="default-btn transition border-0 fw-medium text-white pt-10 pb-10 ps-25 pe-25 pt-md-11 pb-md-11 ps-md-35 pe-md-35 rounded-1 fs-md-15 fs-lg-16 bg-success"
                type="submit"
              >
                Add User
              </button>
              <button
                class="bg-transparent p-0 border-0 text-danger lh-1 fw-medium"
                type="button"
              >
                <i
                  class="flaticon-delete lh-1 me-1 position-relative top-2"
                ></i>
                <span class="position-relative">Cancel</span>
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

export default defineComponent({
  name: "AddUser",
});
</script>
