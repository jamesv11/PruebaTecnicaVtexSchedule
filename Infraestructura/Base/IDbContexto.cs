using System.Threading;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;
using Microsoft.Extensions.Configuration;

namespace Infraestructura.Base
{
    public interface IDbContexto
    {
        DbSet<T> Set<T>() where T : class;
        EntityEntry Entry(object entity);
        EntityEntry<TEntity> Entry<TEntity>(TEntity entity) where TEntity : class;
        void SetModified(object entity);
        Task<int> SaveChangesAsync(CancellationToken cancellationToken = new CancellationToken());
    }

    public class DbContextoBase : DbContext, IDbContexto
    {
        private readonly IConfiguration Config;
        public DbContextoBase(DbContextOptions options, IConfiguration config) : base(options)
        {
            Config = config;
        }
        public void SetModified(object entity)
        {
            Entry(entity).State = EntityState.Modified;
        }


    }
}
