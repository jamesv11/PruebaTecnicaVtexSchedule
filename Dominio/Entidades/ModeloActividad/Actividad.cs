using Dominio.Base;
using Dominio.Entidades.ModelosUsuario;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Dominio.Entidades.ModeloActividad
{
    public class Actividad:Entidad<Guid>
    {
        public string Titulo { get; set; }
        public string Descripcion { get; set; }
        public string Estado { get; set; }

        public Usuario Usuario { get; set; }

        public void CambiarEstado(string estado)
        {
            Estado = estado;
        }

    }
}
