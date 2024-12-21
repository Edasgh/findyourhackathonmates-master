"use client";

import NotFoundUser from "@/components/not-found-user";

import Link from "next/link";
import { useRouter } from "next/navigation";

import { useLayoutEffect, useState } from "react";
import LoadingComponent from "../loading";
import CustomAvatar from "@/components/CustomAvatar";
import SkillsCloud from "@/components/SkillsCloud";
import {
  faEnvelope,
  faPenToSquare,
  faPeopleGroup,
  faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import EditProfile from "@/components/EditProfile";

export default function Profile() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [userDetails, setUserDetails] = useState(null);
  const res = async () => {
    try {
      const resp = await fetch("/api/profile");
      const data = await resp.json();

      if (resp.status === 200) {
        setUserDetails(data);
        setLoading(false);
      } else {
        throw new Error("Something went wrong!");
      }
    } catch (err) {
      setUserDetails(null);
      setLoading(false);
    }
  };
  useLayoutEffect(() => {
    res();
  }, []);

  const handleLogOut = async () => {
    const response = await fetch("/api/logout");

    if (response.status === 200) {
      router.push("/");
      setInterval(() => {
        window.location.reload();
      }, 800);
    }
  };

  return (
    <>
      {loading ? (
        <>
          <div className="w-screen">
            <LoadingComponent />
          </div>
        </>
      ) : (
        <>
          {userDetails === null ? (
            <div className="w-screen">
              <NotFoundUser />
            </div>
          ) : (
            <div
              className="w-screen mt-12 bg-bgPrimary flex gap-2 flex-wrap"
              suppressHydrationWarning
            >
              {/* Profile Card */}
              <div className="bg-bgSecondary mx-4 p-6  h-fit flex flex-1 flex-col items-start gap-3">
                <div className="flex gap-3 justify-center items-center">
                  <CustomAvatar name={userDetails.name} />
                  <p className="text-textPrimary text-xl">{userDetails.name}</p>
                  <p className="text-textPrimary font-light text-xs bg-black p-2 rounded-md">
                    {userDetails.country}
                  </p>
                </div>

                <div className="flex flex-wrap gap-2">
                  <Link
                    href={`https://github.com/${userDetails.githubID}`}
                    target="_blank"
                  >
                    <p className="text-textPrimary underline flex gap-2 justify-center items-center text-xs px-2 py-1">
                      <FontAwesomeIcon className="text-2xl" icon={faGithub} />
                      {`https://github.com/${userDetails.githubID}`}
                    </p>
                  </Link>
                  <Link
                    href={`mailTo:${userDetails.email}`}
                    target="_blank"
                    className="flex gap-2 justify-center items-center"
                  >
                    <p className="text-textPrimary flex gap-2 justify-center items-center text-xs px-2 py-1">
                      <FontAwesomeIcon
                        className="text-2xl text-textPrimary"
                        icon={faEnvelope}
                      />
                      {userDetails.email}
                    </p>
                  </Link>
                  <Link
                    href="/profile/myTeams"
                    className="text-textPrimary flex gap-2 justify-center items-center text-center text-xs"
                  >
                    &nbsp;
                    <FontAwesomeIcon
                      icon={faPeopleGroup}
                      className={"text-textPrimary text-lg"}
                    />
                    &nbsp; Teams : &nbsp;{userDetails.teams.length}
                  </Link>
                </div>

                <p
                  className="flex gap-3 flex-col text-textBgPrimaryHv font-light text-sm"
                  suppressHydrationWarning
                >
                  <span className="text-textPrimary font-normal text-[1rem]">
                    Bio{" "}
                  </span>
                  {userDetails.bio}
                </p>
                <div className="flex gap-3 flex-col" suppressHydrationWarning>
                  <p className="text-textPrimary">Skills </p>
                  <SkillsCloud skilsArr={userDetails.skills} />
                </div>
                <div
                  className="flex mt-2 gap-3 flex-wrap"
                  suppressHydrationWarning
                >
                  <button
                    onClick={handleLogOut}
                    title="LogOut"
                    className="w-fit border-[1px] text-sm text-textPrimary border-textBgPrimaryHv hover:bg-textBgPrimaryHv hover:text-black  px-5 py-3 rounded-md"
                  >
                    <FontAwesomeIcon icon={faRightFromBracket} />
                    &nbsp; LogOut
                  </button>

                  <Link
                    href={`/reset_password?id=${userDetails._id}`}
                    className="flex gap-2 justify-center items-center"
                  >
                    <button className="w-fit border-[1px] text-sm text-textPrimary border-textBgPrimaryHv hover:bg-textBgPrimaryHv hover:text-black  px-5 py-3 rounded-md">
                      <FontAwesomeIcon icon={faPenToSquare} /> &nbsp; Change
                      Password
                    </button>
                  </Link>
                </div>
              </div>
              {/* Edit Profile Form */}
              <div className="bg-bgSecondary mx-4 p-6 w-fit h-fit mb-3 flex flex-col items-start gap-3">
                <h1 className="text-center section-title mt-12 text-textPrimary poppins-semibold text-2xl">
                  Edit Profile
                </h1>
                <EditProfile
                  UserId={userDetails._id}
                  UserName={userDetails.name}
                  UserEmail={userDetails.email}
                  UserCountry={userDetails.country}
                  UserBio={userDetails.bio}
                  UserGithubID={userDetails.githubID}
                  UserSkills={userDetails.skills}
                />
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
}
