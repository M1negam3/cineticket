module.exports = {

    friendlyName: 'Search venues',
  
    description: 'Search venues.',
  
    inputs: {
    },
  
    exits: {
      success: {
        responseType: 'ok',
      },
    },
  
    fn: async function (inputs, exits) {
      try {
        const venues = await Venue.find().populate('movie'); 
  
        return exits.success(venues);
      } catch (error) {
        sails.log.error('Error searching venues:', error);
        return exits.serverError('Internal server error');
      }
    }
  };
  