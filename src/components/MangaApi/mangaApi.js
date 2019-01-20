const config = {
    apiUrl: process.env.REACT_APP_MANGA_APIURL
};


const postHeader = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
};

class MangaApi {

    constructor() {
        this.config = config;
    }

    /**
     * getTrading
     */
    getTrading = (Npage) => {
        let endPoint = `/latestupdateslist/${process.env.REACT_APP_MANGA_PREFERED_SITE}/${Npage}`;
        let url = `${this.config.apiUrl}${endPoint}`;

        return Promise.resolve(
            fetch(url)
                .then(res => res.json())
                .then(
                    (result) => {
                        return result.paginator.mangas;
                    },
                    (error) => {
                        return error;
                    }
                ));
    };

    /**
     * search for a Manga
     */
    searchManga = (name) => {
        let endPoint = `/search/${process.env.REACT_APP_MANGA_PREFERED_SITE}/${name}`;
        let url = `${this.config.apiUrl}${endPoint}`;
        return Promise.resolve(
            fetch(url)
                .then(res => res.json())
                .then(
                    (result) => {
                        return result.paginator.mangas;
                    },
                    (error) => {
                        return error;
                    }
                ));
    };

    /**
     * get mangas detail + chapter
     */
    mangasDetail = (mangas) => {
        let endPoint = `/mangas/${process.env.REACT_APP_MANGA_PREFERED_SITE}`;
        let url = `${this.config.apiUrl}${endPoint}`;
        return Promise.resolve(
            fetch(url, {
                method: 'POST',
                headers: postHeader,
                body: JSON.stringify({
                    mangas: mangas,
                })
            }).then(res => res.json())
                .then(
                    (mangas) => {
                        return mangas;
                    }
                ));
    };

}

export default MangaApi;