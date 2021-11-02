import React, { useEffect, useState } from "react";
import { useRef } from "react";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import { MdDone } from "react-icons/md";
import { Draggable } from "react-beautiful-dnd";
import { IActividad } from "../../store/actividad/Actividad";
import { useDispatch } from "react-redux";
import * as Activity from "../../store/actividad/Actividad";
import useLogin from "../../hooks/useLogin";

const SingleActivity: React.FC<{
  index: number;
  todo: IActividad;
  todos: Array<IActividad>;
  setTodos: React.Dispatch<React.SetStateAction<Array<IActividad>>>;
}> = ({ index, todo, todos, setTodos }) => {
  const login = useLogin();
  const dispatch = useDispatch();
  const [edit, setEdit] = useState<boolean>(false);
  const [editTodo, setEditTodo] = useState<string>(todo.descripcion);

  const inputRef = useRef<HTMLInputElement>(null);

  const handleEdit = (e: React.FormEvent, id: string) => {
    e.preventDefault();
    setTodos(
      todos.map((todo) => (todo.id === id ? { ...todo, todo: editTodo } : todo))
    );
    setEdit(false);
  };

  const handleDelete = (id: string) => {
    let actividad: IActividad = {
      id,
      estado: "Terminada",
      titulo: "",
      descripcion: "",
      token: login.user.token,
    };
    dispatch(
      Activity.actionCreators.eliminarActividad(
        actividad,
        async (response: any) => {
          const res = await response;
          console.log(res);
          if (res.status === 200) {
            setTodos(todos.filter((todo) => todo.id !== id));
          }
        }
      )
    );
  };

  const handleDone = (id: string) => {
    let actividad: IActividad = {
      id,
      estado: "Terminada",
      titulo: "",
      descripcion: "",
      token: login.user.token,
    };
    dispatch(
      Activity.actionCreators.actualizarActividad(
        actividad,
        async (response: any) => {
          const res = await response;
          if (res.status === 200) {
            setTodos(
              todos.map((todo) =>
                todo.id === id ? { ...todo, estado: "Terminada" } : todo
              )
            );
          }
        }
      )
    );
  };

  return (
    <Draggable draggableId={todo.id.toString()} index={index}>
      {(provided, snapshot) => (
        <form
          onSubmit={(e) => handleEdit(e, todo.id)}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          className={`todos__single ${snapshot.isDragging ? "drag" : ""}`}
        >
          {edit ? (
            <input
              value={editTodo}
              onChange={(e) => setEditTodo(e.target.value)}
              className="todos__single--text"
              ref={inputRef}
            />
          ) : todo.descripcion === "terminada" ? (
            <s className="todos__single--text">
              {todo.titulo + todo.descripcion}
            </s>
          ) : (
            <span className="todos__single--text">
              {todo.titulo + ": " + todo.descripcion}
            </span>
          )}
          <div>
            <span
              className="icon"
              onClick={() => {
                if (!edit && todo.estado !== "Terminada") {
                  setEdit(!edit);
                }
              }}
            >
              <AiFillEdit />
            </span>
            <span className="icon" onClick={() => handleDelete(todo.id)}>
              <AiFillDelete />
            </span>
            <span className="icon" onClick={() => handleDone(todo.id)}>
              <MdDone />
            </span>
          </div>
        </form>
      )}
    </Draggable>
  );
};

export default SingleActivity;
