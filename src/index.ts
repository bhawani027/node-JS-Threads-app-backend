import express from "express"; 
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from '@as-integrations/express5';

async function init() {
  const app = express();
  const PORT = Number(process.env.PORT) || 8000;

  app.use(express.json());

  const gqlServer = new ApolloServer({
    typeDefs: `
      type Query {
        hello: String
        say(name: String): String
      }
    `,
    resolvers: {
      Query: {
        hello: () => `Hey there, I am a graphql server`,
        say: (_, { name }: { name: string }) => `Hey ${name}, How are you`
      }
    }
  });

  await gqlServer.start();

  app.get("/", (req, res) => {
    res.json({ message: "Server is up and running" });
  });

  // ✅ Proper middleware setup
  app.use("/graphql", expressMiddleware(gqlServer, {
    context: async ({ req, res }) => ({})
  }));

  app.listen(PORT, () => console.log(`Server started at PORT: ${PORT}`));
}

init();
