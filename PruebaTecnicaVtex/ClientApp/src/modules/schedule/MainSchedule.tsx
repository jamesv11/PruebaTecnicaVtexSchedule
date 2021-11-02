import React, { useEffect, useState } from "react";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { useSelector } from "react-redux";
import { IActividad } from "../../store/actividad/Actividad";
import InputField from "./InputField";
import Schedule from "./Schedule";

interface props {
  todos: Array<any>;
}
const MainSchedule: React.FC<props> = (props: any) => {
  console.log(props.todos.actividad);

  useEffect(() => {
    setTodos(props.todos.actividad);
    setCompletedTodos(props.todos.actividad);
  }, [props.todos]);

  const [todos, setTodos] = useState<Array<IActividad>>(
    props.todos.actividad || []
  );
  const [CompletedTodos, setCompletedTodos] = useState<Array<IActividad>>(
    props.todos.actividad || []
  );

  const onDragEnd = (result: DropResult) => {
    const { destination, source } = result;

    console.log(result);

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    let add;
    let active = todos;
    let complete = CompletedTodos;
    // Source Logic
    if (source.droppableId === "TodosList") {
      add = active[source.index];
      active.splice(source.index, 1);
    } else {
      add = complete[source.index];
      complete.splice(source.index, 1);
    }

    // Destination Logic
    if (destination.droppableId === "TodosList") {
      active.splice(destination.index, 0, add);
    } else {
      complete.splice(destination.index, 0, add);
    }

    setCompletedTodos(complete);
    setTodos(active);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="App">
        <span className="heading">Tablero</span>
        <InputField />
        <Schedule
          todos={todos}
          setTodos={setTodos}
          CompletedTodos={CompletedTodos}
          setCompletedTodos={setCompletedTodos}
        />
      </div>
    </DragDropContext>
  );
};

export default MainSchedule;
