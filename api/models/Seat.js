
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
      seatplan: {
        model: 'seatplan'
      }
    },
  
  };
  