using Students.DAL;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Students.DAL.Repo
{
    public class StudentsRepo : Istudent
    {
        private readonly StudentsContext _context;
        public StudentsRepo(StudentsContext context)
        {
            _context = context;
        }
        public String Add(Student student)
        {
            _context.Students.Add(student);
            _context.SaveChanges();
            if(student.ID == "" || student==null) 
            {
                return "No Id";
            }
           
            return student.ID;
        }

        public void Delete(string id)
        {
            if (id == "")
            {
                throw new ArgumentNullException("id");
            }
            else
            {
            var student = _context.Students.FirstOrDefault(x => x.ID == id);
            _context.Students.Remove(student);
            _context.SaveChanges();
            }
        }

        public IEnumerable<Student> GetAll()
        {
            return _context.Students;
        }

        public Student GetById(string id)
        {
            var Student = _context.Students.FirstOrDefault(x => x.ID == id);
            return Student!;
        }

        public void Update(Student student){
            _context.SaveChanges();
        }
    }
}
