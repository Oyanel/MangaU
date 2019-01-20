import React from 'react';
import Manga from "../Manga";

import {withFirebase} from "../Firebase";

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

    render() {
        return (
            <div className={"results"}>
                <h2>Mes Favoris</h2>
                {this.state.favorites.length === 0 && <div>Pas de favoris pour le moment</div>}
                <ul className={"mangas row"}>
                    {this.state.favorites.length > 0 && this.state.favorites.map((manga) =>
                        <li key={manga.id} className={"col-md-2"}>
                            <div className="linkTo">
                                <Manga Nchapter={manga.lastChapter && manga.lastChapter.number} priority={1}
                                       title={manga.title}
                                       img={manga.thumbnailUrl}/>
                            </div>
                        </li>
                    )}
                    {this.props.newFavorites.length > 0 && this.props.newFavorites.map((manga) =>
                        <li key={manga.id} className={"col-md-2"}>
                            <div className="linkTo">
                                <Manga Nchapter={manga.lastChapter && manga.lastChapter.number} priority={1}
                                       title={manga.title}
                                       img={manga.thumbnailUrl}/>
                            </div>
                        </li>
                    )}
                </ul>
            </div>
        )
    }
}

export default withFirebase(Favorites);