/**
 * MovieController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */



module.exports = {

  new: async function (req, res) {
    let categories = await Category.find();
    res.view('pages/movie/new', { categories });
  },

  create: async function (req, res) {
    let params = req.allParams();
    await Movie.create(params);
    res.view('pages/movie/status', { moviename: params.name });
  },

  find: async function (req, res) {
    let movies;
    let categories = await Category.find();

    if (req.query.q && req.query.q.length > 0) {
      if (req.query.catQ > 0) {
        movies = await Movie.find({
          name: {
            'contains': req.query.q
          },
          category: req.query.catQ
        }).populate('category');
      } else {
        movies = await Movie.find({
          name: {
            'contains': req.query.q
          }
        }).populate('category')
      }
    }
    else if (req.query.catQ > 0) {
      movies = await Movie.find({
        category: req.query.catQ
      }).populate('category');
    }
    else {
      movies = await Movie.find().populate('category');
    }
    res.view('pages/search', { movies: movies, categories: categories });
  },

  findMoviesForAdmin: async function (req, res) {
    let movies;
    let categories = await Category.find();

    if (req.query.q && req.query.q.length > 0) {
      if (req.query.catQ > 0) {
        movies = await Movie.find({
          name: {
            'contains': req.query.q
          },
          category: req.query.catQ
        }).populate('category');
      } else {
        movies = await Movie.find({
          name: {
            'contains': req.query.q
          }
        }).populate('category')
      }
    }
    else if (req.query.catQ > 0) {
      movies = await Movie.find({
        category: req.query.catQ
      }).populate('category');
    }
    else {
      movies = await Movie.find().populate('category');
    }
    res.view('pages/movie/index', { movies: movies, categories: categories });
  },

  findOne: async function (req, res) {
    let movie = await Movie.findOne({ id: req.params.id }).populate('category');
    res.view('pages/movie/show', { movie: movie});
  },

  edit: async function (req, res) {
    let movie = await Movie.findOne({ id: req.params.id });
    res.view('pages/movie/edit', { movie: movie });
  },

  update: async function (req, res) {
    let params = req.allParams();
    await Movie.updateOne({ id: req.params.id }).set(params);
    res.redirect('/movie');
  },

  destroy: async function (req, res) {
    let movie = await Movie.destroyOne({ id: req.params.id });
    res.redirect('/movie');
  },

  uploadImageForm: async function (req, res) {
    sails.log.debug("Upload image form....")
    let movie = await Movie.findOne({ id: req.params.id })
    res.view('pages/movie/uploadImageForm', { movie: movie });
  },

  uploadImage: async function (req, res) {
    sails.log("Upload image for movie...")
    let params = {
      adapter: require('skipper-s3'),
      key: sails.config.s3accesskey,
      secret: sails.config.s3secret,
      bucket: 'wetebucket',
      region: 'us-west-2'
    };

    let callback = async function (err, uploadedFiles) {
      if (err) {
        sails.log("Upload Error")
        return res.serverError(err);
      } else {
        sails.log("Uploaded!")
      }
      let fname = require('path').basename(uploadedFiles[0].fd);
      await Movie.updateOne({ id: req.params.id }).set({ image:fname });
      return res.redirect('/movie');
    };

      // This funvtion is called, once all files are uploaded
      // err indicates if the upload process triggered an error and has been aborted 
      // uploaded files contains an array of the files which have been uploaded, in our case only one.
      await req.file('image').upload(params, callback);
    },


};

