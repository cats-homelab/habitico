defmodule HabiticoWeb.UserController do
  use HabiticoWeb, :controller

  alias Habitico.Accounts

  action_fallback HabiticoWeb.FallbackController

  def register(conn, params) do
    with {:ok, user} <- Accounts.register_user(params),
         token = Accounts.create_user_api_token(user) do
      render(conn, "register.json", access_token: token, user: user)
    end
  end

  def login(conn, %{"email" => email, "password" => password}) do
    with user <- Accounts.get_user_by_email_and_password(email, password),
         token = Accounts.create_user_api_token(user) do
      render(conn, "login.json", access_token: token, user: user)
    end
  end

  def profile(conn, _params) do
    user = conn.assigns.current_user
    render(conn, "show.json", user: user)
  end
end
