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

  findOne: async function (req, res) {
    sails.log.debug("Edit single Category....")
    let category = await Category.findOne({ id: req.params.id });

    if (!category) {
        return res.status(404).send("Category not found");
    }

    sails.log.debug("Found category:", category);

    res.view('pages/category/show', { category: category });
},


  editOne: async function (req, res) {
    sails.log.debug("Edit single Category....")
    let category = await Category.findOne({ id: req.params.id});
    res.view('pages/category/edit', {category: category})
  },

  updateOne: async function (req, res) {
    sails.log.debug("Update single Category....")
    try {
        let category = await Category.updateOne({ id: req.params.id }).set(req.body);
        sails.log.debug("Updated category:", category);
        res.view('pages/category/show', { category: category });
    } catch (err) {
        sails.log.error("Error updating category:", err);
        res.serverError(err);
    }
},

};