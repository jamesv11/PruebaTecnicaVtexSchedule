using Aplicacion.Base.Respuesta;
using Aplicacion.Http.Input;
using Aplicacion.Http.Output;
using Aplicacion.Servicios.ServicioActividad;
using AutoMapper;
using Dominio.Contrato;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PruebaTecnicaVtex.Controllers
{

    [Produces("application/json")]
    [Route("api/[controller]")]
    [ApiController]
    [Authorize(AuthenticationSchemes = Microsoft.AspNetCore.Authentication.JwtBearer.JwtBearerDefaults.AuthenticationScheme)]
    public class ActividadController : ControllerBase
    {

        private readonly ServicioActividad _servicioActividad;

        public ActividadController(IUnidadDeTrabajo unidadDeTrabajo, IMapper mapper)
        {
            _servicioActividad = new ServicioActividad(unidadDeTrabajo, mapper);
        }

        // POST: ActividadController/Create
        
        [HttpPost]    
        public async Task<ActionResult<dynamic>> Create([FromBody] ActividadInput request)
        {
            var respuesta = await _servicioActividad.Crear(request);
            return StatusCode((int)respuesta.Codigo, respuesta);
        }

        [HttpPatch("{id}/{estadoActividad}")]
        public async Task<ActionResult<dynamic>> UpdateState(string estadoActividad, Guid id)
        {
            var respuesta = await _servicioActividad.ActualizarEstado(estadoActividad, id);
            return StatusCode((int)respuesta.Codigo, respuesta); 
        }

        [HttpGet("{idUsuario}")]
        public async Task<ActionResult<dynamic>> GetActivities(int idUsuario)
        {
            var respuesta = await _servicioActividad.ConsultarActividades(idUsuario);
            return StatusCode((int)respuesta.Codigo, respuesta);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<dynamic>> DeleteActivity(Guid id)
        {
            var respuesta = await _servicioActividad.EliminarActividad(id);
            return StatusCode((int)respuesta.Codigo, respuesta);
        }


    }
}
