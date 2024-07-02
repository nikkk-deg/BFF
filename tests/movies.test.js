describe("/movies", () => {
  // тестируем роут movies

  it("POST", async () => {
    // проверяем метод POST для этого роута
    // это условный код, в котором пока нет реального запроса
    const movie = {
      title: "The Shawshank Redemption",
      year: 1994,
      rating: 9.2,
    };
    expect(movie.title).toEqual("The Shawshank Redemption"); // ожидаем что movie.title будет равен строке
  });
});
