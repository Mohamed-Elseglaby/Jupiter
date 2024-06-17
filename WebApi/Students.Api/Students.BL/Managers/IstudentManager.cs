using Students.DAL;
using Students.DAL.Repo;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Students.BL;

public interface IstudentManager
{
    IEnumerable<ReadStudentDto> GetAll();
    ReadStudentDto GetById(string id);
    ReadStudentDto Update(ReadStudentDto student);
    string Add(UpdateStudentDto student);
    void Delete(string id);
}
