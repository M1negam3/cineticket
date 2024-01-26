export default {
  data() {
    return {
    };
  },
  created() {

  },
  methods: {
    getSelectedSeats() {
      return localStorage.getItem("ticketsBought");
    },
    deleteBoughtItem() {
      localStorage.removeItem("ticketsBought");
    },
    formatCurrency(number) {
      return new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(number);
    }
  },
  template: `
    <div class="d-flex flex-column align-center">
      <div>
        <h1 class="headlines text-center">Danke für Ihre Bestellung!</h1>
        <div class="movies-list-container">
          <div class="d-flex flex-column align-center">
            <div class="card mt-5 mb-5 fs-4">
              <div class="card-body p-5">
                <strong>Tickets</strong>: {{ getSelectedSeats() }} x {{ formatCurrency(10) }}<br>
                <strong>davon MwSt.</strong>: {{ formatCurrency(getSelectedSeats() * 10 * 0.19) }}<br>
                <strong>Gesamt</strong>: {{ formatCurrency(getSelectedSeats() * 10) }}
              </div>
            </div>
            <a href="/" class="btn btn-lg color-sky-blue" @click="deleteBoughtItem">Zurück zur Homepage</a>
          </div>
        </div>
      </div>
    </div>`,
};
