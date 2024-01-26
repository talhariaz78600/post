import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import style from "./ui.module.css";
import { Loader } from "../Loader/loader";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import axios from "axios";

function Ads() {
    const [loading, setLoading] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);
    const [postdata, setPostdata] = useState({ adsDiscription: "", adsRating: 0 });
    const serverURL = process.env.REACT_APP_SERVER_URL;
    // const dispatch = useDispatch(); 

    const onDrop = useCallback((acceptedFiles) => {
        setSelectedFile(acceptedFiles[0]);
        console.log(acceptedFiles[0]);
    }, []);

    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
        accept: '.png, .jpg',
        maxFiles: 1, // Limit the user to upload only one file
    });

    const handleInput = (e) => {
        e.preventDefault();
        setPostdata({ ...postdata, [e.target.name]: e.target.value });
    };

    const submit = async (e) => {
        e.preventDefault();
        console.log(selectedFile);

        if (selectedFile && postdata.adsDiscription.trim() !== "" && postdata.adsRating !== 0) {
            const formData = new FormData();
            formData.append('AdsImage', selectedFile);
            formData.append('adsDiscription', postdata.adsDiscription);
            formData.append('adsRating', postdata.adsRating);
            try {
                setLoading(true);


                const response = await axios.post(`${serverURL}/api/Ads/add-Ads`, formData);

                setLoading(false);

                if (response && response.status === 200) {
                    console.log(response);
                    // dispatch(allusers(response.data.users))
                    toast.success(response.data.message);
                }
            } catch (error) {
                setLoading(false);
                console.log(error)
                // if (error.response) {
                //     const errorMessage = error.response.data.message || "Failed to upload Ads";
                //     toast.error(errorMessage);
                // } else {
                //     console.error("Failed to upload Ads", error.message);
                // }
            }
        } else {
            toast.error("Please fill in all the required fields and upload one image");
        }
    };


    return (
        <div>
            <div className={`p-2  text-light ${style.Sheading} `}>

                <h2 className={style.Heading}>
                    Ads
                </h2>
            </div>
            <div className="container">
                <div className="col-12">
                    <h3 className='mt-2'>Add ads</h3>
                </div>
                <div className="row justify-content-center">
                    <div className="col-12 mt-3">
                        <form onSubmit={submit} >
                            <div className="container">
                                <div className="row">
                                    <div className="col-md-12">

                                        <div className="mb-3">

                                            <div className="file-uploader border border-2 text-center  bg-light curser">
                                                <div {...getRootProps()} className="file-input">
                                                    <input {...getInputProps()} />
                                                    <p className='mt-2'>Drag & drop ads pictures here, or click to select pictures</p>
                                                </div>
                                                {selectedFile && (
                                                    <div className="selected-files">
                                                        <p>Selected File:</p>
                                                        <ul>
                                                            <li>{selectedFile.name}</li>
                                                        </ul>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-md-12">
                                        <div className="mb-3">
                                            <input
                                                type="number"
                                                className="form-control"
                                                id="adsRating"
                                                placeholder="Ads rating"
                                                name='adsRating'
                                                step="0.1"
                                                min="1"
                                                max="5"
                                                onChange={handleInput}
                                            />
                                        </div>
                                    </div>

                                    <div className="col-12">

                                        <div className="mb-3">
                                            <textarea className="form-control" id="adsDiscription" onChange={handleInput} name='adsDiscription' rows="4" placeholder="Please mention here ads description. "></textarea>
                                        </div>
                                        <button type="submit" className="btn btn-primary px-4 mb-5">Submit Ad</button>
                                    </div>
                                </div>
                            </div>







                        </form>
                    </div>
                </div>
            </div>
            <Loader loading={loading} />
        </div>
    )
}

export default Ads
