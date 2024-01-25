// api/models/Venue.js
module.exports = {
    attributes: {
        time: { type: 'string', columnType: 'time', required: true },
        date: { type: 'string',  columnType: 'date',  required: true},
        movie: {
            model: 'movie'
        },
        seatplan: {
            model: 'seatplan'
        },
    },
  };