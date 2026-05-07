import React, { useState } from 'react'
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import Stack from '@mui/material/Stack';
import { FaFileDownload } from "react-icons/fa";
import { FaHistory } from "react-icons/fa";
import Edit from './Edit';

import html2canvas from 'html2canvas'
import { jsPDF } from "jspdf";
import { addDowloadHistoryAPI } from '../services/allAPI';


function Preview({resumeData,finish,resumeId,setResumeData}) {
  console.log(resumeId);
  
  const[downloadStatus,setDownloadStatus]=useState(false)


 const downloadCV=async()=>{
  // getElement to take screenshot
  const input =document.getElementById('result')
  const canvas= await html2canvas(input,{scale:2})
  const imgUrl =canvas.toDataURL('image/png')

  const pdf = new  jsPDF()
  const pdfWidth=pdf.internal.pageSize.getWidth()
  const pdfHeight=pdf.internal.pageSize.getHeight()
  pdf.addImage(imgUrl,'PNG',0,0,pdfWidth,pdfHeight)
  pdf.save('resume.pdf')

  // date and time
  const localTimeandDate=new Date()
const timeStamp=`${localTimeandDate.toLocaleDateString()},${localTimeandDate.toLocaleTimeString()}`

  // proceed to api call
  try{
 const result =await addDowloadHistoryAPI({...resumeData,imgUrl,timeStamp})
 console.log(result);
 setDownloadStatus(true)
  }catch(err){
    console.log(err);
    
  }

 }



  
  return (
    <>
   { finish&&<div className='d-flex justify-content-end align-items-center ' >
          {/* download */}
          <button onClick={downloadCV}  className="btn fs-3 text-primary" ><FaFileDownload /></button>
          {/* edit */}
          <div><Edit resumeId={resumeId} setUpdateResume={setResumeData}/></div>
          {/* history */}
          {downloadStatus&&<Link to={'/history'} className='btn fs-3 text-primary'><FaHistory /></Link>}
          {/* back */}
          <Link to={'/resume-generator'} className="btn text-primary">BACK</Link>
        </div>}
       <Box>
          <Paper elevation={5} id="result">
           <div className='w-100 p-5'>
        <h2 className='text-dark fw-bolder'>Name:{resumeData.fullname}</h2>
        <p className='fs-6 lh-1'>Phone:{resumeData.phone}</p>
        <p className='fs-6 lh-1' >Email:{resumeData.email}</p>
        <p className='fs-6 lh-1'>LinkedIn: <a href={resumeData.linkedin}>{resumeData.linkedin}</a> </p>
        <p className='fs-6 lh-1'>Github: <a href={resumeData.github}>{resumeData.github}</a> </p>
        <p className='fs-6 lh-1'>Location: {resumeData.location}</p>
        <Divider className='bg-dark my-3'/>
        <h4>Professional Summary</h4>
        <p>{resumeData.summary}</p>
        <Divider className='bg-dark'/>
        <h4 className='mt-3'>Technical Skills</h4>
        {/* duplicate according to user skill */}
            {resumeData?.skills?.map((item,index)=>(<span  ><Button key={index} variant="text" className='text-dark'>{item}</Button>, </span>)) } 
        <Divider className='bg-dark my-3'/>
        <h4>Education</h4>
        <p className='fs-6 lh-1'>Bachelor’s Degree in <b >{resumeData.degree}</b></p>
        <p className='fs-6 lh-1'>University/College Name : {resumeData.university} </p>
        <p className='fs-6 lh-1'>Year of Graduation : {resumeData.passOut}</p>
    </div>
          </Paper>
        </Box>
    </>
  )
}

export default Preview
