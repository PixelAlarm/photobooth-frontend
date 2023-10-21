import { defineStore } from "pinia";
import { api } from "src/boot/axios";
import { ref } from "vue";
import { Notify } from "quasar";

export const useMainStore = defineStore("main-store", () => {
  //session data only (graph history, ...)
  const stats = ref({
    sharpness: [],
    geolocation: {},
    metadata: {},
  });

  const logrecords = ref([]);

  const information = ref({
    cpu1_5_15: [null, null, null],
    active_threads: null,
    memory: {
      total: null,
      available: null,
      percent: null,
      used: null,
      free: null,
    },
    cma: {
      CmaTotal: null,
      CmaFree: null,
    },
    disk: {
      total: null,
      used: null,
      free: null,
      percent: null,
    },
    imageserver_stats: {
      primary: null,
      secondary: null,
    },
    version: null,
    platform_system: null,
    platform_release: null,
    platform_machine: null,
    platform_python_version: null,
    platform_node: null,
    platform_cpu_count: null,
    data_directory: null,
    python_executable: null,
  });

  const lastHeartbeat = ref(null);

  return {
    stats,
    information,
    lastHeartbeat,
    logrecords,
  };
});
