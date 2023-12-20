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
              <tr v-for="entry in entries" :key="id">
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
  