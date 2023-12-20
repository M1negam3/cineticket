module.exports = {
    friendlyName: 'Update Seat',
  
    description: 'Update a seat.',
  
    inputs: {
      id: {
        type: 'number',
        required: true,
        description: 'The ID of the seat to update.',
      },
      status: {
        type: 'string',
        required: true,
        description: 'The new status of the seat.',
        isIn: ['available', 'selected', 'occupied'],
      },
    },
  
    exits: {
      success: {
        description: 'Seat successfully updated.',
      },
      notFound: {
        description: 'Seat not found.',
        responseType: 'notFound',
      },
      invalidStatus: {
        description: 'Invalid status provided.',
        responseType: 'badRequest',
      },
      serverError: {
        description: 'Internal server error.',
        responseType: 'serverError',
      },
    },
  
    fn: async function ({ id, status }) {
      try {
        const seat = await Seat.findOne({ id });
        if (!seat) {
          throw 'notFound';
        }
  
        if (!['available', 'selected', 'occupied'].includes(status)) {
          throw 'invalidStatus';
        }
  
        await Seat.updateOne({ id }).set({ status });
        return exits.success({ message: 'Seat successfully updated.' });
      } catch (error) {
        console.error(error);
        if (error === 'notFound') {
          return exits.notFound({ error: 'Seat not found.' });
        } else if (error === 'invalidStatus') {
          return exits.invalidStatus({ error: 'Invalid status provided.' });
        } else {
          return exits.serverError({ error: 'Internal server error.' });
        }
      }
    }
  };
  