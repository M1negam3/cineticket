export default {
    data() {
      return {
        entries: [],
      };
    },
    created() {
      // Hier können Sie eine API-Anfrage oder andere Logik für den Datenabruf implementieren
      // Zum Beispiel können Sie fetch() verwenden, um Daten von Ihrem Server abzurufen
  
      // Beispiel:
      fetch('/api/seat/report')
        .then(response => response.json())
        .then(data => (this.entries = data.entries))
        .catch(error => console.error('Fehler beim Laden der Daten:', error));
    },
    template: `
      <div class="container">
        <h1>Sitzplätze</h1>
  
        <div class="item-content">
          <table class="table">
            <thead>
              <th>Id</th>
              <th>Name</th>
              <th>Erzeugt</th>
              <th>Zuletzt Geändert</th>
            </thead>
            <tbody>
              <tr v-for="(entry, index) in entries" :key="index">
                <td>{{ entry.id }}</td>
                <td>{{ entry.name }}</td>
                <td>{{ new Date(entry.createdAt).toLocaleString() }}</td>
                <td>{{ new Date(entry.updatedAt).toLocaleString() }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    `,
  };
  