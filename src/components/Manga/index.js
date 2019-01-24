import React from 'react'

const Manga = ({id, title, priority, Nchapter, img}) => (
    <div key={id} id={id} className={"manga mangaCard"}>
        <img src={img} className={'col-md-5 no-padding'} alt={title}/>
        {priority > 0 && <i className="fas fa-bookmark"><span>{Nchapter}</span></i>}
        <div className={"info-manga col-md-7 priority" + priority}>
            <h2 className="title">{title}</h2>
        </div>
    </div>
);

export default Manga;