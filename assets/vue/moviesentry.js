export default {
  props: ['movie','venue'],
  data() {
    return {
      dialog: false,
    };
  },
  methods: {
      toggleDialog() {
          this.dialog = !this.dialog;
      },
      hasVenue() {
        if (this.venue === undefined || this.venue === null) {
          console.error('Venue ist nicht verfügbar!', this.movie);
          return false;
        }
        return true;
      },
      buyTickets(venueEntry) {
        this.$root.selectedVenueId = venueEntry.id;
        this.navigateToSeatReport();
      },
      navigateToSeatReport() {
        const selectedVenueId = this.$root.selectedVenueId;
        window.location.href = `/seat#/seat/report?selectedVenueId=${selectedVenueId}`;
      },
      formatDate(date) {
        this.dateOutput = true; 
        return new Date(date).toLocaleDateString();
      },
  },
  template: `
  <div class="card mb-3">
  <div class="row g-0">
    <div class="col-md-2">
      <img :src="'https://wetebucket.s3.us-west-2.amazonaws.com/' + movie.image" class="img-fluid rounded-start" alt="...">
    </div>
    <div class="col-md-8">
      <div class="card-body">
        <h5 class="card-title">{{ movie.name }}</h5>
        <p class="card-text">Länge: {{ movie.duration }} Minuten</p>
        <p class="card-text">{{ movie.description }}</p>

        <template v-if="hasVenue()">
        <div v-for="venueEntry in venue" :key="venueEntry.id">
          <template v-if="venueEntry.movie.id === movie.id && !dateOutput">
            <p class="card-text">{{ formatDate(venueEntry.date) }}</p>
          </template>
        </div>
      </template>


        <template v-if="hasVenue()">
            <div class="p-1 d-flex" v-for="venueEntry in venue" :key="venueEntry.id">
              <template v-if="venueEntry.movie.id === movie.id">
              <a href="#" class="btn btn-lg color-sky-blue" @click="buyTickets(venueEntry)">
                  {{ venueEntry.time }}
                  </a>
              </template>
            </div>
          </template>

        <a href="/seat" class="btn btn-primary">Buy Tickets</a>
        <a href="/seat" class="btn btn-primary">Test Button</a>
               
      </div>
    </div>
  </div>
</div>`
};
