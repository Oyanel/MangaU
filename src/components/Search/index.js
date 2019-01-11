import React from 'react';
import Manga from "../Manga";
import {withMangaApi} from "../MangaApi";

class Search extends React.Component {

    constructor(props) {
        super(props);
        this.state = {result: [], search: ''}
    }

    onChange = async event => {
        this.setState({
            search: event.target.value,
            result: await this.searchManga(event.target.value)
        });
    };

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        return nextState.search.length >= 3;
    }


    // Search from 3 chars
    searchManga = async (eventValue) => {
        if (eventValue.length > 2) {
            return await this.props.mangaapi.searchManga(eventValue);
        }
        this.setState({result: []});
        return [];
    };

    render() {
        return (
            <div className={"container-fluid"}>
                <form className={"searchForm"}>
                    <div className="form-group">
                        <input
                            id={'search'}
                            className={'form-control'}
                            name="search"
                            onChange={this.onChange}
                            type="text"
                            placeholder="Rechercher un manga"
                        />
                    </div>
                </form>
                <div className={"results"}>
                    <ul className={"mangas row"}>
                        {this.state.result.slice(0, 10).map((manga) =>
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

export default withMangaApi(Search);