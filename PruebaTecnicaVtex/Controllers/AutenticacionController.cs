using Aplicacion.Base.Respuesta;
using Aplicacion.Http.Input;
using Aplicacion.Http.Output;
using Aplicacion.Servicios.ServicioAutenticacion;
using AutoMapper;
using Dominio.Contrato;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace PruebaTecnicaVtex.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class AutenticacionController : ControllerBase
    {

        private readonly ServicioAutenticacion _servicioAutenticacion;

        public AutenticacionController(IUnidadDeTrabajo unidadDeTrabajo, IMapper mapper, IConfiguration configuration)
        {
            _servicioAutenticacion = new ServicioAutenticacion(unidadDeTrabajo, mapper, configuration);
        }

        // POST api/<AutenticacionController>
        [AllowAnonymous]
        [HttpPost]
        public async Task<ActionResult<dynamic>> Login([FromBody] UsuarioLoginInput request)
        {
            var respuesta = await _servicioAutenticacion.Login(request);
            return StatusCode((int)respuesta.Codigo, respuesta.Datos);
        }

  
    }
}
