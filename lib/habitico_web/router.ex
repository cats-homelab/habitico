defmodule HabiticoWeb.Router do
  use HabiticoWeb, :router
  import HabiticoWeb.UserAuth

  pipeline :api do
    plug :accepts, ["json"]
  end

  pipeline :api_auth do
    plug :accepts, ["json"]
    plug :fetch_api_user
  end

  scope "/api", HabiticoWeb do
    pipe_through :api_auth
    get "/users/profile", UserController, :profile, as: :profile
  end

  scope "/api", HabiticoWeb do
    pipe_through :api
    post "/login", UserController, :login, as: :login
    post "/register", UserController, :register, as: :register
  end

  # Enable LiveDashboard in development
  if Application.compile_env(:habitico, :dev_routes) do
    # If you want to use the LiveDashboard in production, you should put
    # it behind authentication and allow only admins to access it.
    # If your application does not have an admins-only section yet,
    # you can use Plug.BasicAuth to set up some basic authentication
    # as long as you are also using SSL (which you should anyway).
    import Phoenix.LiveDashboard.Router

    scope "/dev" do
      pipe_through [:fetch_session, :protect_from_forgery]

      live_dashboard "/dashboard", metrics: HabiticoWeb.Telemetry
    end
  end
end
