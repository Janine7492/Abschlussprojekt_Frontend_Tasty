import { useEffect, useState } from "react";
import "./Detail.css";
import { useParams } from "react-router-dom";

import Navbar from "../../components/navbar/Navbar";
import homeWhite from "../../assets/img/homeWhite.svg"
import lupeBlau from "../../assets/img/lupeBlau.svg"
import favsWhite from "../../assets/img/favsWhite.svg"
import profil from "../../assets/img/profilWhite.svg"

function Detail() {

    // Get params from url

    const params = useParams();
    const id = params.id



    // Fetch data from API

    const [detailData, setDetailData] = useState();

    useEffect(() => {
        fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
            .then(response => response.json())
            .then(detailData => {
                setDetailData(detailData.meals[0]);
                // ingredients();
            });
    }, []);



    // Create Array of ingredients
    const ingredientArray = [];

    ingredientArray.push(detailData?.strMeasure1 + " " + detailData?.strIngredient1);
    ingredientArray.push(detailData?.strMeasure2 + " " + detailData?.strIngredient2);
    ingredientArray.push(detailData?.strMeasure3 + " " + detailData?.strIngredient3);
    ingredientArray.push(detailData?.strMeasure4 + " " + detailData?.strIngredient4);
    ingredientArray.push(detailData?.strMeasure5 + " " + detailData?.strIngredient5);
    ingredientArray.push(detailData?.strMeasure6 + " " + detailData?.strIngredient6);
    ingredientArray.push(detailData?.strMeasure7 + " " + detailData?.strIngredient7);
    ingredientArray.push(detailData?.strMeasure8 + " " + detailData?.strIngredient8);
    ingredientArray.push(detailData?.strMeasure9 + " " + detailData?.strIngredient9);
    ingredientArray.push(detailData?.strMeasure10 + " " + detailData?.strIngredient10);
    ingredientArray.push(detailData?.strMeasure11 + " " + detailData?.strIngredient11);
    ingredientArray.push(detailData?.strMeasure12 + " " + detailData?.strIngredient12);
    ingredientArray.push(detailData?.strMeasure13 + " " + detailData?.strIngredient13);
    ingredientArray.push(detailData?.strMeasure14 + " " + detailData?.strIngredient14);
    ingredientArray.push(detailData?.strMeasure15 + " " + detailData?.strIngredient15);
    ingredientArray.push(detailData?.strMeasure16 + " " + detailData?.strIngredient16);
    ingredientArray.push(detailData?.strMeasure17 + " " + detailData?.strIngredient17);
    ingredientArray.push(detailData?.strMeasure18 + " " + detailData?.strIngredient18);
    ingredientArray.push(detailData?.strMeasure19 + " " + detailData?.strIngredient19);
    ingredientArray.push(detailData?.strMeasure20 + " " + detailData?.strIngredient20);
    // }



    // Switch between ingredients and instructions
    const [detailsIngredients, setDetailsIngredients] = useState("detailsShown");
    const [detailsInstructions, setDetailsInstructions] = useState("detailsHidden");
    const [switchColorIng, setSwitchColorIng] = useState("buttonActive");
    const [switchColorIns, setSwitchColorIns] = useState("");

    // ===================

    let modifiedInstr = detailData?.strInstructions;

    let newSentences = modifiedInstr?.split(". ")

    let newModifiedString = [];
    let tempString = "";
    // Durch jeden Satz loopen im Array
    for (let i = 0; i < newSentences?.length; i++) {
        // Die Sätze vom Array in den String packen
        tempString += newSentences[i] + ". ";
        // Falls der aktuelle Satz der dritte in der Gruppe ist
        if (i % 3 === 2) {
            // Ein <br> nach dem aktullem Satz einfügen
            newModifiedString.push(tempString);
            tempString = "";
        }
    }

    // ====================



    return (
        <div className="detailsWrapper">
            <section className="detailsBgPic">
                <img alt={detailData?.strMeal
                } src={detailData?.strMealThumb
                } />
            </section>
            <div className="detailsLowerPart">
                <section className="detailsHeader">
                    <h2 className="detailsTitle">{detailData?.strMeal}</h2>
                    <p className="detailsMedium">{detailData?.strCategory}</p>
                    <p className="detailsLight">{detailData?.strArea}</p>
                </section>
                <section className="detailsSwitch">
                    <button className={`${switchColorIng}`} type="button" onClick={() => {
                        setDetailsIngredients("detailsShown");
                        setDetailsInstructions("detailsHidden");
                        setSwitchColorIng("buttonActive");
                        setSwitchColorIns("buttonInactive");
                    }}>Ingredients</button>
                    <button className={`${switchColorIns}`} type="button" onClick={() => {
                        setDetailsIngredients("detailsHidden");
                        setDetailsInstructions("detailsShown");
                        setSwitchColorIng("buttonInactive")
                        setSwitchColorIns("buttonActive")
                    }}>Instructions</button>
                </section>

                <section className={detailsIngredients}>
                    <h3 className="detailsMainSec">Ingredients</h3>
                    {ingredientArray.map((singleIngredient, index) => {
                        {/* if (singleIngredient !== " ")  112 */ }

                        if (ingredientArray[index].length > 2) {
                            return <p key={index}>{singleIngredient}</p>
                        }

                    })}

                </section>

                <section className={detailsInstructions}>
                    <h3 className="detailsMainSec">Instructions</h3>
                    <section>
                        {/* //Arrayinhalt aus 3 Sätzen in eine Karte */}
                        {newModifiedString.map((item, index) =>
                            <article className="p_modifiedString" key={index}>{item}</article>
                        )}
                        {/* <p>{newModifiedString}</p> */}

                    </section>
                    <a className="video" href={detailData?.strYoutube
                    } target="_blank" rel="noreferrer">Video</a>
                </section>




            </div>
            <Navbar
                homeBlau={homeWhite}
                lupeWhite={lupeBlau}
                favs={favsWhite}
                profil={profil}
            />
        </div>
    );
};

export default Detail;