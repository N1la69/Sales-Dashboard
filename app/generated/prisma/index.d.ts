
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model psr_data_temp
 * 
 */
export type psr_data_temp = $Result.DefaultSelection<Prisma.$psr_data_tempPayload>
/**
 * Model psr_data_historical
 * 
 */
export type psr_data_historical = $Result.DefaultSelection<Prisma.$psr_data_historicalPayload>
/**
 * Model psr_finalized_temp
 * 
 */
export type psr_finalized_temp = $Result.DefaultSelection<Prisma.$psr_finalized_tempPayload>
/**
 * Model psr_data_finalized
 * 
 */
export type psr_data_finalized = $Result.DefaultSelection<Prisma.$psr_data_finalizedPayload>
/**
 * Model channel_mapping
 * 
 */
export type channel_mapping = $Result.DefaultSelection<Prisma.$channel_mappingPayload>
/**
 * Model store_mapping
 * 
 */
export type store_mapping = $Result.DefaultSelection<Prisma.$store_mappingPayload>
/**
 * Model product_mapping
 * 
 */
export type product_mapping = $Result.DefaultSelection<Prisma.$product_mappingPayload>
/**
 * Model mapping_change_flag
 * 
 */
export type mapping_change_flag = $Result.DefaultSelection<Prisma.$mapping_change_flagPayload>
/**
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model PermissionSet
 * 
 */
export type PermissionSet = $Result.DefaultSelection<Prisma.$PermissionSetPayload>

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Psr_data_temps
 * const psr_data_temps = await prisma.psr_data_temp.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
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
   * const prisma = new PrismaClient()
   * // Fetch zero or more Psr_data_temps
   * const psr_data_temps = await prisma.psr_data_temp.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
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
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
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
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
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
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
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
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.psr_data_temp`: Exposes CRUD operations for the **psr_data_temp** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Psr_data_temps
    * const psr_data_temps = await prisma.psr_data_temp.findMany()
    * ```
    */
  get psr_data_temp(): Prisma.psr_data_tempDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.psr_data_historical`: Exposes CRUD operations for the **psr_data_historical** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Psr_data_historicals
    * const psr_data_historicals = await prisma.psr_data_historical.findMany()
    * ```
    */
  get psr_data_historical(): Prisma.psr_data_historicalDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.psr_finalized_temp`: Exposes CRUD operations for the **psr_finalized_temp** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Psr_finalized_temps
    * const psr_finalized_temps = await prisma.psr_finalized_temp.findMany()
    * ```
    */
  get psr_finalized_temp(): Prisma.psr_finalized_tempDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.psr_data_finalized`: Exposes CRUD operations for the **psr_data_finalized** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Psr_data_finalizeds
    * const psr_data_finalizeds = await prisma.psr_data_finalized.findMany()
    * ```
    */
  get psr_data_finalized(): Prisma.psr_data_finalizedDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.channel_mapping`: Exposes CRUD operations for the **channel_mapping** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Channel_mappings
    * const channel_mappings = await prisma.channel_mapping.findMany()
    * ```
    */
  get channel_mapping(): Prisma.channel_mappingDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.store_mapping`: Exposes CRUD operations for the **store_mapping** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Store_mappings
    * const store_mappings = await prisma.store_mapping.findMany()
    * ```
    */
  get store_mapping(): Prisma.store_mappingDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.product_mapping`: Exposes CRUD operations for the **product_mapping** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Product_mappings
    * const product_mappings = await prisma.product_mapping.findMany()
    * ```
    */
  get product_mapping(): Prisma.product_mappingDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.mapping_change_flag`: Exposes CRUD operations for the **mapping_change_flag** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Mapping_change_flags
    * const mapping_change_flags = await prisma.mapping_change_flag.findMany()
    * ```
    */
  get mapping_change_flag(): Prisma.mapping_change_flagDelegate<ExtArgs, ClientOptions>;

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
   * `prisma.permissionSet`: Exposes CRUD operations for the **PermissionSet** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more PermissionSets
    * const permissionSets = await prisma.permissionSet.findMany()
    * ```
    */
  get permissionSet(): Prisma.PermissionSetDelegate<ExtArgs, ClientOptions>;
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
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

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
   * Prisma Client JS version: 6.15.0
   * Query Engine version: 85179d7826409ee107a6ba334b5e305ae3fba9fb
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


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
    psr_data_temp: 'psr_data_temp',
    psr_data_historical: 'psr_data_historical',
    psr_finalized_temp: 'psr_finalized_temp',
    psr_data_finalized: 'psr_data_finalized',
    channel_mapping: 'channel_mapping',
    store_mapping: 'store_mapping',
    product_mapping: 'product_mapping',
    mapping_change_flag: 'mapping_change_flag',
    User: 'User',
    PermissionSet: 'PermissionSet'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "psr_data_temp" | "psr_data_historical" | "psr_finalized_temp" | "psr_data_finalized" | "channel_mapping" | "store_mapping" | "product_mapping" | "mapping_change_flag" | "user" | "permissionSet"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      psr_data_temp: {
        payload: Prisma.$psr_data_tempPayload<ExtArgs>
        fields: Prisma.psr_data_tempFieldRefs
        operations: {
          findUnique: {
            args: Prisma.psr_data_tempFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$psr_data_tempPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.psr_data_tempFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$psr_data_tempPayload>
          }
          findFirst: {
            args: Prisma.psr_data_tempFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$psr_data_tempPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.psr_data_tempFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$psr_data_tempPayload>
          }
          findMany: {
            args: Prisma.psr_data_tempFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$psr_data_tempPayload>[]
          }
          create: {
            args: Prisma.psr_data_tempCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$psr_data_tempPayload>
          }
          createMany: {
            args: Prisma.psr_data_tempCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.psr_data_tempDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$psr_data_tempPayload>
          }
          update: {
            args: Prisma.psr_data_tempUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$psr_data_tempPayload>
          }
          deleteMany: {
            args: Prisma.psr_data_tempDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.psr_data_tempUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.psr_data_tempUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$psr_data_tempPayload>
          }
          aggregate: {
            args: Prisma.Psr_data_tempAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePsr_data_temp>
          }
          groupBy: {
            args: Prisma.psr_data_tempGroupByArgs<ExtArgs>
            result: $Utils.Optional<Psr_data_tempGroupByOutputType>[]
          }
          count: {
            args: Prisma.psr_data_tempCountArgs<ExtArgs>
            result: $Utils.Optional<Psr_data_tempCountAggregateOutputType> | number
          }
        }
      }
      psr_data_historical: {
        payload: Prisma.$psr_data_historicalPayload<ExtArgs>
        fields: Prisma.psr_data_historicalFieldRefs
        operations: {
          findUnique: {
            args: Prisma.psr_data_historicalFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$psr_data_historicalPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.psr_data_historicalFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$psr_data_historicalPayload>
          }
          findFirst: {
            args: Prisma.psr_data_historicalFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$psr_data_historicalPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.psr_data_historicalFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$psr_data_historicalPayload>
          }
          findMany: {
            args: Prisma.psr_data_historicalFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$psr_data_historicalPayload>[]
          }
          create: {
            args: Prisma.psr_data_historicalCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$psr_data_historicalPayload>
          }
          createMany: {
            args: Prisma.psr_data_historicalCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.psr_data_historicalDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$psr_data_historicalPayload>
          }
          update: {
            args: Prisma.psr_data_historicalUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$psr_data_historicalPayload>
          }
          deleteMany: {
            args: Prisma.psr_data_historicalDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.psr_data_historicalUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.psr_data_historicalUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$psr_data_historicalPayload>
          }
          aggregate: {
            args: Prisma.Psr_data_historicalAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePsr_data_historical>
          }
          groupBy: {
            args: Prisma.psr_data_historicalGroupByArgs<ExtArgs>
            result: $Utils.Optional<Psr_data_historicalGroupByOutputType>[]
          }
          count: {
            args: Prisma.psr_data_historicalCountArgs<ExtArgs>
            result: $Utils.Optional<Psr_data_historicalCountAggregateOutputType> | number
          }
        }
      }
      psr_finalized_temp: {
        payload: Prisma.$psr_finalized_tempPayload<ExtArgs>
        fields: Prisma.psr_finalized_tempFieldRefs
        operations: {
          findUnique: {
            args: Prisma.psr_finalized_tempFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$psr_finalized_tempPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.psr_finalized_tempFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$psr_finalized_tempPayload>
          }
          findFirst: {
            args: Prisma.psr_finalized_tempFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$psr_finalized_tempPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.psr_finalized_tempFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$psr_finalized_tempPayload>
          }
          findMany: {
            args: Prisma.psr_finalized_tempFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$psr_finalized_tempPayload>[]
          }
          create: {
            args: Prisma.psr_finalized_tempCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$psr_finalized_tempPayload>
          }
          createMany: {
            args: Prisma.psr_finalized_tempCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.psr_finalized_tempDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$psr_finalized_tempPayload>
          }
          update: {
            args: Prisma.psr_finalized_tempUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$psr_finalized_tempPayload>
          }
          deleteMany: {
            args: Prisma.psr_finalized_tempDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.psr_finalized_tempUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.psr_finalized_tempUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$psr_finalized_tempPayload>
          }
          aggregate: {
            args: Prisma.Psr_finalized_tempAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePsr_finalized_temp>
          }
          groupBy: {
            args: Prisma.psr_finalized_tempGroupByArgs<ExtArgs>
            result: $Utils.Optional<Psr_finalized_tempGroupByOutputType>[]
          }
          count: {
            args: Prisma.psr_finalized_tempCountArgs<ExtArgs>
            result: $Utils.Optional<Psr_finalized_tempCountAggregateOutputType> | number
          }
        }
      }
      psr_data_finalized: {
        payload: Prisma.$psr_data_finalizedPayload<ExtArgs>
        fields: Prisma.psr_data_finalizedFieldRefs
        operations: {
          findUnique: {
            args: Prisma.psr_data_finalizedFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$psr_data_finalizedPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.psr_data_finalizedFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$psr_data_finalizedPayload>
          }
          findFirst: {
            args: Prisma.psr_data_finalizedFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$psr_data_finalizedPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.psr_data_finalizedFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$psr_data_finalizedPayload>
          }
          findMany: {
            args: Prisma.psr_data_finalizedFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$psr_data_finalizedPayload>[]
          }
          create: {
            args: Prisma.psr_data_finalizedCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$psr_data_finalizedPayload>
          }
          createMany: {
            args: Prisma.psr_data_finalizedCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.psr_data_finalizedDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$psr_data_finalizedPayload>
          }
          update: {
            args: Prisma.psr_data_finalizedUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$psr_data_finalizedPayload>
          }
          deleteMany: {
            args: Prisma.psr_data_finalizedDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.psr_data_finalizedUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.psr_data_finalizedUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$psr_data_finalizedPayload>
          }
          aggregate: {
            args: Prisma.Psr_data_finalizedAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePsr_data_finalized>
          }
          groupBy: {
            args: Prisma.psr_data_finalizedGroupByArgs<ExtArgs>
            result: $Utils.Optional<Psr_data_finalizedGroupByOutputType>[]
          }
          count: {
            args: Prisma.psr_data_finalizedCountArgs<ExtArgs>
            result: $Utils.Optional<Psr_data_finalizedCountAggregateOutputType> | number
          }
        }
      }
      channel_mapping: {
        payload: Prisma.$channel_mappingPayload<ExtArgs>
        fields: Prisma.channel_mappingFieldRefs
        operations: {
          findUnique: {
            args: Prisma.channel_mappingFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$channel_mappingPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.channel_mappingFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$channel_mappingPayload>
          }
          findFirst: {
            args: Prisma.channel_mappingFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$channel_mappingPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.channel_mappingFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$channel_mappingPayload>
          }
          findMany: {
            args: Prisma.channel_mappingFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$channel_mappingPayload>[]
          }
          create: {
            args: Prisma.channel_mappingCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$channel_mappingPayload>
          }
          createMany: {
            args: Prisma.channel_mappingCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.channel_mappingDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$channel_mappingPayload>
          }
          update: {
            args: Prisma.channel_mappingUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$channel_mappingPayload>
          }
          deleteMany: {
            args: Prisma.channel_mappingDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.channel_mappingUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.channel_mappingUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$channel_mappingPayload>
          }
          aggregate: {
            args: Prisma.Channel_mappingAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateChannel_mapping>
          }
          groupBy: {
            args: Prisma.channel_mappingGroupByArgs<ExtArgs>
            result: $Utils.Optional<Channel_mappingGroupByOutputType>[]
          }
          count: {
            args: Prisma.channel_mappingCountArgs<ExtArgs>
            result: $Utils.Optional<Channel_mappingCountAggregateOutputType> | number
          }
        }
      }
      store_mapping: {
        payload: Prisma.$store_mappingPayload<ExtArgs>
        fields: Prisma.store_mappingFieldRefs
        operations: {
          findUnique: {
            args: Prisma.store_mappingFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$store_mappingPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.store_mappingFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$store_mappingPayload>
          }
          findFirst: {
            args: Prisma.store_mappingFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$store_mappingPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.store_mappingFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$store_mappingPayload>
          }
          findMany: {
            args: Prisma.store_mappingFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$store_mappingPayload>[]
          }
          create: {
            args: Prisma.store_mappingCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$store_mappingPayload>
          }
          createMany: {
            args: Prisma.store_mappingCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.store_mappingDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$store_mappingPayload>
          }
          update: {
            args: Prisma.store_mappingUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$store_mappingPayload>
          }
          deleteMany: {
            args: Prisma.store_mappingDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.store_mappingUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.store_mappingUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$store_mappingPayload>
          }
          aggregate: {
            args: Prisma.Store_mappingAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateStore_mapping>
          }
          groupBy: {
            args: Prisma.store_mappingGroupByArgs<ExtArgs>
            result: $Utils.Optional<Store_mappingGroupByOutputType>[]
          }
          count: {
            args: Prisma.store_mappingCountArgs<ExtArgs>
            result: $Utils.Optional<Store_mappingCountAggregateOutputType> | number
          }
        }
      }
      product_mapping: {
        payload: Prisma.$product_mappingPayload<ExtArgs>
        fields: Prisma.product_mappingFieldRefs
        operations: {
          findUnique: {
            args: Prisma.product_mappingFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$product_mappingPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.product_mappingFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$product_mappingPayload>
          }
          findFirst: {
            args: Prisma.product_mappingFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$product_mappingPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.product_mappingFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$product_mappingPayload>
          }
          findMany: {
            args: Prisma.product_mappingFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$product_mappingPayload>[]
          }
          create: {
            args: Prisma.product_mappingCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$product_mappingPayload>
          }
          createMany: {
            args: Prisma.product_mappingCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.product_mappingDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$product_mappingPayload>
          }
          update: {
            args: Prisma.product_mappingUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$product_mappingPayload>
          }
          deleteMany: {
            args: Prisma.product_mappingDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.product_mappingUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.product_mappingUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$product_mappingPayload>
          }
          aggregate: {
            args: Prisma.Product_mappingAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateProduct_mapping>
          }
          groupBy: {
            args: Prisma.product_mappingGroupByArgs<ExtArgs>
            result: $Utils.Optional<Product_mappingGroupByOutputType>[]
          }
          count: {
            args: Prisma.product_mappingCountArgs<ExtArgs>
            result: $Utils.Optional<Product_mappingCountAggregateOutputType> | number
          }
        }
      }
      mapping_change_flag: {
        payload: Prisma.$mapping_change_flagPayload<ExtArgs>
        fields: Prisma.mapping_change_flagFieldRefs
        operations: {
          findUnique: {
            args: Prisma.mapping_change_flagFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$mapping_change_flagPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.mapping_change_flagFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$mapping_change_flagPayload>
          }
          findFirst: {
            args: Prisma.mapping_change_flagFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$mapping_change_flagPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.mapping_change_flagFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$mapping_change_flagPayload>
          }
          findMany: {
            args: Prisma.mapping_change_flagFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$mapping_change_flagPayload>[]
          }
          create: {
            args: Prisma.mapping_change_flagCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$mapping_change_flagPayload>
          }
          createMany: {
            args: Prisma.mapping_change_flagCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.mapping_change_flagDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$mapping_change_flagPayload>
          }
          update: {
            args: Prisma.mapping_change_flagUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$mapping_change_flagPayload>
          }
          deleteMany: {
            args: Prisma.mapping_change_flagDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.mapping_change_flagUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.mapping_change_flagUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$mapping_change_flagPayload>
          }
          aggregate: {
            args: Prisma.Mapping_change_flagAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateMapping_change_flag>
          }
          groupBy: {
            args: Prisma.mapping_change_flagGroupByArgs<ExtArgs>
            result: $Utils.Optional<Mapping_change_flagGroupByOutputType>[]
          }
          count: {
            args: Prisma.mapping_change_flagCountArgs<ExtArgs>
            result: $Utils.Optional<Mapping_change_flagCountAggregateOutputType> | number
          }
        }
      }
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
      PermissionSet: {
        payload: Prisma.$PermissionSetPayload<ExtArgs>
        fields: Prisma.PermissionSetFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PermissionSetFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PermissionSetPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PermissionSetFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PermissionSetPayload>
          }
          findFirst: {
            args: Prisma.PermissionSetFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PermissionSetPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PermissionSetFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PermissionSetPayload>
          }
          findMany: {
            args: Prisma.PermissionSetFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PermissionSetPayload>[]
          }
          create: {
            args: Prisma.PermissionSetCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PermissionSetPayload>
          }
          createMany: {
            args: Prisma.PermissionSetCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.PermissionSetDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PermissionSetPayload>
          }
          update: {
            args: Prisma.PermissionSetUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PermissionSetPayload>
          }
          deleteMany: {
            args: Prisma.PermissionSetDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PermissionSetUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.PermissionSetUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PermissionSetPayload>
          }
          aggregate: {
            args: Prisma.PermissionSetAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePermissionSet>
          }
          groupBy: {
            args: Prisma.PermissionSetGroupByArgs<ExtArgs>
            result: $Utils.Optional<PermissionSetGroupByOutputType>[]
          }
          count: {
            args: Prisma.PermissionSetCountArgs<ExtArgs>
            result: $Utils.Optional<PermissionSetCountAggregateOutputType> | number
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
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
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
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
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
  }
  export type GlobalOmitConfig = {
    psr_data_temp?: psr_data_tempOmit
    psr_data_historical?: psr_data_historicalOmit
    psr_finalized_temp?: psr_finalized_tempOmit
    psr_data_finalized?: psr_data_finalizedOmit
    channel_mapping?: channel_mappingOmit
    store_mapping?: store_mappingOmit
    product_mapping?: product_mappingOmit
    mapping_change_flag?: mapping_change_flagOmit
    user?: UserOmit
    permissionSet?: PermissionSetOmit
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
    permissionSets: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    permissionSets?: boolean | UserCountOutputTypeCountPermissionSetsArgs
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
  export type UserCountOutputTypeCountPermissionSetsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PermissionSetWhereInput
  }


  /**
   * Models
   */

  /**
   * Model psr_data_temp
   */

  export type AggregatePsr_data_temp = {
    _count: Psr_data_tempCountAggregateOutputType | null
    _avg: Psr_data_tempAvgAggregateOutputType | null
    _sum: Psr_data_tempSumAggregateOutputType | null
    _min: Psr_data_tempMinAggregateOutputType | null
    _max: Psr_data_tempMaxAggregateOutputType | null
  }

  export type Psr_data_tempAvgAggregateOutputType = {
    psr_id: number | null
    p_code: number | null
    retailing: Decimal | null
  }

  export type Psr_data_tempSumAggregateOutputType = {
    psr_id: number | null
    p_code: number | null
    retailing: Decimal | null
  }

  export type Psr_data_tempMinAggregateOutputType = {
    psr_id: number | null
    document_no: string | null
    document_date: Date | null
    subbrandform: string | null
    customer_name: string | null
    customer_code: string | null
    p_code: number | null
    customer_type: string | null
    category: string | null
    brand: string | null
    brandform: string | null
    retailing: Decimal | null
  }

  export type Psr_data_tempMaxAggregateOutputType = {
    psr_id: number | null
    document_no: string | null
    document_date: Date | null
    subbrandform: string | null
    customer_name: string | null
    customer_code: string | null
    p_code: number | null
    customer_type: string | null
    category: string | null
    brand: string | null
    brandform: string | null
    retailing: Decimal | null
  }

  export type Psr_data_tempCountAggregateOutputType = {
    psr_id: number
    document_no: number
    document_date: number
    subbrandform: number
    customer_name: number
    customer_code: number
    p_code: number
    customer_type: number
    category: number
    brand: number
    brandform: number
    retailing: number
    _all: number
  }


  export type Psr_data_tempAvgAggregateInputType = {
    psr_id?: true
    p_code?: true
    retailing?: true
  }

  export type Psr_data_tempSumAggregateInputType = {
    psr_id?: true
    p_code?: true
    retailing?: true
  }

  export type Psr_data_tempMinAggregateInputType = {
    psr_id?: true
    document_no?: true
    document_date?: true
    subbrandform?: true
    customer_name?: true
    customer_code?: true
    p_code?: true
    customer_type?: true
    category?: true
    brand?: true
    brandform?: true
    retailing?: true
  }

  export type Psr_data_tempMaxAggregateInputType = {
    psr_id?: true
    document_no?: true
    document_date?: true
    subbrandform?: true
    customer_name?: true
    customer_code?: true
    p_code?: true
    customer_type?: true
    category?: true
    brand?: true
    brandform?: true
    retailing?: true
  }

  export type Psr_data_tempCountAggregateInputType = {
    psr_id?: true
    document_no?: true
    document_date?: true
    subbrandform?: true
    customer_name?: true
    customer_code?: true
    p_code?: true
    customer_type?: true
    category?: true
    brand?: true
    brandform?: true
    retailing?: true
    _all?: true
  }

  export type Psr_data_tempAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which psr_data_temp to aggregate.
     */
    where?: psr_data_tempWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of psr_data_temps to fetch.
     */
    orderBy?: psr_data_tempOrderByWithRelationInput | psr_data_tempOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: psr_data_tempWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` psr_data_temps from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` psr_data_temps.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned psr_data_temps
    **/
    _count?: true | Psr_data_tempCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: Psr_data_tempAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: Psr_data_tempSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: Psr_data_tempMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: Psr_data_tempMaxAggregateInputType
  }

  export type GetPsr_data_tempAggregateType<T extends Psr_data_tempAggregateArgs> = {
        [P in keyof T & keyof AggregatePsr_data_temp]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePsr_data_temp[P]>
      : GetScalarType<T[P], AggregatePsr_data_temp[P]>
  }




  export type psr_data_tempGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: psr_data_tempWhereInput
    orderBy?: psr_data_tempOrderByWithAggregationInput | psr_data_tempOrderByWithAggregationInput[]
    by: Psr_data_tempScalarFieldEnum[] | Psr_data_tempScalarFieldEnum
    having?: psr_data_tempScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: Psr_data_tempCountAggregateInputType | true
    _avg?: Psr_data_tempAvgAggregateInputType
    _sum?: Psr_data_tempSumAggregateInputType
    _min?: Psr_data_tempMinAggregateInputType
    _max?: Psr_data_tempMaxAggregateInputType
  }

  export type Psr_data_tempGroupByOutputType = {
    psr_id: number
    document_no: string
    document_date: Date
    subbrandform: string
    customer_name: string
    customer_code: string
    p_code: number
    customer_type: string
    category: string
    brand: string
    brandform: string
    retailing: Decimal
    _count: Psr_data_tempCountAggregateOutputType | null
    _avg: Psr_data_tempAvgAggregateOutputType | null
    _sum: Psr_data_tempSumAggregateOutputType | null
    _min: Psr_data_tempMinAggregateOutputType | null
    _max: Psr_data_tempMaxAggregateOutputType | null
  }

  type GetPsr_data_tempGroupByPayload<T extends psr_data_tempGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<Psr_data_tempGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof Psr_data_tempGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], Psr_data_tempGroupByOutputType[P]>
            : GetScalarType<T[P], Psr_data_tempGroupByOutputType[P]>
        }
      >
    >


  export type psr_data_tempSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    psr_id?: boolean
    document_no?: boolean
    document_date?: boolean
    subbrandform?: boolean
    customer_name?: boolean
    customer_code?: boolean
    p_code?: boolean
    customer_type?: boolean
    category?: boolean
    brand?: boolean
    brandform?: boolean
    retailing?: boolean
  }, ExtArgs["result"]["psr_data_temp"]>



  export type psr_data_tempSelectScalar = {
    psr_id?: boolean
    document_no?: boolean
    document_date?: boolean
    subbrandform?: boolean
    customer_name?: boolean
    customer_code?: boolean
    p_code?: boolean
    customer_type?: boolean
    category?: boolean
    brand?: boolean
    brandform?: boolean
    retailing?: boolean
  }

  export type psr_data_tempOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"psr_id" | "document_no" | "document_date" | "subbrandform" | "customer_name" | "customer_code" | "p_code" | "customer_type" | "category" | "brand" | "brandform" | "retailing", ExtArgs["result"]["psr_data_temp"]>

  export type $psr_data_tempPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "psr_data_temp"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      psr_id: number
      document_no: string
      document_date: Date
      subbrandform: string
      customer_name: string
      customer_code: string
      p_code: number
      customer_type: string
      category: string
      brand: string
      brandform: string
      retailing: Prisma.Decimal
    }, ExtArgs["result"]["psr_data_temp"]>
    composites: {}
  }

  type psr_data_tempGetPayload<S extends boolean | null | undefined | psr_data_tempDefaultArgs> = $Result.GetResult<Prisma.$psr_data_tempPayload, S>

  type psr_data_tempCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<psr_data_tempFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: Psr_data_tempCountAggregateInputType | true
    }

  export interface psr_data_tempDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['psr_data_temp'], meta: { name: 'psr_data_temp' } }
    /**
     * Find zero or one Psr_data_temp that matches the filter.
     * @param {psr_data_tempFindUniqueArgs} args - Arguments to find a Psr_data_temp
     * @example
     * // Get one Psr_data_temp
     * const psr_data_temp = await prisma.psr_data_temp.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends psr_data_tempFindUniqueArgs>(args: SelectSubset<T, psr_data_tempFindUniqueArgs<ExtArgs>>): Prisma__psr_data_tempClient<$Result.GetResult<Prisma.$psr_data_tempPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Psr_data_temp that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {psr_data_tempFindUniqueOrThrowArgs} args - Arguments to find a Psr_data_temp
     * @example
     * // Get one Psr_data_temp
     * const psr_data_temp = await prisma.psr_data_temp.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends psr_data_tempFindUniqueOrThrowArgs>(args: SelectSubset<T, psr_data_tempFindUniqueOrThrowArgs<ExtArgs>>): Prisma__psr_data_tempClient<$Result.GetResult<Prisma.$psr_data_tempPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Psr_data_temp that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {psr_data_tempFindFirstArgs} args - Arguments to find a Psr_data_temp
     * @example
     * // Get one Psr_data_temp
     * const psr_data_temp = await prisma.psr_data_temp.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends psr_data_tempFindFirstArgs>(args?: SelectSubset<T, psr_data_tempFindFirstArgs<ExtArgs>>): Prisma__psr_data_tempClient<$Result.GetResult<Prisma.$psr_data_tempPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Psr_data_temp that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {psr_data_tempFindFirstOrThrowArgs} args - Arguments to find a Psr_data_temp
     * @example
     * // Get one Psr_data_temp
     * const psr_data_temp = await prisma.psr_data_temp.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends psr_data_tempFindFirstOrThrowArgs>(args?: SelectSubset<T, psr_data_tempFindFirstOrThrowArgs<ExtArgs>>): Prisma__psr_data_tempClient<$Result.GetResult<Prisma.$psr_data_tempPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Psr_data_temps that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {psr_data_tempFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Psr_data_temps
     * const psr_data_temps = await prisma.psr_data_temp.findMany()
     * 
     * // Get first 10 Psr_data_temps
     * const psr_data_temps = await prisma.psr_data_temp.findMany({ take: 10 })
     * 
     * // Only select the `psr_id`
     * const psr_data_tempWithPsr_idOnly = await prisma.psr_data_temp.findMany({ select: { psr_id: true } })
     * 
     */
    findMany<T extends psr_data_tempFindManyArgs>(args?: SelectSubset<T, psr_data_tempFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$psr_data_tempPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Psr_data_temp.
     * @param {psr_data_tempCreateArgs} args - Arguments to create a Psr_data_temp.
     * @example
     * // Create one Psr_data_temp
     * const Psr_data_temp = await prisma.psr_data_temp.create({
     *   data: {
     *     // ... data to create a Psr_data_temp
     *   }
     * })
     * 
     */
    create<T extends psr_data_tempCreateArgs>(args: SelectSubset<T, psr_data_tempCreateArgs<ExtArgs>>): Prisma__psr_data_tempClient<$Result.GetResult<Prisma.$psr_data_tempPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Psr_data_temps.
     * @param {psr_data_tempCreateManyArgs} args - Arguments to create many Psr_data_temps.
     * @example
     * // Create many Psr_data_temps
     * const psr_data_temp = await prisma.psr_data_temp.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends psr_data_tempCreateManyArgs>(args?: SelectSubset<T, psr_data_tempCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Psr_data_temp.
     * @param {psr_data_tempDeleteArgs} args - Arguments to delete one Psr_data_temp.
     * @example
     * // Delete one Psr_data_temp
     * const Psr_data_temp = await prisma.psr_data_temp.delete({
     *   where: {
     *     // ... filter to delete one Psr_data_temp
     *   }
     * })
     * 
     */
    delete<T extends psr_data_tempDeleteArgs>(args: SelectSubset<T, psr_data_tempDeleteArgs<ExtArgs>>): Prisma__psr_data_tempClient<$Result.GetResult<Prisma.$psr_data_tempPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Psr_data_temp.
     * @param {psr_data_tempUpdateArgs} args - Arguments to update one Psr_data_temp.
     * @example
     * // Update one Psr_data_temp
     * const psr_data_temp = await prisma.psr_data_temp.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends psr_data_tempUpdateArgs>(args: SelectSubset<T, psr_data_tempUpdateArgs<ExtArgs>>): Prisma__psr_data_tempClient<$Result.GetResult<Prisma.$psr_data_tempPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Psr_data_temps.
     * @param {psr_data_tempDeleteManyArgs} args - Arguments to filter Psr_data_temps to delete.
     * @example
     * // Delete a few Psr_data_temps
     * const { count } = await prisma.psr_data_temp.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends psr_data_tempDeleteManyArgs>(args?: SelectSubset<T, psr_data_tempDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Psr_data_temps.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {psr_data_tempUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Psr_data_temps
     * const psr_data_temp = await prisma.psr_data_temp.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends psr_data_tempUpdateManyArgs>(args: SelectSubset<T, psr_data_tempUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Psr_data_temp.
     * @param {psr_data_tempUpsertArgs} args - Arguments to update or create a Psr_data_temp.
     * @example
     * // Update or create a Psr_data_temp
     * const psr_data_temp = await prisma.psr_data_temp.upsert({
     *   create: {
     *     // ... data to create a Psr_data_temp
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Psr_data_temp we want to update
     *   }
     * })
     */
    upsert<T extends psr_data_tempUpsertArgs>(args: SelectSubset<T, psr_data_tempUpsertArgs<ExtArgs>>): Prisma__psr_data_tempClient<$Result.GetResult<Prisma.$psr_data_tempPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Psr_data_temps.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {psr_data_tempCountArgs} args - Arguments to filter Psr_data_temps to count.
     * @example
     * // Count the number of Psr_data_temps
     * const count = await prisma.psr_data_temp.count({
     *   where: {
     *     // ... the filter for the Psr_data_temps we want to count
     *   }
     * })
    **/
    count<T extends psr_data_tempCountArgs>(
      args?: Subset<T, psr_data_tempCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], Psr_data_tempCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Psr_data_temp.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Psr_data_tempAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends Psr_data_tempAggregateArgs>(args: Subset<T, Psr_data_tempAggregateArgs>): Prisma.PrismaPromise<GetPsr_data_tempAggregateType<T>>

    /**
     * Group by Psr_data_temp.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {psr_data_tempGroupByArgs} args - Group by arguments.
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
      T extends psr_data_tempGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: psr_data_tempGroupByArgs['orderBy'] }
        : { orderBy?: psr_data_tempGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, psr_data_tempGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPsr_data_tempGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the psr_data_temp model
   */
  readonly fields: psr_data_tempFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for psr_data_temp.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__psr_data_tempClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
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
   * Fields of the psr_data_temp model
   */
  interface psr_data_tempFieldRefs {
    readonly psr_id: FieldRef<"psr_data_temp", 'Int'>
    readonly document_no: FieldRef<"psr_data_temp", 'String'>
    readonly document_date: FieldRef<"psr_data_temp", 'DateTime'>
    readonly subbrandform: FieldRef<"psr_data_temp", 'String'>
    readonly customer_name: FieldRef<"psr_data_temp", 'String'>
    readonly customer_code: FieldRef<"psr_data_temp", 'String'>
    readonly p_code: FieldRef<"psr_data_temp", 'Int'>
    readonly customer_type: FieldRef<"psr_data_temp", 'String'>
    readonly category: FieldRef<"psr_data_temp", 'String'>
    readonly brand: FieldRef<"psr_data_temp", 'String'>
    readonly brandform: FieldRef<"psr_data_temp", 'String'>
    readonly retailing: FieldRef<"psr_data_temp", 'Decimal'>
  }
    

  // Custom InputTypes
  /**
   * psr_data_temp findUnique
   */
  export type psr_data_tempFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the psr_data_temp
     */
    select?: psr_data_tempSelect<ExtArgs> | null
    /**
     * Omit specific fields from the psr_data_temp
     */
    omit?: psr_data_tempOmit<ExtArgs> | null
    /**
     * Filter, which psr_data_temp to fetch.
     */
    where: psr_data_tempWhereUniqueInput
  }

  /**
   * psr_data_temp findUniqueOrThrow
   */
  export type psr_data_tempFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the psr_data_temp
     */
    select?: psr_data_tempSelect<ExtArgs> | null
    /**
     * Omit specific fields from the psr_data_temp
     */
    omit?: psr_data_tempOmit<ExtArgs> | null
    /**
     * Filter, which psr_data_temp to fetch.
     */
    where: psr_data_tempWhereUniqueInput
  }

  /**
   * psr_data_temp findFirst
   */
  export type psr_data_tempFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the psr_data_temp
     */
    select?: psr_data_tempSelect<ExtArgs> | null
    /**
     * Omit specific fields from the psr_data_temp
     */
    omit?: psr_data_tempOmit<ExtArgs> | null
    /**
     * Filter, which psr_data_temp to fetch.
     */
    where?: psr_data_tempWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of psr_data_temps to fetch.
     */
    orderBy?: psr_data_tempOrderByWithRelationInput | psr_data_tempOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for psr_data_temps.
     */
    cursor?: psr_data_tempWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` psr_data_temps from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` psr_data_temps.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of psr_data_temps.
     */
    distinct?: Psr_data_tempScalarFieldEnum | Psr_data_tempScalarFieldEnum[]
  }

  /**
   * psr_data_temp findFirstOrThrow
   */
  export type psr_data_tempFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the psr_data_temp
     */
    select?: psr_data_tempSelect<ExtArgs> | null
    /**
     * Omit specific fields from the psr_data_temp
     */
    omit?: psr_data_tempOmit<ExtArgs> | null
    /**
     * Filter, which psr_data_temp to fetch.
     */
    where?: psr_data_tempWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of psr_data_temps to fetch.
     */
    orderBy?: psr_data_tempOrderByWithRelationInput | psr_data_tempOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for psr_data_temps.
     */
    cursor?: psr_data_tempWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` psr_data_temps from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` psr_data_temps.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of psr_data_temps.
     */
    distinct?: Psr_data_tempScalarFieldEnum | Psr_data_tempScalarFieldEnum[]
  }

  /**
   * psr_data_temp findMany
   */
  export type psr_data_tempFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the psr_data_temp
     */
    select?: psr_data_tempSelect<ExtArgs> | null
    /**
     * Omit specific fields from the psr_data_temp
     */
    omit?: psr_data_tempOmit<ExtArgs> | null
    /**
     * Filter, which psr_data_temps to fetch.
     */
    where?: psr_data_tempWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of psr_data_temps to fetch.
     */
    orderBy?: psr_data_tempOrderByWithRelationInput | psr_data_tempOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing psr_data_temps.
     */
    cursor?: psr_data_tempWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` psr_data_temps from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` psr_data_temps.
     */
    skip?: number
    distinct?: Psr_data_tempScalarFieldEnum | Psr_data_tempScalarFieldEnum[]
  }

  /**
   * psr_data_temp create
   */
  export type psr_data_tempCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the psr_data_temp
     */
    select?: psr_data_tempSelect<ExtArgs> | null
    /**
     * Omit specific fields from the psr_data_temp
     */
    omit?: psr_data_tempOmit<ExtArgs> | null
    /**
     * The data needed to create a psr_data_temp.
     */
    data: XOR<psr_data_tempCreateInput, psr_data_tempUncheckedCreateInput>
  }

  /**
   * psr_data_temp createMany
   */
  export type psr_data_tempCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many psr_data_temps.
     */
    data: psr_data_tempCreateManyInput | psr_data_tempCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * psr_data_temp update
   */
  export type psr_data_tempUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the psr_data_temp
     */
    select?: psr_data_tempSelect<ExtArgs> | null
    /**
     * Omit specific fields from the psr_data_temp
     */
    omit?: psr_data_tempOmit<ExtArgs> | null
    /**
     * The data needed to update a psr_data_temp.
     */
    data: XOR<psr_data_tempUpdateInput, psr_data_tempUncheckedUpdateInput>
    /**
     * Choose, which psr_data_temp to update.
     */
    where: psr_data_tempWhereUniqueInput
  }

  /**
   * psr_data_temp updateMany
   */
  export type psr_data_tempUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update psr_data_temps.
     */
    data: XOR<psr_data_tempUpdateManyMutationInput, psr_data_tempUncheckedUpdateManyInput>
    /**
     * Filter which psr_data_temps to update
     */
    where?: psr_data_tempWhereInput
    /**
     * Limit how many psr_data_temps to update.
     */
    limit?: number
  }

  /**
   * psr_data_temp upsert
   */
  export type psr_data_tempUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the psr_data_temp
     */
    select?: psr_data_tempSelect<ExtArgs> | null
    /**
     * Omit specific fields from the psr_data_temp
     */
    omit?: psr_data_tempOmit<ExtArgs> | null
    /**
     * The filter to search for the psr_data_temp to update in case it exists.
     */
    where: psr_data_tempWhereUniqueInput
    /**
     * In case the psr_data_temp found by the `where` argument doesn't exist, create a new psr_data_temp with this data.
     */
    create: XOR<psr_data_tempCreateInput, psr_data_tempUncheckedCreateInput>
    /**
     * In case the psr_data_temp was found with the provided `where` argument, update it with this data.
     */
    update: XOR<psr_data_tempUpdateInput, psr_data_tempUncheckedUpdateInput>
  }

  /**
   * psr_data_temp delete
   */
  export type psr_data_tempDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the psr_data_temp
     */
    select?: psr_data_tempSelect<ExtArgs> | null
    /**
     * Omit specific fields from the psr_data_temp
     */
    omit?: psr_data_tempOmit<ExtArgs> | null
    /**
     * Filter which psr_data_temp to delete.
     */
    where: psr_data_tempWhereUniqueInput
  }

  /**
   * psr_data_temp deleteMany
   */
  export type psr_data_tempDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which psr_data_temps to delete
     */
    where?: psr_data_tempWhereInput
    /**
     * Limit how many psr_data_temps to delete.
     */
    limit?: number
  }

  /**
   * psr_data_temp without action
   */
  export type psr_data_tempDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the psr_data_temp
     */
    select?: psr_data_tempSelect<ExtArgs> | null
    /**
     * Omit specific fields from the psr_data_temp
     */
    omit?: psr_data_tempOmit<ExtArgs> | null
  }


  /**
   * Model psr_data_historical
   */

  export type AggregatePsr_data_historical = {
    _count: Psr_data_historicalCountAggregateOutputType | null
    _avg: Psr_data_historicalAvgAggregateOutputType | null
    _sum: Psr_data_historicalSumAggregateOutputType | null
    _min: Psr_data_historicalMinAggregateOutputType | null
    _max: Psr_data_historicalMaxAggregateOutputType | null
  }

  export type Psr_data_historicalAvgAggregateOutputType = {
    psr_id: number | null
    p_code: number | null
    retailing: Decimal | null
  }

  export type Psr_data_historicalSumAggregateOutputType = {
    psr_id: number | null
    p_code: number | null
    retailing: Decimal | null
  }

  export type Psr_data_historicalMinAggregateOutputType = {
    psr_id: number | null
    document_no: string | null
    document_date: Date | null
    subbrandform: string | null
    customer_name: string | null
    customer_code: string | null
    p_code: number | null
    customer_type: string | null
    category: string | null
    brand: string | null
    brandform: string | null
    retailing: Decimal | null
  }

  export type Psr_data_historicalMaxAggregateOutputType = {
    psr_id: number | null
    document_no: string | null
    document_date: Date | null
    subbrandform: string | null
    customer_name: string | null
    customer_code: string | null
    p_code: number | null
    customer_type: string | null
    category: string | null
    brand: string | null
    brandform: string | null
    retailing: Decimal | null
  }

  export type Psr_data_historicalCountAggregateOutputType = {
    psr_id: number
    document_no: number
    document_date: number
    subbrandform: number
    customer_name: number
    customer_code: number
    p_code: number
    customer_type: number
    category: number
    brand: number
    brandform: number
    retailing: number
    _all: number
  }


  export type Psr_data_historicalAvgAggregateInputType = {
    psr_id?: true
    p_code?: true
    retailing?: true
  }

  export type Psr_data_historicalSumAggregateInputType = {
    psr_id?: true
    p_code?: true
    retailing?: true
  }

  export type Psr_data_historicalMinAggregateInputType = {
    psr_id?: true
    document_no?: true
    document_date?: true
    subbrandform?: true
    customer_name?: true
    customer_code?: true
    p_code?: true
    customer_type?: true
    category?: true
    brand?: true
    brandform?: true
    retailing?: true
  }

  export type Psr_data_historicalMaxAggregateInputType = {
    psr_id?: true
    document_no?: true
    document_date?: true
    subbrandform?: true
    customer_name?: true
    customer_code?: true
    p_code?: true
    customer_type?: true
    category?: true
    brand?: true
    brandform?: true
    retailing?: true
  }

  export type Psr_data_historicalCountAggregateInputType = {
    psr_id?: true
    document_no?: true
    document_date?: true
    subbrandform?: true
    customer_name?: true
    customer_code?: true
    p_code?: true
    customer_type?: true
    category?: true
    brand?: true
    brandform?: true
    retailing?: true
    _all?: true
  }

  export type Psr_data_historicalAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which psr_data_historical to aggregate.
     */
    where?: psr_data_historicalWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of psr_data_historicals to fetch.
     */
    orderBy?: psr_data_historicalOrderByWithRelationInput | psr_data_historicalOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: psr_data_historicalWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` psr_data_historicals from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` psr_data_historicals.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned psr_data_historicals
    **/
    _count?: true | Psr_data_historicalCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: Psr_data_historicalAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: Psr_data_historicalSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: Psr_data_historicalMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: Psr_data_historicalMaxAggregateInputType
  }

  export type GetPsr_data_historicalAggregateType<T extends Psr_data_historicalAggregateArgs> = {
        [P in keyof T & keyof AggregatePsr_data_historical]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePsr_data_historical[P]>
      : GetScalarType<T[P], AggregatePsr_data_historical[P]>
  }




  export type psr_data_historicalGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: psr_data_historicalWhereInput
    orderBy?: psr_data_historicalOrderByWithAggregationInput | psr_data_historicalOrderByWithAggregationInput[]
    by: Psr_data_historicalScalarFieldEnum[] | Psr_data_historicalScalarFieldEnum
    having?: psr_data_historicalScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: Psr_data_historicalCountAggregateInputType | true
    _avg?: Psr_data_historicalAvgAggregateInputType
    _sum?: Psr_data_historicalSumAggregateInputType
    _min?: Psr_data_historicalMinAggregateInputType
    _max?: Psr_data_historicalMaxAggregateInputType
  }

  export type Psr_data_historicalGroupByOutputType = {
    psr_id: number
    document_no: string
    document_date: Date
    subbrandform: string
    customer_name: string
    customer_code: string
    p_code: number
    customer_type: string
    category: string
    brand: string
    brandform: string
    retailing: Decimal
    _count: Psr_data_historicalCountAggregateOutputType | null
    _avg: Psr_data_historicalAvgAggregateOutputType | null
    _sum: Psr_data_historicalSumAggregateOutputType | null
    _min: Psr_data_historicalMinAggregateOutputType | null
    _max: Psr_data_historicalMaxAggregateOutputType | null
  }

  type GetPsr_data_historicalGroupByPayload<T extends psr_data_historicalGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<Psr_data_historicalGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof Psr_data_historicalGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], Psr_data_historicalGroupByOutputType[P]>
            : GetScalarType<T[P], Psr_data_historicalGroupByOutputType[P]>
        }
      >
    >


  export type psr_data_historicalSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    psr_id?: boolean
    document_no?: boolean
    document_date?: boolean
    subbrandform?: boolean
    customer_name?: boolean
    customer_code?: boolean
    p_code?: boolean
    customer_type?: boolean
    category?: boolean
    brand?: boolean
    brandform?: boolean
    retailing?: boolean
  }, ExtArgs["result"]["psr_data_historical"]>



  export type psr_data_historicalSelectScalar = {
    psr_id?: boolean
    document_no?: boolean
    document_date?: boolean
    subbrandform?: boolean
    customer_name?: boolean
    customer_code?: boolean
    p_code?: boolean
    customer_type?: boolean
    category?: boolean
    brand?: boolean
    brandform?: boolean
    retailing?: boolean
  }

  export type psr_data_historicalOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"psr_id" | "document_no" | "document_date" | "subbrandform" | "customer_name" | "customer_code" | "p_code" | "customer_type" | "category" | "brand" | "brandform" | "retailing", ExtArgs["result"]["psr_data_historical"]>

  export type $psr_data_historicalPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "psr_data_historical"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      psr_id: number
      document_no: string
      document_date: Date
      subbrandform: string
      customer_name: string
      customer_code: string
      p_code: number
      customer_type: string
      category: string
      brand: string
      brandform: string
      retailing: Prisma.Decimal
    }, ExtArgs["result"]["psr_data_historical"]>
    composites: {}
  }

  type psr_data_historicalGetPayload<S extends boolean | null | undefined | psr_data_historicalDefaultArgs> = $Result.GetResult<Prisma.$psr_data_historicalPayload, S>

  type psr_data_historicalCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<psr_data_historicalFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: Psr_data_historicalCountAggregateInputType | true
    }

  export interface psr_data_historicalDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['psr_data_historical'], meta: { name: 'psr_data_historical' } }
    /**
     * Find zero or one Psr_data_historical that matches the filter.
     * @param {psr_data_historicalFindUniqueArgs} args - Arguments to find a Psr_data_historical
     * @example
     * // Get one Psr_data_historical
     * const psr_data_historical = await prisma.psr_data_historical.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends psr_data_historicalFindUniqueArgs>(args: SelectSubset<T, psr_data_historicalFindUniqueArgs<ExtArgs>>): Prisma__psr_data_historicalClient<$Result.GetResult<Prisma.$psr_data_historicalPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Psr_data_historical that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {psr_data_historicalFindUniqueOrThrowArgs} args - Arguments to find a Psr_data_historical
     * @example
     * // Get one Psr_data_historical
     * const psr_data_historical = await prisma.psr_data_historical.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends psr_data_historicalFindUniqueOrThrowArgs>(args: SelectSubset<T, psr_data_historicalFindUniqueOrThrowArgs<ExtArgs>>): Prisma__psr_data_historicalClient<$Result.GetResult<Prisma.$psr_data_historicalPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Psr_data_historical that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {psr_data_historicalFindFirstArgs} args - Arguments to find a Psr_data_historical
     * @example
     * // Get one Psr_data_historical
     * const psr_data_historical = await prisma.psr_data_historical.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends psr_data_historicalFindFirstArgs>(args?: SelectSubset<T, psr_data_historicalFindFirstArgs<ExtArgs>>): Prisma__psr_data_historicalClient<$Result.GetResult<Prisma.$psr_data_historicalPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Psr_data_historical that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {psr_data_historicalFindFirstOrThrowArgs} args - Arguments to find a Psr_data_historical
     * @example
     * // Get one Psr_data_historical
     * const psr_data_historical = await prisma.psr_data_historical.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends psr_data_historicalFindFirstOrThrowArgs>(args?: SelectSubset<T, psr_data_historicalFindFirstOrThrowArgs<ExtArgs>>): Prisma__psr_data_historicalClient<$Result.GetResult<Prisma.$psr_data_historicalPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Psr_data_historicals that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {psr_data_historicalFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Psr_data_historicals
     * const psr_data_historicals = await prisma.psr_data_historical.findMany()
     * 
     * // Get first 10 Psr_data_historicals
     * const psr_data_historicals = await prisma.psr_data_historical.findMany({ take: 10 })
     * 
     * // Only select the `psr_id`
     * const psr_data_historicalWithPsr_idOnly = await prisma.psr_data_historical.findMany({ select: { psr_id: true } })
     * 
     */
    findMany<T extends psr_data_historicalFindManyArgs>(args?: SelectSubset<T, psr_data_historicalFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$psr_data_historicalPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Psr_data_historical.
     * @param {psr_data_historicalCreateArgs} args - Arguments to create a Psr_data_historical.
     * @example
     * // Create one Psr_data_historical
     * const Psr_data_historical = await prisma.psr_data_historical.create({
     *   data: {
     *     // ... data to create a Psr_data_historical
     *   }
     * })
     * 
     */
    create<T extends psr_data_historicalCreateArgs>(args: SelectSubset<T, psr_data_historicalCreateArgs<ExtArgs>>): Prisma__psr_data_historicalClient<$Result.GetResult<Prisma.$psr_data_historicalPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Psr_data_historicals.
     * @param {psr_data_historicalCreateManyArgs} args - Arguments to create many Psr_data_historicals.
     * @example
     * // Create many Psr_data_historicals
     * const psr_data_historical = await prisma.psr_data_historical.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends psr_data_historicalCreateManyArgs>(args?: SelectSubset<T, psr_data_historicalCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Psr_data_historical.
     * @param {psr_data_historicalDeleteArgs} args - Arguments to delete one Psr_data_historical.
     * @example
     * // Delete one Psr_data_historical
     * const Psr_data_historical = await prisma.psr_data_historical.delete({
     *   where: {
     *     // ... filter to delete one Psr_data_historical
     *   }
     * })
     * 
     */
    delete<T extends psr_data_historicalDeleteArgs>(args: SelectSubset<T, psr_data_historicalDeleteArgs<ExtArgs>>): Prisma__psr_data_historicalClient<$Result.GetResult<Prisma.$psr_data_historicalPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Psr_data_historical.
     * @param {psr_data_historicalUpdateArgs} args - Arguments to update one Psr_data_historical.
     * @example
     * // Update one Psr_data_historical
     * const psr_data_historical = await prisma.psr_data_historical.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends psr_data_historicalUpdateArgs>(args: SelectSubset<T, psr_data_historicalUpdateArgs<ExtArgs>>): Prisma__psr_data_historicalClient<$Result.GetResult<Prisma.$psr_data_historicalPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Psr_data_historicals.
     * @param {psr_data_historicalDeleteManyArgs} args - Arguments to filter Psr_data_historicals to delete.
     * @example
     * // Delete a few Psr_data_historicals
     * const { count } = await prisma.psr_data_historical.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends psr_data_historicalDeleteManyArgs>(args?: SelectSubset<T, psr_data_historicalDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Psr_data_historicals.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {psr_data_historicalUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Psr_data_historicals
     * const psr_data_historical = await prisma.psr_data_historical.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends psr_data_historicalUpdateManyArgs>(args: SelectSubset<T, psr_data_historicalUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Psr_data_historical.
     * @param {psr_data_historicalUpsertArgs} args - Arguments to update or create a Psr_data_historical.
     * @example
     * // Update or create a Psr_data_historical
     * const psr_data_historical = await prisma.psr_data_historical.upsert({
     *   create: {
     *     // ... data to create a Psr_data_historical
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Psr_data_historical we want to update
     *   }
     * })
     */
    upsert<T extends psr_data_historicalUpsertArgs>(args: SelectSubset<T, psr_data_historicalUpsertArgs<ExtArgs>>): Prisma__psr_data_historicalClient<$Result.GetResult<Prisma.$psr_data_historicalPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Psr_data_historicals.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {psr_data_historicalCountArgs} args - Arguments to filter Psr_data_historicals to count.
     * @example
     * // Count the number of Psr_data_historicals
     * const count = await prisma.psr_data_historical.count({
     *   where: {
     *     // ... the filter for the Psr_data_historicals we want to count
     *   }
     * })
    **/
    count<T extends psr_data_historicalCountArgs>(
      args?: Subset<T, psr_data_historicalCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], Psr_data_historicalCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Psr_data_historical.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Psr_data_historicalAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends Psr_data_historicalAggregateArgs>(args: Subset<T, Psr_data_historicalAggregateArgs>): Prisma.PrismaPromise<GetPsr_data_historicalAggregateType<T>>

    /**
     * Group by Psr_data_historical.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {psr_data_historicalGroupByArgs} args - Group by arguments.
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
      T extends psr_data_historicalGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: psr_data_historicalGroupByArgs['orderBy'] }
        : { orderBy?: psr_data_historicalGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, psr_data_historicalGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPsr_data_historicalGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the psr_data_historical model
   */
  readonly fields: psr_data_historicalFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for psr_data_historical.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__psr_data_historicalClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
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
   * Fields of the psr_data_historical model
   */
  interface psr_data_historicalFieldRefs {
    readonly psr_id: FieldRef<"psr_data_historical", 'Int'>
    readonly document_no: FieldRef<"psr_data_historical", 'String'>
    readonly document_date: FieldRef<"psr_data_historical", 'DateTime'>
    readonly subbrandform: FieldRef<"psr_data_historical", 'String'>
    readonly customer_name: FieldRef<"psr_data_historical", 'String'>
    readonly customer_code: FieldRef<"psr_data_historical", 'String'>
    readonly p_code: FieldRef<"psr_data_historical", 'Int'>
    readonly customer_type: FieldRef<"psr_data_historical", 'String'>
    readonly category: FieldRef<"psr_data_historical", 'String'>
    readonly brand: FieldRef<"psr_data_historical", 'String'>
    readonly brandform: FieldRef<"psr_data_historical", 'String'>
    readonly retailing: FieldRef<"psr_data_historical", 'Decimal'>
  }
    

  // Custom InputTypes
  /**
   * psr_data_historical findUnique
   */
  export type psr_data_historicalFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the psr_data_historical
     */
    select?: psr_data_historicalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the psr_data_historical
     */
    omit?: psr_data_historicalOmit<ExtArgs> | null
    /**
     * Filter, which psr_data_historical to fetch.
     */
    where: psr_data_historicalWhereUniqueInput
  }

  /**
   * psr_data_historical findUniqueOrThrow
   */
  export type psr_data_historicalFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the psr_data_historical
     */
    select?: psr_data_historicalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the psr_data_historical
     */
    omit?: psr_data_historicalOmit<ExtArgs> | null
    /**
     * Filter, which psr_data_historical to fetch.
     */
    where: psr_data_historicalWhereUniqueInput
  }

  /**
   * psr_data_historical findFirst
   */
  export type psr_data_historicalFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the psr_data_historical
     */
    select?: psr_data_historicalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the psr_data_historical
     */
    omit?: psr_data_historicalOmit<ExtArgs> | null
    /**
     * Filter, which psr_data_historical to fetch.
     */
    where?: psr_data_historicalWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of psr_data_historicals to fetch.
     */
    orderBy?: psr_data_historicalOrderByWithRelationInput | psr_data_historicalOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for psr_data_historicals.
     */
    cursor?: psr_data_historicalWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` psr_data_historicals from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` psr_data_historicals.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of psr_data_historicals.
     */
    distinct?: Psr_data_historicalScalarFieldEnum | Psr_data_historicalScalarFieldEnum[]
  }

  /**
   * psr_data_historical findFirstOrThrow
   */
  export type psr_data_historicalFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the psr_data_historical
     */
    select?: psr_data_historicalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the psr_data_historical
     */
    omit?: psr_data_historicalOmit<ExtArgs> | null
    /**
     * Filter, which psr_data_historical to fetch.
     */
    where?: psr_data_historicalWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of psr_data_historicals to fetch.
     */
    orderBy?: psr_data_historicalOrderByWithRelationInput | psr_data_historicalOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for psr_data_historicals.
     */
    cursor?: psr_data_historicalWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` psr_data_historicals from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` psr_data_historicals.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of psr_data_historicals.
     */
    distinct?: Psr_data_historicalScalarFieldEnum | Psr_data_historicalScalarFieldEnum[]
  }

  /**
   * psr_data_historical findMany
   */
  export type psr_data_historicalFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the psr_data_historical
     */
    select?: psr_data_historicalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the psr_data_historical
     */
    omit?: psr_data_historicalOmit<ExtArgs> | null
    /**
     * Filter, which psr_data_historicals to fetch.
     */
    where?: psr_data_historicalWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of psr_data_historicals to fetch.
     */
    orderBy?: psr_data_historicalOrderByWithRelationInput | psr_data_historicalOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing psr_data_historicals.
     */
    cursor?: psr_data_historicalWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` psr_data_historicals from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` psr_data_historicals.
     */
    skip?: number
    distinct?: Psr_data_historicalScalarFieldEnum | Psr_data_historicalScalarFieldEnum[]
  }

  /**
   * psr_data_historical create
   */
  export type psr_data_historicalCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the psr_data_historical
     */
    select?: psr_data_historicalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the psr_data_historical
     */
    omit?: psr_data_historicalOmit<ExtArgs> | null
    /**
     * The data needed to create a psr_data_historical.
     */
    data: XOR<psr_data_historicalCreateInput, psr_data_historicalUncheckedCreateInput>
  }

  /**
   * psr_data_historical createMany
   */
  export type psr_data_historicalCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many psr_data_historicals.
     */
    data: psr_data_historicalCreateManyInput | psr_data_historicalCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * psr_data_historical update
   */
  export type psr_data_historicalUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the psr_data_historical
     */
    select?: psr_data_historicalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the psr_data_historical
     */
    omit?: psr_data_historicalOmit<ExtArgs> | null
    /**
     * The data needed to update a psr_data_historical.
     */
    data: XOR<psr_data_historicalUpdateInput, psr_data_historicalUncheckedUpdateInput>
    /**
     * Choose, which psr_data_historical to update.
     */
    where: psr_data_historicalWhereUniqueInput
  }

  /**
   * psr_data_historical updateMany
   */
  export type psr_data_historicalUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update psr_data_historicals.
     */
    data: XOR<psr_data_historicalUpdateManyMutationInput, psr_data_historicalUncheckedUpdateManyInput>
    /**
     * Filter which psr_data_historicals to update
     */
    where?: psr_data_historicalWhereInput
    /**
     * Limit how many psr_data_historicals to update.
     */
    limit?: number
  }

  /**
   * psr_data_historical upsert
   */
  export type psr_data_historicalUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the psr_data_historical
     */
    select?: psr_data_historicalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the psr_data_historical
     */
    omit?: psr_data_historicalOmit<ExtArgs> | null
    /**
     * The filter to search for the psr_data_historical to update in case it exists.
     */
    where: psr_data_historicalWhereUniqueInput
    /**
     * In case the psr_data_historical found by the `where` argument doesn't exist, create a new psr_data_historical with this data.
     */
    create: XOR<psr_data_historicalCreateInput, psr_data_historicalUncheckedCreateInput>
    /**
     * In case the psr_data_historical was found with the provided `where` argument, update it with this data.
     */
    update: XOR<psr_data_historicalUpdateInput, psr_data_historicalUncheckedUpdateInput>
  }

  /**
   * psr_data_historical delete
   */
  export type psr_data_historicalDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the psr_data_historical
     */
    select?: psr_data_historicalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the psr_data_historical
     */
    omit?: psr_data_historicalOmit<ExtArgs> | null
    /**
     * Filter which psr_data_historical to delete.
     */
    where: psr_data_historicalWhereUniqueInput
  }

  /**
   * psr_data_historical deleteMany
   */
  export type psr_data_historicalDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which psr_data_historicals to delete
     */
    where?: psr_data_historicalWhereInput
    /**
     * Limit how many psr_data_historicals to delete.
     */
    limit?: number
  }

  /**
   * psr_data_historical without action
   */
  export type psr_data_historicalDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the psr_data_historical
     */
    select?: psr_data_historicalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the psr_data_historical
     */
    omit?: psr_data_historicalOmit<ExtArgs> | null
  }


  /**
   * Model psr_finalized_temp
   */

  export type AggregatePsr_finalized_temp = {
    _count: Psr_finalized_tempCountAggregateOutputType | null
    _avg: Psr_finalized_tempAvgAggregateOutputType | null
    _sum: Psr_finalized_tempSumAggregateOutputType | null
    _min: Psr_finalized_tempMinAggregateOutputType | null
    _max: Psr_finalized_tempMaxAggregateOutputType | null
  }

  export type Psr_finalized_tempAvgAggregateOutputType = {
    id: number | null
    retailing: Decimal | null
  }

  export type Psr_finalized_tempSumAggregateOutputType = {
    id: number | null
    retailing: Decimal | null
  }

  export type Psr_finalized_tempMinAggregateOutputType = {
    id: number | null
    document_date: Date | null
    customer_code: string | null
    branch: string | null
    ZM: string | null
    RSM: string | null
    ASM: string | null
    TSI: string | null
    category: string | null
    brand: string | null
    brandform: string | null
    subbrandform: string | null
    base_channel: string | null
    short_channel: string | null
    channel_desc: string | null
    retailing: Decimal | null
  }

  export type Psr_finalized_tempMaxAggregateOutputType = {
    id: number | null
    document_date: Date | null
    customer_code: string | null
    branch: string | null
    ZM: string | null
    RSM: string | null
    ASM: string | null
    TSI: string | null
    category: string | null
    brand: string | null
    brandform: string | null
    subbrandform: string | null
    base_channel: string | null
    short_channel: string | null
    channel_desc: string | null
    retailing: Decimal | null
  }

  export type Psr_finalized_tempCountAggregateOutputType = {
    id: number
    document_date: number
    customer_code: number
    branch: number
    ZM: number
    RSM: number
    ASM: number
    TSI: number
    category: number
    brand: number
    brandform: number
    subbrandform: number
    base_channel: number
    short_channel: number
    channel_desc: number
    retailing: number
    _all: number
  }


  export type Psr_finalized_tempAvgAggregateInputType = {
    id?: true
    retailing?: true
  }

  export type Psr_finalized_tempSumAggregateInputType = {
    id?: true
    retailing?: true
  }

  export type Psr_finalized_tempMinAggregateInputType = {
    id?: true
    document_date?: true
    customer_code?: true
    branch?: true
    ZM?: true
    RSM?: true
    ASM?: true
    TSI?: true
    category?: true
    brand?: true
    brandform?: true
    subbrandform?: true
    base_channel?: true
    short_channel?: true
    channel_desc?: true
    retailing?: true
  }

  export type Psr_finalized_tempMaxAggregateInputType = {
    id?: true
    document_date?: true
    customer_code?: true
    branch?: true
    ZM?: true
    RSM?: true
    ASM?: true
    TSI?: true
    category?: true
    brand?: true
    brandform?: true
    subbrandform?: true
    base_channel?: true
    short_channel?: true
    channel_desc?: true
    retailing?: true
  }

  export type Psr_finalized_tempCountAggregateInputType = {
    id?: true
    document_date?: true
    customer_code?: true
    branch?: true
    ZM?: true
    RSM?: true
    ASM?: true
    TSI?: true
    category?: true
    brand?: true
    brandform?: true
    subbrandform?: true
    base_channel?: true
    short_channel?: true
    channel_desc?: true
    retailing?: true
    _all?: true
  }

  export type Psr_finalized_tempAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which psr_finalized_temp to aggregate.
     */
    where?: psr_finalized_tempWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of psr_finalized_temps to fetch.
     */
    orderBy?: psr_finalized_tempOrderByWithRelationInput | psr_finalized_tempOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: psr_finalized_tempWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` psr_finalized_temps from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` psr_finalized_temps.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned psr_finalized_temps
    **/
    _count?: true | Psr_finalized_tempCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: Psr_finalized_tempAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: Psr_finalized_tempSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: Psr_finalized_tempMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: Psr_finalized_tempMaxAggregateInputType
  }

  export type GetPsr_finalized_tempAggregateType<T extends Psr_finalized_tempAggregateArgs> = {
        [P in keyof T & keyof AggregatePsr_finalized_temp]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePsr_finalized_temp[P]>
      : GetScalarType<T[P], AggregatePsr_finalized_temp[P]>
  }




  export type psr_finalized_tempGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: psr_finalized_tempWhereInput
    orderBy?: psr_finalized_tempOrderByWithAggregationInput | psr_finalized_tempOrderByWithAggregationInput[]
    by: Psr_finalized_tempScalarFieldEnum[] | Psr_finalized_tempScalarFieldEnum
    having?: psr_finalized_tempScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: Psr_finalized_tempCountAggregateInputType | true
    _avg?: Psr_finalized_tempAvgAggregateInputType
    _sum?: Psr_finalized_tempSumAggregateInputType
    _min?: Psr_finalized_tempMinAggregateInputType
    _max?: Psr_finalized_tempMaxAggregateInputType
  }

  export type Psr_finalized_tempGroupByOutputType = {
    id: number
    document_date: Date
    customer_code: string
    branch: string | null
    ZM: string | null
    RSM: string | null
    ASM: string | null
    TSI: string | null
    category: string | null
    brand: string | null
    brandform: string | null
    subbrandform: string | null
    base_channel: string | null
    short_channel: string | null
    channel_desc: string | null
    retailing: Decimal
    _count: Psr_finalized_tempCountAggregateOutputType | null
    _avg: Psr_finalized_tempAvgAggregateOutputType | null
    _sum: Psr_finalized_tempSumAggregateOutputType | null
    _min: Psr_finalized_tempMinAggregateOutputType | null
    _max: Psr_finalized_tempMaxAggregateOutputType | null
  }

  type GetPsr_finalized_tempGroupByPayload<T extends psr_finalized_tempGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<Psr_finalized_tempGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof Psr_finalized_tempGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], Psr_finalized_tempGroupByOutputType[P]>
            : GetScalarType<T[P], Psr_finalized_tempGroupByOutputType[P]>
        }
      >
    >


  export type psr_finalized_tempSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    document_date?: boolean
    customer_code?: boolean
    branch?: boolean
    ZM?: boolean
    RSM?: boolean
    ASM?: boolean
    TSI?: boolean
    category?: boolean
    brand?: boolean
    brandform?: boolean
    subbrandform?: boolean
    base_channel?: boolean
    short_channel?: boolean
    channel_desc?: boolean
    retailing?: boolean
  }, ExtArgs["result"]["psr_finalized_temp"]>



  export type psr_finalized_tempSelectScalar = {
    id?: boolean
    document_date?: boolean
    customer_code?: boolean
    branch?: boolean
    ZM?: boolean
    RSM?: boolean
    ASM?: boolean
    TSI?: boolean
    category?: boolean
    brand?: boolean
    brandform?: boolean
    subbrandform?: boolean
    base_channel?: boolean
    short_channel?: boolean
    channel_desc?: boolean
    retailing?: boolean
  }

  export type psr_finalized_tempOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "document_date" | "customer_code" | "branch" | "ZM" | "RSM" | "ASM" | "TSI" | "category" | "brand" | "brandform" | "subbrandform" | "base_channel" | "short_channel" | "channel_desc" | "retailing", ExtArgs["result"]["psr_finalized_temp"]>

  export type $psr_finalized_tempPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "psr_finalized_temp"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: number
      document_date: Date
      customer_code: string
      branch: string | null
      ZM: string | null
      RSM: string | null
      ASM: string | null
      TSI: string | null
      category: string | null
      brand: string | null
      brandform: string | null
      subbrandform: string | null
      base_channel: string | null
      short_channel: string | null
      channel_desc: string | null
      retailing: Prisma.Decimal
    }, ExtArgs["result"]["psr_finalized_temp"]>
    composites: {}
  }

  type psr_finalized_tempGetPayload<S extends boolean | null | undefined | psr_finalized_tempDefaultArgs> = $Result.GetResult<Prisma.$psr_finalized_tempPayload, S>

  type psr_finalized_tempCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<psr_finalized_tempFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: Psr_finalized_tempCountAggregateInputType | true
    }

  export interface psr_finalized_tempDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['psr_finalized_temp'], meta: { name: 'psr_finalized_temp' } }
    /**
     * Find zero or one Psr_finalized_temp that matches the filter.
     * @param {psr_finalized_tempFindUniqueArgs} args - Arguments to find a Psr_finalized_temp
     * @example
     * // Get one Psr_finalized_temp
     * const psr_finalized_temp = await prisma.psr_finalized_temp.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends psr_finalized_tempFindUniqueArgs>(args: SelectSubset<T, psr_finalized_tempFindUniqueArgs<ExtArgs>>): Prisma__psr_finalized_tempClient<$Result.GetResult<Prisma.$psr_finalized_tempPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Psr_finalized_temp that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {psr_finalized_tempFindUniqueOrThrowArgs} args - Arguments to find a Psr_finalized_temp
     * @example
     * // Get one Psr_finalized_temp
     * const psr_finalized_temp = await prisma.psr_finalized_temp.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends psr_finalized_tempFindUniqueOrThrowArgs>(args: SelectSubset<T, psr_finalized_tempFindUniqueOrThrowArgs<ExtArgs>>): Prisma__psr_finalized_tempClient<$Result.GetResult<Prisma.$psr_finalized_tempPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Psr_finalized_temp that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {psr_finalized_tempFindFirstArgs} args - Arguments to find a Psr_finalized_temp
     * @example
     * // Get one Psr_finalized_temp
     * const psr_finalized_temp = await prisma.psr_finalized_temp.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends psr_finalized_tempFindFirstArgs>(args?: SelectSubset<T, psr_finalized_tempFindFirstArgs<ExtArgs>>): Prisma__psr_finalized_tempClient<$Result.GetResult<Prisma.$psr_finalized_tempPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Psr_finalized_temp that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {psr_finalized_tempFindFirstOrThrowArgs} args - Arguments to find a Psr_finalized_temp
     * @example
     * // Get one Psr_finalized_temp
     * const psr_finalized_temp = await prisma.psr_finalized_temp.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends psr_finalized_tempFindFirstOrThrowArgs>(args?: SelectSubset<T, psr_finalized_tempFindFirstOrThrowArgs<ExtArgs>>): Prisma__psr_finalized_tempClient<$Result.GetResult<Prisma.$psr_finalized_tempPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Psr_finalized_temps that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {psr_finalized_tempFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Psr_finalized_temps
     * const psr_finalized_temps = await prisma.psr_finalized_temp.findMany()
     * 
     * // Get first 10 Psr_finalized_temps
     * const psr_finalized_temps = await prisma.psr_finalized_temp.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const psr_finalized_tempWithIdOnly = await prisma.psr_finalized_temp.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends psr_finalized_tempFindManyArgs>(args?: SelectSubset<T, psr_finalized_tempFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$psr_finalized_tempPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Psr_finalized_temp.
     * @param {psr_finalized_tempCreateArgs} args - Arguments to create a Psr_finalized_temp.
     * @example
     * // Create one Psr_finalized_temp
     * const Psr_finalized_temp = await prisma.psr_finalized_temp.create({
     *   data: {
     *     // ... data to create a Psr_finalized_temp
     *   }
     * })
     * 
     */
    create<T extends psr_finalized_tempCreateArgs>(args: SelectSubset<T, psr_finalized_tempCreateArgs<ExtArgs>>): Prisma__psr_finalized_tempClient<$Result.GetResult<Prisma.$psr_finalized_tempPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Psr_finalized_temps.
     * @param {psr_finalized_tempCreateManyArgs} args - Arguments to create many Psr_finalized_temps.
     * @example
     * // Create many Psr_finalized_temps
     * const psr_finalized_temp = await prisma.psr_finalized_temp.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends psr_finalized_tempCreateManyArgs>(args?: SelectSubset<T, psr_finalized_tempCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Psr_finalized_temp.
     * @param {psr_finalized_tempDeleteArgs} args - Arguments to delete one Psr_finalized_temp.
     * @example
     * // Delete one Psr_finalized_temp
     * const Psr_finalized_temp = await prisma.psr_finalized_temp.delete({
     *   where: {
     *     // ... filter to delete one Psr_finalized_temp
     *   }
     * })
     * 
     */
    delete<T extends psr_finalized_tempDeleteArgs>(args: SelectSubset<T, psr_finalized_tempDeleteArgs<ExtArgs>>): Prisma__psr_finalized_tempClient<$Result.GetResult<Prisma.$psr_finalized_tempPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Psr_finalized_temp.
     * @param {psr_finalized_tempUpdateArgs} args - Arguments to update one Psr_finalized_temp.
     * @example
     * // Update one Psr_finalized_temp
     * const psr_finalized_temp = await prisma.psr_finalized_temp.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends psr_finalized_tempUpdateArgs>(args: SelectSubset<T, psr_finalized_tempUpdateArgs<ExtArgs>>): Prisma__psr_finalized_tempClient<$Result.GetResult<Prisma.$psr_finalized_tempPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Psr_finalized_temps.
     * @param {psr_finalized_tempDeleteManyArgs} args - Arguments to filter Psr_finalized_temps to delete.
     * @example
     * // Delete a few Psr_finalized_temps
     * const { count } = await prisma.psr_finalized_temp.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends psr_finalized_tempDeleteManyArgs>(args?: SelectSubset<T, psr_finalized_tempDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Psr_finalized_temps.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {psr_finalized_tempUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Psr_finalized_temps
     * const psr_finalized_temp = await prisma.psr_finalized_temp.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends psr_finalized_tempUpdateManyArgs>(args: SelectSubset<T, psr_finalized_tempUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Psr_finalized_temp.
     * @param {psr_finalized_tempUpsertArgs} args - Arguments to update or create a Psr_finalized_temp.
     * @example
     * // Update or create a Psr_finalized_temp
     * const psr_finalized_temp = await prisma.psr_finalized_temp.upsert({
     *   create: {
     *     // ... data to create a Psr_finalized_temp
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Psr_finalized_temp we want to update
     *   }
     * })
     */
    upsert<T extends psr_finalized_tempUpsertArgs>(args: SelectSubset<T, psr_finalized_tempUpsertArgs<ExtArgs>>): Prisma__psr_finalized_tempClient<$Result.GetResult<Prisma.$psr_finalized_tempPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Psr_finalized_temps.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {psr_finalized_tempCountArgs} args - Arguments to filter Psr_finalized_temps to count.
     * @example
     * // Count the number of Psr_finalized_temps
     * const count = await prisma.psr_finalized_temp.count({
     *   where: {
     *     // ... the filter for the Psr_finalized_temps we want to count
     *   }
     * })
    **/
    count<T extends psr_finalized_tempCountArgs>(
      args?: Subset<T, psr_finalized_tempCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], Psr_finalized_tempCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Psr_finalized_temp.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Psr_finalized_tempAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends Psr_finalized_tempAggregateArgs>(args: Subset<T, Psr_finalized_tempAggregateArgs>): Prisma.PrismaPromise<GetPsr_finalized_tempAggregateType<T>>

    /**
     * Group by Psr_finalized_temp.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {psr_finalized_tempGroupByArgs} args - Group by arguments.
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
      T extends psr_finalized_tempGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: psr_finalized_tempGroupByArgs['orderBy'] }
        : { orderBy?: psr_finalized_tempGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, psr_finalized_tempGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPsr_finalized_tempGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the psr_finalized_temp model
   */
  readonly fields: psr_finalized_tempFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for psr_finalized_temp.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__psr_finalized_tempClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
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
   * Fields of the psr_finalized_temp model
   */
  interface psr_finalized_tempFieldRefs {
    readonly id: FieldRef<"psr_finalized_temp", 'Int'>
    readonly document_date: FieldRef<"psr_finalized_temp", 'DateTime'>
    readonly customer_code: FieldRef<"psr_finalized_temp", 'String'>
    readonly branch: FieldRef<"psr_finalized_temp", 'String'>
    readonly ZM: FieldRef<"psr_finalized_temp", 'String'>
    readonly RSM: FieldRef<"psr_finalized_temp", 'String'>
    readonly ASM: FieldRef<"psr_finalized_temp", 'String'>
    readonly TSI: FieldRef<"psr_finalized_temp", 'String'>
    readonly category: FieldRef<"psr_finalized_temp", 'String'>
    readonly brand: FieldRef<"psr_finalized_temp", 'String'>
    readonly brandform: FieldRef<"psr_finalized_temp", 'String'>
    readonly subbrandform: FieldRef<"psr_finalized_temp", 'String'>
    readonly base_channel: FieldRef<"psr_finalized_temp", 'String'>
    readonly short_channel: FieldRef<"psr_finalized_temp", 'String'>
    readonly channel_desc: FieldRef<"psr_finalized_temp", 'String'>
    readonly retailing: FieldRef<"psr_finalized_temp", 'Decimal'>
  }
    

  // Custom InputTypes
  /**
   * psr_finalized_temp findUnique
   */
  export type psr_finalized_tempFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the psr_finalized_temp
     */
    select?: psr_finalized_tempSelect<ExtArgs> | null
    /**
     * Omit specific fields from the psr_finalized_temp
     */
    omit?: psr_finalized_tempOmit<ExtArgs> | null
    /**
     * Filter, which psr_finalized_temp to fetch.
     */
    where: psr_finalized_tempWhereUniqueInput
  }

  /**
   * psr_finalized_temp findUniqueOrThrow
   */
  export type psr_finalized_tempFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the psr_finalized_temp
     */
    select?: psr_finalized_tempSelect<ExtArgs> | null
    /**
     * Omit specific fields from the psr_finalized_temp
     */
    omit?: psr_finalized_tempOmit<ExtArgs> | null
    /**
     * Filter, which psr_finalized_temp to fetch.
     */
    where: psr_finalized_tempWhereUniqueInput
  }

  /**
   * psr_finalized_temp findFirst
   */
  export type psr_finalized_tempFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the psr_finalized_temp
     */
    select?: psr_finalized_tempSelect<ExtArgs> | null
    /**
     * Omit specific fields from the psr_finalized_temp
     */
    omit?: psr_finalized_tempOmit<ExtArgs> | null
    /**
     * Filter, which psr_finalized_temp to fetch.
     */
    where?: psr_finalized_tempWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of psr_finalized_temps to fetch.
     */
    orderBy?: psr_finalized_tempOrderByWithRelationInput | psr_finalized_tempOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for psr_finalized_temps.
     */
    cursor?: psr_finalized_tempWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` psr_finalized_temps from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` psr_finalized_temps.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of psr_finalized_temps.
     */
    distinct?: Psr_finalized_tempScalarFieldEnum | Psr_finalized_tempScalarFieldEnum[]
  }

  /**
   * psr_finalized_temp findFirstOrThrow
   */
  export type psr_finalized_tempFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the psr_finalized_temp
     */
    select?: psr_finalized_tempSelect<ExtArgs> | null
    /**
     * Omit specific fields from the psr_finalized_temp
     */
    omit?: psr_finalized_tempOmit<ExtArgs> | null
    /**
     * Filter, which psr_finalized_temp to fetch.
     */
    where?: psr_finalized_tempWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of psr_finalized_temps to fetch.
     */
    orderBy?: psr_finalized_tempOrderByWithRelationInput | psr_finalized_tempOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for psr_finalized_temps.
     */
    cursor?: psr_finalized_tempWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` psr_finalized_temps from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` psr_finalized_temps.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of psr_finalized_temps.
     */
    distinct?: Psr_finalized_tempScalarFieldEnum | Psr_finalized_tempScalarFieldEnum[]
  }

  /**
   * psr_finalized_temp findMany
   */
  export type psr_finalized_tempFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the psr_finalized_temp
     */
    select?: psr_finalized_tempSelect<ExtArgs> | null
    /**
     * Omit specific fields from the psr_finalized_temp
     */
    omit?: psr_finalized_tempOmit<ExtArgs> | null
    /**
     * Filter, which psr_finalized_temps to fetch.
     */
    where?: psr_finalized_tempWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of psr_finalized_temps to fetch.
     */
    orderBy?: psr_finalized_tempOrderByWithRelationInput | psr_finalized_tempOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing psr_finalized_temps.
     */
    cursor?: psr_finalized_tempWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` psr_finalized_temps from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` psr_finalized_temps.
     */
    skip?: number
    distinct?: Psr_finalized_tempScalarFieldEnum | Psr_finalized_tempScalarFieldEnum[]
  }

  /**
   * psr_finalized_temp create
   */
  export type psr_finalized_tempCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the psr_finalized_temp
     */
    select?: psr_finalized_tempSelect<ExtArgs> | null
    /**
     * Omit specific fields from the psr_finalized_temp
     */
    omit?: psr_finalized_tempOmit<ExtArgs> | null
    /**
     * The data needed to create a psr_finalized_temp.
     */
    data: XOR<psr_finalized_tempCreateInput, psr_finalized_tempUncheckedCreateInput>
  }

  /**
   * psr_finalized_temp createMany
   */
  export type psr_finalized_tempCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many psr_finalized_temps.
     */
    data: psr_finalized_tempCreateManyInput | psr_finalized_tempCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * psr_finalized_temp update
   */
  export type psr_finalized_tempUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the psr_finalized_temp
     */
    select?: psr_finalized_tempSelect<ExtArgs> | null
    /**
     * Omit specific fields from the psr_finalized_temp
     */
    omit?: psr_finalized_tempOmit<ExtArgs> | null
    /**
     * The data needed to update a psr_finalized_temp.
     */
    data: XOR<psr_finalized_tempUpdateInput, psr_finalized_tempUncheckedUpdateInput>
    /**
     * Choose, which psr_finalized_temp to update.
     */
    where: psr_finalized_tempWhereUniqueInput
  }

  /**
   * psr_finalized_temp updateMany
   */
  export type psr_finalized_tempUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update psr_finalized_temps.
     */
    data: XOR<psr_finalized_tempUpdateManyMutationInput, psr_finalized_tempUncheckedUpdateManyInput>
    /**
     * Filter which psr_finalized_temps to update
     */
    where?: psr_finalized_tempWhereInput
    /**
     * Limit how many psr_finalized_temps to update.
     */
    limit?: number
  }

  /**
   * psr_finalized_temp upsert
   */
  export type psr_finalized_tempUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the psr_finalized_temp
     */
    select?: psr_finalized_tempSelect<ExtArgs> | null
    /**
     * Omit specific fields from the psr_finalized_temp
     */
    omit?: psr_finalized_tempOmit<ExtArgs> | null
    /**
     * The filter to search for the psr_finalized_temp to update in case it exists.
     */
    where: psr_finalized_tempWhereUniqueInput
    /**
     * In case the psr_finalized_temp found by the `where` argument doesn't exist, create a new psr_finalized_temp with this data.
     */
    create: XOR<psr_finalized_tempCreateInput, psr_finalized_tempUncheckedCreateInput>
    /**
     * In case the psr_finalized_temp was found with the provided `where` argument, update it with this data.
     */
    update: XOR<psr_finalized_tempUpdateInput, psr_finalized_tempUncheckedUpdateInput>
  }

  /**
   * psr_finalized_temp delete
   */
  export type psr_finalized_tempDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the psr_finalized_temp
     */
    select?: psr_finalized_tempSelect<ExtArgs> | null
    /**
     * Omit specific fields from the psr_finalized_temp
     */
    omit?: psr_finalized_tempOmit<ExtArgs> | null
    /**
     * Filter which psr_finalized_temp to delete.
     */
    where: psr_finalized_tempWhereUniqueInput
  }

  /**
   * psr_finalized_temp deleteMany
   */
  export type psr_finalized_tempDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which psr_finalized_temps to delete
     */
    where?: psr_finalized_tempWhereInput
    /**
     * Limit how many psr_finalized_temps to delete.
     */
    limit?: number
  }

  /**
   * psr_finalized_temp without action
   */
  export type psr_finalized_tempDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the psr_finalized_temp
     */
    select?: psr_finalized_tempSelect<ExtArgs> | null
    /**
     * Omit specific fields from the psr_finalized_temp
     */
    omit?: psr_finalized_tempOmit<ExtArgs> | null
  }


  /**
   * Model psr_data_finalized
   */

  export type AggregatePsr_data_finalized = {
    _count: Psr_data_finalizedCountAggregateOutputType | null
    _avg: Psr_data_finalizedAvgAggregateOutputType | null
    _sum: Psr_data_finalizedSumAggregateOutputType | null
    _min: Psr_data_finalizedMinAggregateOutputType | null
    _max: Psr_data_finalizedMaxAggregateOutputType | null
  }

  export type Psr_data_finalizedAvgAggregateOutputType = {
    id: number | null
    retailing: Decimal | null
  }

  export type Psr_data_finalizedSumAggregateOutputType = {
    id: number | null
    retailing: Decimal | null
  }

  export type Psr_data_finalizedMinAggregateOutputType = {
    id: number | null
    document_date: Date | null
    customer_code: string | null
    branch: string | null
    ZM: string | null
    RSM: string | null
    ASM: string | null
    TSI: string | null
    category: string | null
    brand: string | null
    brandform: string | null
    subbrandform: string | null
    base_channel: string | null
    short_channel: string | null
    channel_desc: string | null
    retailing: Decimal | null
  }

  export type Psr_data_finalizedMaxAggregateOutputType = {
    id: number | null
    document_date: Date | null
    customer_code: string | null
    branch: string | null
    ZM: string | null
    RSM: string | null
    ASM: string | null
    TSI: string | null
    category: string | null
    brand: string | null
    brandform: string | null
    subbrandform: string | null
    base_channel: string | null
    short_channel: string | null
    channel_desc: string | null
    retailing: Decimal | null
  }

  export type Psr_data_finalizedCountAggregateOutputType = {
    id: number
    document_date: number
    customer_code: number
    branch: number
    ZM: number
    RSM: number
    ASM: number
    TSI: number
    category: number
    brand: number
    brandform: number
    subbrandform: number
    base_channel: number
    short_channel: number
    channel_desc: number
    retailing: number
    _all: number
  }


  export type Psr_data_finalizedAvgAggregateInputType = {
    id?: true
    retailing?: true
  }

  export type Psr_data_finalizedSumAggregateInputType = {
    id?: true
    retailing?: true
  }

  export type Psr_data_finalizedMinAggregateInputType = {
    id?: true
    document_date?: true
    customer_code?: true
    branch?: true
    ZM?: true
    RSM?: true
    ASM?: true
    TSI?: true
    category?: true
    brand?: true
    brandform?: true
    subbrandform?: true
    base_channel?: true
    short_channel?: true
    channel_desc?: true
    retailing?: true
  }

  export type Psr_data_finalizedMaxAggregateInputType = {
    id?: true
    document_date?: true
    customer_code?: true
    branch?: true
    ZM?: true
    RSM?: true
    ASM?: true
    TSI?: true
    category?: true
    brand?: true
    brandform?: true
    subbrandform?: true
    base_channel?: true
    short_channel?: true
    channel_desc?: true
    retailing?: true
  }

  export type Psr_data_finalizedCountAggregateInputType = {
    id?: true
    document_date?: true
    customer_code?: true
    branch?: true
    ZM?: true
    RSM?: true
    ASM?: true
    TSI?: true
    category?: true
    brand?: true
    brandform?: true
    subbrandform?: true
    base_channel?: true
    short_channel?: true
    channel_desc?: true
    retailing?: true
    _all?: true
  }

  export type Psr_data_finalizedAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which psr_data_finalized to aggregate.
     */
    where?: psr_data_finalizedWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of psr_data_finalizeds to fetch.
     */
    orderBy?: psr_data_finalizedOrderByWithRelationInput | psr_data_finalizedOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: psr_data_finalizedWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` psr_data_finalizeds from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` psr_data_finalizeds.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned psr_data_finalizeds
    **/
    _count?: true | Psr_data_finalizedCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: Psr_data_finalizedAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: Psr_data_finalizedSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: Psr_data_finalizedMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: Psr_data_finalizedMaxAggregateInputType
  }

  export type GetPsr_data_finalizedAggregateType<T extends Psr_data_finalizedAggregateArgs> = {
        [P in keyof T & keyof AggregatePsr_data_finalized]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePsr_data_finalized[P]>
      : GetScalarType<T[P], AggregatePsr_data_finalized[P]>
  }




  export type psr_data_finalizedGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: psr_data_finalizedWhereInput
    orderBy?: psr_data_finalizedOrderByWithAggregationInput | psr_data_finalizedOrderByWithAggregationInput[]
    by: Psr_data_finalizedScalarFieldEnum[] | Psr_data_finalizedScalarFieldEnum
    having?: psr_data_finalizedScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: Psr_data_finalizedCountAggregateInputType | true
    _avg?: Psr_data_finalizedAvgAggregateInputType
    _sum?: Psr_data_finalizedSumAggregateInputType
    _min?: Psr_data_finalizedMinAggregateInputType
    _max?: Psr_data_finalizedMaxAggregateInputType
  }

  export type Psr_data_finalizedGroupByOutputType = {
    id: number
    document_date: Date
    customer_code: string
    branch: string | null
    ZM: string | null
    RSM: string | null
    ASM: string | null
    TSI: string | null
    category: string | null
    brand: string | null
    brandform: string | null
    subbrandform: string | null
    base_channel: string | null
    short_channel: string | null
    channel_desc: string | null
    retailing: Decimal
    _count: Psr_data_finalizedCountAggregateOutputType | null
    _avg: Psr_data_finalizedAvgAggregateOutputType | null
    _sum: Psr_data_finalizedSumAggregateOutputType | null
    _min: Psr_data_finalizedMinAggregateOutputType | null
    _max: Psr_data_finalizedMaxAggregateOutputType | null
  }

  type GetPsr_data_finalizedGroupByPayload<T extends psr_data_finalizedGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<Psr_data_finalizedGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof Psr_data_finalizedGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], Psr_data_finalizedGroupByOutputType[P]>
            : GetScalarType<T[P], Psr_data_finalizedGroupByOutputType[P]>
        }
      >
    >


  export type psr_data_finalizedSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    document_date?: boolean
    customer_code?: boolean
    branch?: boolean
    ZM?: boolean
    RSM?: boolean
    ASM?: boolean
    TSI?: boolean
    category?: boolean
    brand?: boolean
    brandform?: boolean
    subbrandform?: boolean
    base_channel?: boolean
    short_channel?: boolean
    channel_desc?: boolean
    retailing?: boolean
  }, ExtArgs["result"]["psr_data_finalized"]>



  export type psr_data_finalizedSelectScalar = {
    id?: boolean
    document_date?: boolean
    customer_code?: boolean
    branch?: boolean
    ZM?: boolean
    RSM?: boolean
    ASM?: boolean
    TSI?: boolean
    category?: boolean
    brand?: boolean
    brandform?: boolean
    subbrandform?: boolean
    base_channel?: boolean
    short_channel?: boolean
    channel_desc?: boolean
    retailing?: boolean
  }

  export type psr_data_finalizedOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "document_date" | "customer_code" | "branch" | "ZM" | "RSM" | "ASM" | "TSI" | "category" | "brand" | "brandform" | "subbrandform" | "base_channel" | "short_channel" | "channel_desc" | "retailing", ExtArgs["result"]["psr_data_finalized"]>

  export type $psr_data_finalizedPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "psr_data_finalized"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: number
      document_date: Date
      customer_code: string
      branch: string | null
      ZM: string | null
      RSM: string | null
      ASM: string | null
      TSI: string | null
      category: string | null
      brand: string | null
      brandform: string | null
      subbrandform: string | null
      base_channel: string | null
      short_channel: string | null
      channel_desc: string | null
      retailing: Prisma.Decimal
    }, ExtArgs["result"]["psr_data_finalized"]>
    composites: {}
  }

  type psr_data_finalizedGetPayload<S extends boolean | null | undefined | psr_data_finalizedDefaultArgs> = $Result.GetResult<Prisma.$psr_data_finalizedPayload, S>

  type psr_data_finalizedCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<psr_data_finalizedFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: Psr_data_finalizedCountAggregateInputType | true
    }

  export interface psr_data_finalizedDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['psr_data_finalized'], meta: { name: 'psr_data_finalized' } }
    /**
     * Find zero or one Psr_data_finalized that matches the filter.
     * @param {psr_data_finalizedFindUniqueArgs} args - Arguments to find a Psr_data_finalized
     * @example
     * // Get one Psr_data_finalized
     * const psr_data_finalized = await prisma.psr_data_finalized.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends psr_data_finalizedFindUniqueArgs>(args: SelectSubset<T, psr_data_finalizedFindUniqueArgs<ExtArgs>>): Prisma__psr_data_finalizedClient<$Result.GetResult<Prisma.$psr_data_finalizedPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Psr_data_finalized that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {psr_data_finalizedFindUniqueOrThrowArgs} args - Arguments to find a Psr_data_finalized
     * @example
     * // Get one Psr_data_finalized
     * const psr_data_finalized = await prisma.psr_data_finalized.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends psr_data_finalizedFindUniqueOrThrowArgs>(args: SelectSubset<T, psr_data_finalizedFindUniqueOrThrowArgs<ExtArgs>>): Prisma__psr_data_finalizedClient<$Result.GetResult<Prisma.$psr_data_finalizedPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Psr_data_finalized that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {psr_data_finalizedFindFirstArgs} args - Arguments to find a Psr_data_finalized
     * @example
     * // Get one Psr_data_finalized
     * const psr_data_finalized = await prisma.psr_data_finalized.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends psr_data_finalizedFindFirstArgs>(args?: SelectSubset<T, psr_data_finalizedFindFirstArgs<ExtArgs>>): Prisma__psr_data_finalizedClient<$Result.GetResult<Prisma.$psr_data_finalizedPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Psr_data_finalized that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {psr_data_finalizedFindFirstOrThrowArgs} args - Arguments to find a Psr_data_finalized
     * @example
     * // Get one Psr_data_finalized
     * const psr_data_finalized = await prisma.psr_data_finalized.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends psr_data_finalizedFindFirstOrThrowArgs>(args?: SelectSubset<T, psr_data_finalizedFindFirstOrThrowArgs<ExtArgs>>): Prisma__psr_data_finalizedClient<$Result.GetResult<Prisma.$psr_data_finalizedPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Psr_data_finalizeds that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {psr_data_finalizedFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Psr_data_finalizeds
     * const psr_data_finalizeds = await prisma.psr_data_finalized.findMany()
     * 
     * // Get first 10 Psr_data_finalizeds
     * const psr_data_finalizeds = await prisma.psr_data_finalized.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const psr_data_finalizedWithIdOnly = await prisma.psr_data_finalized.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends psr_data_finalizedFindManyArgs>(args?: SelectSubset<T, psr_data_finalizedFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$psr_data_finalizedPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Psr_data_finalized.
     * @param {psr_data_finalizedCreateArgs} args - Arguments to create a Psr_data_finalized.
     * @example
     * // Create one Psr_data_finalized
     * const Psr_data_finalized = await prisma.psr_data_finalized.create({
     *   data: {
     *     // ... data to create a Psr_data_finalized
     *   }
     * })
     * 
     */
    create<T extends psr_data_finalizedCreateArgs>(args: SelectSubset<T, psr_data_finalizedCreateArgs<ExtArgs>>): Prisma__psr_data_finalizedClient<$Result.GetResult<Prisma.$psr_data_finalizedPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Psr_data_finalizeds.
     * @param {psr_data_finalizedCreateManyArgs} args - Arguments to create many Psr_data_finalizeds.
     * @example
     * // Create many Psr_data_finalizeds
     * const psr_data_finalized = await prisma.psr_data_finalized.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends psr_data_finalizedCreateManyArgs>(args?: SelectSubset<T, psr_data_finalizedCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Psr_data_finalized.
     * @param {psr_data_finalizedDeleteArgs} args - Arguments to delete one Psr_data_finalized.
     * @example
     * // Delete one Psr_data_finalized
     * const Psr_data_finalized = await prisma.psr_data_finalized.delete({
     *   where: {
     *     // ... filter to delete one Psr_data_finalized
     *   }
     * })
     * 
     */
    delete<T extends psr_data_finalizedDeleteArgs>(args: SelectSubset<T, psr_data_finalizedDeleteArgs<ExtArgs>>): Prisma__psr_data_finalizedClient<$Result.GetResult<Prisma.$psr_data_finalizedPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Psr_data_finalized.
     * @param {psr_data_finalizedUpdateArgs} args - Arguments to update one Psr_data_finalized.
     * @example
     * // Update one Psr_data_finalized
     * const psr_data_finalized = await prisma.psr_data_finalized.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends psr_data_finalizedUpdateArgs>(args: SelectSubset<T, psr_data_finalizedUpdateArgs<ExtArgs>>): Prisma__psr_data_finalizedClient<$Result.GetResult<Prisma.$psr_data_finalizedPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Psr_data_finalizeds.
     * @param {psr_data_finalizedDeleteManyArgs} args - Arguments to filter Psr_data_finalizeds to delete.
     * @example
     * // Delete a few Psr_data_finalizeds
     * const { count } = await prisma.psr_data_finalized.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends psr_data_finalizedDeleteManyArgs>(args?: SelectSubset<T, psr_data_finalizedDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Psr_data_finalizeds.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {psr_data_finalizedUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Psr_data_finalizeds
     * const psr_data_finalized = await prisma.psr_data_finalized.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends psr_data_finalizedUpdateManyArgs>(args: SelectSubset<T, psr_data_finalizedUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Psr_data_finalized.
     * @param {psr_data_finalizedUpsertArgs} args - Arguments to update or create a Psr_data_finalized.
     * @example
     * // Update or create a Psr_data_finalized
     * const psr_data_finalized = await prisma.psr_data_finalized.upsert({
     *   create: {
     *     // ... data to create a Psr_data_finalized
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Psr_data_finalized we want to update
     *   }
     * })
     */
    upsert<T extends psr_data_finalizedUpsertArgs>(args: SelectSubset<T, psr_data_finalizedUpsertArgs<ExtArgs>>): Prisma__psr_data_finalizedClient<$Result.GetResult<Prisma.$psr_data_finalizedPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Psr_data_finalizeds.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {psr_data_finalizedCountArgs} args - Arguments to filter Psr_data_finalizeds to count.
     * @example
     * // Count the number of Psr_data_finalizeds
     * const count = await prisma.psr_data_finalized.count({
     *   where: {
     *     // ... the filter for the Psr_data_finalizeds we want to count
     *   }
     * })
    **/
    count<T extends psr_data_finalizedCountArgs>(
      args?: Subset<T, psr_data_finalizedCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], Psr_data_finalizedCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Psr_data_finalized.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Psr_data_finalizedAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends Psr_data_finalizedAggregateArgs>(args: Subset<T, Psr_data_finalizedAggregateArgs>): Prisma.PrismaPromise<GetPsr_data_finalizedAggregateType<T>>

    /**
     * Group by Psr_data_finalized.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {psr_data_finalizedGroupByArgs} args - Group by arguments.
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
      T extends psr_data_finalizedGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: psr_data_finalizedGroupByArgs['orderBy'] }
        : { orderBy?: psr_data_finalizedGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, psr_data_finalizedGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPsr_data_finalizedGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the psr_data_finalized model
   */
  readonly fields: psr_data_finalizedFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for psr_data_finalized.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__psr_data_finalizedClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
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
   * Fields of the psr_data_finalized model
   */
  interface psr_data_finalizedFieldRefs {
    readonly id: FieldRef<"psr_data_finalized", 'Int'>
    readonly document_date: FieldRef<"psr_data_finalized", 'DateTime'>
    readonly customer_code: FieldRef<"psr_data_finalized", 'String'>
    readonly branch: FieldRef<"psr_data_finalized", 'String'>
    readonly ZM: FieldRef<"psr_data_finalized", 'String'>
    readonly RSM: FieldRef<"psr_data_finalized", 'String'>
    readonly ASM: FieldRef<"psr_data_finalized", 'String'>
    readonly TSI: FieldRef<"psr_data_finalized", 'String'>
    readonly category: FieldRef<"psr_data_finalized", 'String'>
    readonly brand: FieldRef<"psr_data_finalized", 'String'>
    readonly brandform: FieldRef<"psr_data_finalized", 'String'>
    readonly subbrandform: FieldRef<"psr_data_finalized", 'String'>
    readonly base_channel: FieldRef<"psr_data_finalized", 'String'>
    readonly short_channel: FieldRef<"psr_data_finalized", 'String'>
    readonly channel_desc: FieldRef<"psr_data_finalized", 'String'>
    readonly retailing: FieldRef<"psr_data_finalized", 'Decimal'>
  }
    

  // Custom InputTypes
  /**
   * psr_data_finalized findUnique
   */
  export type psr_data_finalizedFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the psr_data_finalized
     */
    select?: psr_data_finalizedSelect<ExtArgs> | null
    /**
     * Omit specific fields from the psr_data_finalized
     */
    omit?: psr_data_finalizedOmit<ExtArgs> | null
    /**
     * Filter, which psr_data_finalized to fetch.
     */
    where: psr_data_finalizedWhereUniqueInput
  }

  /**
   * psr_data_finalized findUniqueOrThrow
   */
  export type psr_data_finalizedFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the psr_data_finalized
     */
    select?: psr_data_finalizedSelect<ExtArgs> | null
    /**
     * Omit specific fields from the psr_data_finalized
     */
    omit?: psr_data_finalizedOmit<ExtArgs> | null
    /**
     * Filter, which psr_data_finalized to fetch.
     */
    where: psr_data_finalizedWhereUniqueInput
  }

  /**
   * psr_data_finalized findFirst
   */
  export type psr_data_finalizedFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the psr_data_finalized
     */
    select?: psr_data_finalizedSelect<ExtArgs> | null
    /**
     * Omit specific fields from the psr_data_finalized
     */
    omit?: psr_data_finalizedOmit<ExtArgs> | null
    /**
     * Filter, which psr_data_finalized to fetch.
     */
    where?: psr_data_finalizedWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of psr_data_finalizeds to fetch.
     */
    orderBy?: psr_data_finalizedOrderByWithRelationInput | psr_data_finalizedOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for psr_data_finalizeds.
     */
    cursor?: psr_data_finalizedWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` psr_data_finalizeds from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` psr_data_finalizeds.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of psr_data_finalizeds.
     */
    distinct?: Psr_data_finalizedScalarFieldEnum | Psr_data_finalizedScalarFieldEnum[]
  }

  /**
   * psr_data_finalized findFirstOrThrow
   */
  export type psr_data_finalizedFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the psr_data_finalized
     */
    select?: psr_data_finalizedSelect<ExtArgs> | null
    /**
     * Omit specific fields from the psr_data_finalized
     */
    omit?: psr_data_finalizedOmit<ExtArgs> | null
    /**
     * Filter, which psr_data_finalized to fetch.
     */
    where?: psr_data_finalizedWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of psr_data_finalizeds to fetch.
     */
    orderBy?: psr_data_finalizedOrderByWithRelationInput | psr_data_finalizedOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for psr_data_finalizeds.
     */
    cursor?: psr_data_finalizedWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` psr_data_finalizeds from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` psr_data_finalizeds.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of psr_data_finalizeds.
     */
    distinct?: Psr_data_finalizedScalarFieldEnum | Psr_data_finalizedScalarFieldEnum[]
  }

  /**
   * psr_data_finalized findMany
   */
  export type psr_data_finalizedFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the psr_data_finalized
     */
    select?: psr_data_finalizedSelect<ExtArgs> | null
    /**
     * Omit specific fields from the psr_data_finalized
     */
    omit?: psr_data_finalizedOmit<ExtArgs> | null
    /**
     * Filter, which psr_data_finalizeds to fetch.
     */
    where?: psr_data_finalizedWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of psr_data_finalizeds to fetch.
     */
    orderBy?: psr_data_finalizedOrderByWithRelationInput | psr_data_finalizedOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing psr_data_finalizeds.
     */
    cursor?: psr_data_finalizedWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` psr_data_finalizeds from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` psr_data_finalizeds.
     */
    skip?: number
    distinct?: Psr_data_finalizedScalarFieldEnum | Psr_data_finalizedScalarFieldEnum[]
  }

  /**
   * psr_data_finalized create
   */
  export type psr_data_finalizedCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the psr_data_finalized
     */
    select?: psr_data_finalizedSelect<ExtArgs> | null
    /**
     * Omit specific fields from the psr_data_finalized
     */
    omit?: psr_data_finalizedOmit<ExtArgs> | null
    /**
     * The data needed to create a psr_data_finalized.
     */
    data: XOR<psr_data_finalizedCreateInput, psr_data_finalizedUncheckedCreateInput>
  }

  /**
   * psr_data_finalized createMany
   */
  export type psr_data_finalizedCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many psr_data_finalizeds.
     */
    data: psr_data_finalizedCreateManyInput | psr_data_finalizedCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * psr_data_finalized update
   */
  export type psr_data_finalizedUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the psr_data_finalized
     */
    select?: psr_data_finalizedSelect<ExtArgs> | null
    /**
     * Omit specific fields from the psr_data_finalized
     */
    omit?: psr_data_finalizedOmit<ExtArgs> | null
    /**
     * The data needed to update a psr_data_finalized.
     */
    data: XOR<psr_data_finalizedUpdateInput, psr_data_finalizedUncheckedUpdateInput>
    /**
     * Choose, which psr_data_finalized to update.
     */
    where: psr_data_finalizedWhereUniqueInput
  }

  /**
   * psr_data_finalized updateMany
   */
  export type psr_data_finalizedUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update psr_data_finalizeds.
     */
    data: XOR<psr_data_finalizedUpdateManyMutationInput, psr_data_finalizedUncheckedUpdateManyInput>
    /**
     * Filter which psr_data_finalizeds to update
     */
    where?: psr_data_finalizedWhereInput
    /**
     * Limit how many psr_data_finalizeds to update.
     */
    limit?: number
  }

  /**
   * psr_data_finalized upsert
   */
  export type psr_data_finalizedUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the psr_data_finalized
     */
    select?: psr_data_finalizedSelect<ExtArgs> | null
    /**
     * Omit specific fields from the psr_data_finalized
     */
    omit?: psr_data_finalizedOmit<ExtArgs> | null
    /**
     * The filter to search for the psr_data_finalized to update in case it exists.
     */
    where: psr_data_finalizedWhereUniqueInput
    /**
     * In case the psr_data_finalized found by the `where` argument doesn't exist, create a new psr_data_finalized with this data.
     */
    create: XOR<psr_data_finalizedCreateInput, psr_data_finalizedUncheckedCreateInput>
    /**
     * In case the psr_data_finalized was found with the provided `where` argument, update it with this data.
     */
    update: XOR<psr_data_finalizedUpdateInput, psr_data_finalizedUncheckedUpdateInput>
  }

  /**
   * psr_data_finalized delete
   */
  export type psr_data_finalizedDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the psr_data_finalized
     */
    select?: psr_data_finalizedSelect<ExtArgs> | null
    /**
     * Omit specific fields from the psr_data_finalized
     */
    omit?: psr_data_finalizedOmit<ExtArgs> | null
    /**
     * Filter which psr_data_finalized to delete.
     */
    where: psr_data_finalizedWhereUniqueInput
  }

  /**
   * psr_data_finalized deleteMany
   */
  export type psr_data_finalizedDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which psr_data_finalizeds to delete
     */
    where?: psr_data_finalizedWhereInput
    /**
     * Limit how many psr_data_finalizeds to delete.
     */
    limit?: number
  }

  /**
   * psr_data_finalized without action
   */
  export type psr_data_finalizedDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the psr_data_finalized
     */
    select?: psr_data_finalizedSelect<ExtArgs> | null
    /**
     * Omit specific fields from the psr_data_finalized
     */
    omit?: psr_data_finalizedOmit<ExtArgs> | null
  }


  /**
   * Model channel_mapping
   */

  export type AggregateChannel_mapping = {
    _count: Channel_mappingCountAggregateOutputType | null
    _avg: Channel_mappingAvgAggregateOutputType | null
    _sum: Channel_mappingSumAggregateOutputType | null
    _min: Channel_mappingMinAggregateOutputType | null
    _max: Channel_mappingMaxAggregateOutputType | null
  }

  export type Channel_mappingAvgAggregateOutputType = {
    channel_id: number | null
  }

  export type Channel_mappingSumAggregateOutputType = {
    channel_id: number | null
  }

  export type Channel_mappingMinAggregateOutputType = {
    channel_id: number | null
    customer_type: string | null
    base_channel: string | null
    short_channel: string | null
    channel_desc: string | null
    created_at: Date | null
  }

  export type Channel_mappingMaxAggregateOutputType = {
    channel_id: number | null
    customer_type: string | null
    base_channel: string | null
    short_channel: string | null
    channel_desc: string | null
    created_at: Date | null
  }

  export type Channel_mappingCountAggregateOutputType = {
    channel_id: number
    customer_type: number
    base_channel: number
    short_channel: number
    channel_desc: number
    created_at: number
    _all: number
  }


  export type Channel_mappingAvgAggregateInputType = {
    channel_id?: true
  }

  export type Channel_mappingSumAggregateInputType = {
    channel_id?: true
  }

  export type Channel_mappingMinAggregateInputType = {
    channel_id?: true
    customer_type?: true
    base_channel?: true
    short_channel?: true
    channel_desc?: true
    created_at?: true
  }

  export type Channel_mappingMaxAggregateInputType = {
    channel_id?: true
    customer_type?: true
    base_channel?: true
    short_channel?: true
    channel_desc?: true
    created_at?: true
  }

  export type Channel_mappingCountAggregateInputType = {
    channel_id?: true
    customer_type?: true
    base_channel?: true
    short_channel?: true
    channel_desc?: true
    created_at?: true
    _all?: true
  }

  export type Channel_mappingAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which channel_mapping to aggregate.
     */
    where?: channel_mappingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of channel_mappings to fetch.
     */
    orderBy?: channel_mappingOrderByWithRelationInput | channel_mappingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: channel_mappingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` channel_mappings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` channel_mappings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned channel_mappings
    **/
    _count?: true | Channel_mappingCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: Channel_mappingAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: Channel_mappingSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: Channel_mappingMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: Channel_mappingMaxAggregateInputType
  }

  export type GetChannel_mappingAggregateType<T extends Channel_mappingAggregateArgs> = {
        [P in keyof T & keyof AggregateChannel_mapping]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateChannel_mapping[P]>
      : GetScalarType<T[P], AggregateChannel_mapping[P]>
  }




  export type channel_mappingGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: channel_mappingWhereInput
    orderBy?: channel_mappingOrderByWithAggregationInput | channel_mappingOrderByWithAggregationInput[]
    by: Channel_mappingScalarFieldEnum[] | Channel_mappingScalarFieldEnum
    having?: channel_mappingScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: Channel_mappingCountAggregateInputType | true
    _avg?: Channel_mappingAvgAggregateInputType
    _sum?: Channel_mappingSumAggregateInputType
    _min?: Channel_mappingMinAggregateInputType
    _max?: Channel_mappingMaxAggregateInputType
  }

  export type Channel_mappingGroupByOutputType = {
    channel_id: number
    customer_type: string
    base_channel: string
    short_channel: string
    channel_desc: string
    created_at: Date
    _count: Channel_mappingCountAggregateOutputType | null
    _avg: Channel_mappingAvgAggregateOutputType | null
    _sum: Channel_mappingSumAggregateOutputType | null
    _min: Channel_mappingMinAggregateOutputType | null
    _max: Channel_mappingMaxAggregateOutputType | null
  }

  type GetChannel_mappingGroupByPayload<T extends channel_mappingGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<Channel_mappingGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof Channel_mappingGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], Channel_mappingGroupByOutputType[P]>
            : GetScalarType<T[P], Channel_mappingGroupByOutputType[P]>
        }
      >
    >


  export type channel_mappingSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    channel_id?: boolean
    customer_type?: boolean
    base_channel?: boolean
    short_channel?: boolean
    channel_desc?: boolean
    created_at?: boolean
  }, ExtArgs["result"]["channel_mapping"]>



  export type channel_mappingSelectScalar = {
    channel_id?: boolean
    customer_type?: boolean
    base_channel?: boolean
    short_channel?: boolean
    channel_desc?: boolean
    created_at?: boolean
  }

  export type channel_mappingOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"channel_id" | "customer_type" | "base_channel" | "short_channel" | "channel_desc" | "created_at", ExtArgs["result"]["channel_mapping"]>

  export type $channel_mappingPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "channel_mapping"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      channel_id: number
      customer_type: string
      base_channel: string
      short_channel: string
      channel_desc: string
      created_at: Date
    }, ExtArgs["result"]["channel_mapping"]>
    composites: {}
  }

  type channel_mappingGetPayload<S extends boolean | null | undefined | channel_mappingDefaultArgs> = $Result.GetResult<Prisma.$channel_mappingPayload, S>

  type channel_mappingCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<channel_mappingFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: Channel_mappingCountAggregateInputType | true
    }

  export interface channel_mappingDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['channel_mapping'], meta: { name: 'channel_mapping' } }
    /**
     * Find zero or one Channel_mapping that matches the filter.
     * @param {channel_mappingFindUniqueArgs} args - Arguments to find a Channel_mapping
     * @example
     * // Get one Channel_mapping
     * const channel_mapping = await prisma.channel_mapping.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends channel_mappingFindUniqueArgs>(args: SelectSubset<T, channel_mappingFindUniqueArgs<ExtArgs>>): Prisma__channel_mappingClient<$Result.GetResult<Prisma.$channel_mappingPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Channel_mapping that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {channel_mappingFindUniqueOrThrowArgs} args - Arguments to find a Channel_mapping
     * @example
     * // Get one Channel_mapping
     * const channel_mapping = await prisma.channel_mapping.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends channel_mappingFindUniqueOrThrowArgs>(args: SelectSubset<T, channel_mappingFindUniqueOrThrowArgs<ExtArgs>>): Prisma__channel_mappingClient<$Result.GetResult<Prisma.$channel_mappingPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Channel_mapping that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {channel_mappingFindFirstArgs} args - Arguments to find a Channel_mapping
     * @example
     * // Get one Channel_mapping
     * const channel_mapping = await prisma.channel_mapping.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends channel_mappingFindFirstArgs>(args?: SelectSubset<T, channel_mappingFindFirstArgs<ExtArgs>>): Prisma__channel_mappingClient<$Result.GetResult<Prisma.$channel_mappingPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Channel_mapping that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {channel_mappingFindFirstOrThrowArgs} args - Arguments to find a Channel_mapping
     * @example
     * // Get one Channel_mapping
     * const channel_mapping = await prisma.channel_mapping.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends channel_mappingFindFirstOrThrowArgs>(args?: SelectSubset<T, channel_mappingFindFirstOrThrowArgs<ExtArgs>>): Prisma__channel_mappingClient<$Result.GetResult<Prisma.$channel_mappingPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Channel_mappings that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {channel_mappingFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Channel_mappings
     * const channel_mappings = await prisma.channel_mapping.findMany()
     * 
     * // Get first 10 Channel_mappings
     * const channel_mappings = await prisma.channel_mapping.findMany({ take: 10 })
     * 
     * // Only select the `channel_id`
     * const channel_mappingWithChannel_idOnly = await prisma.channel_mapping.findMany({ select: { channel_id: true } })
     * 
     */
    findMany<T extends channel_mappingFindManyArgs>(args?: SelectSubset<T, channel_mappingFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$channel_mappingPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Channel_mapping.
     * @param {channel_mappingCreateArgs} args - Arguments to create a Channel_mapping.
     * @example
     * // Create one Channel_mapping
     * const Channel_mapping = await prisma.channel_mapping.create({
     *   data: {
     *     // ... data to create a Channel_mapping
     *   }
     * })
     * 
     */
    create<T extends channel_mappingCreateArgs>(args: SelectSubset<T, channel_mappingCreateArgs<ExtArgs>>): Prisma__channel_mappingClient<$Result.GetResult<Prisma.$channel_mappingPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Channel_mappings.
     * @param {channel_mappingCreateManyArgs} args - Arguments to create many Channel_mappings.
     * @example
     * // Create many Channel_mappings
     * const channel_mapping = await prisma.channel_mapping.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends channel_mappingCreateManyArgs>(args?: SelectSubset<T, channel_mappingCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Channel_mapping.
     * @param {channel_mappingDeleteArgs} args - Arguments to delete one Channel_mapping.
     * @example
     * // Delete one Channel_mapping
     * const Channel_mapping = await prisma.channel_mapping.delete({
     *   where: {
     *     // ... filter to delete one Channel_mapping
     *   }
     * })
     * 
     */
    delete<T extends channel_mappingDeleteArgs>(args: SelectSubset<T, channel_mappingDeleteArgs<ExtArgs>>): Prisma__channel_mappingClient<$Result.GetResult<Prisma.$channel_mappingPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Channel_mapping.
     * @param {channel_mappingUpdateArgs} args - Arguments to update one Channel_mapping.
     * @example
     * // Update one Channel_mapping
     * const channel_mapping = await prisma.channel_mapping.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends channel_mappingUpdateArgs>(args: SelectSubset<T, channel_mappingUpdateArgs<ExtArgs>>): Prisma__channel_mappingClient<$Result.GetResult<Prisma.$channel_mappingPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Channel_mappings.
     * @param {channel_mappingDeleteManyArgs} args - Arguments to filter Channel_mappings to delete.
     * @example
     * // Delete a few Channel_mappings
     * const { count } = await prisma.channel_mapping.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends channel_mappingDeleteManyArgs>(args?: SelectSubset<T, channel_mappingDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Channel_mappings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {channel_mappingUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Channel_mappings
     * const channel_mapping = await prisma.channel_mapping.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends channel_mappingUpdateManyArgs>(args: SelectSubset<T, channel_mappingUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Channel_mapping.
     * @param {channel_mappingUpsertArgs} args - Arguments to update or create a Channel_mapping.
     * @example
     * // Update or create a Channel_mapping
     * const channel_mapping = await prisma.channel_mapping.upsert({
     *   create: {
     *     // ... data to create a Channel_mapping
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Channel_mapping we want to update
     *   }
     * })
     */
    upsert<T extends channel_mappingUpsertArgs>(args: SelectSubset<T, channel_mappingUpsertArgs<ExtArgs>>): Prisma__channel_mappingClient<$Result.GetResult<Prisma.$channel_mappingPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Channel_mappings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {channel_mappingCountArgs} args - Arguments to filter Channel_mappings to count.
     * @example
     * // Count the number of Channel_mappings
     * const count = await prisma.channel_mapping.count({
     *   where: {
     *     // ... the filter for the Channel_mappings we want to count
     *   }
     * })
    **/
    count<T extends channel_mappingCountArgs>(
      args?: Subset<T, channel_mappingCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], Channel_mappingCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Channel_mapping.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Channel_mappingAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends Channel_mappingAggregateArgs>(args: Subset<T, Channel_mappingAggregateArgs>): Prisma.PrismaPromise<GetChannel_mappingAggregateType<T>>

    /**
     * Group by Channel_mapping.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {channel_mappingGroupByArgs} args - Group by arguments.
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
      T extends channel_mappingGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: channel_mappingGroupByArgs['orderBy'] }
        : { orderBy?: channel_mappingGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, channel_mappingGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetChannel_mappingGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the channel_mapping model
   */
  readonly fields: channel_mappingFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for channel_mapping.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__channel_mappingClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
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
   * Fields of the channel_mapping model
   */
  interface channel_mappingFieldRefs {
    readonly channel_id: FieldRef<"channel_mapping", 'Int'>
    readonly customer_type: FieldRef<"channel_mapping", 'String'>
    readonly base_channel: FieldRef<"channel_mapping", 'String'>
    readonly short_channel: FieldRef<"channel_mapping", 'String'>
    readonly channel_desc: FieldRef<"channel_mapping", 'String'>
    readonly created_at: FieldRef<"channel_mapping", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * channel_mapping findUnique
   */
  export type channel_mappingFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the channel_mapping
     */
    select?: channel_mappingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the channel_mapping
     */
    omit?: channel_mappingOmit<ExtArgs> | null
    /**
     * Filter, which channel_mapping to fetch.
     */
    where: channel_mappingWhereUniqueInput
  }

  /**
   * channel_mapping findUniqueOrThrow
   */
  export type channel_mappingFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the channel_mapping
     */
    select?: channel_mappingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the channel_mapping
     */
    omit?: channel_mappingOmit<ExtArgs> | null
    /**
     * Filter, which channel_mapping to fetch.
     */
    where: channel_mappingWhereUniqueInput
  }

  /**
   * channel_mapping findFirst
   */
  export type channel_mappingFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the channel_mapping
     */
    select?: channel_mappingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the channel_mapping
     */
    omit?: channel_mappingOmit<ExtArgs> | null
    /**
     * Filter, which channel_mapping to fetch.
     */
    where?: channel_mappingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of channel_mappings to fetch.
     */
    orderBy?: channel_mappingOrderByWithRelationInput | channel_mappingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for channel_mappings.
     */
    cursor?: channel_mappingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` channel_mappings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` channel_mappings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of channel_mappings.
     */
    distinct?: Channel_mappingScalarFieldEnum | Channel_mappingScalarFieldEnum[]
  }

  /**
   * channel_mapping findFirstOrThrow
   */
  export type channel_mappingFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the channel_mapping
     */
    select?: channel_mappingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the channel_mapping
     */
    omit?: channel_mappingOmit<ExtArgs> | null
    /**
     * Filter, which channel_mapping to fetch.
     */
    where?: channel_mappingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of channel_mappings to fetch.
     */
    orderBy?: channel_mappingOrderByWithRelationInput | channel_mappingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for channel_mappings.
     */
    cursor?: channel_mappingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` channel_mappings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` channel_mappings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of channel_mappings.
     */
    distinct?: Channel_mappingScalarFieldEnum | Channel_mappingScalarFieldEnum[]
  }

  /**
   * channel_mapping findMany
   */
  export type channel_mappingFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the channel_mapping
     */
    select?: channel_mappingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the channel_mapping
     */
    omit?: channel_mappingOmit<ExtArgs> | null
    /**
     * Filter, which channel_mappings to fetch.
     */
    where?: channel_mappingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of channel_mappings to fetch.
     */
    orderBy?: channel_mappingOrderByWithRelationInput | channel_mappingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing channel_mappings.
     */
    cursor?: channel_mappingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` channel_mappings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` channel_mappings.
     */
    skip?: number
    distinct?: Channel_mappingScalarFieldEnum | Channel_mappingScalarFieldEnum[]
  }

  /**
   * channel_mapping create
   */
  export type channel_mappingCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the channel_mapping
     */
    select?: channel_mappingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the channel_mapping
     */
    omit?: channel_mappingOmit<ExtArgs> | null
    /**
     * The data needed to create a channel_mapping.
     */
    data: XOR<channel_mappingCreateInput, channel_mappingUncheckedCreateInput>
  }

  /**
   * channel_mapping createMany
   */
  export type channel_mappingCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many channel_mappings.
     */
    data: channel_mappingCreateManyInput | channel_mappingCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * channel_mapping update
   */
  export type channel_mappingUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the channel_mapping
     */
    select?: channel_mappingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the channel_mapping
     */
    omit?: channel_mappingOmit<ExtArgs> | null
    /**
     * The data needed to update a channel_mapping.
     */
    data: XOR<channel_mappingUpdateInput, channel_mappingUncheckedUpdateInput>
    /**
     * Choose, which channel_mapping to update.
     */
    where: channel_mappingWhereUniqueInput
  }

  /**
   * channel_mapping updateMany
   */
  export type channel_mappingUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update channel_mappings.
     */
    data: XOR<channel_mappingUpdateManyMutationInput, channel_mappingUncheckedUpdateManyInput>
    /**
     * Filter which channel_mappings to update
     */
    where?: channel_mappingWhereInput
    /**
     * Limit how many channel_mappings to update.
     */
    limit?: number
  }

  /**
   * channel_mapping upsert
   */
  export type channel_mappingUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the channel_mapping
     */
    select?: channel_mappingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the channel_mapping
     */
    omit?: channel_mappingOmit<ExtArgs> | null
    /**
     * The filter to search for the channel_mapping to update in case it exists.
     */
    where: channel_mappingWhereUniqueInput
    /**
     * In case the channel_mapping found by the `where` argument doesn't exist, create a new channel_mapping with this data.
     */
    create: XOR<channel_mappingCreateInput, channel_mappingUncheckedCreateInput>
    /**
     * In case the channel_mapping was found with the provided `where` argument, update it with this data.
     */
    update: XOR<channel_mappingUpdateInput, channel_mappingUncheckedUpdateInput>
  }

  /**
   * channel_mapping delete
   */
  export type channel_mappingDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the channel_mapping
     */
    select?: channel_mappingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the channel_mapping
     */
    omit?: channel_mappingOmit<ExtArgs> | null
    /**
     * Filter which channel_mapping to delete.
     */
    where: channel_mappingWhereUniqueInput
  }

  /**
   * channel_mapping deleteMany
   */
  export type channel_mappingDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which channel_mappings to delete
     */
    where?: channel_mappingWhereInput
    /**
     * Limit how many channel_mappings to delete.
     */
    limit?: number
  }

  /**
   * channel_mapping without action
   */
  export type channel_mappingDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the channel_mapping
     */
    select?: channel_mappingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the channel_mapping
     */
    omit?: channel_mappingOmit<ExtArgs> | null
  }


  /**
   * Model store_mapping
   */

  export type AggregateStore_mapping = {
    _count: Store_mappingCountAggregateOutputType | null
    _avg: Store_mappingAvgAggregateOutputType | null
    _sum: Store_mappingSumAggregateOutputType | null
    _min: Store_mappingMinAggregateOutputType | null
    _max: Store_mappingMaxAggregateOutputType | null
  }

  export type Store_mappingAvgAggregateOutputType = {
    Id: number | null
  }

  export type Store_mappingSumAggregateOutputType = {
    Id: number | null
  }

  export type Store_mappingMinAggregateOutputType = {
    Id: number | null
    Old_Store_Code: string | null
    New_Store_Code: string | null
    customer_name: string | null
    customer_type: string | null
    Branch: string | null
    DSE_Code: string | null
    ZM: string | null
    RSM: string | null
    ASM: string | null
    TSI: string | null
    created_at: Date | null
  }

  export type Store_mappingMaxAggregateOutputType = {
    Id: number | null
    Old_Store_Code: string | null
    New_Store_Code: string | null
    customer_name: string | null
    customer_type: string | null
    Branch: string | null
    DSE_Code: string | null
    ZM: string | null
    RSM: string | null
    ASM: string | null
    TSI: string | null
    created_at: Date | null
  }

  export type Store_mappingCountAggregateOutputType = {
    Id: number
    Old_Store_Code: number
    New_Store_Code: number
    customer_name: number
    customer_type: number
    Branch: number
    DSE_Code: number
    ZM: number
    RSM: number
    ASM: number
    TSI: number
    created_at: number
    _all: number
  }


  export type Store_mappingAvgAggregateInputType = {
    Id?: true
  }

  export type Store_mappingSumAggregateInputType = {
    Id?: true
  }

  export type Store_mappingMinAggregateInputType = {
    Id?: true
    Old_Store_Code?: true
    New_Store_Code?: true
    customer_name?: true
    customer_type?: true
    Branch?: true
    DSE_Code?: true
    ZM?: true
    RSM?: true
    ASM?: true
    TSI?: true
    created_at?: true
  }

  export type Store_mappingMaxAggregateInputType = {
    Id?: true
    Old_Store_Code?: true
    New_Store_Code?: true
    customer_name?: true
    customer_type?: true
    Branch?: true
    DSE_Code?: true
    ZM?: true
    RSM?: true
    ASM?: true
    TSI?: true
    created_at?: true
  }

  export type Store_mappingCountAggregateInputType = {
    Id?: true
    Old_Store_Code?: true
    New_Store_Code?: true
    customer_name?: true
    customer_type?: true
    Branch?: true
    DSE_Code?: true
    ZM?: true
    RSM?: true
    ASM?: true
    TSI?: true
    created_at?: true
    _all?: true
  }

  export type Store_mappingAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which store_mapping to aggregate.
     */
    where?: store_mappingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of store_mappings to fetch.
     */
    orderBy?: store_mappingOrderByWithRelationInput | store_mappingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: store_mappingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` store_mappings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` store_mappings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned store_mappings
    **/
    _count?: true | Store_mappingCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: Store_mappingAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: Store_mappingSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: Store_mappingMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: Store_mappingMaxAggregateInputType
  }

  export type GetStore_mappingAggregateType<T extends Store_mappingAggregateArgs> = {
        [P in keyof T & keyof AggregateStore_mapping]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateStore_mapping[P]>
      : GetScalarType<T[P], AggregateStore_mapping[P]>
  }




  export type store_mappingGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: store_mappingWhereInput
    orderBy?: store_mappingOrderByWithAggregationInput | store_mappingOrderByWithAggregationInput[]
    by: Store_mappingScalarFieldEnum[] | Store_mappingScalarFieldEnum
    having?: store_mappingScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: Store_mappingCountAggregateInputType | true
    _avg?: Store_mappingAvgAggregateInputType
    _sum?: Store_mappingSumAggregateInputType
    _min?: Store_mappingMinAggregateInputType
    _max?: Store_mappingMaxAggregateInputType
  }

  export type Store_mappingGroupByOutputType = {
    Id: number
    Old_Store_Code: string
    New_Store_Code: string
    customer_name: string
    customer_type: string
    Branch: string
    DSE_Code: string
    ZM: string
    RSM: string
    ASM: string
    TSI: string
    created_at: Date
    _count: Store_mappingCountAggregateOutputType | null
    _avg: Store_mappingAvgAggregateOutputType | null
    _sum: Store_mappingSumAggregateOutputType | null
    _min: Store_mappingMinAggregateOutputType | null
    _max: Store_mappingMaxAggregateOutputType | null
  }

  type GetStore_mappingGroupByPayload<T extends store_mappingGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<Store_mappingGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof Store_mappingGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], Store_mappingGroupByOutputType[P]>
            : GetScalarType<T[P], Store_mappingGroupByOutputType[P]>
        }
      >
    >


  export type store_mappingSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    Id?: boolean
    Old_Store_Code?: boolean
    New_Store_Code?: boolean
    customer_name?: boolean
    customer_type?: boolean
    Branch?: boolean
    DSE_Code?: boolean
    ZM?: boolean
    RSM?: boolean
    ASM?: boolean
    TSI?: boolean
    created_at?: boolean
  }, ExtArgs["result"]["store_mapping"]>



  export type store_mappingSelectScalar = {
    Id?: boolean
    Old_Store_Code?: boolean
    New_Store_Code?: boolean
    customer_name?: boolean
    customer_type?: boolean
    Branch?: boolean
    DSE_Code?: boolean
    ZM?: boolean
    RSM?: boolean
    ASM?: boolean
    TSI?: boolean
    created_at?: boolean
  }

  export type store_mappingOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"Id" | "Old_Store_Code" | "New_Store_Code" | "customer_name" | "customer_type" | "Branch" | "DSE_Code" | "ZM" | "RSM" | "ASM" | "TSI" | "created_at", ExtArgs["result"]["store_mapping"]>

  export type $store_mappingPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "store_mapping"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      Id: number
      Old_Store_Code: string
      New_Store_Code: string
      customer_name: string
      customer_type: string
      Branch: string
      DSE_Code: string
      ZM: string
      RSM: string
      ASM: string
      TSI: string
      created_at: Date
    }, ExtArgs["result"]["store_mapping"]>
    composites: {}
  }

  type store_mappingGetPayload<S extends boolean | null | undefined | store_mappingDefaultArgs> = $Result.GetResult<Prisma.$store_mappingPayload, S>

  type store_mappingCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<store_mappingFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: Store_mappingCountAggregateInputType | true
    }

  export interface store_mappingDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['store_mapping'], meta: { name: 'store_mapping' } }
    /**
     * Find zero or one Store_mapping that matches the filter.
     * @param {store_mappingFindUniqueArgs} args - Arguments to find a Store_mapping
     * @example
     * // Get one Store_mapping
     * const store_mapping = await prisma.store_mapping.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends store_mappingFindUniqueArgs>(args: SelectSubset<T, store_mappingFindUniqueArgs<ExtArgs>>): Prisma__store_mappingClient<$Result.GetResult<Prisma.$store_mappingPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Store_mapping that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {store_mappingFindUniqueOrThrowArgs} args - Arguments to find a Store_mapping
     * @example
     * // Get one Store_mapping
     * const store_mapping = await prisma.store_mapping.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends store_mappingFindUniqueOrThrowArgs>(args: SelectSubset<T, store_mappingFindUniqueOrThrowArgs<ExtArgs>>): Prisma__store_mappingClient<$Result.GetResult<Prisma.$store_mappingPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Store_mapping that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {store_mappingFindFirstArgs} args - Arguments to find a Store_mapping
     * @example
     * // Get one Store_mapping
     * const store_mapping = await prisma.store_mapping.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends store_mappingFindFirstArgs>(args?: SelectSubset<T, store_mappingFindFirstArgs<ExtArgs>>): Prisma__store_mappingClient<$Result.GetResult<Prisma.$store_mappingPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Store_mapping that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {store_mappingFindFirstOrThrowArgs} args - Arguments to find a Store_mapping
     * @example
     * // Get one Store_mapping
     * const store_mapping = await prisma.store_mapping.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends store_mappingFindFirstOrThrowArgs>(args?: SelectSubset<T, store_mappingFindFirstOrThrowArgs<ExtArgs>>): Prisma__store_mappingClient<$Result.GetResult<Prisma.$store_mappingPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Store_mappings that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {store_mappingFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Store_mappings
     * const store_mappings = await prisma.store_mapping.findMany()
     * 
     * // Get first 10 Store_mappings
     * const store_mappings = await prisma.store_mapping.findMany({ take: 10 })
     * 
     * // Only select the `Id`
     * const store_mappingWithIdOnly = await prisma.store_mapping.findMany({ select: { Id: true } })
     * 
     */
    findMany<T extends store_mappingFindManyArgs>(args?: SelectSubset<T, store_mappingFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$store_mappingPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Store_mapping.
     * @param {store_mappingCreateArgs} args - Arguments to create a Store_mapping.
     * @example
     * // Create one Store_mapping
     * const Store_mapping = await prisma.store_mapping.create({
     *   data: {
     *     // ... data to create a Store_mapping
     *   }
     * })
     * 
     */
    create<T extends store_mappingCreateArgs>(args: SelectSubset<T, store_mappingCreateArgs<ExtArgs>>): Prisma__store_mappingClient<$Result.GetResult<Prisma.$store_mappingPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Store_mappings.
     * @param {store_mappingCreateManyArgs} args - Arguments to create many Store_mappings.
     * @example
     * // Create many Store_mappings
     * const store_mapping = await prisma.store_mapping.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends store_mappingCreateManyArgs>(args?: SelectSubset<T, store_mappingCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Store_mapping.
     * @param {store_mappingDeleteArgs} args - Arguments to delete one Store_mapping.
     * @example
     * // Delete one Store_mapping
     * const Store_mapping = await prisma.store_mapping.delete({
     *   where: {
     *     // ... filter to delete one Store_mapping
     *   }
     * })
     * 
     */
    delete<T extends store_mappingDeleteArgs>(args: SelectSubset<T, store_mappingDeleteArgs<ExtArgs>>): Prisma__store_mappingClient<$Result.GetResult<Prisma.$store_mappingPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Store_mapping.
     * @param {store_mappingUpdateArgs} args - Arguments to update one Store_mapping.
     * @example
     * // Update one Store_mapping
     * const store_mapping = await prisma.store_mapping.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends store_mappingUpdateArgs>(args: SelectSubset<T, store_mappingUpdateArgs<ExtArgs>>): Prisma__store_mappingClient<$Result.GetResult<Prisma.$store_mappingPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Store_mappings.
     * @param {store_mappingDeleteManyArgs} args - Arguments to filter Store_mappings to delete.
     * @example
     * // Delete a few Store_mappings
     * const { count } = await prisma.store_mapping.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends store_mappingDeleteManyArgs>(args?: SelectSubset<T, store_mappingDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Store_mappings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {store_mappingUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Store_mappings
     * const store_mapping = await prisma.store_mapping.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends store_mappingUpdateManyArgs>(args: SelectSubset<T, store_mappingUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Store_mapping.
     * @param {store_mappingUpsertArgs} args - Arguments to update or create a Store_mapping.
     * @example
     * // Update or create a Store_mapping
     * const store_mapping = await prisma.store_mapping.upsert({
     *   create: {
     *     // ... data to create a Store_mapping
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Store_mapping we want to update
     *   }
     * })
     */
    upsert<T extends store_mappingUpsertArgs>(args: SelectSubset<T, store_mappingUpsertArgs<ExtArgs>>): Prisma__store_mappingClient<$Result.GetResult<Prisma.$store_mappingPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Store_mappings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {store_mappingCountArgs} args - Arguments to filter Store_mappings to count.
     * @example
     * // Count the number of Store_mappings
     * const count = await prisma.store_mapping.count({
     *   where: {
     *     // ... the filter for the Store_mappings we want to count
     *   }
     * })
    **/
    count<T extends store_mappingCountArgs>(
      args?: Subset<T, store_mappingCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], Store_mappingCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Store_mapping.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Store_mappingAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends Store_mappingAggregateArgs>(args: Subset<T, Store_mappingAggregateArgs>): Prisma.PrismaPromise<GetStore_mappingAggregateType<T>>

    /**
     * Group by Store_mapping.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {store_mappingGroupByArgs} args - Group by arguments.
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
      T extends store_mappingGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: store_mappingGroupByArgs['orderBy'] }
        : { orderBy?: store_mappingGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, store_mappingGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetStore_mappingGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the store_mapping model
   */
  readonly fields: store_mappingFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for store_mapping.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__store_mappingClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
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
   * Fields of the store_mapping model
   */
  interface store_mappingFieldRefs {
    readonly Id: FieldRef<"store_mapping", 'Int'>
    readonly Old_Store_Code: FieldRef<"store_mapping", 'String'>
    readonly New_Store_Code: FieldRef<"store_mapping", 'String'>
    readonly customer_name: FieldRef<"store_mapping", 'String'>
    readonly customer_type: FieldRef<"store_mapping", 'String'>
    readonly Branch: FieldRef<"store_mapping", 'String'>
    readonly DSE_Code: FieldRef<"store_mapping", 'String'>
    readonly ZM: FieldRef<"store_mapping", 'String'>
    readonly RSM: FieldRef<"store_mapping", 'String'>
    readonly ASM: FieldRef<"store_mapping", 'String'>
    readonly TSI: FieldRef<"store_mapping", 'String'>
    readonly created_at: FieldRef<"store_mapping", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * store_mapping findUnique
   */
  export type store_mappingFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the store_mapping
     */
    select?: store_mappingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the store_mapping
     */
    omit?: store_mappingOmit<ExtArgs> | null
    /**
     * Filter, which store_mapping to fetch.
     */
    where: store_mappingWhereUniqueInput
  }

  /**
   * store_mapping findUniqueOrThrow
   */
  export type store_mappingFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the store_mapping
     */
    select?: store_mappingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the store_mapping
     */
    omit?: store_mappingOmit<ExtArgs> | null
    /**
     * Filter, which store_mapping to fetch.
     */
    where: store_mappingWhereUniqueInput
  }

  /**
   * store_mapping findFirst
   */
  export type store_mappingFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the store_mapping
     */
    select?: store_mappingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the store_mapping
     */
    omit?: store_mappingOmit<ExtArgs> | null
    /**
     * Filter, which store_mapping to fetch.
     */
    where?: store_mappingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of store_mappings to fetch.
     */
    orderBy?: store_mappingOrderByWithRelationInput | store_mappingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for store_mappings.
     */
    cursor?: store_mappingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` store_mappings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` store_mappings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of store_mappings.
     */
    distinct?: Store_mappingScalarFieldEnum | Store_mappingScalarFieldEnum[]
  }

  /**
   * store_mapping findFirstOrThrow
   */
  export type store_mappingFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the store_mapping
     */
    select?: store_mappingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the store_mapping
     */
    omit?: store_mappingOmit<ExtArgs> | null
    /**
     * Filter, which store_mapping to fetch.
     */
    where?: store_mappingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of store_mappings to fetch.
     */
    orderBy?: store_mappingOrderByWithRelationInput | store_mappingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for store_mappings.
     */
    cursor?: store_mappingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` store_mappings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` store_mappings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of store_mappings.
     */
    distinct?: Store_mappingScalarFieldEnum | Store_mappingScalarFieldEnum[]
  }

  /**
   * store_mapping findMany
   */
  export type store_mappingFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the store_mapping
     */
    select?: store_mappingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the store_mapping
     */
    omit?: store_mappingOmit<ExtArgs> | null
    /**
     * Filter, which store_mappings to fetch.
     */
    where?: store_mappingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of store_mappings to fetch.
     */
    orderBy?: store_mappingOrderByWithRelationInput | store_mappingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing store_mappings.
     */
    cursor?: store_mappingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` store_mappings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` store_mappings.
     */
    skip?: number
    distinct?: Store_mappingScalarFieldEnum | Store_mappingScalarFieldEnum[]
  }

  /**
   * store_mapping create
   */
  export type store_mappingCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the store_mapping
     */
    select?: store_mappingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the store_mapping
     */
    omit?: store_mappingOmit<ExtArgs> | null
    /**
     * The data needed to create a store_mapping.
     */
    data: XOR<store_mappingCreateInput, store_mappingUncheckedCreateInput>
  }

  /**
   * store_mapping createMany
   */
  export type store_mappingCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many store_mappings.
     */
    data: store_mappingCreateManyInput | store_mappingCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * store_mapping update
   */
  export type store_mappingUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the store_mapping
     */
    select?: store_mappingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the store_mapping
     */
    omit?: store_mappingOmit<ExtArgs> | null
    /**
     * The data needed to update a store_mapping.
     */
    data: XOR<store_mappingUpdateInput, store_mappingUncheckedUpdateInput>
    /**
     * Choose, which store_mapping to update.
     */
    where: store_mappingWhereUniqueInput
  }

  /**
   * store_mapping updateMany
   */
  export type store_mappingUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update store_mappings.
     */
    data: XOR<store_mappingUpdateManyMutationInput, store_mappingUncheckedUpdateManyInput>
    /**
     * Filter which store_mappings to update
     */
    where?: store_mappingWhereInput
    /**
     * Limit how many store_mappings to update.
     */
    limit?: number
  }

  /**
   * store_mapping upsert
   */
  export type store_mappingUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the store_mapping
     */
    select?: store_mappingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the store_mapping
     */
    omit?: store_mappingOmit<ExtArgs> | null
    /**
     * The filter to search for the store_mapping to update in case it exists.
     */
    where: store_mappingWhereUniqueInput
    /**
     * In case the store_mapping found by the `where` argument doesn't exist, create a new store_mapping with this data.
     */
    create: XOR<store_mappingCreateInput, store_mappingUncheckedCreateInput>
    /**
     * In case the store_mapping was found with the provided `where` argument, update it with this data.
     */
    update: XOR<store_mappingUpdateInput, store_mappingUncheckedUpdateInput>
  }

  /**
   * store_mapping delete
   */
  export type store_mappingDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the store_mapping
     */
    select?: store_mappingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the store_mapping
     */
    omit?: store_mappingOmit<ExtArgs> | null
    /**
     * Filter which store_mapping to delete.
     */
    where: store_mappingWhereUniqueInput
  }

  /**
   * store_mapping deleteMany
   */
  export type store_mappingDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which store_mappings to delete
     */
    where?: store_mappingWhereInput
    /**
     * Limit how many store_mappings to delete.
     */
    limit?: number
  }

  /**
   * store_mapping without action
   */
  export type store_mappingDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the store_mapping
     */
    select?: store_mappingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the store_mapping
     */
    omit?: store_mappingOmit<ExtArgs> | null
  }


  /**
   * Model product_mapping
   */

  export type AggregateProduct_mapping = {
    _count: Product_mappingCountAggregateOutputType | null
    _avg: Product_mappingAvgAggregateOutputType | null
    _sum: Product_mappingSumAggregateOutputType | null
    _min: Product_mappingMinAggregateOutputType | null
    _max: Product_mappingMaxAggregateOutputType | null
  }

  export type Product_mappingAvgAggregateOutputType = {
    Id: number | null
    p_code: number | null
  }

  export type Product_mappingSumAggregateOutputType = {
    Id: number | null
    p_code: number | null
  }

  export type Product_mappingMinAggregateOutputType = {
    Id: number | null
    p_code: number | null
    desc_short: string | null
    category: string | null
    brand: string | null
    brandform: string | null
    subbrandform: string | null
    created_at: Date | null
  }

  export type Product_mappingMaxAggregateOutputType = {
    Id: number | null
    p_code: number | null
    desc_short: string | null
    category: string | null
    brand: string | null
    brandform: string | null
    subbrandform: string | null
    created_at: Date | null
  }

  export type Product_mappingCountAggregateOutputType = {
    Id: number
    p_code: number
    desc_short: number
    category: number
    brand: number
    brandform: number
    subbrandform: number
    created_at: number
    _all: number
  }


  export type Product_mappingAvgAggregateInputType = {
    Id?: true
    p_code?: true
  }

  export type Product_mappingSumAggregateInputType = {
    Id?: true
    p_code?: true
  }

  export type Product_mappingMinAggregateInputType = {
    Id?: true
    p_code?: true
    desc_short?: true
    category?: true
    brand?: true
    brandform?: true
    subbrandform?: true
    created_at?: true
  }

  export type Product_mappingMaxAggregateInputType = {
    Id?: true
    p_code?: true
    desc_short?: true
    category?: true
    brand?: true
    brandform?: true
    subbrandform?: true
    created_at?: true
  }

  export type Product_mappingCountAggregateInputType = {
    Id?: true
    p_code?: true
    desc_short?: true
    category?: true
    brand?: true
    brandform?: true
    subbrandform?: true
    created_at?: true
    _all?: true
  }

  export type Product_mappingAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which product_mapping to aggregate.
     */
    where?: product_mappingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of product_mappings to fetch.
     */
    orderBy?: product_mappingOrderByWithRelationInput | product_mappingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: product_mappingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` product_mappings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` product_mappings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned product_mappings
    **/
    _count?: true | Product_mappingCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: Product_mappingAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: Product_mappingSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: Product_mappingMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: Product_mappingMaxAggregateInputType
  }

  export type GetProduct_mappingAggregateType<T extends Product_mappingAggregateArgs> = {
        [P in keyof T & keyof AggregateProduct_mapping]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateProduct_mapping[P]>
      : GetScalarType<T[P], AggregateProduct_mapping[P]>
  }




  export type product_mappingGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: product_mappingWhereInput
    orderBy?: product_mappingOrderByWithAggregationInput | product_mappingOrderByWithAggregationInput[]
    by: Product_mappingScalarFieldEnum[] | Product_mappingScalarFieldEnum
    having?: product_mappingScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: Product_mappingCountAggregateInputType | true
    _avg?: Product_mappingAvgAggregateInputType
    _sum?: Product_mappingSumAggregateInputType
    _min?: Product_mappingMinAggregateInputType
    _max?: Product_mappingMaxAggregateInputType
  }

  export type Product_mappingGroupByOutputType = {
    Id: number
    p_code: number
    desc_short: string
    category: string
    brand: string
    brandform: string
    subbrandform: string
    created_at: Date
    _count: Product_mappingCountAggregateOutputType | null
    _avg: Product_mappingAvgAggregateOutputType | null
    _sum: Product_mappingSumAggregateOutputType | null
    _min: Product_mappingMinAggregateOutputType | null
    _max: Product_mappingMaxAggregateOutputType | null
  }

  type GetProduct_mappingGroupByPayload<T extends product_mappingGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<Product_mappingGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof Product_mappingGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], Product_mappingGroupByOutputType[P]>
            : GetScalarType<T[P], Product_mappingGroupByOutputType[P]>
        }
      >
    >


  export type product_mappingSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    Id?: boolean
    p_code?: boolean
    desc_short?: boolean
    category?: boolean
    brand?: boolean
    brandform?: boolean
    subbrandform?: boolean
    created_at?: boolean
  }, ExtArgs["result"]["product_mapping"]>



  export type product_mappingSelectScalar = {
    Id?: boolean
    p_code?: boolean
    desc_short?: boolean
    category?: boolean
    brand?: boolean
    brandform?: boolean
    subbrandform?: boolean
    created_at?: boolean
  }

  export type product_mappingOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"Id" | "p_code" | "desc_short" | "category" | "brand" | "brandform" | "subbrandform" | "created_at", ExtArgs["result"]["product_mapping"]>

  export type $product_mappingPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "product_mapping"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      Id: number
      p_code: number
      desc_short: string
      category: string
      brand: string
      brandform: string
      subbrandform: string
      created_at: Date
    }, ExtArgs["result"]["product_mapping"]>
    composites: {}
  }

  type product_mappingGetPayload<S extends boolean | null | undefined | product_mappingDefaultArgs> = $Result.GetResult<Prisma.$product_mappingPayload, S>

  type product_mappingCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<product_mappingFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: Product_mappingCountAggregateInputType | true
    }

  export interface product_mappingDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['product_mapping'], meta: { name: 'product_mapping' } }
    /**
     * Find zero or one Product_mapping that matches the filter.
     * @param {product_mappingFindUniqueArgs} args - Arguments to find a Product_mapping
     * @example
     * // Get one Product_mapping
     * const product_mapping = await prisma.product_mapping.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends product_mappingFindUniqueArgs>(args: SelectSubset<T, product_mappingFindUniqueArgs<ExtArgs>>): Prisma__product_mappingClient<$Result.GetResult<Prisma.$product_mappingPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Product_mapping that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {product_mappingFindUniqueOrThrowArgs} args - Arguments to find a Product_mapping
     * @example
     * // Get one Product_mapping
     * const product_mapping = await prisma.product_mapping.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends product_mappingFindUniqueOrThrowArgs>(args: SelectSubset<T, product_mappingFindUniqueOrThrowArgs<ExtArgs>>): Prisma__product_mappingClient<$Result.GetResult<Prisma.$product_mappingPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Product_mapping that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {product_mappingFindFirstArgs} args - Arguments to find a Product_mapping
     * @example
     * // Get one Product_mapping
     * const product_mapping = await prisma.product_mapping.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends product_mappingFindFirstArgs>(args?: SelectSubset<T, product_mappingFindFirstArgs<ExtArgs>>): Prisma__product_mappingClient<$Result.GetResult<Prisma.$product_mappingPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Product_mapping that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {product_mappingFindFirstOrThrowArgs} args - Arguments to find a Product_mapping
     * @example
     * // Get one Product_mapping
     * const product_mapping = await prisma.product_mapping.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends product_mappingFindFirstOrThrowArgs>(args?: SelectSubset<T, product_mappingFindFirstOrThrowArgs<ExtArgs>>): Prisma__product_mappingClient<$Result.GetResult<Prisma.$product_mappingPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Product_mappings that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {product_mappingFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Product_mappings
     * const product_mappings = await prisma.product_mapping.findMany()
     * 
     * // Get first 10 Product_mappings
     * const product_mappings = await prisma.product_mapping.findMany({ take: 10 })
     * 
     * // Only select the `Id`
     * const product_mappingWithIdOnly = await prisma.product_mapping.findMany({ select: { Id: true } })
     * 
     */
    findMany<T extends product_mappingFindManyArgs>(args?: SelectSubset<T, product_mappingFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$product_mappingPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Product_mapping.
     * @param {product_mappingCreateArgs} args - Arguments to create a Product_mapping.
     * @example
     * // Create one Product_mapping
     * const Product_mapping = await prisma.product_mapping.create({
     *   data: {
     *     // ... data to create a Product_mapping
     *   }
     * })
     * 
     */
    create<T extends product_mappingCreateArgs>(args: SelectSubset<T, product_mappingCreateArgs<ExtArgs>>): Prisma__product_mappingClient<$Result.GetResult<Prisma.$product_mappingPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Product_mappings.
     * @param {product_mappingCreateManyArgs} args - Arguments to create many Product_mappings.
     * @example
     * // Create many Product_mappings
     * const product_mapping = await prisma.product_mapping.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends product_mappingCreateManyArgs>(args?: SelectSubset<T, product_mappingCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Product_mapping.
     * @param {product_mappingDeleteArgs} args - Arguments to delete one Product_mapping.
     * @example
     * // Delete one Product_mapping
     * const Product_mapping = await prisma.product_mapping.delete({
     *   where: {
     *     // ... filter to delete one Product_mapping
     *   }
     * })
     * 
     */
    delete<T extends product_mappingDeleteArgs>(args: SelectSubset<T, product_mappingDeleteArgs<ExtArgs>>): Prisma__product_mappingClient<$Result.GetResult<Prisma.$product_mappingPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Product_mapping.
     * @param {product_mappingUpdateArgs} args - Arguments to update one Product_mapping.
     * @example
     * // Update one Product_mapping
     * const product_mapping = await prisma.product_mapping.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends product_mappingUpdateArgs>(args: SelectSubset<T, product_mappingUpdateArgs<ExtArgs>>): Prisma__product_mappingClient<$Result.GetResult<Prisma.$product_mappingPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Product_mappings.
     * @param {product_mappingDeleteManyArgs} args - Arguments to filter Product_mappings to delete.
     * @example
     * // Delete a few Product_mappings
     * const { count } = await prisma.product_mapping.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends product_mappingDeleteManyArgs>(args?: SelectSubset<T, product_mappingDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Product_mappings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {product_mappingUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Product_mappings
     * const product_mapping = await prisma.product_mapping.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends product_mappingUpdateManyArgs>(args: SelectSubset<T, product_mappingUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Product_mapping.
     * @param {product_mappingUpsertArgs} args - Arguments to update or create a Product_mapping.
     * @example
     * // Update or create a Product_mapping
     * const product_mapping = await prisma.product_mapping.upsert({
     *   create: {
     *     // ... data to create a Product_mapping
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Product_mapping we want to update
     *   }
     * })
     */
    upsert<T extends product_mappingUpsertArgs>(args: SelectSubset<T, product_mappingUpsertArgs<ExtArgs>>): Prisma__product_mappingClient<$Result.GetResult<Prisma.$product_mappingPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Product_mappings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {product_mappingCountArgs} args - Arguments to filter Product_mappings to count.
     * @example
     * // Count the number of Product_mappings
     * const count = await prisma.product_mapping.count({
     *   where: {
     *     // ... the filter for the Product_mappings we want to count
     *   }
     * })
    **/
    count<T extends product_mappingCountArgs>(
      args?: Subset<T, product_mappingCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], Product_mappingCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Product_mapping.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Product_mappingAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends Product_mappingAggregateArgs>(args: Subset<T, Product_mappingAggregateArgs>): Prisma.PrismaPromise<GetProduct_mappingAggregateType<T>>

    /**
     * Group by Product_mapping.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {product_mappingGroupByArgs} args - Group by arguments.
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
      T extends product_mappingGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: product_mappingGroupByArgs['orderBy'] }
        : { orderBy?: product_mappingGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, product_mappingGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetProduct_mappingGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the product_mapping model
   */
  readonly fields: product_mappingFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for product_mapping.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__product_mappingClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
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
   * Fields of the product_mapping model
   */
  interface product_mappingFieldRefs {
    readonly Id: FieldRef<"product_mapping", 'Int'>
    readonly p_code: FieldRef<"product_mapping", 'Int'>
    readonly desc_short: FieldRef<"product_mapping", 'String'>
    readonly category: FieldRef<"product_mapping", 'String'>
    readonly brand: FieldRef<"product_mapping", 'String'>
    readonly brandform: FieldRef<"product_mapping", 'String'>
    readonly subbrandform: FieldRef<"product_mapping", 'String'>
    readonly created_at: FieldRef<"product_mapping", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * product_mapping findUnique
   */
  export type product_mappingFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the product_mapping
     */
    select?: product_mappingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the product_mapping
     */
    omit?: product_mappingOmit<ExtArgs> | null
    /**
     * Filter, which product_mapping to fetch.
     */
    where: product_mappingWhereUniqueInput
  }

  /**
   * product_mapping findUniqueOrThrow
   */
  export type product_mappingFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the product_mapping
     */
    select?: product_mappingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the product_mapping
     */
    omit?: product_mappingOmit<ExtArgs> | null
    /**
     * Filter, which product_mapping to fetch.
     */
    where: product_mappingWhereUniqueInput
  }

  /**
   * product_mapping findFirst
   */
  export type product_mappingFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the product_mapping
     */
    select?: product_mappingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the product_mapping
     */
    omit?: product_mappingOmit<ExtArgs> | null
    /**
     * Filter, which product_mapping to fetch.
     */
    where?: product_mappingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of product_mappings to fetch.
     */
    orderBy?: product_mappingOrderByWithRelationInput | product_mappingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for product_mappings.
     */
    cursor?: product_mappingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` product_mappings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` product_mappings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of product_mappings.
     */
    distinct?: Product_mappingScalarFieldEnum | Product_mappingScalarFieldEnum[]
  }

  /**
   * product_mapping findFirstOrThrow
   */
  export type product_mappingFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the product_mapping
     */
    select?: product_mappingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the product_mapping
     */
    omit?: product_mappingOmit<ExtArgs> | null
    /**
     * Filter, which product_mapping to fetch.
     */
    where?: product_mappingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of product_mappings to fetch.
     */
    orderBy?: product_mappingOrderByWithRelationInput | product_mappingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for product_mappings.
     */
    cursor?: product_mappingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` product_mappings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` product_mappings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of product_mappings.
     */
    distinct?: Product_mappingScalarFieldEnum | Product_mappingScalarFieldEnum[]
  }

  /**
   * product_mapping findMany
   */
  export type product_mappingFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the product_mapping
     */
    select?: product_mappingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the product_mapping
     */
    omit?: product_mappingOmit<ExtArgs> | null
    /**
     * Filter, which product_mappings to fetch.
     */
    where?: product_mappingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of product_mappings to fetch.
     */
    orderBy?: product_mappingOrderByWithRelationInput | product_mappingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing product_mappings.
     */
    cursor?: product_mappingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` product_mappings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` product_mappings.
     */
    skip?: number
    distinct?: Product_mappingScalarFieldEnum | Product_mappingScalarFieldEnum[]
  }

  /**
   * product_mapping create
   */
  export type product_mappingCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the product_mapping
     */
    select?: product_mappingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the product_mapping
     */
    omit?: product_mappingOmit<ExtArgs> | null
    /**
     * The data needed to create a product_mapping.
     */
    data: XOR<product_mappingCreateInput, product_mappingUncheckedCreateInput>
  }

  /**
   * product_mapping createMany
   */
  export type product_mappingCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many product_mappings.
     */
    data: product_mappingCreateManyInput | product_mappingCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * product_mapping update
   */
  export type product_mappingUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the product_mapping
     */
    select?: product_mappingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the product_mapping
     */
    omit?: product_mappingOmit<ExtArgs> | null
    /**
     * The data needed to update a product_mapping.
     */
    data: XOR<product_mappingUpdateInput, product_mappingUncheckedUpdateInput>
    /**
     * Choose, which product_mapping to update.
     */
    where: product_mappingWhereUniqueInput
  }

  /**
   * product_mapping updateMany
   */
  export type product_mappingUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update product_mappings.
     */
    data: XOR<product_mappingUpdateManyMutationInput, product_mappingUncheckedUpdateManyInput>
    /**
     * Filter which product_mappings to update
     */
    where?: product_mappingWhereInput
    /**
     * Limit how many product_mappings to update.
     */
    limit?: number
  }

  /**
   * product_mapping upsert
   */
  export type product_mappingUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the product_mapping
     */
    select?: product_mappingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the product_mapping
     */
    omit?: product_mappingOmit<ExtArgs> | null
    /**
     * The filter to search for the product_mapping to update in case it exists.
     */
    where: product_mappingWhereUniqueInput
    /**
     * In case the product_mapping found by the `where` argument doesn't exist, create a new product_mapping with this data.
     */
    create: XOR<product_mappingCreateInput, product_mappingUncheckedCreateInput>
    /**
     * In case the product_mapping was found with the provided `where` argument, update it with this data.
     */
    update: XOR<product_mappingUpdateInput, product_mappingUncheckedUpdateInput>
  }

  /**
   * product_mapping delete
   */
  export type product_mappingDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the product_mapping
     */
    select?: product_mappingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the product_mapping
     */
    omit?: product_mappingOmit<ExtArgs> | null
    /**
     * Filter which product_mapping to delete.
     */
    where: product_mappingWhereUniqueInput
  }

  /**
   * product_mapping deleteMany
   */
  export type product_mappingDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which product_mappings to delete
     */
    where?: product_mappingWhereInput
    /**
     * Limit how many product_mappings to delete.
     */
    limit?: number
  }

  /**
   * product_mapping without action
   */
  export type product_mappingDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the product_mapping
     */
    select?: product_mappingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the product_mapping
     */
    omit?: product_mappingOmit<ExtArgs> | null
  }


  /**
   * Model mapping_change_flag
   */

  export type AggregateMapping_change_flag = {
    _count: Mapping_change_flagCountAggregateOutputType | null
    _avg: Mapping_change_flagAvgAggregateOutputType | null
    _sum: Mapping_change_flagSumAggregateOutputType | null
    _min: Mapping_change_flagMinAggregateOutputType | null
    _max: Mapping_change_flagMaxAggregateOutputType | null
  }

  export type Mapping_change_flagAvgAggregateOutputType = {
    id: number | null
  }

  export type Mapping_change_flagSumAggregateOutputType = {
    id: number | null
  }

  export type Mapping_change_flagMinAggregateOutputType = {
    id: number | null
    changed_at: Date | null
    processed: boolean | null
  }

  export type Mapping_change_flagMaxAggregateOutputType = {
    id: number | null
    changed_at: Date | null
    processed: boolean | null
  }

  export type Mapping_change_flagCountAggregateOutputType = {
    id: number
    changed_at: number
    processed: number
    _all: number
  }


  export type Mapping_change_flagAvgAggregateInputType = {
    id?: true
  }

  export type Mapping_change_flagSumAggregateInputType = {
    id?: true
  }

  export type Mapping_change_flagMinAggregateInputType = {
    id?: true
    changed_at?: true
    processed?: true
  }

  export type Mapping_change_flagMaxAggregateInputType = {
    id?: true
    changed_at?: true
    processed?: true
  }

  export type Mapping_change_flagCountAggregateInputType = {
    id?: true
    changed_at?: true
    processed?: true
    _all?: true
  }

  export type Mapping_change_flagAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which mapping_change_flag to aggregate.
     */
    where?: mapping_change_flagWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of mapping_change_flags to fetch.
     */
    orderBy?: mapping_change_flagOrderByWithRelationInput | mapping_change_flagOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: mapping_change_flagWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` mapping_change_flags from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` mapping_change_flags.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned mapping_change_flags
    **/
    _count?: true | Mapping_change_flagCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: Mapping_change_flagAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: Mapping_change_flagSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: Mapping_change_flagMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: Mapping_change_flagMaxAggregateInputType
  }

  export type GetMapping_change_flagAggregateType<T extends Mapping_change_flagAggregateArgs> = {
        [P in keyof T & keyof AggregateMapping_change_flag]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateMapping_change_flag[P]>
      : GetScalarType<T[P], AggregateMapping_change_flag[P]>
  }




  export type mapping_change_flagGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: mapping_change_flagWhereInput
    orderBy?: mapping_change_flagOrderByWithAggregationInput | mapping_change_flagOrderByWithAggregationInput[]
    by: Mapping_change_flagScalarFieldEnum[] | Mapping_change_flagScalarFieldEnum
    having?: mapping_change_flagScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: Mapping_change_flagCountAggregateInputType | true
    _avg?: Mapping_change_flagAvgAggregateInputType
    _sum?: Mapping_change_flagSumAggregateInputType
    _min?: Mapping_change_flagMinAggregateInputType
    _max?: Mapping_change_flagMaxAggregateInputType
  }

  export type Mapping_change_flagGroupByOutputType = {
    id: number
    changed_at: Date
    processed: boolean
    _count: Mapping_change_flagCountAggregateOutputType | null
    _avg: Mapping_change_flagAvgAggregateOutputType | null
    _sum: Mapping_change_flagSumAggregateOutputType | null
    _min: Mapping_change_flagMinAggregateOutputType | null
    _max: Mapping_change_flagMaxAggregateOutputType | null
  }

  type GetMapping_change_flagGroupByPayload<T extends mapping_change_flagGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<Mapping_change_flagGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof Mapping_change_flagGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], Mapping_change_flagGroupByOutputType[P]>
            : GetScalarType<T[P], Mapping_change_flagGroupByOutputType[P]>
        }
      >
    >


  export type mapping_change_flagSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    changed_at?: boolean
    processed?: boolean
  }, ExtArgs["result"]["mapping_change_flag"]>



  export type mapping_change_flagSelectScalar = {
    id?: boolean
    changed_at?: boolean
    processed?: boolean
  }

  export type mapping_change_flagOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "changed_at" | "processed", ExtArgs["result"]["mapping_change_flag"]>

  export type $mapping_change_flagPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "mapping_change_flag"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: number
      changed_at: Date
      processed: boolean
    }, ExtArgs["result"]["mapping_change_flag"]>
    composites: {}
  }

  type mapping_change_flagGetPayload<S extends boolean | null | undefined | mapping_change_flagDefaultArgs> = $Result.GetResult<Prisma.$mapping_change_flagPayload, S>

  type mapping_change_flagCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<mapping_change_flagFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: Mapping_change_flagCountAggregateInputType | true
    }

  export interface mapping_change_flagDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['mapping_change_flag'], meta: { name: 'mapping_change_flag' } }
    /**
     * Find zero or one Mapping_change_flag that matches the filter.
     * @param {mapping_change_flagFindUniqueArgs} args - Arguments to find a Mapping_change_flag
     * @example
     * // Get one Mapping_change_flag
     * const mapping_change_flag = await prisma.mapping_change_flag.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends mapping_change_flagFindUniqueArgs>(args: SelectSubset<T, mapping_change_flagFindUniqueArgs<ExtArgs>>): Prisma__mapping_change_flagClient<$Result.GetResult<Prisma.$mapping_change_flagPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Mapping_change_flag that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {mapping_change_flagFindUniqueOrThrowArgs} args - Arguments to find a Mapping_change_flag
     * @example
     * // Get one Mapping_change_flag
     * const mapping_change_flag = await prisma.mapping_change_flag.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends mapping_change_flagFindUniqueOrThrowArgs>(args: SelectSubset<T, mapping_change_flagFindUniqueOrThrowArgs<ExtArgs>>): Prisma__mapping_change_flagClient<$Result.GetResult<Prisma.$mapping_change_flagPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Mapping_change_flag that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {mapping_change_flagFindFirstArgs} args - Arguments to find a Mapping_change_flag
     * @example
     * // Get one Mapping_change_flag
     * const mapping_change_flag = await prisma.mapping_change_flag.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends mapping_change_flagFindFirstArgs>(args?: SelectSubset<T, mapping_change_flagFindFirstArgs<ExtArgs>>): Prisma__mapping_change_flagClient<$Result.GetResult<Prisma.$mapping_change_flagPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Mapping_change_flag that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {mapping_change_flagFindFirstOrThrowArgs} args - Arguments to find a Mapping_change_flag
     * @example
     * // Get one Mapping_change_flag
     * const mapping_change_flag = await prisma.mapping_change_flag.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends mapping_change_flagFindFirstOrThrowArgs>(args?: SelectSubset<T, mapping_change_flagFindFirstOrThrowArgs<ExtArgs>>): Prisma__mapping_change_flagClient<$Result.GetResult<Prisma.$mapping_change_flagPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Mapping_change_flags that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {mapping_change_flagFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Mapping_change_flags
     * const mapping_change_flags = await prisma.mapping_change_flag.findMany()
     * 
     * // Get first 10 Mapping_change_flags
     * const mapping_change_flags = await prisma.mapping_change_flag.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const mapping_change_flagWithIdOnly = await prisma.mapping_change_flag.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends mapping_change_flagFindManyArgs>(args?: SelectSubset<T, mapping_change_flagFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$mapping_change_flagPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Mapping_change_flag.
     * @param {mapping_change_flagCreateArgs} args - Arguments to create a Mapping_change_flag.
     * @example
     * // Create one Mapping_change_flag
     * const Mapping_change_flag = await prisma.mapping_change_flag.create({
     *   data: {
     *     // ... data to create a Mapping_change_flag
     *   }
     * })
     * 
     */
    create<T extends mapping_change_flagCreateArgs>(args: SelectSubset<T, mapping_change_flagCreateArgs<ExtArgs>>): Prisma__mapping_change_flagClient<$Result.GetResult<Prisma.$mapping_change_flagPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Mapping_change_flags.
     * @param {mapping_change_flagCreateManyArgs} args - Arguments to create many Mapping_change_flags.
     * @example
     * // Create many Mapping_change_flags
     * const mapping_change_flag = await prisma.mapping_change_flag.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends mapping_change_flagCreateManyArgs>(args?: SelectSubset<T, mapping_change_flagCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Mapping_change_flag.
     * @param {mapping_change_flagDeleteArgs} args - Arguments to delete one Mapping_change_flag.
     * @example
     * // Delete one Mapping_change_flag
     * const Mapping_change_flag = await prisma.mapping_change_flag.delete({
     *   where: {
     *     // ... filter to delete one Mapping_change_flag
     *   }
     * })
     * 
     */
    delete<T extends mapping_change_flagDeleteArgs>(args: SelectSubset<T, mapping_change_flagDeleteArgs<ExtArgs>>): Prisma__mapping_change_flagClient<$Result.GetResult<Prisma.$mapping_change_flagPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Mapping_change_flag.
     * @param {mapping_change_flagUpdateArgs} args - Arguments to update one Mapping_change_flag.
     * @example
     * // Update one Mapping_change_flag
     * const mapping_change_flag = await prisma.mapping_change_flag.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends mapping_change_flagUpdateArgs>(args: SelectSubset<T, mapping_change_flagUpdateArgs<ExtArgs>>): Prisma__mapping_change_flagClient<$Result.GetResult<Prisma.$mapping_change_flagPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Mapping_change_flags.
     * @param {mapping_change_flagDeleteManyArgs} args - Arguments to filter Mapping_change_flags to delete.
     * @example
     * // Delete a few Mapping_change_flags
     * const { count } = await prisma.mapping_change_flag.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends mapping_change_flagDeleteManyArgs>(args?: SelectSubset<T, mapping_change_flagDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Mapping_change_flags.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {mapping_change_flagUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Mapping_change_flags
     * const mapping_change_flag = await prisma.mapping_change_flag.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends mapping_change_flagUpdateManyArgs>(args: SelectSubset<T, mapping_change_flagUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Mapping_change_flag.
     * @param {mapping_change_flagUpsertArgs} args - Arguments to update or create a Mapping_change_flag.
     * @example
     * // Update or create a Mapping_change_flag
     * const mapping_change_flag = await prisma.mapping_change_flag.upsert({
     *   create: {
     *     // ... data to create a Mapping_change_flag
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Mapping_change_flag we want to update
     *   }
     * })
     */
    upsert<T extends mapping_change_flagUpsertArgs>(args: SelectSubset<T, mapping_change_flagUpsertArgs<ExtArgs>>): Prisma__mapping_change_flagClient<$Result.GetResult<Prisma.$mapping_change_flagPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Mapping_change_flags.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {mapping_change_flagCountArgs} args - Arguments to filter Mapping_change_flags to count.
     * @example
     * // Count the number of Mapping_change_flags
     * const count = await prisma.mapping_change_flag.count({
     *   where: {
     *     // ... the filter for the Mapping_change_flags we want to count
     *   }
     * })
    **/
    count<T extends mapping_change_flagCountArgs>(
      args?: Subset<T, mapping_change_flagCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], Mapping_change_flagCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Mapping_change_flag.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Mapping_change_flagAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends Mapping_change_flagAggregateArgs>(args: Subset<T, Mapping_change_flagAggregateArgs>): Prisma.PrismaPromise<GetMapping_change_flagAggregateType<T>>

    /**
     * Group by Mapping_change_flag.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {mapping_change_flagGroupByArgs} args - Group by arguments.
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
      T extends mapping_change_flagGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: mapping_change_flagGroupByArgs['orderBy'] }
        : { orderBy?: mapping_change_flagGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, mapping_change_flagGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetMapping_change_flagGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the mapping_change_flag model
   */
  readonly fields: mapping_change_flagFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for mapping_change_flag.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__mapping_change_flagClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
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
   * Fields of the mapping_change_flag model
   */
  interface mapping_change_flagFieldRefs {
    readonly id: FieldRef<"mapping_change_flag", 'Int'>
    readonly changed_at: FieldRef<"mapping_change_flag", 'DateTime'>
    readonly processed: FieldRef<"mapping_change_flag", 'Boolean'>
  }
    

  // Custom InputTypes
  /**
   * mapping_change_flag findUnique
   */
  export type mapping_change_flagFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the mapping_change_flag
     */
    select?: mapping_change_flagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the mapping_change_flag
     */
    omit?: mapping_change_flagOmit<ExtArgs> | null
    /**
     * Filter, which mapping_change_flag to fetch.
     */
    where: mapping_change_flagWhereUniqueInput
  }

  /**
   * mapping_change_flag findUniqueOrThrow
   */
  export type mapping_change_flagFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the mapping_change_flag
     */
    select?: mapping_change_flagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the mapping_change_flag
     */
    omit?: mapping_change_flagOmit<ExtArgs> | null
    /**
     * Filter, which mapping_change_flag to fetch.
     */
    where: mapping_change_flagWhereUniqueInput
  }

  /**
   * mapping_change_flag findFirst
   */
  export type mapping_change_flagFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the mapping_change_flag
     */
    select?: mapping_change_flagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the mapping_change_flag
     */
    omit?: mapping_change_flagOmit<ExtArgs> | null
    /**
     * Filter, which mapping_change_flag to fetch.
     */
    where?: mapping_change_flagWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of mapping_change_flags to fetch.
     */
    orderBy?: mapping_change_flagOrderByWithRelationInput | mapping_change_flagOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for mapping_change_flags.
     */
    cursor?: mapping_change_flagWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` mapping_change_flags from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` mapping_change_flags.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of mapping_change_flags.
     */
    distinct?: Mapping_change_flagScalarFieldEnum | Mapping_change_flagScalarFieldEnum[]
  }

  /**
   * mapping_change_flag findFirstOrThrow
   */
  export type mapping_change_flagFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the mapping_change_flag
     */
    select?: mapping_change_flagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the mapping_change_flag
     */
    omit?: mapping_change_flagOmit<ExtArgs> | null
    /**
     * Filter, which mapping_change_flag to fetch.
     */
    where?: mapping_change_flagWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of mapping_change_flags to fetch.
     */
    orderBy?: mapping_change_flagOrderByWithRelationInput | mapping_change_flagOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for mapping_change_flags.
     */
    cursor?: mapping_change_flagWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` mapping_change_flags from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` mapping_change_flags.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of mapping_change_flags.
     */
    distinct?: Mapping_change_flagScalarFieldEnum | Mapping_change_flagScalarFieldEnum[]
  }

  /**
   * mapping_change_flag findMany
   */
  export type mapping_change_flagFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the mapping_change_flag
     */
    select?: mapping_change_flagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the mapping_change_flag
     */
    omit?: mapping_change_flagOmit<ExtArgs> | null
    /**
     * Filter, which mapping_change_flags to fetch.
     */
    where?: mapping_change_flagWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of mapping_change_flags to fetch.
     */
    orderBy?: mapping_change_flagOrderByWithRelationInput | mapping_change_flagOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing mapping_change_flags.
     */
    cursor?: mapping_change_flagWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` mapping_change_flags from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` mapping_change_flags.
     */
    skip?: number
    distinct?: Mapping_change_flagScalarFieldEnum | Mapping_change_flagScalarFieldEnum[]
  }

  /**
   * mapping_change_flag create
   */
  export type mapping_change_flagCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the mapping_change_flag
     */
    select?: mapping_change_flagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the mapping_change_flag
     */
    omit?: mapping_change_flagOmit<ExtArgs> | null
    /**
     * The data needed to create a mapping_change_flag.
     */
    data?: XOR<mapping_change_flagCreateInput, mapping_change_flagUncheckedCreateInput>
  }

  /**
   * mapping_change_flag createMany
   */
  export type mapping_change_flagCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many mapping_change_flags.
     */
    data: mapping_change_flagCreateManyInput | mapping_change_flagCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * mapping_change_flag update
   */
  export type mapping_change_flagUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the mapping_change_flag
     */
    select?: mapping_change_flagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the mapping_change_flag
     */
    omit?: mapping_change_flagOmit<ExtArgs> | null
    /**
     * The data needed to update a mapping_change_flag.
     */
    data: XOR<mapping_change_flagUpdateInput, mapping_change_flagUncheckedUpdateInput>
    /**
     * Choose, which mapping_change_flag to update.
     */
    where: mapping_change_flagWhereUniqueInput
  }

  /**
   * mapping_change_flag updateMany
   */
  export type mapping_change_flagUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update mapping_change_flags.
     */
    data: XOR<mapping_change_flagUpdateManyMutationInput, mapping_change_flagUncheckedUpdateManyInput>
    /**
     * Filter which mapping_change_flags to update
     */
    where?: mapping_change_flagWhereInput
    /**
     * Limit how many mapping_change_flags to update.
     */
    limit?: number
  }

  /**
   * mapping_change_flag upsert
   */
  export type mapping_change_flagUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the mapping_change_flag
     */
    select?: mapping_change_flagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the mapping_change_flag
     */
    omit?: mapping_change_flagOmit<ExtArgs> | null
    /**
     * The filter to search for the mapping_change_flag to update in case it exists.
     */
    where: mapping_change_flagWhereUniqueInput
    /**
     * In case the mapping_change_flag found by the `where` argument doesn't exist, create a new mapping_change_flag with this data.
     */
    create: XOR<mapping_change_flagCreateInput, mapping_change_flagUncheckedCreateInput>
    /**
     * In case the mapping_change_flag was found with the provided `where` argument, update it with this data.
     */
    update: XOR<mapping_change_flagUpdateInput, mapping_change_flagUncheckedUpdateInput>
  }

  /**
   * mapping_change_flag delete
   */
  export type mapping_change_flagDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the mapping_change_flag
     */
    select?: mapping_change_flagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the mapping_change_flag
     */
    omit?: mapping_change_flagOmit<ExtArgs> | null
    /**
     * Filter which mapping_change_flag to delete.
     */
    where: mapping_change_flagWhereUniqueInput
  }

  /**
   * mapping_change_flag deleteMany
   */
  export type mapping_change_flagDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which mapping_change_flags to delete
     */
    where?: mapping_change_flagWhereInput
    /**
     * Limit how many mapping_change_flags to delete.
     */
    limit?: number
  }

  /**
   * mapping_change_flag without action
   */
  export type mapping_change_flagDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the mapping_change_flag
     */
    select?: mapping_change_flagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the mapping_change_flag
     */
    omit?: mapping_change_flagOmit<ExtArgs> | null
  }


  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _avg: UserAvgAggregateOutputType | null
    _sum: UserSumAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserAvgAggregateOutputType = {
    id: number | null
    resetPasswordOTP: number | null
    verificationOTP: number | null
    otpAttempts: number | null
  }

  export type UserSumAggregateOutputType = {
    id: number | null
    resetPasswordOTP: number | null
    verificationOTP: number | null
    otpAttempts: number | null
  }

  export type UserMinAggregateOutputType = {
    id: number | null
    name: string | null
    email: string | null
    hash: string | null
    salt: string | null
    role: string | null
    isActive: boolean | null
    lastLogin: Date | null
    image: string | null
    resetPasswordOTP: number | null
    verificationOTP: number | null
    verificationOTPExpires: Date | null
    resetPasswordExpires: Date | null
    otpAttempts: number | null
    lastOTPAttemptAt: Date | null
    otpCooldownUntil: Date | null
  }

  export type UserMaxAggregateOutputType = {
    id: number | null
    name: string | null
    email: string | null
    hash: string | null
    salt: string | null
    role: string | null
    isActive: boolean | null
    lastLogin: Date | null
    image: string | null
    resetPasswordOTP: number | null
    verificationOTP: number | null
    verificationOTPExpires: Date | null
    resetPasswordExpires: Date | null
    otpAttempts: number | null
    lastOTPAttemptAt: Date | null
    otpCooldownUntil: Date | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    name: number
    email: number
    hash: number
    salt: number
    role: number
    isActive: number
    lastLogin: number
    image: number
    resetPasswordOTP: number
    verificationOTP: number
    verificationOTPExpires: number
    resetPasswordExpires: number
    otpAttempts: number
    lastOTPAttemptAt: number
    otpCooldownUntil: number
    _all: number
  }


  export type UserAvgAggregateInputType = {
    id?: true
    resetPasswordOTP?: true
    verificationOTP?: true
    otpAttempts?: true
  }

  export type UserSumAggregateInputType = {
    id?: true
    resetPasswordOTP?: true
    verificationOTP?: true
    otpAttempts?: true
  }

  export type UserMinAggregateInputType = {
    id?: true
    name?: true
    email?: true
    hash?: true
    salt?: true
    role?: true
    isActive?: true
    lastLogin?: true
    image?: true
    resetPasswordOTP?: true
    verificationOTP?: true
    verificationOTPExpires?: true
    resetPasswordExpires?: true
    otpAttempts?: true
    lastOTPAttemptAt?: true
    otpCooldownUntil?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    name?: true
    email?: true
    hash?: true
    salt?: true
    role?: true
    isActive?: true
    lastLogin?: true
    image?: true
    resetPasswordOTP?: true
    verificationOTP?: true
    verificationOTPExpires?: true
    resetPasswordExpires?: true
    otpAttempts?: true
    lastOTPAttemptAt?: true
    otpCooldownUntil?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    name?: true
    email?: true
    hash?: true
    salt?: true
    role?: true
    isActive?: true
    lastLogin?: true
    image?: true
    resetPasswordOTP?: true
    verificationOTP?: true
    verificationOTPExpires?: true
    resetPasswordExpires?: true
    otpAttempts?: true
    lastOTPAttemptAt?: true
    otpCooldownUntil?: true
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
     * Select which fields to average
    **/
    _avg?: UserAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: UserSumAggregateInputType
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
    _avg?: UserAvgAggregateInputType
    _sum?: UserSumAggregateInputType
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: number
    name: string
    email: string
    hash: string | null
    salt: string | null
    role: string
    isActive: boolean
    lastLogin: Date
    image: string
    resetPasswordOTP: number | null
    verificationOTP: number | null
    verificationOTPExpires: Date | null
    resetPasswordExpires: Date | null
    otpAttempts: number | null
    lastOTPAttemptAt: Date | null
    otpCooldownUntil: Date | null
    _count: UserCountAggregateOutputType | null
    _avg: UserAvgAggregateOutputType | null
    _sum: UserSumAggregateOutputType | null
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
    email?: boolean
    hash?: boolean
    salt?: boolean
    role?: boolean
    isActive?: boolean
    lastLogin?: boolean
    image?: boolean
    resetPasswordOTP?: boolean
    verificationOTP?: boolean
    verificationOTPExpires?: boolean
    resetPasswordExpires?: boolean
    otpAttempts?: boolean
    lastOTPAttemptAt?: boolean
    otpCooldownUntil?: boolean
    permissionSets?: boolean | User$permissionSetsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>



  export type UserSelectScalar = {
    id?: boolean
    name?: boolean
    email?: boolean
    hash?: boolean
    salt?: boolean
    role?: boolean
    isActive?: boolean
    lastLogin?: boolean
    image?: boolean
    resetPasswordOTP?: boolean
    verificationOTP?: boolean
    verificationOTPExpires?: boolean
    resetPasswordExpires?: boolean
    otpAttempts?: boolean
    lastOTPAttemptAt?: boolean
    otpCooldownUntil?: boolean
  }

  export type UserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "email" | "hash" | "salt" | "role" | "isActive" | "lastLogin" | "image" | "resetPasswordOTP" | "verificationOTP" | "verificationOTPExpires" | "resetPasswordExpires" | "otpAttempts" | "lastOTPAttemptAt" | "otpCooldownUntil", ExtArgs["result"]["user"]>
  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    permissionSets?: boolean | User$permissionSetsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      permissionSets: Prisma.$PermissionSetPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      name: string
      email: string
      hash: string | null
      salt: string | null
      role: string
      isActive: boolean
      lastLogin: Date
      image: string
      resetPasswordOTP: number | null
      verificationOTP: number | null
      verificationOTPExpires: Date | null
      resetPasswordExpires: Date | null
      otpAttempts: number | null
      lastOTPAttemptAt: Date | null
      otpCooldownUntil: Date | null
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
    permissionSets<T extends User$permissionSetsArgs<ExtArgs> = {}>(args?: Subset<T, User$permissionSetsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PermissionSetPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
    readonly id: FieldRef<"User", 'Int'>
    readonly name: FieldRef<"User", 'String'>
    readonly email: FieldRef<"User", 'String'>
    readonly hash: FieldRef<"User", 'String'>
    readonly salt: FieldRef<"User", 'String'>
    readonly role: FieldRef<"User", 'String'>
    readonly isActive: FieldRef<"User", 'Boolean'>
    readonly lastLogin: FieldRef<"User", 'DateTime'>
    readonly image: FieldRef<"User", 'String'>
    readonly resetPasswordOTP: FieldRef<"User", 'Int'>
    readonly verificationOTP: FieldRef<"User", 'Int'>
    readonly verificationOTPExpires: FieldRef<"User", 'DateTime'>
    readonly resetPasswordExpires: FieldRef<"User", 'DateTime'>
    readonly otpAttempts: FieldRef<"User", 'Int'>
    readonly lastOTPAttemptAt: FieldRef<"User", 'DateTime'>
    readonly otpCooldownUntil: FieldRef<"User", 'DateTime'>
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
    skipDuplicates?: boolean
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
   * User.permissionSets
   */
  export type User$permissionSetsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PermissionSet
     */
    select?: PermissionSetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PermissionSet
     */
    omit?: PermissionSetOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PermissionSetInclude<ExtArgs> | null
    where?: PermissionSetWhereInput
    orderBy?: PermissionSetOrderByWithRelationInput | PermissionSetOrderByWithRelationInput[]
    cursor?: PermissionSetWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PermissionSetScalarFieldEnum | PermissionSetScalarFieldEnum[]
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
   * Model PermissionSet
   */

  export type AggregatePermissionSet = {
    _count: PermissionSetCountAggregateOutputType | null
    _avg: PermissionSetAvgAggregateOutputType | null
    _sum: PermissionSetSumAggregateOutputType | null
    _min: PermissionSetMinAggregateOutputType | null
    _max: PermissionSetMaxAggregateOutputType | null
  }

  export type PermissionSetAvgAggregateOutputType = {
    id: number | null
    userId: number | null
  }

  export type PermissionSetSumAggregateOutputType = {
    id: number | null
    userId: number | null
  }

  export type PermissionSetMinAggregateOutputType = {
    id: number | null
    userId: number | null
    page: string | null
  }

  export type PermissionSetMaxAggregateOutputType = {
    id: number | null
    userId: number | null
    page: string | null
  }

  export type PermissionSetCountAggregateOutputType = {
    id: number
    userId: number
    page: number
    permissions: number
    _all: number
  }


  export type PermissionSetAvgAggregateInputType = {
    id?: true
    userId?: true
  }

  export type PermissionSetSumAggregateInputType = {
    id?: true
    userId?: true
  }

  export type PermissionSetMinAggregateInputType = {
    id?: true
    userId?: true
    page?: true
  }

  export type PermissionSetMaxAggregateInputType = {
    id?: true
    userId?: true
    page?: true
  }

  export type PermissionSetCountAggregateInputType = {
    id?: true
    userId?: true
    page?: true
    permissions?: true
    _all?: true
  }

  export type PermissionSetAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PermissionSet to aggregate.
     */
    where?: PermissionSetWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PermissionSets to fetch.
     */
    orderBy?: PermissionSetOrderByWithRelationInput | PermissionSetOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PermissionSetWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PermissionSets from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PermissionSets.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned PermissionSets
    **/
    _count?: true | PermissionSetCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: PermissionSetAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: PermissionSetSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PermissionSetMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PermissionSetMaxAggregateInputType
  }

  export type GetPermissionSetAggregateType<T extends PermissionSetAggregateArgs> = {
        [P in keyof T & keyof AggregatePermissionSet]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePermissionSet[P]>
      : GetScalarType<T[P], AggregatePermissionSet[P]>
  }




  export type PermissionSetGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PermissionSetWhereInput
    orderBy?: PermissionSetOrderByWithAggregationInput | PermissionSetOrderByWithAggregationInput[]
    by: PermissionSetScalarFieldEnum[] | PermissionSetScalarFieldEnum
    having?: PermissionSetScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PermissionSetCountAggregateInputType | true
    _avg?: PermissionSetAvgAggregateInputType
    _sum?: PermissionSetSumAggregateInputType
    _min?: PermissionSetMinAggregateInputType
    _max?: PermissionSetMaxAggregateInputType
  }

  export type PermissionSetGroupByOutputType = {
    id: number
    userId: number
    page: string
    permissions: JsonValue
    _count: PermissionSetCountAggregateOutputType | null
    _avg: PermissionSetAvgAggregateOutputType | null
    _sum: PermissionSetSumAggregateOutputType | null
    _min: PermissionSetMinAggregateOutputType | null
    _max: PermissionSetMaxAggregateOutputType | null
  }

  type GetPermissionSetGroupByPayload<T extends PermissionSetGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PermissionSetGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PermissionSetGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PermissionSetGroupByOutputType[P]>
            : GetScalarType<T[P], PermissionSetGroupByOutputType[P]>
        }
      >
    >


  export type PermissionSetSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    page?: boolean
    permissions?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["permissionSet"]>



  export type PermissionSetSelectScalar = {
    id?: boolean
    userId?: boolean
    page?: boolean
    permissions?: boolean
  }

  export type PermissionSetOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "page" | "permissions", ExtArgs["result"]["permissionSet"]>
  export type PermissionSetInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $PermissionSetPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "PermissionSet"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      userId: number
      page: string
      permissions: Prisma.JsonValue
    }, ExtArgs["result"]["permissionSet"]>
    composites: {}
  }

  type PermissionSetGetPayload<S extends boolean | null | undefined | PermissionSetDefaultArgs> = $Result.GetResult<Prisma.$PermissionSetPayload, S>

  type PermissionSetCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<PermissionSetFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: PermissionSetCountAggregateInputType | true
    }

  export interface PermissionSetDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['PermissionSet'], meta: { name: 'PermissionSet' } }
    /**
     * Find zero or one PermissionSet that matches the filter.
     * @param {PermissionSetFindUniqueArgs} args - Arguments to find a PermissionSet
     * @example
     * // Get one PermissionSet
     * const permissionSet = await prisma.permissionSet.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PermissionSetFindUniqueArgs>(args: SelectSubset<T, PermissionSetFindUniqueArgs<ExtArgs>>): Prisma__PermissionSetClient<$Result.GetResult<Prisma.$PermissionSetPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one PermissionSet that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {PermissionSetFindUniqueOrThrowArgs} args - Arguments to find a PermissionSet
     * @example
     * // Get one PermissionSet
     * const permissionSet = await prisma.permissionSet.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PermissionSetFindUniqueOrThrowArgs>(args: SelectSubset<T, PermissionSetFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PermissionSetClient<$Result.GetResult<Prisma.$PermissionSetPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first PermissionSet that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PermissionSetFindFirstArgs} args - Arguments to find a PermissionSet
     * @example
     * // Get one PermissionSet
     * const permissionSet = await prisma.permissionSet.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PermissionSetFindFirstArgs>(args?: SelectSubset<T, PermissionSetFindFirstArgs<ExtArgs>>): Prisma__PermissionSetClient<$Result.GetResult<Prisma.$PermissionSetPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first PermissionSet that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PermissionSetFindFirstOrThrowArgs} args - Arguments to find a PermissionSet
     * @example
     * // Get one PermissionSet
     * const permissionSet = await prisma.permissionSet.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PermissionSetFindFirstOrThrowArgs>(args?: SelectSubset<T, PermissionSetFindFirstOrThrowArgs<ExtArgs>>): Prisma__PermissionSetClient<$Result.GetResult<Prisma.$PermissionSetPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more PermissionSets that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PermissionSetFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all PermissionSets
     * const permissionSets = await prisma.permissionSet.findMany()
     * 
     * // Get first 10 PermissionSets
     * const permissionSets = await prisma.permissionSet.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const permissionSetWithIdOnly = await prisma.permissionSet.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PermissionSetFindManyArgs>(args?: SelectSubset<T, PermissionSetFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PermissionSetPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a PermissionSet.
     * @param {PermissionSetCreateArgs} args - Arguments to create a PermissionSet.
     * @example
     * // Create one PermissionSet
     * const PermissionSet = await prisma.permissionSet.create({
     *   data: {
     *     // ... data to create a PermissionSet
     *   }
     * })
     * 
     */
    create<T extends PermissionSetCreateArgs>(args: SelectSubset<T, PermissionSetCreateArgs<ExtArgs>>): Prisma__PermissionSetClient<$Result.GetResult<Prisma.$PermissionSetPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many PermissionSets.
     * @param {PermissionSetCreateManyArgs} args - Arguments to create many PermissionSets.
     * @example
     * // Create many PermissionSets
     * const permissionSet = await prisma.permissionSet.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PermissionSetCreateManyArgs>(args?: SelectSubset<T, PermissionSetCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a PermissionSet.
     * @param {PermissionSetDeleteArgs} args - Arguments to delete one PermissionSet.
     * @example
     * // Delete one PermissionSet
     * const PermissionSet = await prisma.permissionSet.delete({
     *   where: {
     *     // ... filter to delete one PermissionSet
     *   }
     * })
     * 
     */
    delete<T extends PermissionSetDeleteArgs>(args: SelectSubset<T, PermissionSetDeleteArgs<ExtArgs>>): Prisma__PermissionSetClient<$Result.GetResult<Prisma.$PermissionSetPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one PermissionSet.
     * @param {PermissionSetUpdateArgs} args - Arguments to update one PermissionSet.
     * @example
     * // Update one PermissionSet
     * const permissionSet = await prisma.permissionSet.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PermissionSetUpdateArgs>(args: SelectSubset<T, PermissionSetUpdateArgs<ExtArgs>>): Prisma__PermissionSetClient<$Result.GetResult<Prisma.$PermissionSetPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more PermissionSets.
     * @param {PermissionSetDeleteManyArgs} args - Arguments to filter PermissionSets to delete.
     * @example
     * // Delete a few PermissionSets
     * const { count } = await prisma.permissionSet.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PermissionSetDeleteManyArgs>(args?: SelectSubset<T, PermissionSetDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more PermissionSets.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PermissionSetUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many PermissionSets
     * const permissionSet = await prisma.permissionSet.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PermissionSetUpdateManyArgs>(args: SelectSubset<T, PermissionSetUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one PermissionSet.
     * @param {PermissionSetUpsertArgs} args - Arguments to update or create a PermissionSet.
     * @example
     * // Update or create a PermissionSet
     * const permissionSet = await prisma.permissionSet.upsert({
     *   create: {
     *     // ... data to create a PermissionSet
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the PermissionSet we want to update
     *   }
     * })
     */
    upsert<T extends PermissionSetUpsertArgs>(args: SelectSubset<T, PermissionSetUpsertArgs<ExtArgs>>): Prisma__PermissionSetClient<$Result.GetResult<Prisma.$PermissionSetPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of PermissionSets.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PermissionSetCountArgs} args - Arguments to filter PermissionSets to count.
     * @example
     * // Count the number of PermissionSets
     * const count = await prisma.permissionSet.count({
     *   where: {
     *     // ... the filter for the PermissionSets we want to count
     *   }
     * })
    **/
    count<T extends PermissionSetCountArgs>(
      args?: Subset<T, PermissionSetCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PermissionSetCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a PermissionSet.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PermissionSetAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends PermissionSetAggregateArgs>(args: Subset<T, PermissionSetAggregateArgs>): Prisma.PrismaPromise<GetPermissionSetAggregateType<T>>

    /**
     * Group by PermissionSet.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PermissionSetGroupByArgs} args - Group by arguments.
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
      T extends PermissionSetGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PermissionSetGroupByArgs['orderBy'] }
        : { orderBy?: PermissionSetGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, PermissionSetGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPermissionSetGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the PermissionSet model
   */
  readonly fields: PermissionSetFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for PermissionSet.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PermissionSetClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the PermissionSet model
   */
  interface PermissionSetFieldRefs {
    readonly id: FieldRef<"PermissionSet", 'Int'>
    readonly userId: FieldRef<"PermissionSet", 'Int'>
    readonly page: FieldRef<"PermissionSet", 'String'>
    readonly permissions: FieldRef<"PermissionSet", 'Json'>
  }
    

  // Custom InputTypes
  /**
   * PermissionSet findUnique
   */
  export type PermissionSetFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PermissionSet
     */
    select?: PermissionSetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PermissionSet
     */
    omit?: PermissionSetOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PermissionSetInclude<ExtArgs> | null
    /**
     * Filter, which PermissionSet to fetch.
     */
    where: PermissionSetWhereUniqueInput
  }

  /**
   * PermissionSet findUniqueOrThrow
   */
  export type PermissionSetFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PermissionSet
     */
    select?: PermissionSetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PermissionSet
     */
    omit?: PermissionSetOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PermissionSetInclude<ExtArgs> | null
    /**
     * Filter, which PermissionSet to fetch.
     */
    where: PermissionSetWhereUniqueInput
  }

  /**
   * PermissionSet findFirst
   */
  export type PermissionSetFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PermissionSet
     */
    select?: PermissionSetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PermissionSet
     */
    omit?: PermissionSetOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PermissionSetInclude<ExtArgs> | null
    /**
     * Filter, which PermissionSet to fetch.
     */
    where?: PermissionSetWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PermissionSets to fetch.
     */
    orderBy?: PermissionSetOrderByWithRelationInput | PermissionSetOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PermissionSets.
     */
    cursor?: PermissionSetWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PermissionSets from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PermissionSets.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PermissionSets.
     */
    distinct?: PermissionSetScalarFieldEnum | PermissionSetScalarFieldEnum[]
  }

  /**
   * PermissionSet findFirstOrThrow
   */
  export type PermissionSetFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PermissionSet
     */
    select?: PermissionSetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PermissionSet
     */
    omit?: PermissionSetOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PermissionSetInclude<ExtArgs> | null
    /**
     * Filter, which PermissionSet to fetch.
     */
    where?: PermissionSetWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PermissionSets to fetch.
     */
    orderBy?: PermissionSetOrderByWithRelationInput | PermissionSetOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PermissionSets.
     */
    cursor?: PermissionSetWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PermissionSets from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PermissionSets.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PermissionSets.
     */
    distinct?: PermissionSetScalarFieldEnum | PermissionSetScalarFieldEnum[]
  }

  /**
   * PermissionSet findMany
   */
  export type PermissionSetFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PermissionSet
     */
    select?: PermissionSetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PermissionSet
     */
    omit?: PermissionSetOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PermissionSetInclude<ExtArgs> | null
    /**
     * Filter, which PermissionSets to fetch.
     */
    where?: PermissionSetWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PermissionSets to fetch.
     */
    orderBy?: PermissionSetOrderByWithRelationInput | PermissionSetOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing PermissionSets.
     */
    cursor?: PermissionSetWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PermissionSets from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PermissionSets.
     */
    skip?: number
    distinct?: PermissionSetScalarFieldEnum | PermissionSetScalarFieldEnum[]
  }

  /**
   * PermissionSet create
   */
  export type PermissionSetCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PermissionSet
     */
    select?: PermissionSetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PermissionSet
     */
    omit?: PermissionSetOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PermissionSetInclude<ExtArgs> | null
    /**
     * The data needed to create a PermissionSet.
     */
    data: XOR<PermissionSetCreateInput, PermissionSetUncheckedCreateInput>
  }

  /**
   * PermissionSet createMany
   */
  export type PermissionSetCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many PermissionSets.
     */
    data: PermissionSetCreateManyInput | PermissionSetCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * PermissionSet update
   */
  export type PermissionSetUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PermissionSet
     */
    select?: PermissionSetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PermissionSet
     */
    omit?: PermissionSetOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PermissionSetInclude<ExtArgs> | null
    /**
     * The data needed to update a PermissionSet.
     */
    data: XOR<PermissionSetUpdateInput, PermissionSetUncheckedUpdateInput>
    /**
     * Choose, which PermissionSet to update.
     */
    where: PermissionSetWhereUniqueInput
  }

  /**
   * PermissionSet updateMany
   */
  export type PermissionSetUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update PermissionSets.
     */
    data: XOR<PermissionSetUpdateManyMutationInput, PermissionSetUncheckedUpdateManyInput>
    /**
     * Filter which PermissionSets to update
     */
    where?: PermissionSetWhereInput
    /**
     * Limit how many PermissionSets to update.
     */
    limit?: number
  }

  /**
   * PermissionSet upsert
   */
  export type PermissionSetUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PermissionSet
     */
    select?: PermissionSetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PermissionSet
     */
    omit?: PermissionSetOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PermissionSetInclude<ExtArgs> | null
    /**
     * The filter to search for the PermissionSet to update in case it exists.
     */
    where: PermissionSetWhereUniqueInput
    /**
     * In case the PermissionSet found by the `where` argument doesn't exist, create a new PermissionSet with this data.
     */
    create: XOR<PermissionSetCreateInput, PermissionSetUncheckedCreateInput>
    /**
     * In case the PermissionSet was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PermissionSetUpdateInput, PermissionSetUncheckedUpdateInput>
  }

  /**
   * PermissionSet delete
   */
  export type PermissionSetDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PermissionSet
     */
    select?: PermissionSetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PermissionSet
     */
    omit?: PermissionSetOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PermissionSetInclude<ExtArgs> | null
    /**
     * Filter which PermissionSet to delete.
     */
    where: PermissionSetWhereUniqueInput
  }

  /**
   * PermissionSet deleteMany
   */
  export type PermissionSetDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PermissionSets to delete
     */
    where?: PermissionSetWhereInput
    /**
     * Limit how many PermissionSets to delete.
     */
    limit?: number
  }

  /**
   * PermissionSet without action
   */
  export type PermissionSetDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PermissionSet
     */
    select?: PermissionSetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PermissionSet
     */
    omit?: PermissionSetOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PermissionSetInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const Psr_data_tempScalarFieldEnum: {
    psr_id: 'psr_id',
    document_no: 'document_no',
    document_date: 'document_date',
    subbrandform: 'subbrandform',
    customer_name: 'customer_name',
    customer_code: 'customer_code',
    p_code: 'p_code',
    customer_type: 'customer_type',
    category: 'category',
    brand: 'brand',
    brandform: 'brandform',
    retailing: 'retailing'
  };

  export type Psr_data_tempScalarFieldEnum = (typeof Psr_data_tempScalarFieldEnum)[keyof typeof Psr_data_tempScalarFieldEnum]


  export const Psr_data_historicalScalarFieldEnum: {
    psr_id: 'psr_id',
    document_no: 'document_no',
    document_date: 'document_date',
    subbrandform: 'subbrandform',
    customer_name: 'customer_name',
    customer_code: 'customer_code',
    p_code: 'p_code',
    customer_type: 'customer_type',
    category: 'category',
    brand: 'brand',
    brandform: 'brandform',
    retailing: 'retailing'
  };

  export type Psr_data_historicalScalarFieldEnum = (typeof Psr_data_historicalScalarFieldEnum)[keyof typeof Psr_data_historicalScalarFieldEnum]


  export const Psr_finalized_tempScalarFieldEnum: {
    id: 'id',
    document_date: 'document_date',
    customer_code: 'customer_code',
    branch: 'branch',
    ZM: 'ZM',
    RSM: 'RSM',
    ASM: 'ASM',
    TSI: 'TSI',
    category: 'category',
    brand: 'brand',
    brandform: 'brandform',
    subbrandform: 'subbrandform',
    base_channel: 'base_channel',
    short_channel: 'short_channel',
    channel_desc: 'channel_desc',
    retailing: 'retailing'
  };

  export type Psr_finalized_tempScalarFieldEnum = (typeof Psr_finalized_tempScalarFieldEnum)[keyof typeof Psr_finalized_tempScalarFieldEnum]


  export const Psr_data_finalizedScalarFieldEnum: {
    id: 'id',
    document_date: 'document_date',
    customer_code: 'customer_code',
    branch: 'branch',
    ZM: 'ZM',
    RSM: 'RSM',
    ASM: 'ASM',
    TSI: 'TSI',
    category: 'category',
    brand: 'brand',
    brandform: 'brandform',
    subbrandform: 'subbrandform',
    base_channel: 'base_channel',
    short_channel: 'short_channel',
    channel_desc: 'channel_desc',
    retailing: 'retailing'
  };

  export type Psr_data_finalizedScalarFieldEnum = (typeof Psr_data_finalizedScalarFieldEnum)[keyof typeof Psr_data_finalizedScalarFieldEnum]


  export const Channel_mappingScalarFieldEnum: {
    channel_id: 'channel_id',
    customer_type: 'customer_type',
    base_channel: 'base_channel',
    short_channel: 'short_channel',
    channel_desc: 'channel_desc',
    created_at: 'created_at'
  };

  export type Channel_mappingScalarFieldEnum = (typeof Channel_mappingScalarFieldEnum)[keyof typeof Channel_mappingScalarFieldEnum]


  export const Store_mappingScalarFieldEnum: {
    Id: 'Id',
    Old_Store_Code: 'Old_Store_Code',
    New_Store_Code: 'New_Store_Code',
    customer_name: 'customer_name',
    customer_type: 'customer_type',
    Branch: 'Branch',
    DSE_Code: 'DSE_Code',
    ZM: 'ZM',
    RSM: 'RSM',
    ASM: 'ASM',
    TSI: 'TSI',
    created_at: 'created_at'
  };

  export type Store_mappingScalarFieldEnum = (typeof Store_mappingScalarFieldEnum)[keyof typeof Store_mappingScalarFieldEnum]


  export const Product_mappingScalarFieldEnum: {
    Id: 'Id',
    p_code: 'p_code',
    desc_short: 'desc_short',
    category: 'category',
    brand: 'brand',
    brandform: 'brandform',
    subbrandform: 'subbrandform',
    created_at: 'created_at'
  };

  export type Product_mappingScalarFieldEnum = (typeof Product_mappingScalarFieldEnum)[keyof typeof Product_mappingScalarFieldEnum]


  export const Mapping_change_flagScalarFieldEnum: {
    id: 'id',
    changed_at: 'changed_at',
    processed: 'processed'
  };

  export type Mapping_change_flagScalarFieldEnum = (typeof Mapping_change_flagScalarFieldEnum)[keyof typeof Mapping_change_flagScalarFieldEnum]


  export const UserScalarFieldEnum: {
    id: 'id',
    name: 'name',
    email: 'email',
    hash: 'hash',
    salt: 'salt',
    role: 'role',
    isActive: 'isActive',
    lastLogin: 'lastLogin',
    image: 'image',
    resetPasswordOTP: 'resetPasswordOTP',
    verificationOTP: 'verificationOTP',
    verificationOTPExpires: 'verificationOTPExpires',
    resetPasswordExpires: 'resetPasswordExpires',
    otpAttempts: 'otpAttempts',
    lastOTPAttemptAt: 'lastOTPAttemptAt',
    otpCooldownUntil: 'otpCooldownUntil'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const PermissionSetScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    page: 'page',
    permissions: 'permissions'
  };

  export type PermissionSetScalarFieldEnum = (typeof PermissionSetScalarFieldEnum)[keyof typeof PermissionSetScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const JsonNullValueInput: {
    JsonNull: typeof JsonNull
  };

  export type JsonNullValueInput = (typeof JsonNullValueInput)[keyof typeof JsonNullValueInput]


  export const psr_data_tempOrderByRelevanceFieldEnum: {
    document_no: 'document_no',
    subbrandform: 'subbrandform',
    customer_name: 'customer_name',
    customer_code: 'customer_code',
    customer_type: 'customer_type',
    category: 'category',
    brand: 'brand',
    brandform: 'brandform'
  };

  export type psr_data_tempOrderByRelevanceFieldEnum = (typeof psr_data_tempOrderByRelevanceFieldEnum)[keyof typeof psr_data_tempOrderByRelevanceFieldEnum]


  export const psr_data_historicalOrderByRelevanceFieldEnum: {
    document_no: 'document_no',
    subbrandform: 'subbrandform',
    customer_name: 'customer_name',
    customer_code: 'customer_code',
    customer_type: 'customer_type',
    category: 'category',
    brand: 'brand',
    brandform: 'brandform'
  };

  export type psr_data_historicalOrderByRelevanceFieldEnum = (typeof psr_data_historicalOrderByRelevanceFieldEnum)[keyof typeof psr_data_historicalOrderByRelevanceFieldEnum]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  export const psr_finalized_tempOrderByRelevanceFieldEnum: {
    customer_code: 'customer_code',
    branch: 'branch',
    ZM: 'ZM',
    RSM: 'RSM',
    ASM: 'ASM',
    TSI: 'TSI',
    category: 'category',
    brand: 'brand',
    brandform: 'brandform',
    subbrandform: 'subbrandform',
    base_channel: 'base_channel',
    short_channel: 'short_channel',
    channel_desc: 'channel_desc'
  };

  export type psr_finalized_tempOrderByRelevanceFieldEnum = (typeof psr_finalized_tempOrderByRelevanceFieldEnum)[keyof typeof psr_finalized_tempOrderByRelevanceFieldEnum]


  export const psr_data_finalizedOrderByRelevanceFieldEnum: {
    customer_code: 'customer_code',
    branch: 'branch',
    ZM: 'ZM',
    RSM: 'RSM',
    ASM: 'ASM',
    TSI: 'TSI',
    category: 'category',
    brand: 'brand',
    brandform: 'brandform',
    subbrandform: 'subbrandform',
    base_channel: 'base_channel',
    short_channel: 'short_channel',
    channel_desc: 'channel_desc'
  };

  export type psr_data_finalizedOrderByRelevanceFieldEnum = (typeof psr_data_finalizedOrderByRelevanceFieldEnum)[keyof typeof psr_data_finalizedOrderByRelevanceFieldEnum]


  export const channel_mappingOrderByRelevanceFieldEnum: {
    customer_type: 'customer_type',
    base_channel: 'base_channel',
    short_channel: 'short_channel',
    channel_desc: 'channel_desc'
  };

  export type channel_mappingOrderByRelevanceFieldEnum = (typeof channel_mappingOrderByRelevanceFieldEnum)[keyof typeof channel_mappingOrderByRelevanceFieldEnum]


  export const store_mappingOrderByRelevanceFieldEnum: {
    Old_Store_Code: 'Old_Store_Code',
    New_Store_Code: 'New_Store_Code',
    customer_name: 'customer_name',
    customer_type: 'customer_type',
    Branch: 'Branch',
    DSE_Code: 'DSE_Code',
    ZM: 'ZM',
    RSM: 'RSM',
    ASM: 'ASM',
    TSI: 'TSI'
  };

  export type store_mappingOrderByRelevanceFieldEnum = (typeof store_mappingOrderByRelevanceFieldEnum)[keyof typeof store_mappingOrderByRelevanceFieldEnum]


  export const product_mappingOrderByRelevanceFieldEnum: {
    desc_short: 'desc_short',
    category: 'category',
    brand: 'brand',
    brandform: 'brandform',
    subbrandform: 'subbrandform'
  };

  export type product_mappingOrderByRelevanceFieldEnum = (typeof product_mappingOrderByRelevanceFieldEnum)[keyof typeof product_mappingOrderByRelevanceFieldEnum]


  export const UserOrderByRelevanceFieldEnum: {
    name: 'name',
    email: 'email',
    hash: 'hash',
    salt: 'salt',
    role: 'role',
    image: 'image'
  };

  export type UserOrderByRelevanceFieldEnum = (typeof UserOrderByRelevanceFieldEnum)[keyof typeof UserOrderByRelevanceFieldEnum]


  export const JsonNullValueFilter: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull,
    AnyNull: typeof AnyNull
  };

  export type JsonNullValueFilter = (typeof JsonNullValueFilter)[keyof typeof JsonNullValueFilter]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const PermissionSetOrderByRelevanceFieldEnum: {
    page: 'page'
  };

  export type PermissionSetOrderByRelevanceFieldEnum = (typeof PermissionSetOrderByRelevanceFieldEnum)[keyof typeof PermissionSetOrderByRelevanceFieldEnum]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'Decimal'
   */
  export type DecimalFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Decimal'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'Json'
   */
  export type JsonFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Json'>
    


  /**
   * Reference to a field of type 'QueryMode'
   */
  export type EnumQueryModeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'QueryMode'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    
  /**
   * Deep Input Types
   */


  export type psr_data_tempWhereInput = {
    AND?: psr_data_tempWhereInput | psr_data_tempWhereInput[]
    OR?: psr_data_tempWhereInput[]
    NOT?: psr_data_tempWhereInput | psr_data_tempWhereInput[]
    psr_id?: IntFilter<"psr_data_temp"> | number
    document_no?: StringFilter<"psr_data_temp"> | string
    document_date?: DateTimeFilter<"psr_data_temp"> | Date | string
    subbrandform?: StringFilter<"psr_data_temp"> | string
    customer_name?: StringFilter<"psr_data_temp"> | string
    customer_code?: StringFilter<"psr_data_temp"> | string
    p_code?: IntFilter<"psr_data_temp"> | number
    customer_type?: StringFilter<"psr_data_temp"> | string
    category?: StringFilter<"psr_data_temp"> | string
    brand?: StringFilter<"psr_data_temp"> | string
    brandform?: StringFilter<"psr_data_temp"> | string
    retailing?: DecimalFilter<"psr_data_temp"> | Decimal | DecimalJsLike | number | string
  }

  export type psr_data_tempOrderByWithRelationInput = {
    psr_id?: SortOrder
    document_no?: SortOrder
    document_date?: SortOrder
    subbrandform?: SortOrder
    customer_name?: SortOrder
    customer_code?: SortOrder
    p_code?: SortOrder
    customer_type?: SortOrder
    category?: SortOrder
    brand?: SortOrder
    brandform?: SortOrder
    retailing?: SortOrder
    _relevance?: psr_data_tempOrderByRelevanceInput
  }

  export type psr_data_tempWhereUniqueInput = Prisma.AtLeast<{
    psr_id?: number
    AND?: psr_data_tempWhereInput | psr_data_tempWhereInput[]
    OR?: psr_data_tempWhereInput[]
    NOT?: psr_data_tempWhereInput | psr_data_tempWhereInput[]
    document_no?: StringFilter<"psr_data_temp"> | string
    document_date?: DateTimeFilter<"psr_data_temp"> | Date | string
    subbrandform?: StringFilter<"psr_data_temp"> | string
    customer_name?: StringFilter<"psr_data_temp"> | string
    customer_code?: StringFilter<"psr_data_temp"> | string
    p_code?: IntFilter<"psr_data_temp"> | number
    customer_type?: StringFilter<"psr_data_temp"> | string
    category?: StringFilter<"psr_data_temp"> | string
    brand?: StringFilter<"psr_data_temp"> | string
    brandform?: StringFilter<"psr_data_temp"> | string
    retailing?: DecimalFilter<"psr_data_temp"> | Decimal | DecimalJsLike | number | string
  }, "psr_id">

  export type psr_data_tempOrderByWithAggregationInput = {
    psr_id?: SortOrder
    document_no?: SortOrder
    document_date?: SortOrder
    subbrandform?: SortOrder
    customer_name?: SortOrder
    customer_code?: SortOrder
    p_code?: SortOrder
    customer_type?: SortOrder
    category?: SortOrder
    brand?: SortOrder
    brandform?: SortOrder
    retailing?: SortOrder
    _count?: psr_data_tempCountOrderByAggregateInput
    _avg?: psr_data_tempAvgOrderByAggregateInput
    _max?: psr_data_tempMaxOrderByAggregateInput
    _min?: psr_data_tempMinOrderByAggregateInput
    _sum?: psr_data_tempSumOrderByAggregateInput
  }

  export type psr_data_tempScalarWhereWithAggregatesInput = {
    AND?: psr_data_tempScalarWhereWithAggregatesInput | psr_data_tempScalarWhereWithAggregatesInput[]
    OR?: psr_data_tempScalarWhereWithAggregatesInput[]
    NOT?: psr_data_tempScalarWhereWithAggregatesInput | psr_data_tempScalarWhereWithAggregatesInput[]
    psr_id?: IntWithAggregatesFilter<"psr_data_temp"> | number
    document_no?: StringWithAggregatesFilter<"psr_data_temp"> | string
    document_date?: DateTimeWithAggregatesFilter<"psr_data_temp"> | Date | string
    subbrandform?: StringWithAggregatesFilter<"psr_data_temp"> | string
    customer_name?: StringWithAggregatesFilter<"psr_data_temp"> | string
    customer_code?: StringWithAggregatesFilter<"psr_data_temp"> | string
    p_code?: IntWithAggregatesFilter<"psr_data_temp"> | number
    customer_type?: StringWithAggregatesFilter<"psr_data_temp"> | string
    category?: StringWithAggregatesFilter<"psr_data_temp"> | string
    brand?: StringWithAggregatesFilter<"psr_data_temp"> | string
    brandform?: StringWithAggregatesFilter<"psr_data_temp"> | string
    retailing?: DecimalWithAggregatesFilter<"psr_data_temp"> | Decimal | DecimalJsLike | number | string
  }

  export type psr_data_historicalWhereInput = {
    AND?: psr_data_historicalWhereInput | psr_data_historicalWhereInput[]
    OR?: psr_data_historicalWhereInput[]
    NOT?: psr_data_historicalWhereInput | psr_data_historicalWhereInput[]
    psr_id?: IntFilter<"psr_data_historical"> | number
    document_no?: StringFilter<"psr_data_historical"> | string
    document_date?: DateTimeFilter<"psr_data_historical"> | Date | string
    subbrandform?: StringFilter<"psr_data_historical"> | string
    customer_name?: StringFilter<"psr_data_historical"> | string
    customer_code?: StringFilter<"psr_data_historical"> | string
    p_code?: IntFilter<"psr_data_historical"> | number
    customer_type?: StringFilter<"psr_data_historical"> | string
    category?: StringFilter<"psr_data_historical"> | string
    brand?: StringFilter<"psr_data_historical"> | string
    brandform?: StringFilter<"psr_data_historical"> | string
    retailing?: DecimalFilter<"psr_data_historical"> | Decimal | DecimalJsLike | number | string
  }

  export type psr_data_historicalOrderByWithRelationInput = {
    psr_id?: SortOrder
    document_no?: SortOrder
    document_date?: SortOrder
    subbrandform?: SortOrder
    customer_name?: SortOrder
    customer_code?: SortOrder
    p_code?: SortOrder
    customer_type?: SortOrder
    category?: SortOrder
    brand?: SortOrder
    brandform?: SortOrder
    retailing?: SortOrder
    _relevance?: psr_data_historicalOrderByRelevanceInput
  }

  export type psr_data_historicalWhereUniqueInput = Prisma.AtLeast<{
    psr_id?: number
    AND?: psr_data_historicalWhereInput | psr_data_historicalWhereInput[]
    OR?: psr_data_historicalWhereInput[]
    NOT?: psr_data_historicalWhereInput | psr_data_historicalWhereInput[]
    document_no?: StringFilter<"psr_data_historical"> | string
    document_date?: DateTimeFilter<"psr_data_historical"> | Date | string
    subbrandform?: StringFilter<"psr_data_historical"> | string
    customer_name?: StringFilter<"psr_data_historical"> | string
    customer_code?: StringFilter<"psr_data_historical"> | string
    p_code?: IntFilter<"psr_data_historical"> | number
    customer_type?: StringFilter<"psr_data_historical"> | string
    category?: StringFilter<"psr_data_historical"> | string
    brand?: StringFilter<"psr_data_historical"> | string
    brandform?: StringFilter<"psr_data_historical"> | string
    retailing?: DecimalFilter<"psr_data_historical"> | Decimal | DecimalJsLike | number | string
  }, "psr_id">

  export type psr_data_historicalOrderByWithAggregationInput = {
    psr_id?: SortOrder
    document_no?: SortOrder
    document_date?: SortOrder
    subbrandform?: SortOrder
    customer_name?: SortOrder
    customer_code?: SortOrder
    p_code?: SortOrder
    customer_type?: SortOrder
    category?: SortOrder
    brand?: SortOrder
    brandform?: SortOrder
    retailing?: SortOrder
    _count?: psr_data_historicalCountOrderByAggregateInput
    _avg?: psr_data_historicalAvgOrderByAggregateInput
    _max?: psr_data_historicalMaxOrderByAggregateInput
    _min?: psr_data_historicalMinOrderByAggregateInput
    _sum?: psr_data_historicalSumOrderByAggregateInput
  }

  export type psr_data_historicalScalarWhereWithAggregatesInput = {
    AND?: psr_data_historicalScalarWhereWithAggregatesInput | psr_data_historicalScalarWhereWithAggregatesInput[]
    OR?: psr_data_historicalScalarWhereWithAggregatesInput[]
    NOT?: psr_data_historicalScalarWhereWithAggregatesInput | psr_data_historicalScalarWhereWithAggregatesInput[]
    psr_id?: IntWithAggregatesFilter<"psr_data_historical"> | number
    document_no?: StringWithAggregatesFilter<"psr_data_historical"> | string
    document_date?: DateTimeWithAggregatesFilter<"psr_data_historical"> | Date | string
    subbrandform?: StringWithAggregatesFilter<"psr_data_historical"> | string
    customer_name?: StringWithAggregatesFilter<"psr_data_historical"> | string
    customer_code?: StringWithAggregatesFilter<"psr_data_historical"> | string
    p_code?: IntWithAggregatesFilter<"psr_data_historical"> | number
    customer_type?: StringWithAggregatesFilter<"psr_data_historical"> | string
    category?: StringWithAggregatesFilter<"psr_data_historical"> | string
    brand?: StringWithAggregatesFilter<"psr_data_historical"> | string
    brandform?: StringWithAggregatesFilter<"psr_data_historical"> | string
    retailing?: DecimalWithAggregatesFilter<"psr_data_historical"> | Decimal | DecimalJsLike | number | string
  }

  export type psr_finalized_tempWhereInput = {
    AND?: psr_finalized_tempWhereInput | psr_finalized_tempWhereInput[]
    OR?: psr_finalized_tempWhereInput[]
    NOT?: psr_finalized_tempWhereInput | psr_finalized_tempWhereInput[]
    id?: IntFilter<"psr_finalized_temp"> | number
    document_date?: DateTimeFilter<"psr_finalized_temp"> | Date | string
    customer_code?: StringFilter<"psr_finalized_temp"> | string
    branch?: StringNullableFilter<"psr_finalized_temp"> | string | null
    ZM?: StringNullableFilter<"psr_finalized_temp"> | string | null
    RSM?: StringNullableFilter<"psr_finalized_temp"> | string | null
    ASM?: StringNullableFilter<"psr_finalized_temp"> | string | null
    TSI?: StringNullableFilter<"psr_finalized_temp"> | string | null
    category?: StringNullableFilter<"psr_finalized_temp"> | string | null
    brand?: StringNullableFilter<"psr_finalized_temp"> | string | null
    brandform?: StringNullableFilter<"psr_finalized_temp"> | string | null
    subbrandform?: StringNullableFilter<"psr_finalized_temp"> | string | null
    base_channel?: StringNullableFilter<"psr_finalized_temp"> | string | null
    short_channel?: StringNullableFilter<"psr_finalized_temp"> | string | null
    channel_desc?: StringNullableFilter<"psr_finalized_temp"> | string | null
    retailing?: DecimalFilter<"psr_finalized_temp"> | Decimal | DecimalJsLike | number | string
  }

  export type psr_finalized_tempOrderByWithRelationInput = {
    id?: SortOrder
    document_date?: SortOrder
    customer_code?: SortOrder
    branch?: SortOrderInput | SortOrder
    ZM?: SortOrderInput | SortOrder
    RSM?: SortOrderInput | SortOrder
    ASM?: SortOrderInput | SortOrder
    TSI?: SortOrderInput | SortOrder
    category?: SortOrderInput | SortOrder
    brand?: SortOrderInput | SortOrder
    brandform?: SortOrderInput | SortOrder
    subbrandform?: SortOrderInput | SortOrder
    base_channel?: SortOrderInput | SortOrder
    short_channel?: SortOrderInput | SortOrder
    channel_desc?: SortOrderInput | SortOrder
    retailing?: SortOrder
    _relevance?: psr_finalized_tempOrderByRelevanceInput
  }

  export type psr_finalized_tempWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: psr_finalized_tempWhereInput | psr_finalized_tempWhereInput[]
    OR?: psr_finalized_tempWhereInput[]
    NOT?: psr_finalized_tempWhereInput | psr_finalized_tempWhereInput[]
    document_date?: DateTimeFilter<"psr_finalized_temp"> | Date | string
    customer_code?: StringFilter<"psr_finalized_temp"> | string
    branch?: StringNullableFilter<"psr_finalized_temp"> | string | null
    ZM?: StringNullableFilter<"psr_finalized_temp"> | string | null
    RSM?: StringNullableFilter<"psr_finalized_temp"> | string | null
    ASM?: StringNullableFilter<"psr_finalized_temp"> | string | null
    TSI?: StringNullableFilter<"psr_finalized_temp"> | string | null
    category?: StringNullableFilter<"psr_finalized_temp"> | string | null
    brand?: StringNullableFilter<"psr_finalized_temp"> | string | null
    brandform?: StringNullableFilter<"psr_finalized_temp"> | string | null
    subbrandform?: StringNullableFilter<"psr_finalized_temp"> | string | null
    base_channel?: StringNullableFilter<"psr_finalized_temp"> | string | null
    short_channel?: StringNullableFilter<"psr_finalized_temp"> | string | null
    channel_desc?: StringNullableFilter<"psr_finalized_temp"> | string | null
    retailing?: DecimalFilter<"psr_finalized_temp"> | Decimal | DecimalJsLike | number | string
  }, "id">

  export type psr_finalized_tempOrderByWithAggregationInput = {
    id?: SortOrder
    document_date?: SortOrder
    customer_code?: SortOrder
    branch?: SortOrderInput | SortOrder
    ZM?: SortOrderInput | SortOrder
    RSM?: SortOrderInput | SortOrder
    ASM?: SortOrderInput | SortOrder
    TSI?: SortOrderInput | SortOrder
    category?: SortOrderInput | SortOrder
    brand?: SortOrderInput | SortOrder
    brandform?: SortOrderInput | SortOrder
    subbrandform?: SortOrderInput | SortOrder
    base_channel?: SortOrderInput | SortOrder
    short_channel?: SortOrderInput | SortOrder
    channel_desc?: SortOrderInput | SortOrder
    retailing?: SortOrder
    _count?: psr_finalized_tempCountOrderByAggregateInput
    _avg?: psr_finalized_tempAvgOrderByAggregateInput
    _max?: psr_finalized_tempMaxOrderByAggregateInput
    _min?: psr_finalized_tempMinOrderByAggregateInput
    _sum?: psr_finalized_tempSumOrderByAggregateInput
  }

  export type psr_finalized_tempScalarWhereWithAggregatesInput = {
    AND?: psr_finalized_tempScalarWhereWithAggregatesInput | psr_finalized_tempScalarWhereWithAggregatesInput[]
    OR?: psr_finalized_tempScalarWhereWithAggregatesInput[]
    NOT?: psr_finalized_tempScalarWhereWithAggregatesInput | psr_finalized_tempScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"psr_finalized_temp"> | number
    document_date?: DateTimeWithAggregatesFilter<"psr_finalized_temp"> | Date | string
    customer_code?: StringWithAggregatesFilter<"psr_finalized_temp"> | string
    branch?: StringNullableWithAggregatesFilter<"psr_finalized_temp"> | string | null
    ZM?: StringNullableWithAggregatesFilter<"psr_finalized_temp"> | string | null
    RSM?: StringNullableWithAggregatesFilter<"psr_finalized_temp"> | string | null
    ASM?: StringNullableWithAggregatesFilter<"psr_finalized_temp"> | string | null
    TSI?: StringNullableWithAggregatesFilter<"psr_finalized_temp"> | string | null
    category?: StringNullableWithAggregatesFilter<"psr_finalized_temp"> | string | null
    brand?: StringNullableWithAggregatesFilter<"psr_finalized_temp"> | string | null
    brandform?: StringNullableWithAggregatesFilter<"psr_finalized_temp"> | string | null
    subbrandform?: StringNullableWithAggregatesFilter<"psr_finalized_temp"> | string | null
    base_channel?: StringNullableWithAggregatesFilter<"psr_finalized_temp"> | string | null
    short_channel?: StringNullableWithAggregatesFilter<"psr_finalized_temp"> | string | null
    channel_desc?: StringNullableWithAggregatesFilter<"psr_finalized_temp"> | string | null
    retailing?: DecimalWithAggregatesFilter<"psr_finalized_temp"> | Decimal | DecimalJsLike | number | string
  }

  export type psr_data_finalizedWhereInput = {
    AND?: psr_data_finalizedWhereInput | psr_data_finalizedWhereInput[]
    OR?: psr_data_finalizedWhereInput[]
    NOT?: psr_data_finalizedWhereInput | psr_data_finalizedWhereInput[]
    id?: IntFilter<"psr_data_finalized"> | number
    document_date?: DateTimeFilter<"psr_data_finalized"> | Date | string
    customer_code?: StringFilter<"psr_data_finalized"> | string
    branch?: StringNullableFilter<"psr_data_finalized"> | string | null
    ZM?: StringNullableFilter<"psr_data_finalized"> | string | null
    RSM?: StringNullableFilter<"psr_data_finalized"> | string | null
    ASM?: StringNullableFilter<"psr_data_finalized"> | string | null
    TSI?: StringNullableFilter<"psr_data_finalized"> | string | null
    category?: StringNullableFilter<"psr_data_finalized"> | string | null
    brand?: StringNullableFilter<"psr_data_finalized"> | string | null
    brandform?: StringNullableFilter<"psr_data_finalized"> | string | null
    subbrandform?: StringNullableFilter<"psr_data_finalized"> | string | null
    base_channel?: StringNullableFilter<"psr_data_finalized"> | string | null
    short_channel?: StringNullableFilter<"psr_data_finalized"> | string | null
    channel_desc?: StringNullableFilter<"psr_data_finalized"> | string | null
    retailing?: DecimalFilter<"psr_data_finalized"> | Decimal | DecimalJsLike | number | string
  }

  export type psr_data_finalizedOrderByWithRelationInput = {
    id?: SortOrder
    document_date?: SortOrder
    customer_code?: SortOrder
    branch?: SortOrderInput | SortOrder
    ZM?: SortOrderInput | SortOrder
    RSM?: SortOrderInput | SortOrder
    ASM?: SortOrderInput | SortOrder
    TSI?: SortOrderInput | SortOrder
    category?: SortOrderInput | SortOrder
    brand?: SortOrderInput | SortOrder
    brandform?: SortOrderInput | SortOrder
    subbrandform?: SortOrderInput | SortOrder
    base_channel?: SortOrderInput | SortOrder
    short_channel?: SortOrderInput | SortOrder
    channel_desc?: SortOrderInput | SortOrder
    retailing?: SortOrder
    _relevance?: psr_data_finalizedOrderByRelevanceInput
  }

  export type psr_data_finalizedWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: psr_data_finalizedWhereInput | psr_data_finalizedWhereInput[]
    OR?: psr_data_finalizedWhereInput[]
    NOT?: psr_data_finalizedWhereInput | psr_data_finalizedWhereInput[]
    document_date?: DateTimeFilter<"psr_data_finalized"> | Date | string
    customer_code?: StringFilter<"psr_data_finalized"> | string
    branch?: StringNullableFilter<"psr_data_finalized"> | string | null
    ZM?: StringNullableFilter<"psr_data_finalized"> | string | null
    RSM?: StringNullableFilter<"psr_data_finalized"> | string | null
    ASM?: StringNullableFilter<"psr_data_finalized"> | string | null
    TSI?: StringNullableFilter<"psr_data_finalized"> | string | null
    category?: StringNullableFilter<"psr_data_finalized"> | string | null
    brand?: StringNullableFilter<"psr_data_finalized"> | string | null
    brandform?: StringNullableFilter<"psr_data_finalized"> | string | null
    subbrandform?: StringNullableFilter<"psr_data_finalized"> | string | null
    base_channel?: StringNullableFilter<"psr_data_finalized"> | string | null
    short_channel?: StringNullableFilter<"psr_data_finalized"> | string | null
    channel_desc?: StringNullableFilter<"psr_data_finalized"> | string | null
    retailing?: DecimalFilter<"psr_data_finalized"> | Decimal | DecimalJsLike | number | string
  }, "id">

  export type psr_data_finalizedOrderByWithAggregationInput = {
    id?: SortOrder
    document_date?: SortOrder
    customer_code?: SortOrder
    branch?: SortOrderInput | SortOrder
    ZM?: SortOrderInput | SortOrder
    RSM?: SortOrderInput | SortOrder
    ASM?: SortOrderInput | SortOrder
    TSI?: SortOrderInput | SortOrder
    category?: SortOrderInput | SortOrder
    brand?: SortOrderInput | SortOrder
    brandform?: SortOrderInput | SortOrder
    subbrandform?: SortOrderInput | SortOrder
    base_channel?: SortOrderInput | SortOrder
    short_channel?: SortOrderInput | SortOrder
    channel_desc?: SortOrderInput | SortOrder
    retailing?: SortOrder
    _count?: psr_data_finalizedCountOrderByAggregateInput
    _avg?: psr_data_finalizedAvgOrderByAggregateInput
    _max?: psr_data_finalizedMaxOrderByAggregateInput
    _min?: psr_data_finalizedMinOrderByAggregateInput
    _sum?: psr_data_finalizedSumOrderByAggregateInput
  }

  export type psr_data_finalizedScalarWhereWithAggregatesInput = {
    AND?: psr_data_finalizedScalarWhereWithAggregatesInput | psr_data_finalizedScalarWhereWithAggregatesInput[]
    OR?: psr_data_finalizedScalarWhereWithAggregatesInput[]
    NOT?: psr_data_finalizedScalarWhereWithAggregatesInput | psr_data_finalizedScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"psr_data_finalized"> | number
    document_date?: DateTimeWithAggregatesFilter<"psr_data_finalized"> | Date | string
    customer_code?: StringWithAggregatesFilter<"psr_data_finalized"> | string
    branch?: StringNullableWithAggregatesFilter<"psr_data_finalized"> | string | null
    ZM?: StringNullableWithAggregatesFilter<"psr_data_finalized"> | string | null
    RSM?: StringNullableWithAggregatesFilter<"psr_data_finalized"> | string | null
    ASM?: StringNullableWithAggregatesFilter<"psr_data_finalized"> | string | null
    TSI?: StringNullableWithAggregatesFilter<"psr_data_finalized"> | string | null
    category?: StringNullableWithAggregatesFilter<"psr_data_finalized"> | string | null
    brand?: StringNullableWithAggregatesFilter<"psr_data_finalized"> | string | null
    brandform?: StringNullableWithAggregatesFilter<"psr_data_finalized"> | string | null
    subbrandform?: StringNullableWithAggregatesFilter<"psr_data_finalized"> | string | null
    base_channel?: StringNullableWithAggregatesFilter<"psr_data_finalized"> | string | null
    short_channel?: StringNullableWithAggregatesFilter<"psr_data_finalized"> | string | null
    channel_desc?: StringNullableWithAggregatesFilter<"psr_data_finalized"> | string | null
    retailing?: DecimalWithAggregatesFilter<"psr_data_finalized"> | Decimal | DecimalJsLike | number | string
  }

  export type channel_mappingWhereInput = {
    AND?: channel_mappingWhereInput | channel_mappingWhereInput[]
    OR?: channel_mappingWhereInput[]
    NOT?: channel_mappingWhereInput | channel_mappingWhereInput[]
    channel_id?: IntFilter<"channel_mapping"> | number
    customer_type?: StringFilter<"channel_mapping"> | string
    base_channel?: StringFilter<"channel_mapping"> | string
    short_channel?: StringFilter<"channel_mapping"> | string
    channel_desc?: StringFilter<"channel_mapping"> | string
    created_at?: DateTimeFilter<"channel_mapping"> | Date | string
  }

  export type channel_mappingOrderByWithRelationInput = {
    channel_id?: SortOrder
    customer_type?: SortOrder
    base_channel?: SortOrder
    short_channel?: SortOrder
    channel_desc?: SortOrder
    created_at?: SortOrder
    _relevance?: channel_mappingOrderByRelevanceInput
  }

  export type channel_mappingWhereUniqueInput = Prisma.AtLeast<{
    channel_id?: number
    AND?: channel_mappingWhereInput | channel_mappingWhereInput[]
    OR?: channel_mappingWhereInput[]
    NOT?: channel_mappingWhereInput | channel_mappingWhereInput[]
    customer_type?: StringFilter<"channel_mapping"> | string
    base_channel?: StringFilter<"channel_mapping"> | string
    short_channel?: StringFilter<"channel_mapping"> | string
    channel_desc?: StringFilter<"channel_mapping"> | string
    created_at?: DateTimeFilter<"channel_mapping"> | Date | string
  }, "channel_id">

  export type channel_mappingOrderByWithAggregationInput = {
    channel_id?: SortOrder
    customer_type?: SortOrder
    base_channel?: SortOrder
    short_channel?: SortOrder
    channel_desc?: SortOrder
    created_at?: SortOrder
    _count?: channel_mappingCountOrderByAggregateInput
    _avg?: channel_mappingAvgOrderByAggregateInput
    _max?: channel_mappingMaxOrderByAggregateInput
    _min?: channel_mappingMinOrderByAggregateInput
    _sum?: channel_mappingSumOrderByAggregateInput
  }

  export type channel_mappingScalarWhereWithAggregatesInput = {
    AND?: channel_mappingScalarWhereWithAggregatesInput | channel_mappingScalarWhereWithAggregatesInput[]
    OR?: channel_mappingScalarWhereWithAggregatesInput[]
    NOT?: channel_mappingScalarWhereWithAggregatesInput | channel_mappingScalarWhereWithAggregatesInput[]
    channel_id?: IntWithAggregatesFilter<"channel_mapping"> | number
    customer_type?: StringWithAggregatesFilter<"channel_mapping"> | string
    base_channel?: StringWithAggregatesFilter<"channel_mapping"> | string
    short_channel?: StringWithAggregatesFilter<"channel_mapping"> | string
    channel_desc?: StringWithAggregatesFilter<"channel_mapping"> | string
    created_at?: DateTimeWithAggregatesFilter<"channel_mapping"> | Date | string
  }

  export type store_mappingWhereInput = {
    AND?: store_mappingWhereInput | store_mappingWhereInput[]
    OR?: store_mappingWhereInput[]
    NOT?: store_mappingWhereInput | store_mappingWhereInput[]
    Id?: IntFilter<"store_mapping"> | number
    Old_Store_Code?: StringFilter<"store_mapping"> | string
    New_Store_Code?: StringFilter<"store_mapping"> | string
    customer_name?: StringFilter<"store_mapping"> | string
    customer_type?: StringFilter<"store_mapping"> | string
    Branch?: StringFilter<"store_mapping"> | string
    DSE_Code?: StringFilter<"store_mapping"> | string
    ZM?: StringFilter<"store_mapping"> | string
    RSM?: StringFilter<"store_mapping"> | string
    ASM?: StringFilter<"store_mapping"> | string
    TSI?: StringFilter<"store_mapping"> | string
    created_at?: DateTimeFilter<"store_mapping"> | Date | string
  }

  export type store_mappingOrderByWithRelationInput = {
    Id?: SortOrder
    Old_Store_Code?: SortOrder
    New_Store_Code?: SortOrder
    customer_name?: SortOrder
    customer_type?: SortOrder
    Branch?: SortOrder
    DSE_Code?: SortOrder
    ZM?: SortOrder
    RSM?: SortOrder
    ASM?: SortOrder
    TSI?: SortOrder
    created_at?: SortOrder
    _relevance?: store_mappingOrderByRelevanceInput
  }

  export type store_mappingWhereUniqueInput = Prisma.AtLeast<{
    Id?: number
    AND?: store_mappingWhereInput | store_mappingWhereInput[]
    OR?: store_mappingWhereInput[]
    NOT?: store_mappingWhereInput | store_mappingWhereInput[]
    Old_Store_Code?: StringFilter<"store_mapping"> | string
    New_Store_Code?: StringFilter<"store_mapping"> | string
    customer_name?: StringFilter<"store_mapping"> | string
    customer_type?: StringFilter<"store_mapping"> | string
    Branch?: StringFilter<"store_mapping"> | string
    DSE_Code?: StringFilter<"store_mapping"> | string
    ZM?: StringFilter<"store_mapping"> | string
    RSM?: StringFilter<"store_mapping"> | string
    ASM?: StringFilter<"store_mapping"> | string
    TSI?: StringFilter<"store_mapping"> | string
    created_at?: DateTimeFilter<"store_mapping"> | Date | string
  }, "Id">

  export type store_mappingOrderByWithAggregationInput = {
    Id?: SortOrder
    Old_Store_Code?: SortOrder
    New_Store_Code?: SortOrder
    customer_name?: SortOrder
    customer_type?: SortOrder
    Branch?: SortOrder
    DSE_Code?: SortOrder
    ZM?: SortOrder
    RSM?: SortOrder
    ASM?: SortOrder
    TSI?: SortOrder
    created_at?: SortOrder
    _count?: store_mappingCountOrderByAggregateInput
    _avg?: store_mappingAvgOrderByAggregateInput
    _max?: store_mappingMaxOrderByAggregateInput
    _min?: store_mappingMinOrderByAggregateInput
    _sum?: store_mappingSumOrderByAggregateInput
  }

  export type store_mappingScalarWhereWithAggregatesInput = {
    AND?: store_mappingScalarWhereWithAggregatesInput | store_mappingScalarWhereWithAggregatesInput[]
    OR?: store_mappingScalarWhereWithAggregatesInput[]
    NOT?: store_mappingScalarWhereWithAggregatesInput | store_mappingScalarWhereWithAggregatesInput[]
    Id?: IntWithAggregatesFilter<"store_mapping"> | number
    Old_Store_Code?: StringWithAggregatesFilter<"store_mapping"> | string
    New_Store_Code?: StringWithAggregatesFilter<"store_mapping"> | string
    customer_name?: StringWithAggregatesFilter<"store_mapping"> | string
    customer_type?: StringWithAggregatesFilter<"store_mapping"> | string
    Branch?: StringWithAggregatesFilter<"store_mapping"> | string
    DSE_Code?: StringWithAggregatesFilter<"store_mapping"> | string
    ZM?: StringWithAggregatesFilter<"store_mapping"> | string
    RSM?: StringWithAggregatesFilter<"store_mapping"> | string
    ASM?: StringWithAggregatesFilter<"store_mapping"> | string
    TSI?: StringWithAggregatesFilter<"store_mapping"> | string
    created_at?: DateTimeWithAggregatesFilter<"store_mapping"> | Date | string
  }

  export type product_mappingWhereInput = {
    AND?: product_mappingWhereInput | product_mappingWhereInput[]
    OR?: product_mappingWhereInput[]
    NOT?: product_mappingWhereInput | product_mappingWhereInput[]
    Id?: IntFilter<"product_mapping"> | number
    p_code?: IntFilter<"product_mapping"> | number
    desc_short?: StringFilter<"product_mapping"> | string
    category?: StringFilter<"product_mapping"> | string
    brand?: StringFilter<"product_mapping"> | string
    brandform?: StringFilter<"product_mapping"> | string
    subbrandform?: StringFilter<"product_mapping"> | string
    created_at?: DateTimeFilter<"product_mapping"> | Date | string
  }

  export type product_mappingOrderByWithRelationInput = {
    Id?: SortOrder
    p_code?: SortOrder
    desc_short?: SortOrder
    category?: SortOrder
    brand?: SortOrder
    brandform?: SortOrder
    subbrandform?: SortOrder
    created_at?: SortOrder
    _relevance?: product_mappingOrderByRelevanceInput
  }

  export type product_mappingWhereUniqueInput = Prisma.AtLeast<{
    Id?: number
    p_code?: number
    AND?: product_mappingWhereInput | product_mappingWhereInput[]
    OR?: product_mappingWhereInput[]
    NOT?: product_mappingWhereInput | product_mappingWhereInput[]
    desc_short?: StringFilter<"product_mapping"> | string
    category?: StringFilter<"product_mapping"> | string
    brand?: StringFilter<"product_mapping"> | string
    brandform?: StringFilter<"product_mapping"> | string
    subbrandform?: StringFilter<"product_mapping"> | string
    created_at?: DateTimeFilter<"product_mapping"> | Date | string
  }, "Id" | "p_code">

  export type product_mappingOrderByWithAggregationInput = {
    Id?: SortOrder
    p_code?: SortOrder
    desc_short?: SortOrder
    category?: SortOrder
    brand?: SortOrder
    brandform?: SortOrder
    subbrandform?: SortOrder
    created_at?: SortOrder
    _count?: product_mappingCountOrderByAggregateInput
    _avg?: product_mappingAvgOrderByAggregateInput
    _max?: product_mappingMaxOrderByAggregateInput
    _min?: product_mappingMinOrderByAggregateInput
    _sum?: product_mappingSumOrderByAggregateInput
  }

  export type product_mappingScalarWhereWithAggregatesInput = {
    AND?: product_mappingScalarWhereWithAggregatesInput | product_mappingScalarWhereWithAggregatesInput[]
    OR?: product_mappingScalarWhereWithAggregatesInput[]
    NOT?: product_mappingScalarWhereWithAggregatesInput | product_mappingScalarWhereWithAggregatesInput[]
    Id?: IntWithAggregatesFilter<"product_mapping"> | number
    p_code?: IntWithAggregatesFilter<"product_mapping"> | number
    desc_short?: StringWithAggregatesFilter<"product_mapping"> | string
    category?: StringWithAggregatesFilter<"product_mapping"> | string
    brand?: StringWithAggregatesFilter<"product_mapping"> | string
    brandform?: StringWithAggregatesFilter<"product_mapping"> | string
    subbrandform?: StringWithAggregatesFilter<"product_mapping"> | string
    created_at?: DateTimeWithAggregatesFilter<"product_mapping"> | Date | string
  }

  export type mapping_change_flagWhereInput = {
    AND?: mapping_change_flagWhereInput | mapping_change_flagWhereInput[]
    OR?: mapping_change_flagWhereInput[]
    NOT?: mapping_change_flagWhereInput | mapping_change_flagWhereInput[]
    id?: IntFilter<"mapping_change_flag"> | number
    changed_at?: DateTimeFilter<"mapping_change_flag"> | Date | string
    processed?: BoolFilter<"mapping_change_flag"> | boolean
  }

  export type mapping_change_flagOrderByWithRelationInput = {
    id?: SortOrder
    changed_at?: SortOrder
    processed?: SortOrder
  }

  export type mapping_change_flagWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: mapping_change_flagWhereInput | mapping_change_flagWhereInput[]
    OR?: mapping_change_flagWhereInput[]
    NOT?: mapping_change_flagWhereInput | mapping_change_flagWhereInput[]
    changed_at?: DateTimeFilter<"mapping_change_flag"> | Date | string
    processed?: BoolFilter<"mapping_change_flag"> | boolean
  }, "id">

  export type mapping_change_flagOrderByWithAggregationInput = {
    id?: SortOrder
    changed_at?: SortOrder
    processed?: SortOrder
    _count?: mapping_change_flagCountOrderByAggregateInput
    _avg?: mapping_change_flagAvgOrderByAggregateInput
    _max?: mapping_change_flagMaxOrderByAggregateInput
    _min?: mapping_change_flagMinOrderByAggregateInput
    _sum?: mapping_change_flagSumOrderByAggregateInput
  }

  export type mapping_change_flagScalarWhereWithAggregatesInput = {
    AND?: mapping_change_flagScalarWhereWithAggregatesInput | mapping_change_flagScalarWhereWithAggregatesInput[]
    OR?: mapping_change_flagScalarWhereWithAggregatesInput[]
    NOT?: mapping_change_flagScalarWhereWithAggregatesInput | mapping_change_flagScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"mapping_change_flag"> | number
    changed_at?: DateTimeWithAggregatesFilter<"mapping_change_flag"> | Date | string
    processed?: BoolWithAggregatesFilter<"mapping_change_flag"> | boolean
  }

  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: IntFilter<"User"> | number
    name?: StringFilter<"User"> | string
    email?: StringFilter<"User"> | string
    hash?: StringNullableFilter<"User"> | string | null
    salt?: StringNullableFilter<"User"> | string | null
    role?: StringFilter<"User"> | string
    isActive?: BoolFilter<"User"> | boolean
    lastLogin?: DateTimeFilter<"User"> | Date | string
    image?: StringFilter<"User"> | string
    resetPasswordOTP?: IntNullableFilter<"User"> | number | null
    verificationOTP?: IntNullableFilter<"User"> | number | null
    verificationOTPExpires?: DateTimeNullableFilter<"User"> | Date | string | null
    resetPasswordExpires?: DateTimeNullableFilter<"User"> | Date | string | null
    otpAttempts?: IntNullableFilter<"User"> | number | null
    lastOTPAttemptAt?: DateTimeNullableFilter<"User"> | Date | string | null
    otpCooldownUntil?: DateTimeNullableFilter<"User"> | Date | string | null
    permissionSets?: PermissionSetListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    hash?: SortOrderInput | SortOrder
    salt?: SortOrderInput | SortOrder
    role?: SortOrder
    isActive?: SortOrder
    lastLogin?: SortOrder
    image?: SortOrder
    resetPasswordOTP?: SortOrderInput | SortOrder
    verificationOTP?: SortOrderInput | SortOrder
    verificationOTPExpires?: SortOrderInput | SortOrder
    resetPasswordExpires?: SortOrderInput | SortOrder
    otpAttempts?: SortOrderInput | SortOrder
    lastOTPAttemptAt?: SortOrderInput | SortOrder
    otpCooldownUntil?: SortOrderInput | SortOrder
    permissionSets?: PermissionSetOrderByRelationAggregateInput
    _relevance?: UserOrderByRelevanceInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    email?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    name?: StringFilter<"User"> | string
    hash?: StringNullableFilter<"User"> | string | null
    salt?: StringNullableFilter<"User"> | string | null
    role?: StringFilter<"User"> | string
    isActive?: BoolFilter<"User"> | boolean
    lastLogin?: DateTimeFilter<"User"> | Date | string
    image?: StringFilter<"User"> | string
    resetPasswordOTP?: IntNullableFilter<"User"> | number | null
    verificationOTP?: IntNullableFilter<"User"> | number | null
    verificationOTPExpires?: DateTimeNullableFilter<"User"> | Date | string | null
    resetPasswordExpires?: DateTimeNullableFilter<"User"> | Date | string | null
    otpAttempts?: IntNullableFilter<"User"> | number | null
    lastOTPAttemptAt?: DateTimeNullableFilter<"User"> | Date | string | null
    otpCooldownUntil?: DateTimeNullableFilter<"User"> | Date | string | null
    permissionSets?: PermissionSetListRelationFilter
  }, "id" | "email">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    hash?: SortOrderInput | SortOrder
    salt?: SortOrderInput | SortOrder
    role?: SortOrder
    isActive?: SortOrder
    lastLogin?: SortOrder
    image?: SortOrder
    resetPasswordOTP?: SortOrderInput | SortOrder
    verificationOTP?: SortOrderInput | SortOrder
    verificationOTPExpires?: SortOrderInput | SortOrder
    resetPasswordExpires?: SortOrderInput | SortOrder
    otpAttempts?: SortOrderInput | SortOrder
    lastOTPAttemptAt?: SortOrderInput | SortOrder
    otpCooldownUntil?: SortOrderInput | SortOrder
    _count?: UserCountOrderByAggregateInput
    _avg?: UserAvgOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
    _sum?: UserSumOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"User"> | number
    name?: StringWithAggregatesFilter<"User"> | string
    email?: StringWithAggregatesFilter<"User"> | string
    hash?: StringNullableWithAggregatesFilter<"User"> | string | null
    salt?: StringNullableWithAggregatesFilter<"User"> | string | null
    role?: StringWithAggregatesFilter<"User"> | string
    isActive?: BoolWithAggregatesFilter<"User"> | boolean
    lastLogin?: DateTimeWithAggregatesFilter<"User"> | Date | string
    image?: StringWithAggregatesFilter<"User"> | string
    resetPasswordOTP?: IntNullableWithAggregatesFilter<"User"> | number | null
    verificationOTP?: IntNullableWithAggregatesFilter<"User"> | number | null
    verificationOTPExpires?: DateTimeNullableWithAggregatesFilter<"User"> | Date | string | null
    resetPasswordExpires?: DateTimeNullableWithAggregatesFilter<"User"> | Date | string | null
    otpAttempts?: IntNullableWithAggregatesFilter<"User"> | number | null
    lastOTPAttemptAt?: DateTimeNullableWithAggregatesFilter<"User"> | Date | string | null
    otpCooldownUntil?: DateTimeNullableWithAggregatesFilter<"User"> | Date | string | null
  }

  export type PermissionSetWhereInput = {
    AND?: PermissionSetWhereInput | PermissionSetWhereInput[]
    OR?: PermissionSetWhereInput[]
    NOT?: PermissionSetWhereInput | PermissionSetWhereInput[]
    id?: IntFilter<"PermissionSet"> | number
    userId?: IntFilter<"PermissionSet"> | number
    page?: StringFilter<"PermissionSet"> | string
    permissions?: JsonFilter<"PermissionSet">
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type PermissionSetOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    page?: SortOrder
    permissions?: SortOrder
    user?: UserOrderByWithRelationInput
    _relevance?: PermissionSetOrderByRelevanceInput
  }

  export type PermissionSetWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    userId_page?: PermissionSetUserIdPageCompoundUniqueInput
    AND?: PermissionSetWhereInput | PermissionSetWhereInput[]
    OR?: PermissionSetWhereInput[]
    NOT?: PermissionSetWhereInput | PermissionSetWhereInput[]
    userId?: IntFilter<"PermissionSet"> | number
    page?: StringFilter<"PermissionSet"> | string
    permissions?: JsonFilter<"PermissionSet">
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id" | "userId_page">

  export type PermissionSetOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    page?: SortOrder
    permissions?: SortOrder
    _count?: PermissionSetCountOrderByAggregateInput
    _avg?: PermissionSetAvgOrderByAggregateInput
    _max?: PermissionSetMaxOrderByAggregateInput
    _min?: PermissionSetMinOrderByAggregateInput
    _sum?: PermissionSetSumOrderByAggregateInput
  }

  export type PermissionSetScalarWhereWithAggregatesInput = {
    AND?: PermissionSetScalarWhereWithAggregatesInput | PermissionSetScalarWhereWithAggregatesInput[]
    OR?: PermissionSetScalarWhereWithAggregatesInput[]
    NOT?: PermissionSetScalarWhereWithAggregatesInput | PermissionSetScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"PermissionSet"> | number
    userId?: IntWithAggregatesFilter<"PermissionSet"> | number
    page?: StringWithAggregatesFilter<"PermissionSet"> | string
    permissions?: JsonWithAggregatesFilter<"PermissionSet">
  }

  export type psr_data_tempCreateInput = {
    document_no: string
    document_date: Date | string
    subbrandform: string
    customer_name: string
    customer_code: string
    p_code: number
    customer_type: string
    category: string
    brand: string
    brandform: string
    retailing: Decimal | DecimalJsLike | number | string
  }

  export type psr_data_tempUncheckedCreateInput = {
    psr_id?: number
    document_no: string
    document_date: Date | string
    subbrandform: string
    customer_name: string
    customer_code: string
    p_code: number
    customer_type: string
    category: string
    brand: string
    brandform: string
    retailing: Decimal | DecimalJsLike | number | string
  }

  export type psr_data_tempUpdateInput = {
    document_no?: StringFieldUpdateOperationsInput | string
    document_date?: DateTimeFieldUpdateOperationsInput | Date | string
    subbrandform?: StringFieldUpdateOperationsInput | string
    customer_name?: StringFieldUpdateOperationsInput | string
    customer_code?: StringFieldUpdateOperationsInput | string
    p_code?: IntFieldUpdateOperationsInput | number
    customer_type?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    brand?: StringFieldUpdateOperationsInput | string
    brandform?: StringFieldUpdateOperationsInput | string
    retailing?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
  }

  export type psr_data_tempUncheckedUpdateInput = {
    psr_id?: IntFieldUpdateOperationsInput | number
    document_no?: StringFieldUpdateOperationsInput | string
    document_date?: DateTimeFieldUpdateOperationsInput | Date | string
    subbrandform?: StringFieldUpdateOperationsInput | string
    customer_name?: StringFieldUpdateOperationsInput | string
    customer_code?: StringFieldUpdateOperationsInput | string
    p_code?: IntFieldUpdateOperationsInput | number
    customer_type?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    brand?: StringFieldUpdateOperationsInput | string
    brandform?: StringFieldUpdateOperationsInput | string
    retailing?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
  }

  export type psr_data_tempCreateManyInput = {
    psr_id?: number
    document_no: string
    document_date: Date | string
    subbrandform: string
    customer_name: string
    customer_code: string
    p_code: number
    customer_type: string
    category: string
    brand: string
    brandform: string
    retailing: Decimal | DecimalJsLike | number | string
  }

  export type psr_data_tempUpdateManyMutationInput = {
    document_no?: StringFieldUpdateOperationsInput | string
    document_date?: DateTimeFieldUpdateOperationsInput | Date | string
    subbrandform?: StringFieldUpdateOperationsInput | string
    customer_name?: StringFieldUpdateOperationsInput | string
    customer_code?: StringFieldUpdateOperationsInput | string
    p_code?: IntFieldUpdateOperationsInput | number
    customer_type?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    brand?: StringFieldUpdateOperationsInput | string
    brandform?: StringFieldUpdateOperationsInput | string
    retailing?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
  }

  export type psr_data_tempUncheckedUpdateManyInput = {
    psr_id?: IntFieldUpdateOperationsInput | number
    document_no?: StringFieldUpdateOperationsInput | string
    document_date?: DateTimeFieldUpdateOperationsInput | Date | string
    subbrandform?: StringFieldUpdateOperationsInput | string
    customer_name?: StringFieldUpdateOperationsInput | string
    customer_code?: StringFieldUpdateOperationsInput | string
    p_code?: IntFieldUpdateOperationsInput | number
    customer_type?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    brand?: StringFieldUpdateOperationsInput | string
    brandform?: StringFieldUpdateOperationsInput | string
    retailing?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
  }

  export type psr_data_historicalCreateInput = {
    document_no: string
    document_date: Date | string
    subbrandform: string
    customer_name: string
    customer_code: string
    p_code: number
    customer_type: string
    category: string
    brand: string
    brandform: string
    retailing: Decimal | DecimalJsLike | number | string
  }

  export type psr_data_historicalUncheckedCreateInput = {
    psr_id?: number
    document_no: string
    document_date: Date | string
    subbrandform: string
    customer_name: string
    customer_code: string
    p_code: number
    customer_type: string
    category: string
    brand: string
    brandform: string
    retailing: Decimal | DecimalJsLike | number | string
  }

  export type psr_data_historicalUpdateInput = {
    document_no?: StringFieldUpdateOperationsInput | string
    document_date?: DateTimeFieldUpdateOperationsInput | Date | string
    subbrandform?: StringFieldUpdateOperationsInput | string
    customer_name?: StringFieldUpdateOperationsInput | string
    customer_code?: StringFieldUpdateOperationsInput | string
    p_code?: IntFieldUpdateOperationsInput | number
    customer_type?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    brand?: StringFieldUpdateOperationsInput | string
    brandform?: StringFieldUpdateOperationsInput | string
    retailing?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
  }

  export type psr_data_historicalUncheckedUpdateInput = {
    psr_id?: IntFieldUpdateOperationsInput | number
    document_no?: StringFieldUpdateOperationsInput | string
    document_date?: DateTimeFieldUpdateOperationsInput | Date | string
    subbrandform?: StringFieldUpdateOperationsInput | string
    customer_name?: StringFieldUpdateOperationsInput | string
    customer_code?: StringFieldUpdateOperationsInput | string
    p_code?: IntFieldUpdateOperationsInput | number
    customer_type?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    brand?: StringFieldUpdateOperationsInput | string
    brandform?: StringFieldUpdateOperationsInput | string
    retailing?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
  }

  export type psr_data_historicalCreateManyInput = {
    psr_id?: number
    document_no: string
    document_date: Date | string
    subbrandform: string
    customer_name: string
    customer_code: string
    p_code: number
    customer_type: string
    category: string
    brand: string
    brandform: string
    retailing: Decimal | DecimalJsLike | number | string
  }

  export type psr_data_historicalUpdateManyMutationInput = {
    document_no?: StringFieldUpdateOperationsInput | string
    document_date?: DateTimeFieldUpdateOperationsInput | Date | string
    subbrandform?: StringFieldUpdateOperationsInput | string
    customer_name?: StringFieldUpdateOperationsInput | string
    customer_code?: StringFieldUpdateOperationsInput | string
    p_code?: IntFieldUpdateOperationsInput | number
    customer_type?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    brand?: StringFieldUpdateOperationsInput | string
    brandform?: StringFieldUpdateOperationsInput | string
    retailing?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
  }

  export type psr_data_historicalUncheckedUpdateManyInput = {
    psr_id?: IntFieldUpdateOperationsInput | number
    document_no?: StringFieldUpdateOperationsInput | string
    document_date?: DateTimeFieldUpdateOperationsInput | Date | string
    subbrandform?: StringFieldUpdateOperationsInput | string
    customer_name?: StringFieldUpdateOperationsInput | string
    customer_code?: StringFieldUpdateOperationsInput | string
    p_code?: IntFieldUpdateOperationsInput | number
    customer_type?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    brand?: StringFieldUpdateOperationsInput | string
    brandform?: StringFieldUpdateOperationsInput | string
    retailing?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
  }

  export type psr_finalized_tempCreateInput = {
    document_date: Date | string
    customer_code: string
    branch?: string | null
    ZM?: string | null
    RSM?: string | null
    ASM?: string | null
    TSI?: string | null
    category?: string | null
    brand?: string | null
    brandform?: string | null
    subbrandform?: string | null
    base_channel?: string | null
    short_channel?: string | null
    channel_desc?: string | null
    retailing: Decimal | DecimalJsLike | number | string
  }

  export type psr_finalized_tempUncheckedCreateInput = {
    id?: number
    document_date: Date | string
    customer_code: string
    branch?: string | null
    ZM?: string | null
    RSM?: string | null
    ASM?: string | null
    TSI?: string | null
    category?: string | null
    brand?: string | null
    brandform?: string | null
    subbrandform?: string | null
    base_channel?: string | null
    short_channel?: string | null
    channel_desc?: string | null
    retailing: Decimal | DecimalJsLike | number | string
  }

  export type psr_finalized_tempUpdateInput = {
    document_date?: DateTimeFieldUpdateOperationsInput | Date | string
    customer_code?: StringFieldUpdateOperationsInput | string
    branch?: NullableStringFieldUpdateOperationsInput | string | null
    ZM?: NullableStringFieldUpdateOperationsInput | string | null
    RSM?: NullableStringFieldUpdateOperationsInput | string | null
    ASM?: NullableStringFieldUpdateOperationsInput | string | null
    TSI?: NullableStringFieldUpdateOperationsInput | string | null
    category?: NullableStringFieldUpdateOperationsInput | string | null
    brand?: NullableStringFieldUpdateOperationsInput | string | null
    brandform?: NullableStringFieldUpdateOperationsInput | string | null
    subbrandform?: NullableStringFieldUpdateOperationsInput | string | null
    base_channel?: NullableStringFieldUpdateOperationsInput | string | null
    short_channel?: NullableStringFieldUpdateOperationsInput | string | null
    channel_desc?: NullableStringFieldUpdateOperationsInput | string | null
    retailing?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
  }

  export type psr_finalized_tempUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    document_date?: DateTimeFieldUpdateOperationsInput | Date | string
    customer_code?: StringFieldUpdateOperationsInput | string
    branch?: NullableStringFieldUpdateOperationsInput | string | null
    ZM?: NullableStringFieldUpdateOperationsInput | string | null
    RSM?: NullableStringFieldUpdateOperationsInput | string | null
    ASM?: NullableStringFieldUpdateOperationsInput | string | null
    TSI?: NullableStringFieldUpdateOperationsInput | string | null
    category?: NullableStringFieldUpdateOperationsInput | string | null
    brand?: NullableStringFieldUpdateOperationsInput | string | null
    brandform?: NullableStringFieldUpdateOperationsInput | string | null
    subbrandform?: NullableStringFieldUpdateOperationsInput | string | null
    base_channel?: NullableStringFieldUpdateOperationsInput | string | null
    short_channel?: NullableStringFieldUpdateOperationsInput | string | null
    channel_desc?: NullableStringFieldUpdateOperationsInput | string | null
    retailing?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
  }

  export type psr_finalized_tempCreateManyInput = {
    id?: number
    document_date: Date | string
    customer_code: string
    branch?: string | null
    ZM?: string | null
    RSM?: string | null
    ASM?: string | null
    TSI?: string | null
    category?: string | null
    brand?: string | null
    brandform?: string | null
    subbrandform?: string | null
    base_channel?: string | null
    short_channel?: string | null
    channel_desc?: string | null
    retailing: Decimal | DecimalJsLike | number | string
  }

  export type psr_finalized_tempUpdateManyMutationInput = {
    document_date?: DateTimeFieldUpdateOperationsInput | Date | string
    customer_code?: StringFieldUpdateOperationsInput | string
    branch?: NullableStringFieldUpdateOperationsInput | string | null
    ZM?: NullableStringFieldUpdateOperationsInput | string | null
    RSM?: NullableStringFieldUpdateOperationsInput | string | null
    ASM?: NullableStringFieldUpdateOperationsInput | string | null
    TSI?: NullableStringFieldUpdateOperationsInput | string | null
    category?: NullableStringFieldUpdateOperationsInput | string | null
    brand?: NullableStringFieldUpdateOperationsInput | string | null
    brandform?: NullableStringFieldUpdateOperationsInput | string | null
    subbrandform?: NullableStringFieldUpdateOperationsInput | string | null
    base_channel?: NullableStringFieldUpdateOperationsInput | string | null
    short_channel?: NullableStringFieldUpdateOperationsInput | string | null
    channel_desc?: NullableStringFieldUpdateOperationsInput | string | null
    retailing?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
  }

  export type psr_finalized_tempUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    document_date?: DateTimeFieldUpdateOperationsInput | Date | string
    customer_code?: StringFieldUpdateOperationsInput | string
    branch?: NullableStringFieldUpdateOperationsInput | string | null
    ZM?: NullableStringFieldUpdateOperationsInput | string | null
    RSM?: NullableStringFieldUpdateOperationsInput | string | null
    ASM?: NullableStringFieldUpdateOperationsInput | string | null
    TSI?: NullableStringFieldUpdateOperationsInput | string | null
    category?: NullableStringFieldUpdateOperationsInput | string | null
    brand?: NullableStringFieldUpdateOperationsInput | string | null
    brandform?: NullableStringFieldUpdateOperationsInput | string | null
    subbrandform?: NullableStringFieldUpdateOperationsInput | string | null
    base_channel?: NullableStringFieldUpdateOperationsInput | string | null
    short_channel?: NullableStringFieldUpdateOperationsInput | string | null
    channel_desc?: NullableStringFieldUpdateOperationsInput | string | null
    retailing?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
  }

  export type psr_data_finalizedCreateInput = {
    document_date: Date | string
    customer_code: string
    branch?: string | null
    ZM?: string | null
    RSM?: string | null
    ASM?: string | null
    TSI?: string | null
    category?: string | null
    brand?: string | null
    brandform?: string | null
    subbrandform?: string | null
    base_channel?: string | null
    short_channel?: string | null
    channel_desc?: string | null
    retailing: Decimal | DecimalJsLike | number | string
  }

  export type psr_data_finalizedUncheckedCreateInput = {
    id?: number
    document_date: Date | string
    customer_code: string
    branch?: string | null
    ZM?: string | null
    RSM?: string | null
    ASM?: string | null
    TSI?: string | null
    category?: string | null
    brand?: string | null
    brandform?: string | null
    subbrandform?: string | null
    base_channel?: string | null
    short_channel?: string | null
    channel_desc?: string | null
    retailing: Decimal | DecimalJsLike | number | string
  }

  export type psr_data_finalizedUpdateInput = {
    document_date?: DateTimeFieldUpdateOperationsInput | Date | string
    customer_code?: StringFieldUpdateOperationsInput | string
    branch?: NullableStringFieldUpdateOperationsInput | string | null
    ZM?: NullableStringFieldUpdateOperationsInput | string | null
    RSM?: NullableStringFieldUpdateOperationsInput | string | null
    ASM?: NullableStringFieldUpdateOperationsInput | string | null
    TSI?: NullableStringFieldUpdateOperationsInput | string | null
    category?: NullableStringFieldUpdateOperationsInput | string | null
    brand?: NullableStringFieldUpdateOperationsInput | string | null
    brandform?: NullableStringFieldUpdateOperationsInput | string | null
    subbrandform?: NullableStringFieldUpdateOperationsInput | string | null
    base_channel?: NullableStringFieldUpdateOperationsInput | string | null
    short_channel?: NullableStringFieldUpdateOperationsInput | string | null
    channel_desc?: NullableStringFieldUpdateOperationsInput | string | null
    retailing?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
  }

  export type psr_data_finalizedUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    document_date?: DateTimeFieldUpdateOperationsInput | Date | string
    customer_code?: StringFieldUpdateOperationsInput | string
    branch?: NullableStringFieldUpdateOperationsInput | string | null
    ZM?: NullableStringFieldUpdateOperationsInput | string | null
    RSM?: NullableStringFieldUpdateOperationsInput | string | null
    ASM?: NullableStringFieldUpdateOperationsInput | string | null
    TSI?: NullableStringFieldUpdateOperationsInput | string | null
    category?: NullableStringFieldUpdateOperationsInput | string | null
    brand?: NullableStringFieldUpdateOperationsInput | string | null
    brandform?: NullableStringFieldUpdateOperationsInput | string | null
    subbrandform?: NullableStringFieldUpdateOperationsInput | string | null
    base_channel?: NullableStringFieldUpdateOperationsInput | string | null
    short_channel?: NullableStringFieldUpdateOperationsInput | string | null
    channel_desc?: NullableStringFieldUpdateOperationsInput | string | null
    retailing?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
  }

  export type psr_data_finalizedCreateManyInput = {
    id?: number
    document_date: Date | string
    customer_code: string
    branch?: string | null
    ZM?: string | null
    RSM?: string | null
    ASM?: string | null
    TSI?: string | null
    category?: string | null
    brand?: string | null
    brandform?: string | null
    subbrandform?: string | null
    base_channel?: string | null
    short_channel?: string | null
    channel_desc?: string | null
    retailing: Decimal | DecimalJsLike | number | string
  }

  export type psr_data_finalizedUpdateManyMutationInput = {
    document_date?: DateTimeFieldUpdateOperationsInput | Date | string
    customer_code?: StringFieldUpdateOperationsInput | string
    branch?: NullableStringFieldUpdateOperationsInput | string | null
    ZM?: NullableStringFieldUpdateOperationsInput | string | null
    RSM?: NullableStringFieldUpdateOperationsInput | string | null
    ASM?: NullableStringFieldUpdateOperationsInput | string | null
    TSI?: NullableStringFieldUpdateOperationsInput | string | null
    category?: NullableStringFieldUpdateOperationsInput | string | null
    brand?: NullableStringFieldUpdateOperationsInput | string | null
    brandform?: NullableStringFieldUpdateOperationsInput | string | null
    subbrandform?: NullableStringFieldUpdateOperationsInput | string | null
    base_channel?: NullableStringFieldUpdateOperationsInput | string | null
    short_channel?: NullableStringFieldUpdateOperationsInput | string | null
    channel_desc?: NullableStringFieldUpdateOperationsInput | string | null
    retailing?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
  }

  export type psr_data_finalizedUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    document_date?: DateTimeFieldUpdateOperationsInput | Date | string
    customer_code?: StringFieldUpdateOperationsInput | string
    branch?: NullableStringFieldUpdateOperationsInput | string | null
    ZM?: NullableStringFieldUpdateOperationsInput | string | null
    RSM?: NullableStringFieldUpdateOperationsInput | string | null
    ASM?: NullableStringFieldUpdateOperationsInput | string | null
    TSI?: NullableStringFieldUpdateOperationsInput | string | null
    category?: NullableStringFieldUpdateOperationsInput | string | null
    brand?: NullableStringFieldUpdateOperationsInput | string | null
    brandform?: NullableStringFieldUpdateOperationsInput | string | null
    subbrandform?: NullableStringFieldUpdateOperationsInput | string | null
    base_channel?: NullableStringFieldUpdateOperationsInput | string | null
    short_channel?: NullableStringFieldUpdateOperationsInput | string | null
    channel_desc?: NullableStringFieldUpdateOperationsInput | string | null
    retailing?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
  }

  export type channel_mappingCreateInput = {
    customer_type: string
    base_channel: string
    short_channel: string
    channel_desc: string
    created_at?: Date | string
  }

  export type channel_mappingUncheckedCreateInput = {
    channel_id?: number
    customer_type: string
    base_channel: string
    short_channel: string
    channel_desc: string
    created_at?: Date | string
  }

  export type channel_mappingUpdateInput = {
    customer_type?: StringFieldUpdateOperationsInput | string
    base_channel?: StringFieldUpdateOperationsInput | string
    short_channel?: StringFieldUpdateOperationsInput | string
    channel_desc?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type channel_mappingUncheckedUpdateInput = {
    channel_id?: IntFieldUpdateOperationsInput | number
    customer_type?: StringFieldUpdateOperationsInput | string
    base_channel?: StringFieldUpdateOperationsInput | string
    short_channel?: StringFieldUpdateOperationsInput | string
    channel_desc?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type channel_mappingCreateManyInput = {
    channel_id?: number
    customer_type: string
    base_channel: string
    short_channel: string
    channel_desc: string
    created_at?: Date | string
  }

  export type channel_mappingUpdateManyMutationInput = {
    customer_type?: StringFieldUpdateOperationsInput | string
    base_channel?: StringFieldUpdateOperationsInput | string
    short_channel?: StringFieldUpdateOperationsInput | string
    channel_desc?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type channel_mappingUncheckedUpdateManyInput = {
    channel_id?: IntFieldUpdateOperationsInput | number
    customer_type?: StringFieldUpdateOperationsInput | string
    base_channel?: StringFieldUpdateOperationsInput | string
    short_channel?: StringFieldUpdateOperationsInput | string
    channel_desc?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type store_mappingCreateInput = {
    Old_Store_Code: string
    New_Store_Code: string
    customer_name: string
    customer_type: string
    Branch: string
    DSE_Code: string
    ZM: string
    RSM: string
    ASM: string
    TSI: string
    created_at?: Date | string
  }

  export type store_mappingUncheckedCreateInput = {
    Id?: number
    Old_Store_Code: string
    New_Store_Code: string
    customer_name: string
    customer_type: string
    Branch: string
    DSE_Code: string
    ZM: string
    RSM: string
    ASM: string
    TSI: string
    created_at?: Date | string
  }

  export type store_mappingUpdateInput = {
    Old_Store_Code?: StringFieldUpdateOperationsInput | string
    New_Store_Code?: StringFieldUpdateOperationsInput | string
    customer_name?: StringFieldUpdateOperationsInput | string
    customer_type?: StringFieldUpdateOperationsInput | string
    Branch?: StringFieldUpdateOperationsInput | string
    DSE_Code?: StringFieldUpdateOperationsInput | string
    ZM?: StringFieldUpdateOperationsInput | string
    RSM?: StringFieldUpdateOperationsInput | string
    ASM?: StringFieldUpdateOperationsInput | string
    TSI?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type store_mappingUncheckedUpdateInput = {
    Id?: IntFieldUpdateOperationsInput | number
    Old_Store_Code?: StringFieldUpdateOperationsInput | string
    New_Store_Code?: StringFieldUpdateOperationsInput | string
    customer_name?: StringFieldUpdateOperationsInput | string
    customer_type?: StringFieldUpdateOperationsInput | string
    Branch?: StringFieldUpdateOperationsInput | string
    DSE_Code?: StringFieldUpdateOperationsInput | string
    ZM?: StringFieldUpdateOperationsInput | string
    RSM?: StringFieldUpdateOperationsInput | string
    ASM?: StringFieldUpdateOperationsInput | string
    TSI?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type store_mappingCreateManyInput = {
    Id?: number
    Old_Store_Code: string
    New_Store_Code: string
    customer_name: string
    customer_type: string
    Branch: string
    DSE_Code: string
    ZM: string
    RSM: string
    ASM: string
    TSI: string
    created_at?: Date | string
  }

  export type store_mappingUpdateManyMutationInput = {
    Old_Store_Code?: StringFieldUpdateOperationsInput | string
    New_Store_Code?: StringFieldUpdateOperationsInput | string
    customer_name?: StringFieldUpdateOperationsInput | string
    customer_type?: StringFieldUpdateOperationsInput | string
    Branch?: StringFieldUpdateOperationsInput | string
    DSE_Code?: StringFieldUpdateOperationsInput | string
    ZM?: StringFieldUpdateOperationsInput | string
    RSM?: StringFieldUpdateOperationsInput | string
    ASM?: StringFieldUpdateOperationsInput | string
    TSI?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type store_mappingUncheckedUpdateManyInput = {
    Id?: IntFieldUpdateOperationsInput | number
    Old_Store_Code?: StringFieldUpdateOperationsInput | string
    New_Store_Code?: StringFieldUpdateOperationsInput | string
    customer_name?: StringFieldUpdateOperationsInput | string
    customer_type?: StringFieldUpdateOperationsInput | string
    Branch?: StringFieldUpdateOperationsInput | string
    DSE_Code?: StringFieldUpdateOperationsInput | string
    ZM?: StringFieldUpdateOperationsInput | string
    RSM?: StringFieldUpdateOperationsInput | string
    ASM?: StringFieldUpdateOperationsInput | string
    TSI?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type product_mappingCreateInput = {
    p_code: number
    desc_short: string
    category: string
    brand: string
    brandform: string
    subbrandform: string
    created_at?: Date | string
  }

  export type product_mappingUncheckedCreateInput = {
    Id?: number
    p_code: number
    desc_short: string
    category: string
    brand: string
    brandform: string
    subbrandform: string
    created_at?: Date | string
  }

  export type product_mappingUpdateInput = {
    p_code?: IntFieldUpdateOperationsInput | number
    desc_short?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    brand?: StringFieldUpdateOperationsInput | string
    brandform?: StringFieldUpdateOperationsInput | string
    subbrandform?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type product_mappingUncheckedUpdateInput = {
    Id?: IntFieldUpdateOperationsInput | number
    p_code?: IntFieldUpdateOperationsInput | number
    desc_short?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    brand?: StringFieldUpdateOperationsInput | string
    brandform?: StringFieldUpdateOperationsInput | string
    subbrandform?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type product_mappingCreateManyInput = {
    Id?: number
    p_code: number
    desc_short: string
    category: string
    brand: string
    brandform: string
    subbrandform: string
    created_at?: Date | string
  }

  export type product_mappingUpdateManyMutationInput = {
    p_code?: IntFieldUpdateOperationsInput | number
    desc_short?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    brand?: StringFieldUpdateOperationsInput | string
    brandform?: StringFieldUpdateOperationsInput | string
    subbrandform?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type product_mappingUncheckedUpdateManyInput = {
    Id?: IntFieldUpdateOperationsInput | number
    p_code?: IntFieldUpdateOperationsInput | number
    desc_short?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    brand?: StringFieldUpdateOperationsInput | string
    brandform?: StringFieldUpdateOperationsInput | string
    subbrandform?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type mapping_change_flagCreateInput = {
    changed_at?: Date | string
    processed?: boolean
  }

  export type mapping_change_flagUncheckedCreateInput = {
    id?: number
    changed_at?: Date | string
    processed?: boolean
  }

  export type mapping_change_flagUpdateInput = {
    changed_at?: DateTimeFieldUpdateOperationsInput | Date | string
    processed?: BoolFieldUpdateOperationsInput | boolean
  }

  export type mapping_change_flagUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    changed_at?: DateTimeFieldUpdateOperationsInput | Date | string
    processed?: BoolFieldUpdateOperationsInput | boolean
  }

  export type mapping_change_flagCreateManyInput = {
    id?: number
    changed_at?: Date | string
    processed?: boolean
  }

  export type mapping_change_flagUpdateManyMutationInput = {
    changed_at?: DateTimeFieldUpdateOperationsInput | Date | string
    processed?: BoolFieldUpdateOperationsInput | boolean
  }

  export type mapping_change_flagUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    changed_at?: DateTimeFieldUpdateOperationsInput | Date | string
    processed?: BoolFieldUpdateOperationsInput | boolean
  }

  export type UserCreateInput = {
    name: string
    email: string
    hash?: string | null
    salt?: string | null
    role?: string
    isActive?: boolean
    lastLogin?: Date | string
    image?: string
    resetPasswordOTP?: number | null
    verificationOTP?: number | null
    verificationOTPExpires?: Date | string | null
    resetPasswordExpires?: Date | string | null
    otpAttempts?: number | null
    lastOTPAttemptAt?: Date | string | null
    otpCooldownUntil?: Date | string | null
    permissionSets?: PermissionSetCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateInput = {
    id?: number
    name: string
    email: string
    hash?: string | null
    salt?: string | null
    role?: string
    isActive?: boolean
    lastLogin?: Date | string
    image?: string
    resetPasswordOTP?: number | null
    verificationOTP?: number | null
    verificationOTPExpires?: Date | string | null
    resetPasswordExpires?: Date | string | null
    otpAttempts?: number | null
    lastOTPAttemptAt?: Date | string | null
    otpCooldownUntil?: Date | string | null
    permissionSets?: PermissionSetUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserUpdateInput = {
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    hash?: NullableStringFieldUpdateOperationsInput | string | null
    salt?: NullableStringFieldUpdateOperationsInput | string | null
    role?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    lastLogin?: DateTimeFieldUpdateOperationsInput | Date | string
    image?: StringFieldUpdateOperationsInput | string
    resetPasswordOTP?: NullableIntFieldUpdateOperationsInput | number | null
    verificationOTP?: NullableIntFieldUpdateOperationsInput | number | null
    verificationOTPExpires?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    resetPasswordExpires?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    otpAttempts?: NullableIntFieldUpdateOperationsInput | number | null
    lastOTPAttemptAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    otpCooldownUntil?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    permissionSets?: PermissionSetUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    hash?: NullableStringFieldUpdateOperationsInput | string | null
    salt?: NullableStringFieldUpdateOperationsInput | string | null
    role?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    lastLogin?: DateTimeFieldUpdateOperationsInput | Date | string
    image?: StringFieldUpdateOperationsInput | string
    resetPasswordOTP?: NullableIntFieldUpdateOperationsInput | number | null
    verificationOTP?: NullableIntFieldUpdateOperationsInput | number | null
    verificationOTPExpires?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    resetPasswordExpires?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    otpAttempts?: NullableIntFieldUpdateOperationsInput | number | null
    lastOTPAttemptAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    otpCooldownUntil?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    permissionSets?: PermissionSetUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateManyInput = {
    id?: number
    name: string
    email: string
    hash?: string | null
    salt?: string | null
    role?: string
    isActive?: boolean
    lastLogin?: Date | string
    image?: string
    resetPasswordOTP?: number | null
    verificationOTP?: number | null
    verificationOTPExpires?: Date | string | null
    resetPasswordExpires?: Date | string | null
    otpAttempts?: number | null
    lastOTPAttemptAt?: Date | string | null
    otpCooldownUntil?: Date | string | null
  }

  export type UserUpdateManyMutationInput = {
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    hash?: NullableStringFieldUpdateOperationsInput | string | null
    salt?: NullableStringFieldUpdateOperationsInput | string | null
    role?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    lastLogin?: DateTimeFieldUpdateOperationsInput | Date | string
    image?: StringFieldUpdateOperationsInput | string
    resetPasswordOTP?: NullableIntFieldUpdateOperationsInput | number | null
    verificationOTP?: NullableIntFieldUpdateOperationsInput | number | null
    verificationOTPExpires?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    resetPasswordExpires?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    otpAttempts?: NullableIntFieldUpdateOperationsInput | number | null
    lastOTPAttemptAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    otpCooldownUntil?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type UserUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    hash?: NullableStringFieldUpdateOperationsInput | string | null
    salt?: NullableStringFieldUpdateOperationsInput | string | null
    role?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    lastLogin?: DateTimeFieldUpdateOperationsInput | Date | string
    image?: StringFieldUpdateOperationsInput | string
    resetPasswordOTP?: NullableIntFieldUpdateOperationsInput | number | null
    verificationOTP?: NullableIntFieldUpdateOperationsInput | number | null
    verificationOTPExpires?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    resetPasswordExpires?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    otpAttempts?: NullableIntFieldUpdateOperationsInput | number | null
    lastOTPAttemptAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    otpCooldownUntil?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type PermissionSetCreateInput = {
    page: string
    permissions: JsonNullValueInput | InputJsonValue
    user: UserCreateNestedOneWithoutPermissionSetsInput
  }

  export type PermissionSetUncheckedCreateInput = {
    id?: number
    userId: number
    page: string
    permissions: JsonNullValueInput | InputJsonValue
  }

  export type PermissionSetUpdateInput = {
    page?: StringFieldUpdateOperationsInput | string
    permissions?: JsonNullValueInput | InputJsonValue
    user?: UserUpdateOneRequiredWithoutPermissionSetsNestedInput
  }

  export type PermissionSetUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    page?: StringFieldUpdateOperationsInput | string
    permissions?: JsonNullValueInput | InputJsonValue
  }

  export type PermissionSetCreateManyInput = {
    id?: number
    userId: number
    page: string
    permissions: JsonNullValueInput | InputJsonValue
  }

  export type PermissionSetUpdateManyMutationInput = {
    page?: StringFieldUpdateOperationsInput | string
    permissions?: JsonNullValueInput | InputJsonValue
  }

  export type PermissionSetUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    page?: StringFieldUpdateOperationsInput | string
    permissions?: JsonNullValueInput | InputJsonValue
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
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
    search?: string
    not?: NestedStringFilter<$PrismaModel> | string
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

  export type DecimalFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[]
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[]
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
  }

  export type psr_data_tempOrderByRelevanceInput = {
    fields: psr_data_tempOrderByRelevanceFieldEnum | psr_data_tempOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type psr_data_tempCountOrderByAggregateInput = {
    psr_id?: SortOrder
    document_no?: SortOrder
    document_date?: SortOrder
    subbrandform?: SortOrder
    customer_name?: SortOrder
    customer_code?: SortOrder
    p_code?: SortOrder
    customer_type?: SortOrder
    category?: SortOrder
    brand?: SortOrder
    brandform?: SortOrder
    retailing?: SortOrder
  }

  export type psr_data_tempAvgOrderByAggregateInput = {
    psr_id?: SortOrder
    p_code?: SortOrder
    retailing?: SortOrder
  }

  export type psr_data_tempMaxOrderByAggregateInput = {
    psr_id?: SortOrder
    document_no?: SortOrder
    document_date?: SortOrder
    subbrandform?: SortOrder
    customer_name?: SortOrder
    customer_code?: SortOrder
    p_code?: SortOrder
    customer_type?: SortOrder
    category?: SortOrder
    brand?: SortOrder
    brandform?: SortOrder
    retailing?: SortOrder
  }

  export type psr_data_tempMinOrderByAggregateInput = {
    psr_id?: SortOrder
    document_no?: SortOrder
    document_date?: SortOrder
    subbrandform?: SortOrder
    customer_name?: SortOrder
    customer_code?: SortOrder
    p_code?: SortOrder
    customer_type?: SortOrder
    category?: SortOrder
    brand?: SortOrder
    brandform?: SortOrder
    retailing?: SortOrder
  }

  export type psr_data_tempSumOrderByAggregateInput = {
    psr_id?: SortOrder
    p_code?: SortOrder
    retailing?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
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
    search?: string
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
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

  export type DecimalWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[]
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[]
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalWithAggregatesFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedDecimalFilter<$PrismaModel>
    _sum?: NestedDecimalFilter<$PrismaModel>
    _min?: NestedDecimalFilter<$PrismaModel>
    _max?: NestedDecimalFilter<$PrismaModel>
  }

  export type psr_data_historicalOrderByRelevanceInput = {
    fields: psr_data_historicalOrderByRelevanceFieldEnum | psr_data_historicalOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type psr_data_historicalCountOrderByAggregateInput = {
    psr_id?: SortOrder
    document_no?: SortOrder
    document_date?: SortOrder
    subbrandform?: SortOrder
    customer_name?: SortOrder
    customer_code?: SortOrder
    p_code?: SortOrder
    customer_type?: SortOrder
    category?: SortOrder
    brand?: SortOrder
    brandform?: SortOrder
    retailing?: SortOrder
  }

  export type psr_data_historicalAvgOrderByAggregateInput = {
    psr_id?: SortOrder
    p_code?: SortOrder
    retailing?: SortOrder
  }

  export type psr_data_historicalMaxOrderByAggregateInput = {
    psr_id?: SortOrder
    document_no?: SortOrder
    document_date?: SortOrder
    subbrandform?: SortOrder
    customer_name?: SortOrder
    customer_code?: SortOrder
    p_code?: SortOrder
    customer_type?: SortOrder
    category?: SortOrder
    brand?: SortOrder
    brandform?: SortOrder
    retailing?: SortOrder
  }

  export type psr_data_historicalMinOrderByAggregateInput = {
    psr_id?: SortOrder
    document_no?: SortOrder
    document_date?: SortOrder
    subbrandform?: SortOrder
    customer_name?: SortOrder
    customer_code?: SortOrder
    p_code?: SortOrder
    customer_type?: SortOrder
    category?: SortOrder
    brand?: SortOrder
    brandform?: SortOrder
    retailing?: SortOrder
  }

  export type psr_data_historicalSumOrderByAggregateInput = {
    psr_id?: SortOrder
    p_code?: SortOrder
    retailing?: SortOrder
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
    search?: string
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type psr_finalized_tempOrderByRelevanceInput = {
    fields: psr_finalized_tempOrderByRelevanceFieldEnum | psr_finalized_tempOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type psr_finalized_tempCountOrderByAggregateInput = {
    id?: SortOrder
    document_date?: SortOrder
    customer_code?: SortOrder
    branch?: SortOrder
    ZM?: SortOrder
    RSM?: SortOrder
    ASM?: SortOrder
    TSI?: SortOrder
    category?: SortOrder
    brand?: SortOrder
    brandform?: SortOrder
    subbrandform?: SortOrder
    base_channel?: SortOrder
    short_channel?: SortOrder
    channel_desc?: SortOrder
    retailing?: SortOrder
  }

  export type psr_finalized_tempAvgOrderByAggregateInput = {
    id?: SortOrder
    retailing?: SortOrder
  }

  export type psr_finalized_tempMaxOrderByAggregateInput = {
    id?: SortOrder
    document_date?: SortOrder
    customer_code?: SortOrder
    branch?: SortOrder
    ZM?: SortOrder
    RSM?: SortOrder
    ASM?: SortOrder
    TSI?: SortOrder
    category?: SortOrder
    brand?: SortOrder
    brandform?: SortOrder
    subbrandform?: SortOrder
    base_channel?: SortOrder
    short_channel?: SortOrder
    channel_desc?: SortOrder
    retailing?: SortOrder
  }

  export type psr_finalized_tempMinOrderByAggregateInput = {
    id?: SortOrder
    document_date?: SortOrder
    customer_code?: SortOrder
    branch?: SortOrder
    ZM?: SortOrder
    RSM?: SortOrder
    ASM?: SortOrder
    TSI?: SortOrder
    category?: SortOrder
    brand?: SortOrder
    brandform?: SortOrder
    subbrandform?: SortOrder
    base_channel?: SortOrder
    short_channel?: SortOrder
    channel_desc?: SortOrder
    retailing?: SortOrder
  }

  export type psr_finalized_tempSumOrderByAggregateInput = {
    id?: SortOrder
    retailing?: SortOrder
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
    search?: string
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type psr_data_finalizedOrderByRelevanceInput = {
    fields: psr_data_finalizedOrderByRelevanceFieldEnum | psr_data_finalizedOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type psr_data_finalizedCountOrderByAggregateInput = {
    id?: SortOrder
    document_date?: SortOrder
    customer_code?: SortOrder
    branch?: SortOrder
    ZM?: SortOrder
    RSM?: SortOrder
    ASM?: SortOrder
    TSI?: SortOrder
    category?: SortOrder
    brand?: SortOrder
    brandform?: SortOrder
    subbrandform?: SortOrder
    base_channel?: SortOrder
    short_channel?: SortOrder
    channel_desc?: SortOrder
    retailing?: SortOrder
  }

  export type psr_data_finalizedAvgOrderByAggregateInput = {
    id?: SortOrder
    retailing?: SortOrder
  }

  export type psr_data_finalizedMaxOrderByAggregateInput = {
    id?: SortOrder
    document_date?: SortOrder
    customer_code?: SortOrder
    branch?: SortOrder
    ZM?: SortOrder
    RSM?: SortOrder
    ASM?: SortOrder
    TSI?: SortOrder
    category?: SortOrder
    brand?: SortOrder
    brandform?: SortOrder
    subbrandform?: SortOrder
    base_channel?: SortOrder
    short_channel?: SortOrder
    channel_desc?: SortOrder
    retailing?: SortOrder
  }

  export type psr_data_finalizedMinOrderByAggregateInput = {
    id?: SortOrder
    document_date?: SortOrder
    customer_code?: SortOrder
    branch?: SortOrder
    ZM?: SortOrder
    RSM?: SortOrder
    ASM?: SortOrder
    TSI?: SortOrder
    category?: SortOrder
    brand?: SortOrder
    brandform?: SortOrder
    subbrandform?: SortOrder
    base_channel?: SortOrder
    short_channel?: SortOrder
    channel_desc?: SortOrder
    retailing?: SortOrder
  }

  export type psr_data_finalizedSumOrderByAggregateInput = {
    id?: SortOrder
    retailing?: SortOrder
  }

  export type channel_mappingOrderByRelevanceInput = {
    fields: channel_mappingOrderByRelevanceFieldEnum | channel_mappingOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type channel_mappingCountOrderByAggregateInput = {
    channel_id?: SortOrder
    customer_type?: SortOrder
    base_channel?: SortOrder
    short_channel?: SortOrder
    channel_desc?: SortOrder
    created_at?: SortOrder
  }

  export type channel_mappingAvgOrderByAggregateInput = {
    channel_id?: SortOrder
  }

  export type channel_mappingMaxOrderByAggregateInput = {
    channel_id?: SortOrder
    customer_type?: SortOrder
    base_channel?: SortOrder
    short_channel?: SortOrder
    channel_desc?: SortOrder
    created_at?: SortOrder
  }

  export type channel_mappingMinOrderByAggregateInput = {
    channel_id?: SortOrder
    customer_type?: SortOrder
    base_channel?: SortOrder
    short_channel?: SortOrder
    channel_desc?: SortOrder
    created_at?: SortOrder
  }

  export type channel_mappingSumOrderByAggregateInput = {
    channel_id?: SortOrder
  }

  export type store_mappingOrderByRelevanceInput = {
    fields: store_mappingOrderByRelevanceFieldEnum | store_mappingOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type store_mappingCountOrderByAggregateInput = {
    Id?: SortOrder
    Old_Store_Code?: SortOrder
    New_Store_Code?: SortOrder
    customer_name?: SortOrder
    customer_type?: SortOrder
    Branch?: SortOrder
    DSE_Code?: SortOrder
    ZM?: SortOrder
    RSM?: SortOrder
    ASM?: SortOrder
    TSI?: SortOrder
    created_at?: SortOrder
  }

  export type store_mappingAvgOrderByAggregateInput = {
    Id?: SortOrder
  }

  export type store_mappingMaxOrderByAggregateInput = {
    Id?: SortOrder
    Old_Store_Code?: SortOrder
    New_Store_Code?: SortOrder
    customer_name?: SortOrder
    customer_type?: SortOrder
    Branch?: SortOrder
    DSE_Code?: SortOrder
    ZM?: SortOrder
    RSM?: SortOrder
    ASM?: SortOrder
    TSI?: SortOrder
    created_at?: SortOrder
  }

  export type store_mappingMinOrderByAggregateInput = {
    Id?: SortOrder
    Old_Store_Code?: SortOrder
    New_Store_Code?: SortOrder
    customer_name?: SortOrder
    customer_type?: SortOrder
    Branch?: SortOrder
    DSE_Code?: SortOrder
    ZM?: SortOrder
    RSM?: SortOrder
    ASM?: SortOrder
    TSI?: SortOrder
    created_at?: SortOrder
  }

  export type store_mappingSumOrderByAggregateInput = {
    Id?: SortOrder
  }

  export type product_mappingOrderByRelevanceInput = {
    fields: product_mappingOrderByRelevanceFieldEnum | product_mappingOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type product_mappingCountOrderByAggregateInput = {
    Id?: SortOrder
    p_code?: SortOrder
    desc_short?: SortOrder
    category?: SortOrder
    brand?: SortOrder
    brandform?: SortOrder
    subbrandform?: SortOrder
    created_at?: SortOrder
  }

  export type product_mappingAvgOrderByAggregateInput = {
    Id?: SortOrder
    p_code?: SortOrder
  }

  export type product_mappingMaxOrderByAggregateInput = {
    Id?: SortOrder
    p_code?: SortOrder
    desc_short?: SortOrder
    category?: SortOrder
    brand?: SortOrder
    brandform?: SortOrder
    subbrandform?: SortOrder
    created_at?: SortOrder
  }

  export type product_mappingMinOrderByAggregateInput = {
    Id?: SortOrder
    p_code?: SortOrder
    desc_short?: SortOrder
    category?: SortOrder
    brand?: SortOrder
    brandform?: SortOrder
    subbrandform?: SortOrder
    created_at?: SortOrder
  }

  export type product_mappingSumOrderByAggregateInput = {
    Id?: SortOrder
    p_code?: SortOrder
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type mapping_change_flagCountOrderByAggregateInput = {
    id?: SortOrder
    changed_at?: SortOrder
    processed?: SortOrder
  }

  export type mapping_change_flagAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type mapping_change_flagMaxOrderByAggregateInput = {
    id?: SortOrder
    changed_at?: SortOrder
    processed?: SortOrder
  }

  export type mapping_change_flagMinOrderByAggregateInput = {
    id?: SortOrder
    changed_at?: SortOrder
    processed?: SortOrder
  }

  export type mapping_change_flagSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
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

  export type PermissionSetListRelationFilter = {
    every?: PermissionSetWhereInput
    some?: PermissionSetWhereInput
    none?: PermissionSetWhereInput
  }

  export type PermissionSetOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserOrderByRelevanceInput = {
    fields: UserOrderByRelevanceFieldEnum | UserOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    hash?: SortOrder
    salt?: SortOrder
    role?: SortOrder
    isActive?: SortOrder
    lastLogin?: SortOrder
    image?: SortOrder
    resetPasswordOTP?: SortOrder
    verificationOTP?: SortOrder
    verificationOTPExpires?: SortOrder
    resetPasswordExpires?: SortOrder
    otpAttempts?: SortOrder
    lastOTPAttemptAt?: SortOrder
    otpCooldownUntil?: SortOrder
  }

  export type UserAvgOrderByAggregateInput = {
    id?: SortOrder
    resetPasswordOTP?: SortOrder
    verificationOTP?: SortOrder
    otpAttempts?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    hash?: SortOrder
    salt?: SortOrder
    role?: SortOrder
    isActive?: SortOrder
    lastLogin?: SortOrder
    image?: SortOrder
    resetPasswordOTP?: SortOrder
    verificationOTP?: SortOrder
    verificationOTPExpires?: SortOrder
    resetPasswordExpires?: SortOrder
    otpAttempts?: SortOrder
    lastOTPAttemptAt?: SortOrder
    otpCooldownUntil?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    hash?: SortOrder
    salt?: SortOrder
    role?: SortOrder
    isActive?: SortOrder
    lastLogin?: SortOrder
    image?: SortOrder
    resetPasswordOTP?: SortOrder
    verificationOTP?: SortOrder
    verificationOTPExpires?: SortOrder
    resetPasswordExpires?: SortOrder
    otpAttempts?: SortOrder
    lastOTPAttemptAt?: SortOrder
    otpCooldownUntil?: SortOrder
  }

  export type UserSumOrderByAggregateInput = {
    id?: SortOrder
    resetPasswordOTP?: SortOrder
    verificationOTP?: SortOrder
    otpAttempts?: SortOrder
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
  export type JsonFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonFilterBase<$PrismaModel>>, 'path'>>

  export type JsonFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue
    lte?: InputJsonValue
    gt?: InputJsonValue
    gte?: InputJsonValue
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type UserScalarRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type PermissionSetOrderByRelevanceInput = {
    fields: PermissionSetOrderByRelevanceFieldEnum | PermissionSetOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type PermissionSetUserIdPageCompoundUniqueInput = {
    userId: number
    page: string
  }

  export type PermissionSetCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    page?: SortOrder
    permissions?: SortOrder
  }

  export type PermissionSetAvgOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
  }

  export type PermissionSetMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    page?: SortOrder
  }

  export type PermissionSetMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    page?: SortOrder
  }

  export type PermissionSetSumOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
  }
  export type JsonWithAggregatesFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonWithAggregatesFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonWithAggregatesFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonWithAggregatesFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonWithAggregatesFilterBase<$PrismaModel>>, 'path'>>

  export type JsonWithAggregatesFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue
    lte?: InputJsonValue
    gt?: InputJsonValue
    gte?: InputJsonValue
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedJsonFilter<$PrismaModel>
    _max?: NestedJsonFilter<$PrismaModel>
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type DecimalFieldUpdateOperationsInput = {
    set?: Decimal | DecimalJsLike | number | string
    increment?: Decimal | DecimalJsLike | number | string
    decrement?: Decimal | DecimalJsLike | number | string
    multiply?: Decimal | DecimalJsLike | number | string
    divide?: Decimal | DecimalJsLike | number | string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type PermissionSetCreateNestedManyWithoutUserInput = {
    create?: XOR<PermissionSetCreateWithoutUserInput, PermissionSetUncheckedCreateWithoutUserInput> | PermissionSetCreateWithoutUserInput[] | PermissionSetUncheckedCreateWithoutUserInput[]
    connectOrCreate?: PermissionSetCreateOrConnectWithoutUserInput | PermissionSetCreateOrConnectWithoutUserInput[]
    createMany?: PermissionSetCreateManyUserInputEnvelope
    connect?: PermissionSetWhereUniqueInput | PermissionSetWhereUniqueInput[]
  }

  export type PermissionSetUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<PermissionSetCreateWithoutUserInput, PermissionSetUncheckedCreateWithoutUserInput> | PermissionSetCreateWithoutUserInput[] | PermissionSetUncheckedCreateWithoutUserInput[]
    connectOrCreate?: PermissionSetCreateOrConnectWithoutUserInput | PermissionSetCreateOrConnectWithoutUserInput[]
    createMany?: PermissionSetCreateManyUserInputEnvelope
    connect?: PermissionSetWhereUniqueInput | PermissionSetWhereUniqueInput[]
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

  export type PermissionSetUpdateManyWithoutUserNestedInput = {
    create?: XOR<PermissionSetCreateWithoutUserInput, PermissionSetUncheckedCreateWithoutUserInput> | PermissionSetCreateWithoutUserInput[] | PermissionSetUncheckedCreateWithoutUserInput[]
    connectOrCreate?: PermissionSetCreateOrConnectWithoutUserInput | PermissionSetCreateOrConnectWithoutUserInput[]
    upsert?: PermissionSetUpsertWithWhereUniqueWithoutUserInput | PermissionSetUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: PermissionSetCreateManyUserInputEnvelope
    set?: PermissionSetWhereUniqueInput | PermissionSetWhereUniqueInput[]
    disconnect?: PermissionSetWhereUniqueInput | PermissionSetWhereUniqueInput[]
    delete?: PermissionSetWhereUniqueInput | PermissionSetWhereUniqueInput[]
    connect?: PermissionSetWhereUniqueInput | PermissionSetWhereUniqueInput[]
    update?: PermissionSetUpdateWithWhereUniqueWithoutUserInput | PermissionSetUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: PermissionSetUpdateManyWithWhereWithoutUserInput | PermissionSetUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: PermissionSetScalarWhereInput | PermissionSetScalarWhereInput[]
  }

  export type PermissionSetUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<PermissionSetCreateWithoutUserInput, PermissionSetUncheckedCreateWithoutUserInput> | PermissionSetCreateWithoutUserInput[] | PermissionSetUncheckedCreateWithoutUserInput[]
    connectOrCreate?: PermissionSetCreateOrConnectWithoutUserInput | PermissionSetCreateOrConnectWithoutUserInput[]
    upsert?: PermissionSetUpsertWithWhereUniqueWithoutUserInput | PermissionSetUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: PermissionSetCreateManyUserInputEnvelope
    set?: PermissionSetWhereUniqueInput | PermissionSetWhereUniqueInput[]
    disconnect?: PermissionSetWhereUniqueInput | PermissionSetWhereUniqueInput[]
    delete?: PermissionSetWhereUniqueInput | PermissionSetWhereUniqueInput[]
    connect?: PermissionSetWhereUniqueInput | PermissionSetWhereUniqueInput[]
    update?: PermissionSetUpdateWithWhereUniqueWithoutUserInput | PermissionSetUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: PermissionSetUpdateManyWithWhereWithoutUserInput | PermissionSetUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: PermissionSetScalarWhereInput | PermissionSetScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutPermissionSetsInput = {
    create?: XOR<UserCreateWithoutPermissionSetsInput, UserUncheckedCreateWithoutPermissionSetsInput>
    connectOrCreate?: UserCreateOrConnectWithoutPermissionSetsInput
    connect?: UserWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutPermissionSetsNestedInput = {
    create?: XOR<UserCreateWithoutPermissionSetsInput, UserUncheckedCreateWithoutPermissionSetsInput>
    connectOrCreate?: UserCreateOrConnectWithoutPermissionSetsInput
    upsert?: UserUpsertWithoutPermissionSetsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutPermissionSetsInput, UserUpdateWithoutPermissionSetsInput>, UserUncheckedUpdateWithoutPermissionSetsInput>
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
    search?: string
    not?: NestedStringFilter<$PrismaModel> | string
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

  export type NestedDecimalFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[]
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[]
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
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
    search?: string
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
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

  export type NestedDecimalWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[]
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[]
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalWithAggregatesFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedDecimalFilter<$PrismaModel>
    _sum?: NestedDecimalFilter<$PrismaModel>
    _min?: NestedDecimalFilter<$PrismaModel>
    _max?: NestedDecimalFilter<$PrismaModel>
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
    search?: string
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
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
    search?: string
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

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
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
  export type NestedJsonFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<NestedJsonFilterBase<$PrismaModel>>, Exclude<keyof Required<NestedJsonFilterBase<$PrismaModel>>, 'path'>>,
        Required<NestedJsonFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<NestedJsonFilterBase<$PrismaModel>>, 'path'>>

  export type NestedJsonFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue
    lte?: InputJsonValue
    gt?: InputJsonValue
    gte?: InputJsonValue
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type PermissionSetCreateWithoutUserInput = {
    page: string
    permissions: JsonNullValueInput | InputJsonValue
  }

  export type PermissionSetUncheckedCreateWithoutUserInput = {
    id?: number
    page: string
    permissions: JsonNullValueInput | InputJsonValue
  }

  export type PermissionSetCreateOrConnectWithoutUserInput = {
    where: PermissionSetWhereUniqueInput
    create: XOR<PermissionSetCreateWithoutUserInput, PermissionSetUncheckedCreateWithoutUserInput>
  }

  export type PermissionSetCreateManyUserInputEnvelope = {
    data: PermissionSetCreateManyUserInput | PermissionSetCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type PermissionSetUpsertWithWhereUniqueWithoutUserInput = {
    where: PermissionSetWhereUniqueInput
    update: XOR<PermissionSetUpdateWithoutUserInput, PermissionSetUncheckedUpdateWithoutUserInput>
    create: XOR<PermissionSetCreateWithoutUserInput, PermissionSetUncheckedCreateWithoutUserInput>
  }

  export type PermissionSetUpdateWithWhereUniqueWithoutUserInput = {
    where: PermissionSetWhereUniqueInput
    data: XOR<PermissionSetUpdateWithoutUserInput, PermissionSetUncheckedUpdateWithoutUserInput>
  }

  export type PermissionSetUpdateManyWithWhereWithoutUserInput = {
    where: PermissionSetScalarWhereInput
    data: XOR<PermissionSetUpdateManyMutationInput, PermissionSetUncheckedUpdateManyWithoutUserInput>
  }

  export type PermissionSetScalarWhereInput = {
    AND?: PermissionSetScalarWhereInput | PermissionSetScalarWhereInput[]
    OR?: PermissionSetScalarWhereInput[]
    NOT?: PermissionSetScalarWhereInput | PermissionSetScalarWhereInput[]
    id?: IntFilter<"PermissionSet"> | number
    userId?: IntFilter<"PermissionSet"> | number
    page?: StringFilter<"PermissionSet"> | string
    permissions?: JsonFilter<"PermissionSet">
  }

  export type UserCreateWithoutPermissionSetsInput = {
    name: string
    email: string
    hash?: string | null
    salt?: string | null
    role?: string
    isActive?: boolean
    lastLogin?: Date | string
    image?: string
    resetPasswordOTP?: number | null
    verificationOTP?: number | null
    verificationOTPExpires?: Date | string | null
    resetPasswordExpires?: Date | string | null
    otpAttempts?: number | null
    lastOTPAttemptAt?: Date | string | null
    otpCooldownUntil?: Date | string | null
  }

  export type UserUncheckedCreateWithoutPermissionSetsInput = {
    id?: number
    name: string
    email: string
    hash?: string | null
    salt?: string | null
    role?: string
    isActive?: boolean
    lastLogin?: Date | string
    image?: string
    resetPasswordOTP?: number | null
    verificationOTP?: number | null
    verificationOTPExpires?: Date | string | null
    resetPasswordExpires?: Date | string | null
    otpAttempts?: number | null
    lastOTPAttemptAt?: Date | string | null
    otpCooldownUntil?: Date | string | null
  }

  export type UserCreateOrConnectWithoutPermissionSetsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutPermissionSetsInput, UserUncheckedCreateWithoutPermissionSetsInput>
  }

  export type UserUpsertWithoutPermissionSetsInput = {
    update: XOR<UserUpdateWithoutPermissionSetsInput, UserUncheckedUpdateWithoutPermissionSetsInput>
    create: XOR<UserCreateWithoutPermissionSetsInput, UserUncheckedCreateWithoutPermissionSetsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutPermissionSetsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutPermissionSetsInput, UserUncheckedUpdateWithoutPermissionSetsInput>
  }

  export type UserUpdateWithoutPermissionSetsInput = {
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    hash?: NullableStringFieldUpdateOperationsInput | string | null
    salt?: NullableStringFieldUpdateOperationsInput | string | null
    role?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    lastLogin?: DateTimeFieldUpdateOperationsInput | Date | string
    image?: StringFieldUpdateOperationsInput | string
    resetPasswordOTP?: NullableIntFieldUpdateOperationsInput | number | null
    verificationOTP?: NullableIntFieldUpdateOperationsInput | number | null
    verificationOTPExpires?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    resetPasswordExpires?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    otpAttempts?: NullableIntFieldUpdateOperationsInput | number | null
    lastOTPAttemptAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    otpCooldownUntil?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type UserUncheckedUpdateWithoutPermissionSetsInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    hash?: NullableStringFieldUpdateOperationsInput | string | null
    salt?: NullableStringFieldUpdateOperationsInput | string | null
    role?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    lastLogin?: DateTimeFieldUpdateOperationsInput | Date | string
    image?: StringFieldUpdateOperationsInput | string
    resetPasswordOTP?: NullableIntFieldUpdateOperationsInput | number | null
    verificationOTP?: NullableIntFieldUpdateOperationsInput | number | null
    verificationOTPExpires?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    resetPasswordExpires?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    otpAttempts?: NullableIntFieldUpdateOperationsInput | number | null
    lastOTPAttemptAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    otpCooldownUntil?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type PermissionSetCreateManyUserInput = {
    id?: number
    page: string
    permissions: JsonNullValueInput | InputJsonValue
  }

  export type PermissionSetUpdateWithoutUserInput = {
    page?: StringFieldUpdateOperationsInput | string
    permissions?: JsonNullValueInput | InputJsonValue
  }

  export type PermissionSetUncheckedUpdateWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    page?: StringFieldUpdateOperationsInput | string
    permissions?: JsonNullValueInput | InputJsonValue
  }

  export type PermissionSetUncheckedUpdateManyWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    page?: StringFieldUpdateOperationsInput | string
    permissions?: JsonNullValueInput | InputJsonValue
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