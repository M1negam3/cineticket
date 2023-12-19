

module.exports = {

  list2: async function (req, res) {
    try {
      // Hier Sitzplatzdaten aus der Datenbank abrufen
      let seats = await Seat.find();
  
      // JSON-Antwort
      if (req.accepts(['html', 'json']) === 'json') {
        return res.json({ seats });
      }
  
      // HTML-Antwort
      return res.view('pages/seat/list', { seats });
    } catch (error) {
      // Fehlerbehandlung, falls etwas schief geht
      console.error(error);
  
      // JSON-Antwort
      if (req.accepts(['html', 'json']) === 'json') {
        return res.status(500).json({ error: 'Internal Server Error' });
      }
  
      // HTML-Antwort
      return res.serverError('Internal Server Error');
    }
  },


  list: async function (req, res) {
    try {
      let sql = "select s.id, s.name, s.createdAt, s.updatedAt from seat as s order by s.updatedAt desc;";
      var rawResult = await sails.sendNativeQuery(sql);
  
      console.dir(rawResult);
      let entries = [];
      rawResult.rows.forEach(element => {
        entries.push(element);
      });
  
      // JSON-Antwort
      if (req.accepts(['html', 'json']) === 'json') {
        return res.json({ entries });
      }
  
      // HTML-Antwort
      return res.view('pages/seat/report', { entries });
    } catch (error) {
      // Fehlerbehandlung, falls etwas schief geht
      console.error(error);
  
      // JSON-Antwort
      if (req.accepts(['html', 'json']) === 'json') {
        return res.status(500).json({ error: 'Internal Server Error' });
      }
  
      // HTML-Antwort
      return res.serverError('Internal Server Error');
    }
  },
    
    find: async function (req, res) {
    try {
      // Hier können Sie nach spezifischen Sitzplätzen suchen, wenn nötig
      let seat = await Seat.find({ id: req.params.id });
      return res.json(seat);
    } catch (error) {
      // Fehlerbehandlung, falls etwas schief geht
      console.error(error);
      return res.serverError('Internal Server Error');
    }
  },
  
    select: async function (req, res) {
      try {
        // Hier Logik für die Auswahl eines Sitzplatzes implementieren
        let seatId = req.params.id;
        // Beispiel: Sitzplatzdaten aktualisieren (Status ändern)
        await Seat.updateOne({ id: seatId }).set({ status: 'selected' });
  
        res.redirect('/seat/list');
      } catch (error) {
        // Fehlerbehandlung, falls etwas schief geht
        console.error(error);
        res.serverError('Internal Server Error');
      }
    },
  
    addSeats: async function (req, res) {
      try {
        const seatName = req.body.name;
  
        // Fügen Sie die Logik zum Hinzufügen von Sitzplätzen hier hinzu
        // Beispiel: Erstellen Sie einen neuen Eintrag in der Datenbank
  
        const createdSeat = await Seat.create({
          name: seatName,
          status: 'available', // Optional: Setzen Sie den Status nach Bedarf
        }).fetch();
  
        return res.json(createdSeat);
      } catch (error) {
        console.error('Fehler beim Hinzufügen von Sitzplätzen:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
      }
    },
  
  };
  