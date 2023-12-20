export default {
    data() {
      return {
        name: '' 
      };
    },
    methods: {
      addSeat() {

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