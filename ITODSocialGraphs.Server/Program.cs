
using ITODSocialGraphs.Server.Services;
using ITODSocialGraphs.Server.Services.Interfaces;
using Serilog;

namespace ITODSocialGraphs.Server
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            builder.Services.AddTransient<IGraphService, GraphService>();

            // Додаємо сервіс контролерів
            builder.Services.AddControllers();

            // Налаштовуємо Swagger
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();

            // Налаштовуємо Serilog для логування
            Log.Logger = new LoggerConfiguration()
                .WriteTo.Console()
                .CreateLogger();
            builder.Host.UseSerilog();

            builder.Services.AddCors(options =>
            {
                options.AddPolicy("AllowCors", policy =>
                {
                    policy
                        .WithOrigins("*") // або "*" для тимчасового дозволу всіх
                        .AllowAnyHeader()
                        .AllowAnyMethod();
                });
            });


            var app = builder.Build();

            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            app.UseCors("AllowCors");
            app.UseRouting();
            app.UseAuthorization();
            app.MapControllers();

            app.Run();
        }
    }
}
