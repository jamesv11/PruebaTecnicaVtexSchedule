using Aplicacion.Base.Respuesta;
using Aplicacion.Base.Servicio;
using Aplicacion.Http.Input;
using Aplicacion.Http.Output;
using AutoMapper;
using Dominio.Contrato;
using Dominio.Entidades.ModelosUsuario;
using Dominio.Repositorios.RepositorioUsuario;
using Infraestructura.Autenticacion;
using Infraestructura.Encriptacion;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Net;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace Aplicacion.Servicios.ServicioAutenticacion
{
    public class ServicioAutenticacion : Servicio<Usuario>
    {

        private readonly IRepositorioUsuario _repositorioUsuario;
        private readonly IConfiguration _configuration;

        public ServicioAutenticacion(IUnidadDeTrabajo unidadDeTrabajo, IMapper mapper, IConfiguration configuration) : base(unidadDeTrabajo, mapper)
        {
            _repositorioUsuario = unidadDeTrabajo.RepositorioUsuario;
            _configuration = configuration;
        }
        public async Task<Respuesta<UsuarioLoginOutput>> Login(UsuarioLoginInput usuarioLoginInput)
        {
            try
            {
                return await RealizarAutenticacion(usuarioLoginInput);
            }
            catch (Exception e)
            {
                UnidadDeTrabajo.RollBack();
                return Respuesta<UsuarioLoginOutput>.CrearRespuestaFallida(e, HttpStatusCode.BadRequest,
                   "Credenciales incorrectas");
            }
        }

        private async Task<Respuesta<UsuarioLoginOutput>> RealizarAutenticacion(UsuarioLoginInput usuarioLoginInput)
        {           
            var respuestaUsuario = await ValidarExisteUsuario(usuarioLoginInput);
            if (!respuestaUsuario)
            {
                return Respuesta<UsuarioLoginOutput>.CrearRespuesta(true);
            }


            var respuestaUsuarioCredenciales = await ValidarCredencialesUsuario(usuarioLoginInput);

            if (!respuestaUsuarioCredenciales.Item1)
            {
                return Respuesta<UsuarioLoginOutput>.CrearRespuesta(true);
            }

            var autenticacion = new Auth(_configuration);


            var usuarioLoginOutput = new UsuarioLoginOutput
            {
                Id = respuestaUsuarioCredenciales.usuario.Id,
                UsuarioIdentificacion = respuestaUsuarioCredenciales.usuario.IdentificacionUsuario,
                Nombre = respuestaUsuarioCredenciales.usuario.Nombre,
                Token = autenticacion.GenerateToken(respuestaUsuarioCredenciales.usuario)
                
            };
   
            return Respuesta<UsuarioLoginOutput>.CrearRespuestaExitosa(usuarioLoginOutput, HttpStatusCode.OK,
                "Actividad creada con exito");
        }

        private async Task<bool> ValidarExisteUsuario(UsuarioLoginInput usuarioLoginInput)
        {


            return await _repositorioUsuario.ExisteRegistro(
                p => p.IdentificacionUsuario.Equals(usuarioLoginInput.IdentificacionUsuario)
            );
        }

        private async Task<(bool, Usuario usuario)> ValidarCredencialesUsuario(UsuarioLoginInput usuarioLoginInput)
        {

            var usuarioEncontrado = (await _repositorioUsuario.ObtenerPor(u =>
              u.IdentificacionUsuario.Equals(usuarioLoginInput.IdentificacionUsuario))).First();

            var credencialesCorrectas = (Hash.GetSha256(usuarioLoginInput.Password) == usuarioEncontrado.Password);
            return (credencialesCorrectas, usuarioEncontrado);
            
        }



    }
}
