import { useState } from "react";
//ui
import Button from "../../ui/Button/Button";
import Input from "../../ui/Input/input"

const BoardForm = () => {
  const [title, setTitle] =
    useState("");

  return (
    <form>
      <Input
        value={title}
        onChange={(e) =>
          setTitle(e.target.value)
        }
        placeholder="Board title"
      />

      <Button type="submit">
        Create
      </Button>
    </form>
  );
};

export default BoardForm;