import { defineStore } from "pinia";
import { api } from "src/boot/axios";

//https://stackoverflow.com/a/75060220

const STATES = {
  INIT: 0,
  DONE: 1,
  WIP: 2,
  ERROR: 3,
};

export const useUiSettingsStore = defineStore("ui-settings-store", {
  state: () => ({
    uiSettings: {
      show_takepic_on_frontpage: null,
      show_takecollage_on_frontpage: null,
      show_takeanimation_on_frontpage: null,
      show_takevideo_on_frontpage: null,
      show_gallery_on_frontpage: null,
      show_admin_on_frontpage: null,

      livestream_mirror_effect: null,
      FRONTPAGE_TEXT: null,
      TAKEPIC_MSG_TIME: null,
      AUTOCLOSE_NEW_ITEM_ARRIVED: null,

      GALLERY_EMPTY_MSG: null,
      gallery_show_qrcode: null,
      gallery_show_filter: null,
      gallery_filter_userselectable: null,
      gallery_show_download: null,
      gallery_show_delete: null,
      gallery_show_print: null,
    },

    storeState: STATES.INIT,
  }),
  actions: {
    initStore(forceReload = false) {
      console.log("loadUiSettings");
      if (this.isLoaded && forceReload == false) {
        console.log("settings loaded once already, skipping");
        return;
      }

      this.storeState = STATES.WIP;

      api
        .get("/config/ui")
        .then((res) => {
          console.log("loadUiSettings finished successfully");
          console.log(res.data);
          this.uiSettings = res.data;
          this.storeState = STATES.DONE;
        })
        .catch((e) => {
          console.log("loadUiSettings failed");
          this.storeState = STATES.ERROR;
        });
    },
  },
  getters: {
    isLoaded() {
      return this.storeState === STATES.DONE;
    },
    isLoading() {
      return this.storeState === STATES.WIP;
    },
  },
});
