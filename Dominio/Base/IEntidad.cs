using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Dominio.Base
{
    public interface IEntidad<T>
    {
        T Id { get; set; }
    }
}
