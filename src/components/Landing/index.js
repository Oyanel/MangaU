import React from 'react';
import {AuthUserContext} from '../Session';

import Search from "../Search";
import Favorites from "../Favorites";
import Trading from "../Trading";
import Reader from "../Reader";

class Landing extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            mangaFavorites: [],
            imageURLs: []
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

    setImageUrls(imageUrls) {
        this.setState({
            imageURLs: imageUrls
        });
    }

    setReaderManga(imageUrls) {
        document.body.classList.add('no-scroll');
        this.setState({
            imageURLs: imageUrls.images
        });
    }

    render() {
        return (
            <div className={'container-fluid landing-page'}>
                <AuthUserContext.Consumer>
                    {authUser => (authUser && <Search updateFavorites={this.updateFavorites.bind(this)}
                                                      setReader={this.setReaderManga.bind(this)}/>)}
                </AuthUserContext.Consumer>
                <AuthUserContext.Consumer>
                    {authUser => (authUser && <Favorites newFavorites={this.state.mangaFavorites}
                                                         setReader={this.setReaderManga.bind(this)}/>)}
                </AuthUserContext.Consumer>
                <Trading/>
                <AuthUserContext.Consumer>
                    {authUser => (authUser &&
                        <Reader setImageUrls={this.setImageUrls.bind(this)} imageURLs={this.state.imageURLs}/>)}
                </AuthUserContext.Consumer>
            </div>
        )
    }
}

export default Landing;