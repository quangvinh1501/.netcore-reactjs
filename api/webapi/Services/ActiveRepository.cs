using Microsoft.Extensions.Options;
using System.Collections.Generic;
using webapi.Entities;
using webapi.Helpers;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;
using webapi.Models;

namespace webapi.Services
{
    public interface IActiveRepository
    {
        Task<IEnumerable<ActiveList>> GetActives();
        Task<ActiveList> GetActive(int activeId);
        Task<ActiveList> AddActive(ActiveList active);
        Task<ActiveList> GetActiveByName(string activeName);
        Task<ActiveList> UpdateActive(ActiveList active);
        Task<ActiveList> DeleteActive(int activeId);
    }
    public class ActiveRepository : IActiveRepository
    {
        private readonly AppSettings _appSettings;
        private readonly DBContext _context;
        public ActiveRepository(IOptions<AppSettings> appSettings, DBContext context)
        {
            _appSettings = appSettings.Value;
            _context = context;
        }

        public async Task<ActiveList> GetActiveByName(string activeName)
        {
            return await _context.ActiveList
                .FirstOrDefaultAsync(e => e.Name.Trim() == activeName.Trim());
        }

        public async Task<IEnumerable<ActiveList>> GetActives()
        {
            return await _context.ActiveList.ToListAsync();
        }

        public async Task<ActiveList> GetActive(int activeId)
        {
            return await _context.ActiveList
                .FirstOrDefaultAsync(e => e.Id == activeId);
        }
        public async Task<ActiveList> AddActive(ActiveList active)
        {
            var addactive = new ActiveList
            {
                Name = active.Name.Trim()
            };
            var result = await _context.ActiveList.AddAsync(addactive);
            await _context.SaveChangesAsync();
            return result.Entity;
        }

        public async Task<ActiveList> UpdateActive(ActiveList active)
        {
            var result = await _context.ActiveList
                .FirstOrDefaultAsync(e => e.Id == active.Id);

            if (result != null)
            {
                result.Name = active.Name.Trim();

                await _context.SaveChangesAsync();

                return result;
            }

            return null;
        }
        public async Task<ActiveList> DeleteActive(int activeId)
        {
            var result = await _context.ActiveList
                .FirstOrDefaultAsync(e => e.Id == activeId);
            if (result != null)
            {
                _context.ActiveList.Remove(result);
                await _context.SaveChangesAsync();
                return result;
            }

            return null;
        }
    }
}
