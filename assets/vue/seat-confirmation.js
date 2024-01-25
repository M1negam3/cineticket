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
    }
  },
  template: `
    <div class="d-flex flex-column align-center">
      <div>
        <h1 class="headlines">Danke für Ihre Bestellung!</h1>
        <div class="movies-list-container">
        <div class="d-flex flex-column align-center">
        <div>
        <h5 class="pt-3">Sie haben {{ getSelectedSeats() }} Ticket(s) für {{ getSelectedSeats() * 10 }} Euro gekauft.</h5>
        </div>
            <div class="pt-2 pb-5">
              <h6 class="pt-5">Zusammenfassung:</h6>
              Tickets: {{ getSelectedSeats() }} x 10 Euro<br>
              davon MwSt.: {{ getSelectedSeats() * 10 * 0.19 }} Euro<br>
              Gesamt: {{ getSelectedSeats() * 10 }} Euro
            </div>
          </div>
          <a href="/" class="btn btn-primary mt-5" @click="deleteBoughtItem">Zurück zur Homepage</a>
        </div>
      </div>
    </div>`,
};
