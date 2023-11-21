/**
 * CategoryController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

const Sails = require("sails/lib/app/Sails");

module.exports = {
  create: async function (req, res) {
    sails.log.debug("Create new category....")
    let category = await Category.create(req.allParams());
    res.redirect('/category');
  },

  find: async function (req, res) {
    sails.log.debug("List category....")
    categories = await Category.find();
    res.view('pages/category/index', { categories });
  },

  destroyOne: async function (req, res) {
    sails.log.debug("Destroy category....")
    await Category.destroyOne({ id: req.params.id });
    res.redirect('/category');
  },

 
};