
import commonAPI from "./commonAPI"
import { server_url } from "./server_url"

// addResumeAPI
export const addResumeAPI=async(resumeData)=>{
  return await commonAPI('POST',`${server_url}/resumes`,resumeData)
}
// getResumeAPI
export const getResumeAPI=async(id)=>{
  return await commonAPI('GET',`${server_url}/resumes/${id}`,{})
}

// editResumeAPI
export const editResumeAPI=async(id,resumeData)=>{
  return await commonAPI('PUT',`${server_url}/resumes/${id}`,resumeData)
}

// addDowloadHistoryAPI
export const addDowloadHistoryAPI=async(resumeData)=>{
  return await commonAPI('POST',`${server_url}/dowloads`,resumeData)
}

// getDownloadsAPI
export const getDownloadsAPI=async()=>{
  return await commonAPI('GET',`${server_url}/dowloads`,{})
}

// deleteDownloadsAPI
export const deleteDownloadsAPI=async(id)=>{
  return await commonAPI('DELETE',`${server_url}/dowloads/${id}`,{})
}