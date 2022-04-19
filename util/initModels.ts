import { User } from '../models/user.model'
import { Review } from '../models/review.model'
import { Movie } from '../models/movie.model'
import { ActorInMovie } from '../models/actorInMovie.model'
import { Actor } from '../models/actor.model'

const initModels = (): void => {
  User.hasMany(Review)
  Review.belongsTo(User)

  Movie.hasMany(Review)
  Review.belongsTo(Movie)

  Movie.belongsToMany(Actor, { through: ActorInMovie })
  Actor.belongsToMany(Movie, { through: ActorInMovie })
}

export { initModels }
