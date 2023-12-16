import { useEffect, useState } from "react";
import { Col, Row } from "reactstrap";
import TopCards from "../Cards/TopCards";
import style from "../Pages/ui.module.css"
import { useSelector } from "react-redux";
import {  selecteUsers , selectAllPinnedPosts , selectAllPosts } from '../../Store/authSlice';


const Starter = () => {

  const storeusers = useSelector(selecteUsers)
  const storeAllPosts= useSelector(selectAllPosts)
  const storeAllBumperPosts  = useSelector(selectAllPinnedPosts)
  const [SuspendedUsers, setSuspendedUsers] = useState()
  const [ApprovedPosts, setApprovedPosts] = useState(0)
  // const [ApprovedBumperPosts, setApprovedBumperPosts] = useState(0)


  useEffect(() => {
    let suspendedUserSum = 0;
    storeusers.forEach((userobjects) => {
      if (userobjects.status === false) {
        suspendedUserSum++;
      }
    })
    setSuspendedUsers(suspendedUserSum)
  }, [storeusers])

  useEffect(() => {
    let MyApprovedPosts = 0;
    storeAllPosts.forEach((userobjects) => {
      if (userobjects.isApproved === true) {
        MyApprovedPosts++;
      }
    })
    setApprovedPosts(MyApprovedPosts)
  }, [storeAllPosts])

  useEffect(() => {
    // let MyApprovedBumperPosts = 0;/
    storeAllBumperPosts.forEach((userobjects) => {
      // if (userobjects.isBumper === true) {
      //   MyApprovedBumperPosts++;
      // }
    })
    // setApprovedBumperPosts(MyApprovedBumperPosts)
  }, [storeAllBumperPosts])



  return (<>


    <div className={`p-2  text-light ${style.Sheading} `}>

      <h2 className={style.Heading}>
        Reports
      </h2>
    </div>
    <div className="p-3">
      <div className={`${style.mainDashboard} `}>
        <h2>
          Satatistics
        </h2>
        <div >


          <div>
            {storeusers && <>
              <div>
                <p className="fw-bold ">
                  Users
                </p>
              </div>
              <Row>
                <Col sm="6" lg="4">
                  <TopCards
                    bg=" bg-light-info text-info"
                    title="Profit"
                    subtitle="Total Users"
                    earning={storeusers.length}
                    icon="bi bi-people"
                  />
                </Col>


                <Col sm="6" lg="4">
                  <TopCards
                    bg="bg-light-success text-success"
                    title="Sales"
                    subtitle="Active Users"
                    earning={+(storeusers.length) - SuspendedUsers}
                    icon="bi bi-person-check"
                  />
                </Col>
                <Col sm="6" lg="4">
                  <TopCards
                    bg="bg-light-danger text-danger"
                    title="Refunds"
                    subtitle="Suspended Users"
                    earning={SuspendedUsers}
                    icon="bi bi-person-dash"
                  />
                </Col>
              </Row>
            </>}
            
          </div>


          <div>
            {storeAllPosts && storeAllPosts.length > 0 && <>
              <div>
                <p className="fw-bold ">
                 Posts
                </p>
              </div>
              <Row>
                <Col sm="6" lg="4">
                  <TopCards
                    bg=" bg-light-info text-info"
                    title="Profit"
                    subtitle="All Posts"
                    earning={storeAllPosts.length}
                    icon="bi bi-people"
                  />
                </Col>


                <Col sm="6" lg="4">
                  <TopCards
                    bg="bg-light-success text-success"
                    title="Sales"
                    subtitle="Approved Posts"
                    earning={ApprovedPosts}
                    icon="bi bi-person-check"
                  />
                </Col>
                <Col sm="6" lg="4">
                  <TopCards
                    bg="bg-light-danger text-danger"
                    title="Refunds"
                    subtitle="Other Posts"
                    earning={+(storeAllPosts.length) - +(ApprovedPosts)}
                    icon="bi bi-person-dash"
                  />
                </Col>
              </Row>
            </>}
            
          </div>
          <div>
            {storeAllBumperPosts && storeAllBumperPosts.length > 0 && <>
              <div>
                <p className="fw-bold ">
                  Groups
                </p>
              </div>
              <Row>
                <Col sm="12" lg="12">
                  <TopCards
                    bg=" bg-light-info text-info"
                    title="Profit"
                    subtitle="Total Groups"
                    earning={storeAllBumperPosts.length}
                    icon="bi bi-people"
                  />
                </Col>


                {/* <Col sm="6" lg="4">
                  <TopCards
                    bg="bg-light-success text-success"
                    title="Sales"
                    subtitle="Approved Bumper Posts"
                    earning={ApprovedBumperPosts}
                    icon="bi bi-person-check"
                  />
                </Col> */}
                {/* <Col sm="6" lg="4">
                  <TopCards
                    bg="bg-light-danger text-danger"
                    title="Refunds"
                    subtitle="Pending B"
                    earning={+(storeAllBumperPosts.length) - +(ApprovedBumperPosts)}
                    icon="bi bi-person-dash"
                  />
                </Col> */}
              </Row>
            </>}
            
          </div>
        </div>
      </div>
    </div>


  </>);
};

export default Starter;
