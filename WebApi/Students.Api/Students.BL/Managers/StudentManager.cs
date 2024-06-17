using Students.DAL;
using Students.DAL.Repo;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Students.BL;

public class StudentManager : IstudentManager
{
    private readonly Istudent _Istudent;
    public StudentManager(Istudent istudent)
    {
        _Istudent = istudent;
    }
    public string Add(UpdateStudentDto student)
    {
        Student soso =new Student { 
            ID = Guid.NewGuid().ToString(),
            Name = student.Name,
            year = student.year,
            Grade = student.Grade,
        };
        return _Istudent.Add(soso);
    }

    public void Delete(string id)
    {
        _Istudent.Delete(id);
    }

    public IEnumerable<ReadStudentDto> GetAll()
    {
        IEnumerable<Student> students = _Istudent.GetAll();
        IEnumerable<ReadStudentDto> stds = students.Select(student => new ReadStudentDto
        {
            ID = student.ID,
            Name = student.Name,
            year= student.year,
            Grade = student.Grade,
        });
        return stds;
    }

    public ReadStudentDto GetById(string id)
    {
       
       Student soso=  _Istudent.GetById(id);
        if (soso == null)
        {
            return new ReadStudentDto();
        }
        ReadStudentDto sosoRead = new ReadStudentDto
        {
            ID = soso.ID,
            Name = soso.Name,
            year = soso.year,
            Grade = soso.Grade,
        };
       return sosoRead;
    }

    public ReadStudentDto Update(ReadStudentDto student)
    {
        Student std = _Istudent.GetById(student.ID);
        std.Name = student.Name;
        std.year = student.year;
        std.Grade = student.Grade;
        _Istudent.Update(std);
        ReadStudentDto updatedstd = new ReadStudentDto
        {
            ID = std.ID,
            Name = std.Name,
            year = std.year,
            Grade = std.Grade,
        };
        return updatedstd;
    }
}
