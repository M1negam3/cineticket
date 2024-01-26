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

    <input v-model="name" placeholder="Sitzplatzname">

    <button @click="addSeat">Sitzplatz hinzufügen</button>
  </div>
    `,
  };
