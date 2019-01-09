import React from 'react'
import MangaApiContext from "../MangaApi/context";
import {withFirebase} from "../Firebase";


const config = {
    apiUrl: process.env.REACT_APP_MANGA_APIURL
};
const withMangaApi = Component => {
    class MangaApi extends React.Component {

        constructor(props) {
            super(props);
            this.config = config;
            this.state = {mangas: [], favorites: [], trading: []};
        }


        componentWillMount() {
            this.getTrading();
        }



        /**
         * feed state.mangas with mangaList
         */
        getMangaList = () => {
            var endPoint = "api/list/0/";
            var url = `${this.config.apiUrl}${endPoint}`;
            fetch(url)
                .then(res => res.json())
                .then(
                    (result) => {
                        this.setState({
                            mangas: result.manga
                        });
                    },
                    (error) => {
                        this.setState({
                            error: error
                        });
                    }
                )
        };

        /**
         * getFavorites
         */
        getFavorites = () => {
            this.props.firebase.getFavoriteMangas();
            //@TODO: recupérer les favoris + faire les appels + renvoyé le resultat
        };

        /**
         * getTrading
         */
        getTrading = () => {

            var endPoint = `/latestupdateslist/${process.env.REACT_APP_MANGA_PREFERED_SITE}`;
            var url = `${this.config.apiUrl}${endPoint}`;
            fetch(url)
                .then(res => res.json())
                .then(
                    (result) => {
                        this.setState({
                            trading: result.paginator.mangas
                        });
                    },
                    (error) => {
                        this.setState({
                            error: error
                        });
                    }
                )
        };


        render() {
            return (
                <MangaApiContext.Provider value={this.state}>
                    <Component {...this.props} />
                </MangaApiContext.Provider>
            );
        }
    }

    return withFirebase(MangaApi);
};

export default withMangaApi;