using AutoMapper;
using Dominio.Base;
using Dominio.Contrato;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Aplicacion.Base.Servicio
{
    public abstract class Servicio<T> : BaseServicio,IServicio<T>
    {
        protected readonly IUnidadDeTrabajo UnidadDeTrabajo;
        protected IMapper Mapper;
        protected Servicio(IUnidadDeTrabajo unidadDeTrabajo, IMapper mapper)
        {
            UnidadDeTrabajo = unidadDeTrabajo;
            Mapper = mapper;
        }
    }
    public class BaseServicio
    {

    }
}
