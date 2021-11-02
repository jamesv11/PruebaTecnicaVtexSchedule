using Aplicacion.Base.Respuesta;
using Aplicacion.Http.Input;
using Aplicacion.Http.Output;
using Aplicacion.Servicios.ServicioUsuario;
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
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class UsuarioController : ControllerBase
    {
        private readonly ServicioUsuario _servicioUsuario;

        public UsuarioController(IUnidadDeTrabajo unidadDeTrabajo, IMapper mapper)
        {
            _servicioUsuario = new ServicioUsuario(unidadDeTrabajo, mapper);
        }

        // POST: UsuarioController/Create
        [AllowAnonymous]
        [HttpPost]
    
        public async Task<ActionResult<dynamic>> Create([FromBody] UsuarioInput request)
        {
            var respuesta = await _servicioUsuario.Crear(request);
            return ObtenerRespuesta(respuesta);
        }
        private ActionResult<dynamic> ObtenerRespuesta(Respuesta<UsuarioOutput> respuesta)
        {
            if (!respuesta.Error)
            {
                return StatusCode((int)respuesta.Codigo, respuesta.Datos);
            }

            var mensaje = new
            {
                Mensaje = respuesta.Mensaje
            };
            return StatusCode((int)respuesta.Codigo, mensaje);
        }

     
        



    }
}
