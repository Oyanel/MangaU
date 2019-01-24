import React from 'react';
import {withMangaApi} from "../MangaApi";
import Manga from "../Manga";

class Trading extends React.Component {

    constructor(props) {
        super(props);
        this.state = {trading: []};
    }

    componentDidMount() {
        this.props.mangaapi.getTrading(0)
            .then((result) => {
                    this.setState({trading: result});
                }
            );
    }

    onClick(manga) {
        let images = this.props.mangaapi.getPageList(manga);
        this.props.setReader(images);
    }

    render() {
        return (
            <div>
                {this.state.trading.length === 0
                && <div className={'background-waiting'}>
                    <div className={'waiting'}/>
                </div>
                }
                <div className={"results"}>
                    <h2>En ce moment</h2>
                    <ul className={"mangas row"}>
                        {this.state.trading.length > 0 && this.state.trading.map((manga) =>
                            <li key={manga.id} className={"col-md-2 col-sm-12"}>
                                <div onClick={() => this.onClick(manga)} className="linkTo">
                                    <Manga Nchapter={manga.lastChapter && manga.lastChapter.number} priority={0}
                                           title={manga.title}
                                           img={manga.thumbnailUrl}/>
                                </div>
                            </li>
                        )}
                    </ul>
                </div>
            </div>
        )
    }
}

export default withMangaApi(Trading);