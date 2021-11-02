using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;

namespace Aplicacion.Base.Respuesta
{
    public abstract class BaseRespuesta
    {
        public string Mensaje { get; set; }
        public bool Error { get; set; }
        public HttpStatusCode Codigo { get; set; }

    }
    public class Respuesta<T> : BaseRespuesta, IRespuesta<T>
    {
        public T Datos { get; set; }

        public void AgregarMensaje(string mensaje)
        {
            Mensaje += Codigo == 0 ? mensaje : $", {mensaje}";
        }

        public static Respuesta<T> CrearRespuesta(bool error)
        {
            return new Respuesta<T>
            {
                Error = error,
                Mensaje = null
            };
        }

        public static Respuesta<T> CrearRespuestaExitosa(T datos, HttpStatusCode codigo, string mensaje)
        {
            return new Respuesta<T>
            {
                Codigo = codigo,
                Datos = datos,
                Error = false,
                Mensaje = mensaje
            };
        }


        public static Respuesta<T> CrearRespuestaFallida(Exception e, HttpStatusCode codigo, string mensaje)
        {
            return new Respuesta<T>
            {
                Mensaje = mensaje,
                Codigo = codigo,
                Error = true
            };
        }

    }
}
