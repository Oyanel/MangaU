import React from 'react';

const MangaApiContext = React.createContext(null);

export const withMangaApi = Component => props => (
    <MangaApiContext.Consumer>
        {mangaApi => <Component {...props} mangaapi={mangaApi} />}
    </MangaApiContext.Consumer>
);
export default MangaApiContext;