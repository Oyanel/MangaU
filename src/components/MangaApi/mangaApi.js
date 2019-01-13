// import {withFirebase} from "../Firebase";

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
     * getFavorites
     */
    getFavorites = () => {
        //this.props.firebase.getFavoriteMangas();
        //@TODO: recupérer les favoris + faire les appels + renvoyé le resultat
    };

    /**
     * getTrading
     */
    getTrading = async () => {
        let endPoint = `/latestupdateslist/${process.env.REACT_APP_MANGA_PREFERED_SITE}`;
        let url = `${this.config.apiUrl}${endPoint}`;

        return new Promise(resolve => {
            fetch(url)
                .then(res => res.json())
                .then(
                    async (result) => {
                        let mangas = await this.mangasDetail(result.paginator.mangas.slice(0, 12));
                        resolve(mangas.mangas);
                    },
                    (error) => {
                        error(error);
                    }
                );

        });

    };

    /**
     * search for a Manga
     */
    searchManga = async (name) => {

        let endPoint = `/search/${process.env.REACT_APP_MANGA_PREFERED_SITE}/${name}`;
        let url = `${this.config.apiUrl}${endPoint}`;
        return new Promise(resolve => {
            fetch(url)
                .then(res => res.json())
                .then(
                    (result) => {
                        resolve(result.paginator.mangas);
                    },
                    (error) => {
                        error(error);
                    }
                );
        });
    };

    /**
     * get mangas detail + chapter
     */
    mangasDetail = async (mangas) => {
        let endPoint = `/mangas/${process.env.REACT_APP_MANGA_PREFERED_SITE}`;
        let url = `${this.config.apiUrl}${endPoint}`;
        return new Promise(resolve => {
            fetch(url, {
                method: 'POST',
                headers: postHeader,
                body: JSON.stringify({
                    mangas: mangas,
                })
            }).then(res => res.json())
                .then(
                    (mangas) => {
                        resolve(mangas);
                    },
                    (error) => {
                        console.log('error');
                        error(error);
                    }
                );
        });
    };

}

export default MangaApi;