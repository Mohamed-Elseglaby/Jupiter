using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Students.DAL;
public class Student
{
    public string? ID { get; set; }
    public string? Name { get; set; }
    public string? year { get; set; }
    public string? Grade { get; set; }

}
