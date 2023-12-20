export default {
    data() {
      return {
        name: '' // Hier wird der eingegebene Sitzplatzname gespeichert
      };
    },
    methods: {
      addSeat() {
        // Hier kannst du Logik hinzufügen, um die addSeat-Funktion aufzurufen.
        // Du kannst hier z.B. die Variable seatName verwenden, um den Sitzplatznamen zu übergeben.
        // Beispiel mit Axios:
        axios.post('/api/seat/add', { name: this.name })
          .then(response => {
         
            this.name = '';
          })
          .catch(error => {
            console.error('Fehler beim Hinzufügen des Sitzplatzes:', error);
          });
      }
    },
  
    template: `
    <div>
    <!-- Hier stehen deine vorhandenen Sitzplätze oder eine Liste von verfügbaren Sitzplätzen -->

    <!-- Eingabefeld für den Sitzplatznamen -->
    <input v-model="name" placeholder="Sitzplatzname">

    <!-- Beispiel-Knopf zum Hinzufügen eines Sitzplatzes -->
    <button @click="addSeat">Sitzplatz hinzufügen</button>
  </div>
    `,
  };