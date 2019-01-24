import React from 'react';
import {withMangaApi} from "../MangaApi";

class Reader extends React.Component {

    onClick = () => {
        this.props.setImageUrls([]);
        document.body.classList.remove('no-scroll');
    };

    render() {
        return (
            <div>
                {this.props.imageURLs.length > 0 &&
                <div className={'container-fluid reader-page'}
                     onClick={this.onClick}>
                    <div className="wrapper">
                        {this.props.imageURLs.length > 0 &&
                        this.props.imageURLs.map((imageUrl, index) =>
                            <img key={index} src={imageUrl} alt={'manga'}/>
                        )}
                    </div>
                </div>}
            </div>
        )
    }
}

export default withMangaApi(Reader);