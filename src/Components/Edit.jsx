import React, { useEffect,  useRef,  useState } from 'react'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import { FaEdit } from 'react-icons/fa'
import { editResumeAPI, getResumeAPI } from '../services/allAPI';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import jobType from '../assets/jobRole.json'
import jobSkills from '../assets/jobSkills.json'
import summaries from '../assets/summaries.json'

function Edit({resumeId,setUpdateResume}) {
  console.log(resumeId);
  
  const skillRef=useRef()
  const[resumeData,setResumeData]=useState({})
  console.log(resumeData);
  
  const style = {
   position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    maxHeight: "80vh",
    overflowY: "auto",
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

useEffect(()=>{
 resumeId&&getEditResumeDetails()
},[resumeId])


const removeSkill=(skill)=>{
  // remove skill from resumeData.skills
 setResumeData({ ...resumeData, skills:resumeData?.skills.filter(item=>item!=skill) })
}

const addSkill=(skill)=>{
  if(skill){
if(resumeData?.skills?.map(item=>item.toLowerCase())?.includes(skill.toLowerCase())){
  alert("skill already exist")
}else{
  setResumeData({ ...resumeData, skills:[...resumeData?.skills,skill] })}
  skillRef.current.value=""
} 
else{
    alert("invalid skill")
  }
}

const getEditResumeDetails=async()=>{
  try{
     const result = await getResumeAPI(resumeId)
   console.log(result);
   setResumeData(result.data)
  }catch(err){
    console.log(err);
    
  }  
}

const handleUpdateResume=async()=>{
   const{ fullname, location, job,email,phone, github, linkedin,degree,university,passOut,skills,summary}=resumeData
      if( fullname && location&& job&&email&&phone&& github&& linkedin&&degree&&university&&passOut&&skills.length>0&&summary){    
     const result= await editResumeAPI(resumeData?.id,resumeData)
     console.log(result);
     if(result.status==200){
       alert("resume updated")
       setUpdateResume(result?.data)
     handleClose()
     }else{
       console.log(result);  
     }
      }else{
       alert("please fill form completely")
      }
}


  return (
    <>
       <Button className='btn text-primary fs-2' onClick={handleOpen}><FaEdit /></Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
         <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Edit Details
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <div>
              <h3>Personal Details</h3>
              <div className='d-flex row p-3'>
                <TextField value={resumeData?.fullname} id="standard-basic" label="Full Name" variant="standard"
                onChange={e => setResumeData({ ...resumeData, fullname: e.target.value })}/>
                <TextField value={resumeData?.location} id="standard-basic" label="Location" variant="standard"
                onChange={e => setResumeData({ ...resumeData, location: e.target.value })}/>
                 <FormControl variant="standard" >
                              <InputLabel id="demo-simple-select-standard-label">Choose Job Title</InputLabel>
                              <Select value={resumeData?.job} onChange={e => setResumeData({ ...resumeData, job: e.target.value })} labelId="demo-simple-select-standard-label" id="demo-simple-select-standard"
                                label="Job" defaultValue={' '} >
                               { 
                                jobType.jobRoles.map(role=>(
                                
                                  <MenuItem key={role} value={role}>{role}</MenuItem>
                                ))
                                }
                              </Select>
                            </FormControl>
              </div>
            </div>
            <div>
              <h3>Contact Details</h3>
              <div className='d-flex row p-3'>
                <TextField value={resumeData?.email} id="standard-basic" label="Email" variant="standard" onChange={e => setResumeData({ ...resumeData, email: e.target.value })}/>
                <TextField value={resumeData?.phone} id="standard-basic" label="Phone Number" variant="standard" onChange={e => setResumeData({ ...resumeData, phone: e.target.value })}/>
                <TextField value={resumeData?.github} id="standard-basic" label="Github Profile Link" variant="standard"onChange={e => setResumeData({ ...resumeData, github: e.target.value })}/>
                <TextField value={resumeData?.linkedin} id="standard-basic" label="LinkedIn Profile Link" variant="standard"onChange={e => setResumeData({ ...resumeData, linkedin: e.target.value })}/>
              
              </div>
            </div>
            <div>
              <h3>Education Details</h3>
              <div className='d-flex row p-3'>
                <TextField value={resumeData?.degree} id="standard-basic" label="Degree" variant="standard" onChange={e => setResumeData({ ...resumeData, degree: e.target.value })}/>
                <TextField value={resumeData?.university} id="standard-basic" label="University" variant="standard" onChange={e => setResumeData({ ...resumeData, university: e.target.value })}/>
                <TextField value={resumeData?.passOut} id="standard-basic" label="Year of Passout" variant="standard" onChange={e => setResumeData({ ...resumeData, passOut: e.target.value })} />
              </div>
            </div>
          
            {/* skills */}
            <h3>Skills</h3>
            <div className="d-flex justify-content-between align-items-center m-3">
                <input ref={skillRef} type="text" className='form-control' placeholder='add skills' />
              <Button onClick={()=>addSkill(skillRef.current.value)} className='me-3' variant="text" sx={{ maxWidth: '40px' }}>Add</Button>
            </div>
             {/* addedd skills */}
            <h5>Added Skils : </h5>
            <div className="d-flex  justify-content-between flex-wrap">        
           {resumeData?.skills?.length>0&&resumeData?.skills.map(skill=>(
 <span key={skill} className='btn d-flex  align-items-center justify content-center'>{skill}
                 <button  onClick={()=>removeSkill(skill)}  className='btn text-dark '>X</button></span>
           ))  }
            </div>
             <div>
                      <h3>Professional Summary</h3>
                      <div className='d-flex row p-3 flex-wrap'>
                        <TextField
                          id="standard-multiline-static"
                          label="Write a short summary of yourself"
                          multiline
                          rows={4}
                          variant="standard"
                          value={resumeData?.summary}
                          onChange={e => setResumeData({ ...resumeData, summary: e.target.value })}
                        />
                      </div>
                    </div>
          </Typography>
          <Button onClick={handleUpdateResume} className='me-3'  variant="text" sx={{ maxWidth: '40px' }}>Update</Button>
        </Box>
      </Modal>
    </>
  )
}

export default Edit
