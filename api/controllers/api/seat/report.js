module.exports = {


    friendlyName: 'Index',
  
  
    description: 'Index seats.',
  
  
    inputs: {
  
    },
  
  
    exits: {
  
    },
  
  
    fn: async function (inputs) {
  
      return seats = await Seat.find();
  
      
  
    }
  
  
  };