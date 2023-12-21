/**
 * Policy Mappings
 * (sails.config.policies)
 *
 * Policies are simple functions which run **before** your actions.
 *
 * For more information on configuring policies, check out:
 * https://sailsjs.com/docs/concepts/policies
 */

module.exports.policies = {

  /***************************************************************************
  *                                                                          *
  * Default policy for all controllers and actions, unless overridden.       *
  * (`true` allows public access)                                            *
  *                                                                          *
  ***************************************************************************/

   //'*': true,
  //'*': 'is-logged-in',

  '*/seat':'is-logged-in',

  // Bypass the `is-logged-in` policy for:
  'entrance/*': true,
  'account/logout': true,


  MovieController: {
    'find': true,
    'findOne': true,
    '*': 'is-super-admin',
  },
  CategoryController: {
    '*': 'is-super-admin',
  },
  SeatController: {
    'addSeat': 'is-super-admin',
    '*': 'is-logged-in',
  }
};
