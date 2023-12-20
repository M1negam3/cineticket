

module.exports = {


  list: async function (req, res) {
    try {
      let sql = "select s.id, s.name, s.createdAt, s.updatedAt from seat as s order by s.updatedAt desc;";
      var rawResult = await sails.sendNativeQuery(sql);
  
      console.dir(rawResult);
      let entries = [];
      rawResult.rows.forEach(element => {
        entries.push(element);
      });
  

      if (req.accepts(['html', 'json']) === 'json') {
        return res.json({ entries });
      }
  

      return res.view('pages/seat/report', { entries });
    } catch (error) {

      console.error(error);
  

      if (req.accepts(['html', 'json']) === 'json') {
        return res.status(500).json({ error: 'Internal Server Error' });
      }
  
      return res.serverError('Internal Server Error');
    }
  },
    
    find: async function (req, res) {
      let seat = await Seat.find({ id: req.params.id });
      res.view('pages/seat/report', { seat: seat });  
  },
  
    select: async function (req, res) {
      try {

        let seatId = req.params.id;

        await Seat.updateOne({ id: seatId }).set({ status: 'selected' });
  
        res.redirect('/seat/list');
      } catch (error) {

        console.error(error);
        res.serverError('Internal Server Error');
      }
    },
  
    addSeats: async function (req, res) {
      try {
        const seatName = req.body.name;
  
    
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
  