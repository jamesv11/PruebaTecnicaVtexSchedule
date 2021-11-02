using Dominio.Base;
using Dominio.Entidades.ModeloActividad;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Dominio.Entidades.ModelosUsuario
{
    public class Usuario:Entidad<int>
    {
        public string Nombre { get; set; }
        public string IdentificacionUsuario { get; set; }
        public string Password { get; set; }
        public List<Actividad> Actividades { get; set; }

        public Usuario()
        {
            this.Actividades = new List<Actividad>();
        }
        public Actividad CrearActividad(string titulo, string descripcion)
        {
            Actividad Actividad = new()
            {
                Titulo = titulo,
                Descripcion = descripcion,
                Estado = "Nueva",
                Usuario = this
            };

            return Actividad;

        }
    }
}
