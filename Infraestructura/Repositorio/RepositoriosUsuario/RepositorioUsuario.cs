using Dominio.Entidades.ModelosUsuario;
using Dominio.Repositorios.RepositorioUsuario;
using Infraestructura.Base;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infraestructura.Repositorio.RepositoriosUsuario
{
    public class RepositorioUsuario:RepositorioGenerico<Usuario>, IRepositorioUsuario
    {
        public RepositorioUsuario(IDbContexto contexto) : base(contexto)
        {

        }
    }
    
}
