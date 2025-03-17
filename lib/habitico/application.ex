defmodule Habitico.Application do
  # See https://hexdocs.pm/elixir/Application.html
  # for more information on OTP Applications
  @moduledoc false

  use Application

  @impl true
  def start(_type, _args) do
    children = [
      HabiticoWeb.Telemetry,
      Habitico.Repo,
      {DNSCluster, query: Application.get_env(:habitico, :dns_cluster_query) || :ignore},
      {Phoenix.PubSub, name: Habitico.PubSub},
      # Start a worker by calling: Habitico.Worker.start_link(arg)
      # {Habitico.Worker, arg},
      # Start to serve requests, typically the last entry
      HabiticoWeb.Endpoint
    ]

    # See https://hexdocs.pm/elixir/Supervisor.html
    # for other strategies and supported options
    opts = [strategy: :one_for_one, name: Habitico.Supervisor]
    Supervisor.start_link(children, opts)
  end

  # Tell Phoenix to update the endpoint configuration
  # whenever the application is updated.
  @impl true
  def config_change(changed, _new, removed) do
    HabiticoWeb.Endpoint.config_change(changed, removed)
    :ok
  end
end
