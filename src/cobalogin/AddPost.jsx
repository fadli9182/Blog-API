import React, { useState } from "react";
// import { useNavigate } from "react-router";
import axios from "axios";
import { getAccessToken } from "./utils/api";
import Swal from "sweetalert2";
import { FaHeart } from "react-icons/fa";
import { motion } from "framer-motion";

export const AddPost = ({ post, getdata }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState();
  const [isEdit, setIsEdit] = useState(false);
  const [id, setId] = useState("");

  const config = {
    headers: { Authorization: `Bearer ${getAccessToken()}`, "Content-Type": "multipart/form-data", Accept: "application/json" },
  };

  const onAddPostHandler = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("title", title);
    formData.append("content", content);
    formData.append("image", image);

    const config = {
      headers: { Authorization: `Bearer ${getAccessToken()}`, "Content-Type": "multipart/form-data", Accept: "application/json" },
    };
    if (isEdit === true) {
      axios.post(`https://jcc.brandingyou.id/api/post/${id}`, formData, config).then((res) => {
        console.log(res);
        setIsEdit(false);
        alert("Berhasil rubah");
        getdata();
      });
      setContent("");
      setTitle("");
    } else {
      axios
        .post(`https://jcc.brandingyou.id/api/post`, formData, config)
        .then((response) => {
          console.log(response.data);
          Swal.fire("Berhasil", "Postingan berhasil dipost", "success");
          getdata();
        })
        .catch((error) => {
          console.log(error);
        });
      setTitle("");
      setContent("");
      setImage();
    }
  };

  async function handleEdit(id) {
    setIsEdit(true);
    await axios.get(`https://jcc.brandingyou.id/api/post/${id}`, config).then((res) => {
      console.log(res);
      setTitle(res.data.data.title);
      setContent(res.data.data.content);
      setId(id);
      console.log(id);
      console.log("clicked");
      console.log(content);
      console.log(isEdit);
    });
  }

  const onDelete = async (id) => {
    try {
      await axios.delete(`https://jcc.brandingyou.id/api/post/${id}`, config);
      Swal.fire("Berhasil", "Postingan sudah dihapus", "success");
    } catch (error) {
      console.log(error);
    }
    getdata();
  };

  if (!post.length) {
    return <p>No One Posts</p>;
  }

  return (
    <>
      <form onSubmit={onAddPostHandler}>
        <div className="form-floating mb-3">
          <input value={title} onChange={(e) => setTitle(e.target.value)} type="text" className="form-control" name="title" id="titlePost" placeholder="Masukan Judul" />
          <label htmlFor="formId1">Judul</label>
        </div>
        <div className="form-floating mb-3">
          <input value={content} onChange={(e) => setContent(e.target.value)} type="textarea" height={"100px"} className="form-control" name="title" id="contentPost" placeholder="Masukan Judul" />
          <label htmlFor="formId1">Masukan Isi Post</label>
        </div>
        <div className="mb-3">
          <label htmlFor="" className="form-label">
            Choose file
          </label>
          <input file={image} accept=".jpg, .png, .jpeg" onChange={(e) => setImage(e.target.files[0])} type="file" className="form-control" name="gambar" id="imagePost" />
        </div>
        <button className="btn btn-success">Post</button>
      </form>
      <div className="row ">
        {post.map((post) => (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ rotate: 360, scale: 1 }}
            transition={{
              type: "spring",
              stiffness: 260,
              damping: 20,
            }}
            key={post.id}
            className="card col-xl-12 my-5 p-5 shadow  "
          >
            <div className="row ">
              <div className="col-md-5" style={{ display: "flex", justifyContent: "center" }}>
                <motion.img whileHover={{ scale: 1.5 }} transition={{ type: "spring", stiffness: 200 }} className="img-fluid" width={"450px"} height={"400px"} src={post.image} alt="Gambar" />
              </div>
              <div className="col-md-7">
                <h5>
                  Createdby: {post.author} with{"         "}
                  <span style={{ fontSize: "30px" }}>
                    <FaHeart style={{ color: "red", fontSize: "24px" }} />
                  </span>
                </h5>
                <hr />
                <h1 style={{ textTransform: "capitalize" }}>{post.title}</h1>
                <p>{post.content}</p>
                <button className="btn btn-danger me-3 shadow" onClick={() => onDelete(post.id)}>
                  Delete
                </button>
                <button className="btn btn-info shadow text-light" onClick={() => handleEdit(post.id)}>
                  Edit
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </>
  );
};

export default AddPost;
