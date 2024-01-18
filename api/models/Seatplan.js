module.exports = {
    attributes: {
      name: {
        type: 'string',
        required: true
      },
      seat: {
        model: 'seat'
      },
      venues: {
        collection: 'venue',
        via: 'seatplan'
    }
    },
  };