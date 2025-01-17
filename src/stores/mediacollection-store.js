import { defineStore } from "pinia";
import { api } from "src/boot/axios";
//https://stackoverflow.com/a/75060220

const STATES = {
  INIT: 0,
  DONE: 1,
  WIP: 2,
  ERROR: 3,
};

export const useMediacollectionStore = defineStore("mediacollection-store", {
  state: () => ({
    collection: [],

    mostRecentItemId: null,

    storeState: STATES.INIT,
  }),
  actions: {
    initStore(forceReload = false) {
      console.log("loading store");
      if (this.isLoaded && forceReload == false) {
        console.log("items loaded once already, skipping");
        return;
      }

      this.storeState = STATES.WIP;

      api
        .get("/mediacollection/getitems")
        .then((response) => {
          console.log(response);
          this.collection = response.data;

          this.storeState = STATES.DONE;

          // if (this.itemId) {
          //   console.log(
          //     `initial id given, try loading image id: ${this.itemId}`
          //   );

          //   //try find it in the index:
          //   const imageIndex = this.store.gallery.images.findIndex(
          //     (item) => item.id === this.itemId
          //   );
          //   if (imageIndex != -1) {
          //     console.log(`found image at index no: ${imageIndex}`);
          //     this.openPic(imageIndex);
          //   } else {
          //     console.error(`initial id given not found: ${this.itemId}`);
          //   }
          // }
        })
        .catch((err) => {
          console.log(err);
          this.storeState = STATES.ERROR;
        });
    },
    getIndexOfItemId(id) {
      return this.collection.findIndex((item) => item.id === id);
    },

    // add new item on first position to store
    addMediaitem(mediaitem) {
      this.collection.unshift(mediaitem);
    },

    // remove mediaitem from store
    removeMediaitem(mediaitem) {
      const removed_mediaitem = this.collection.splice(this.getIndexOfItemId(mediaitem.id), 1);
      if (removed_mediaitem.length == 0) console.log("no item removed from collection, maybe it was deleted by UI earlier already");
      else console.log(`${removed_mediaitem.length} mediaitem deleted`);
    },
  },
  getters: {
    isLoaded() {
      return this.storeState === STATES.DONE;
    },
    isLoading() {
      return this.storeState === STATES.WIP;
    },

    collection_number_of_items() {
      //return Object.keys(this.collection).length;
      return this.collection.length;
    },
  },
});
