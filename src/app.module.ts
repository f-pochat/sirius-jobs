import { MiddlewareConsumer, Module, NestModule, UseGuards } from "@nestjs/common";
import { ProxyModule } from "@proxy/proxy.module";
import { GraphQLFactory, GraphQLModule } from "@nestjs/graphql";
import { ApolloDriver, ApolloDriverConfig } from "@nestjs/apollo";
import { GraphQLSchema, print } from "graphql";
import { rawRequest } from "graphql-request";
import { introspectSchema, wrapSchema } from "@graphql-tools/wrap";
import { stitchSchemas } from "@graphql-tools/stitch";
import { JwtMiddleware } from "@shared/middlewares";
import { IUserRepository, UserRepository } from "@proxy/repository";
import { SharedModule } from "@shared/shared.module";

const createRemoteSchema = async ({ url, ...rest }): Promise<GraphQLSchema> => {
  const executor = async ({ document, variables }) => {
    const query = typeof document === 'string' ? document : print(document);
    return await rawRequest(url, query, variables)
  }

  return wrapSchema({
    schema: await introspectSchema(executor),
    executor,
    ...rest
  });
}

const userRepositoryProvider = {
  provide: IUserRepository,
  useClass: UserRepository,
}


@Module({
  imports: [
    ProxyModule,
    SharedModule,
    GraphQLModule.forRootAsync({
      driver: ApolloDriver,
      async useFactory(graphQlFactory: GraphQLFactory) {
        const remoteSchema = await createRemoteSchema({ url: 'https://api.graphql.jobs/' })
        return {
          autoSchemaFile: "schema.gql",
          transformSchema: async (schema: GraphQLSchema) => {
            return stitchSchemas({
              subschemas: [
                schema,
                remoteSchema,
              ]
            })
          },
          playground: true,
          include: [ProxyModule]
        }
      }
    })],
  providers: [userRepositoryProvider]
})

export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(JwtMiddleware)
      .forRoutes('*');
  }
}
