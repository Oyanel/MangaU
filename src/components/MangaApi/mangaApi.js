// import {withFirebase} from "../Firebase";


const config = {
    apiUrl: process.env.REACT_APP_MANGA_APIURL
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
        var endPoint = `/latestupdateslist/${process.env.REACT_APP_MANGA_PREFERED_SITE}`;
        var url = `${this.config.apiUrl}${endPoint}`;
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
     * search for a Manga
     */
    searchManga = async (name) => {

        var endPoint = `/search/${process.env.REACT_APP_MANGA_PREFERED_SITE}/${name}`;
        var url = `${this.config.apiUrl}${endPoint}`;
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
}

export default MangaApi;