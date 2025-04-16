using WebTaskManager.Models;
using TaskStatus = WebTaskManager.Models.TaskStatus;

namespace WebTaskManager.Utils
{
    public static class MockTaskGenerator
    {
        public static List<TaskItem> GenerateTasks()
        {
            var tasks = new List<TaskItem>();
            var rand = new Random();
            var types = Enum.GetValues<TaskType>();

            for (int i = 0; i < 25; i++)
            {
                var type = types[rand.Next(types.Length)];
                var difficulty = rand.Next(1, 6);

                var task = new TaskItem
                {
                    Title = $"Zadanie {i + 1}",
                    Difficulty = difficulty,
                    Type = type,
                    Status = TaskStatus.DoWykonania,
                    Details = new TaskDetails()
                };

                switch (type)
                {
                    case TaskType.Implementacja:
                        task.Details.Content = "Opis zadania implementacyjnego.";
                        break;
                    case TaskType.Wdrozenie:
                        task.Details.Deadline = DateTime.Now.AddDays(7).ToShortDateString();
                        task.Details.Scope = "Zakres wdrożenia do 400 znaków.";
                        break;
                    case TaskType.Maintanance:
                        task.Details.Deadline = DateTime.Now.AddDays(3).ToShortDateString();
                        task.Details.Services = "Serwisy do obsługi.";
                        task.Details.Servers = "Serwery do obsługi.";
                        break;
                }

                tasks.Add(task);
            }

            return tasks;
        }
    }

}
