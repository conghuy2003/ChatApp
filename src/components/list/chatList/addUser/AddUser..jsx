import "./addUser..css";

import { db } from "../../../../lib/firebase";
import {
    collection,
    getDocs,
    doc,
    query,
    serverTimestamp,
    setDoc,
    where,
    updateDoc,
    arrayUnion

} from "firebase/firestore";
import { useState } from "react";
import { useUserStore } from "../../../../lib/userStore";
import { update } from "firebase/database";


const AddUser = () => {

const [user,setUser] = useState(null);


const {currentUser} = useUserStore()

    const handleSearch = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const username = formData.get("username");
    
        try {

            const userRef = collection(db, "users");


      const q = query(userRef, where("username", "==", username));
      const querySnapShot = await getDocs(q);

     if (!querySnapShot.empty) {
        setUser(querySnapShot.docs[0].data());

     }

        }catch(err) {
            console.log(err);

        }
    };



    const  handleAdd = async () => {
  const chatRef = collection(db,"chats");
  const  userChatsRef = collection(db,"userchats");
        try {
          const newChatRef = doc(chatRef)

          await setDoc(newChatRef, {
                createAt: serverTimestamp(),
                messages: [],

            });

            await updateDoc(doc(userChatsRef, user.id), {
             chats: arrayUnion({
            chatId : newChatRef.id,
            lastMessage:"",
            receiverId: currentUser.id,
            updateAt: Date.now(),
          }),
          

            });

            
            await updateDoc(doc(userChatsRef, currentUser.id), {
               chats: arrayUnion({
               chatId : newChatRef.id,
               lastMessage:"",
               receiverId: user.id,
               updateAt: Date.now(),
             }),
               });
   
        }catch (err) {
            console.log(err);
        }
    };

    return (
        <div className="addUser">
            <form  onSubmit={handleSearch}>  
                
                 <input type="text"  placeholder="Username" name="username"/>
                 <button>Search</button>
                 </form>
          {user &&   <  div className="user">

           <div className="detail">

             <img src={user.avatar || "./avatar.png"} alt="" />
             <span> {user.username}</span>
           </div>
           <button onClick={handleAdd}>Add User</button>
        </div>}
        </div>
    );
};

export default AddUser;