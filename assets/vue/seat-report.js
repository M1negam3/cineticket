
export default {
  data() {
    return {
      entries: [],
      selectedVenueId: null,
      venueId: null,
    };
  },
 
  created() {
    this.loadSeatsByVenue(this.$route.query.selectedVenueId);
  },
  methods: {
    loadSeatsByVenue(venueId) {
      let url = new URL(`${origin}/api/seat/by-venue`);
      url.searchParams.append('venueId', venueId);
  
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
      localStorage.setItem("ticketsBought", this.countSelectedSeats() / 10);
    },
    updateSeatStatus(entry) {
      if (entry.status !== 'occupied') {
        this.saveUpdatedSeat(entry);
      }
    },
    addSeat() {
      this.$router.push('/add-seat')
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
      this.$router.push('confirmation');
    },
    countSelectedSeats() {
      return this.entries.filter(entry => entry.status === 'selected').length * 10;
    },
    handleOccupiedSeatClick(entry) {
      console.log('Klick auf occupied Sitzplatz:', entry);
    },
    formatCurrency(number) {
      return new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(number);
    }
  },
  template: `
    <div class="container d-flex flex-column align-items-center">
    <div>
      <h1 class="headlines">Sitzplatzwahl</h1>
    </div>

      <div class="row pt-5 movies-list-container">
        <div class="col-12 d-flex flex-column align-items-center">
        <div>
          <h1>Leinwand</h1>
        </div>
          <div class="item-content row text-center seat-div-width">
            <div class="col-4 pb-1 seat-div-p" v-for="entry in entries" :key="entry.id" :style="{ height: '40px', width: '40px' }">
              <button
                v-if="entry.status !== 'occupied'"
                type="button"
                class="seat-button"
                :style="{ backgroundColor: getSeatColor(entry.status), height: '100%', width: '100%' }"
                @click="toggleSeatStatus(entry)"
              ></button>
              <button
                v-else
                type="button"
                class="seat-button-occupied"
                :style="{ backgroundColor: getSeatColor(entry.status), height: '100%', width: '100%' }"
                @click="handleOccupiedSeatClick(entry)"
              ></button>
            </div>
          </div>
          <div class="card mt-5 mb-5 fs-4">
            <div class="card-body p-5">
              <strong>Tickets</strong>: {{ countSelectedSeats() / 10 }} x {{ formatCurrency(10) }}<br>
              <strong>davon MwSt.</strong>: {{ formatCurrency(countSelectedSeats() * 0.19) }}<br>
              <strong>Gesamt</strong>: {{ formatCurrency(countSelectedSeats()) }}
            </div>
          </div>

          <button type="button" class="btn color-sky-blue" @click="occupySelectedSeats">
            Kostenpflichtig bestellen
          </button>


        </div>
      </div>

    </div>



    `
};
