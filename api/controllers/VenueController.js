// api/controllers/VenueController.js

module.exports = {
  
    find: async function (req, res) {
        try {
          const venues = await Venue.find();
          return res.json(venues);
        } catch (err) {
          return res.serverError(err);
        }
      },
    
      findOne: async function (req, res) {
        try {
          const venue = await Venue.findOne({ id: req.params.id });
          if (!venue) {
            return res.status(404).json({ error: 'Venue not found' });
          }
          return res.json(venue);
        } catch (err) {
          return res.serverError(err);
        }
      },
  
  };
  