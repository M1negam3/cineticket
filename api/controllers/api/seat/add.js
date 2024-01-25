module.exports = {


    friendlyName: 'Add seat',
  
  
    description: 'Add seat to table.',
  
  
    inputs: {
        name: {
            description: 'The number of the seat to add',
            type: 'string',
            required: true
          },
    },
  
  
  
      fn: async function (inputs) {

        await Seat.create({ name: inputs.name });

      }
  
  
  };