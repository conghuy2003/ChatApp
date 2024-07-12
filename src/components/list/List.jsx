import ChatList from "../list/chatList/ChatList";
import "./list.css"
import Userinfo from "../list/userInfo/Userinfo";

const List = () => {
    return (
    <div className="list">
        <Userinfo/>
        <ChatList/>
    </div>
    )
}
export default List