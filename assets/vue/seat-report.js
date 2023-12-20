export default {
    data() {
      return {
        entries: [],
      };
    },
    created() {
      let url = new URL(origin+ '/api/seat');
      fetch(url)
        .then(response => response.json())
        .then(data => (this.entries = data))
        .catch(error => console.error('Fehler beim Laden der Daten:', error));
    },
    methods: {
        addSeat() {
          this.$router.push('/add-seat')
        },
        changeStatus() {
          this.$router.push('/change')
        },
        changeStatus(entry) {
          // Ändere den Status auf 'selected'
          entry.status = 'selected';
    
          // Hier könntest du weitere Aktionen für den Statuswechsel durchführen
          console.log('Status geändert:', entry.status);
    
          // Hier kannst du die Logik für das Speichern des geänderten Sitzplatzes implementieren
          // z.B. durch eine API-Anfrage an den Server
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
    },
    template: `
    <div class="container">
    <h1>Sitzplätze</h1>
    <h2>Leinwand</h2>
  
    <!--<div class="item-content">
      <div class="seat" v-for="entry in entries" :key="entry.id" @click="handleSeatClick(entry)">
      <button type="Button" style=" background-color:#00CCFF; height: 30px; width: 30px" @click="changeStatus"></button>
      </div>
    </div>-->


    <div class="item-content row">
      <div class="col-4 p-0" v-for="entry in entries" :key="entry.id">
        <button
          type="button"
          class="seat-button"
          :style="{ backgroundColor: entry.status === 'selected' ? 'green' : 'blue', height: '30px', width: '30px' }"
          @click="changeStatus(entry)"
        ></button>
      </div>
    </div>

    <button @click="addSeat">Sitzplatz hinzufügen</button>
  </div>
    `,
  };
  