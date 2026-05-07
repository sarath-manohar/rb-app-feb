import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import { Link } from 'react-router-dom'
import { MdDelete } from "react-icons/md";
import { deleteDownloadsAPI, getDownloadsAPI } from '../services/allAPI';

function History() {

 const[resume,setResume]=useState([])

 useEffect(()=>{
  getDownloads()
 },[])

  const getDownloads=async()=>{
    try{
      const result =await getDownloadsAPI()
      console.log(result);
      setResume(result.data)
      
    }catch(err){
      console.log(err);
      
    }
  }

// console.log(resume);

const removeHistory=async(id)=>{
   try{
   const result =await deleteDownloadsAPI(id)
   console.log(result);
   getDownloads()
   
   }catch(err){

   }
}

  return (
    <div>
            <div>
      <h1 className=" text-center mt-5">Downloaded Resume History</h1>
      <Link to={'/'} style={{marginTop:'-50px'}} className='float-end me-5'>BACK</Link>
      <Box component="section" className='container-fluid'>
           <div className='row'>     
   { resume?.length>0?resume.map((item,index)=>(
<div className='col-md-4' key={index}>
                      <Paper elevation={3} sx={{ my:5, p: 5, textAlign:'center' }}>
                        <div className='d-flex align-items-center justify-content-evenly'>
                          <h6>Review At:{item?.timeStamp} <br /> </h6>
                          <button onClick={()=>removeHistory(item?.id)} className='btn text-danger fs-4 ms-5'><MdDelete /></button>
                        </div>
                        <div className='border rounded p-3'>
                            <img className='img-fluid' src={item?.imgUrl} alt="resume" />
                        </div>
                      </Paper>
                    </div>
   )):<p>Nothing to Display</p>  }
           </div>
      </Box>
    </div>
    </div>
  )
}

export default History
