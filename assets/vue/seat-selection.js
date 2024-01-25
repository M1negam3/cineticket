export default {
    data() {
      return {
        seats: '',
      };
    },
    created() {
      // Fetch seat data from the server
      fetch('/seat/list')
        .then(response => response.json())
        .then(data => (this.seats = data.seats))
        .catch(error => {
          console.error('Fehler beim Abrufen der Sitzplätze:', error);
        });
    },
    methods: {
      selectSeat(seatId) {
        // Handle seat selection logic
        console.log(`Sitzplatz ausgewählt: ${seatId}`);
        // You can also send the selection to the server here
        
      },
      navigateToAddSeats() {
          // Hier wird auf die Route "/add-seats" navigiert
          this.$router.push('/add-seats');
        },
    },
    template: `
    <div>
      <h2>Verfügbare Sitzplätze</h2>
      <ul>
        <li v-for="(seat, index) in seats" :key="index">
          {{ seat.name }} - {{ seat.status }}
          <button @click="selectSeat(seat.id)" :disabled="seat.status !== 'available'">Auswählen</button>
        </li>
      </ul>
      <h2>Sitzplätze hinzufügen</h2>
      <router-link to="/add-seats">Sitzplätze hinzufügen</router-link>
      <!-- Debugging-Ausgabe als JSON -->
      <pre>{{ JSON.stringify($data, null, 2) }}</pre>
    </div>
  `,
  };
  