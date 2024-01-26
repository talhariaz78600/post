// import React, { useEffect, useState } from "react";
// import style from "./ui.module.css"
// import { Link, useParams } from "react-router-dom";
// // import database from "../../firebase";
// import { db } from "../../firebase";
// import { collection, getDocs, query, where } from "firebase/firestore";

// export function UserChats() {
//     const { id } = useParams()
//     const [thisUserChats, setThisUserChats] = useState()
//     console.log(id)


//     useEffect(() => {
        

//         if (id ) {
//             try {
//                 const fetchData = async () => {
//                     const feedbackCollectionRef = collection(db, 'chats');
//                     const feedbackQuery = query(feedbackCollectionRef, where('receiverId', '==', id));

//                     const querySnapshot = await getDocs(feedbackQuery);
//                     const feedbackList = [];

//                     querySnapshot.forEach((doc) => {
//                         const feedbackData = doc.data();
//                         feedbackList.push(feedbackData);
//                     });
//                     console.log(feedbackList)
//                     // Set the user data state with the retrieved data
//                     setThisUserChats(feedbackList);
//                 };

//                 fetchData();
//             } catch (error) {
//                 console.error('Error retrieving feedback:', error);
//                 throw error;
//             }
//         }
//     }, []);


//     // useEffect(() => {
//     //     const fetchData = async () => {
//     //         try {
//     //             const snapshot = await database.ref('HomePageData').once('value');
//     //             const fetchedData = snapshot.val();
//     //             if (fetchedData) {
//     //                 const dataArray = Object.values(fetchedData);
//     //                 setThisUserChats(dataArray);
//     //             }
//     //         } catch (error) {
//     //         }
//     //     };
//     //     fetchData();

//     // }, []);

//     console.log(thisUserChats)

//     const UserAllChats = [
//         {
//             userName: "Umair Athar",
//             _id: "567890",
//             profilePicUrl: "https://mediabucket08.s3.amazonaws.com/Users/undefined/2023-11-11T12-44-35.907Z-1699706675-f.png",
//             PostCreated: "10-04-2023"
//         },
//         {
//             userName: "Qasim Athar",
//             _id: "473829",
//             profilePicUrl: "https://mediabucket08.s3.amazonaws.com/Users/undefined/2023-11-11T12-44-35.907Z-1699706675-f.png",
//             PostCreated: "10-04-2023"
//         },
//         {
//             userName: "Muhammad Faizan",
//             _id: "7845930",
//             profilePicUrl: "https://mediabucket08.s3.amazonaws.com/Users/undefined/2023-11-11T12-44-35.907Z-1699706675-f.png",
//             PostCreated: "10-04-2023"
//         },
//     ]


//     return (<>
//         <div className={`p-2  text-light ${style.Sheading} `}>
//             <h2 className={style.Heading}>
//                 User All Chats
//             </h2>
//         </div>


//         <div className="my-2 p-2">

//             <div className={style.containerContent}>
//                 <div className={style.HeadingContent}>
//                     <div className="row gap-2 text-left">
//                         <div className="col">
//                             <h2 className="fw-bold fs-5">User Name</h2>
//                         </div>

//                         <div className="col">
//                             <h2 className="fw-bold fs-5">Last Chat</h2>
//                         </div>

//                     </div>
//                 </div>
//                 {/* to={`/Admin/AdminDashboard/UserDetails/${id}/UserChats/${pst._id}/Chat`} */}
//                 {UserAllChats.map((pst, index) => {
//                     return <div key={index} className={style.Content}>
//                         <div style={{ cursor: "pointer", textDecoration: "none", color: "black" }} className={`row text-left `}>
//                             <div style={{ textDecoration: "underline", color: "green" }} className="col d-flex align-items-center justify-content-start gap-2">
//                                 <div>
//                                     <img
//                                         src={pst.profilePicUrl}
//                                         className="rounded-circle"
//                                         alt="avatar"
//                                         width="45"
//                                         height="45"
//                                     />
//                                 </div>
//                                 <div>
//                                     <h2 className="fw-medium fs-6">{pst.userName}</h2>
//                                 </div>
//                             </div>


//                             <div className="col d-flex align-items-center justify-content-start">
//                                 <h2 className="fw-medium fs-6">{pst.PostCreated ? pst.PostCreated.slice(0, 15) : 'NaN'}</h2>
//                             </div>


//                         </div>
//                     </div>
//                 })}



//             </div>
//         </div>


//     </>)
// }
