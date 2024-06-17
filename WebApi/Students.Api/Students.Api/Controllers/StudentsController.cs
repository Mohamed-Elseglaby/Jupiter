using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Students.BL;

namespace Students.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StudentsController : ControllerBase
    {
        private readonly IstudentManager _studentManager;
        public StudentsController(IstudentManager istudent) { 
        _studentManager = istudent;
        }

        [HttpGet]
        public ActionResult<List<ReadStudentDto>> GetAll() {
            return _studentManager.GetAll().ToList();
        }
        [HttpGet]
        [Route("{id}")]
        public ActionResult<ReadStudentDto> GetById(string id)
        {
            return _studentManager.GetById(id);
        }
        [HttpPost]
        public IActionResult Add(UpdateStudentDto dto)
        {
            string id = _studentManager.Add(dto);
            return Ok(id);
        }
        [HttpPut]
        [Route("{id}")]
        public IActionResult Update(string id,UpdateStudentDto dto)
        {
            var std =_studentManager.GetById(id);
            ReadStudentDto update = new ReadStudentDto
            {
                ID = id,
                Name = dto.Name,
                year = dto.year,
                Grade = dto.Grade,
            };
             return Ok(_studentManager.Update(update));
        }
        [HttpDelete]
        [Route("{id}")]
        public IActionResult Delete(string id)
        {
            _studentManager.Delete(id);
            return Ok();
        }
    }
}
