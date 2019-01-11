import React from 'react'

const Manga = ({id, title, priority, Nchapter, img}) => (
    <div key={id} id={id} className={"manga mangaCard priority" + priority}>
        <img src={img} alt={title}/>
            <h2 className="title">{title}</h2>
        <p className="number_chp">{Nchapter}</p>
        <p>Themes</p>
    </div>
);

export default Manga;