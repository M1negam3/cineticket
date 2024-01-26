/**
 * Seed Function
 * (sails.config.bootstrap)
 *
 * A function that runs just before your Sails app gets lifted.
 * > Need more flexibility?  You can also create a hook.
 *
 * For more information on seeding your app with fake data, check out:
 * https://sailsjs.com/config/bootstrap
 */

module.exports.bootstrap = async function() {


  if (await User.count() == 0) {
    await User.createEach([
      { emailAddress: 'admin@admin.de', fullName: 'Ryan Dahl', isSuperAdmin: true, password: await
     sails.helpers.passwords.hashPassword('admin') },
      ]);
  } else {
    return;
  }

  
  if (await Category.count() == 0){
    await Category.createEach([
      { name: 'Horror', id:1},
      { name: 'Action', id:2},
      { name: 'Romantisch', id:3},
    ]);
  }

  if (await Movie.count() == 0) {
    await Movie.createEach([
      { name:'ScaryMovie',duration:120,description:'sehr gruselig',category:1,id:1},
      { name:'GruselFilm',duration:90,description:'gruselig',category:1,id:2},
      { name:'Matrix',duration:200,description:'Ein geschicktes Spiel zwischen Welten',category:2,id:3},
      { name:'Schlaflos in Seatle',duration:100,description:'Vater und Sohn haben schwerer Verluste zu verkraften',category:3,id:4},
    ]);
  }  
  
  if (await Seatplan.count() == 0){
    await Seatplan.createEach([
      { name:'Saal1', id: 1},
      { name:'Saal2', id: 2},
    ]);
  }
  
  if (await Seat.count() == 0) {
    await Seat.createEach([
      { name:'1', status:'available', seatplan: 1},
      { name:'2', status:'available', seatplan: 1},
      { name:'3', status:'available', seatplan: 1},
      { name:'4', status:'available', seatplan: 1},
      { name:'5', status:'available', seatplan: 1},
      { name:'6', status:'available', seatplan: 1},
      { name:'7', status:'available', seatplan: 1},
      { name:'8', status:'available', seatplan: 1},
  
      { name:'9', status:'available', seatplan: 2},
      { name:'10', status:'available', seatplan: 2},
      { name:'11', status:'available', seatplan: 2},
      { name:'12', status:'available', seatplan: 2},
      { name:'13', status:'available', seatplan: 2},
      { name:'14', status:'available', seatplan: 2},
      { name:'15', status:'available', seatplan: 2},
    ]);
  }

  if (await Venue.count() == 0) {
    await Venue.createEach([
      {time:'16:00:00', date: '2024-02-25', seatplan: 1, movie: 1},
      {time:'18:30:00', date: '2024-02-20', seatplan: 2, movie: 2},
    ])
  }
  

};
