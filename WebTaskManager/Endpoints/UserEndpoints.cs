using WebTaskManager.Infrastructure;

namespace WebTaskManager.Endpoints
{
    public static class UserEndpoints
    {
        public static void MapUserEndpoints(this WebApplication app)
        {
            app.MapGet("/users", (DataStore store) => store.Users);
        }
    }
}
