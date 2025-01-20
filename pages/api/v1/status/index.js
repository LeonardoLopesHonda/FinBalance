import database from "../../../../infra/database.js";

async function status(request, response) {
  const result = await database.query('SELECT 1 + 1;');

  console.log(result);

  response.status(200).json({
      field_1: "Testing 1",
      field_2: {
        sub_field: "subfield content são",
      },
  });
}

export default status;