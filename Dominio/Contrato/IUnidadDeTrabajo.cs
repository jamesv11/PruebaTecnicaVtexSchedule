using Dominio.Repositorios.RepositoriosActividad;
using Dominio.Repositorios.RepositorioUsuario;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Dominio.Contrato
{
    public interface IUnidadDeTrabajo:IDisposable
    {
        #region [Respositorios]
        public IRepositorioActividad RepositorioActividad { get; }
        public IRepositorioUsuario RepositorioUsuario { get; }
      
        #endregion

        void Commit();
        void RollBack();
        Task SaveChanges();
        void BeginTransaction();
    }
}
