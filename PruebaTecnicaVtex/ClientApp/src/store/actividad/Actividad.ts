import { Action, Reducer } from "redux";

// -----------------
// STATE - This defines the type of data maintained in the Redux store.

export interface IActividad {
  id: number;
  titulo: string;
  descripcion: string;
  estado: string;
  idUsuario: string;
}
export interface ActividadState {
  actividades: IActividad[];
}

// -----------------
// ACTIONS - These are serializable (hence replayable) descriptions of state transitions.
// They do not themselves have any side-effects; they just describe something that is going to happen.
// Use @typeName and isActionType for type detection that works even after serialization/deserialization.

export interface AgregarActividadAction {
  type: "AGREGAR_ACTIVIDAD";
  payload: IActividad;
}
export interface ActualizarActividadAction {
  type: "ACTUALIZAR_ACTIVIDAD";
  payload: IActividad;
}
export interface ConsultarActividadAction {
  type: "CONSULTAR_ACTIVIDAD";
  payload: IActividad[];
}

// Declare a 'discriminated union' type. This guarantees that all references to 'type' properties contain one of the
// declared type strings (and not any other arbitrary string).
export type KnownAction =
  | AgregarActividadAction
  | ActualizarActividadAction
  | ConsultarActividadAction;

// ----------------
// ACTION CREATORS - These are functions exposed to UI components that will trigger a state transition.
// They don't directly mutate state, but they can have external side-effects (such as loading data).

export const actionCreators = {
  agregarActividad: () =>
    ({ type: "AGREGAR_ACTIVIDAD" } as AgregarActividadAction),
  actualizarActividad: () =>
    ({ type: "ACTUALIZAR_ACTIVIDAD" } as ActualizarActividadAction),
  consultarActividad: () =>
    ({ type: "CONSULTAR_ACTIVIDAD" } as ConsultarActividadAction),
};

// ----------------
// REDUCER - For a given state and action, returns the new state. To support time travel, this must not mutate the old state.

export const reducer: Reducer<ActividadState> = (
  state: ActividadState | undefined,
  incomingAction: Action
): ActividadState => {
  if (state === undefined) {
    return { actividades: [] };
  }
  const action = incomingAction as KnownAction;
  switch (action.type) {
    case "AGREGAR_ACTIVIDAD":
      return { actividades: [...state.actividades, action.payload] };
    case "ACTUALIZAR_ACTIVIDAD":
      const actualizarActividad: IActividad[] = state.actividades.map(
        (actividad) => {
          if (actividad.id === action.payload.id) {
            actividad = action.payload;
          }
          return actividad;
        }
      );
      return { ...state, actividades: actualizarActividad };
    case "CONSULTAR_ACTIVIDAD":
      return { ...state, actividades: action.payload };
    default:
      return state;
  }
};
