import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import "./RandomCard.css"
import dot from "../../assets/img/Ellipse87.svg"

function RandomCard() {
    const [randomRecipe, setRandomRecipe] = useState();
    useEffect(() => {
        fetch("https://www.themealdb.com/api/json/v1/1/random.php")
            .then(response => response.json())
            .then(randomAPI => {
                setRandomRecipe(randomAPI.meals[0]);
            });
    }, []);


    return (
        <div className="RandomCard">
            <h2 className='randomTitle'>Meal of the Day</h2>
            <Link className='randomLink' to={`/details/${randomRecipe?.idMeal}`}>
                <article className='blueBox'>
                    <div className='randomDiv1'>
                        <h2 className='randomTitle'>{randomRecipe?.strMeal}</h2>
                        <img alt={randomRecipe?.strMeal} src={`${randomRecipe?.strMealThumb}`} className="randomBild" />
                        <div className='randomCatAr'>
                            <div className='dotCat'> <img src={dot} /><p>{randomRecipe?.strCategory}</p></div>
                            <p>{randomRecipe?.strArea}</p>
                        </div>
                    </div>
                </article>
            </Link>
        </div >
    );

}

export default RandomCard;
