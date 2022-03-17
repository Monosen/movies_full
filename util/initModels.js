const { User } = require('../models/user.model');
const { Review } = require('../models/review.model');
const { Movie } = require('../models/movie.model');
const { ActorInMovie } = require('../models/actorInMovie.model');
const { Actor } = require('../models/actor.model');

const initModels = () => {
  User.hasOne(Review);
  Review.belongsTo(User);

  Movie.hasOne(Review);
  Review.belongsTo(Movie);

  Movie.hasOne(ActorInMovie);
  ActorInMovie.belongsTo(Movie);

  Actor.hasOne(ActorInMovie);
  ActorInMovie.belongsTo(Actor);
};

module.exports = { initModels };
