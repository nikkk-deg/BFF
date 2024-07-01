module.exports = {
  async up(db, client, context) {
    const moviesCollection = db.collection("movies");
    const movies = await moviesCollection.find({}).toArray();
    for (const movie of movies) {
      await moviesCollection.updateOne(
        { _id: movie._id },
        { $set: { description: movie.title } }
      );
      console.log(
        `Updated 'description' field for movie with _id: ${movie._id}`
      );
    }
    // return db
    //   .collection("movies")
    //   .updateMany({}, { $set: { discription: '' } });
  },

  down(db, client, context) {
    return db
      .collection("movies")
      .updateMany({}, { $unset: { description: "" } });
  },
};
