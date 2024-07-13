import { formatISO9075 } from "date-fns";

const Post = ({ title, content, summary, cover, createdAt }) => {
  return (
    <div className="post">
      <div className="image">
        <img
          src="https://techcrunch.com/wp-content/uploads/2024/04/poe-app.png?resize=1200,675"
          alt="No image"
        />
      </div>
      <div className="post-content">
        <h2>{title}</h2>
        <p className="info">
          <a href="" className="author">
            Biswajeet Sahoo
          </a>
          <time>{formatISO9075(new Date(createdAt))}</time>
        </p>
        <p className="summary">
          <b>{summary}</b>
          {content}
        </p>
      </div>
    </div>
  );
};

export default Post;
