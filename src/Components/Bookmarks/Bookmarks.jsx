import React, { useState, useEffect } from "react";
import { addUserData } from "../../features/Auth/authSlice";
import Navbar from "../Navbar/Navbar";
import { Navigate, Link } from "react-router-dom";
import { api } from "../../config.js";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import Loader from "../Loader/Loader";
import { currentBlog, getBlog } from "../../features/blog/blogSlice";
import { getUser } from "../../features/Auth/authSlice.js";

import moment from "moment/moment";
import Like from "../Icons/Like";
import Comment from "../Icons/Comment";
import BookMark from "../Icons/BookMark";
import Button from "../Button/Button";
// const endPointF = api.frontend;
const endPoint = api.endPoint;

const Bookmarks = () => {
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");
  const Auth = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState(Auth?.user);

  console.log(userData);
  const avgWordsPM = 250;

  if (!Auth.isAuthenticated) return <Navigate to="/login" replace />;
  else {
    return (
      <div className="">
        <Navbar />
        <div className="w-3/6 mx-auto">
          {!loading && userData?.readingList?.length == 0 && (
            <p className="text-center my-5 font-bold">
              {" "}
              OOPs! No Bookmarkeds blogs Found <br />{" "}
              <Link to="/" className="text-blue-600 underline">
                {" "}
                Read Blogs
              </Link>{" "}
            </p>
          )}
          {!loading ? (
            userData?.readingList?.map((blog) => (
              <div
                key={blog._id}
                className="shadow mb-3 mt-2 bg-white border-bottom"
              >
                <Link
                  to={`/blog`}
                  onClick={() => dispatch(currentBlog(blog))}
                  class="mb-10 block    rounded-lg p-4  shadow-3xl  shadow-gray-100"
                >
                  <div class="mt-2">
                    <dl>
                      <div className="flex align-m  mb-2">
                        <dd className="mr-1">
                          <img
                            class="h-8 w-8 rounded-full  object-contain"
                            src={blog?.postedBy.profilePic}
                            alt=""
                          />
                        </dd>
                        <dd class="text-sm text-gray-500 ml-1 flex flex-col">
                          {" "}
                          <span className="font-bold text-black">
                            {blog.postedBy.name}
                          </span>{" "}
                          <span>
                            {new Date(blog.createdAt).toDateString()}{" "}
                            {`(${moment(blog.createdAt).fromNow()})`}
                          </span>
                        </dd>
                      </div>
                      <div>
                        <dt class="sr-only">Title</dt>

                        <dd class=" text-xl font-bold  mb-2 ml-2">
                          {" "}
                          {blog.title}
                        </dd>
                        {/* <dd class=" text-sm  mb-2 ">
                        {blog?.tags?.map((tag) => (
                          <span className=" hover:bg-gray-100 hover:rounded-md px-2  py-1 border border-white hover:border hover:border-gray-200">
                            #{tag}
                          </span>
                        ))}
                      </dd> */}
                        <dd class=" text-sm flex  justify-between mb-2">
                          <span className="flex flex-col md:flex-row align-middle">
                            {" "}
                            <span className="flex justify-between mr-2 hover:bg-gray-100 hover:rounded-md px-2  py-1 border border-white hover:border hover:border-gray-200">
                              {" "}
                              <Like />{" "}
                              <span className="mx-1">
                                {blog?.like?.length} Reactions
                              </span>
                            </span>{" "}
                            <span className="flex hover:bg-gray-100 hover:rounded-md px-2  py-1 border border-white hover:border hover:border-gray-200 ">
                              <Comment />
                              <span className="mx-1">
                                {blog?.comments?.length} Comments
                              </span>
                            </span>
                          </span>
                          <span className="text-sm flex">
                            {" "}
                            <span className="mr-3 pt-1">
                              {Math.ceil(
                                blog?.content.split(" ").length / avgWordsPM
                              )}{" "}
                              min read
                            </span>
                            <span
                              className={`${
                                blog.postedBy.readingList.includes(blog._id) &&
                                "bg-gray-200 border  rounded-md border-gray-200"
                              } hover:bg-gray-100 hover:rounded-md   py-1 px-1 border border-white hover:border hover:border-gray-200`}
                            >
                              <BookMark />
                            </span>
                          </span>
                        </dd>
                      </div>
                      <div>
                        <dt class="sr-only">Date</dt>

                        <dd class="text-sm text-gray-500"> </dd>
                      </div>
                    </dl>
                  </div>
                </Link>
              </div>
            ))
          ) : (
            <Loader />
          )}
        </div>
      </div>
    );
  }
};

export default Bookmarks;
