namespace WebTaskManager.Models
{
    public class TaskItem
    {
        public string Id { get; set; } = Guid.NewGuid().ToString();
        public string Title { get; set; } = "";
        public int Difficulty { get; set; }
        public TaskType Type { get; set; }
        public TaskStatus Status { get; set; } = TaskStatus.DoWykonania;
        public string? AssignedTo { get; set; } = null;
        public TaskDetails Details { get; set; } = new();
    }
}
