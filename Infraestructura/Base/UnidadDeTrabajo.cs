using System.Threading.Tasks;
using Dominio.Contrato;
using Dominio.Repositorios.RepositoriosActividad;
using Dominio.Repositorios.RepositorioUsuario;
using Infraestructura.Repositorio.RepositoriosActividad;
using Infraestructura.Repositorio.RepositoriosUsuario;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Storage;

namespace Infraestructura.Base
{
    public class UnidadDeTrabajo : IUnidadDeTrabajo
    {
        private IDbContexto _dbContexto;
        private IDbContextTransaction _transaccion;

        public UnidadDeTrabajo(IDbContexto contexto)
        {
            _dbContexto = contexto;
        }



        private IRepositorioActividad _repositorioActividad;
        private IRepositorioUsuario _repositorioUsuario;

        public IRepositorioActividad RepositorioActividad => _repositorioActividad ??=
            new RepositorioActividad(_dbContexto);

        public IRepositorioUsuario RepositorioUsuario => _repositorioUsuario ??= 
            new RepositorioUsuario(_dbContexto);

        public void Dispose()

        {
            Dispose(true);
        }

        private void Dispose(bool disposing)
        {
            if (!disposing || _dbContexto == null) return;
            ((DbContext)_dbContexto).Dispose();
            _dbContexto = null;
        }

        public void BeginTransaction()
        {
            _transaccion = ((PersistenceContext)_dbContexto).Database.BeginTransaction();
        }

        public void Commit()
        {
            _transaccion?.Commit();
        }

        public void RollBack()
        {
            _transaccion?.Rollback();
        }

        public async Task SaveChanges()
        {
            await _dbContexto.SaveChangesAsync();
        }

    }
}