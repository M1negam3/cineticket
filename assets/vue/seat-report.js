
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
      localStorage.setItem("ticketsBought", this.countSelectedSeats() / 10);
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
      this.$router.push('confirmation');
    },
    countSelectedSeats() {
      return this.entries.filter(entry => entry.status === 'selected').length * 10;
    },
    handleOccupiedSeatClick(entry) {
      console.log('Klick auf occupied Sitzplatz:', entry);
    },
  },
  template: `
    <div class="container d-flex flex-column align-items-center">
    <div class="w-100">
      <h1>Sitzplatzwahl</h1>
    </div>

      <div class="row pt-5">
        <div class="col-12 d-flex flex-column align-items-center">
        <div>
          <h1>Leinwand</h1>
        </div>
          <div class="item-content row text-center">
            <div class="col-4 seat-width" v-for="entry in entries" :key="entry.id">
              <button
                v-if="entry.status !== 'occupied'"
                type="button"
                class="seat-button"
                :style="{ backgroundColor: getSeatColor(entry.status), height: '30px', width: '30px', margin: '0 4px 8px 0' }"
                @click="toggleSeatStatus(entry)"
              ></button>
              <button
                v-else
                type="button"
                class="seat-button-occupied"
                :style="{ backgroundColor: getSeatColor(entry.status), height: '30px', width: '30px', margin: '0 4px 8px 0' }"
                @click="handleOccupiedSeatClick(entry)"
              ></button>
            </div>
          </div>
          <div class="pt-5 pb-5">
          Tickets: {{ countSelectedSeats() / 10 }} x 10 Euro<br>
          davon MwSt.: {{ countSelectedSeats() * 0.19 }} Euro<br>
          Gesamt: {{ countSelectedSeats() }} Euro
          </div>

          <!--<button @click="addSeat">Sitzplatz hinzufügen</button>-->
          <button type="button" class="btn btn-outline-dark chair-button" @click="occupySelectedSeats">
          <!--<i class="fas fa-chair mr-2"></i> Font Awesome Icon für einen Stuhl -->
            Kostenpflichtig bestellen
          </button>


        </div>
      </div>

    </div>



    `,
    style: `
      .chair-button {
      /* Hier kannst du zusätzliche Stilisierungen für den Stuhl-Button hinzufügen */
      }

      /* Optional: Stil für das Font Awesome Icon */
    .fas.fa-chair {
    /* Hier kannst du das Icon nach Bedarf anpassen */
    } `,
};
