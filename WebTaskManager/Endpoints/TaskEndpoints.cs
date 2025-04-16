using Microsoft.AspNetCore.Mvc;
using WebTaskManager.Infrastructure;
using WebTaskManager.Models;

namespace WebTaskManager.Endpoints
{
    public static class TaskEndpoints
    {
        public static void MapTaskEndpoints(this WebApplication app)
        {
            app.MapGet("/tasks/available", ([FromServices] DataStore store, int skip = 0, int take = 15) =>
                store.Tasks
                    .Where(t => t.AssignedTo is null)
                    .OrderByDescending(t => t.Difficulty)
                    .Skip(skip)
                    .Take(take));

            app.MapGet("/tasks/assigned/{userId}", ([FromServices] DataStore store, string userId) =>
                store.Tasks
                    .Where(t => t.AssignedTo == userId)
                    .OrderByDescending(t => t.Difficulty)
                    .Take(10));

            app.MapPost("/tasks/assign", ([FromServices] DataStore store, AssignTasksRequest request) =>
            {
                var user = store.Users.FirstOrDefault(u => u.Id == request.UserId);
                if (user is null)
                    return Results.BadRequest("User not found");

                if (request.Tasks.Count > 10)
                    return Results.BadRequest("Max 10 tasks can be assigned at once");

                var tasksToAssign = store.Tasks.Where(t => request.Tasks.Contains(t.Id)).ToList();

                if (tasksToAssign.Any(t => t.AssignedTo is not null))
                    return Results.BadRequest("One or more tasks are already assigned");

                // Role based validation
                if (user.Role == "programista" && tasksToAssign.Any(t => t.Type != TaskType.Implementacja))
                    return Results.BadRequest("Programista can only be assigned Implementacja tasks");

                // Difficulty validation
                int totalTasks = store.Tasks.Count(t => t.AssignedTo == user.Id) + tasksToAssign.Count;
                int hardTasks = store.Tasks.Count(t => t.AssignedTo == user.Id && t.Difficulty >= 4) + tasksToAssign.Count(t => t.Difficulty >= 4);
                int easyTasks = store.Tasks.Count(t => t.AssignedTo == user.Id && t.Difficulty <= 2) + tasksToAssign.Count(t => t.Difficulty <= 2);

                if (totalTasks > 11 || totalTasks < 5)
                    return Results.BadRequest("User must have between 5 and 11 tasks assigned");

                double hardPercentage = totalTasks == 0 ? 0 : (double)hardTasks / totalTasks;
                double easyPercentage = totalTasks == 0 ? 0 : (double)easyTasks / totalTasks;

                if (hardPercentage < 0.1 || hardPercentage > 0.3)
                    return Results.BadRequest("User must have between 10% and 30% hard tasks");

                if (easyPercentage > 0.5)
                    return Results.BadRequest("User can't have more than 50% easy tasks");

                foreach (var task in tasksToAssign)
                {
                    task.AssignedTo = request.UserId;
                }

                return Results.Ok();
            });
        }
    }
}
