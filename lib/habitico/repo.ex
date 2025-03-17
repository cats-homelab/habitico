defmodule Habitico.Repo do
  use Ecto.Repo,
    otp_app: :habitico,
    adapter: Ecto.Adapters.Postgres
end
