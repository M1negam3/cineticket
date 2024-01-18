// api/models/Venue.js
module.exports = {
    attributes: {
        id: { type: 'number', columnType: 'number', required: true },
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