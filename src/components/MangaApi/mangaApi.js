import React from 'react'
import axios from 'axios'
import MangaApiContext from "../MangaApi/context";
import {withFirebase} from "../Firebase";


const config = {
    username: process.env.REACT_APP_MANGAEVEN_USERNAME,
    password: process.env.REACT_APP_MANGAEVEN_PASSWORD,
    apiUrl: "https://www.mangaeden.com/"
};
const withMangaApi = Component => {
    class MangaApi extends React.Component {

        constructor(props) {
            super(props);
            this.config = config;
            this.state = {mangas: [], favorites: []};
        }


        componentWillMount() {
            this.login();
            this.getMangaList();
            console.log('passe ici');
        }

        /**
         * Login request
         */
        login() {
            var endPoint = `ajax/login/?username=${this.config.username}&password=${this.config.password}`;
            var url = `${this.config.apiUrl}${endPoint}`;
            axios.get(url)
                .then(
                    () => {
                        this.setState({
                            isLoggedIn: true
                        });
                    },
                    (error) => {
                        this.setState({
                            error: error
                        });
                    }
                )
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
        }

        /**
         * getFavorites
         */
        getFavorites = () => {
            this.props.firebase.getFavoriteMangas();
            //@TODO: recupérer les favoris + faire les appels + renvoyé le resultat
        }


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