export default {
  data() {
    return {
      entries: [],
    };
  },
  created() {
    this.loadSeats();
  },
  methods: {
    loadSeats() {
      let url = new URL(origin + '/api/seat');
      fetch(url)
        .then(response => response.json())
        .then(data => (this.entries = data))
        .catch(error => console.error('Fehler beim Laden der Daten:', error));
    },
    toggleSeatStatus(entry) {
      if (entry.status === 'selected') {
        entry.status = 'available';
        this.updateSeatStatus(entry);
      } else {

        entry.status = 'selected';
        this.updateSeatStatus(entry);
      }
    },
    updateSeatStatus(entry) {
      if (entry.status !== 'occupied') {
        this.saveUpdatedSeat(entry); 
      }
    },
    getSeatColor(status) {
      switch (status) {
        case 'selected':
          return 'green';
        case 'occupied':
          return 'black';
        default:
          return 'blue';
      }
    },
    addSeat() {
      this.$router.push('/add-seat')
    },
    changeStatus(entry) {
      entry.status = 'selected';

      console.log('Status geändert:', entry.status);
      this.saveUpdatedSeat(entry);
    },
    saveUpdatedSeat(entry) {
      fetch(`/api/seat/update/${entry.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: entry.status }),
      })
        .then(response => response.json())
        .then(updatedSeat => {
          console.log('Sitzplatz erfolgreich aktualisiert:', updatedSeat);
        })
        .catch(error => {
          console.error('Fehler beim Aktualisieren des Sitzplatzes:', error);
        });
    },
    occupySelectedSeats() {
      this.entries.forEach(entry => {
        if (entry.status === 'selected') {
          entry.status = 'occupied';
          this.saveUpdatedSeat(entry);
        }
      });
    },
    countSelectedSeats() {
      return this.entries.filter(entry => entry.status === 'selected').length * 10;
    },
    handleOccupiedSeatClick(entry) {
      console.log('Klick auf occupied Sitzplatz:', entry);
    },
  },
  template: `
    <div class="container">
    <h1>Sitzplätze</h1>
    <h2>Leinwand</h2>
  

    <div class="item-content row">
    <div class="col-4 p-0" v-for="entry in entries" :key="entry.id">
      <button
        v-if="entry.status !== 'occupied'"
        type="button"
        class="seat-button"
        :style="{ backgroundColor: getSeatColor(entry.status), height: '30px', width: '30px' }"
        @click="toggleSeatStatus(entry)"
      ></button>
      <button
        v-else
        type="button"
        class="seat-button-occupied"
        :style="{ backgroundColor: getSeatColor(entry.status), height: '30px', width: '30px' }"
        @click="handleOccupiedSeatClick(entry)"
      ></button>
    </div>
  </div>

  <div>
      Kosten: {{ countSelectedSeats() }} Euro
    </div>

    <button @click="addSeat">Sitzplatz hinzufügen</button>
    <button @click="occupySelectedSeats">Kostenpflichtig kaufen</button>
  </div>
    `,
};
