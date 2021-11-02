using Dominio.Entidades.ModeloActividad;
using Dominio.Repositorios.RepositoriosActividad;
using Infraestructura.Base;
using Dominio.Entidades;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infraestructura.Repositorio.RepositoriosActividad
{
    public class RepositorioActividad:RepositorioGenerico<Actividad>, IRepositorioActividad
    {
        public RepositorioActividad(IDbContexto contexto):base(contexto)
        {

        }
    }
}
