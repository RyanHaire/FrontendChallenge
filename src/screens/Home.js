import axios from 'axios'
import React, {useState, useEffect, useRef} from 'react'
import Card from "../components/Card"
import "../styles/homestyle.css"
const {REACT_APP_API_KEY} = process.env;


const Home = () => {

    const [images, setImages] = useState([])

    useEffect(() => {
        axios.get(`https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&camera=fhaz&api_key=${REACT_APP_API_KEY}`)
        .then((response) => {
            for(let i = 0; i < response.data.photos.length; i++) {
                response.data.photos[i]["liked"] = false
                if(localStorage.getItem(`image${i}`) !== null ) {
                    var isTrue = (localStorage.getItem(`image${i}`) == "true")
                    response.data.photos[i]["liked"] = isTrue
                }
            }
            console.log(response.data.photos)
            setImages(response.data.photos)
        })
        .then((err) => {
            console.log(err)
        })
    }, [])

    const handleClick = (e, key) => {
        const newState = [...images]
        localStorage.setItem(`image${key}`, !newState[key].liked)
        newState[key].liked = !newState[key].liked
        setImages(newState)
        
    }

    return (
        <div>
            <div className="display-flex-center"> 
            { images != null ? 
                images.map((image, i)  => <Card key={i} handleClick={(e) => handleClick(e, i)} imgUrl={image.img_src} date={image.earth_date} title={image.rover.name + " Rover"} description={image.camera.full_name} liked={image.liked}/>) :
                "Loading.."
            }
            </div>
        </div>
    )
}


export default Home;