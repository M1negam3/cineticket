export default {
  data() {
    return {
      categories: [],
      om: "",
    };
  },
  created() {
    let url = new URL(origin + "/api/search");
    fetch(url)
      .then((res) => res.json())
      .then((data) => (this.categories = data));
  },
  methods: {},
  template: `
    <div class="w-75">
      <!-- <div class="pt-5 pb-5">
        <v-carousel>
          <v-carousel-item
            src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
            contain
          ></v-carousel-item>

          <v-carousel-item
            src="https://cdn.vuetifyjs.com/images/cards/hotel.jpg"
            contain
          ></v-carousel-item>

          <v-carousel-item
            src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg"
            contain
          ></v-carousel-item>
        </v-carousel>
      </div> -->
      <div class="mt-2" v-for="movie in categories">
        <moviesentry :movie='movie'></moviesentry>
      </div>
    </div>`,
};
