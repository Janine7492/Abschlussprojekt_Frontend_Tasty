import { useState, useEffect } from "react";
import KeyCard from "../keyCard/KeyCard";
import "./Searchbar.css";
import Lupe from "../../assets/img/lupeWhite.svg"

function Searchbar(props) {

    const [inputValue, setInputValue] = useState();

    const [inputArray, setInputArray] = useState();


    useEffect(() => {
        const arrayCat2 = inputArray;
        console.log("render fetch area search")
        fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${inputValue ? inputValue : "undefined"}`)
            .then(response => response.json())
            .then(singleArea => {

                if ((singleArea.meal !== null || undefined)) {
                    setInputArray(singleArea.meals);
                }

            });
    }, [inputValue]);



    useEffect(() => {
        const arrayCat = inputArray;
        console.log("render fetch area search")
        fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${inputValue ? inputValue : ""}`)
            .then(response => response.json())
            .then(singleArea => {

                if ((singleArea.meals !== null || undefined)) {
                    setInputArray(singleArea.meals);
                }
            });
    }, [inputValue]);


    console.log(inputValue);
    console.log(inputArray);

    const [outputText, setOutputText] = useState();


    useEffect(() => {
        if (!inputValue) {
            setOutputText("");
            setInputValue(null)
            setSee("detailsHidden")
        }
        else if (inputValue === "") {
            setInputArray(null);
            setOutputText("");
            setSee("detailsHidden")
        }
        else if (inputValue && inputArray) {
            setOutputText("Following results match your search request:");
            setSee("detailsShown")
        } else if (inputValue && !inputArray) {
            setOutputText("No results match your search request, please try again or see our categories for inspiration.");
            setSee("detailsShown")
        }
    }, [inputValue])


    console.log(outputText);



    const [see, setSee] = useState();
    console.log(see)

    return (
        <div className="Searchbar">
            <div className="searchbarWrapper">
                <img src={Lupe} alt="Lupe" className="lupe" />
                <input type="text" className="suche" id={props.searchId} onChange={e => setInputValue(e.target.value)} placeholder="Search" />
            </div>
            <div className={see} >
                <h5 className="returnMsg">{outputText}</h5>
                {inputArray?.map((singleValue, index) => {
                    console.log("Test Map Array")
                    return (

                        <KeyCard key={index} url={singleValue.strMealThumb
                        } name={singleValue.strMeal} cat={singleValue.strCategory
                        } link={`/details/${singleValue.idMeal}`} />
                    )
                })}
            </div>
        </div>
    );
}

export default Searchbar;
