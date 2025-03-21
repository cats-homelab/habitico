defmodule HabiticoWeb.UserJSON do
  alias Habitico.Accounts.User

  def register(%{access_token: access_token, user: user}) do
    %{access_token: access_token, data: data(user)}
  end

  def login(%{access_token: access_token, user: user}) do
    %{access_token: access_token, data: data(user)}
  end

  def show(%{user: user}) do
    %{data: data(user)}
  end

  defp data(%User{} = user) do
    %{
      id: user.id,
      name: user.name,
      email: user.email
    }
  end
end
