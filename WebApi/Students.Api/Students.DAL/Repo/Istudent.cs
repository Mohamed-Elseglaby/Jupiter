using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Students.DAL.Repo
{
    public interface Istudent
    {
        IEnumerable<Student> GetAll();
        Student GetById(string id);
        void Update(Student student);
        String Add(Student student);
        void Delete(string id);

    }
}
