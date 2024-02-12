import React from "react";
import { useParams } from "react-router-dom";
import './Contenido.css';

function Contenido() {
    const { animeId } = useParams();
    console.log(animeId)
    return (
        <div className="contenido" style={{ backgroundImage: `url(/img/fondo${animeId}.jpg)` }}>
            <fieldset className="contenido__fieldset">

            </fieldset>
        </div>
    );
}

export default Contenido;