const Form = (props) => {
  async function handleSubmit(e) {
    e.preventDefault();
    e.stopPropagation();
    const form = e.target;
    const formData = new FormData(form);
    const query = formData.get("query")
    props.setChat(chat => [...chat, query]);

    const res = await fetch("http://localhost:6969/get-message", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        msg: query,
      }),
    });
    const resBody = await res.json();
    const { msg: reply } = resBody;
    props.setChat(chat => [...chat, reply]);
  }
  return (
    <>
      <form method="post" onSubmit={handleSubmit}>
        <input type="text" name="query" />
        <input type="submit" name="submit-btn" value="click me" />
      </form>
    </>
  );
};

export default Form;
