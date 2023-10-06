import React from 'react'
import{ useLocation, useNavigate } from 'react-router-dom'
import './HomeMainbar.css'
import QuestionsList from './QuestionsList'
import { useSelector } from 'react-redux'



const HomeMainbar = () => {

  const questionsList = useSelector(state=>state.questionReducer)
  //console.log(questionsList)

//   var questionsList = [{
//       _id: 1,
//       upVotes:3,
//       downVotes: 2,
//       noOfAnswers:2,
//       questionTitle: "What is a function?",
//       questionBody: "it meant to be",
//       questionTags: ["java","node js","react js","mongo db"],
//       userPosted: "mano",
//       userId: 1,
//       askedOn: " jan 1",
//       answer: [{
//         answerBody:"Answer",
//         userAnswered: "riyaz",
//         answeredOn:"jan 2",
//         userId:2,

//       }]
//   },{
//     _id: 2,
//     upVotes:0,
//     downVotes: 2,
//     noOfAnswers:0,
//     questionTitle: "What is a function?",
//     questionBody: "it meant to be",
//     questionTags: ["java","node js"],
//     userPosted: "irsha",
//     userId: 2,
//     askedOn: " jan 1",
//     answer: [{
//       answerBody:"Answer",
//       userAnswered: "irshad",
//       answeredOn:"jan 5",
//       userId:2,

//     }]
// },{
//   _id: 3,
//   upVotes:1,
//   downVotes: 2,
//   noOfAnswers:0,
//   questionTitle: "What is a function?",
//   questionBody: "it meant to be",
//   questionTags: ["react js","mongo db"],
//   userPosted: "shalu",
//   userId: 3,
//   askedOn: " jan 1",
//   answer: [{
//     answerBody:"Answer",
//     userAnswered: "shalu",
//     answeredOn:"jan 9",
//     userId:2,

//   }]
// }]



const location = useLocation()

const user = useSelector((state) => (state.currentUserReducer))

const navigate = useNavigate()

const checkAuth = () => {
  if(user === null){
    alert("login or signup to ask a question")
    navigate('/Auth')
  }
  else{
    navigate('/AskQuestion')
  }
}

  return (
    <div className='main-bar'>
      <div className='main-bar-header'>
        {
          location.pathname === '/'? <h1>Top Questions</h1> : <h1>All questions</h1>

        }
        <button onClick={checkAuth} className='ask-btn'> Ask Question</button>
      </div>
      <div>
        {
          questionsList.data === null? 
          <h1>Loading........</h1>:
          <>
            <p>{questionsList.data.length} questions</p>
            <QuestionsList questionsList={questionsList.data} />
          </>
        }
      </div>
    </div>
  )
}

export default HomeMainbar
