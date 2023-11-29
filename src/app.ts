import { envs } from "./config";
import { AppRoutes } from "./presentation/routes";
import { Server } from "./presentation/server";

(async () => {
  await main();
})();

async function main() {
  const server = new Server({
    port: envs.PORT,
    publicFolder: envs.PUBLIC_PATH,
    routes: AppRoutes.routes,
  });
  await server.start();
}
