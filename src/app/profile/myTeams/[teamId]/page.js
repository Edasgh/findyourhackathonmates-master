"use client";
import React, { useEffect, useLayoutEffect, useState } from "react";

import useChat from "@/hooks/useChat";
import ChatLoader from "../components/ChatLoader";
import CustomAvatar from "@/components/CustomAvatar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faPaperPlane,
  faTrashCan,
} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import ChatNavigation from "../components/ChatNavigation";

import { socket } from "@/lib/socket";
import { getDate } from "@/lib/getDate";

const TeamChat = () => {
  const { teamId } = useChat();

  const currentTimeStamp = getDate();
  console.log(currentTimeStamp);

  const [loading, setLoading] = useState(true);
  const [teamData, setTeamData] = useState(null);
  const [messages, setMessages] = useState([]);

  const [userDetails, setUserDetails] = useState(null);
  const res = async () => {
    try {
      const resp = await fetch("/api/profile");
      const data = await resp.json();

      setUserDetails(data);
      setLoading(false);
    } catch (err) {
      setUserDetails(null);
      setLoading(false);
    }
  };

  const getMessages = async () => {
    try {
      const res = await fetch(`/api/profile/myTeams`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          id: teamId,
        }),
      });
      const data = await res.json();
      if (res.status === 200) {
        setTeamData(data);
        setMessages([...data.messages]);
        setInterval(() => {
          setLoading(false);
        }, 900);
      } else {
        throw new Error("Team not found!");
      }
    } catch (error) {
      setTeamData(null);
      setMessages([]);
      setInterval(() => {
        setLoading(false);
      }, 900);
    }
  };

  useLayoutEffect(() => {
    getMessages();
    res();
  }, []);

  const [msg, setMsg] = useState("");
  const handleSubmit = (e) => {
    setMsg("");
    e.preventDefault();
    const senderName = userDetails.name;
    const senderId = userDetails._id;
    const data = new FormData(e.currentTarget);
    const message = data.get("msg");

    const reqData = {
      roomId: teamId,
      message: message,
      senderId: senderId,
      senderName: senderName,
      sentOn: currentTimeStamp,
    };
    setMessages([
      ...messages,
      {
        message,
        sender: { name: senderName, id: senderId },
        sentOn: currentTimeStamp,
      },
    ]);
    socket.emit("message", reqData);
  };

  useEffect(() => {
    socket.emit("join-room", teamId);
    socket.on("message", ({ message, senderId, senderName, sentOn }) => {
      console.log("message");
    });

    return () => {
      socket.off("join-room");
      socket.off("message");
    };
  }, []);

  return (
    <>
      {loading ? (
        <ChatLoader />
      ) : (
        <>
          {teamData !== null && (
            <>
              <div className="p-4 bg-bgPrimary border-b-[.1px] border-bgSecondary flex gap-2 items-center">
                <Link
                  className="text-lg mr-2 max-[750px]:flex min-[750.1px]:hidden text-textPrimary text-left"
                  href="/profile/myTeams"
                >
                  <FontAwesomeIcon icon={faArrowLeft} />
                </Link>
                <CustomAvatar name={teamData.name} />
                <div className="ml-4">
                  <h2 className="font-semibold text-textPrimary">
                    {teamData.name}
                  </h2>
                  <span className="text-sm text-gray-600 ml-2">
                    {`${teamData.members.length} ${
                      teamData.members.length === 1 ? "Member" : "Members"
                    }`}
                  </span>
                </div>
                <span className="absolute right-0">
                  {userDetails !== null && (
                    <ChatNavigation
                      teamId={teamId}
                      email={teamData.email}
                      userId={userDetails._id}
                      adminId={teamData.admin}
                      name={teamData.name}
                      description={teamData.description}
                      members={teamData.members}
                      links={teamData.links}
                    />
                  )}
                </span>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 bg-bgSecondary">
                {userDetails !== null &&
                  messages.length !== 0 &&
                  messages.map((m, idx) => (
                    <div
                      key={idx}
                      className={`flex ${
                        m.sender.id === userDetails._id
                          ? "justify-end"
                          : "justify-start"
                      }  mb-4`}
                    >
                      <div
                        className={`max-w-[70%] rounded-lg p-3 ${
                          m.sender.id === userDetails._id
                            ? "bg-[#a600f0] text-white"
                            : "bg-textBgPrimary text-textPrimary"
                        }`}
                      >
                        <h2 className="text-sm flex justify-between items-start font-semibold">
                          {m.sender.name}

                          
                        </h2>
                        <p className="font-light">{m.message}</p>
                        <span
                          className={`text-[.6rem] text-blue-100 mt-1 block`}
                        >
                          {m.sentOn}
                        </span>
                      </div>
                    </div>
                  ))}
              </div>

              {/* Message Input */}

              <div className="p-4 bg-bgSecondary">
                <form
                  id="sendMsg"
                  suppressHydrationWarning
                  className="flex gap-2 mt-4"
                  onSubmit={handleSubmit}
                >
                  <input
                    type="text"
                    name="msg"
                    id="msg"
                    value={msg}
                    className="flex-1 w-full px-4 border-2 py-2 rounded-lg bg-textBgPrimary text-textPrimary focus:outline-none"
                    placeholder="Type your message here....."
                    onChange={(e) => setMsg(e.target.value)}
                    autoComplete="off"
                    suppressContentEditableWarning
                    suppressHydrationWarning
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 text-textPrimary rounded-lg bg-[#a600f0]"
                  >
                    <FontAwesomeIcon icon={faPaperPlane} />
                  </button>
                </form>
              </div>
            </>
          )}
        </>
      )}
    </>
  );
};

export default TeamChat;
