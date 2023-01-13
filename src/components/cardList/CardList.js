import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Buttons from "../buttons/Buttons";
import SeeAll from "../seeAll/SeeAll";
import Card from "./Card";




function CardList() {

    // ========================
    // Get Params
    // ========================
    const params = useParams();
    const value = params.value;
    const type = params.type;

    // ============================
    // Fetches
    // =============================
    const [areasList, setAreasList] = useState();
    useEffect(() => {
        // console.log("render fetch areaList")
        fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`)
            .then(response => response.json())
            .then(areasAPI => {
                setAreasList(areasAPI.meals);
                // console.log(areasAPI)
            });
    }, []);

    const [chosenArea, setChosenArea] = useState();
    useEffect(() => {
        // console.log("render fetch area")
        fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${value !== "areas" ? value : "America"}`)
            .then(response => response.json())
            .then(singleArea => {
                setChosenArea(singleArea.meals);
                // console.log(singleArea)
            });
    }, [value]);

    const [catList, setCatList] = useState();
    useEffect(() => {
        // console.log("render fetch catList")
        fetch(`https://www.themealdb.com/api/json/v1/1/list.php?c=list`)
            .then(response => response.json())
            .then(catAPI => {
                setCatList(catAPI.meals);
                // console.log(areasAPI)
            });
    }, []);

    // console.log(catList)

    const [chosenCat, setChosenCat] = useState();
    useEffect(() => {
        // console.log("render fetch cat")
        fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${value ? value : "Beef"}`)
            .then(response => response.json())
            .then(singleCat => {
                setChosenCat(singleCat.meals);
                // console.log(singleArea)
            });
    }, [value]);



    // ============================
    // ClassName Hidden or Shown
    // ============================
    const [see, setSee] = useState("detailsHidden");
    const [nameBtn, setNameBtn] = useState()



    if (type === "areas") {
        return (
            <div>
                {/* SeeAll Button */}
                <SeeAll functionBtn={() => {
                    if (see === "detailsShown") {
                        setSee("detailsHidden");
                        setNameBtn("See All");
                    } else {
                        setSee("detailsShown");
                        setNameBtn("See Less");
                    }
                }} name={nameBtn} />

                {/* List of Buttons */}
                <div className="buttonCloud">
                    {areasList?.map((singleArea, index) => {
                        return <Buttons key={index} buttonName={singleArea.strArea
                        } classBtn={index > 2 ? see : "inline_block"} buttonLink={`/search/areas&${singleArea.strArea}`} />
                    })}
                </div>
                {/* Recipe overview */}
                <div className="imgCloud">
                    {chosenArea?.map((singleDish, index) => {
                        return <Card key={index} url={singleDish.strMealThumb
                        } name={singleDish.strMeal
                        } link={`/details/${singleDish.idMeal}`} />
                    })}
                </div>
            </div>
        )
    }


    if (type === "category") {
        return (
            <div>
                {/* SeeAll Button */}
                <SeeAll functionBtn={() => {
                    if (see === "detailsShown") {
                        setSee("detailsHidden");
                        setNameBtn("See All");
                    } else {
                        setSee("detailsShown");
                        setNameBtn("See Less");
                    }
                }} name={nameBtn} />

                {/* List of Buttons */}
                <div className="buttonCloud">
                    {catList?.map((singleCat, index) => {
                        return <Buttons key={index} buttonName={singleCat.strCategory
                        } classBtn={index > 2 ? see : "inlineBlock"} buttonLink={`/search/category&${singleCat.strCategory}`} />
                    })}
                </div>
                {/* Recipe overview */}
                <div className="imgCloud">
                    {chosenCat?.map((singleDish, index) => {
                        return <Card key={index} url={singleDish.strMealThumb
                        } name={singleDish.strMeal
                        } link={`/details/${singleDish.idMeal}`} />
                    })}
                </div>
            </div>
        )
    }

};


export default CardList;