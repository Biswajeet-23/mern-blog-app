const Post = () => {
  return (
    <div className="post">
      <div className="image">
        <img
          src="https://techcrunch.com/wp-content/uploads/2024/04/poe-app.png?resize=1200,675"
          alt="No image"
        />
      </div>
      <div className="post-content">
        <h2>Quora’s Poe now lets users create and share web apps</h2>
        <p className="info">
          <a href="" className="author">
            Biswajeet Sahoo
          </a>
          <time>2023-01-06 16:45</time>
        </p>
        <p className="summary">
          Poe, Quora’s subscription-based, cross-platform aggregator for
          AI-powered chatbots like Anthropic’s Claude and OpenAI’s GPT-4o, has
          launched a feature called Previews that lets people create interactive
          apps directly in chats with chatbots.
        </p>
      </div>
    </div>
  );
};

export default Post;
