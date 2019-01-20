import React from 'react';
import Manga from "../Manga";
import {withMangaApi} from "../MangaApi";
import {compose} from 'recompose';
import {withFirebase} from "../Firebase";

class Search extends React.Component {

    constructor(props) {
        super(props);
        this.state = {result: [], search: '', calling: null}
    }

    componentWillUnmount() {
        // cancel the call if the component unmount
        !!this.state.calling && Promise.reject(this.state.calling);
    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        // no update if the search do not return anything
        return nextState.search.length >= 3 || nextState.result.length > 0;
    }

    /**
     * Return lunch the manga research.
     *
     * @param event
     */
    onChange = event => {
        event.persist();
        let call = this.searchManga(event.target.value).then(result => {
            this.setState({
                search: event.target.value,
                result: result
            });
        });
        this.setState({calling: call});
    };


    onClick = (manga) => {
        this.props.mangaapi.mangasDetail([manga]).then(mangaDetail => {
                manga = (mangaDetail.mangas)[0];
                this.props.firebase
                    .doInsertFavoriteManga(manga)
                    .then(this.props.updateFavorites(manga))
                    .catch(error => {
                        this.setState({error});
                    });
                this.setState({result: [], search: ''})
            }
        )
        ;
    };

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
            <div id='search' className={"container-fluid"}>
                <form className={"searchForm col-md-6"}>
                    <div className="form-group wrapper-search">
                        <i className="fas fa-search"/>
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
                    {this.state.error && <div className={'error'}>{this.state.error}</div>}
                    {this.state.result.length > 0 && <h2>Résultats de la recherche</h2>}
                    <ul className={"mangas row"}>
                        {this.state.result.slice(0, 10).map((manga) =>
                            <li key={manga.id} className={"col-md-2"}>
                                <div onClick={() => this.onClick(manga)} className="linkTo">
                                    <Manga Nchapter={1} priority={0} title={manga.title}
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

export default compose(withMangaApi, withFirebase)(Search);