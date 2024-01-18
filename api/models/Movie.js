// api/models/Movie.js
module.exports = {
    attributes: {
        name: { type: 'string', columnType: 'varchar(80)', required: true },
        description: { type: 'string', columnType: 'varchar(80)' },
        duration: { type: 'number',  columnType: 'int',  required: true},
        category: {
            model: 'category'
        },
        image: { type: 'string', columnType: 'varchar(80)' },
        venues: {
            collection: 'venue',
            via: 'movie'
        }
    },
  };