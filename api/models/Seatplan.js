// api/models/Seatplan.js

module.exports = {
  attributes: {
    name: {
      type: 'string',
      required: true
    },
    venues: {
      collection: 'venue',
      via: 'seatplan'
    },
    seats: {
      collection: 'seat',
      via: 'seatplan'
    }
  },
};