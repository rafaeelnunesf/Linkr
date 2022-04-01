import { HeaderTimeline, ButtonFollow, ButtonUnfollow } from "./Styleds";
import useAuth from "../../hooks/useAuth";
import { useState, useEffect } from "react";
import api from "../../services/api";
import { useLocation } from "react-router";

export function UserHeader({ id, hashtag }) {
  const [follow, setFollow] = useState(false)
  const { auth } = useAuth()
  const [userInfo, setUserInfo] = useState({})
  const location = useLocation();

  useEffect(() => {
    postFollow()
    getAllFollows()
    getUserInfo()
  }, []);

  async function getUserInfo() {
    try {
      const user = await api.getUserInfoById(auth.token, id)
      setUserInfo(user)
    } catch (error) {
      console.log(error)
    }
  }

  async function postFollow() {
    const verification = await api.postFollowOrUnfollow(auth.token, auth.userId, userInfo.id)
    if (verification.data.length > 0) {
      setFollow(true)
    } else {
      setFollow(false)
    }
  }

  async function getAllFollows() {
    const allFollows = await api.getAllFollows(auth.token, auth.userId)
    return allFollows.data
  }

  async function handleFollow() {
    try {
      await api.postFollow(auth.token, auth.userId, userInfo.id)
      setFollow(true)
    } catch (error) {
      console.log(error.response)
    }
  }

  async function handleUnfollow() {
    try {
      await api.postUnfollow(auth.token, auth.userId, userInfo.id)
      setFollow(false)
    } catch (error) {
      console.log(error.response)
    }
  }

  return (
    <HeaderTimeline>
      <div>
        <img src={userInfo.picture} alt="imageUser" />
        <h2>{
          hashtag
            ? `${hashtag}`
            : id
              ? `${userInfo.name}'s posts'`
              : "timeline"
        }</h2>
      </div>
      {userInfo.id === auth.userId ?
        "" :
        <>
          {follow === false ?
            <ButtonFollow onClick={handleFollow}>Follow</ButtonFollow>
            :
            <ButtonUnfollow onClick={handleUnfollow}>Unfollow</ButtonUnfollow>
          }
        </>
      }
    </HeaderTimeline>
  );
}