// import React, { useEffect, useState } from "react";
// import style from "./ui.module.css"
// import { useParams } from "react-router-dom";
// import { db } from "../../firebase";

// export function Chat() {
//     const { ChatId } = useParams()
//     console.log(ChatId);
//     const [UserChats, setUserChats] = useState()

//     useEffect(() => {
//         const fetchData = async () => {
//             try {
//                 const snapshot = await db.ref('HomePageData').once('value');
//                 const fetchedData = snapshot.val();
//                 if (fetchedData) {
//                     const dataArray = Object.values(fetchedData);
//                     setUserChats(dataArray);
//                 }
//             } catch (error) {
//             }
//         };
//         fetchData();

//     }, []);


//     console.log(UserChats)


//     return (<>
//         <div className={`p-2  text-light ${style.Sheading} `}>
//             <h2 className={style.Heading}>
//                 Umair
//             </h2>
//         </div>
//     </>)
// }
