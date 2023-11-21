/**
 * MovieController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

const Category = require("../models/Category");

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
    if (req.query.q && req.query.q.length > 0) {
      movies = await Movie.find({
        name: {
          'contains': req.query.q
        }
      }).populate('category')
    } else {
      movies = await Movie.find().populate('category');
    }
    res.view('pages/search', { movies: movies });
  },

  findMoviesForAdmin: async function (req, res) {
    let movies;
    if (req.query.q && req.query.q.length > 0) {
      movies = await Movie.find({
        name: {
          'contains': req.query.q
        }
      }).populate('category')
    } else {
      movies = await Movie.find().populate('category');
    }
    res.view('pages/movie/index', { movies: movies });
  },

  findOne: async function (req, res) {
    let movie = await Movie.findOne({ id: req.params.id }).populate('category');
    res.view('pages/movie/show', { movie: movie });
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

  /*     search: async function (req, res) {
          var sql = "SELECT movie.name, movie.duration, movie.description FROM movie WHERE movie.name LIKE '%" + req.body.name + "%'";
  
          var rawResult = await sails.sendNativeQuery(sql);
          
          let entries  = [];
          rawResult.rows.forEach(element => {
            entries.push(element);
          });
          res.view('pages/result', { entries });
       } */


};

