import { useState } from "react";

const BoardForm = () => {
  const [title, setTitle] =
    useState("");

  return (
    <form>
      <input
        value={title}
        onChange={(e) =>
          setTitle(e.target.value)
        }
        placeholder="Board title"
      />

      <button type="submit">
        Create
      </button>
    </form>
  );
};

export default BoardForm;