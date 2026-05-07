import React, { useState } from 'react'
import Steps from '../components/Steps'
import Preview from '../components/Preview'

function Form() {

const[resumeData,setResumeData]=useState({
    fullname:"",
    location:"",
    job:"",
    email:"",
    phone:"",
    github:"",
    linkedin:"",
    degree:"",
    university:"",
    passOut:"",
    skills:[],
    summary:""
})

const[finish,setFinish]=useState(false)
const[resumeId,setResumeId]=useState("")

  return (
    <div>
        <div className="row p-5">

       {finish? <div className="row">
          <div className="col-3"></div>
          <div className="col-8">
            <Preview finish={finish} resumeData={resumeData} resumeId={resumeId} setResumeData={setResumeData}/>
          </div>
          <div className="col-1"></div>
        </div> 
  :
        <div className='row p-5'>
          <div className="col-6">
            <Steps setResumeId={setResumeId} resumeData={resumeData} setResumeData={setResumeData} setFinish={setFinish}/>
          </div>
          <div className="col-6">
           { resumeData.fullname&& <Preview resumeData={resumeData}/>}
          </div>
        </div>}
      </div>
    </div>
  )
}

export default Form
