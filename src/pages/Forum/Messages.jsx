import React, { useState } from "react";
import styles from "./Messages.module.css";

// Sample data
const conversationsData = [
    {
        id: 1,
        type: "farmer",
        name: "Farmer B",
        lastMessage: "Thanks for your advice!",
        timestamp: "Yesterday",
        messages: [{ sender: "Farmer B", text: "Thanks for your advice?" }],
    },
    {
        id: 2,
        type: "vendor",
        name: "Vendor A",
        lastMessage: "Hello! Are you interested in imported seeds?",
        timestamp: "10:30 AM",
        messages: [
            { sender: "Vendor A", text: "Hello! Are you interested in imported seeds?" },
            { sender: "You", text: "Yes, can you provide the details?" },
        ],
    },
];

const Messages = () => {
    const [selectedChat, setSelectedChat] = useState(conversationsData[0]);
    const [newMessage, setNewMessage] = useState("");
    const [filter, setFilter] = useState("all"); // all | farmer | vendor
    const [notifications, setNotifications] = useState([
        "New message from Vendor A",
        "Farmer B replied to your message",
    ]);

    const handleSendMessage = () => {
        if (!newMessage.trim()) return;
        const updatedChat = { ...selectedChat };
        updatedChat.messages.push({ sender: "You", text: newMessage });
        setSelectedChat(updatedChat);
        setNewMessage("");
    };

    const filteredConversations =
        filter === "all"
            ? conversationsData
            : conversationsData.filter((conv) => conv.type === filter);

    return (
        <div className={styles["community-messages"]}>
            {/* Chat View */}
            <div className={styles["chat-view"]}>
                <h2>{selectedChat.name}</h2>
                <div className={styles["chat-messages"]}>
                    {selectedChat.messages.map((msg, idx) => (
                        <div
                            key={idx}
                            className={
                                styles["chat-message"] +
                                " " +
                                (msg.sender === "You" ? styles.sent : styles.received)
                            }
                        >
                            <span className={styles["chat-bubble"]}>{msg.text}</span>
                        </div>
                    ))}
                </div>

                {/* Input Box */}
                <div className={styles["chat-input"]}>
                    <input
                        type="text"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        placeholder="Type a message..."
                        className={styles["input-field"]}
                    />
                    <button className={styles["send-btn"]} onClick={handleSendMessage}>
                        Send
                    </button>
                </div>
            </div>

            {/* Right Chat Sidebar */}
            <div className={styles["chat-sidebar"]}>
                {/* Notifications */}
                <div className={styles.notifications}>
                    <h3>Notifications</h3>
                    <ul>
                        {notifications.map((note, idx) => (
                            <li key={idx}>{note}</li>
                        ))}
                    </ul>
                </div>

                {/* Chat Filters */}
                <div className={styles["chat-filters"]}>
                    <button onClick={() => setFilter("all")}>All</button>
                    <button onClick={() => setFilter("farmer")}>Farmers</button>
                    <button onClick={() => setFilter("vendor")}>Vendors</button>
                </div>

                {/* Conversation List */}
                <div className={styles["conversation-list"]}>
                    {filteredConversations.map((chat) => (
                        <div
                            key={chat.id}
                            className={
                                styles["chat-item"] +
                                " " +
                                (selectedChat.id === chat.id ? styles.active : "")
                            }
                            onClick={() => setSelectedChat(chat)}
                        >
                            <h4>{chat.name}</h4>
                            <p>{chat.lastMessage}</p>
                            <span>{chat.timestamp}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Messages;
