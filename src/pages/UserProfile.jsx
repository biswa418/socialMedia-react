import React, { useEffect, useState } from "react";
import { useAuth } from "../hooks";
import { Toaster, toast } from "react-hot-toast";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { addFriends, getUserDetails, removeFriends } from "../api";
import { Loader } from "../components";

const UserProfile = () => {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
  const [requestInProgress, setRequestInProgress] = useState(false);
  const { userId } = useParams();
  const auth = useAuth();
  const nav = useNavigate();

  if (!auth.user) {
    setTimeout(() => toast.error(`You have to login to see the details.`), 500);
    return <Navigate to="/login" />;
  }

  useEffect(() => {
    if (!auth.user) {
      setTimeout(
        () => toast.error(`You have to login to see the details.`),
        500
      );
      return nav("/login");
    }

    const getUser = async () => {
      const response = await getUserDetails(userId);

      if (response.success) {
        setUser(response.data.user);
      } else {
        toast.error(`${response.message}`);
        return nav("/");
      }
      setLoading(false);
    };

    getUser();
  }, [userId, auth.user, nav]);

  const checkIfFriend = () => {
    const friends = auth.user.friendships;
    const friendList = friends.map((friend) => friend.to_user._id);

    if (friendList.indexOf(userId) > -1) {
      return true;
    }

    return false;
  };

  const checkFriend = checkIfFriend();

  const handleRemoveFriendClick = async () => {
    setRequestInProgress(true);

    const response = await removeFriends(userId);

    if (response.success) {
      const friendship = auth.user.friendships.filter(
        (friend) => friend.to_user._id === userId
      );

      auth.updateUserFriends(false, friendship[0]);
      toast.success(`User removed from friends successfully`);
    } else {
      toast.error(`${response.message}`);
    }

    setRequestInProgress(false);
  };

  const handleAddFriendClick = async () => {
    setRequestInProgress(true);

    const response = await addFriends(userId);

    if (response.success) {
      const { friendship } = response.data;
      auth.updateUserFriends(true, friendship);
      toast.success(`Friend added successfully`);
    } else {
      toast.error(`${response.message}`);
    }

    setRequestInProgress(false);
  };

  if (loading) {
    return <Loader />;
  }

  if (userId === auth.user._id) {
    return <Navigate to="/settings" />;
  }

  return (
    <div
      className="w-5/6 rounded-md md:w-1/3 mt-40 p-5 mx-auto flex flex-col bg-white md:flex-row"
      onSubmit={() => {}}
    >
      <div className="md:px-8 w-full flex flex-col items-center justify-center">
        <img className="w-1/4 md:w-1/2" src="../man.png" alt="login" />

        <div className="w-full mt-2">
          <div className="text-slate-400">Email</div>
          <p className="w-full md:w-5/6 text-slate-600 text-lg">
            {user?.email}
          </p>
        </div>

        <div className="w-full mt-2">
          <div className="text-slate-400">Name</div>
          <p className="w-full md:w-5/6 text-slate-600 text-lg">{user?.name}</p>
        </div>

        <div className="w-full mt-2 flex flex-col items-end">
          {checkFriend ? (
            <button
              className="bg-cyan-500 w-full mb-2 text-white p-2 rounded-md"
              onClick={handleRemoveFriendClick}
            >
              {requestInProgress ? "Removing friend. . ." : "Remove friend"}
            </button>
          ) : (
            <button
              className="bg-cyan-500 my-4 w-full mt-2 text-white p-2 rounded-md"
              onClick={handleAddFriendClick}
            >
              {requestInProgress ? "Adding friend. . ." : "Add friend"}
            </button>
          )}
        </div>

        <Toaster position="top-right" reverseOrder={false} />
      </div>
    </div>
  );
};

export default UserProfile;
