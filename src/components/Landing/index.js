import React from 'react';
import {withMangaApi} from "../MangaApi";
import Manga from "../Manga";

class Landing extends React.Component {

    constructor(props) {
        super(props);
        this.state = {trading: []};
    }

    async componentWillMount() {
        let mangas = await this.props.mangaapi.getTrading();
        this.setState({trading: mangas});
    }

    render() {
        return (
            <div className={'container-fluid'}>
                <div className={"results"}>
                    <ul className={"mangas row"}>
                        {this.state.trading.slice(0, 10).map((manga) =>
                            <li key={manga.id} className={"col-md-2"}>
                                <a href={manga.url} className="linkTo">
                                    <Manga Nchapter={1} priority={1} title={manga.title}
                                           img={manga.thumbnailUrl}/>
                                </a>
                            </li>
                        )}
                    </ul>
                </div>
            </div>
        )
    }
}

export default withMangaApi(Landing);