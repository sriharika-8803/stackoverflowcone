import React, { useState } from 'react'
import { useParams , Link, useNavigate, useLocation} from 'react-router-dom'
import { useSelector, useDispatch} from 'react-redux'
import moment from 'moment'
import copy from 'copy-to-clipboard'

import upvote from '../../assets/sort-up.svg'
import downvote from '../../assets/sort-down.svg'
import './QuestionDetails.css'
import Avatar from '../../components/Avatar/Avatar'
import DisplayAnswer from './DisplayAnswer'
import { postAnswer, deleteQuestion, voteQuestion } from '../../actions/question'



const QuestionDetails = () => {

    const { _id } = useParams()
    const questionsList = useSelector(state=>state.questionReducer)
    const [Answer, setAnswer] = useState('')
    const User= useSelector((state) => (state.currentUserReducer))
    const Navigate = useNavigate()
    const dispatch = useDispatch()

    const handlePostAns = (e, answerLength) =>{
      e.preventDefault()
      if(User === null){
        alert('Login or Signup to answer a question')
        Navigate('/Auth')
      }else{
        if(Answer === ''){
          alert('Enter Answer before submitting')
        }else{
          dispatch(postAnswer({ _id, noOfAnswers: answerLength + 1, answerBody: Answer, userAnswered: User.result.name, userId: User.result._id}))
        }
      }
    }
  //   var questionsList = [{
  //       _id:'1',
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
  //     _id: '2',
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
  //   _id: '3',
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
    const url = 'https://pocket-slip.vercel.app'

    const handleShare = () => {
      copy(url+location.pathname)
      alert('Copied url :' +url+location.pathname)
    }

    const handleDelete = () =>{
      dispatch(deleteQuestion(_id, Navigate))
    }

  const handleUpVote = () => {
    dispatch(voteQuestion(_id, 'upVote', User.result._id))
    //console.log(_id, 'upVote', User.result._id)
  }

  const handleDownVote = () => {
    dispatch(voteQuestion(_id, 'downVote', User.result._id))
  }

  return (
    <div className='question-details-page'>
      {
             questionsList.data === null?
            <h1>Loading........!</h1> :
            <>
              {
                 questionsList.data.filter(question => question._id === _id).map(question => (
                    <div key={question._id}>
                      <section className="question-details-container">
                        <h1>{question.questionTitle}</h1>
                        <div className="question-details-container2">
                          <div className="question-votes">
                            <img src={upvote} alt="upvote" width = '20' className='vote-icon' onClick={handleUpVote}/>
                            <p>{question.upVote.length - question.downVote.length}</p>
                            <img src={downvote} alt="downvote" width ='20' className='vote-icon' onClick={handleDownVote}/>
                          </div>
                          <div style={{width:"100%"}}>
                            <p className='question-body'>{question.questionBody}</p>
                            <div className="question-details-tags">
                              {
                                question.questionTags.map((tag)=>(
                                  <p key={tag}>{tag}</p>
                                ))
                              }
                            </div>
                            <div className="question-action-user">
                              <div>
                                <button type='button' onClick={handleShare}>Share</button>
                                {
                                  User?.result?._id === question?.userId && (
                                    <button type='button' onClick={handleDelete}>Delete</button>
                                  )
                                }
                              
                              </div>
                              <div>
                                <p>asked{moment(question.askedOn).fromNow()}</p>
                                <Link to={`/Users/${question.userId}`} className='user-link' style={{color:'#0086d8'}}>
                                  <Avatar backgroundColor="orange" px='8px' py='5px'>{question.userPosted.charAt(0).toUpperCase()}</Avatar>
                                  <div>
                                    {question.userPosted}
                                  </div>
                                </Link>
                              </div>
                            </div>
                          </div>
                        </div>
                      </section>
                      {
                        question.noOfAnswers !== 0 && (
                          <section>
                            {
                              question.noOfAnswers  === 1? <h3>{question.noOfAnswers}Answer</h3> : <h3>{question.noOfAnswers}Answers</h3>
                            }
                              <DisplayAnswer key={question._id} question={question} handleShare={handleShare} />
                          </section>
                        )
                      }
                      <section className='post-ans-container'>
                        <h3>Your Answer</h3>
                        <form onSubmit={ (e) => { handlePostAns(e, question.answer.length)}}>
                          <textarea cols="30" rows="10"  onChange={ e => setAnswer(e.target.value)}></textarea>
                          <input type="submit" value="Post Your Answer" className='post-ans-btn' />
                        </form>
                        <p>
                          Browser other Question tagged {
                            question.questionTags.map((tag)=>(
                              <Link to='/Tags' style={{textDecoration:'none'}} className='ans-tags' key={tag}>{tag}</Link>
                            ))
                          } or {
                            <Link to="/AskQuestion" style={{textDecoration:'none', color: '#009dff'}}> Ask Your Own Question</Link>
                          }
                        </p>
                      </section>
        
                    </div>
                ))
              }
            </>
      }
    </div> 
  )
}

export default QuestionDetails
