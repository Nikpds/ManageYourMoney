namespace MYM.Api.Models
{
    public class Category
    {
        public int Id { get; set; }
        public string Description { get; set; }

        public string UserId { get; set; }
        public User User { get; set; }
    }
}