import { useEffect, useState } from "react";
import { Col, Row } from "reactstrap";
import TopCards from "../Cards/TopCards";
import style from "../Pages/ui.module.css";
import { useSelector } from "react-redux";
import { selecteUsers,  selectAllPosts } from '../../Store/authSlice';//selectAllPinnedPosts,
import Chart from "react-apexcharts";



const Starter = () => {
  const referenceDate = new Date();
  referenceDate.setDate(referenceDate.getDate() - 7);
  const storeusers = useSelector(selecteUsers)
  const storeAllPosts = useSelector(selectAllPosts)
  // const storeAllBumperPosts = useSelector(selectAllPinnedPosts)

  const [weekusers, setWeekusers] = useState(0)
  const [todayusers, setTodayusers] = useState(0)
  const [Buyandhold, setBuyandhold] = useState(0)
  const [FixNFlip, setFixNFlip] = useState(0)
  const [Subto, setSubto] = useState(0)
  




  useEffect(() => {
    
    let lastweekusers = 0;
    let today = 0;
    storeusers.forEach((userobjects) => {
      if (new Date(userobjects.createdAt) > referenceDate) {
        lastweekusers++;
      }
      // console.log(new Date(userobjects.updatedAt));
      if (new Date(userobjects.createdAt).toLocaleDateString() === new Date().toLocaleDateString()) {
        
        today = today + 1;
      }
    })
    setTodayusers(today);
    setWeekusers(lastweekusers);
    // eslint-disable-next-line

  }, [storeusers])



  useEffect(() => {
    let A = 0;
    let B = 0;
    let C = 0;
    storeAllPosts.forEach((userobjects) => {
      if (userobjects.postDealType === "Subto") {
        C++;
      }
      else if (userobjects.postDealType === "Buy and hold") {
        B++
      }
      else {
        A++
      }
    })
    setSubto(C);
    setBuyandhold(B);
    setFixNFlip(A);
  }, [storeAllPosts])

  var states = {
    options: {
      chart: {
        id: "basic-bar"
      },
      xaxis: {
        categories: ["Buy and hold", "Fix N` Flip", "Subto"]
      },
      title: {
        text: 'Posts deal type',
        floating: true,
        offsetY: 330,
        align: 'center',

      },
      plotOptions: {
        bar: {
          borderRadius: 10,
          dataLabels: {
            position: 'top', // top, center, bottom
          },
          barWidth: 10,
        }
      },
    },
    series: [
      {
        name: "Deal type",
        data: [Buyandhold, FixNFlip, Subto]
      }
    ]
  };


  /////////////////////////////line chart for show users/////////////////////////////////////


  const userCountsByDate = storeusers.reduce((acc, user) => {
    if (user.createdAt) {
      const date = new Date(user.createdAt).toDateString();
      const formattedDate = date; // Format date in localized string
      acc[formattedDate] = (acc[formattedDate] || 0) + 1;
    } // Increment the count for the formatted date
    return acc;
  }, {});

  // Convert the object into an array of objects with date and count properties
  const userCountsArray = Object.entries(userCountsByDate).map(([date, count]) => ({ date, count }));
  const earliestDate = userCountsArray.length > 0 ? userCountsArray[0].date : "";
  const latestDate = userCountsArray.length > 0 ? userCountsArray[userCountsArray.length-1].date : "";

  // Set the initial date range to cover the entire dataset
  const startDate = earliestDate;
  const endDate = latestDate;
  let ustate = {
    series: [{
      name: "Users",
      data: userCountsArray.map(user => user.count)
    }],
    options: {
      chart: {
        type: 'area',
        stacked: false,
        height: 300,
        zoom: {
          type: 'x',
          enabled: true,
          autoScaleYaxis: true
        },
        toolbar: {
          autoSelected: 'zoom'
        }
      },
      colors: ['#4e1609'],
      dataLabels: {
        enabled: false
      },
      markers: {
        size: 0,
      },
      title: {
        text: 'Users Graph',
        align: 'left'
      },
      fill: {
        type: 'gradient',
        gradient: {
          shadeIntensity: 1,
          inverseColors: false,
          opacityFrom: 0.5,
          opacityTo: 0,
          stops: [0, 90, 100]
        },
      },
      // markers: {
      //   size: 0
      // },
      
      xaxis: {
        type: 'datetime',
        categories: userCountsArray.map(user => user.date), // Replace with your date array
      },
      selection: {
        xaxis: {
          min: startDate,
          max: endDate,
        }
      }
    },

    // seriesLine: [{
    //   name: "Users",
    //   data: userCountsArray.map(user => user.count)
    // }],
    // optionsLine: {
    //   chart: {
    //     id: 'chart1',
    //     height: 100,
    //     type: 'area',
    //     brush: {
    //       target: 'chart2',
    //       enabled: true,
    //     },
    //     selection: {
    //       enabled: true,
    //       xaxis: {
    //         min: userCountsArray[0]? userCountsArray[0].date:"",      // Set to the earliest date in your dataset
    //         max:userCountsArray.length>0? userCountsArray.slice(-1)[0].date:"",  // Set to the latest date in your dataset
    //     }
    //     },
    //   },
    //   colors: ['#008FFB'],
    //   fill: {
    //     type: 'gradient',
    //     gradient: {
    //       opacityFrom: 0.91,
    //       opacityTo: 0.1,
    //     }
    //   },
    //   xaxis: {
    //     type: 'datetime',
    //     categories: userCountsArray.map(user => user.date), // Replace with your date array
    //     tooltip: {
    //       enabled: false
    //     }
    //   },
    //   yaxis: {
    //     tickAmount: 2
    //   }
    // },
  };



  



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
                <Col sm="8" lg="8">
                  <div>
                    <div id="wrapper">
                      <div id="chart-line2">
                        <Chart options={ustate.options} series={ustate.series} type="area" height={300} />
                      </div>
                      {/* <div id="chart-line">
                        <Chart options={ustate.optionsLine} series={ustate.seriesLine} type="area" height={100} />
                      </div> */}
                    </div>
                    <div id="html-dist"></div>
                  </div>
                </Col>

                <Col sm="4" lg="4">
                  <TopCards
                    bg=" bg-light-info text-info"
                    title="Profit"
                    subtitle="Total Users"
                    earning={storeusers.length}
                    icon="bi bi-people"
                  />
                  <TopCards
                    bg="bg-light-success text-success"
                    title="Sales"
                    subtitle="Last week users"
                    earning={weekusers}
                    icon="bi bi-people"
                  />
                  <TopCards
                    bg="bg-light-success text-danger"
                    title="Refunds"
                    subtitle="Today users"
                    earning={todayusers}
                    icon="bi bi-people"
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
              <div className="row">
                <div className="col-12 col-sm-8 d-flex mt-5 justify-content-center">

                  <div className="w-100" >

                    <Chart
                      options={{
                        ...states.options,
                        title: {
                          text: states.options.title.text,
                          align: 'center',
                          style: {
                            color: 'blue',
                            fontSize: '18px',
                          },
                        },
                      }}
                      series={states.series}
                      type="bar"
                      width="100%"
                      height="300px"
                    />
                  </div>
                </div>
                <div className="col-12 col-sm-4">

                  <div className="card text-white bg-dark mt-2 mx-2 shadow-lg">

                    <div className="card-body">
                      <h5 className="card-title">Total posts: {storeAllPosts.length}</h5>
                      <p className="card-text"></p>
                    </div>
                  </div>
                  <div className="card text-primary bg-white mx-2 shadow-lg">

                    <div className="card-body">
                      <h5 className="card-title">Buy and Hold: {Buyandhold}</h5>
                      <p className="card-text"></p>
                    </div>
                  </div>
                  <div className="card text-primary bg-white  mx-2 shadow-lg">

                    <div className="card-body">
                      <h5 className="card-title">Fix N' Flip: {FixNFlip}</h5>
                      <p className="card-text"></p>
                    </div>
                  </div>
                  <div className="card text-primary bg-white  mx-2 shadow-lg">

                    <div className="card-body">
                      <h5 className="card-title"> Subto: {Subto}</h5>
                      <p className="card-text"></p>
                    </div>
                  </div>
                </div>
              </div>


              {/* <Row>
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
                <div>
                <p className="fw-bold ">
                 Posts Deal Types:
                </p>
              </div>
                <Col sm="6" lg="4">
                  <TopCards
                    // bg="bg-light-success text-success"
                    title="Sales"
                    subtitle="Fix N' Flip"
                    earning={FixNFlip}
                    // icon="bi bi-person-check"
                  />
                </Col>
                <Col sm="6" lg="4">
                  <TopCards
                    // bg="bg-light-success text-success"
                    title="Sales"
                    subtitle="Subto"
                    earning={Subto}
                    // icon="bi bi-person-check"
                  />
                </Col>
                <Col sm="6" lg="4">
                  <TopCards
                    // bg="bg-light-success text-success"
                    title="Sales"
                    subtitle="Buy and hold"
                    earning={Buyandhold}
                    // icon="bi bi-person-check"
                  />
                </Col>
              </Row> */}
            </>}

          </div>
          <div>
            {/* {storeAllBumperPosts && storeAllBumperPosts.length > 0 && <>
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
              </Row>
            </>} */}

          </div>
        </div>
      </div>
    </div>


  </>);
};

export default Starter;
