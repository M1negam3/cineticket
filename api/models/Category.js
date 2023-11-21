// api/models/Category.js
module.exports = {
    attributes: {
        name: {
            type: 'string',  
            columnType: 'varchar(80)',  
            required: true,
        },
        meals: {
            collection: 'movie',
            via: 'category'
        }
    }
  };