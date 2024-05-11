import {useState} from 'react'

export const Home = () => {
  const [title, setTitle] = useState("")
  return(<>
 <p> Hi from React : {title}</p>
  <input value={title} onChange={(e) => {
    let val = e.target.value
    console.log({val})
    setTitle(val)
  }} />
  </>)
}