import React, {useEffect} from "react";
import { Link } from "react-router-dom";
import {useState} from "react";
import axios from "axios";


const Home = () => {
    const [getUrl, setUrl] = useState([])
    const [urlInput,setUrlInput]=useState()
    const baseUrl = window.origin
    const url = baseUrl + "/api/v1/links"
    const fetchUrl = () => {
        axios.get(url)
            .then((data) => {
                setUrl(data.data.links);
            }).catch(err=>{
            console.log(err)
        })
    }

    useEffect(()=> {
        fetchUrl()
    }, [])

    const handleSubmit=()=>{
        axios.post(url,{original_url:urlInput})
            .then((data) => {
            }).catch(err=>{
            console.log(err)
            alert(err.response.data.error)
        })
    }

    const copyShortUrl=(text)=>{
        const referLabel = document.querySelector(`.${text}`);
        if (referLabel) {
            const textToCopy = referLabel.textContent;

            navigator.clipboard
                .writeText(textToCopy)
                .then(() => {
                })
                .catch((error) => {
                    console.error("Failed to copy text:", error);
                });
        } else {
            console.error("Element with class '.copy-to-clipboard' not found.");
        }
    }

    return (
        <div className="vw-100 p-5 primary-color d-flex flex-column align-items-center justify-content-center">
            <div>
                <form>
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">Enter your URL</label>
                        <input type="url" className="form-control w-100" id="exampleInputEmail1"
                               aria-describedby="emailHelp" value={urlInput} onChange={(e)=>{setUrlInput(e.target.value)}}/>
                    </div>
                    <button type="submit" className="btn btn-primary" onClick={()=>{handleSubmit()}}>Submit</button>
                </form>
            </div>


            <div>
                {getUrl.map((url, index) => (
                    <div className="card mt-3" key={index}>
                        <div className="card-header">
                            Shortened URL
                        </div>
                        <div className="card-body">
                            <p className="card-text"> <span className="fw-bold"> Original Url: </span> {url.original_url}</p>
                            <p className="card-text"><span
                                className="fw-bold"> shorten Url:</span> <span className="shorten-url"> {`${baseUrl}/${url.short_code}`} </span>
                                <span className="bi-copy" style={{cursor:"pointer"}} onClick={copyShortUrl("shorten-url")}></span> </p>
                            <a href={`${baseUrl}/${url.short_code}`} className="btn btn-primary"
                               target="_blank"
                               rel="noopener noreferrer">
                                shorten url
                            </a>
                        </div>
                    </div>
                ))}
            </div>

        </div>
    )
}
export default Home;
