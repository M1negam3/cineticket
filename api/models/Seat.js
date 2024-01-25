
module.exports = {

    attributes: {
      name: {
        type: 'string',
        required: true
      },
      status: {
        type: 'string',
        isIn: ['available', 'selected', 'occupied'],
        defaultsTo: 'available'
      },
      seatplans: {
        collection: 'seatplan',
        via: 'seat'
    }
    },
  
  };
  