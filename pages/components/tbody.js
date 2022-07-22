import React, { useEffect, useState } from "react";
import Moralis from "moralis";
import { useMoralis } from "react-moralis";
import { useRouter } from "next/router";
import { useTheme } from "next-themes";
import { BsHandThumbsUpFill, BsHandThumbsUp, BsHandThumbsDown, BsHandThumbsDownFill } from "react-icons/bs";


function Tbody(props) {
  const { authenticate, isAuthenticated, user } = useMoralis();
  const [like, setLike] = useState("");
  const [isDisabled, setDisabled] = useState(false);
  const [dislike, setDislike] = useState("");
  const [likeCount, setLikeCount] = useState(props.likes);
  const [dislikeCount, setDisLikeCount] = useState(props.dislikes);
  const { theme, setTheme } = useTheme("dark");
  const [isMounted, setMounted] = useState(false);

  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated) {
      getUserReaction(true);
      getUserReaction(false);
    }
  }, [isAuthenticated]);

  useEffect(() => {
    setMounted(true);
  }, []);

  function getDisplayType(val) {
    try {
      let TypeLength = val ? val.length : 0;
      let TypeBadge = "";
      if (TypeLength > 0) {
        if (TypeLength > 2) {
          let restCount = TypeLength - 2;
          TypeBadge = val.slice(0, 2).map((type, index) => {
            return (
              <div key={index} className={`app-type bottom-partial ${theme === "light" ? "bg-black text-white" : "bg-white text-black"}`}>
                {type}
              </div>
            );
          });
          return (
            <>
              {TypeBadge}{" "}
              <span className={`app-type bottom-partial ${theme === "light" ? "bg-black text-white" : "bg-white text-black"}`}>+{restCount}</span>
            </>
          );
        } else {
          TypeBadge = val.map((type, index) => {
            return (
              <div key={index} className={`app-type bottom-partial ${theme === "light" ? "bg-black text-white" : "bg-white text-black"}`}>
                {type}
              </div>
            );
          });
          return TypeBadge;
        }
      }
    } catch (e) { }
  }

  const handleReaction = async (isLiked) => {
    setDisabled(true);

    try {
      let isExists = await getUserReaction(isLiked);
      if (isAuthenticated && !isExists) {
        const DappVotes = Moralis.Object.extend("DappVotes");
        const Dapps = Moralis.Object.extend("Dapps");

        const newDapObject = new Dapps();
        newDapObject.id = props.id;

        const query = new Moralis.Query(Dapps);
        query.equalTo("objectId", props.id);
        const response = await query.first();

        const query2 = new Moralis.Query(DappVotes);
        query2.equalTo("user", user.get("ethAddress"));
        query2.equalTo("dapp", newDapObject);
        const response2 = await query2.first();

        if (response) {
          const newLikesObject = new DappVotes();
          newLikesObject.set("dapp", newDapObject);
          newLikesObject.set("user", user.get("ethAddress"));
          newLikesObject.set("isLiked", isLiked);
          newLikesObject.set("status", "ACTIVE");
          await newLikesObject.save();

          if (isLiked) {
            setLike(isLiked);
            setLikeCount(likeCount + 1);
            response.increment("likes", 1);

            if (response2) {
              response.increment("dislikes", -1);
              setDislike(false);
              setDisLikeCount(dislikeCount - 1);
            }
          } else {
            setDislike(true);
            setDisLikeCount(dislikeCount + 1);
            response.increment("dislikes", 1);

            if (response2) {
              response.increment("likes", -1);
              setLike(false);
              setLikeCount(likeCount - 1);
            }
          }

          if (response2) {
            await response2.destroy();
          }
          await response.save();
        }
      }
      setDisabled(false);
    } catch (e) {
      setDisabled(false);
    }
  };

  const getUserReaction = async (isLiked) => {
    console.log("");
    try {
      if (isAuthenticated) {
        const DappVotes = Moralis.Object.extend("DappVotes");
        const Dapps = Moralis.Object.extend("Dapps");

        const newDapObject = new Dapps();
        newDapObject.id = props.id;

        const query = new Moralis.Query(DappVotes);
        query.equalTo("user", user.get("ethAddress"));
        query.equalTo("dapp", newDapObject);
        query.equalTo("isLiked", isLiked);
        const response = await query.first();

        if (response) {
          if (response.get("isLiked")) {
            setLike(true);
          } else {
            setDislike(true);
          }
        }
        return response;
      }
    } catch (e) {
      console.log(e);
    }
  };
  if (!isMounted) return null;

  return (
    <div className="table-body mt-5 px-4" key={props.index}>
      <div className="table-row">
        <div className="bg-[#e2e7ef] rounded-lg lg:border-0 table-data hidden  md:flex col-rank lg:bg-none">
          <div className="component-ranking-table-rank rank-1">
            <span className="current-rank">{props.index}</span>
            <span className="past-rank"></span>
          </div>
        </div>
        <div className={`flex flex-col py-4 justify-center lg:py-0 lg:justify-left lg:flex-row table-main ${theme === "light" ? "custom-shadow border-white table-main-lite" : "custom-shadow-black border-black"}`}>
          <div className="text-center lg:table-data flex col-name">
            <div className="component-ranking-table-name">
              <div className="icon-place mr-4 py-4">
                <div className={`icon-wrapper border-2 border-white ${theme === "light" ? "custom-shadow icon-wrpper-lite" : "custom-shadow-black border-black"}`}>
                  {/* <a className="icon-link"> */}
                  <img
                    src={props.logo}
                    alt="Image"
                    width={40}
                    height={40}
                    className="rounded-lg"
                  />
                  {/* </a> */}
                </div>
              </div>

              <div className="text-center right-wrapper py-4">
                <div className="top-wrapper">
                  <div className="name-description-wrapper">
                    <div
                      className="name-description-top-wrapper"
                      onClick={() => router.push(`/dappDetails/${props.id}`)}
                    >
                      <h4 className="name">
                        <a className="link">{props.name}</a>
                      </h4>
                    </div>
                    <p className="description text-xs text-justify font-thin my-2">{props.short_description}</p>
                  </div>
                </div>
                <div className="bottom-wrapper">
                  {getDisplayType(props.types)}
                  {/* {props.types.map((res, i) => {
                    
                  })} */}
                </div>
              </div>
            </div>
          </div>
          <div className="hidden md:flex">
            <div className="flex table-data flex col-dau">
              <span className="col-title-mobile">Page Views</span>
              <div className="component-ranking-table-value-pct">
                <span className="value">{props.page_views}</span>
                {/* <div className="pct is-positive">
                <div className="is-positive-value">
                  <span>^</span>
                  11.40%
                </div>
              </div> */}
              </div>
            </div>
            <div className="table-data flex col-tx">
              <span className="col-title-mobile">Status</span>
              <div className="component-ranking-table-value-pct">
                <span className="value">{props.app_status}</span>
                {/* <span className="pct is-positive">
                <div className="is-positive-value">
                  <span>^</span>
                  11.40%
                </div>
              </span> */}
              </div>
            </div>
            <div className="table-data flex col-vol">
              <span className="col-title-mobile">Ticker</span>
              <div className="component-ranking-table-volume-head">
                <span className="value">{props.ticker}</span>
                {/* <span className="pct is-negative">-9.00%</span> */}
              </div>
            </div>
            <div className="table-data flex col-vol col-vol-hbd">
              <span className="col-title-mobile">Sacrifice</span>
              <div className="component-ranking-table-volume-head">
                <span className="value">{props.sacrifice}</span>
                {/* <span className="pct is-positive">
                <span>^</span>
                154.80%
              </span> */}
              </div>
            </div>
            <div className="table-data flex col-rewards col-rewards-hive">
              <span className="col-title-mobile">Total Supply</span>
              <div className="component-ranking-table-volume-head">
                <span className="value">{props.total_supply}</span>
                {/* <span className="pct is-positive">
                <div className="is-positive-value">
                  <span>^</span>
                  11.40%
                </div>
              </span> */}
              </div>
            </div>
            <div className="table-data flex col-rewards col-rewards-hive">
              <span className="col-title-mobile">Vote</span>
              <div className="component-ranking-table-volume-head">
                <span className="value flex">
                  <button
                    className="text-center"
                    disabled={isDisabled}
                    onClick={(e) => {
                      e.preventDefault();
                      isAuthenticated ? handleReaction(true) : authenticate();
                    }}
                  >
                    {like ? (
                      <BsHandThumbsUpFill className="h-5 w-5" color="blueviolet" />
                    ) : (
                      <BsHandThumbsUp className="h-5 w-5" color="blueviolet" />
                    )}


                    <span className="link">{likeCount}</span>
                  </button>
                  <button
                    className="text-center ml-2"
                    disabled={isDisabled}
                    onClick={(e) => {
                      e.preventDefault();
                      isAuthenticated ? handleReaction(false) : authenticate();
                    }}
                  >
                    {dislike ? (
                      <BsHandThumbsDownFill className="h-5 w-5" />
                    ) : (
                      <BsHandThumbsDown className="h-5 w-5" />
                    )
                    }

                    <span className="font-bold">{dislikeCount}</span>
                  </button>
                </span>
              </div>
            </div>
          </div>
          <div className="block md:hidden text-center">
            <div class="grid grid-cols-2 divide-x divide-gray-700">
              <div className="flex flex-col">
                <p className="col-title-mobile my-2 text-gray-500 text-xs ">Page Views</p>
                <p className="col-title-mobile">{props.page_views}</p>
              </div>
              <div className="flex flex-col">
                <p className="col-title-mobile my-2 text-gray-500 text-xs ">Status</p>
                <p className="col-title-mobile uppercase">{props.app_status}</p>
              </div>
            </div>
            <div class="grid grid-cols-3 divide-x mt-14 divide-gray-700">
              <div className="flex flex-col">
                <p className="col-title-mobile my-2 text-gray-500 text-xs ">Ticker</p>
                <p className="col-title-mobile">{props.ticker}</p>
              </div>
              <div className="flex flex-col">
                <p className="col-title-mobile my-2 text-gray-500 text-xs ">Sacrifice</p>
                <p className="col-title-mobile">{props.sacrifice}</p>
              </div>
              <div className="flex flex-col">
                <p className="col-title-mobile my-2 text-gray-500 text-xs ">Total Supply</p>
                <p className="col-title-mobile">{props.total_supply}</p>
              </div>
            </div>
            <div className="border-t-2 mt-14 border-gray-700">
              <div class="grid grid-cols-2 divide-x divide-gray-700">
                <div className="flex justify-center p-5">
                  <button
                    className="text-center"
                    disabled={isDisabled}
                    onClick={(e) => {
                      e.preventDefault();
                      isAuthenticated ? handleReaction(true) : authenticate();
                    }}
                  >
                    {like ? (
                      <BsHandThumbsUpFill className="h-5 w-5" color="blueviolet" />
                    ) : (
                      <BsHandThumbsUp className="h-5 w-5" color="blueviolet" />
                    )}
                  </button>
                  <div className="ml-2">
                    <span className="link">{likeCount}</span>
                  </div>
                </div>

                <div className="flex justify-center p-5">

                  <button
                    className="text-center"
                    disabled={isDisabled}
                    onClick={(e) => {
                      e.preventDefault();
                      isAuthenticated ? handleReaction(false) : authenticate();
                    }}
                  >
                    {dislike ? (
                      <BsHandThumbsDownFill className="h-5 w-5" />
                    ) : (
                      <BsHandThumbsDown className="h-5 w-5" />
                    )
                    }
                  </button>
                  <div className="ml-2">
                    <span className="font-bold">{dislikeCount}</span>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Tbody;
