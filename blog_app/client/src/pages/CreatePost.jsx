import React, { useState } from "react";
import "react-quill/dist/quill.snow.css";
import ReactQuill from "react-quill";
import { useNavigate } from "react-router-dom";

const modules = {
  toolbar: [
    [{ header: [1, 2, false] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    ["link", "image"],
    ["clean"],
  ],
};

const stripHtml = (html) => {
  return html.replace(/<[^>]*>/g, "");
};

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [files, setFiles] = useState(null);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const userForm = new FormData();
      userForm.set("title", title);
      userForm.set("summary", summary);
      userForm.set("content", stripHtml(content));
      userForm.set("file", files[0]);
      const response = await fetch("http://127.0.0.4:4000/users/newPost", {
        method: "POST",
        body: userForm,
      });
      if (response.status === 200) {
        // const data = response.json();
        // console.log(data);
        setTimeout(() => {
          navigate("/");
        }, 500);
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <>
      <form action="" onSubmit={handleSubmit}>
        <input
          type="title"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="summary"
          placeholder="Summary"
          value={summary}
          onChange={(e) => setSummary(e.target.value)}
        />
        <input type="file" onChange={(e) => setFiles(e.target.files)} />
        <ReactQuill
          value={content}
          modules={modules}
          onChange={(newValue) => setContent(newValue)}
        />
        <button style={{ marginTop: "5px" }}>Create Post</button>
      </form>
    </>
  );
};

export default CreatePost;
