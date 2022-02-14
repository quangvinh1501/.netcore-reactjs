using Microsoft.Extensions.Options;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;
using System.Linq;
using webapi.Models;
using webapi.Entities;
using webapi.Helpers;

namespace webapi.Services
{
    public interface IMenuRepository
    {
        Task<IEnumerable<MenuList>> GetMenus();
        Task<MenuList> GetMenu(int menuId);
        Task<MenuList> AddMenu(MenuList menu);
        Task<MenuList> GetMenuByName(string menuName, string menuPosition);
        Task<MenuList> UpdateMenu(MenuList menu);
        Task<MenuList> HideShowMenu(MenuList menu);
        Task<MenuList> DeleteMenu(int menuId);
    }
    public class MenuRepository : IMenuRepository
    {
        private readonly AppSettings _appSettings;
        private readonly DBContext _context;
        public MenuRepository(IOptions<AppSettings> appSettings, DBContext context)
        {
            _appSettings = appSettings.Value;
            _context = context;
        }

        public async Task<MenuList> GetMenuByName(string menuName, string menuPosition)
        {
            return await _context.MenuList
                .FirstOrDefaultAsync(e => e.Name.Trim() == menuName.Trim() && e.Position.Trim() == menuPosition.Trim());
        }

        public async Task<IEnumerable<MenuList>> GetMenus()
        {
            // return await _context.Menus.OrderBy(a=>a.Id).ToListAsync();
            return await _context.MenuList.OrderByDescending(a => a.Id).ToListAsync();
        }

        public async Task<MenuList> GetMenu(int menuId)
        {
            return await _context.MenuList
                .FirstOrDefaultAsync(e => e.Id == menuId);
        }
        public async Task<MenuList> AddMenu(MenuList menu)
        {
            var addMenu = new MenuList
            {
                Name = menu.Name.Trim(),
                Link = menu.Link.Trim(),
                Target = menu.Target.Trim(),
                Active = menu.Active.Trim(),
                Position = menu.Position.Trim(),
                Icon = menu.Icon.Trim()
            };
            var result = await _context.MenuList.AddAsync(addMenu);
            await _context.SaveChangesAsync();
            return result.Entity;
        }

        public async Task<MenuList> UpdateMenu(MenuList menu)
        {
            var result = await _context.MenuList
                .FirstOrDefaultAsync(e => e.Id == menu.Id);

            if (result != null)
            {
                result.Name = menu.Name.Trim();
                result.Link = menu.Link.Trim();
                result.Target = menu.Target.Trim();
                result.Active = menu.Active.Trim();
                result.Position = menu.Position.Trim();
                result.Icon = menu.Icon.Trim();

                await _context.SaveChangesAsync();

                return result;
            }

            return null;
        }
        public async Task<MenuList> HideShowMenu(MenuList menu)
        {
            var result = await _context.MenuList
                .FirstOrDefaultAsync(e => e.Id == menu.Id);

            if (result != null)
            {
                if (menu.Active == "yes")
                {
                    result.Active = "no";
                }
                else
                {
                    result.Active = "yes";
                }


                await _context.SaveChangesAsync();

                return result;
            }

            return null;
        }
        public async Task<MenuList> DeleteMenu(int menuId)
        {
            var result = await _context.MenuList
                .FirstOrDefaultAsync(e => e.Id == menuId);
            if (result != null)
            {
                _context.MenuList.Remove(result);
                await _context.SaveChangesAsync();
                return result;
            }

            return null;
        }
    }
}
