import { reactive } from "vue";

interface StateStore {
  open: boolean;
  onChange: () => void;
}

const storedState = localStorage.getItem("sidebarState");
const initialState = storedState ? JSON.parse(storedState) : true;

const stateStore: StateStore = reactive({
  open: initialState,
  onChange() {
    stateStore.open = !stateStore.open;
    localStorage.setItem("sidebarState", JSON.stringify(stateStore.open));
  },
});

export default stateStore;
