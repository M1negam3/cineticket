

module.exports = {

  find: async function (req, res) {
    let seat = await Seat.find({ id: req.params.id });
    res.view('pages/seat/report', { seat: seat });
  },

  create: async function (req, res) {
    const { name } = req.allParams();
    const createdSeat = await Seat.create({ name, status: 'available' }).fetch();
    res.view('pages/seat/report', { seat: seat });

  },

  findOne: async function (req, res) {
    try {
      const seatId = req.params.id;
      const seat = await Seat.findOne({ id: seatId });

      if (!seat) {
        return res.status(404).json({ error: 'Sitzplatz nicht gefunden.' });
      }

      return res.status(200).json(seat);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Interner Serverfehler' });
    }
  },

  updateOne: async function (req, res) {
    try {
      const seatId = req.params.id;
      const updatedStatus = req.body.status;

      const seat = await Seat.findOne({ id: seatId });

      if (!seat) {
        return res.status(404).json({ error: 'Sitzplatz nicht gefunden.' });
      }

      if (!['available', 'selected', 'occupied'].includes(updatedStatus)) {
        return res.status(400).json({ error: 'Ungültiger Status.' });
      }

      await Seat.updateOne({ id: seatId }).set({ status: updatedStatus });
      const updatedSeat = await Seat.findOne({ id: seatId });

      return res.status(200).json(updatedSeat);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Interner Serverfehler' });
    }
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
  updateSeat: async function (req, res) {
    try {
      console.log('Update Seat Action aufgerufen');
      const seatId = req.params.id;
      const updatedStatus = req.body.status;
      console.log('Seat ID:', seatId);
      console.log('Updated Status:', updatedStatus);

      const updatedSeat = await Seat.updateOne({ id: seatId }).set({ status: updatedStatus });

      if (!updatedSeat) {
        return res.status(404).json({ error: 'Sitzplatz nicht gefunden.' });
      }

      return res.status(200).json(updatedSeat);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Interner Serverfehler' });
    }
  },

  async findByVenue(req, res) {
    try {
      const venueId = req.param('venueId');
      
      if (!venueId) {
        return res.badRequest('Venue ID is required.');
      }

      const venue = await Venue.findOne({ id: venueId }).populate('seatplan');

      if (!venue) {
        return res.status(404).json({ error: 'Venue wurde nicht gefunden.' });
      }

      const seats = await Seat.find({ seatplan: venue.seatplan.id });

      return res.json(seats);
    } catch (error) {
      return res.serverError(error.message || error);
    }
  },

};
