// api/models/Category.js
module.exports = {
    attributes: {
        name: {
            type: 'string',  
            columnType: 'varchar(80)',  
            required: true,
        },
        movies: {
            collection: 'movie',
            via: 'category'
        }
    }
  };