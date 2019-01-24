import React from 'react';
import Manga from "../Manga";
import {compose} from 'recompose';
import Slider from "react-slick";

import {withFirebase} from "../Firebase";
import {withMangaApi} from "../MangaApi";

class Favorites extends React.Component {

    constructor(props) {
        super(props);
        this.state = {favorites: []};
    }

    componentDidMount() {
        this.props.firebase.getFavoriteMangas().then((result) => {
            this.setState({favorites: result});
        });
    }

    async onClick(manga) {
        let images = await this.props.mangaapi.getPageList(manga);
        this.props.setReader(images);
    }

    render() {
        const settings = {
            slidesToShow: 5,
            slidesToScroll: 5
        };
        return (
            <div className={"results"}>
                <h2 className={'col-md-12'}>Mes Favoris</h2>
                {this.state.favorites.length === 0 && <div>Pas de favoris pour le moment</div>}
                <div className={"mangas col-md-12"}>
                    <Slider {...settings}>
                        {this.state.favorites.length > 0 && this.state.favorites.map((manga) =>
                            <div key={manga.id} className={"col-sm-12"}>
                                <div onClick={() => this.onClick(manga)} className="linkTo">
                                    <Manga Nchapter={manga.lastChapter && manga.lastChapter.number} priority={1}
                                           title={manga.title}
                                           img={manga.thumbnailUrl}/>
                                </div>
                            </div>
                        )}
                        {this.props.newFavorites.length > 0 && this.props.newFavorites.map((manga) =>
                            <div key={manga.id} className={"col-md-12"}>
                                <div onClick={() => this.onClick(manga)} className="linkTo">
                                    <Manga Nchapter={manga.lastChapter && manga.lastChapter.number} priority={1}
                                           title={manga.title}
                                           img={manga.thumbnailUrl}/>
                                </div>
                            </div>
                        )}
                    </Slider>
                </div>
            </div>
        )
    }
}

export default compose(withMangaApi, withFirebase)(Favorites);