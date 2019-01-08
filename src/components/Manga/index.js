import React from 'react'

const Manga = ({id, title, priority, Nchapter, themes}) => (
    <div key={id} id={id} className={"manga mangaCard " + priority}>
        <h2 className="title">{title}</h2>
        <p className="number_chp">{Nchapter}</p>
        <p>Themes</p>
        <ul>
            {themes.map((theme, index) => (<li key={index}>{theme}</li>))}
        </ul>
    </div>
);

export default Manga;