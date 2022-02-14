using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading.Tasks;
using webapi.Models;
using webapi.Services;

namespace webapi.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class ActivesController : ControllerBase
    {
        private readonly IActiveRepository ActiveRepository;

        public ActivesController(IActiveRepository ActiveRepository)
        {
            this.ActiveRepository = ActiveRepository;
        }
        //http://localhost:5000/api/Actives/GetActives
        [HttpGet("GetActives")]
        public async Task<ActionResult> GetActives()
        {
            try
            {
                return Ok(await ActiveRepository.GetActives());
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError,
                    "Error retrieving data from the database");
            }
        }
        //http://localhost:5000/api/Actives/GetActives/{id}
        [HttpGet("GetActives/{id:int}")]
        public async Task<ActionResult<ActiveList>> GetActive(int id)
        {
            try
            {
                var result = await ActiveRepository.GetActive(id);

                if (result == null)
                {
                    return NotFound();
                }

                return result;
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError,
                    "Error retrieving data from the database");
            }
        }
        //http://localhost:5000/api/Actives/CreateActive
        [HttpPost("CreateActive")]
        public async Task<ActionResult<ActiveList>> CreateActive(ActiveList active)
        {
            try
            {
                if (active == null)
                {
                    return BadRequest();
                }

                var name = await ActiveRepository.GetActiveByName(active.Name);

                if (name != null)
                {
                    ModelState.AddModelError("name", "name already in use");
                    return BadRequest(ModelState);
                }

                var createdActive = await ActiveRepository.AddActive(active);

                return CreatedAtAction(nameof(GetActive), new { id = createdActive.Id },
                    createdActive);
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError,
                    "Error creating Active");
            }
        }

        //http://localhost:5000/api/Actives/UpdateActive/{id}
        [HttpPut("UpdateActive/{id:int}")]
        public async Task<ActionResult<ActiveList>> UpdateActive(int id, ActiveList active)
        {
            try
            {
                if (id != active.Id)
                    return BadRequest("Active ID mismatch");

                var ActiveToUpdate = await ActiveRepository.GetActive(id);

                if (ActiveToUpdate == null)
                    return NotFound($"Active with Id = {id} not found");

                return await ActiveRepository.UpdateActive(active);
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError,
                    "Error updating data");
            }
        }

        //http://localhost:5000/api/Actives/DeleteActive/{id}
        [HttpDelete("DeleteActive/{id:int}")]
        public async Task<ActionResult<ActiveList>> DeleteActive(int id)
        {
            try
            {
                var ActiveToDelete = await ActiveRepository.GetActive(id);

                if (ActiveToDelete == null)
                {
                    return NotFound($"Active with Id = {id} not found");
                }

                return await ActiveRepository.DeleteActive(id);
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError,
                    "Error deleting data");
            }
        }
    }
}
