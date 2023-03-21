import React, { useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { currentBlog, getBlog } from "../../features/blog/blogSlice";
import { api } from "../../config.js";
import ReactHtmlParser from "html-react-parser";
import Loader from "../Loader/Loader";
import moment from "moment/moment";
import Like from "../Icons/Like";
import Comment from "../Icons/Comment";
import BookMark from "../Icons/BookMark";

const endPoint = api.endPoint;

const Blogs = () => {
  const blogs1 = useSelector((state) => state.blog.blogs);
  const [state, setState] = useState(blogs1);
  const dispatch = useDispatch();
  const avgWordsPM = 250;
  const [loading, setLoading] = useState(false);
  const [time, setTime] = useState(0);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const [newSearch, setNewSearch] = useState("");

  useEffect(() => {
    (async () => {
      setLoading(true);
      const response = await fetch(`${endPoint}/api/blog/`);
      const data = await response.json();
      console.log(data);
      setState(data.Blogs);
      dispatch(getBlog(data.Blogs));
      setLoading(false);
    })();
  }, []);

  const blogs = useSelector((state) => state.blog.blogs);
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  else {
    return (
      <div>
        {!loading && state?.length == 0 && (
          <p className="text-center"> OOPs! No blogs Found</p>
        )}
        {!loading ? (
          state?.map((blog) => (
            <div key={blog._id} className="shadow mb-3 mt-2 bg-white border-bottom">
              <Link
                to={`/blog`}
                onClick={() => dispatch(currentBlog(blog))}
                class="mb-10 block    rounded-lg p-4  shadow-3xl  shadow-gray-100"
              >
                <img
                  alt="Home"
                  src="https://source.unsplash.com/random"
                  class="h-56 md:h-80 w-full    mr-5 rounded-md object-cover"
                />

                <div class="mt-2">
                  <dl>
                    <div className="flex align-m  mb-2">
                      <dd className="mr-1">
                        <img
                          // onClick={() => setMode(!mode)}
                          class="h-8 w-8 rounded-full  object-contain"
                          src="https://source.unsplash.com/random"
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

                      <dd class=" text-xl font-bold  mb-2"> {blog.title}</dd>
                      <dd class=" text-sm  mb-2 ">
                        {" "}
                        <span className=" hover:bg-gray-100 hover:rounded-md px-2  py-1 border border-white hover:border hover:border-gray-200">
                          #google
                        </span>{" "}
                        {/* {blog.tags.map((tag) => tag)} */}
                      </dd>
                      <dd class=" text-sm flex  justify-between mb-2">
                        <span className="flex flex-col md:flex-row align-middle">
                          {" "}
                          <span className="flex justify-between mr-2 hover:bg-gray-100 hover:rounded-md px-2  py-1 border border-white hover:border hover:border-gray-200">
                            {" "}
                            <Like /> <span className="mx-1">{blog.like.length} Reactions</span>
                          </span>{" "}
                          <span className="flex hover:bg-gray-100 hover:rounded-md px-2  py-1 border border-white hover:border hover:border-gray-200 ">
                            <Comment />
                            <span className="mx-1">{blog?.comments?.length} Comments</span>
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
                          <span className=" hover:bg-gray-100 hover:rounded-md   py-1 px-1 border border-white hover:border hover:border-gray-200">
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

                  <div class="mt-6 flex items-center gap-5 text-xs">
                    {blog.tags?.map((tag) => (
                      <div class="sm:inline-flex sm:shrink-0 sm:items-center sm:gap-2">
                        <div class="mt-1.5 sm:mt-0">
                          <p class="font-medium border px-2 py-2 rounded-full hover:shadow-md">
                            {tag}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </Link>
            </div>
          ))
        ) : (
          <Loader />
        )}
      </div>
    );
  }
};

export default Blogs;
