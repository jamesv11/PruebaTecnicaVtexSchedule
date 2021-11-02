using Aplicacion.Http.Input;
using Aplicacion.Http.Output;
using AutoMapper;
using Dominio.Entidades.ModelosUsuario;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Aplicacion.Servicios.Mapping
{
    public class UsuarioMapping:Profile
    {
        public UsuarioMapping()
        {
            CreateMap<UsuarioInput, Usuario>();
            CreateMap<Usuario, UsuarioOutput>();
        }

    }
}
