import React from 'react';
import {AuthUserContext} from '../Session';

import Search from "../Search";
import Favorites from "../Favorites";
import Trading from "../Trading";

class Landing extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            mangaFavorites: []
        }

    }

    updateFavorites(manga) {
        let mangas = [];
        mangas.push(manga);
        Array.prototype.push.apply(mangas, this.state.mangaFavorites);
        this.setState({
            mangaFavorites: mangas
        });
    }

    render() {
        return (
            <div className={'container-fluid landing-page'}>
                <AuthUserContext.Consumer>
                    {authUser => (authUser && <Search updateFavorites={this.updateFavorites.bind(this)}/>)}
                </AuthUserContext.Consumer>
                <AuthUserContext.Consumer>
                    {authUser => (authUser && <Favorites newFavorites={this.state.mangaFavorites}/>)}
                </AuthUserContext.Consumer>
                <Trading/>
            </div>
        )
    }
}

export default Landing;