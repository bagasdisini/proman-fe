import { reactive } from "vue";

interface StateStore {
  open: boolean;
  onChange: () => void;
}

const stateStore: StateStore = reactive({
  open: true,
  onChange() {
    stateStore.open = !stateStore.open;
  },
});

export default stateStore;
