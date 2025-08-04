import useSWR from "swr";

async function fetchAPI(key) {
  const response = await fetch(key);
  const responseBody = await response.json();
  return responseBody;
}

export default function StatusPage() {
  return (
    <>
      <h1 id="status">Status</h1>
      <UpdatedAt />
      <DatabaseStatus />
    </>
  );
}

function UpdatedAt() {
  const { isLoading, data } = useSWR("/api/v1/status", fetchAPI, {
    refreshInterval: 2000,
  });

  let loadingText = "Carregando...";
  let UpdatedAt = loadingText;

  if (!isLoading && data) {
    UpdatedAt = new Date(data.updated_at).toLocaleString("pt-BR");
  }

  return (
    <>
      <div>Última atualização: {UpdatedAt}</div>
    </>
  );
}

function DatabaseStatus() {
  const { isLoading, data } = useSWR("/api/v1/status", fetchAPI, {
    refreshInterval: 2000,
  });
  let loadingText = "Carregando...";
  let databaseStatusInformation = loadingText;

  if (!isLoading && data) {
    databaseStatusInformation = (
      <>
        <p>Versão do banco de dados: {data.dependencies.database.version}</p>
        <p>
          Número máximo de conexões do banco de dados:{" "}
          {data.dependencies.database.max_connections}
        </p>
        <p>
          Conexões ativas do banco de dados:{" "}
          {data.dependencies.database.opened_connections}
        </p>
      </>
    );
  }
  return (
    <>
      <h2>Database</h2>
      <div>{databaseStatusInformation}</div>
    </>
  );
}
