import React from 'react';
import {withMangaApi} from "../MangaApi";
import {AuthUserContext} from '../Session';
import Manga from "../Manga";
import Search from "../Search";

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
            <div className={'container-fluid landing-page'}>
                <AuthUserContext.Consumer>
                    {authUser =>
                        (authUser && <Search/>)
                    }
                </AuthUserContext.Consumer>
                <div className={"results"}>
                    <h2>Mes Mangas</h2>
                    <ul className={"mangas row"}>
                        {this.state.trading.map((manga) =>
                            <li key={manga.id} className={"col-md-2"}>
                                <a href={manga.lastChapter.url} className="linkTo">
                                    <Manga Nchapter={manga.lastChapter.number} priority={1} title={manga.title}
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