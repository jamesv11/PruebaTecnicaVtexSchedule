import React from "react";
import { Droppable } from "react-beautiful-dnd";
import { IActividad } from "../../store/actividad/Actividad";
import SingleActivity from "./SingleActivity";

interface props {
  todos: Array<IActividad>;
  setTodos: React.Dispatch<React.SetStateAction<Array<IActividad>>>;
  setCompletedTodos: React.Dispatch<React.SetStateAction<Array<IActividad>>>;
  CompletedTodos: Array<IActividad>;
}

const TodoList: React.FC<props> = ({
  todos,
  setTodos,
  CompletedTodos,
  setCompletedTodos,
}) => {
  console.log(todos);
  console.log(CompletedTodos);
  return (
    <div className="container">
      <Droppable droppableId="TodosList">
        {(provided, snapshot) => (
          <div
            className={`todos ${snapshot.isDraggingOver ? "dragactive" : ""}`}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            <span className="todos__heading">Tareas activas</span>
            {todos.map((todo, index) =>
              todo.estado === "Nueva" ? (
                <SingleActivity
                  index={index}
                  todos={CompletedTodos}
                  todo={todo}
                  key={todo.id}
                  setTodos={setCompletedTodos}
                />
              ) : null
            )}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
      <Droppable droppableId="TodosRemove">
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={`todos  ${
              snapshot.isDraggingOver ? "dragcomplete" : "remove"
            }`}
          >
            <span className="todos__heading">Tareas completadas</span>
            {CompletedTodos.map((todo, index) =>
              todo.estado === "Terminada" ? (
                <SingleActivity
                  index={index}
                  todos={CompletedTodos}
                  todo={todo}
                  key={todo.id}
                  setTodos={setCompletedTodos}
                />
              ) : null
            )}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default TodoList;
