import { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import Moment from 'moment';
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";
import UpdatePage from './UpdateLectureInfo';

const Container = styled.div`
width: 100%;
display: block;
justify-content: center;
align-items: center;
`
const Title = styled.div`
font-size: 30px;
font-style: italic;
text-alignment: left;
`
const SubTitle = styled.div`
font-size: 16px;
display: inline-block;
color: ${props => props.theme.color.font_dark_gray};
`
const WriteBtn = styled.a`
display: inline-block;
float: right;
font-size: 16px;
padding: 5px;
background-color: ${props => props.theme.color.blue};
color: white;
border-radius: 5px;
`
const GrayBox = styled.td`
padding: 5px;
border: 1px soild ${props => props.theme.color.blue};
background: ${props => props.theme.color.light_gray};
`
const WhiteBox = styled.td`
padding: 5px;
border: 1px soild ${props => props.theme.color.blue};
background: white;
`

function Index({match}){
    const [isLoading, setIsLoading] = useState(false);
    const [isProfessor, setisProfessor] = useState(false);
    const user = JSON.parse(window.sessionStorage.userInfo);
    const week = ["월", "화", "수", "목", "금", "토", "일"]
    const subjectId = String(match.params.subject);
    const [subjectInfo, setSubjectInfo] = useState();
    
    const getData = () => {
        const url = '/api/subject/info/'+ subjectId;
        axios.get(url)
        .then((response)=>{
            const result = response.data.subject;
            setSubjectInfo(result);
            setIsLoading(true);
        })
        .catch((error)=>{
            console.log(error);
        });
    }

    const display = () => {
        return(
            <Container>
            <Title>Lecture Info</Title>
            <div style={{width: "100%", display: "block"}}>
                <SubTitle>내 강의 / <a style={{color: "inherit"}} href={`/main/${subjectId}/${subjectInfo.name}/home`}>{subjectInfo.name}</a> / 강의 정보</SubTitle>                
                {isProfessor && <WriteBtn href={`/main/${subjectId}/info/update`}> 수정하기</WriteBtn>}
            </div>
            <hr style={{width: "100%", margin: "5px auto", marginTop: "15px", display: "block"}}/>
            
                <table style={{width: "100%", margin: "0 auto", borderSpacing: "1px", borderCollapse: "separate"}}>
                    <tbody>
                    <tr>
                        <GrayBox>강의명</GrayBox>
                        <WhiteBox>{subjectInfo.name}</WhiteBox>
                    </tr>
                    <tr>
                        <GrayBox>강의 코드</GrayBox>
                        <WhiteBox>{subjectInfo.code}</WhiteBox>
                    </tr>
                    <tr>
                        <GrayBox>강의 기간</GrayBox>
                        <WhiteBox>{Moment(subjectInfo.start_period).format('YYYY년MM월DD일')} ~ {Moment(subjectInfo.end_period).format('YYYY년MM월DD일')}</WhiteBox>
                    </tr>
                    <tr>
                        <GrayBox>강의 시간</GrayBox>
                        <WhiteBox>
                            {subjectInfo.days.map((value, index) => <li style={{listStyleType: "none"}}>{week[value-1]} {subjectInfo.start_time[index]} ~ {subjectInfo.end_time[index]}</li>)} 
                        </WhiteBox>
                    </tr>
                    </tbody>
                </table>
            </Container>
        );
    }
    
    useEffect(() => {
        if(user.type === "professor") {setisProfessor(true);}
        getData();
    },[]);

    

    return(
        <Router>
            <Switch>
                <Route path= "/main/:subject/info/update" component={UpdatePage}/>
                <Route path="/">
                    <div>{isLoading && display()}</div>
                </Route>
            </Switch>
        </Router>

    )
}

export default Index;