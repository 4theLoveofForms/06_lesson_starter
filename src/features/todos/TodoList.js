// add imports
import {
  // useGetTodosQuery,
  // useAddTodoMutation,
  // useUpdateTodoMutation,
  // useDeleteTodoMutation,
  useGetChildBubblesQuery,
  useTransformBubbleMutation,
  useCreateDraftBubbleMutation,
} from "../api/apiSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faUpload } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

const TodoList = () => {
  const [newBubble, setNewBubble] = useState("");

  const {
    data: private_drafts,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetChildBubblesQuery({
    parent_id: 1,
    workflow_state: "private_draft",
  });
  // const [addTodo] = useAddTodoMutation();
  // const [updateTodo] = useUpdateTodoMutation();
  // const [deleteTodo] = useDeleteTodoMutation();
  const [transformBubble] = useTransformBubbleMutation();
  const [createDraftBubble] = useCreateDraftBubbleMutation();

  const handleSubmit = (e) => {
    e.preventDefault();
    // addTodo({ userId: 1, title: newBubble, completed: false });
    createDraftBubble({ parent_id: 1, content: newBubble });
    setNewBubble("");
  };

  const newItemSection = (
    <form onSubmit={handleSubmit}>
      <label htmlFor="new-bubble">Enter a new todo item</label>
      <div className="new-todo">
        <input
          type="text"
          id="new-bubble"
          value={newBubble}
          onChange={(e) => setNewBubble(e.target.value)}
          placeholder="Enter new bubble"
        />
      </div>
      <button className="submit">
        <FontAwesomeIcon icon={faUpload} />
      </button>
    </form>
  );

  let content;
  if (isLoading) {
    content = <p>Loading...</p>;
  } else if (isSuccess) {
    // content = JSON.stringify(private_drafts);
    content = private_drafts.body.bubbles.map((draft) => (
      <article key={draft.id}>
        <div className="todo">
          {draft.id} {draft.content}
        </div>
        <button
          className="trash"
          onClick={() =>
            transformBubble({ bubble: draft, transition: "collaborate" })
          }
        >
          <FontAwesomeIcon icon={faUpload} />
        </button>
      </article>
    ));

    // todos.map((todo) => {
    //   return (
    //     <article key={todo.id}>
    //       <div className="todo">
    //         <input
    //           type="checkbox"
    //           checked={todo.completed}
    //           id={todo.id}
    //           onChange={() =>
    //             updateTodo({ ...todo, completed: !todo.completed })
    //           }
    //         />
    //         <label htmlFor={todo.id}>{todo.title}</label>
    //       </div>
    //       <button className="trash" onClick={() => deleteTodo({ id: todo.id })}>
    //         <FontAwesomeIcon icon={faTrash} />
    //       </button>
    //     </article>
    //   );
    // });
  } else if (isError) {
    content = <p>{error}</p>;
  }

  return (
    <main>
      <h1>Todo List</h1>
      {newItemSection}
      {content}
    </main>
  );
};
export default TodoList;
