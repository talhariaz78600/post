import React, { useCallback, useEffect, useState } from 'react';
// import { useDropzone } from 'react-dropzone';
import style from "./ui.module.css";
import { Loader } from "../Loader/loader";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import axios from "axios";
import imageCompression from 'browser-image-compression';
import { addAd, selectAllAds } from '../../Store/authSlice';
function Tasks() {
    const dispatch = useDispatch()
    const storeAllAds = useSelector(selectAllAds)

    const [loading, setLoading] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);
    const [postdata, setPostdata] = useState({ adsDiscription: "", adsRating: 0 });
    const serverURL = process.env.REACT_APP_SERVER_URL;
    // const dispatch = useDispatch(); 
    const options = {
        maxSizeMB: 1,
        maxWidthOrHeight: 1920,
        useWebWorker: true,
    };
    // const onDrop = useCallback((acceptedFiles) => {
    //     setSelectedFile(acceptedFiles[0]);
    //     console.log(acceptedFiles[0]);
    // }, []);

    // const { getRootProps, getInputProps } = useDropzone({
    //     onDrop,
    //     accept: '.png, .jpg',
    //     maxFiles: 1, // Limit the user to upload only one file
    // });

    const handleInput = (e) => {
        // e.preventDefault();
        setPostdata((pre) => ({ ...pre, [e.target.name]: e.target.value }))
        // setPostdata({ ...postdata, [e.target.name]: e.target.value });
    };

    const submit = async (e) => {
        e.preventDefault();
        console.log(selectedFile);

        if (selectedFile && postdata.adsDiscription.trim() !== "" && postdata.adsRating !== 0) {

            setLoading(true);
            const compressedFile = await imageCompression(selectedFile, options);
            console.log(compressedFile)
            const formData = new FormData();
            formData.append('AdsImage', compressedFile);
            formData.append('adsDiscription', postdata.adsDiscription);
            formData.append('adsRating', postdata.adsRating);
            try {


                const response = await axios.post(`${serverURL}/api/tasks/add-tasks`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });

                setLoading(false);

                if (response && response.status === 200) {
                    console.log(response);
                    dispatch(addAd(response.data.ad))
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
                                    {/* <div className="col-md-12">

                                        <div className="mb-3">

                                            <div className="file-uploader border border-2 text-center  bg-light curser">
                                                <input type="file" onChange={(e) => { setSelectedFile(e.target.files[0]) }} />
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
                                    </div> */}

                                    <div className="col-md-12">
                                        <div className="mb-3">
                                            <h6>
                                                Ads Image
                                            </h6>
                                            <input

                                                type="file" onChange={(e) => { setSelectedFile(e.target.files[0]) }} className="form-control "
                                            />
                                        </div>
                                    </div>
                                    <div className="col-md-12">
                                        <div className="mb-3">
                                            <h6>
                                                Ads Rating
                                            </h6>
                                            <input
                                                type="number"
                                                className="form-control"
                                                id="adsRating"
                                                placeholder="Ads rating"
                                                name='adsRating'
                                                step="0.1"
                                                min="1"
                                                max="5"
                                                value={postdata.adsRating}
                                                onChange={handleInput}
                                            />
                                        </div>
                                    </div>

                                    <div className="col-12">

                                        <div className="mb-3">
                                            <h6>
                                                Ads Description
                                            </h6>
                                            <textarea className="form-control" value={postdata.adsDiscription} id="adsDiscription" onChange={handleInput} name='adsDiscription' rows="4" placeholder="Please mention here ads description. "></textarea>
                                        </div>
                                        <button type="submit" className="btn btn-primary px-4 mb-5">Submit Ad</button>
                                    </div>
                                </div>
                            </div>







                        </form>
                    </div>
                </div>
            </div>
            {storeAllAds && storeAllAds.length > 0 &&
                <div>
                    <div className="container ">
                        <div className="row  ">
                            {storeAllAds.map((ad, index) => {
                                return <div key={index} className="col-lg-3  col-md-6 col-sm-12 text-center my-2  border-danger-1 p-1 border">
                                    <h5>{ad.adsDiscription}</h5>
                                    <h5>{ad.adsRating}</h5>
                                    <img src={ad.adsImageUrl} width={"200px"} height={"200px"} alt="ad img" />
                                </div>
                            })}
                        </div>

                    </div>
                </div>
            }
            <Loader loading={loading} />
        </div>
    )
}

export default Tasks
