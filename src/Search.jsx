import './Search.css';
import React, { useState, useRef, useEffect } from 'react';
import { BiSearch } from 'react-icons/bi';
import { FaStar, FaStarHalfAlt } from 'react-icons/fa';
import Rating from 'react-rating-stars-component';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

function Search() {
    const [animeName, setAnimeName] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [error, setError] = useState(null);
    const [imageLoaded, setImageLoaded] = useState(false);

    const inputRef = useRef(null);

    const handleImageLoad = () => {
        setImageLoaded(true);
    };

    const totalResults = searchResults.length;

    const handleSearch = async (event) => {
        event.preventDefault();

        if (animeName.trim() === '') {
            setError('Por favor, ingrese un nombre de anime');
            return;
        }

        try {
            const response = await fetch(`https://localhost:7166/Animes/search/${animeName}`);
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const results = await response.json();
            setSearchResults(results);
            setAnimeName('');
            setError(null);
            inputRef.current.focus();
        } catch (error) {
            console.error('Error fetching data:', error);
            setSearchResults([]);
            setError('Anime no encontrado');
        }
    };

    useEffect(() => {
        inputRef.current.focus();
    }, []);

    return (
        <div className='principal text-warning'>
            <form onSubmit={handleSearch} className='input-group'>
                <input
                    type="text"
                    id='anime'
                    name='anime'
                    placeholder='Buscar...'
                    value={animeName}
                    onChange={(e) => setAnimeName(e.target.value)}
                    ref={inputRef}
                />
                <button className='btn btn-dark' type='submit'>
                    <BiSearch />
                </button>
            </form>
            {totalResults > 0 ? (
                <div className='container'>
                    <fieldset className='container__fieldset'>
                        <h2 className='container__h2'>{totalResults} {totalResults === 1 ? 'resultado' : 'resultados'}</h2>
                        <div className='container__imgs'>
                            {searchResults.map((result) => (
                                <div className='secundario' key={result.id}>
                                    <p className='secundario__parrafo bg-primary bg-gradient px-3 py-2'>Nombre: {result.title}</p>
                                    {result.imageUrl && (
                                        <div className='secundario__contenido'>
                                            <Link to={`/contenido/${result.id}`} key={result.id}>
                                                <img src={result.imageUrl}
                                                    alt={result.title}
                                                    style={{ width: '250px', height: '300px', border: '3px solid black', cursor: 'pointer' }}
                                                    onLoad={handleImageLoad}
                                                />
                                            </Link>
                                            <Rating
                                                count={5}
                                                value={result.rating} // Debes tener un campo 'rating' en tu resultado
                                                size={24}
                                                activeColor="#ffd700"
                                                edit={false}
                                                isHalf={true}
                                                emptyIcon={<FaStar />}
                                                halfIcon={<FaStarHalfAlt />}
                                                filledIcon={<FaStar />}
                                            />
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </fieldset>
                </div>
            ) : (
                <div>
                    {error ? <p>{error}</p> : null}
                </div>
            )}
        </div>
    );
}

export default Search;