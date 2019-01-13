import React from 'react'

const Manga = ({id, title, priority, Nchapter, img}) => (
    <div key={id} id={id} className={"manga mangaCard"}>
        <img src={img} alt={title}/>
        {priority > 0 && <i className="fas fa-bookmark"><span>{Nchapter}</span></i>}
        <div className={"info-manga priority" + priority}>
            <h2 className="title">{title}</h2>
            <p>Themes</p>
        </div>
    </div>
);

export default Manga;