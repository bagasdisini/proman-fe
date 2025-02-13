<template>
  <div class="row">
    <div class="col-lg-6 col-xxxl-3">
      <div class="card mb-25 border-0 rounded-0 bg-white kanban-title-card">
        <div class="card-body p-15 p-sm-20 letter-spacing">
          <div class="d-flex align-items-center justify-content-between">
            <h5 class="card-title fw-bold mb-0 fs-lg-18">In Progress</h5>
          </div>
        </div>
      </div>
      <div class="card mb-25 border-0 rounded-0 bg-white kanban-card">
        <div class="card-body p-15 p-sm-20 letter-spacing">
          <div class="mb-10 d-flex align-items-center justify-content-between">
            <span class="d-block fs-md-15 fw-bold text-black"
              >Design Update</span
            >
            <div class="users-list d-flex align-items-center">
              <div class="rounded-circle text-center">
                <img
                  src="../../assets/images/user/user14.jpg"
                  class="rounded-circle"
                  alt="user"
                />
              </div>
              <div
                class="rounded-circle bg-primary-emphasis text-center d-flex align-items-center justify-content-center text-white fs-15 fw-semibold"
              >
                P
              </div>
            </div>
          </div>
          <p class="text-paragraph lh-base fs-md-15">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam non
            magna imperdiet.
          </p>
          <div
            class="mt-15 info d-flex align-items-center justify-content-between"
          >
            <span class="d-block text-danger position-relative"
              ><i class="ph ph-clock"></i> 2d due</span
            >
          </div>
        </div>
      </div>
      <div class="card mb-25 border-0 rounded-0 bg-white kanban-card">
        <div class="card-body p-15 p-sm-20 letter-spacing">
          <div class="mb-10 d-flex align-items-center justify-content-between">
            <span class="d-block fs-md-15 fw-bold text-black"
              >Dashboard Code Update</span
            >
            <div class="users-list d-flex align-items-center">
              <div class="rounded-circle text-center">
                <img
                  src="../../assets/images/user/user12.jpg"
                  class="rounded-circle"
                  alt="user"
                />
              </div>
              <div
                class="rounded-circle bg-warning text-center d-flex align-items-center justify-content-center text-white fs-15 fw-semibold"
              >
                A
              </div>
            </div>
          </div>
          <p class="text-paragraph lh-base fs-md-15">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam non
            magna imperdiet.
          </p>
          <div
            class="mt-15 info d-flex align-items-center justify-content-between"
          >
            <span class="d-block text-danger position-relative"
              ><i class="ph ph-clock"></i> 3d due</span
            >
          </div>
        </div>
      </div>
      <div class="card mb-25 border-0 rounded-0 bg-white kanban-card">
        <div class="card-body p-15 p-sm-20 letter-spacing">
          <div class="mb-10 d-flex align-items-center justify-content-between">
            <span class="d-block fs-md-15 fw-bold text-black"
              >Social Media Campaign</span
            >
            <div class="users-list d-flex align-items-center">
              <div class="rounded-circle text-center">
                <img
                  src="../../assets/images/user/user11.jpg"
                  class="rounded-circle"
                  alt="user"
                />
              </div>
              <div
                class="rounded-circle bg-primary-emphasis text-center d-flex align-items-center justify-content-center text-white fs-15 fw-semibold"
              >
                P
              </div>
            </div>
          </div>
          <p class="text-paragraph lh-base fs-md-15">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam non
            magna imperdiet.
          </p>
          <div
            class="mt-15 info d-flex align-items-center justify-content-between"
          >
            <span class="d-block text-danger position-relative"
              ><i class="ph ph-clock"></i> 3d due</span
            >
          </div>
        </div>
      </div>
      <a
        href="#"
        class="add-another-task-btn mb-25 letter-spacing d-block w-100 fs-md-15 fw-medium text-center text-decoration-none position-relative bg-white transition text-success"
        data-bs-toggle="modal"
        data-bs-target="#addTaskModal"
      >
        Add Another Task <i class="ph-bold ph-plus"></i>
      </a>
    </div>
    <div class="col-lg-6 col-xxxl-3">
      <div class="card mb-25 border-0 rounded-0 bg-white kanban-title-card">
        <div class="card-body p-15 p-sm-20 letter-spacing">
          <div class="d-flex align-items-center justify-content-between">
            <h5 class="card-title fw-bold mb-0 fs-lg-18">In Testing</h5>
          </div>
        </div>
      </div>
      <div class="card mb-25 border-0 rounded-0 bg-white kanban-card">
        <div class="card-body p-15 p-sm-20 letter-spacing">
          <div class="mb-10 d-flex align-items-center justify-content-between">
            <span class="d-block fs-md-15 fw-bold text-black"
              >Coding Sprint</span
            >
            <div class="users-list d-flex align-items-center">
              <div class="rounded-circle text-center">
                <img
                  src="../../assets/images/user/user4.jpg"
                  class="rounded-circle"
                  alt="user"
                />
              </div>
            </div>
          </div>
          <p class="text-paragraph lh-base fs-md-15">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam non
            magna imperdiet.
          </p>
          <div
            class="mt-15 info d-flex align-items-center justify-content-between"
          >
            <span class="d-block text-danger position-relative"
              ><i class="ph ph-clock"></i> 1d due</span
            >
          </div>
        </div>
      </div>
      <div class="card mb-25 border-0 rounded-0 bg-white kanban-card">
        <div class="card-body p-15 p-sm-20 letter-spacing">
          <div class="mb-10 d-flex align-items-center justify-content-between">
            <span class="d-block fs-md-15 fw-bold text-black"
              >Developer Hands-off</span
            >
            <div class="users-list d-flex align-items-center">
              <div class="rounded-circle text-center">
                <img
                  src="../../assets/images/user/user3.jpg"
                  class="rounded-circle"
                  alt="user"
                />
              </div>
              <div
                class="rounded-circle bg-info text-center d-flex align-items-center justify-content-center text-white fs-15 fw-semibold"
              >
                C
              </div>
            </div>
          </div>
          <p class="text-paragraph lh-base fs-md-15">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam non
            magna imperdiet.
          </p>
          <div
            class="mt-15 info d-flex align-items-center justify-content-between"
          >
            <span class="d-block text-danger position-relative"
              ><i class="ph ph-clock"></i> 3d due</span
            >
          </div>
        </div>
      </div>
      <div class="card mb-25 border-0 rounded-0 bg-white kanban-card">
        <div class="card-body p-15 p-sm-20 letter-spacing">
          <div class="mb-10 d-flex align-items-center justify-content-between">
            <span class="d-block fs-md-15 fw-bold text-black"
              >Frontend Design Update</span
            >
            <div class="users-list d-flex align-items-center">
              <div class="rounded-circle text-center">
                <img
                  src="../../assets/images/user/user14.jpg"
                  class="rounded-circle"
                  alt="user"
                />
              </div>
              <div
                class="rounded-circle bg-primary-emphasis text-center d-flex align-items-center justify-content-center text-white fs-15 fw-semibold"
              >
                P
              </div>
            </div>
          </div>
          <p class="text-paragraph lh-base fs-md-15">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam non
            magna imperdiet.
          </p>
          <div
            class="mt-15 info d-flex align-items-center justify-content-between"
          >
            <span class="d-block text-danger position-relative"
              ><i class="ph ph-clock"></i> 3d due</span
            >
          </div>
        </div>
      </div>
      <div class="card mb-25 border-0 rounded-0 bg-white kanban-card">
        <div class="card-body p-15 p-sm-20 letter-spacing">
          <div class="mb-10 d-flex align-items-center justify-content-between">
            <span class="d-block fs-md-15 fw-bold text-black"
              >Client Meeting</span
            >
            <div class="users-list d-flex align-items-center">
              <div class="rounded-circle text-center">
                <img
                  src="../../assets/images/user/user5.jpg"
                  class="rounded-circle"
                  alt="user"
                />
              </div>
              <div
                class="rounded-circle bg-danger text-center d-flex align-items-center justify-content-center text-white fs-15 fw-semibold"
              >
                D
              </div>
            </div>
          </div>
          <p class="text-paragraph lh-base fs-md-15">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam non
            magna imperdiet.
          </p>
          <div
            class="mt-15 info d-flex align-items-center justify-content-between"
          >
            <span class="d-block text-danger position-relative"
              ><i class="ph ph-clock"></i> 2d due</span
            >
          </div>
        </div>
      </div>
      <div class="card mb-25 border-0 rounded-0 bg-white kanban-card">
        <div class="card-body p-15 p-sm-20 letter-spacing">
          <div class="mb-10 d-flex align-items-center justify-content-between">
            <span class="d-block fs-md-15 fw-bold text-black"
              >CRM Project Estimation</span
            >
            <div class="users-list d-flex align-items-center">
              <div class="rounded-circle text-center">
                <img
                  src="../../assets/images/user/user12.jpg"
                  class="rounded-circle"
                  alt="user"
                />
              </div>
              <div
                class="rounded-circle bg-primary-emphasis text-center d-flex align-items-center justify-content-center text-white fs-15 fw-semibold"
              >
                P
              </div>
            </div>
          </div>
          <p class="text-paragraph lh-base fs-md-15">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam non
            magna imperdiet.
          </p>
          <div
            class="mt-15 info d-flex align-items-center justify-content-between"
          >
            <span class="d-block text-danger position-relative"
              ><i class="ph ph-clock"></i> 3d due</span
            >
          </div>
        </div>
      </div>
      <div class="card mb-25 border-0 rounded-0 bg-white kanban-card">
        <div class="card-body p-15 p-sm-20 letter-spacing">
          <div class="mb-10 d-flex align-items-center justify-content-between">
            <span class="d-block fs-md-15 fw-bold text-black">Site Update</span>
            <div class="users-list d-flex align-items-center">
              <div class="rounded-circle text-center">
                <img
                  src="../../assets/images/user/user11.jpg"
                  class="rounded-circle"
                  alt="user"
                />
              </div>
              <div
                class="rounded-circle bg-primary-emphasis text-center d-flex align-items-center justify-content-center text-white fs-15 fw-semibold"
              >
                A
              </div>
            </div>
          </div>
          <p class="text-paragraph lh-base fs-md-15">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam non
            magna imperdiet.
          </p>
          <div
            class="mt-15 info d-flex align-items-center justify-content-between"
          >
            <span class="d-block text-danger position-relative"
              ><i class="ph ph-clock"></i> 3d due</span
            >
          </div>
        </div>
      </div>
    </div>
    <div class="col-lg-6 col-xxxl-3">
      <div class="card mb-25 border-0 rounded-0 bg-white kanban-title-card">
        <div class="card-body p-15 p-sm-20 letter-spacing">
          <div class="d-flex align-items-center justify-content-between">
            <h5 class="card-title fw-bold mb-0 fs-lg-18">Completed</h5>
          </div>
        </div>
      </div>
      <div class="card mb-25 border-0 rounded-0 bg-white kanban-card">
        <div class="card-body p-15 p-sm-20 letter-spacing">
          <div class="mb-10 d-flex align-items-center justify-content-between">
            <span class="d-block fs-md-15 fw-bold text-black"
              >Marketing Content Update</span
            >
            <div class="users-list d-flex align-items-center">
              <div class="rounded-circle text-center">
                <img
                  src="../../assets/images/user/user14.jpg"
                  class="rounded-circle"
                  alt="user"
                />
              </div>
              <div
                class="rounded-circle bg-primary-emphasis text-center d-flex align-items-center justify-content-center text-white fs-15 fw-semibold"
              >
                P
              </div>
            </div>
          </div>
          <p class="text-paragraph lh-base fs-md-15">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam non
            magna imperdiet.
          </p>
          <div
            class="mt-15 info d-flex align-items-center justify-content-between"
          >
            <span class="d-block text-danger position-relative"
              ><i class="ph ph-clock"></i> 2d due</span
            >
          </div>
        </div>
      </div>
      <div class="card mb-25 border-0 rounded-0 bg-white kanban-card">
        <div class="card-body p-15 p-sm-20 letter-spacing">
          <div class="mb-10 d-flex align-items-center justify-content-between">
            <span class="d-block fs-md-15 fw-bold text-black"
              >Backend Coding push</span
            >
            <div class="users-list d-flex align-items-center">
              <div class="rounded-circle text-center">
                <img
                  src="../../assets/images/user/user12.jpg"
                  class="rounded-circle"
                  alt="user"
                />
              </div>
              <div
                class="rounded-circle bg-warning text-center d-flex align-items-center justify-content-center text-white fs-15 fw-semibold"
              >
                A
              </div>
            </div>
          </div>
          <p class="text-paragraph lh-base fs-md-15">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam non
            magna imperdiet.
          </p>
          <div
            class="mt-15 info d-flex align-items-center justify-content-between"
          >
            <span class="d-block text-danger position-relative"
              ><i class="ph ph-clock"></i> 3d due</span
            >
          </div>
        </div>
      </div>
      <div class="card mb-25 border-0 rounded-0 bg-white kanban-card">
        <div class="card-body p-15 p-sm-20 letter-spacing">
          <div class="mb-10 d-flex align-items-center justify-content-between">
            <span class="d-block fs-md-15 fw-bold text-black"
              >LMS Dashboard Update</span
            >
            <div class="users-list d-flex align-items-center">
              <div class="rounded-circle text-center">
                <img
                  src="../../assets/images/user/user11.jpg"
                  class="rounded-circle"
                  alt="user"
                />
              </div>
              <div
                class="rounded-circle bg-primary-emphasis text-center d-flex align-items-center justify-content-center text-white fs-15 fw-semibold"
              >
                P
              </div>
            </div>
          </div>
          <p class="text-paragraph lh-base fs-md-15">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam non
            magna imperdiet.
          </p>
          <div
            class="mt-15 info d-flex align-items-center justify-content-between"
          >
            <span class="d-block text-danger position-relative"
              ><i class="ph ph-clock"></i> 3d due</span
            >
          </div>
        </div>
      </div>
    </div>
    <div class="col-lg-6 col-xxxl-3">
      <div class="card mb-25 border-0 rounded-0 bg-white kanban-title-card">
        <div class="card-body p-15 p-sm-20 letter-spacing">
          <div class="d-flex align-items-center justify-content-between">
            <h5 class="card-title fw-bold mb-0 fs-lg-18">Canceled</h5>
          </div>
        </div>
      </div>
      <div class="card mb-25 border-0 rounded-0 bg-white kanban-card">
        <div class="card-body p-15 p-sm-20 letter-spacing">
          <div class="mb-10 d-flex align-items-center justify-content-between">
            <span class="d-block fs-md-15 fw-bold text-black">Frontend</span>
            <div class="users-list d-flex align-items-center">
              <div class="rounded-circle text-center">
                <img
                  src="../../assets/images/user/user14.jpg"
                  class="rounded-circle"
                  alt="user"
                />
              </div>
              <div
                class="rounded-circle bg-primary-emphasis text-center d-flex align-items-center justify-content-center text-white fs-15 fw-semibold"
              >
                P
              </div>
            </div>
          </div>
          <p class="text-paragraph lh-base fs-md-15">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam non
            magna imperdiet.
          </p>
          <div
            class="mt-15 info d-flex align-items-center justify-content-between"
          >
            <span class="d-block text-danger position-relative"
              ><i class="ph ph-clock"></i> 2d due</span
            >
          </div>
        </div>
      </div>
      <div class="card mb-25 border-0 rounded-0 bg-white kanban-card">
        <div class="card-body p-15 p-sm-20 letter-spacing">
          <div class="mb-10 d-flex align-items-center justify-content-between">
            <span class="d-block fs-md-15 fw-bold text-black"
              >E-commerce Site</span
            >
            <div class="users-list d-flex align-items-center">
              <div class="rounded-circle text-center">
                <img
                  src="../../assets/images/user/user12.jpg"
                  class="rounded-circle"
                  alt="user"
                />
              </div>
              <div
                class="rounded-circle bg-warning text-center d-flex align-items-center justify-content-center text-white fs-15 fw-semibold"
              >
                A
              </div>
            </div>
          </div>
          <p class="text-paragraph lh-base fs-md-15">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam non
            magna imperdiet.
          </p>
          <div
            class="mt-15 info d-flex align-items-center justify-content-between"
          >
            <span class="d-block text-danger position-relative"
              ><i class="ph ph-clock"></i> 3d due</span
            >
          </div>
        </div>
      </div>
      <div class="card mb-25 border-0 rounded-0 bg-white kanban-card">
        <div class="card-body p-15 p-sm-20 letter-spacing">
          <div class="mb-10 d-flex align-items-center justify-content-between">
            <span class="d-block fs-md-15 fw-bold text-black"
              >Web Design Team</span
            >
            <div class="users-list d-flex align-items-center">
              <div class="rounded-circle text-center">
                <img
                  src="../../assets/images/user/user11.jpg"
                  class="rounded-circle"
                  alt="user"
                />
              </div>
              <div
                class="rounded-circle bg-primary-emphasis text-center d-flex align-items-center justify-content-center text-white fs-15 fw-semibold"
              >
                P
              </div>
            </div>
          </div>
          <p class="text-paragraph lh-base fs-md-15">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam non
            magna imperdiet.
          </p>
          <div
            class="mt-15 info d-flex align-items-center justify-content-between"
          >
            <span class="d-block text-danger position-relative"
              ><i class="ph ph-clock"></i> 3d due</span
            >
          </div>
        </div>
      </div>
      <div class="card mb-25 border-0 rounded-0 bg-white kanban-card">
        <div class="card-body p-15 p-sm-20 letter-spacing">
          <div class="mb-10 d-flex align-items-center justify-content-between">
            <span class="d-block fs-md-15 fw-bold text-black"
              >Dashboard Design</span
            >
            <div class="users-list d-flex align-items-center">
              <div class="rounded-circle text-center">
                <img
                  src="../../assets/images/user/user11.jpg"
                  class="rounded-circle"
                  alt="user"
                />
              </div>
              <div
                class="rounded-circle bg-primary-emphasis text-center d-flex align-items-center justify-content-center text-white fs-15 fw-semibold"
              >
                P
              </div>
            </div>
          </div>
          <p class="text-paragraph lh-base fs-md-15">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam non
            magna imperdiet.
          </p>
          <div
            class="mt-15 info d-flex align-items-center justify-content-between"
          >
            <span class="d-block text-danger position-relative"
              ><i class="ph ph-clock"></i> 3d due</span
            >
          </div>
        </div>
      </div>
      <div class="card mb-25 border-0 rounded-0 bg-white kanban-card">
        <div class="card-body p-15 p-sm-20 letter-spacing">
          <div class="mb-10 d-flex align-items-center justify-content-between">
            <span class="d-block fs-md-15 fw-bold text-black"
              >Coding Bootcamp</span
            >
            <div class="users-list d-flex align-items-center">
              <div class="rounded-circle text-center">
                <img
                  src="../../assets/images/user/user11.jpg"
                  class="rounded-circle"
                  alt="user"
                />
              </div>
              <div
                class="rounded-circle bg-primary-emphasis text-center d-flex align-items-center justify-content-center text-white fs-15 fw-semibold"
              >
                P
              </div>
            </div>
          </div>
          <p class="text-paragraph lh-base fs-md-15">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam non
            magna imperdiet.
          </p>
          <div
            class="mt-15 info d-flex align-items-center justify-content-between"
          >
            <span class="d-block text-danger position-relative"
              ><i class="ph ph-clock"></i> 3d due</span
            >
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="modal fade" id="addTaskModal" tabindex="-1" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header me-md-20 ms-md-20">
          <h1 class="modal-title fs-5">Add New Task</h1>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body me-md-20 ms-md-20">
          <form>
            <div class="mb-mb-15 mb-md-20">
              <label for="titleTask" class="form-label fw-medium">Title</label>
              <input
                type="text"
                class="form-control shadow-none text-black fs-md-15 fs-lg-16"
                id="titleTask"
              />
            </div>
            <div class="mb-mb-15 mb-md-20">
              <label for="descTask" class="form-label fw-medium"
                >Description</label
              >
              <textarea
                class="form-control shadow-none fs-md-15 text-black"
                id="descTask"
                rows="3"
              ></textarea>
            </div>
            <div class="mb-mb-15 mb-md-20 row">
              <div class="col-md-6">
                <div class="form-group mb-15 mb-sm-20 mb-md-25">
                  <label
                    class="d-block text-black fw-semibold mb-10"
                    for="startDate"
                  >
                    Start Date
                  </label>
                  <input
                    type="date"
                    class="form-control shadow-none text-black fs-md-15"
                    id="startDate"
                  />
                </div>
              </div>
              <div class="col-md-6">
                <div class="form-group mb-15 mb-sm-20 mb-md-25">
                  <label
                    class="d-block text-black fw-semibold mb-10"
                    for="endDate"
                  >
                    End Date
                  </label>
                  <input
                    type="date"
                    class="form-control shadow-none text-black fs-md-15"
                    id="endDate"
                  />
                </div>
              </div>
            </div>
            <div class="mb-mb-15 mb-md-20">
              <label for="descTask" class="form-label fw-medium"
                >Contributor</label
              >
              <div class="selected-contributors">
                <span
                  v-for="(contributor, index) in selected"
                  :key="index"
                  class="selected-contributor"
                >
                  {{ contributor }}
                  <button
                    class="remove-button"
                    @click="removeContributor(index)"
                  >
                    &times;
                  </button>
                </span>
              </div>
              <input
                v-model="search"
                class="form-control fs-md-15 text-black shadow-none"
                @keyup.enter="addContributor"
                list="datalistOptions"
                id="dataList"
                placeholder="Type to search..."
              />
              <datalist id="datalistOptions">
                <option
                  v-for="(contributor, index) in availableOptions"
                  :key="index"
                  :value="contributor"
                ></option>
              </datalist>
            </div>
            <div class="mb-mb-15 mb-md-20">
              <label for="descTask" class="form-label fw-medium">Status</label>
              <select
                class="form-select shadow-none text-black fs-md-15"
                disabled
              >
                <option value="1">Progress</option>
                <option value="2">Testing</option>
                <option value="3">Done</option>
                <option value="4">Canceled</option>
              </select>
            </div>
          </form>
        </div>
        <div class="modal-footer me-md-20 ms-md-20">
          <button
            type="button"
            class="btn btn-secondary"
            data-bs-dismiss="modal"
          >
            Close
          </button>
          <button type="button" class="btn btn-primary" data-bs-dismiss="modal">
            Create
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";

export default {
  name: "TaskList",
  data() {
    const search = ref("");
    const availableOptions = [
      "San Francisco",
      "New York",
      "Seattle",
      "Los Angeles",
      "Chicago",
    ];
    const selected = ["San Francisco"];

    return {
      search,
      selected,
      availableOptions,
    };
  },
  methods: {
    addContributor() {
      if (this.search) {
        this.selected.push(this.search);
        this.search = "";
      }
    },
    removeContributor(index) {
      this.selected.splice(index, 1);
    },
  },
};
</script>

<style scoped>
.selected-contributors {
  display: flex;
  flex-wrap: wrap;
  margin-top: 10px;
}

.selected-contributor {
  background-color: #f0f0f0;
  border-radius: 4px;
  padding: 5px 10px;
  margin-right: 5px;
  margin-bottom: 5px;
}

.remove-button {
  margin-left: 5px;
  border: none;
  background-color: transparent;
  color: #888;
  cursor: pointer;
}
</style>
