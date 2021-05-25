import React, { useEffect, useState } from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    useHistory,
} from "react-router-dom";
import LeftBar from '../components/utils/LeftBar/Index'
import TopBar from '../components/utils/TopBar/Index'
import Main from '../components/views/MainPage/Index'
import UploadLecturePage from '../components/views/UploadLecturePage/Index'
import enterLecturePage from '../components/views/EnterLecturePage/Index'
import ZoomTestPage from '../components/views/ZoomTestPage/Index'
import LectureChartPage from '../components/views/LectureChartPage/Index'
import LectureInfoPage from '../components/views/LectureInfoPage/Index'
import JoinLecturePage from '../components/views/JoinLecturePage/Index'
import NoticePage from '../components/views/NoticePage/Index'
import LectureNotePage from '../components/views/LectureNotePage/Index'
import SubjectHomePage from '../components/views/LectureHomePage/Index'
import AttendancePage from '../components/views/AttendancePage/Index'
import LectureAssignmentPage from '../components/views/LectureAssignmentPage/Index'
import Mypage from '../components/views/MyPage/Index'

const baseUrl = "/main/";

function Index() {
    const isLogined = window.sessionStorage.userInfo == null ? false : true;
    useEffect(() => {
        console.log("this is main page");
        if(!isLogined){
            alert("로그인이 필요합니다.");
            return window.location.href = '/';
        }
    }, [])

    return (
        <>
            {isLogined && <LeftBar />}
            {isLogined && <TopBar mode={true}/>}
            <div className = "maincontainer" style={{height : "100%", marginLeft: '260px', overflowY : "auto", padding : "1rem", paddingBottom : "4rem", backgroundColor : "#F7F9FC", marginBottom : "10px"}}>
                {isLogined &&
                    <Router>
                        <Switch>
                            <Route exact path={baseUrl} component={Main} />
                            <Route path= {baseUrl+"uploadLecture"} component={UploadLecturePage} />
                            <Route path= {baseUrl+"enterLecture"} component={enterLecturePage} />
                            <Route path= {baseUrl+"zoom"} component={ZoomTestPage} />
                            <Route path= {baseUrl+":subject/:name/home"} component={SubjectHomePage}/>
                            <Route path= {baseUrl+":subject/join"} component={JoinLecturePage} />
                            <Route path= {baseUrl+":subject/info"} component={LectureInfoPage} />
                            <Route path= {baseUrl+":subject/:name/notice"} component={NoticePage}/>
                            <Route path= {baseUrl+":subject/:name/lectureNote"} component={LectureNotePage}/>
                            <Route path= {baseUrl+":subject/:name/chart"} component={LectureChartPage} />
                            <Route path= {baseUrl+":subject/:name/attendence"} component={AttendancePage} />
                            <Route path= {baseUrl+":subject/:name/assignment"} component={LectureAssignmentPage}/>
                            <Route path= {baseUrl+"account/mypage"} component={Mypage}/>
                        </Switch>
                    </Router>
                }
            </div>
        </>
    )
}

export default Index