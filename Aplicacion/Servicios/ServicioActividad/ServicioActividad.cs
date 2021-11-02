using Aplicacion.Base.Respuesta;
using Aplicacion.Base.Servicio;
using Aplicacion.Http.Input;
using Aplicacion.Http.Output;
using AutoMapper;
using Dominio.Contrato;
using Dominio.Entidades.ModeloActividad;
using Dominio.Entidades.ModelosUsuario;
using Dominio.Repositorios.RepositoriosActividad;
using Dominio.Repositorios.RepositorioUsuario;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;

namespace Aplicacion.Servicios.ServicioActividad
{
    public class ServicioActividad : Servicio<Actividad>
    {
        private readonly IRepositorioActividad _repositorioActividad;
        private readonly IRepositorioUsuario _repositorioUsuario;

        public ServicioActividad(IUnidadDeTrabajo unidadDeTrabajo, IMapper mapper) : base(unidadDeTrabajo, mapper)
        {
            _repositorioActividad = unidadDeTrabajo.RepositorioActividad;
            _repositorioUsuario = unidadDeTrabajo.RepositorioUsuario;
        }

        public async Task<Respuesta<ActividadOutput>> Crear(ActividadInput actividadInput)
        {
            try
            {
                return await RealizarRegistro(actividadInput);
            }
            catch (Exception e)
            {
                UnidadDeTrabajo.RollBack();
                return Respuesta<ActividadOutput>.CrearRespuestaFallida(e, HttpStatusCode.BadRequest,
                   "Ha sucedido un error al crear la actividad");
            }
        }

        private async Task<Respuesta<ActividadOutput>> RealizarRegistro(ActividadInput actividadInput)
        {
         
            var respuestaUsuario = await ValidarExisteUsuario(actividadInput.IdentificacionUsuario);

            if (!respuestaUsuario)
            {
                return Respuesta<ActividadOutput>.CrearRespuesta(true);
            }

            var usuarioEncontrado = (await _repositorioUsuario.ObtenerPor(u =>
                 u.IdentificacionUsuario.Equals(actividadInput.IdentificacionUsuario))).First();


            var actividad = usuarioEncontrado.CrearActividad(actividadInput.Titulo, actividadInput.Descripcion);
           
            await _repositorioActividad.Agregar(actividad);
            var actividadOutput = Mapper.Map<ActividadOutput>(actividad);
            return Respuesta<ActividadOutput>.CrearRespuestaExitosa(actividadOutput, HttpStatusCode.OK,
                "Actividad creada con exito");
        }
        public async Task<Respuesta<ActividadOutput>> ActualizarEstado(string estado, Guid id)
        {
            try
            {
                return await RealizarActualizacionEstado(estado,id);
            }
            catch (Exception e)
            {
                UnidadDeTrabajo.RollBack();
                return Respuesta<ActividadOutput>.CrearRespuestaFallida(e, HttpStatusCode.BadRequest,
                   "Ha sucedido un error al crear la actividad");
            }
        }

        private async Task<Respuesta<ActividadOutput>> RealizarActualizacionEstado(string estado, Guid id)
        {

            var existeActividad = (await _repositorioActividad.ExisteRegistro(u =>
                u.Id.Equals(id)));


            if (!existeActividad)
                return Respuesta<ActividadOutput>.CrearRespuesta(true);

            var actividadEncontrada = (await _repositorioActividad.ObtenerPor(u =>
                 u.Id.Equals(id))).First();


            actividadEncontrada.Estado = estado;

            await _repositorioActividad.Editar(actividadEncontrada);
            var actividadOutput = Mapper.Map<ActividadOutput>(actividadEncontrada);
            return Respuesta<ActividadOutput>.CrearRespuestaExitosa(actividadOutput, HttpStatusCode.OK,
                "Estado actividad actualizado con exito");
        }

        public async Task<Respuesta<List<ActividadOutput>>> ConsultarActividades(int idUsuario)
        {
            try
            {
                return await RealizarConsultaActividades(idUsuario);
            }
            catch (Exception e)
            {
                UnidadDeTrabajo.RollBack();
                return Respuesta<List<ActividadOutput>>.CrearRespuestaFallida(e, HttpStatusCode.BadRequest,
                   "Ha sucedido un error al consultar actividades");
            }
        }

        private async Task<Respuesta<List<ActividadOutput>>> RealizarConsultaActividades(int idUsuario)
        {

            var actividadesEncontradas = (await _repositorioActividad.ObtenerPor(u =>
                 u.Usuario.Id.Equals(idUsuario)));

           
            var actividadesOutput = Mapper.Map<List<ActividadOutput>>(actividadesEncontradas);
            return Respuesta<List<ActividadOutput>>.CrearRespuestaExitosa(actividadesOutput, HttpStatusCode.OK,
                "Estado actividad actualizado con exito");
        }

        private async Task<bool> ValidarExisteUsuario(string identificacionUsuario)
        {


            return await _repositorioUsuario.ExisteRegistro(
                p => p.IdentificacionUsuario.Equals(identificacionUsuario)
            );



        }

    }
}
