using Microsoft.EntityFrameworkCore.Migrations;

namespace MYM.Api.Migrations
{
    public partial class amountToDouble : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<double>(
                name: "Amount",
                table: "Bills",
                nullable: false,
                oldClrType: typeof(int));
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<int>(
                name: "Amount",
                table: "Bills",
                nullable: false,
                oldClrType: typeof(double));
        }
    }
}
