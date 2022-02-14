using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading.Tasks;
using webapi.Services;
using webapi.Models;
using Microsoft.AspNetCore.Authorization;

namespace webapi.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class MenusController : ControllerBase
    {
        private readonly IMenuRepository MenuRepository;

        public MenusController(IMenuRepository MenuRepository)
        {
            this.MenuRepository = MenuRepository;
        }
        //http://localhost:5000/api/Menu/GetMenus
        [HttpGet("GetMenus")]
        public async Task<ActionResult> GetMenus()
        {
            try
            {
                return Ok(await MenuRepository.GetMenus());
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError,
                    "Error retrieving data from the database");
            }
        }
        //http://localhost:5000/api/Menu/GetMenus/{id}
        [HttpGet("GetMenu/{id}")]
        public async Task<ActionResult<MenuList>> GetMenu(int id)
        {
            try
            {
                var result = await MenuRepository.GetMenu(id);

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
        //http://localhost:5000/api/Menu/CreateMenu
        [HttpPost("CreateMenu")]
        public async Task<ActionResult<MenuList>> CreateMenu(MenuList menu)
        {
            try
            {
                if (menu == null)
                {
                    return BadRequest();
                }

                var name = await MenuRepository.GetMenuByName(menu.Name, menu.Position);

                if (name != null)
                {
                    ModelState.AddModelError("name", "name already in use");
                    return BadRequest(ModelState);
                }

                var createdMenu = await MenuRepository.AddMenu(menu);

                return CreatedAtAction(nameof(GetMenu), new { id = createdMenu.Id },
                    createdMenu);
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError,
                    "Error creating Menu");
            }
        }

        //http://localhost:5000/api/Menu/UpdateMenu/{id}
        [HttpPut("UpdateMenu/{id}")]
        public async Task<ActionResult<MenuList>> UpdateMenu(int id, MenuList menu)
        {
            try
            {
                if (id != menu.Id)
                    return BadRequest("Menu ID mismatch");

                var MenuToUpdate = await MenuRepository.GetMenu(id);

                if (MenuToUpdate == null)
                    return NotFound($"Menu with Id = {id} not found");

                return await MenuRepository.UpdateMenu(menu);
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError,
                    "Error updating data");
            }
        }
        [HttpPut("HideShowMenu/{id}")]
        public async Task<ActionResult<MenuList>> HideShowMenu(int id, MenuList menu)
        {
            try
            {
                if (id != menu.Id)
                    return BadRequest("Menu ID mismatch");

                var MenuToHideShow = await MenuRepository.GetMenu(id);

                if (MenuToHideShow == null)
                    return NotFound($"Menu with Id = {id} not found");

                return await MenuRepository.HideShowMenu(menu);
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError,
                    "Error updating data");
            }
        }
        //http://localhost:5000/api/Menu/DeleteMenu/{id}
        [HttpDelete("DeleteMenu/{id}")]
        public async Task<ActionResult<MenuList>> DeleteMenu(int id)
        {
            try
            {
                var MenuToDelete = await MenuRepository.GetMenu(id);

                if (MenuToDelete == null)
                {
                    return NotFound($"Menu with Id = {id} not found");
                }

                return await MenuRepository.DeleteMenu(id);
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError,
                    "Error deleting data");
            }
        }
    }
}
