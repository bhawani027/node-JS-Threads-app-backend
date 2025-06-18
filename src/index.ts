import express from "express"; 
import createApolloGraphqlServer from "./graphql";

import { expressMiddleware } from '@as-integrations/express5';


import { prismaClient } from "./lib/db";

async function init() {
  const app = express();
  const PORT = Number(process.env.PORT) || 8000;

  app.use(express.json());

  app.get("/", (req, res) => {
    res.json({ message: "Server is up and running" });
  });

  // ✅ Proper middleware setup
  app.use("/graphql", expressMiddleware(await createApolloGraphqlServer(), {
    context: async ({ req, res }) => ({})
  }));

  app.listen(PORT, () => console.log(`Server started at PORT: ${PORT}`));
}

init();
