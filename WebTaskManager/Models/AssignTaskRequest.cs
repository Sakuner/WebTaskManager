namespace WebTaskManager.Models
{
    public record AssignTasksRequest(string UserId, List<string> Tasks);
}
