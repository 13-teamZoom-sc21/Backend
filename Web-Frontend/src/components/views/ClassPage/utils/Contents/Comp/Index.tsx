import React from 'react'
import styled from 'styled-components'
import Up from '../../../../../../images/utils/up.png'
import Down from '../../../../../../images/utils/down.png'
import axios from 'axios'

const CompupContainer = styled.div`
width : 100%;
display : flex;
justify-content : center;
align-items : center;
`

const Compbtn1 = styled.button`
height : 6.5vh;
width : 70%;
background-size: contain;                      
background-repeat: no-repeat;
background-position: center center;
/* background-color : ${props => props.theme.color.blue}; */
`

const Compbtn2 = styled.button`
height : 6.5vh;
width : 70%;
background-size: contain;                      
background-repeat: no-repeat;
background-position: center center;
/* background-color : ${props => props.theme.color.blue}; */
`

interface CompProps {
    socket: any
    lecture_id: number
    lecture_info: any
}

const user = sessionStorage && sessionStorage.userInfo && JSON.parse(window.sessionStorage.userInfo);

function Index(props: CompProps) {
    const socket = props.socket;

    function upBtnHandler() {
        /* console.log("hi");
        console.log(props.lecture_id.toString());
        console.log(props.lecture_info.start_time);
        console.log(props.lecture_info.options.limit); */
        axios.post('/api/understanding/send', {
            isUnderstood: true,
            lectureId: props.lecture_id,
            lectureStartTime: props.lecture_info.start_time,
            limit: props.lecture_info.options.limit
        }).then(res => {
            console.log(res);
            socket.emit("understandingStu", {
                type: 'up',
                time: res.data.understanding.time
            })
        })
        const elm = document.querySelector(`.participantsclass#${user.email.split("@")[0]}`) as any;
        console.log(elm.childNodes[1].innerHTML = (parseInt(elm.childNodes[1].innerHTML) + 1).toString());
    }

    function downBtnHandler() {
        axios.post('/api/understanding/send', {
            isUnderstood: false,
            lectureId: props.lecture_id,
            lectureStartTime: props.lecture_info.start_time,
            limit: props.lecture_info.options.limit
        }).then(res => {
            console.log(res);
            socket.emit("understandingStu", {
                type: 'down',
                time: res.data.understanding.time
            })
        })
        const elm = document.querySelector(`.participantsclass#${user.email.split("@")[0]}`) as any;
        console.log(elm.childNodes[1].innerHTML = (parseInt(elm.childNodes[1].innerHTML) + 1).toString());
    }

    return (
        <CompupContainer style={{ height: '35vh' }}>
            <div style={{ height: '15vh', width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center' }}>
                <Compbtn1 style={{ backgroundImage: `url(${Up})` }} onClick={upBtnHandler}></Compbtn1>
                <Compbtn2 style={{ backgroundImage: `url(${Down})` }} onClick={downBtnHandler}></Compbtn2>
            </div>
        </CompupContainer>
    )
}

export default Index
