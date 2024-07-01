module.exports = {
  async up(db, client, context) {
    await db.collection("users").updateMany({}, { $set: { favorites: [] } });
  },

  async down(db, client, context) {
    await db.collection("users").updateMany({}, { $unset: { favorites: "" } });
  },
};
