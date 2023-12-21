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
    <div>
    <h2>Danke für Ihre Bestellung!</h2>
    <h5 class="pt-3">Sie haben {{ getSelectedSeats() }} Ticket(s) für {{ getSelectedSeats() * 10 }} Euro gekauft.</h5>
    <h6 class="pt-5">Zusammenfassung:</h6>
    <div class="pt-2 pb-5">
    Tickets: {{ getSelectedSeats() }} x 10 Euro<br>
    davon MwSt.: {{ getSelectedSeats() * 10 * 0.19 }} Euro<br>
    Gesamt: {{ getSelectedSeats() * 10 }} Euro
    </div>
    <a href="/" class="btn btn-primary mt-5" @click="deleteBoughtItem">Zurück zur Homepage</a>
    </div>`,
};
