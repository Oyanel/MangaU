import React from 'react';
import {MangaApiContext} from "../MangaApi";
import Manga from "../Manga";

class Landing extends React.Component {

    constructor(props) {
        super(props);
        this.state = {favorites: []}
    }

    render() {
        return (
            <div className={'application container-fluid'}>
                <div className={'mangas'}>
                    <div className={'row'}>
                        <MangaApiContext.Consumer>
                            {
                                context => (
                                    context.favorites.slice(0, 10).map((manga) =>
                                        <a href={manga.h} className="linkTo manga col-md-2">
                                            <Manga Nchapter={1} priority={1} title={manga.t}
                                                   themes={manga.c} key={manga.i}/>
                                        </a>
                                    )
                                )
                            }
                        </MangaApiContext.Consumer>
                    </div>
                </div>
            </div>
        )
    }
}

export default Landing;