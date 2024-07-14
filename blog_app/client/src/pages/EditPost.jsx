import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Editor from "../components/Editor";

const stripHtml = (html) => {
  return html.replace(/<[^>]*>/g, "");
};

const EditPost = () => {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [files, setFiles] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      await fetch("http://127.0.0.4:4000/users/post/" + id)
        .then((response) => response.json())
        .then((postInfo) => {
          setTitle(postInfo.title);
          setContent(stripHtml(postInfo.content));
          setSummary(postInfo.summary);
        });
    };
    fetchData();
  }, [id]);

  const updatePost = async (ev) => {
    try {
      ev.preventDefault();
      const data = new FormData();
      data.set("title", title);
      data.set("summary", summary);
      data.set("content", stripHtml(content));
      data.set("id", id);
      if (files?.[0]) {
        data.set("file", files?.[0]);
      }
      const response = await fetch("http://127.0.0.4:4000/users/updatePost", {
        method: "PUT",
        body: data,
        credentials: "include",
      });
      if (response.ok) {
        setTimeout(() => {
          navigate("/post/" + id);
        }, 500);
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <form onSubmit={updatePost}>
      <input
        type="title"
        placeholder={"Title"}
        value={title}
        onChange={(ev) => setTitle(ev.target.value)}
      />
      <input
        type="summary"
        placeholder={"Summary"}
        value={summary}
        onChange={(ev) => setSummary(ev.target.value)}
      />
      <input type="file" onChange={(ev) => setFiles(ev.target.files)} />
      <Editor onChange={setContent} value={content} />
      <button style={{ marginTop: "5px" }}>Update post</button>
    </form>
  );
};

export default EditPost;
