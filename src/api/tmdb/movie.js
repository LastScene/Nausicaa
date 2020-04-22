const movie = (tmdbHttp) => {
    return {
        async getDetails(movieID) {
            return tmdbHttp.get(`/3/movie/${+movieID}`);
        },
        async getCredits(movieID) {
            return tmdbHttp.get(`/3/movie/${+movieID}/credits`);
        }
    };
};

export default movie;
