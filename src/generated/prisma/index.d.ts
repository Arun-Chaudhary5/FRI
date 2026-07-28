
/**
 * Client
**/

import * as runtime from './runtime/client.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model Professor
 * 
 */
export type Professor = $Result.DefaultSelection<Prisma.$ProfessorPayload>

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient({
 *   adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL })
 * })
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://pris.ly/d/client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient({
   *   adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL })
   * })
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://pris.ly/d/client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/orm/prisma-client/queries/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>

  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.professor`: Exposes CRUD operations for the **Professor** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Professors
    * const professors = await prisma.professor.findMany()
    * ```
    */
  get professor(): Prisma.ProfessorDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 7.8.0
   * Query Engine version: 3c6e192761c0362d496ed980de936e2f3cebcd3a
   */
  export type PrismaVersion = {
    client: string
    engine: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import Bytes = runtime.Bytes
  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    User: 'User',
    Professor: 'Professor'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]



  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "user" | "professor"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UserUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      Professor: {
        payload: Prisma.$ProfessorPayload<ExtArgs>
        fields: Prisma.ProfessorFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ProfessorFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfessorPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ProfessorFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfessorPayload>
          }
          findFirst: {
            args: Prisma.ProfessorFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfessorPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ProfessorFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfessorPayload>
          }
          findMany: {
            args: Prisma.ProfessorFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfessorPayload>[]
          }
          create: {
            args: Prisma.ProfessorCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfessorPayload>
          }
          createMany: {
            args: Prisma.ProfessorCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ProfessorCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfessorPayload>[]
          }
          delete: {
            args: Prisma.ProfessorDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfessorPayload>
          }
          update: {
            args: Prisma.ProfessorUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfessorPayload>
          }
          deleteMany: {
            args: Prisma.ProfessorDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ProfessorUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ProfessorUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfessorPayload>[]
          }
          upsert: {
            args: Prisma.ProfessorUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfessorPayload>
          }
          aggregate: {
            args: Prisma.ProfessorAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateProfessor>
          }
          groupBy: {
            args: Prisma.ProfessorGroupByArgs<ExtArgs>
            result: $Utils.Optional<ProfessorGroupByOutputType>[]
          }
          count: {
            args: Prisma.ProfessorCountArgs<ExtArgs>
            result: $Utils.Optional<ProfessorCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
     * ```
     * Read more in our [docs](https://pris.ly/d/logging).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Instance of a Driver Adapter, e.g., like one provided by `@prisma/adapter-planetscale`
     */
    adapter?: runtime.SqlDriverAdapterFactory
    /**
     * Prisma Accelerate URL allowing the client to connect through Accelerate instead of a direct database.
     */
    accelerateUrl?: string
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
    /**
     * SQL commenter plugins that add metadata to SQL queries as comments.
     * Comments follow the sqlcommenter format: https://google.github.io/sqlcommenter/
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   adapter,
     *   comments: [
     *     traceContext(),
     *     queryInsights(),
     *   ],
     * })
     * ```
     */
    comments?: runtime.SqlCommenterPlugin[]
  }
  export type GlobalOmitConfig = {
    user?: UserOmit
    professor?: ProfessorOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type UserCountOutputType
   */

  export type UserCountOutputType = {
    professors: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    professors?: boolean | UserCountOutputTypeCountProfessorsArgs
  }

  // Custom InputTypes
  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: UserCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountProfessorsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProfessorWhereInput
  }


  /**
   * Models
   */

  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserMinAggregateOutputType = {
    id: string | null
    name: string | null
    university: string | null
    degree: string | null
    department: string | null
    expectedGraduation: string | null
    email: string | null
    linkedin: string | null
    github: string | null
    portfolio: string | null
    country: string | null
    preferredResearchAreas: string | null
    targetCountries: string | null
    internshipDuration: string | null
    preferredStartMonth: string | null
    skills: string | null
    programmingLanguages: string | null
    frameworks: string | null
    researchExperience: string | null
    projects: string | null
    leadershipRoles: string | null
    awards: string | null
    workExperience: string | null
    publications: string | null
    researchInterests: string | null
    technicalStack: string | null
    domainExpertise: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserMaxAggregateOutputType = {
    id: string | null
    name: string | null
    university: string | null
    degree: string | null
    department: string | null
    expectedGraduation: string | null
    email: string | null
    linkedin: string | null
    github: string | null
    portfolio: string | null
    country: string | null
    preferredResearchAreas: string | null
    targetCountries: string | null
    internshipDuration: string | null
    preferredStartMonth: string | null
    skills: string | null
    programmingLanguages: string | null
    frameworks: string | null
    researchExperience: string | null
    projects: string | null
    leadershipRoles: string | null
    awards: string | null
    workExperience: string | null
    publications: string | null
    researchInterests: string | null
    technicalStack: string | null
    domainExpertise: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    name: number
    university: number
    degree: number
    department: number
    expectedGraduation: number
    email: number
    linkedin: number
    github: number
    portfolio: number
    country: number
    preferredResearchAreas: number
    targetCountries: number
    internshipDuration: number
    preferredStartMonth: number
    skills: number
    programmingLanguages: number
    frameworks: number
    researchExperience: number
    projects: number
    leadershipRoles: number
    awards: number
    workExperience: number
    publications: number
    researchInterests: number
    technicalStack: number
    domainExpertise: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type UserMinAggregateInputType = {
    id?: true
    name?: true
    university?: true
    degree?: true
    department?: true
    expectedGraduation?: true
    email?: true
    linkedin?: true
    github?: true
    portfolio?: true
    country?: true
    preferredResearchAreas?: true
    targetCountries?: true
    internshipDuration?: true
    preferredStartMonth?: true
    skills?: true
    programmingLanguages?: true
    frameworks?: true
    researchExperience?: true
    projects?: true
    leadershipRoles?: true
    awards?: true
    workExperience?: true
    publications?: true
    researchInterests?: true
    technicalStack?: true
    domainExpertise?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    name?: true
    university?: true
    degree?: true
    department?: true
    expectedGraduation?: true
    email?: true
    linkedin?: true
    github?: true
    portfolio?: true
    country?: true
    preferredResearchAreas?: true
    targetCountries?: true
    internshipDuration?: true
    preferredStartMonth?: true
    skills?: true
    programmingLanguages?: true
    frameworks?: true
    researchExperience?: true
    projects?: true
    leadershipRoles?: true
    awards?: true
    workExperience?: true
    publications?: true
    researchInterests?: true
    technicalStack?: true
    domainExpertise?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    name?: true
    university?: true
    degree?: true
    department?: true
    expectedGraduation?: true
    email?: true
    linkedin?: true
    github?: true
    portfolio?: true
    country?: true
    preferredResearchAreas?: true
    targetCountries?: true
    internshipDuration?: true
    preferredStartMonth?: true
    skills?: true
    programmingLanguages?: true
    frameworks?: true
    researchExperience?: true
    projects?: true
    leadershipRoles?: true
    awards?: true
    workExperience?: true
    publications?: true
    researchInterests?: true
    technicalStack?: true
    domainExpertise?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: string
    name: string | null
    university: string | null
    degree: string | null
    department: string | null
    expectedGraduation: string | null
    email: string | null
    linkedin: string | null
    github: string | null
    portfolio: string | null
    country: string | null
    preferredResearchAreas: string | null
    targetCountries: string | null
    internshipDuration: string | null
    preferredStartMonth: string | null
    skills: string | null
    programmingLanguages: string | null
    frameworks: string | null
    researchExperience: string | null
    projects: string | null
    leadershipRoles: string | null
    awards: string | null
    workExperience: string | null
    publications: string | null
    researchInterests: string | null
    technicalStack: string | null
    domainExpertise: string | null
    createdAt: Date
    updatedAt: Date
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    university?: boolean
    degree?: boolean
    department?: boolean
    expectedGraduation?: boolean
    email?: boolean
    linkedin?: boolean
    github?: boolean
    portfolio?: boolean
    country?: boolean
    preferredResearchAreas?: boolean
    targetCountries?: boolean
    internshipDuration?: boolean
    preferredStartMonth?: boolean
    skills?: boolean
    programmingLanguages?: boolean
    frameworks?: boolean
    researchExperience?: boolean
    projects?: boolean
    leadershipRoles?: boolean
    awards?: boolean
    workExperience?: boolean
    publications?: boolean
    researchInterests?: boolean
    technicalStack?: boolean
    domainExpertise?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    professors?: boolean | User$professorsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    university?: boolean
    degree?: boolean
    department?: boolean
    expectedGraduation?: boolean
    email?: boolean
    linkedin?: boolean
    github?: boolean
    portfolio?: boolean
    country?: boolean
    preferredResearchAreas?: boolean
    targetCountries?: boolean
    internshipDuration?: boolean
    preferredStartMonth?: boolean
    skills?: boolean
    programmingLanguages?: boolean
    frameworks?: boolean
    researchExperience?: boolean
    projects?: boolean
    leadershipRoles?: boolean
    awards?: boolean
    workExperience?: boolean
    publications?: boolean
    researchInterests?: boolean
    technicalStack?: boolean
    domainExpertise?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    university?: boolean
    degree?: boolean
    department?: boolean
    expectedGraduation?: boolean
    email?: boolean
    linkedin?: boolean
    github?: boolean
    portfolio?: boolean
    country?: boolean
    preferredResearchAreas?: boolean
    targetCountries?: boolean
    internshipDuration?: boolean
    preferredStartMonth?: boolean
    skills?: boolean
    programmingLanguages?: boolean
    frameworks?: boolean
    researchExperience?: boolean
    projects?: boolean
    leadershipRoles?: boolean
    awards?: boolean
    workExperience?: boolean
    publications?: boolean
    researchInterests?: boolean
    technicalStack?: boolean
    domainExpertise?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    id?: boolean
    name?: boolean
    university?: boolean
    degree?: boolean
    department?: boolean
    expectedGraduation?: boolean
    email?: boolean
    linkedin?: boolean
    github?: boolean
    portfolio?: boolean
    country?: boolean
    preferredResearchAreas?: boolean
    targetCountries?: boolean
    internshipDuration?: boolean
    preferredStartMonth?: boolean
    skills?: boolean
    programmingLanguages?: boolean
    frameworks?: boolean
    researchExperience?: boolean
    projects?: boolean
    leadershipRoles?: boolean
    awards?: boolean
    workExperience?: boolean
    publications?: boolean
    researchInterests?: boolean
    technicalStack?: boolean
    domainExpertise?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type UserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "university" | "degree" | "department" | "expectedGraduation" | "email" | "linkedin" | "github" | "portfolio" | "country" | "preferredResearchAreas" | "targetCountries" | "internshipDuration" | "preferredStartMonth" | "skills" | "programmingLanguages" | "frameworks" | "researchExperience" | "projects" | "leadershipRoles" | "awards" | "workExperience" | "publications" | "researchInterests" | "technicalStack" | "domainExpertise" | "createdAt" | "updatedAt", ExtArgs["result"]["user"]>
  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    professors?: boolean | User$professorsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type UserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type UserIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      professors: Prisma.$ProfessorPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string | null
      university: string | null
      degree: string | null
      department: string | null
      expectedGraduation: string | null
      email: string | null
      linkedin: string | null
      github: string | null
      portfolio: string | null
      country: string | null
      preferredResearchAreas: string | null
      targetCountries: string | null
      internshipDuration: string | null
      preferredStartMonth: string | null
      skills: string | null
      programmingLanguages: string | null
      frameworks: string | null
      researchExperience: string | null
      projects: string | null
      leadershipRoles: string | null
      awards: string | null
      workExperience: string | null
      publications: string | null
      researchInterests: string | null
      technicalStack: string | null
      domainExpertise: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Users and returns the data saved in the database.
     * @param {UserCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Users and only return the `id`
     * const userWithIdOnly = await prisma.user.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(args?: SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users and returns the data updated in the database.
     * @param {UserUpdateManyAndReturnArgs} args - Arguments to update many Users.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Users and only return the `id`
     * const userWithIdOnly = await prisma.user.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends UserUpdateManyAndReturnArgs>(args: SelectSubset<T, UserUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    professors<T extends User$professorsArgs<ExtArgs> = {}>(args?: Subset<T, User$professorsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProfessorPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the User model
   */
  interface UserFieldRefs {
    readonly id: FieldRef<"User", 'String'>
    readonly name: FieldRef<"User", 'String'>
    readonly university: FieldRef<"User", 'String'>
    readonly degree: FieldRef<"User", 'String'>
    readonly department: FieldRef<"User", 'String'>
    readonly expectedGraduation: FieldRef<"User", 'String'>
    readonly email: FieldRef<"User", 'String'>
    readonly linkedin: FieldRef<"User", 'String'>
    readonly github: FieldRef<"User", 'String'>
    readonly portfolio: FieldRef<"User", 'String'>
    readonly country: FieldRef<"User", 'String'>
    readonly preferredResearchAreas: FieldRef<"User", 'String'>
    readonly targetCountries: FieldRef<"User", 'String'>
    readonly internshipDuration: FieldRef<"User", 'String'>
    readonly preferredStartMonth: FieldRef<"User", 'String'>
    readonly skills: FieldRef<"User", 'String'>
    readonly programmingLanguages: FieldRef<"User", 'String'>
    readonly frameworks: FieldRef<"User", 'String'>
    readonly researchExperience: FieldRef<"User", 'String'>
    readonly projects: FieldRef<"User", 'String'>
    readonly leadershipRoles: FieldRef<"User", 'String'>
    readonly awards: FieldRef<"User", 'String'>
    readonly workExperience: FieldRef<"User", 'String'>
    readonly publications: FieldRef<"User", 'String'>
    readonly researchInterests: FieldRef<"User", 'String'>
    readonly technicalStack: FieldRef<"User", 'String'>
    readonly domainExpertise: FieldRef<"User", 'String'>
    readonly createdAt: FieldRef<"User", 'DateTime'>
    readonly updatedAt: FieldRef<"User", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
  }

  /**
   * User createManyAndReturn
   */
  export type UserCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User updateManyAndReturn
   */
  export type UserUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to delete.
     */
    limit?: number
  }

  /**
   * User.professors
   */
  export type User$professorsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Professor
     */
    select?: ProfessorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Professor
     */
    omit?: ProfessorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfessorInclude<ExtArgs> | null
    where?: ProfessorWhereInput
    orderBy?: ProfessorOrderByWithRelationInput | ProfessorOrderByWithRelationInput[]
    cursor?: ProfessorWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ProfessorScalarFieldEnum | ProfessorScalarFieldEnum[]
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
  }


  /**
   * Model Professor
   */

  export type AggregateProfessor = {
    _count: ProfessorCountAggregateOutputType | null
    _avg: ProfessorAvgAggregateOutputType | null
    _sum: ProfessorSumAggregateOutputType | null
    _min: ProfessorMinAggregateOutputType | null
    _max: ProfessorMaxAggregateOutputType | null
  }

  export type ProfessorAvgAggregateOutputType = {
    emailConfidence: number | null
    compatibilityScore: number | null
  }

  export type ProfessorSumAggregateOutputType = {
    emailConfidence: number | null
    compatibilityScore: number | null
  }

  export type ProfessorMinAggregateOutputType = {
    id: string | null
    name: string | null
    university: string | null
    department: string | null
    country: string | null
    email: string | null
    emailStatus: string | null
    emailSource: string | null
    emailSourceUrl: string | null
    emailConfidence: number | null
    emailLastChecked: Date | null
    position: string | null
    homepage: string | null
    lab: string | null
    rawScrapedText: string | null
    primaryAreas: string | null
    currentThemes: string | null
    keywords: string | null
    openProblems: string | null
    latestPublications: string | null
    mostCitedPublications: string | null
    topicsOverTime: string | null
    currentProjects: string | null
    collaborators: string | null
    phdStudents: string | null
    fundingSources: string | null
    openPositions: string | null
    aiAnalysisSummary: string | null
    status: string | null
    compatibilityScore: number | null
    compatibilityReasoning: string | null
    dateSent: Date | null
    subject: string | null
    tags: string | null
    notes: string | null
    createdAt: Date | null
    updatedAt: Date | null
    userId: string | null
  }

  export type ProfessorMaxAggregateOutputType = {
    id: string | null
    name: string | null
    university: string | null
    department: string | null
    country: string | null
    email: string | null
    emailStatus: string | null
    emailSource: string | null
    emailSourceUrl: string | null
    emailConfidence: number | null
    emailLastChecked: Date | null
    position: string | null
    homepage: string | null
    lab: string | null
    rawScrapedText: string | null
    primaryAreas: string | null
    currentThemes: string | null
    keywords: string | null
    openProblems: string | null
    latestPublications: string | null
    mostCitedPublications: string | null
    topicsOverTime: string | null
    currentProjects: string | null
    collaborators: string | null
    phdStudents: string | null
    fundingSources: string | null
    openPositions: string | null
    aiAnalysisSummary: string | null
    status: string | null
    compatibilityScore: number | null
    compatibilityReasoning: string | null
    dateSent: Date | null
    subject: string | null
    tags: string | null
    notes: string | null
    createdAt: Date | null
    updatedAt: Date | null
    userId: string | null
  }

  export type ProfessorCountAggregateOutputType = {
    id: number
    name: number
    university: number
    department: number
    country: number
    email: number
    emailStatus: number
    emailSource: number
    emailSourceUrl: number
    emailConfidence: number
    emailLastChecked: number
    position: number
    homepage: number
    lab: number
    rawScrapedText: number
    primaryAreas: number
    currentThemes: number
    keywords: number
    openProblems: number
    latestPublications: number
    mostCitedPublications: number
    topicsOverTime: number
    currentProjects: number
    collaborators: number
    phdStudents: number
    fundingSources: number
    openPositions: number
    aiAnalysisSummary: number
    status: number
    compatibilityScore: number
    compatibilityReasoning: number
    dateSent: number
    subject: number
    tags: number
    notes: number
    createdAt: number
    updatedAt: number
    userId: number
    _all: number
  }


  export type ProfessorAvgAggregateInputType = {
    emailConfidence?: true
    compatibilityScore?: true
  }

  export type ProfessorSumAggregateInputType = {
    emailConfidence?: true
    compatibilityScore?: true
  }

  export type ProfessorMinAggregateInputType = {
    id?: true
    name?: true
    university?: true
    department?: true
    country?: true
    email?: true
    emailStatus?: true
    emailSource?: true
    emailSourceUrl?: true
    emailConfidence?: true
    emailLastChecked?: true
    position?: true
    homepage?: true
    lab?: true
    rawScrapedText?: true
    primaryAreas?: true
    currentThemes?: true
    keywords?: true
    openProblems?: true
    latestPublications?: true
    mostCitedPublications?: true
    topicsOverTime?: true
    currentProjects?: true
    collaborators?: true
    phdStudents?: true
    fundingSources?: true
    openPositions?: true
    aiAnalysisSummary?: true
    status?: true
    compatibilityScore?: true
    compatibilityReasoning?: true
    dateSent?: true
    subject?: true
    tags?: true
    notes?: true
    createdAt?: true
    updatedAt?: true
    userId?: true
  }

  export type ProfessorMaxAggregateInputType = {
    id?: true
    name?: true
    university?: true
    department?: true
    country?: true
    email?: true
    emailStatus?: true
    emailSource?: true
    emailSourceUrl?: true
    emailConfidence?: true
    emailLastChecked?: true
    position?: true
    homepage?: true
    lab?: true
    rawScrapedText?: true
    primaryAreas?: true
    currentThemes?: true
    keywords?: true
    openProblems?: true
    latestPublications?: true
    mostCitedPublications?: true
    topicsOverTime?: true
    currentProjects?: true
    collaborators?: true
    phdStudents?: true
    fundingSources?: true
    openPositions?: true
    aiAnalysisSummary?: true
    status?: true
    compatibilityScore?: true
    compatibilityReasoning?: true
    dateSent?: true
    subject?: true
    tags?: true
    notes?: true
    createdAt?: true
    updatedAt?: true
    userId?: true
  }

  export type ProfessorCountAggregateInputType = {
    id?: true
    name?: true
    university?: true
    department?: true
    country?: true
    email?: true
    emailStatus?: true
    emailSource?: true
    emailSourceUrl?: true
    emailConfidence?: true
    emailLastChecked?: true
    position?: true
    homepage?: true
    lab?: true
    rawScrapedText?: true
    primaryAreas?: true
    currentThemes?: true
    keywords?: true
    openProblems?: true
    latestPublications?: true
    mostCitedPublications?: true
    topicsOverTime?: true
    currentProjects?: true
    collaborators?: true
    phdStudents?: true
    fundingSources?: true
    openPositions?: true
    aiAnalysisSummary?: true
    status?: true
    compatibilityScore?: true
    compatibilityReasoning?: true
    dateSent?: true
    subject?: true
    tags?: true
    notes?: true
    createdAt?: true
    updatedAt?: true
    userId?: true
    _all?: true
  }

  export type ProfessorAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Professor to aggregate.
     */
    where?: ProfessorWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Professors to fetch.
     */
    orderBy?: ProfessorOrderByWithRelationInput | ProfessorOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ProfessorWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Professors from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Professors.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Professors
    **/
    _count?: true | ProfessorCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ProfessorAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ProfessorSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ProfessorMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ProfessorMaxAggregateInputType
  }

  export type GetProfessorAggregateType<T extends ProfessorAggregateArgs> = {
        [P in keyof T & keyof AggregateProfessor]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateProfessor[P]>
      : GetScalarType<T[P], AggregateProfessor[P]>
  }




  export type ProfessorGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProfessorWhereInput
    orderBy?: ProfessorOrderByWithAggregationInput | ProfessorOrderByWithAggregationInput[]
    by: ProfessorScalarFieldEnum[] | ProfessorScalarFieldEnum
    having?: ProfessorScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ProfessorCountAggregateInputType | true
    _avg?: ProfessorAvgAggregateInputType
    _sum?: ProfessorSumAggregateInputType
    _min?: ProfessorMinAggregateInputType
    _max?: ProfessorMaxAggregateInputType
  }

  export type ProfessorGroupByOutputType = {
    id: string
    name: string | null
    university: string | null
    department: string | null
    country: string | null
    email: string | null
    emailStatus: string
    emailSource: string | null
    emailSourceUrl: string | null
    emailConfidence: number | null
    emailLastChecked: Date | null
    position: string | null
    homepage: string | null
    lab: string | null
    rawScrapedText: string | null
    primaryAreas: string | null
    currentThemes: string | null
    keywords: string | null
    openProblems: string | null
    latestPublications: string | null
    mostCitedPublications: string | null
    topicsOverTime: string | null
    currentProjects: string | null
    collaborators: string | null
    phdStudents: string | null
    fundingSources: string | null
    openPositions: string | null
    aiAnalysisSummary: string | null
    status: string
    compatibilityScore: number | null
    compatibilityReasoning: string | null
    dateSent: Date | null
    subject: string | null
    tags: string | null
    notes: string | null
    createdAt: Date
    updatedAt: Date
    userId: string | null
    _count: ProfessorCountAggregateOutputType | null
    _avg: ProfessorAvgAggregateOutputType | null
    _sum: ProfessorSumAggregateOutputType | null
    _min: ProfessorMinAggregateOutputType | null
    _max: ProfessorMaxAggregateOutputType | null
  }

  type GetProfessorGroupByPayload<T extends ProfessorGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ProfessorGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ProfessorGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ProfessorGroupByOutputType[P]>
            : GetScalarType<T[P], ProfessorGroupByOutputType[P]>
        }
      >
    >


  export type ProfessorSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    university?: boolean
    department?: boolean
    country?: boolean
    email?: boolean
    emailStatus?: boolean
    emailSource?: boolean
    emailSourceUrl?: boolean
    emailConfidence?: boolean
    emailLastChecked?: boolean
    position?: boolean
    homepage?: boolean
    lab?: boolean
    rawScrapedText?: boolean
    primaryAreas?: boolean
    currentThemes?: boolean
    keywords?: boolean
    openProblems?: boolean
    latestPublications?: boolean
    mostCitedPublications?: boolean
    topicsOverTime?: boolean
    currentProjects?: boolean
    collaborators?: boolean
    phdStudents?: boolean
    fundingSources?: boolean
    openPositions?: boolean
    aiAnalysisSummary?: boolean
    status?: boolean
    compatibilityScore?: boolean
    compatibilityReasoning?: boolean
    dateSent?: boolean
    subject?: boolean
    tags?: boolean
    notes?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    userId?: boolean
    user?: boolean | Professor$userArgs<ExtArgs>
  }, ExtArgs["result"]["professor"]>

  export type ProfessorSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    university?: boolean
    department?: boolean
    country?: boolean
    email?: boolean
    emailStatus?: boolean
    emailSource?: boolean
    emailSourceUrl?: boolean
    emailConfidence?: boolean
    emailLastChecked?: boolean
    position?: boolean
    homepage?: boolean
    lab?: boolean
    rawScrapedText?: boolean
    primaryAreas?: boolean
    currentThemes?: boolean
    keywords?: boolean
    openProblems?: boolean
    latestPublications?: boolean
    mostCitedPublications?: boolean
    topicsOverTime?: boolean
    currentProjects?: boolean
    collaborators?: boolean
    phdStudents?: boolean
    fundingSources?: boolean
    openPositions?: boolean
    aiAnalysisSummary?: boolean
    status?: boolean
    compatibilityScore?: boolean
    compatibilityReasoning?: boolean
    dateSent?: boolean
    subject?: boolean
    tags?: boolean
    notes?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    userId?: boolean
    user?: boolean | Professor$userArgs<ExtArgs>
  }, ExtArgs["result"]["professor"]>

  export type ProfessorSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    university?: boolean
    department?: boolean
    country?: boolean
    email?: boolean
    emailStatus?: boolean
    emailSource?: boolean
    emailSourceUrl?: boolean
    emailConfidence?: boolean
    emailLastChecked?: boolean
    position?: boolean
    homepage?: boolean
    lab?: boolean
    rawScrapedText?: boolean
    primaryAreas?: boolean
    currentThemes?: boolean
    keywords?: boolean
    openProblems?: boolean
    latestPublications?: boolean
    mostCitedPublications?: boolean
    topicsOverTime?: boolean
    currentProjects?: boolean
    collaborators?: boolean
    phdStudents?: boolean
    fundingSources?: boolean
    openPositions?: boolean
    aiAnalysisSummary?: boolean
    status?: boolean
    compatibilityScore?: boolean
    compatibilityReasoning?: boolean
    dateSent?: boolean
    subject?: boolean
    tags?: boolean
    notes?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    userId?: boolean
    user?: boolean | Professor$userArgs<ExtArgs>
  }, ExtArgs["result"]["professor"]>

  export type ProfessorSelectScalar = {
    id?: boolean
    name?: boolean
    university?: boolean
    department?: boolean
    country?: boolean
    email?: boolean
    emailStatus?: boolean
    emailSource?: boolean
    emailSourceUrl?: boolean
    emailConfidence?: boolean
    emailLastChecked?: boolean
    position?: boolean
    homepage?: boolean
    lab?: boolean
    rawScrapedText?: boolean
    primaryAreas?: boolean
    currentThemes?: boolean
    keywords?: boolean
    openProblems?: boolean
    latestPublications?: boolean
    mostCitedPublications?: boolean
    topicsOverTime?: boolean
    currentProjects?: boolean
    collaborators?: boolean
    phdStudents?: boolean
    fundingSources?: boolean
    openPositions?: boolean
    aiAnalysisSummary?: boolean
    status?: boolean
    compatibilityScore?: boolean
    compatibilityReasoning?: boolean
    dateSent?: boolean
    subject?: boolean
    tags?: boolean
    notes?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    userId?: boolean
  }

  export type ProfessorOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "university" | "department" | "country" | "email" | "emailStatus" | "emailSource" | "emailSourceUrl" | "emailConfidence" | "emailLastChecked" | "position" | "homepage" | "lab" | "rawScrapedText" | "primaryAreas" | "currentThemes" | "keywords" | "openProblems" | "latestPublications" | "mostCitedPublications" | "topicsOverTime" | "currentProjects" | "collaborators" | "phdStudents" | "fundingSources" | "openPositions" | "aiAnalysisSummary" | "status" | "compatibilityScore" | "compatibilityReasoning" | "dateSent" | "subject" | "tags" | "notes" | "createdAt" | "updatedAt" | "userId", ExtArgs["result"]["professor"]>
  export type ProfessorInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | Professor$userArgs<ExtArgs>
  }
  export type ProfessorIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | Professor$userArgs<ExtArgs>
  }
  export type ProfessorIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | Professor$userArgs<ExtArgs>
  }

  export type $ProfessorPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Professor"
    objects: {
      user: Prisma.$UserPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string | null
      university: string | null
      department: string | null
      country: string | null
      email: string | null
      emailStatus: string
      emailSource: string | null
      emailSourceUrl: string | null
      emailConfidence: number | null
      emailLastChecked: Date | null
      position: string | null
      homepage: string | null
      lab: string | null
      rawScrapedText: string | null
      primaryAreas: string | null
      currentThemes: string | null
      keywords: string | null
      openProblems: string | null
      latestPublications: string | null
      mostCitedPublications: string | null
      topicsOverTime: string | null
      currentProjects: string | null
      collaborators: string | null
      phdStudents: string | null
      fundingSources: string | null
      openPositions: string | null
      aiAnalysisSummary: string | null
      status: string
      compatibilityScore: number | null
      compatibilityReasoning: string | null
      dateSent: Date | null
      subject: string | null
      tags: string | null
      notes: string | null
      createdAt: Date
      updatedAt: Date
      userId: string | null
    }, ExtArgs["result"]["professor"]>
    composites: {}
  }

  type ProfessorGetPayload<S extends boolean | null | undefined | ProfessorDefaultArgs> = $Result.GetResult<Prisma.$ProfessorPayload, S>

  type ProfessorCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ProfessorFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ProfessorCountAggregateInputType | true
    }

  export interface ProfessorDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Professor'], meta: { name: 'Professor' } }
    /**
     * Find zero or one Professor that matches the filter.
     * @param {ProfessorFindUniqueArgs} args - Arguments to find a Professor
     * @example
     * // Get one Professor
     * const professor = await prisma.professor.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ProfessorFindUniqueArgs>(args: SelectSubset<T, ProfessorFindUniqueArgs<ExtArgs>>): Prisma__ProfessorClient<$Result.GetResult<Prisma.$ProfessorPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Professor that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ProfessorFindUniqueOrThrowArgs} args - Arguments to find a Professor
     * @example
     * // Get one Professor
     * const professor = await prisma.professor.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ProfessorFindUniqueOrThrowArgs>(args: SelectSubset<T, ProfessorFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ProfessorClient<$Result.GetResult<Prisma.$ProfessorPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Professor that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProfessorFindFirstArgs} args - Arguments to find a Professor
     * @example
     * // Get one Professor
     * const professor = await prisma.professor.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ProfessorFindFirstArgs>(args?: SelectSubset<T, ProfessorFindFirstArgs<ExtArgs>>): Prisma__ProfessorClient<$Result.GetResult<Prisma.$ProfessorPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Professor that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProfessorFindFirstOrThrowArgs} args - Arguments to find a Professor
     * @example
     * // Get one Professor
     * const professor = await prisma.professor.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ProfessorFindFirstOrThrowArgs>(args?: SelectSubset<T, ProfessorFindFirstOrThrowArgs<ExtArgs>>): Prisma__ProfessorClient<$Result.GetResult<Prisma.$ProfessorPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Professors that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProfessorFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Professors
     * const professors = await prisma.professor.findMany()
     * 
     * // Get first 10 Professors
     * const professors = await prisma.professor.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const professorWithIdOnly = await prisma.professor.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ProfessorFindManyArgs>(args?: SelectSubset<T, ProfessorFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProfessorPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Professor.
     * @param {ProfessorCreateArgs} args - Arguments to create a Professor.
     * @example
     * // Create one Professor
     * const Professor = await prisma.professor.create({
     *   data: {
     *     // ... data to create a Professor
     *   }
     * })
     * 
     */
    create<T extends ProfessorCreateArgs>(args: SelectSubset<T, ProfessorCreateArgs<ExtArgs>>): Prisma__ProfessorClient<$Result.GetResult<Prisma.$ProfessorPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Professors.
     * @param {ProfessorCreateManyArgs} args - Arguments to create many Professors.
     * @example
     * // Create many Professors
     * const professor = await prisma.professor.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ProfessorCreateManyArgs>(args?: SelectSubset<T, ProfessorCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Professors and returns the data saved in the database.
     * @param {ProfessorCreateManyAndReturnArgs} args - Arguments to create many Professors.
     * @example
     * // Create many Professors
     * const professor = await prisma.professor.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Professors and only return the `id`
     * const professorWithIdOnly = await prisma.professor.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ProfessorCreateManyAndReturnArgs>(args?: SelectSubset<T, ProfessorCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProfessorPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Professor.
     * @param {ProfessorDeleteArgs} args - Arguments to delete one Professor.
     * @example
     * // Delete one Professor
     * const Professor = await prisma.professor.delete({
     *   where: {
     *     // ... filter to delete one Professor
     *   }
     * })
     * 
     */
    delete<T extends ProfessorDeleteArgs>(args: SelectSubset<T, ProfessorDeleteArgs<ExtArgs>>): Prisma__ProfessorClient<$Result.GetResult<Prisma.$ProfessorPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Professor.
     * @param {ProfessorUpdateArgs} args - Arguments to update one Professor.
     * @example
     * // Update one Professor
     * const professor = await prisma.professor.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ProfessorUpdateArgs>(args: SelectSubset<T, ProfessorUpdateArgs<ExtArgs>>): Prisma__ProfessorClient<$Result.GetResult<Prisma.$ProfessorPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Professors.
     * @param {ProfessorDeleteManyArgs} args - Arguments to filter Professors to delete.
     * @example
     * // Delete a few Professors
     * const { count } = await prisma.professor.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ProfessorDeleteManyArgs>(args?: SelectSubset<T, ProfessorDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Professors.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProfessorUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Professors
     * const professor = await prisma.professor.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ProfessorUpdateManyArgs>(args: SelectSubset<T, ProfessorUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Professors and returns the data updated in the database.
     * @param {ProfessorUpdateManyAndReturnArgs} args - Arguments to update many Professors.
     * @example
     * // Update many Professors
     * const professor = await prisma.professor.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Professors and only return the `id`
     * const professorWithIdOnly = await prisma.professor.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ProfessorUpdateManyAndReturnArgs>(args: SelectSubset<T, ProfessorUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProfessorPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Professor.
     * @param {ProfessorUpsertArgs} args - Arguments to update or create a Professor.
     * @example
     * // Update or create a Professor
     * const professor = await prisma.professor.upsert({
     *   create: {
     *     // ... data to create a Professor
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Professor we want to update
     *   }
     * })
     */
    upsert<T extends ProfessorUpsertArgs>(args: SelectSubset<T, ProfessorUpsertArgs<ExtArgs>>): Prisma__ProfessorClient<$Result.GetResult<Prisma.$ProfessorPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Professors.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProfessorCountArgs} args - Arguments to filter Professors to count.
     * @example
     * // Count the number of Professors
     * const count = await prisma.professor.count({
     *   where: {
     *     // ... the filter for the Professors we want to count
     *   }
     * })
    **/
    count<T extends ProfessorCountArgs>(
      args?: Subset<T, ProfessorCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ProfessorCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Professor.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProfessorAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ProfessorAggregateArgs>(args: Subset<T, ProfessorAggregateArgs>): Prisma.PrismaPromise<GetProfessorAggregateType<T>>

    /**
     * Group by Professor.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProfessorGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ProfessorGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ProfessorGroupByArgs['orderBy'] }
        : { orderBy?: ProfessorGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ProfessorGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetProfessorGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Professor model
   */
  readonly fields: ProfessorFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Professor.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ProfessorClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends Professor$userArgs<ExtArgs> = {}>(args?: Subset<T, Professor$userArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Professor model
   */
  interface ProfessorFieldRefs {
    readonly id: FieldRef<"Professor", 'String'>
    readonly name: FieldRef<"Professor", 'String'>
    readonly university: FieldRef<"Professor", 'String'>
    readonly department: FieldRef<"Professor", 'String'>
    readonly country: FieldRef<"Professor", 'String'>
    readonly email: FieldRef<"Professor", 'String'>
    readonly emailStatus: FieldRef<"Professor", 'String'>
    readonly emailSource: FieldRef<"Professor", 'String'>
    readonly emailSourceUrl: FieldRef<"Professor", 'String'>
    readonly emailConfidence: FieldRef<"Professor", 'Int'>
    readonly emailLastChecked: FieldRef<"Professor", 'DateTime'>
    readonly position: FieldRef<"Professor", 'String'>
    readonly homepage: FieldRef<"Professor", 'String'>
    readonly lab: FieldRef<"Professor", 'String'>
    readonly rawScrapedText: FieldRef<"Professor", 'String'>
    readonly primaryAreas: FieldRef<"Professor", 'String'>
    readonly currentThemes: FieldRef<"Professor", 'String'>
    readonly keywords: FieldRef<"Professor", 'String'>
    readonly openProblems: FieldRef<"Professor", 'String'>
    readonly latestPublications: FieldRef<"Professor", 'String'>
    readonly mostCitedPublications: FieldRef<"Professor", 'String'>
    readonly topicsOverTime: FieldRef<"Professor", 'String'>
    readonly currentProjects: FieldRef<"Professor", 'String'>
    readonly collaborators: FieldRef<"Professor", 'String'>
    readonly phdStudents: FieldRef<"Professor", 'String'>
    readonly fundingSources: FieldRef<"Professor", 'String'>
    readonly openPositions: FieldRef<"Professor", 'String'>
    readonly aiAnalysisSummary: FieldRef<"Professor", 'String'>
    readonly status: FieldRef<"Professor", 'String'>
    readonly compatibilityScore: FieldRef<"Professor", 'Int'>
    readonly compatibilityReasoning: FieldRef<"Professor", 'String'>
    readonly dateSent: FieldRef<"Professor", 'DateTime'>
    readonly subject: FieldRef<"Professor", 'String'>
    readonly tags: FieldRef<"Professor", 'String'>
    readonly notes: FieldRef<"Professor", 'String'>
    readonly createdAt: FieldRef<"Professor", 'DateTime'>
    readonly updatedAt: FieldRef<"Professor", 'DateTime'>
    readonly userId: FieldRef<"Professor", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Professor findUnique
   */
  export type ProfessorFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Professor
     */
    select?: ProfessorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Professor
     */
    omit?: ProfessorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfessorInclude<ExtArgs> | null
    /**
     * Filter, which Professor to fetch.
     */
    where: ProfessorWhereUniqueInput
  }

  /**
   * Professor findUniqueOrThrow
   */
  export type ProfessorFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Professor
     */
    select?: ProfessorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Professor
     */
    omit?: ProfessorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfessorInclude<ExtArgs> | null
    /**
     * Filter, which Professor to fetch.
     */
    where: ProfessorWhereUniqueInput
  }

  /**
   * Professor findFirst
   */
  export type ProfessorFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Professor
     */
    select?: ProfessorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Professor
     */
    omit?: ProfessorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfessorInclude<ExtArgs> | null
    /**
     * Filter, which Professor to fetch.
     */
    where?: ProfessorWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Professors to fetch.
     */
    orderBy?: ProfessorOrderByWithRelationInput | ProfessorOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Professors.
     */
    cursor?: ProfessorWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Professors from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Professors.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Professors.
     */
    distinct?: ProfessorScalarFieldEnum | ProfessorScalarFieldEnum[]
  }

  /**
   * Professor findFirstOrThrow
   */
  export type ProfessorFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Professor
     */
    select?: ProfessorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Professor
     */
    omit?: ProfessorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfessorInclude<ExtArgs> | null
    /**
     * Filter, which Professor to fetch.
     */
    where?: ProfessorWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Professors to fetch.
     */
    orderBy?: ProfessorOrderByWithRelationInput | ProfessorOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Professors.
     */
    cursor?: ProfessorWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Professors from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Professors.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Professors.
     */
    distinct?: ProfessorScalarFieldEnum | ProfessorScalarFieldEnum[]
  }

  /**
   * Professor findMany
   */
  export type ProfessorFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Professor
     */
    select?: ProfessorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Professor
     */
    omit?: ProfessorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfessorInclude<ExtArgs> | null
    /**
     * Filter, which Professors to fetch.
     */
    where?: ProfessorWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Professors to fetch.
     */
    orderBy?: ProfessorOrderByWithRelationInput | ProfessorOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Professors.
     */
    cursor?: ProfessorWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Professors from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Professors.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Professors.
     */
    distinct?: ProfessorScalarFieldEnum | ProfessorScalarFieldEnum[]
  }

  /**
   * Professor create
   */
  export type ProfessorCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Professor
     */
    select?: ProfessorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Professor
     */
    omit?: ProfessorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfessorInclude<ExtArgs> | null
    /**
     * The data needed to create a Professor.
     */
    data: XOR<ProfessorCreateInput, ProfessorUncheckedCreateInput>
  }

  /**
   * Professor createMany
   */
  export type ProfessorCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Professors.
     */
    data: ProfessorCreateManyInput | ProfessorCreateManyInput[]
  }

  /**
   * Professor createManyAndReturn
   */
  export type ProfessorCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Professor
     */
    select?: ProfessorSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Professor
     */
    omit?: ProfessorOmit<ExtArgs> | null
    /**
     * The data used to create many Professors.
     */
    data: ProfessorCreateManyInput | ProfessorCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfessorIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Professor update
   */
  export type ProfessorUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Professor
     */
    select?: ProfessorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Professor
     */
    omit?: ProfessorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfessorInclude<ExtArgs> | null
    /**
     * The data needed to update a Professor.
     */
    data: XOR<ProfessorUpdateInput, ProfessorUncheckedUpdateInput>
    /**
     * Choose, which Professor to update.
     */
    where: ProfessorWhereUniqueInput
  }

  /**
   * Professor updateMany
   */
  export type ProfessorUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Professors.
     */
    data: XOR<ProfessorUpdateManyMutationInput, ProfessorUncheckedUpdateManyInput>
    /**
     * Filter which Professors to update
     */
    where?: ProfessorWhereInput
    /**
     * Limit how many Professors to update.
     */
    limit?: number
  }

  /**
   * Professor updateManyAndReturn
   */
  export type ProfessorUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Professor
     */
    select?: ProfessorSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Professor
     */
    omit?: ProfessorOmit<ExtArgs> | null
    /**
     * The data used to update Professors.
     */
    data: XOR<ProfessorUpdateManyMutationInput, ProfessorUncheckedUpdateManyInput>
    /**
     * Filter which Professors to update
     */
    where?: ProfessorWhereInput
    /**
     * Limit how many Professors to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfessorIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Professor upsert
   */
  export type ProfessorUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Professor
     */
    select?: ProfessorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Professor
     */
    omit?: ProfessorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfessorInclude<ExtArgs> | null
    /**
     * The filter to search for the Professor to update in case it exists.
     */
    where: ProfessorWhereUniqueInput
    /**
     * In case the Professor found by the `where` argument doesn't exist, create a new Professor with this data.
     */
    create: XOR<ProfessorCreateInput, ProfessorUncheckedCreateInput>
    /**
     * In case the Professor was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ProfessorUpdateInput, ProfessorUncheckedUpdateInput>
  }

  /**
   * Professor delete
   */
  export type ProfessorDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Professor
     */
    select?: ProfessorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Professor
     */
    omit?: ProfessorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfessorInclude<ExtArgs> | null
    /**
     * Filter which Professor to delete.
     */
    where: ProfessorWhereUniqueInput
  }

  /**
   * Professor deleteMany
   */
  export type ProfessorDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Professors to delete
     */
    where?: ProfessorWhereInput
    /**
     * Limit how many Professors to delete.
     */
    limit?: number
  }

  /**
   * Professor.user
   */
  export type Professor$userArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    where?: UserWhereInput
  }

  /**
   * Professor without action
   */
  export type ProfessorDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Professor
     */
    select?: ProfessorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Professor
     */
    omit?: ProfessorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfessorInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const UserScalarFieldEnum: {
    id: 'id',
    name: 'name',
    university: 'university',
    degree: 'degree',
    department: 'department',
    expectedGraduation: 'expectedGraduation',
    email: 'email',
    linkedin: 'linkedin',
    github: 'github',
    portfolio: 'portfolio',
    country: 'country',
    preferredResearchAreas: 'preferredResearchAreas',
    targetCountries: 'targetCountries',
    internshipDuration: 'internshipDuration',
    preferredStartMonth: 'preferredStartMonth',
    skills: 'skills',
    programmingLanguages: 'programmingLanguages',
    frameworks: 'frameworks',
    researchExperience: 'researchExperience',
    projects: 'projects',
    leadershipRoles: 'leadershipRoles',
    awards: 'awards',
    workExperience: 'workExperience',
    publications: 'publications',
    researchInterests: 'researchInterests',
    technicalStack: 'technicalStack',
    domainExpertise: 'domainExpertise',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const ProfessorScalarFieldEnum: {
    id: 'id',
    name: 'name',
    university: 'university',
    department: 'department',
    country: 'country',
    email: 'email',
    emailStatus: 'emailStatus',
    emailSource: 'emailSource',
    emailSourceUrl: 'emailSourceUrl',
    emailConfidence: 'emailConfidence',
    emailLastChecked: 'emailLastChecked',
    position: 'position',
    homepage: 'homepage',
    lab: 'lab',
    rawScrapedText: 'rawScrapedText',
    primaryAreas: 'primaryAreas',
    currentThemes: 'currentThemes',
    keywords: 'keywords',
    openProblems: 'openProblems',
    latestPublications: 'latestPublications',
    mostCitedPublications: 'mostCitedPublications',
    topicsOverTime: 'topicsOverTime',
    currentProjects: 'currentProjects',
    collaborators: 'collaborators',
    phdStudents: 'phdStudents',
    fundingSources: 'fundingSources',
    openPositions: 'openPositions',
    aiAnalysisSummary: 'aiAnalysisSummary',
    status: 'status',
    compatibilityScore: 'compatibilityScore',
    compatibilityReasoning: 'compatibilityReasoning',
    dateSent: 'dateSent',
    subject: 'subject',
    tags: 'tags',
    notes: 'notes',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    userId: 'userId'
  };

  export type ProfessorScalarFieldEnum = (typeof ProfessorScalarFieldEnum)[keyof typeof ProfessorScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    
  /**
   * Deep Input Types
   */


  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: StringFilter<"User"> | string
    name?: StringNullableFilter<"User"> | string | null
    university?: StringNullableFilter<"User"> | string | null
    degree?: StringNullableFilter<"User"> | string | null
    department?: StringNullableFilter<"User"> | string | null
    expectedGraduation?: StringNullableFilter<"User"> | string | null
    email?: StringNullableFilter<"User"> | string | null
    linkedin?: StringNullableFilter<"User"> | string | null
    github?: StringNullableFilter<"User"> | string | null
    portfolio?: StringNullableFilter<"User"> | string | null
    country?: StringNullableFilter<"User"> | string | null
    preferredResearchAreas?: StringNullableFilter<"User"> | string | null
    targetCountries?: StringNullableFilter<"User"> | string | null
    internshipDuration?: StringNullableFilter<"User"> | string | null
    preferredStartMonth?: StringNullableFilter<"User"> | string | null
    skills?: StringNullableFilter<"User"> | string | null
    programmingLanguages?: StringNullableFilter<"User"> | string | null
    frameworks?: StringNullableFilter<"User"> | string | null
    researchExperience?: StringNullableFilter<"User"> | string | null
    projects?: StringNullableFilter<"User"> | string | null
    leadershipRoles?: StringNullableFilter<"User"> | string | null
    awards?: StringNullableFilter<"User"> | string | null
    workExperience?: StringNullableFilter<"User"> | string | null
    publications?: StringNullableFilter<"User"> | string | null
    researchInterests?: StringNullableFilter<"User"> | string | null
    technicalStack?: StringNullableFilter<"User"> | string | null
    domainExpertise?: StringNullableFilter<"User"> | string | null
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    professors?: ProfessorListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrderInput | SortOrder
    university?: SortOrderInput | SortOrder
    degree?: SortOrderInput | SortOrder
    department?: SortOrderInput | SortOrder
    expectedGraduation?: SortOrderInput | SortOrder
    email?: SortOrderInput | SortOrder
    linkedin?: SortOrderInput | SortOrder
    github?: SortOrderInput | SortOrder
    portfolio?: SortOrderInput | SortOrder
    country?: SortOrderInput | SortOrder
    preferredResearchAreas?: SortOrderInput | SortOrder
    targetCountries?: SortOrderInput | SortOrder
    internshipDuration?: SortOrderInput | SortOrder
    preferredStartMonth?: SortOrderInput | SortOrder
    skills?: SortOrderInput | SortOrder
    programmingLanguages?: SortOrderInput | SortOrder
    frameworks?: SortOrderInput | SortOrder
    researchExperience?: SortOrderInput | SortOrder
    projects?: SortOrderInput | SortOrder
    leadershipRoles?: SortOrderInput | SortOrder
    awards?: SortOrderInput | SortOrder
    workExperience?: SortOrderInput | SortOrder
    publications?: SortOrderInput | SortOrder
    researchInterests?: SortOrderInput | SortOrder
    technicalStack?: SortOrderInput | SortOrder
    domainExpertise?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    professors?: ProfessorOrderByRelationAggregateInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    email?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    name?: StringNullableFilter<"User"> | string | null
    university?: StringNullableFilter<"User"> | string | null
    degree?: StringNullableFilter<"User"> | string | null
    department?: StringNullableFilter<"User"> | string | null
    expectedGraduation?: StringNullableFilter<"User"> | string | null
    linkedin?: StringNullableFilter<"User"> | string | null
    github?: StringNullableFilter<"User"> | string | null
    portfolio?: StringNullableFilter<"User"> | string | null
    country?: StringNullableFilter<"User"> | string | null
    preferredResearchAreas?: StringNullableFilter<"User"> | string | null
    targetCountries?: StringNullableFilter<"User"> | string | null
    internshipDuration?: StringNullableFilter<"User"> | string | null
    preferredStartMonth?: StringNullableFilter<"User"> | string | null
    skills?: StringNullableFilter<"User"> | string | null
    programmingLanguages?: StringNullableFilter<"User"> | string | null
    frameworks?: StringNullableFilter<"User"> | string | null
    researchExperience?: StringNullableFilter<"User"> | string | null
    projects?: StringNullableFilter<"User"> | string | null
    leadershipRoles?: StringNullableFilter<"User"> | string | null
    awards?: StringNullableFilter<"User"> | string | null
    workExperience?: StringNullableFilter<"User"> | string | null
    publications?: StringNullableFilter<"User"> | string | null
    researchInterests?: StringNullableFilter<"User"> | string | null
    technicalStack?: StringNullableFilter<"User"> | string | null
    domainExpertise?: StringNullableFilter<"User"> | string | null
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    professors?: ProfessorListRelationFilter
  }, "id" | "email">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrderInput | SortOrder
    university?: SortOrderInput | SortOrder
    degree?: SortOrderInput | SortOrder
    department?: SortOrderInput | SortOrder
    expectedGraduation?: SortOrderInput | SortOrder
    email?: SortOrderInput | SortOrder
    linkedin?: SortOrderInput | SortOrder
    github?: SortOrderInput | SortOrder
    portfolio?: SortOrderInput | SortOrder
    country?: SortOrderInput | SortOrder
    preferredResearchAreas?: SortOrderInput | SortOrder
    targetCountries?: SortOrderInput | SortOrder
    internshipDuration?: SortOrderInput | SortOrder
    preferredStartMonth?: SortOrderInput | SortOrder
    skills?: SortOrderInput | SortOrder
    programmingLanguages?: SortOrderInput | SortOrder
    frameworks?: SortOrderInput | SortOrder
    researchExperience?: SortOrderInput | SortOrder
    projects?: SortOrderInput | SortOrder
    leadershipRoles?: SortOrderInput | SortOrder
    awards?: SortOrderInput | SortOrder
    workExperience?: SortOrderInput | SortOrder
    publications?: SortOrderInput | SortOrder
    researchInterests?: SortOrderInput | SortOrder
    technicalStack?: SortOrderInput | SortOrder
    domainExpertise?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: UserCountOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"User"> | string
    name?: StringNullableWithAggregatesFilter<"User"> | string | null
    university?: StringNullableWithAggregatesFilter<"User"> | string | null
    degree?: StringNullableWithAggregatesFilter<"User"> | string | null
    department?: StringNullableWithAggregatesFilter<"User"> | string | null
    expectedGraduation?: StringNullableWithAggregatesFilter<"User"> | string | null
    email?: StringNullableWithAggregatesFilter<"User"> | string | null
    linkedin?: StringNullableWithAggregatesFilter<"User"> | string | null
    github?: StringNullableWithAggregatesFilter<"User"> | string | null
    portfolio?: StringNullableWithAggregatesFilter<"User"> | string | null
    country?: StringNullableWithAggregatesFilter<"User"> | string | null
    preferredResearchAreas?: StringNullableWithAggregatesFilter<"User"> | string | null
    targetCountries?: StringNullableWithAggregatesFilter<"User"> | string | null
    internshipDuration?: StringNullableWithAggregatesFilter<"User"> | string | null
    preferredStartMonth?: StringNullableWithAggregatesFilter<"User"> | string | null
    skills?: StringNullableWithAggregatesFilter<"User"> | string | null
    programmingLanguages?: StringNullableWithAggregatesFilter<"User"> | string | null
    frameworks?: StringNullableWithAggregatesFilter<"User"> | string | null
    researchExperience?: StringNullableWithAggregatesFilter<"User"> | string | null
    projects?: StringNullableWithAggregatesFilter<"User"> | string | null
    leadershipRoles?: StringNullableWithAggregatesFilter<"User"> | string | null
    awards?: StringNullableWithAggregatesFilter<"User"> | string | null
    workExperience?: StringNullableWithAggregatesFilter<"User"> | string | null
    publications?: StringNullableWithAggregatesFilter<"User"> | string | null
    researchInterests?: StringNullableWithAggregatesFilter<"User"> | string | null
    technicalStack?: StringNullableWithAggregatesFilter<"User"> | string | null
    domainExpertise?: StringNullableWithAggregatesFilter<"User"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
  }

  export type ProfessorWhereInput = {
    AND?: ProfessorWhereInput | ProfessorWhereInput[]
    OR?: ProfessorWhereInput[]
    NOT?: ProfessorWhereInput | ProfessorWhereInput[]
    id?: StringFilter<"Professor"> | string
    name?: StringNullableFilter<"Professor"> | string | null
    university?: StringNullableFilter<"Professor"> | string | null
    department?: StringNullableFilter<"Professor"> | string | null
    country?: StringNullableFilter<"Professor"> | string | null
    email?: StringNullableFilter<"Professor"> | string | null
    emailStatus?: StringFilter<"Professor"> | string
    emailSource?: StringNullableFilter<"Professor"> | string | null
    emailSourceUrl?: StringNullableFilter<"Professor"> | string | null
    emailConfidence?: IntNullableFilter<"Professor"> | number | null
    emailLastChecked?: DateTimeNullableFilter<"Professor"> | Date | string | null
    position?: StringNullableFilter<"Professor"> | string | null
    homepage?: StringNullableFilter<"Professor"> | string | null
    lab?: StringNullableFilter<"Professor"> | string | null
    rawScrapedText?: StringNullableFilter<"Professor"> | string | null
    primaryAreas?: StringNullableFilter<"Professor"> | string | null
    currentThemes?: StringNullableFilter<"Professor"> | string | null
    keywords?: StringNullableFilter<"Professor"> | string | null
    openProblems?: StringNullableFilter<"Professor"> | string | null
    latestPublications?: StringNullableFilter<"Professor"> | string | null
    mostCitedPublications?: StringNullableFilter<"Professor"> | string | null
    topicsOverTime?: StringNullableFilter<"Professor"> | string | null
    currentProjects?: StringNullableFilter<"Professor"> | string | null
    collaborators?: StringNullableFilter<"Professor"> | string | null
    phdStudents?: StringNullableFilter<"Professor"> | string | null
    fundingSources?: StringNullableFilter<"Professor"> | string | null
    openPositions?: StringNullableFilter<"Professor"> | string | null
    aiAnalysisSummary?: StringNullableFilter<"Professor"> | string | null
    status?: StringFilter<"Professor"> | string
    compatibilityScore?: IntNullableFilter<"Professor"> | number | null
    compatibilityReasoning?: StringNullableFilter<"Professor"> | string | null
    dateSent?: DateTimeNullableFilter<"Professor"> | Date | string | null
    subject?: StringNullableFilter<"Professor"> | string | null
    tags?: StringNullableFilter<"Professor"> | string | null
    notes?: StringNullableFilter<"Professor"> | string | null
    createdAt?: DateTimeFilter<"Professor"> | Date | string
    updatedAt?: DateTimeFilter<"Professor"> | Date | string
    userId?: StringNullableFilter<"Professor"> | string | null
    user?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
  }

  export type ProfessorOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrderInput | SortOrder
    university?: SortOrderInput | SortOrder
    department?: SortOrderInput | SortOrder
    country?: SortOrderInput | SortOrder
    email?: SortOrderInput | SortOrder
    emailStatus?: SortOrder
    emailSource?: SortOrderInput | SortOrder
    emailSourceUrl?: SortOrderInput | SortOrder
    emailConfidence?: SortOrderInput | SortOrder
    emailLastChecked?: SortOrderInput | SortOrder
    position?: SortOrderInput | SortOrder
    homepage?: SortOrderInput | SortOrder
    lab?: SortOrderInput | SortOrder
    rawScrapedText?: SortOrderInput | SortOrder
    primaryAreas?: SortOrderInput | SortOrder
    currentThemes?: SortOrderInput | SortOrder
    keywords?: SortOrderInput | SortOrder
    openProblems?: SortOrderInput | SortOrder
    latestPublications?: SortOrderInput | SortOrder
    mostCitedPublications?: SortOrderInput | SortOrder
    topicsOverTime?: SortOrderInput | SortOrder
    currentProjects?: SortOrderInput | SortOrder
    collaborators?: SortOrderInput | SortOrder
    phdStudents?: SortOrderInput | SortOrder
    fundingSources?: SortOrderInput | SortOrder
    openPositions?: SortOrderInput | SortOrder
    aiAnalysisSummary?: SortOrderInput | SortOrder
    status?: SortOrder
    compatibilityScore?: SortOrderInput | SortOrder
    compatibilityReasoning?: SortOrderInput | SortOrder
    dateSent?: SortOrderInput | SortOrder
    subject?: SortOrderInput | SortOrder
    tags?: SortOrderInput | SortOrder
    notes?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    userId?: SortOrderInput | SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type ProfessorWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ProfessorWhereInput | ProfessorWhereInput[]
    OR?: ProfessorWhereInput[]
    NOT?: ProfessorWhereInput | ProfessorWhereInput[]
    name?: StringNullableFilter<"Professor"> | string | null
    university?: StringNullableFilter<"Professor"> | string | null
    department?: StringNullableFilter<"Professor"> | string | null
    country?: StringNullableFilter<"Professor"> | string | null
    email?: StringNullableFilter<"Professor"> | string | null
    emailStatus?: StringFilter<"Professor"> | string
    emailSource?: StringNullableFilter<"Professor"> | string | null
    emailSourceUrl?: StringNullableFilter<"Professor"> | string | null
    emailConfidence?: IntNullableFilter<"Professor"> | number | null
    emailLastChecked?: DateTimeNullableFilter<"Professor"> | Date | string | null
    position?: StringNullableFilter<"Professor"> | string | null
    homepage?: StringNullableFilter<"Professor"> | string | null
    lab?: StringNullableFilter<"Professor"> | string | null
    rawScrapedText?: StringNullableFilter<"Professor"> | string | null
    primaryAreas?: StringNullableFilter<"Professor"> | string | null
    currentThemes?: StringNullableFilter<"Professor"> | string | null
    keywords?: StringNullableFilter<"Professor"> | string | null
    openProblems?: StringNullableFilter<"Professor"> | string | null
    latestPublications?: StringNullableFilter<"Professor"> | string | null
    mostCitedPublications?: StringNullableFilter<"Professor"> | string | null
    topicsOverTime?: StringNullableFilter<"Professor"> | string | null
    currentProjects?: StringNullableFilter<"Professor"> | string | null
    collaborators?: StringNullableFilter<"Professor"> | string | null
    phdStudents?: StringNullableFilter<"Professor"> | string | null
    fundingSources?: StringNullableFilter<"Professor"> | string | null
    openPositions?: StringNullableFilter<"Professor"> | string | null
    aiAnalysisSummary?: StringNullableFilter<"Professor"> | string | null
    status?: StringFilter<"Professor"> | string
    compatibilityScore?: IntNullableFilter<"Professor"> | number | null
    compatibilityReasoning?: StringNullableFilter<"Professor"> | string | null
    dateSent?: DateTimeNullableFilter<"Professor"> | Date | string | null
    subject?: StringNullableFilter<"Professor"> | string | null
    tags?: StringNullableFilter<"Professor"> | string | null
    notes?: StringNullableFilter<"Professor"> | string | null
    createdAt?: DateTimeFilter<"Professor"> | Date | string
    updatedAt?: DateTimeFilter<"Professor"> | Date | string
    userId?: StringNullableFilter<"Professor"> | string | null
    user?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
  }, "id">

  export type ProfessorOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrderInput | SortOrder
    university?: SortOrderInput | SortOrder
    department?: SortOrderInput | SortOrder
    country?: SortOrderInput | SortOrder
    email?: SortOrderInput | SortOrder
    emailStatus?: SortOrder
    emailSource?: SortOrderInput | SortOrder
    emailSourceUrl?: SortOrderInput | SortOrder
    emailConfidence?: SortOrderInput | SortOrder
    emailLastChecked?: SortOrderInput | SortOrder
    position?: SortOrderInput | SortOrder
    homepage?: SortOrderInput | SortOrder
    lab?: SortOrderInput | SortOrder
    rawScrapedText?: SortOrderInput | SortOrder
    primaryAreas?: SortOrderInput | SortOrder
    currentThemes?: SortOrderInput | SortOrder
    keywords?: SortOrderInput | SortOrder
    openProblems?: SortOrderInput | SortOrder
    latestPublications?: SortOrderInput | SortOrder
    mostCitedPublications?: SortOrderInput | SortOrder
    topicsOverTime?: SortOrderInput | SortOrder
    currentProjects?: SortOrderInput | SortOrder
    collaborators?: SortOrderInput | SortOrder
    phdStudents?: SortOrderInput | SortOrder
    fundingSources?: SortOrderInput | SortOrder
    openPositions?: SortOrderInput | SortOrder
    aiAnalysisSummary?: SortOrderInput | SortOrder
    status?: SortOrder
    compatibilityScore?: SortOrderInput | SortOrder
    compatibilityReasoning?: SortOrderInput | SortOrder
    dateSent?: SortOrderInput | SortOrder
    subject?: SortOrderInput | SortOrder
    tags?: SortOrderInput | SortOrder
    notes?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    userId?: SortOrderInput | SortOrder
    _count?: ProfessorCountOrderByAggregateInput
    _avg?: ProfessorAvgOrderByAggregateInput
    _max?: ProfessorMaxOrderByAggregateInput
    _min?: ProfessorMinOrderByAggregateInput
    _sum?: ProfessorSumOrderByAggregateInput
  }

  export type ProfessorScalarWhereWithAggregatesInput = {
    AND?: ProfessorScalarWhereWithAggregatesInput | ProfessorScalarWhereWithAggregatesInput[]
    OR?: ProfessorScalarWhereWithAggregatesInput[]
    NOT?: ProfessorScalarWhereWithAggregatesInput | ProfessorScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Professor"> | string
    name?: StringNullableWithAggregatesFilter<"Professor"> | string | null
    university?: StringNullableWithAggregatesFilter<"Professor"> | string | null
    department?: StringNullableWithAggregatesFilter<"Professor"> | string | null
    country?: StringNullableWithAggregatesFilter<"Professor"> | string | null
    email?: StringNullableWithAggregatesFilter<"Professor"> | string | null
    emailStatus?: StringWithAggregatesFilter<"Professor"> | string
    emailSource?: StringNullableWithAggregatesFilter<"Professor"> | string | null
    emailSourceUrl?: StringNullableWithAggregatesFilter<"Professor"> | string | null
    emailConfidence?: IntNullableWithAggregatesFilter<"Professor"> | number | null
    emailLastChecked?: DateTimeNullableWithAggregatesFilter<"Professor"> | Date | string | null
    position?: StringNullableWithAggregatesFilter<"Professor"> | string | null
    homepage?: StringNullableWithAggregatesFilter<"Professor"> | string | null
    lab?: StringNullableWithAggregatesFilter<"Professor"> | string | null
    rawScrapedText?: StringNullableWithAggregatesFilter<"Professor"> | string | null
    primaryAreas?: StringNullableWithAggregatesFilter<"Professor"> | string | null
    currentThemes?: StringNullableWithAggregatesFilter<"Professor"> | string | null
    keywords?: StringNullableWithAggregatesFilter<"Professor"> | string | null
    openProblems?: StringNullableWithAggregatesFilter<"Professor"> | string | null
    latestPublications?: StringNullableWithAggregatesFilter<"Professor"> | string | null
    mostCitedPublications?: StringNullableWithAggregatesFilter<"Professor"> | string | null
    topicsOverTime?: StringNullableWithAggregatesFilter<"Professor"> | string | null
    currentProjects?: StringNullableWithAggregatesFilter<"Professor"> | string | null
    collaborators?: StringNullableWithAggregatesFilter<"Professor"> | string | null
    phdStudents?: StringNullableWithAggregatesFilter<"Professor"> | string | null
    fundingSources?: StringNullableWithAggregatesFilter<"Professor"> | string | null
    openPositions?: StringNullableWithAggregatesFilter<"Professor"> | string | null
    aiAnalysisSummary?: StringNullableWithAggregatesFilter<"Professor"> | string | null
    status?: StringWithAggregatesFilter<"Professor"> | string
    compatibilityScore?: IntNullableWithAggregatesFilter<"Professor"> | number | null
    compatibilityReasoning?: StringNullableWithAggregatesFilter<"Professor"> | string | null
    dateSent?: DateTimeNullableWithAggregatesFilter<"Professor"> | Date | string | null
    subject?: StringNullableWithAggregatesFilter<"Professor"> | string | null
    tags?: StringNullableWithAggregatesFilter<"Professor"> | string | null
    notes?: StringNullableWithAggregatesFilter<"Professor"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Professor"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Professor"> | Date | string
    userId?: StringNullableWithAggregatesFilter<"Professor"> | string | null
  }

  export type UserCreateInput = {
    id?: string
    name?: string | null
    university?: string | null
    degree?: string | null
    department?: string | null
    expectedGraduation?: string | null
    email?: string | null
    linkedin?: string | null
    github?: string | null
    portfolio?: string | null
    country?: string | null
    preferredResearchAreas?: string | null
    targetCountries?: string | null
    internshipDuration?: string | null
    preferredStartMonth?: string | null
    skills?: string | null
    programmingLanguages?: string | null
    frameworks?: string | null
    researchExperience?: string | null
    projects?: string | null
    leadershipRoles?: string | null
    awards?: string | null
    workExperience?: string | null
    publications?: string | null
    researchInterests?: string | null
    technicalStack?: string | null
    domainExpertise?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    professors?: ProfessorCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateInput = {
    id?: string
    name?: string | null
    university?: string | null
    degree?: string | null
    department?: string | null
    expectedGraduation?: string | null
    email?: string | null
    linkedin?: string | null
    github?: string | null
    portfolio?: string | null
    country?: string | null
    preferredResearchAreas?: string | null
    targetCountries?: string | null
    internshipDuration?: string | null
    preferredStartMonth?: string | null
    skills?: string | null
    programmingLanguages?: string | null
    frameworks?: string | null
    researchExperience?: string | null
    projects?: string | null
    leadershipRoles?: string | null
    awards?: string | null
    workExperience?: string | null
    publications?: string | null
    researchInterests?: string | null
    technicalStack?: string | null
    domainExpertise?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    professors?: ProfessorUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    university?: NullableStringFieldUpdateOperationsInput | string | null
    degree?: NullableStringFieldUpdateOperationsInput | string | null
    department?: NullableStringFieldUpdateOperationsInput | string | null
    expectedGraduation?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    linkedin?: NullableStringFieldUpdateOperationsInput | string | null
    github?: NullableStringFieldUpdateOperationsInput | string | null
    portfolio?: NullableStringFieldUpdateOperationsInput | string | null
    country?: NullableStringFieldUpdateOperationsInput | string | null
    preferredResearchAreas?: NullableStringFieldUpdateOperationsInput | string | null
    targetCountries?: NullableStringFieldUpdateOperationsInput | string | null
    internshipDuration?: NullableStringFieldUpdateOperationsInput | string | null
    preferredStartMonth?: NullableStringFieldUpdateOperationsInput | string | null
    skills?: NullableStringFieldUpdateOperationsInput | string | null
    programmingLanguages?: NullableStringFieldUpdateOperationsInput | string | null
    frameworks?: NullableStringFieldUpdateOperationsInput | string | null
    researchExperience?: NullableStringFieldUpdateOperationsInput | string | null
    projects?: NullableStringFieldUpdateOperationsInput | string | null
    leadershipRoles?: NullableStringFieldUpdateOperationsInput | string | null
    awards?: NullableStringFieldUpdateOperationsInput | string | null
    workExperience?: NullableStringFieldUpdateOperationsInput | string | null
    publications?: NullableStringFieldUpdateOperationsInput | string | null
    researchInterests?: NullableStringFieldUpdateOperationsInput | string | null
    technicalStack?: NullableStringFieldUpdateOperationsInput | string | null
    domainExpertise?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    professors?: ProfessorUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    university?: NullableStringFieldUpdateOperationsInput | string | null
    degree?: NullableStringFieldUpdateOperationsInput | string | null
    department?: NullableStringFieldUpdateOperationsInput | string | null
    expectedGraduation?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    linkedin?: NullableStringFieldUpdateOperationsInput | string | null
    github?: NullableStringFieldUpdateOperationsInput | string | null
    portfolio?: NullableStringFieldUpdateOperationsInput | string | null
    country?: NullableStringFieldUpdateOperationsInput | string | null
    preferredResearchAreas?: NullableStringFieldUpdateOperationsInput | string | null
    targetCountries?: NullableStringFieldUpdateOperationsInput | string | null
    internshipDuration?: NullableStringFieldUpdateOperationsInput | string | null
    preferredStartMonth?: NullableStringFieldUpdateOperationsInput | string | null
    skills?: NullableStringFieldUpdateOperationsInput | string | null
    programmingLanguages?: NullableStringFieldUpdateOperationsInput | string | null
    frameworks?: NullableStringFieldUpdateOperationsInput | string | null
    researchExperience?: NullableStringFieldUpdateOperationsInput | string | null
    projects?: NullableStringFieldUpdateOperationsInput | string | null
    leadershipRoles?: NullableStringFieldUpdateOperationsInput | string | null
    awards?: NullableStringFieldUpdateOperationsInput | string | null
    workExperience?: NullableStringFieldUpdateOperationsInput | string | null
    publications?: NullableStringFieldUpdateOperationsInput | string | null
    researchInterests?: NullableStringFieldUpdateOperationsInput | string | null
    technicalStack?: NullableStringFieldUpdateOperationsInput | string | null
    domainExpertise?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    professors?: ProfessorUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateManyInput = {
    id?: string
    name?: string | null
    university?: string | null
    degree?: string | null
    department?: string | null
    expectedGraduation?: string | null
    email?: string | null
    linkedin?: string | null
    github?: string | null
    portfolio?: string | null
    country?: string | null
    preferredResearchAreas?: string | null
    targetCountries?: string | null
    internshipDuration?: string | null
    preferredStartMonth?: string | null
    skills?: string | null
    programmingLanguages?: string | null
    frameworks?: string | null
    researchExperience?: string | null
    projects?: string | null
    leadershipRoles?: string | null
    awards?: string | null
    workExperience?: string | null
    publications?: string | null
    researchInterests?: string | null
    technicalStack?: string | null
    domainExpertise?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    university?: NullableStringFieldUpdateOperationsInput | string | null
    degree?: NullableStringFieldUpdateOperationsInput | string | null
    department?: NullableStringFieldUpdateOperationsInput | string | null
    expectedGraduation?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    linkedin?: NullableStringFieldUpdateOperationsInput | string | null
    github?: NullableStringFieldUpdateOperationsInput | string | null
    portfolio?: NullableStringFieldUpdateOperationsInput | string | null
    country?: NullableStringFieldUpdateOperationsInput | string | null
    preferredResearchAreas?: NullableStringFieldUpdateOperationsInput | string | null
    targetCountries?: NullableStringFieldUpdateOperationsInput | string | null
    internshipDuration?: NullableStringFieldUpdateOperationsInput | string | null
    preferredStartMonth?: NullableStringFieldUpdateOperationsInput | string | null
    skills?: NullableStringFieldUpdateOperationsInput | string | null
    programmingLanguages?: NullableStringFieldUpdateOperationsInput | string | null
    frameworks?: NullableStringFieldUpdateOperationsInput | string | null
    researchExperience?: NullableStringFieldUpdateOperationsInput | string | null
    projects?: NullableStringFieldUpdateOperationsInput | string | null
    leadershipRoles?: NullableStringFieldUpdateOperationsInput | string | null
    awards?: NullableStringFieldUpdateOperationsInput | string | null
    workExperience?: NullableStringFieldUpdateOperationsInput | string | null
    publications?: NullableStringFieldUpdateOperationsInput | string | null
    researchInterests?: NullableStringFieldUpdateOperationsInput | string | null
    technicalStack?: NullableStringFieldUpdateOperationsInput | string | null
    domainExpertise?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    university?: NullableStringFieldUpdateOperationsInput | string | null
    degree?: NullableStringFieldUpdateOperationsInput | string | null
    department?: NullableStringFieldUpdateOperationsInput | string | null
    expectedGraduation?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    linkedin?: NullableStringFieldUpdateOperationsInput | string | null
    github?: NullableStringFieldUpdateOperationsInput | string | null
    portfolio?: NullableStringFieldUpdateOperationsInput | string | null
    country?: NullableStringFieldUpdateOperationsInput | string | null
    preferredResearchAreas?: NullableStringFieldUpdateOperationsInput | string | null
    targetCountries?: NullableStringFieldUpdateOperationsInput | string | null
    internshipDuration?: NullableStringFieldUpdateOperationsInput | string | null
    preferredStartMonth?: NullableStringFieldUpdateOperationsInput | string | null
    skills?: NullableStringFieldUpdateOperationsInput | string | null
    programmingLanguages?: NullableStringFieldUpdateOperationsInput | string | null
    frameworks?: NullableStringFieldUpdateOperationsInput | string | null
    researchExperience?: NullableStringFieldUpdateOperationsInput | string | null
    projects?: NullableStringFieldUpdateOperationsInput | string | null
    leadershipRoles?: NullableStringFieldUpdateOperationsInput | string | null
    awards?: NullableStringFieldUpdateOperationsInput | string | null
    workExperience?: NullableStringFieldUpdateOperationsInput | string | null
    publications?: NullableStringFieldUpdateOperationsInput | string | null
    researchInterests?: NullableStringFieldUpdateOperationsInput | string | null
    technicalStack?: NullableStringFieldUpdateOperationsInput | string | null
    domainExpertise?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProfessorCreateInput = {
    id?: string
    name?: string | null
    university?: string | null
    department?: string | null
    country?: string | null
    email?: string | null
    emailStatus?: string
    emailSource?: string | null
    emailSourceUrl?: string | null
    emailConfidence?: number | null
    emailLastChecked?: Date | string | null
    position?: string | null
    homepage?: string | null
    lab?: string | null
    rawScrapedText?: string | null
    primaryAreas?: string | null
    currentThemes?: string | null
    keywords?: string | null
    openProblems?: string | null
    latestPublications?: string | null
    mostCitedPublications?: string | null
    topicsOverTime?: string | null
    currentProjects?: string | null
    collaborators?: string | null
    phdStudents?: string | null
    fundingSources?: string | null
    openPositions?: string | null
    aiAnalysisSummary?: string | null
    status?: string
    compatibilityScore?: number | null
    compatibilityReasoning?: string | null
    dateSent?: Date | string | null
    subject?: string | null
    tags?: string | null
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    user?: UserCreateNestedOneWithoutProfessorsInput
  }

  export type ProfessorUncheckedCreateInput = {
    id?: string
    name?: string | null
    university?: string | null
    department?: string | null
    country?: string | null
    email?: string | null
    emailStatus?: string
    emailSource?: string | null
    emailSourceUrl?: string | null
    emailConfidence?: number | null
    emailLastChecked?: Date | string | null
    position?: string | null
    homepage?: string | null
    lab?: string | null
    rawScrapedText?: string | null
    primaryAreas?: string | null
    currentThemes?: string | null
    keywords?: string | null
    openProblems?: string | null
    latestPublications?: string | null
    mostCitedPublications?: string | null
    topicsOverTime?: string | null
    currentProjects?: string | null
    collaborators?: string | null
    phdStudents?: string | null
    fundingSources?: string | null
    openPositions?: string | null
    aiAnalysisSummary?: string | null
    status?: string
    compatibilityScore?: number | null
    compatibilityReasoning?: string | null
    dateSent?: Date | string | null
    subject?: string | null
    tags?: string | null
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    userId?: string | null
  }

  export type ProfessorUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    university?: NullableStringFieldUpdateOperationsInput | string | null
    department?: NullableStringFieldUpdateOperationsInput | string | null
    country?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    emailStatus?: StringFieldUpdateOperationsInput | string
    emailSource?: NullableStringFieldUpdateOperationsInput | string | null
    emailSourceUrl?: NullableStringFieldUpdateOperationsInput | string | null
    emailConfidence?: NullableIntFieldUpdateOperationsInput | number | null
    emailLastChecked?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    position?: NullableStringFieldUpdateOperationsInput | string | null
    homepage?: NullableStringFieldUpdateOperationsInput | string | null
    lab?: NullableStringFieldUpdateOperationsInput | string | null
    rawScrapedText?: NullableStringFieldUpdateOperationsInput | string | null
    primaryAreas?: NullableStringFieldUpdateOperationsInput | string | null
    currentThemes?: NullableStringFieldUpdateOperationsInput | string | null
    keywords?: NullableStringFieldUpdateOperationsInput | string | null
    openProblems?: NullableStringFieldUpdateOperationsInput | string | null
    latestPublications?: NullableStringFieldUpdateOperationsInput | string | null
    mostCitedPublications?: NullableStringFieldUpdateOperationsInput | string | null
    topicsOverTime?: NullableStringFieldUpdateOperationsInput | string | null
    currentProjects?: NullableStringFieldUpdateOperationsInput | string | null
    collaborators?: NullableStringFieldUpdateOperationsInput | string | null
    phdStudents?: NullableStringFieldUpdateOperationsInput | string | null
    fundingSources?: NullableStringFieldUpdateOperationsInput | string | null
    openPositions?: NullableStringFieldUpdateOperationsInput | string | null
    aiAnalysisSummary?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    compatibilityScore?: NullableIntFieldUpdateOperationsInput | number | null
    compatibilityReasoning?: NullableStringFieldUpdateOperationsInput | string | null
    dateSent?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    subject?: NullableStringFieldUpdateOperationsInput | string | null
    tags?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneWithoutProfessorsNestedInput
  }

  export type ProfessorUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    university?: NullableStringFieldUpdateOperationsInput | string | null
    department?: NullableStringFieldUpdateOperationsInput | string | null
    country?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    emailStatus?: StringFieldUpdateOperationsInput | string
    emailSource?: NullableStringFieldUpdateOperationsInput | string | null
    emailSourceUrl?: NullableStringFieldUpdateOperationsInput | string | null
    emailConfidence?: NullableIntFieldUpdateOperationsInput | number | null
    emailLastChecked?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    position?: NullableStringFieldUpdateOperationsInput | string | null
    homepage?: NullableStringFieldUpdateOperationsInput | string | null
    lab?: NullableStringFieldUpdateOperationsInput | string | null
    rawScrapedText?: NullableStringFieldUpdateOperationsInput | string | null
    primaryAreas?: NullableStringFieldUpdateOperationsInput | string | null
    currentThemes?: NullableStringFieldUpdateOperationsInput | string | null
    keywords?: NullableStringFieldUpdateOperationsInput | string | null
    openProblems?: NullableStringFieldUpdateOperationsInput | string | null
    latestPublications?: NullableStringFieldUpdateOperationsInput | string | null
    mostCitedPublications?: NullableStringFieldUpdateOperationsInput | string | null
    topicsOverTime?: NullableStringFieldUpdateOperationsInput | string | null
    currentProjects?: NullableStringFieldUpdateOperationsInput | string | null
    collaborators?: NullableStringFieldUpdateOperationsInput | string | null
    phdStudents?: NullableStringFieldUpdateOperationsInput | string | null
    fundingSources?: NullableStringFieldUpdateOperationsInput | string | null
    openPositions?: NullableStringFieldUpdateOperationsInput | string | null
    aiAnalysisSummary?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    compatibilityScore?: NullableIntFieldUpdateOperationsInput | number | null
    compatibilityReasoning?: NullableStringFieldUpdateOperationsInput | string | null
    dateSent?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    subject?: NullableStringFieldUpdateOperationsInput | string | null
    tags?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ProfessorCreateManyInput = {
    id?: string
    name?: string | null
    university?: string | null
    department?: string | null
    country?: string | null
    email?: string | null
    emailStatus?: string
    emailSource?: string | null
    emailSourceUrl?: string | null
    emailConfidence?: number | null
    emailLastChecked?: Date | string | null
    position?: string | null
    homepage?: string | null
    lab?: string | null
    rawScrapedText?: string | null
    primaryAreas?: string | null
    currentThemes?: string | null
    keywords?: string | null
    openProblems?: string | null
    latestPublications?: string | null
    mostCitedPublications?: string | null
    topicsOverTime?: string | null
    currentProjects?: string | null
    collaborators?: string | null
    phdStudents?: string | null
    fundingSources?: string | null
    openPositions?: string | null
    aiAnalysisSummary?: string | null
    status?: string
    compatibilityScore?: number | null
    compatibilityReasoning?: string | null
    dateSent?: Date | string | null
    subject?: string | null
    tags?: string | null
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    userId?: string | null
  }

  export type ProfessorUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    university?: NullableStringFieldUpdateOperationsInput | string | null
    department?: NullableStringFieldUpdateOperationsInput | string | null
    country?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    emailStatus?: StringFieldUpdateOperationsInput | string
    emailSource?: NullableStringFieldUpdateOperationsInput | string | null
    emailSourceUrl?: NullableStringFieldUpdateOperationsInput | string | null
    emailConfidence?: NullableIntFieldUpdateOperationsInput | number | null
    emailLastChecked?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    position?: NullableStringFieldUpdateOperationsInput | string | null
    homepage?: NullableStringFieldUpdateOperationsInput | string | null
    lab?: NullableStringFieldUpdateOperationsInput | string | null
    rawScrapedText?: NullableStringFieldUpdateOperationsInput | string | null
    primaryAreas?: NullableStringFieldUpdateOperationsInput | string | null
    currentThemes?: NullableStringFieldUpdateOperationsInput | string | null
    keywords?: NullableStringFieldUpdateOperationsInput | string | null
    openProblems?: NullableStringFieldUpdateOperationsInput | string | null
    latestPublications?: NullableStringFieldUpdateOperationsInput | string | null
    mostCitedPublications?: NullableStringFieldUpdateOperationsInput | string | null
    topicsOverTime?: NullableStringFieldUpdateOperationsInput | string | null
    currentProjects?: NullableStringFieldUpdateOperationsInput | string | null
    collaborators?: NullableStringFieldUpdateOperationsInput | string | null
    phdStudents?: NullableStringFieldUpdateOperationsInput | string | null
    fundingSources?: NullableStringFieldUpdateOperationsInput | string | null
    openPositions?: NullableStringFieldUpdateOperationsInput | string | null
    aiAnalysisSummary?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    compatibilityScore?: NullableIntFieldUpdateOperationsInput | number | null
    compatibilityReasoning?: NullableStringFieldUpdateOperationsInput | string | null
    dateSent?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    subject?: NullableStringFieldUpdateOperationsInput | string | null
    tags?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProfessorUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    university?: NullableStringFieldUpdateOperationsInput | string | null
    department?: NullableStringFieldUpdateOperationsInput | string | null
    country?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    emailStatus?: StringFieldUpdateOperationsInput | string
    emailSource?: NullableStringFieldUpdateOperationsInput | string | null
    emailSourceUrl?: NullableStringFieldUpdateOperationsInput | string | null
    emailConfidence?: NullableIntFieldUpdateOperationsInput | number | null
    emailLastChecked?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    position?: NullableStringFieldUpdateOperationsInput | string | null
    homepage?: NullableStringFieldUpdateOperationsInput | string | null
    lab?: NullableStringFieldUpdateOperationsInput | string | null
    rawScrapedText?: NullableStringFieldUpdateOperationsInput | string | null
    primaryAreas?: NullableStringFieldUpdateOperationsInput | string | null
    currentThemes?: NullableStringFieldUpdateOperationsInput | string | null
    keywords?: NullableStringFieldUpdateOperationsInput | string | null
    openProblems?: NullableStringFieldUpdateOperationsInput | string | null
    latestPublications?: NullableStringFieldUpdateOperationsInput | string | null
    mostCitedPublications?: NullableStringFieldUpdateOperationsInput | string | null
    topicsOverTime?: NullableStringFieldUpdateOperationsInput | string | null
    currentProjects?: NullableStringFieldUpdateOperationsInput | string | null
    collaborators?: NullableStringFieldUpdateOperationsInput | string | null
    phdStudents?: NullableStringFieldUpdateOperationsInput | string | null
    fundingSources?: NullableStringFieldUpdateOperationsInput | string | null
    openPositions?: NullableStringFieldUpdateOperationsInput | string | null
    aiAnalysisSummary?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    compatibilityScore?: NullableIntFieldUpdateOperationsInput | number | null
    compatibilityReasoning?: NullableStringFieldUpdateOperationsInput | string | null
    dateSent?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    subject?: NullableStringFieldUpdateOperationsInput | string | null
    tags?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type ProfessorListRelationFilter = {
    every?: ProfessorWhereInput
    some?: ProfessorWhereInput
    none?: ProfessorWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type ProfessorOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    university?: SortOrder
    degree?: SortOrder
    department?: SortOrder
    expectedGraduation?: SortOrder
    email?: SortOrder
    linkedin?: SortOrder
    github?: SortOrder
    portfolio?: SortOrder
    country?: SortOrder
    preferredResearchAreas?: SortOrder
    targetCountries?: SortOrder
    internshipDuration?: SortOrder
    preferredStartMonth?: SortOrder
    skills?: SortOrder
    programmingLanguages?: SortOrder
    frameworks?: SortOrder
    researchExperience?: SortOrder
    projects?: SortOrder
    leadershipRoles?: SortOrder
    awards?: SortOrder
    workExperience?: SortOrder
    publications?: SortOrder
    researchInterests?: SortOrder
    technicalStack?: SortOrder
    domainExpertise?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    university?: SortOrder
    degree?: SortOrder
    department?: SortOrder
    expectedGraduation?: SortOrder
    email?: SortOrder
    linkedin?: SortOrder
    github?: SortOrder
    portfolio?: SortOrder
    country?: SortOrder
    preferredResearchAreas?: SortOrder
    targetCountries?: SortOrder
    internshipDuration?: SortOrder
    preferredStartMonth?: SortOrder
    skills?: SortOrder
    programmingLanguages?: SortOrder
    frameworks?: SortOrder
    researchExperience?: SortOrder
    projects?: SortOrder
    leadershipRoles?: SortOrder
    awards?: SortOrder
    workExperience?: SortOrder
    publications?: SortOrder
    researchInterests?: SortOrder
    technicalStack?: SortOrder
    domainExpertise?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    university?: SortOrder
    degree?: SortOrder
    department?: SortOrder
    expectedGraduation?: SortOrder
    email?: SortOrder
    linkedin?: SortOrder
    github?: SortOrder
    portfolio?: SortOrder
    country?: SortOrder
    preferredResearchAreas?: SortOrder
    targetCountries?: SortOrder
    internshipDuration?: SortOrder
    preferredStartMonth?: SortOrder
    skills?: SortOrder
    programmingLanguages?: SortOrder
    frameworks?: SortOrder
    researchExperience?: SortOrder
    projects?: SortOrder
    leadershipRoles?: SortOrder
    awards?: SortOrder
    workExperience?: SortOrder
    publications?: SortOrder
    researchInterests?: SortOrder
    technicalStack?: SortOrder
    domainExpertise?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type UserNullableScalarRelationFilter = {
    is?: UserWhereInput | null
    isNot?: UserWhereInput | null
  }

  export type ProfessorCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    university?: SortOrder
    department?: SortOrder
    country?: SortOrder
    email?: SortOrder
    emailStatus?: SortOrder
    emailSource?: SortOrder
    emailSourceUrl?: SortOrder
    emailConfidence?: SortOrder
    emailLastChecked?: SortOrder
    position?: SortOrder
    homepage?: SortOrder
    lab?: SortOrder
    rawScrapedText?: SortOrder
    primaryAreas?: SortOrder
    currentThemes?: SortOrder
    keywords?: SortOrder
    openProblems?: SortOrder
    latestPublications?: SortOrder
    mostCitedPublications?: SortOrder
    topicsOverTime?: SortOrder
    currentProjects?: SortOrder
    collaborators?: SortOrder
    phdStudents?: SortOrder
    fundingSources?: SortOrder
    openPositions?: SortOrder
    aiAnalysisSummary?: SortOrder
    status?: SortOrder
    compatibilityScore?: SortOrder
    compatibilityReasoning?: SortOrder
    dateSent?: SortOrder
    subject?: SortOrder
    tags?: SortOrder
    notes?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    userId?: SortOrder
  }

  export type ProfessorAvgOrderByAggregateInput = {
    emailConfidence?: SortOrder
    compatibilityScore?: SortOrder
  }

  export type ProfessorMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    university?: SortOrder
    department?: SortOrder
    country?: SortOrder
    email?: SortOrder
    emailStatus?: SortOrder
    emailSource?: SortOrder
    emailSourceUrl?: SortOrder
    emailConfidence?: SortOrder
    emailLastChecked?: SortOrder
    position?: SortOrder
    homepage?: SortOrder
    lab?: SortOrder
    rawScrapedText?: SortOrder
    primaryAreas?: SortOrder
    currentThemes?: SortOrder
    keywords?: SortOrder
    openProblems?: SortOrder
    latestPublications?: SortOrder
    mostCitedPublications?: SortOrder
    topicsOverTime?: SortOrder
    currentProjects?: SortOrder
    collaborators?: SortOrder
    phdStudents?: SortOrder
    fundingSources?: SortOrder
    openPositions?: SortOrder
    aiAnalysisSummary?: SortOrder
    status?: SortOrder
    compatibilityScore?: SortOrder
    compatibilityReasoning?: SortOrder
    dateSent?: SortOrder
    subject?: SortOrder
    tags?: SortOrder
    notes?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    userId?: SortOrder
  }

  export type ProfessorMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    university?: SortOrder
    department?: SortOrder
    country?: SortOrder
    email?: SortOrder
    emailStatus?: SortOrder
    emailSource?: SortOrder
    emailSourceUrl?: SortOrder
    emailConfidence?: SortOrder
    emailLastChecked?: SortOrder
    position?: SortOrder
    homepage?: SortOrder
    lab?: SortOrder
    rawScrapedText?: SortOrder
    primaryAreas?: SortOrder
    currentThemes?: SortOrder
    keywords?: SortOrder
    openProblems?: SortOrder
    latestPublications?: SortOrder
    mostCitedPublications?: SortOrder
    topicsOverTime?: SortOrder
    currentProjects?: SortOrder
    collaborators?: SortOrder
    phdStudents?: SortOrder
    fundingSources?: SortOrder
    openPositions?: SortOrder
    aiAnalysisSummary?: SortOrder
    status?: SortOrder
    compatibilityScore?: SortOrder
    compatibilityReasoning?: SortOrder
    dateSent?: SortOrder
    subject?: SortOrder
    tags?: SortOrder
    notes?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    userId?: SortOrder
  }

  export type ProfessorSumOrderByAggregateInput = {
    emailConfidence?: SortOrder
    compatibilityScore?: SortOrder
  }

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type ProfessorCreateNestedManyWithoutUserInput = {
    create?: XOR<ProfessorCreateWithoutUserInput, ProfessorUncheckedCreateWithoutUserInput> | ProfessorCreateWithoutUserInput[] | ProfessorUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ProfessorCreateOrConnectWithoutUserInput | ProfessorCreateOrConnectWithoutUserInput[]
    createMany?: ProfessorCreateManyUserInputEnvelope
    connect?: ProfessorWhereUniqueInput | ProfessorWhereUniqueInput[]
  }

  export type ProfessorUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<ProfessorCreateWithoutUserInput, ProfessorUncheckedCreateWithoutUserInput> | ProfessorCreateWithoutUserInput[] | ProfessorUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ProfessorCreateOrConnectWithoutUserInput | ProfessorCreateOrConnectWithoutUserInput[]
    createMany?: ProfessorCreateManyUserInputEnvelope
    connect?: ProfessorWhereUniqueInput | ProfessorWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type ProfessorUpdateManyWithoutUserNestedInput = {
    create?: XOR<ProfessorCreateWithoutUserInput, ProfessorUncheckedCreateWithoutUserInput> | ProfessorCreateWithoutUserInput[] | ProfessorUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ProfessorCreateOrConnectWithoutUserInput | ProfessorCreateOrConnectWithoutUserInput[]
    upsert?: ProfessorUpsertWithWhereUniqueWithoutUserInput | ProfessorUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: ProfessorCreateManyUserInputEnvelope
    set?: ProfessorWhereUniqueInput | ProfessorWhereUniqueInput[]
    disconnect?: ProfessorWhereUniqueInput | ProfessorWhereUniqueInput[]
    delete?: ProfessorWhereUniqueInput | ProfessorWhereUniqueInput[]
    connect?: ProfessorWhereUniqueInput | ProfessorWhereUniqueInput[]
    update?: ProfessorUpdateWithWhereUniqueWithoutUserInput | ProfessorUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: ProfessorUpdateManyWithWhereWithoutUserInput | ProfessorUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: ProfessorScalarWhereInput | ProfessorScalarWhereInput[]
  }

  export type ProfessorUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<ProfessorCreateWithoutUserInput, ProfessorUncheckedCreateWithoutUserInput> | ProfessorCreateWithoutUserInput[] | ProfessorUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ProfessorCreateOrConnectWithoutUserInput | ProfessorCreateOrConnectWithoutUserInput[]
    upsert?: ProfessorUpsertWithWhereUniqueWithoutUserInput | ProfessorUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: ProfessorCreateManyUserInputEnvelope
    set?: ProfessorWhereUniqueInput | ProfessorWhereUniqueInput[]
    disconnect?: ProfessorWhereUniqueInput | ProfessorWhereUniqueInput[]
    delete?: ProfessorWhereUniqueInput | ProfessorWhereUniqueInput[]
    connect?: ProfessorWhereUniqueInput | ProfessorWhereUniqueInput[]
    update?: ProfessorUpdateWithWhereUniqueWithoutUserInput | ProfessorUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: ProfessorUpdateManyWithWhereWithoutUserInput | ProfessorUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: ProfessorScalarWhereInput | ProfessorScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutProfessorsInput = {
    create?: XOR<UserCreateWithoutProfessorsInput, UserUncheckedCreateWithoutProfessorsInput>
    connectOrCreate?: UserCreateOrConnectWithoutProfessorsInput
    connect?: UserWhereUniqueInput
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type UserUpdateOneWithoutProfessorsNestedInput = {
    create?: XOR<UserCreateWithoutProfessorsInput, UserUncheckedCreateWithoutProfessorsInput>
    connectOrCreate?: UserCreateOrConnectWithoutProfessorsInput
    upsert?: UserUpsertWithoutProfessorsInput
    disconnect?: UserWhereInput | boolean
    delete?: UserWhereInput | boolean
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutProfessorsInput, UserUpdateWithoutProfessorsInput>, UserUncheckedUpdateWithoutProfessorsInput>
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type ProfessorCreateWithoutUserInput = {
    id?: string
    name?: string | null
    university?: string | null
    department?: string | null
    country?: string | null
    email?: string | null
    emailStatus?: string
    emailSource?: string | null
    emailSourceUrl?: string | null
    emailConfidence?: number | null
    emailLastChecked?: Date | string | null
    position?: string | null
    homepage?: string | null
    lab?: string | null
    rawScrapedText?: string | null
    primaryAreas?: string | null
    currentThemes?: string | null
    keywords?: string | null
    openProblems?: string | null
    latestPublications?: string | null
    mostCitedPublications?: string | null
    topicsOverTime?: string | null
    currentProjects?: string | null
    collaborators?: string | null
    phdStudents?: string | null
    fundingSources?: string | null
    openPositions?: string | null
    aiAnalysisSummary?: string | null
    status?: string
    compatibilityScore?: number | null
    compatibilityReasoning?: string | null
    dateSent?: Date | string | null
    subject?: string | null
    tags?: string | null
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ProfessorUncheckedCreateWithoutUserInput = {
    id?: string
    name?: string | null
    university?: string | null
    department?: string | null
    country?: string | null
    email?: string | null
    emailStatus?: string
    emailSource?: string | null
    emailSourceUrl?: string | null
    emailConfidence?: number | null
    emailLastChecked?: Date | string | null
    position?: string | null
    homepage?: string | null
    lab?: string | null
    rawScrapedText?: string | null
    primaryAreas?: string | null
    currentThemes?: string | null
    keywords?: string | null
    openProblems?: string | null
    latestPublications?: string | null
    mostCitedPublications?: string | null
    topicsOverTime?: string | null
    currentProjects?: string | null
    collaborators?: string | null
    phdStudents?: string | null
    fundingSources?: string | null
    openPositions?: string | null
    aiAnalysisSummary?: string | null
    status?: string
    compatibilityScore?: number | null
    compatibilityReasoning?: string | null
    dateSent?: Date | string | null
    subject?: string | null
    tags?: string | null
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ProfessorCreateOrConnectWithoutUserInput = {
    where: ProfessorWhereUniqueInput
    create: XOR<ProfessorCreateWithoutUserInput, ProfessorUncheckedCreateWithoutUserInput>
  }

  export type ProfessorCreateManyUserInputEnvelope = {
    data: ProfessorCreateManyUserInput | ProfessorCreateManyUserInput[]
  }

  export type ProfessorUpsertWithWhereUniqueWithoutUserInput = {
    where: ProfessorWhereUniqueInput
    update: XOR<ProfessorUpdateWithoutUserInput, ProfessorUncheckedUpdateWithoutUserInput>
    create: XOR<ProfessorCreateWithoutUserInput, ProfessorUncheckedCreateWithoutUserInput>
  }

  export type ProfessorUpdateWithWhereUniqueWithoutUserInput = {
    where: ProfessorWhereUniqueInput
    data: XOR<ProfessorUpdateWithoutUserInput, ProfessorUncheckedUpdateWithoutUserInput>
  }

  export type ProfessorUpdateManyWithWhereWithoutUserInput = {
    where: ProfessorScalarWhereInput
    data: XOR<ProfessorUpdateManyMutationInput, ProfessorUncheckedUpdateManyWithoutUserInput>
  }

  export type ProfessorScalarWhereInput = {
    AND?: ProfessorScalarWhereInput | ProfessorScalarWhereInput[]
    OR?: ProfessorScalarWhereInput[]
    NOT?: ProfessorScalarWhereInput | ProfessorScalarWhereInput[]
    id?: StringFilter<"Professor"> | string
    name?: StringNullableFilter<"Professor"> | string | null
    university?: StringNullableFilter<"Professor"> | string | null
    department?: StringNullableFilter<"Professor"> | string | null
    country?: StringNullableFilter<"Professor"> | string | null
    email?: StringNullableFilter<"Professor"> | string | null
    emailStatus?: StringFilter<"Professor"> | string
    emailSource?: StringNullableFilter<"Professor"> | string | null
    emailSourceUrl?: StringNullableFilter<"Professor"> | string | null
    emailConfidence?: IntNullableFilter<"Professor"> | number | null
    emailLastChecked?: DateTimeNullableFilter<"Professor"> | Date | string | null
    position?: StringNullableFilter<"Professor"> | string | null
    homepage?: StringNullableFilter<"Professor"> | string | null
    lab?: StringNullableFilter<"Professor"> | string | null
    rawScrapedText?: StringNullableFilter<"Professor"> | string | null
    primaryAreas?: StringNullableFilter<"Professor"> | string | null
    currentThemes?: StringNullableFilter<"Professor"> | string | null
    keywords?: StringNullableFilter<"Professor"> | string | null
    openProblems?: StringNullableFilter<"Professor"> | string | null
    latestPublications?: StringNullableFilter<"Professor"> | string | null
    mostCitedPublications?: StringNullableFilter<"Professor"> | string | null
    topicsOverTime?: StringNullableFilter<"Professor"> | string | null
    currentProjects?: StringNullableFilter<"Professor"> | string | null
    collaborators?: StringNullableFilter<"Professor"> | string | null
    phdStudents?: StringNullableFilter<"Professor"> | string | null
    fundingSources?: StringNullableFilter<"Professor"> | string | null
    openPositions?: StringNullableFilter<"Professor"> | string | null
    aiAnalysisSummary?: StringNullableFilter<"Professor"> | string | null
    status?: StringFilter<"Professor"> | string
    compatibilityScore?: IntNullableFilter<"Professor"> | number | null
    compatibilityReasoning?: StringNullableFilter<"Professor"> | string | null
    dateSent?: DateTimeNullableFilter<"Professor"> | Date | string | null
    subject?: StringNullableFilter<"Professor"> | string | null
    tags?: StringNullableFilter<"Professor"> | string | null
    notes?: StringNullableFilter<"Professor"> | string | null
    createdAt?: DateTimeFilter<"Professor"> | Date | string
    updatedAt?: DateTimeFilter<"Professor"> | Date | string
    userId?: StringNullableFilter<"Professor"> | string | null
  }

  export type UserCreateWithoutProfessorsInput = {
    id?: string
    name?: string | null
    university?: string | null
    degree?: string | null
    department?: string | null
    expectedGraduation?: string | null
    email?: string | null
    linkedin?: string | null
    github?: string | null
    portfolio?: string | null
    country?: string | null
    preferredResearchAreas?: string | null
    targetCountries?: string | null
    internshipDuration?: string | null
    preferredStartMonth?: string | null
    skills?: string | null
    programmingLanguages?: string | null
    frameworks?: string | null
    researchExperience?: string | null
    projects?: string | null
    leadershipRoles?: string | null
    awards?: string | null
    workExperience?: string | null
    publications?: string | null
    researchInterests?: string | null
    technicalStack?: string | null
    domainExpertise?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserUncheckedCreateWithoutProfessorsInput = {
    id?: string
    name?: string | null
    university?: string | null
    degree?: string | null
    department?: string | null
    expectedGraduation?: string | null
    email?: string | null
    linkedin?: string | null
    github?: string | null
    portfolio?: string | null
    country?: string | null
    preferredResearchAreas?: string | null
    targetCountries?: string | null
    internshipDuration?: string | null
    preferredStartMonth?: string | null
    skills?: string | null
    programmingLanguages?: string | null
    frameworks?: string | null
    researchExperience?: string | null
    projects?: string | null
    leadershipRoles?: string | null
    awards?: string | null
    workExperience?: string | null
    publications?: string | null
    researchInterests?: string | null
    technicalStack?: string | null
    domainExpertise?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserCreateOrConnectWithoutProfessorsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutProfessorsInput, UserUncheckedCreateWithoutProfessorsInput>
  }

  export type UserUpsertWithoutProfessorsInput = {
    update: XOR<UserUpdateWithoutProfessorsInput, UserUncheckedUpdateWithoutProfessorsInput>
    create: XOR<UserCreateWithoutProfessorsInput, UserUncheckedCreateWithoutProfessorsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutProfessorsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutProfessorsInput, UserUncheckedUpdateWithoutProfessorsInput>
  }

  export type UserUpdateWithoutProfessorsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    university?: NullableStringFieldUpdateOperationsInput | string | null
    degree?: NullableStringFieldUpdateOperationsInput | string | null
    department?: NullableStringFieldUpdateOperationsInput | string | null
    expectedGraduation?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    linkedin?: NullableStringFieldUpdateOperationsInput | string | null
    github?: NullableStringFieldUpdateOperationsInput | string | null
    portfolio?: NullableStringFieldUpdateOperationsInput | string | null
    country?: NullableStringFieldUpdateOperationsInput | string | null
    preferredResearchAreas?: NullableStringFieldUpdateOperationsInput | string | null
    targetCountries?: NullableStringFieldUpdateOperationsInput | string | null
    internshipDuration?: NullableStringFieldUpdateOperationsInput | string | null
    preferredStartMonth?: NullableStringFieldUpdateOperationsInput | string | null
    skills?: NullableStringFieldUpdateOperationsInput | string | null
    programmingLanguages?: NullableStringFieldUpdateOperationsInput | string | null
    frameworks?: NullableStringFieldUpdateOperationsInput | string | null
    researchExperience?: NullableStringFieldUpdateOperationsInput | string | null
    projects?: NullableStringFieldUpdateOperationsInput | string | null
    leadershipRoles?: NullableStringFieldUpdateOperationsInput | string | null
    awards?: NullableStringFieldUpdateOperationsInput | string | null
    workExperience?: NullableStringFieldUpdateOperationsInput | string | null
    publications?: NullableStringFieldUpdateOperationsInput | string | null
    researchInterests?: NullableStringFieldUpdateOperationsInput | string | null
    technicalStack?: NullableStringFieldUpdateOperationsInput | string | null
    domainExpertise?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateWithoutProfessorsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    university?: NullableStringFieldUpdateOperationsInput | string | null
    degree?: NullableStringFieldUpdateOperationsInput | string | null
    department?: NullableStringFieldUpdateOperationsInput | string | null
    expectedGraduation?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    linkedin?: NullableStringFieldUpdateOperationsInput | string | null
    github?: NullableStringFieldUpdateOperationsInput | string | null
    portfolio?: NullableStringFieldUpdateOperationsInput | string | null
    country?: NullableStringFieldUpdateOperationsInput | string | null
    preferredResearchAreas?: NullableStringFieldUpdateOperationsInput | string | null
    targetCountries?: NullableStringFieldUpdateOperationsInput | string | null
    internshipDuration?: NullableStringFieldUpdateOperationsInput | string | null
    preferredStartMonth?: NullableStringFieldUpdateOperationsInput | string | null
    skills?: NullableStringFieldUpdateOperationsInput | string | null
    programmingLanguages?: NullableStringFieldUpdateOperationsInput | string | null
    frameworks?: NullableStringFieldUpdateOperationsInput | string | null
    researchExperience?: NullableStringFieldUpdateOperationsInput | string | null
    projects?: NullableStringFieldUpdateOperationsInput | string | null
    leadershipRoles?: NullableStringFieldUpdateOperationsInput | string | null
    awards?: NullableStringFieldUpdateOperationsInput | string | null
    workExperience?: NullableStringFieldUpdateOperationsInput | string | null
    publications?: NullableStringFieldUpdateOperationsInput | string | null
    researchInterests?: NullableStringFieldUpdateOperationsInput | string | null
    technicalStack?: NullableStringFieldUpdateOperationsInput | string | null
    domainExpertise?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProfessorCreateManyUserInput = {
    id?: string
    name?: string | null
    university?: string | null
    department?: string | null
    country?: string | null
    email?: string | null
    emailStatus?: string
    emailSource?: string | null
    emailSourceUrl?: string | null
    emailConfidence?: number | null
    emailLastChecked?: Date | string | null
    position?: string | null
    homepage?: string | null
    lab?: string | null
    rawScrapedText?: string | null
    primaryAreas?: string | null
    currentThemes?: string | null
    keywords?: string | null
    openProblems?: string | null
    latestPublications?: string | null
    mostCitedPublications?: string | null
    topicsOverTime?: string | null
    currentProjects?: string | null
    collaborators?: string | null
    phdStudents?: string | null
    fundingSources?: string | null
    openPositions?: string | null
    aiAnalysisSummary?: string | null
    status?: string
    compatibilityScore?: number | null
    compatibilityReasoning?: string | null
    dateSent?: Date | string | null
    subject?: string | null
    tags?: string | null
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ProfessorUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    university?: NullableStringFieldUpdateOperationsInput | string | null
    department?: NullableStringFieldUpdateOperationsInput | string | null
    country?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    emailStatus?: StringFieldUpdateOperationsInput | string
    emailSource?: NullableStringFieldUpdateOperationsInput | string | null
    emailSourceUrl?: NullableStringFieldUpdateOperationsInput | string | null
    emailConfidence?: NullableIntFieldUpdateOperationsInput | number | null
    emailLastChecked?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    position?: NullableStringFieldUpdateOperationsInput | string | null
    homepage?: NullableStringFieldUpdateOperationsInput | string | null
    lab?: NullableStringFieldUpdateOperationsInput | string | null
    rawScrapedText?: NullableStringFieldUpdateOperationsInput | string | null
    primaryAreas?: NullableStringFieldUpdateOperationsInput | string | null
    currentThemes?: NullableStringFieldUpdateOperationsInput | string | null
    keywords?: NullableStringFieldUpdateOperationsInput | string | null
    openProblems?: NullableStringFieldUpdateOperationsInput | string | null
    latestPublications?: NullableStringFieldUpdateOperationsInput | string | null
    mostCitedPublications?: NullableStringFieldUpdateOperationsInput | string | null
    topicsOverTime?: NullableStringFieldUpdateOperationsInput | string | null
    currentProjects?: NullableStringFieldUpdateOperationsInput | string | null
    collaborators?: NullableStringFieldUpdateOperationsInput | string | null
    phdStudents?: NullableStringFieldUpdateOperationsInput | string | null
    fundingSources?: NullableStringFieldUpdateOperationsInput | string | null
    openPositions?: NullableStringFieldUpdateOperationsInput | string | null
    aiAnalysisSummary?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    compatibilityScore?: NullableIntFieldUpdateOperationsInput | number | null
    compatibilityReasoning?: NullableStringFieldUpdateOperationsInput | string | null
    dateSent?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    subject?: NullableStringFieldUpdateOperationsInput | string | null
    tags?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProfessorUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    university?: NullableStringFieldUpdateOperationsInput | string | null
    department?: NullableStringFieldUpdateOperationsInput | string | null
    country?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    emailStatus?: StringFieldUpdateOperationsInput | string
    emailSource?: NullableStringFieldUpdateOperationsInput | string | null
    emailSourceUrl?: NullableStringFieldUpdateOperationsInput | string | null
    emailConfidence?: NullableIntFieldUpdateOperationsInput | number | null
    emailLastChecked?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    position?: NullableStringFieldUpdateOperationsInput | string | null
    homepage?: NullableStringFieldUpdateOperationsInput | string | null
    lab?: NullableStringFieldUpdateOperationsInput | string | null
    rawScrapedText?: NullableStringFieldUpdateOperationsInput | string | null
    primaryAreas?: NullableStringFieldUpdateOperationsInput | string | null
    currentThemes?: NullableStringFieldUpdateOperationsInput | string | null
    keywords?: NullableStringFieldUpdateOperationsInput | string | null
    openProblems?: NullableStringFieldUpdateOperationsInput | string | null
    latestPublications?: NullableStringFieldUpdateOperationsInput | string | null
    mostCitedPublications?: NullableStringFieldUpdateOperationsInput | string | null
    topicsOverTime?: NullableStringFieldUpdateOperationsInput | string | null
    currentProjects?: NullableStringFieldUpdateOperationsInput | string | null
    collaborators?: NullableStringFieldUpdateOperationsInput | string | null
    phdStudents?: NullableStringFieldUpdateOperationsInput | string | null
    fundingSources?: NullableStringFieldUpdateOperationsInput | string | null
    openPositions?: NullableStringFieldUpdateOperationsInput | string | null
    aiAnalysisSummary?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    compatibilityScore?: NullableIntFieldUpdateOperationsInput | number | null
    compatibilityReasoning?: NullableStringFieldUpdateOperationsInput | string | null
    dateSent?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    subject?: NullableStringFieldUpdateOperationsInput | string | null
    tags?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProfessorUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    university?: NullableStringFieldUpdateOperationsInput | string | null
    department?: NullableStringFieldUpdateOperationsInput | string | null
    country?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    emailStatus?: StringFieldUpdateOperationsInput | string
    emailSource?: NullableStringFieldUpdateOperationsInput | string | null
    emailSourceUrl?: NullableStringFieldUpdateOperationsInput | string | null
    emailConfidence?: NullableIntFieldUpdateOperationsInput | number | null
    emailLastChecked?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    position?: NullableStringFieldUpdateOperationsInput | string | null
    homepage?: NullableStringFieldUpdateOperationsInput | string | null
    lab?: NullableStringFieldUpdateOperationsInput | string | null
    rawScrapedText?: NullableStringFieldUpdateOperationsInput | string | null
    primaryAreas?: NullableStringFieldUpdateOperationsInput | string | null
    currentThemes?: NullableStringFieldUpdateOperationsInput | string | null
    keywords?: NullableStringFieldUpdateOperationsInput | string | null
    openProblems?: NullableStringFieldUpdateOperationsInput | string | null
    latestPublications?: NullableStringFieldUpdateOperationsInput | string | null
    mostCitedPublications?: NullableStringFieldUpdateOperationsInput | string | null
    topicsOverTime?: NullableStringFieldUpdateOperationsInput | string | null
    currentProjects?: NullableStringFieldUpdateOperationsInput | string | null
    collaborators?: NullableStringFieldUpdateOperationsInput | string | null
    phdStudents?: NullableStringFieldUpdateOperationsInput | string | null
    fundingSources?: NullableStringFieldUpdateOperationsInput | string | null
    openPositions?: NullableStringFieldUpdateOperationsInput | string | null
    aiAnalysisSummary?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    compatibilityScore?: NullableIntFieldUpdateOperationsInput | number | null
    compatibilityReasoning?: NullableStringFieldUpdateOperationsInput | string | null
    dateSent?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    subject?: NullableStringFieldUpdateOperationsInput | string | null
    tags?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}