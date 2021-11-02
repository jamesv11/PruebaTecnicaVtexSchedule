using Dominio.Entidades.ModeloActividad;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Aplicacion.Http.Input
{
    public class UsuarioInput
    {
        public string Nombre { get; set; }
        public string IdentificacionUsuario { get; set; }
        public string Password { get; set; }
       
    }
}
