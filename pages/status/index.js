import useSWR from "swr";

async function fetchAPI(key) {
  const response = await fetch(key);
  const responseBody = await response.json();
  return responseBody;
}

export default function StatusPage() {
  return (
    <>
      <h1>Status</h1>
      <UpdatedAt />
    </>
  );
}

function UpdatedAt() {
  const { isLoading, data } = useSWR("/api/v1/status", fetchAPI, {
    refreshInterval: 2000,
  });

  let UpdatedAt = "Carregando...";
  let Database = {
    version: "Carregando...",
    max_connections: "Carregando...",
    opened_connections: "Carregando...",
  };

  if (!isLoading && data) {
    UpdatedAt = new Date(data.updated_at).toLocaleString("pt-BR");
    Database = data.dependencies.database;
  }

  return (
    <>
      <div>Última atualização: {UpdatedAt}</div>
      <p>Versão do banco de dados: {Database.version}</p>
      <p>
        Número máximo de conexões do banco de dados: {Database.max_connections}
      </p>
      <p>Conexões ativas do banco de dados: {Database.opened_connections}</p>
    </>
  );
}
