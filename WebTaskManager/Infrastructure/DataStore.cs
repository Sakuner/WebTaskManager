using WebTaskManager.Models;
using WebTaskManager.Utils;

namespace WebTaskManager.Infrastructure
{
    public class DataStore
    {
        public List<User> Users { get; } =
        [
            new("1", "Anna Kowalska", "programista"),
            new("2", "Jan Nowak", "devops"),
            new("3", "Ewa Zielińska", "programista"),
            new("4", "Marek Wójcik", "devops"),
            new("5", "Paweł Lis", "programista")
        ];

        public List<TaskItem> Tasks { get; } = MockTaskGenerator.GenerateTasks();
    }

}
