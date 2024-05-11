import axios from "axios"

const API_URL = "http://localhost:8000";

export const get = async (url:string) => {
  const res = await axios.get(API_URL+url)
  return res.data
}

export const post = async (url:string, data:{}, headers:{}={}) => {
  const res = await axios.post(API_URL+url, data, headers)
    .then((res) => {
      return res?.data
    }).catch((err) => {
      // console.log("err",err)
      let response = err?.response?.data
      return response
    })

    console.log(url,res)
  return res
}