using Microsoft.EntityFrameworkCore.Migrations;

namespace MYM.Api.Migrations
{
    public partial class bill : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Bills_Categories_CategoryId",
                table: "Bills");

            migrationBuilder.DropIndex(
                name: "IX_Bills_CategoryId",
                table: "Bills");

            migrationBuilder.RenameColumn(
                name: "CategoryId",
                table: "Bills",
                newName: "CatId");

            migrationBuilder.AddColumn<string>(
                name: "Category",
                table: "Bills",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Category",
                table: "Bills");

            migrationBuilder.RenameColumn(
                name: "CatId",
                table: "Bills",
                newName: "CategoryId");

            migrationBuilder.CreateIndex(
                name: "IX_Bills_CategoryId",
                table: "Bills",
                column: "CategoryId");

            migrationBuilder.AddForeignKey(
                name: "FK_Bills_Categories_CategoryId",
                table: "Bills",
                column: "CategoryId",
                principalTable: "Categories",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
