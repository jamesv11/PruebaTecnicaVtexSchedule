using Infraestructura.Inicializacion.modelos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infraestructura.Inicializacion
{
    public class Start
    {
        private readonly PersistenceContext _context;
        public Start(PersistenceContext context)
        {
            _context = context;
        }

        public void Inicializar()
        {
            if (!_context.Usuario.Any()) UsuarioInicializacion.Inicializar(_context);
        }
    }
}
