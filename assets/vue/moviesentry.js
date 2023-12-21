export default {
  props: ['movie'],
  data() {
    return {
      dialog: false,
    };
  },
  methods: {
      toggleDialog() {
          this.dialog = !this.dialog;
      }
  },
  template: `
  <div class="card mb-3">
  <div class="row g-0">
    <div class="col-md-2">
      <img src="https://cdn.vuetifyjs.com/images/cards/docks.jpg" class="img-fluid rounded-start" alt="...">
    </div>
    <div class="col-md-8">
      <div class="card-body">
        <h5 class="card-title">{{ movie.name }}</h5>
        <p class="card-text">Länge: {{ movie.duration }} Minuten</p>
        <p class="card-text">{{ movie.description }}</p>
        <a href="/seat" class="btn btn-primary">Buy Tickets</a>
      </div>
    </div>
  </div>
</div>`
};
