export default {
  data() {
    return {
      categories: [],
      om: "",
      venues: [],
    };
  },
  created() {
    let url = new URL(origin + "/api/search");
    let venuesUrl = new URL(origin + "/api/search/venues");
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        this.categories = data;})
    fetch(venuesUrl)
    .then((res) => res.json())
    .then((data) => {
      this.venues = data;
      console.log('Venue Daten:', this.venues);});   
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
      <div class="mt-2 movies-list-container" v-for="movie in categories">
        <moviesentry :movie='movie' :venue='venues'></moviesentry>
      </div>
    </div>`,
};
