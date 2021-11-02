using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Aplicacion.Http.Output
{
    public class UsuarioLoginOutput
    {
        public int Id { get; set; }
        public string UsuarioIdentificacion { get; set; }
        public string Nombre { get; set; }
        public string Token { get; set; }
    }
}
