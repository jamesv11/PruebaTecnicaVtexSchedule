using Dominio.Entidades.ModeloActividad;
using Dominio.Entidades.ModelosUsuario;
using Infraestructura.Base;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;

namespace Infraestructura
{
    public class PersistenceContext : DbContextoBase
    {
        public PersistenceContext(DbContextOptions options, IConfiguration config):base(options, config)
        {

        }


        #region DbSets
        public DbSet<Usuario> Usuario { get; set; }
        public DbSet<Actividad> Actividad { get; set; }

        #endregion


        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
        }
    }
}
