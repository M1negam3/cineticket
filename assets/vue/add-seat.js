

export default {
  data() {
    return {
      seatName: '',
    };
  },
  methods: {
    addSeats() {
      // Fügen Sie hier die Logik zum Hinzufügen von Sitzplätzen hinzu
      // Sie können beispielsweise eine API-Anfrage an Ihren Server senden
      // Hier wird ein einfacher Fetch-Aufruf verwendet:

      fetch('/api/seats', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: this.seatName }),
      })
        .then(response => response.json())
        .then(data => {
          console.log('Sitzplatz erfolgreich hinzugefügt:', data);
          // Hier können Sie eine Bestätigungsmeldung anzeigen oder andere Aktionen durchführen
        })
        .catch(error => {
          console.error('Fehler beim Hinzufügen von Sitzplätzen:', error);
          // Hier können Sie eine Fehlermeldung anzeigen oder andere Aktionen durchführen
        });
    },
  },
  template: `,
  <div>
    <h2>Sitzplätze hinzufügen</h2>
    <form @submit.prevent="addSeats">
      <label for="seatName">Sitzplatzname:</label>
      <input type="text" v-model="seatName" required>
      <button type="submit">Sitzplatz hinzufügen</button>
    </form>
    <router-link to="/">Zurück zur Sitzplatzauswahl</router-link>
  </div>
`,
};


