using Dominio.Entidades.ModelosUsuario;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infraestructura.Inicializacion.modelos
{
    public class UsuarioInicializacion
    {
        public static void Inicializar(PersistenceContext persistenceContext)
        {
            var usuario = new Usuario()
            {
                Nombre = "James Vanstrahlen",
                IdentificacionUsuario = "1234567",
                Password = "qwerty123",               
            };

            persistenceContext.Usuario.Add(usuario);
            persistenceContext.SaveChanges();
        }
    }
}
