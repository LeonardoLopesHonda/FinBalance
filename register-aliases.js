const moduleAlias = require("module-alias");
const path = require("path");

moduleAlias.addAliases({
  infra: path.resolve(__dirname, "infra"),
  models: path.resolve(__dirname, "models"),
  tests: path.resolve(__dirname, "tests"),
});
