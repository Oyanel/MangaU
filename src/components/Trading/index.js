import React from 'react';
import {withMangaApi} from "../MangaApi";
import Manga from "../Manga";
import Slider from "react-slick";

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
        const settings = {
            slidesToShow: 5,
            slidesToScroll: 5
        };
        return (
            <div>
                {this.state.trading.length === 0
                && <div className={'background-waiting'}>
                    <div className={'waiting'}/>
                </div>
                }
                <div className={"results"}>
                    <h2 className={'col-md-12'}>En ce moment</h2>
                    <div className={"mangas col-md-12"}>
                        <Slider {...settings}>
                            {this.state.trading.length > 0 && this.state.trading.map((manga) =>
                                <div key={manga.id} className={"col-md-12"}>
                                    <div onClick={() => this.onClick(manga)} className="linkTo">
                                        <Manga Nchapter={manga.lastChapter && manga.lastChapter.number} priority={0}
                                               title={manga.title}
                                               img={manga.thumbnailUrl}/>
                                    </div>
                                </div>
                            )}
                        </Slider>
                    </div>
                </div>
            </div>
        )
    }
}

export default withMangaApi(Trading);