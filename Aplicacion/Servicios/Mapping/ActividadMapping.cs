using Aplicacion.Http.Input;
using Aplicacion.Http.Output;
using AutoMapper;
using Dominio.Entidades.ModeloActividad;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Aplicacion.Servicios.Mapping
{
    public class ActividadMapping: Profile
    {
        public ActividadMapping()
        {
            CreateMap<ActividadInput, Actividad>();
            CreateMap<Actividad, ActividadOutput>();

        }
    }
}
