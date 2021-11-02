using Aplicacion.Base.Respuesta;
using Aplicacion.Base.Servicio;
using Aplicacion.Http.Input;
using Aplicacion.Http.Output;
using AutoMapper;
using Dominio.Contrato;
using Dominio.Entidades.ModelosUsuario;
using Dominio.Repositorios.RepositorioUsuario;
using Infraestructura.Encriptacion;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;

namespace Aplicacion.Servicios.ServicioUsuario
{
    public class ServicioUsuario : Servicio<Usuario>
    {

        private readonly IRepositorioUsuario _repositorioUsuario;

        public ServicioUsuario(IUnidadDeTrabajo unidadDeTrabajo, IMapper mapper) : base(unidadDeTrabajo, mapper)
        {
            _repositorioUsuario = unidadDeTrabajo.RepositorioUsuario;
            
        }

        public async Task<Respuesta<UsuarioOutput>> Crear(UsuarioInput usuarioInput)
        {
            try
            {
                return await RealizarRegistro(usuarioInput);
            }
            catch (Exception e)
            {
                UnidadDeTrabajo.RollBack();
                return Respuesta<UsuarioOutput>.CrearRespuestaFallida(e, HttpStatusCode.BadRequest,
                   "Ha sucedido un error al crear el usuario");
            }
        }


        private async Task<Respuesta<UsuarioOutput>> RealizarRegistro(UsuarioInput usuarioInput)
        {

            var respuestaUsuario = await ValidarExisteUsuario(usuarioInput);

            if (respuestaUsuario)
            {
                return Respuesta<UsuarioOutput>.CrearRespuesta(true);
            }

            var usuario = new Usuario
            {
                IdentificacionUsuario = usuarioInput.IdentificacionUsuario,
                Nombre = usuarioInput.Nombre,
                Password = Hash.GetSha256(usuarioInput.Password)
            };

            await _repositorioUsuario.Agregar(usuario);
            var usuarioOutput = Mapper.Map<UsuarioOutput>(usuario);
            return Respuesta<UsuarioOutput>.CrearRespuestaExitosa(usuarioOutput, HttpStatusCode.OK,
                "Actividad creada con exito");
        }

        private async Task<bool> ValidarExisteUsuario(UsuarioInput usuarioInput)
        {
            return await _repositorioUsuario.ExisteRegistro(
                p => p.IdentificacionUsuario.Equals(usuarioInput.IdentificacionUsuario)
            );
        }

    }
}
