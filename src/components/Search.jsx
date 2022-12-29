import React, { useContext, useState } from 'react';
import { collection, query, where,getDocs,setDoc,doc,updateDoc,serverTimestamp,getDoc } from "firebase/firestore";
import {db} from '../firebase';
import {AuthContext} from '../context/AuthContext';
function Search() {
  const [username,setUsername]=useState("");
  const [user,setUser]=useState(null);
  const [err,setErr]=useState(false);
  const {currentUser}=useContext(AuthContext);

  const handleSearch=async()=>{
    const userRef = collection(db, "users");
    const q = query(userRef, where("displayName","==",username));
    try {
      const querySnapshot = await getDocs(q);
      console.log(querySnapshot);
      querySnapshot.forEach((doc) => {
        setUser(doc.data());
      });
      
    }catch (error) 
    {
      setErr(error);
    }
  }

  const handleKey=(e)=>{
      e.code==="Enter"&& handleSearch();
  }
const handleSelect=async()=>{
     const combineId=currentUser.uid>user.uid ?currentUser.uid+user.uid:user.uid+currentUser.uid;

     try {

      const res=await getDoc(doc(db,"chats",combineId));
      if(!res.exists())
      {
        await setDoc(doc(db,"chats",combineId),{
          mesages:[]
        })

        await updateDoc(doc(db,"userChats",currentUser.uid),{
          [combineId+".userInfo"]:{
            uid:user.uid,
            displayName:user.displayName,
            photoURL:user.photoURL

          },
          [combineId+".date"]:serverTimestamp(),
           
        })
        await updateDoc(doc(db,"userChats",user.uid),{
          [combineId+".userInfo"]:{
            uid:currentUser.uid,
            displayName:currentUser.displayName,
            photoURL:currentUser.photoURL

          },
          [combineId+".date"]:serverTimestamp(),
           
        })
      }
     } catch (error) {
       console.log(error);
     }
     setUser(null);
     setUsername("");
}
return (
    <div className='search'>
      <div className="searchForm">
      <input type='text' placeholder='find user' onChange={e=>setUsername(e.target.value)} onKeyDown={handleKey} value={username}></input>
      </div>
      {err && <span>User not found!</span>}
      {user && <div className='userChat' onClick={handleSelect}>
         <img src={user.photoURL} alt=""></img>
         <div className='userChatInfo'>
           <span>{user.displayName}</span>
         </div>
        </div>}
    </div>
  )
}

export default Search
