import React, { useState } from "react"
import { Button } from "reactstrap";
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import axios from "axios";
import { toast } from "react-toastify";
import { Loader } from "../Loader/loader";
import { useDispatch } from "react-redux";
import { removeUser, removePosts, removePinnedPosts } from "../../Store/authSlice";
const serverURL = process.env.REACT_APP_SERVER_URL

export function DeleteModel(props) {
    console.log(props);
    const dispatch = useDispatch()
    let [loading, setloading] = useState(false);

    return (<div style={{ position: "relative", zIndex: 14400000 }} >
        <Modal zIndex={140000} isOpen={props.modal} toggle={props.toggle}>
            <ModalHeader toggle={props.toggle}>Delete  account</ModalHeader>
            <ModalBody>
                <div className="mt-2">
                    <p className="text-sm text-gray-500">
                        {props.pContent}
                    </p>

                </div>
            </ModalBody>
            <ModalFooter>
                <Button color="danger" onClick={async () => {
                    props.setModal(!props.modal)


                    try {

                        setloading(true)
                        if (props.deleteWhat === 'user') {

                            let response = await axios.delete(`${serverURL}/api/users/${props.deltedId}/delete_user`)
                            if (response && response.status === 200) {
                                setloading(false)
                                toast.success(response.data.message)
                                dispatch(removeUser({ _id: props.deltedId }))
                                props.setDeletedId('')
                            }
                        } else if (props.deleteWhat === 'UnverifiedUsers') {
                            let response = await axios.delete(`${serverURL}/api/users/deleteUnverified`)
                            if (response && response.status === 200) {
                                setloading(false)
                                console.log(response.data.result);
                                toast.success(response.data.message)
                                window.location.reload()
                            }
                        } else if (props.deleteWhat === 'Post') {
                            let response = await axios.delete(`${serverURL}/api/posts/${props.deltedId}/delete_post`)
                            if (response && response.status === 200) {
                                setloading(false)
                                console.log(response.data.result);
                                toast.success(response.data.message)
                                dispatch(removePosts({ _id: props.deltedId }))
                                props.setDeletedId('')

                            }
                        } else if (props.deleteWhat === 'group') {
                            setloading(true)
                            console.log("delete groups");
                            let response = await axios.delete(`${serverURL}/api/groups/${props.deltedId}/delete_Group`)
                            if (response && response.status === 200) {
                                setloading(false)
                                console.log(response.data.BumperPost);
                                toast.success(response.data.message)
                                dispatch(removePinnedPosts({ _id: props.deltedId }))
                                props.setDeletedId('')

                            }
                        }

                    } catch (error) {
                        setloading(false)
                        if (error) {
                            if (error.response) {
                                console.log(error.response.data);
                                console.log(error.response.status);
                                toast.error(error.response.data.message);
                            } else {
                                toast.error("Failed to Delete");
                            }
                        }

                    }


                }}>
                    Delete
                </Button>{' '}
                <Button color="secondary" onClick={props.toggle}>
                    Cancel
                </Button>
            </ModalFooter>
        </Modal>
        <Loader loading={loading} />
    </div>)
}