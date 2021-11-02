using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using Dominio.Base;
using Dominio.Contrato;
using Microsoft.EntityFrameworkCore;

namespace Infraestructura.Base
{
    public class RepositorioGenerico<T> : IRepositorioGenerico<T> where T: DominioEntidad
    {
        private readonly IDbContexto _db;
        private readonly DbSet<T> _dbSet;

        protected RepositorioGenerico(IDbContexto contexto)
        {
            _db = contexto;
            _dbSet = contexto.Set<T>();
        }

        public async Task<List<T>> ObtenerTodos(Func<IQueryable<T>, IOrderedQueryable<T>> ordenarPor, int pagina = 1,
            int tamanio = int.MaxValue)
        {
            return await ordenarPor(_dbSet).Skip((pagina - 1) * tamanio).Take(tamanio).ToListAsync();
        }

        public async Task<bool> ExisteRegistro(Expression<Func<T, bool>> predicado)
        {
            var entidad = await _db.Set<T>().Where(predicado).FirstOrDefaultAsync();
            return entidad != null;
        }

        public async Task<T> ObtenerPrimeroODeterminado(Expression<Func<T, bool>> predicado)
        {
            return await _dbSet.Where(predicado).FirstOrDefaultAsync();
        }

        public async Task<List<T>> ObtenerPor(Expression<Func<T, bool>> filtro = null, string propiedadesIncluidas = "",
            Func<IQueryable<T>, IOrderedQueryable<T>> ordenarPor = null)
        {
            var query = GetQueryable();

            if (filtro != null) query = query.Where(filtro);

            query = propiedadesIncluidas.Split(new[] { ',' }, StringSplitOptions.RemoveEmptyEntries)
                .Aggregate(query, (current, includeProperty) => current.Include(includeProperty));

            query = ordenarPor != null ? ordenarPor(query) : query;
            return await query.ToListAsync();
        }

        private IQueryable<T> GetQueryable()
        {
            return _dbSet.AsQueryable();
        }

        public async Task Agregar(T entidad)
        {
            await _dbSet.AddAsync(entidad);
            await _db.SaveChangesAsync();
        }

        public async Task AgregarEnRango(List<T> entidades)
        {
            await _dbSet.AddRangeAsync(entidades);
            await _db.SaveChangesAsync();
        }

        public async Task Editar(T entidad)
        {
            _db.SetModified(entidad);
            await _db.SaveChangesAsync();
        }

        public async Task Remover(T entidad)
        {
            _db.Set<T>().Remove(entidad);
            await _db.SaveChangesAsync();
        }

        public async Task RemoverEnRango(List<T> entidades)
        {
            _db.Set<T>().RemoveRange(entidades);
            await _db.SaveChangesAsync();
        }

        public async Task<IEnumerable<T>> ObtenerTodos()
        {
            return await _db.Set<T>().ToListAsync();
        }

        public async Task<IEnumerable<T>> ObtenerDonde(Expression<Func<T, bool>> predicado)
        {
            return await _db.Set<T>().Where(predicado).ToListAsync();
        }

        public async Task<int> ContarTodos()
        {
            return await _db.Set<T>().CountAsync();
        }

        public async Task<int> ContarDonde(Expression<Func<T, bool>> predicado)
        {
            return await _db.Set<T>().Where(predicado).CountAsync();
        }

    }
}