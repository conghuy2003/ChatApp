import { arrayRemove, arrayUnion, doc, updateDoc } from "firebase/firestore";
import { useChatStore } from "../../lib/chatStore";
import { auth, db } from "../../lib/firebase";
import { useUserStore } from "../../lib/userStore";
import "./detail.css";

const Detail = () => {
    const { chatId, user, isCurrentUserBlocked, isReceiverBlocked, changeBlock } = useChatStore();
    const { currentUser } = useUserStore();

    const handleBlock = async () => {
        if (!user) return;

        const userDocRef = doc(db, "users", currentUser.id);
        const receiverDocRef = doc(db, "users", user.id);

        try {
            await updateDoc(userDocRef, {
                blocked: isReceiverBlocked ? arrayRemove(user.id) : arrayUnion(user.id),
            });

            await updateDoc(receiverDocRef, {
                blockedBy: isReceiverBlocked ? arrayRemove(currentUser.id) : arrayUnion(currentUser.id),
            });

            changeBlock();
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className="detail">
            <div className="user">
                <img src={user?.avatar || "./avatar.png"} alt="" />
                <h2>{user?.username}</h2>
                <p>Tôi là mèo cute đến từ quảng trị.</p>
            </div>
            <div className="info">
                <div className="option">
                    <div className="title">
                        <span>Chat Setting</span>
                        <img src="./arrowUp.png" alt="" />
                    </div>
                </div>
                <div className="option">
                    <div className="title">
                        <span>Privacy & help</span>
                        <img src="./arrowUp.png" alt="" />
                    </div>
                </div>
                <div className="option">
                    <div className="title">
                        <span>Share Photos</span>
                        <img src="./arrowDown.png" alt="" />
                    </div>
                    <div className="photos">
                        <div className="photoItem">
                            <div className="photoDetail">
                                <img src="https://media.istockphoto.com/id/1136651807/vi/vec-to/bi%E1%BB%83u-t%C6%B0%E1%BB%A3ng-bi%E1%BB%83u-t%C6%B0%E1%BB%A3ng-ng%C6%B0%E1%BB%9Di-trong-m%E1%BB%99t-v%C3%B2ng-tr%C3%B2n.jpg?s=612x612&w=is&k=20&c=jcxQdKOq4m_iCSpsrPm1IjFmR6hh0lE8YwQ6lDMjXnM=" alt="" />
                                <span>photos_2024_2.png</span>
                            </div>
                            <img src="./download.png" alt="" className="icon" />
                        </div>
                        <div className="photoItem">
                            <div className="photoDetail">
                                <img src="https://media.istockphoto.com/id/1136651807/vi/vec-to/bi%E1%BB%83u-t%C6%B0%E1%BB%A3ng-bi%E1%BB%83u-t%C6%B0%E1%BB%A3ng-ng%C6%B0%E1%BB%9Di-trong-m%E1%BB%99t-v%C3%B2ng-tr%C3%B2n.jpg?s=612x612&w=is&k=20&c=jcxQdKOq4m_iCSpsrPm1IjFmR6hh0lE8YwQ6lDMjXnM=" alt="" />
                                <span>photos_2024_2.png</span>
                            </div>
                            <img src="./download.png" alt="" className="icon" />
                        </div>
                        <div className="photoItem">
                            <div className="photoDetail">
                                <img src="https://media.istockphoto.com/id/1136651807/vi/vec-to/bi%E1%BB%83u-t%C6%B0%E1%BB%A3ng-bi%E1%BB%83u-t%C6%B0%E1%BB%A3ng-ng%C6%B0%E1%BB%9Di-trong-m%E1%BB%99t-v%C3%B2ng-tr%C3%B2n.jpg?s=612x612&w=is&k=20&c=jcxQdKOq4m_iCSpsrPm1IjFmR6hh0lE8YwQ6lDMjXnM=" alt="" />
                                <span>photos_2024_2.png</span>
                            </div>
                            <img src="./download.png" alt="" className="icon" />
                        </div>
                        <div className="photoItem">
                            <div className="photoDetail">
                                <img src="https://media.istockphoto.com/id/1136651807/vi/vec-to/bi%E1%BB%83u-t%C6%B0%E1%BB%A3ng-bi%E1%BB%83u-t%C6%B0%E1%BB%A3ng-ng%C6%B0%E1%BB%9Di-trong-m%E1%BB%99t-v%C3%B2ng-tr%C3%B2n.jpg?s=612x612&w=is&k=20&c=jcxQdKOq4m_iCSpsrPm1IjFmR6hh0lE8YwQ6lDMjXnM=" alt="" />
                                <span>photos_2024_2.png</span>
                            </div>
                            <img src="./download.png" alt="" className="icon" />
                        </div>
                    </div>
                </div>
                <div className="option">
                    <div className="title">
                        <span> Share Files</span>
                        <img src="./arrowUp.png" alt="" />
                    </div>
                </div>
                <button onClick={handleBlock}>
                    {isCurrentUserBlocked
                        ? "You are Blocked!"
                        : isReceiverBlocked
                        ? "User blocked"
                        : "Block User"}
                </button>
                <button className="logout" onClick={() => auth.signOut()}>
                    Logout
                </button>
            </div>
        </div>
    );
};

export default Detail;
