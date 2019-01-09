import React from 'react';
import {MangaApiContext} from "../MangaApi";
import Manga from "../Manga";

class Landing extends React.Component {

    constructor(props) {
        super(props);
        this.state = {trading: []}
    }

    render() {
        return (
            <div className={'application container-fluid'}>
                <div className={'mangas'}>
                    <div className={'row'}>
                        <MangaApiContext.Consumer>
                            {
                                context => (
                                    context.trading.slice(0, 3).map((manga) =>
                                        <a key={manga.id} href={manga.url} className="linkTo manga col-md-2">
                                            <Manga Nchapter={1} priority={1} title={manga.title}
                                                   img={manga.thumbnailUrl}/>
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