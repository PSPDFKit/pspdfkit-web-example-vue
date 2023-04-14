declare const SignatureSaveMode: {
    readonly ALWAYS: "ALWAYS";
    readonly NEVER: "NEVER";
    readonly USING_UI: "USING_UI";
};
type ISignatureSaveMode = (typeof SignatureSaveMode)[keyof typeof SignatureSaveMode];

type IFunction<T = void> = (...args: Array<any>) => T;
type IObject = Record<string, any>;
type Without<T, U> = {
    [P in Exclude<keyof T, keyof U>]?: never;
};
type XOR<T, U> = T | U extends object ? (Without<T, U> & U) | (Without<U, T> & T) : T | U;
type Class<T> = new (...args: Array<any>) => T;

type ToolItemType = 'custom';
type ToolItem = {
    type: ToolItemType;
    node?: Node;
    id?: string;
    title?: string;
    className?: string;
    icon?: string;
    onPress?: IFunction;
    selected?: boolean;
    disabled?: boolean;
};

type BuiltInDocumentEditorToolbarItem = 'add' | 'remove' | 'duplicate' | 'rotate-left' | 'rotate-right' | 'move' | 'move-left' | 'move-right' | 'import-document' | 'spacer' | 'undo' | 'redo' | 'select-all' | 'select-none';
type DocumentEditorToolbarItem = Omit<ToolItem, 'type'> & {
    type: BuiltInDocumentEditorToolbarItem | 'custom';
};

type BuiltInDocumentEditorFooterItem = 'cancel' | 'spacer' | 'save-as' | 'save' | 'selected-pages' | 'loading-indicator';
type DocumentEditorFooterItem = {
    type: BuiltInDocumentEditorFooterItem | 'custom';
    node?: Node;
    className?: string;
    id?: string;
    onPress?: (e: MouseEvent, id?: string) => void;
};

/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * Immutable data encourages pure functions (data-in, data-out) and lends itself
 * to much simpler application development and enabling techniques from
 * functional programming such as lazy evaluation.
 *
 * While designed to bring these powerful functional concepts to JavaScript, it
 * presents an Object-Oriented API familiar to Javascript engineers and closely
 * mirroring that of Array, Map, and Set. It is easy and efficient to convert to
 * and from plain Javascript types.
 *
 * ## How to read these docs
 *
 * In order to better explain what kinds of values the Immutable.js API expects
 * and produces, this documentation is presented in a statically typed dialect of
 * JavaScript (like [Flow][] or [TypeScript][]). You *don't need* to use these
 * type checking tools in order to use Immutable.js, however becoming familiar
 * with their syntax will help you get a deeper understanding of this API.
 *
 * **A few examples and how to read them.**
 *
 * All methods describe the kinds of data they accept and the kinds of data
 * they return. For example a function which accepts two numbers and returns
 * a number would look like this:
 *
 * ```js
 * sum(first: number, second: number): number
 * ```
 *
 * Sometimes, methods can accept different kinds of data or return different
 * kinds of data, and this is described with a *type variable*, which is
 * typically in all-caps. For example, a function which always returns the same
 * kind of data it was provided would look like this:
 *
 * ```js
 * identity<T>(value: T): T
 * ```
 *
 * Type variables are defined with classes and referred to in methods. For
 * example, a class that holds onto a value for you might look like this:
 *
 * ```js
 * class Box<T> {
 *   constructor(value: T)
 *   getValue(): T
 * }
 * ```
 *
 * In order to manipulate Immutable data, methods that we're used to affecting
 * a Collection instead return a new Collection of the same type. The type
 * `this` refers to the same kind of class. For example, a List which returns
 * new Lists when you `push` a value onto it might look like:
 *
 * ```js
 * class List<T> {
 *   push(value: T): this
 * }
 * ```
 *
 * Many methods in Immutable.js accept values which implement the JavaScript
 * [Iterable][] protocol, and might appear like `Iterable<string>` for something
 * which represents sequence of strings. Typically in JavaScript we use plain
 * Arrays (`[]`) when an Iterable is expected, but also all of the Immutable.js
 * collections are iterable themselves!
 *
 * For example, to get a value deep within a structure of data, we might use
 * `getIn` which expects an `Iterable` path:
 *
 * ```
 * getIn(path: Iterable<string | number>): any
 * ```
 *
 * To use this method, we could pass an array: `data.getIn([ "key", 2 ])`.
 *
 *
 * Note: All examples are presented in the modern [ES2015][] version of
 * JavaScript. Use tools like Babel to support older browsers.
 *
 * For example:
 *
 * ```js
 * // ES2015
 * const mappedFoo = foo.map(x => x * x);
 * // ES5
 * var mappedFoo = foo.map(function (x) { return x * x; });
 * ```
 *
 * [ES2015]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/New_in_JavaScript/ECMAScript_6_support_in_Mozilla
 * [TypeScript]: http://www.typescriptlang.org/
 * [Flow]: https://flowtype.org/
 * [Iterable]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols
 */



  /**
   * Lists are ordered indexed dense collections, much like a JavaScript
   * Array.
   *
   * Lists are immutable and fully persistent with O(log32 N) gets and sets,
   * and O(1) push and pop.
   *
   * Lists implement Deque, with efficient addition and removal from both the
   * end (`push`, `pop`) and beginning (`unshift`, `shift`).
   *
   * Unlike a JavaScript Array, there is no distinction between an
   * "unset" index and an index set to `undefined`. `List#forEach` visits all
   * indices from 0 to size, regardless of whether they were explicitly defined.
   */
  declare module List {

    /**
     * True if the provided value is a List
     *
     * <!-- runkit:activate -->
     * ```js
     * const { List } = require('immutable');
     * List.isList([]); // false
     * List.isList(List()); // true
     * ```
     */
    function isList(maybeList: any): maybeList is List<any>;

    /**
     * Creates a new List containing `values`.
     *
     * <!-- runkit:activate -->
     * ```js
     * const { List } = require('immutable');
     * List.of(1, 2, 3, 4)
     * // List [ 1, 2, 3, 4 ]
     * ```
     *
     * Note: Values are not altered or converted in any way.
     *
     * <!-- runkit:activate -->
     * ```js
     * const { List } = require('immutable');
     * List.of({x:1}, 2, [3], 4)
     * // List [ { x: 1 }, 2, [ 3 ], 4 ]
     * ```
     */
    function of<T>(...values: Array<T>): List<T>;
  }

  /**
   * Create a new immutable List containing the values of the provided
   * collection-like.
   *
   * Note: `List` is a factory function and not a class, and does not use the
   * `new` keyword during construction.
   *
   * <!-- runkit:activate -->
   * ```js
   * const { List, Set } = require('immutable')
   *
   * const emptyList = List()
   * // List []
   *
   * const plainArray = [ 1, 2, 3, 4 ]
   * const listFromPlainArray = List(plainArray)
   * // List [ 1, 2, 3, 4 ]
   *
   * const plainSet = Set([ 1, 2, 3, 4 ])
   * const listFromPlainSet = List(plainSet)
   * // List [ 1, 2, 3, 4 ]
   *
   * const arrayIterator = plainArray[Symbol.iterator]()
   * const listFromCollectionArray = List(arrayIterator)
   * // List [ 1, 2, 3, 4 ]
   *
   * listFromPlainArray.equals(listFromCollectionArray) // true
   * listFromPlainSet.equals(listFromCollectionArray) // true
   * listFromPlainSet.equals(listFromPlainArray) // true
   * ```
   */
  declare function List(): List<any>;
  declare function List<T>(): List<T>;
  declare function List<T>(collection: Iterable<T>): List<T>;

  interface List<T> extends Collection.Indexed<T> {

    /**
     * The number of items in this List.
     */
    readonly size: number;

    // Persistent changes

    /**
     * Returns a new List which includes `value` at `index`. If `index` already
     * exists in this List, it will be replaced.
     *
     * `index` may be a negative number, which indexes back from the end of the
     * List. `v.set(-1, "value")` sets the last item in the List.
     *
     * If `index` larger than `size`, the returned List's `size` will be large
     * enough to include the `index`.
     *
     * <!-- runkit:activate
     *      { "preamble": "const { List } = require('immutable');" }
     * -->
     * ```js
     * const originalList = List([ 0 ]);
     * // List [ 0 ]
     * originalList.set(1, 1);
     * // List [ 0, 1 ]
     * originalList.set(0, 'overwritten');
     * // List [ "overwritten" ]
     * originalList.set(2, 2);
     * // List [ 0, undefined, 2 ]
     *
     * List().set(50000, 'value').size;
     * // 50001
     * ```
     *
     * Note: `set` can be used in `withMutations`.
     */
    set(index: number, value: T): List<T>;

    /**
     * Returns a new List which excludes this `index` and with a size 1 less
     * than this List. Values at indices above `index` are shifted down by 1 to
     * fill the position.
     *
     * This is synonymous with `list.splice(index, 1)`.
     *
     * `index` may be a negative number, which indexes back from the end of the
     * List. `v.delete(-1)` deletes the last item in the List.
     *
     * Note: `delete` cannot be safely used in IE8
     *
     * <!-- runkit:activate
     *      { "preamble": "const { List } = require('immutable');" }
     * -->
     * ```js
     * List([ 0, 1, 2, 3, 4 ]).delete(0);
     * // List [ 1, 2, 3, 4 ]
     * ```
     *
     * Since `delete()` re-indexes values, it produces a complete copy, which
     * has `O(N)` complexity.
     *
     * Note: `delete` *cannot* be used in `withMutations`.
     *
     * @alias remove
     */
    delete(index: number): List<T>;
    remove(index: number): List<T>;

    /**
     * Returns a new List with `value` at `index` with a size 1 more than this
     * List. Values at indices above `index` are shifted over by 1.
     *
     * This is synonymous with `list.splice(index, 0, value)`.
     *
     * <!-- runkit:activate
     *      { "preamble": "const { List } = require('immutable');" }
     * -->
     * ```js
     * List([ 0, 1, 2, 3, 4 ]).insert(6, 5)
     * // List [ 0, 1, 2, 3, 4, 5 ]
     * ```
     *
     * Since `insert()` re-indexes values, it produces a complete copy, which
     * has `O(N)` complexity.
     *
     * Note: `insert` *cannot* be used in `withMutations`.
     */
    insert(index: number, value: T): List<T>;

    /**
     * Returns a new List with 0 size and no values in constant time.
     *
     * <!-- runkit:activate
     *      { "preamble": "const { List } = require('immutable');" }
     * -->
     * ```js
     * List([ 1, 2, 3, 4 ]).clear()
     * // List []
     * ```
     *
     * Note: `clear` can be used in `withMutations`.
     */
    clear(): List<T>;

    /**
     * Returns a new List with the provided `values` appended, starting at this
     * List's `size`.
     *
     * <!-- runkit:activate
     *      { "preamble": "const { List } = require('immutable');" }
     * -->
     * ```js
     * List([ 1, 2, 3, 4 ]).push(5)
     * // List [ 1, 2, 3, 4, 5 ]
     * ```
     *
     * Note: `push` can be used in `withMutations`.
     */
    push(...values: Array<T>): List<T>;

    /**
     * Returns a new List with a size ones less than this List, excluding
     * the last index in this List.
     *
     * Note: this differs from `Array#pop` because it returns a new
     * List rather than the removed value. Use `last()` to get the last value
     * in this List.
     *
     * ```js
     * List([ 1, 2, 3, 4 ]).pop()
     * // List[ 1, 2, 3 ]
     * ```
     *
     * Note: `pop` can be used in `withMutations`.
     */
    pop(): List<T>;

    /**
     * Returns a new List with the provided `values` prepended, shifting other
     * values ahead to higher indices.
     *
     * <!-- runkit:activate
     *      { "preamble": "const { List } = require('immutable');" }
     * -->
     * ```js
     * List([ 2, 3, 4]).unshift(1);
     * // List [ 1, 2, 3, 4 ]
     * ```
     *
     * Note: `unshift` can be used in `withMutations`.
     */
    unshift(...values: Array<T>): List<T>;

    /**
     * Returns a new List with a size ones less than this List, excluding
     * the first index in this List, shifting all other values to a lower index.
     *
     * Note: this differs from `Array#shift` because it returns a new
     * List rather than the removed value. Use `first()` to get the first
     * value in this List.
     *
     * <!-- runkit:activate
     *      { "preamble": "const { List } = require('immutable');" }
     * -->
     * ```js
     * List([ 0, 1, 2, 3, 4 ]).shift();
     * // List [ 1, 2, 3, 4 ]
     * ```
     *
     * Note: `shift` can be used in `withMutations`.
     */
    shift(): List<T>;

    /**
     * Returns a new List with an updated value at `index` with the return
     * value of calling `updater` with the existing value, or `notSetValue` if
     * `index` was not set. If called with a single argument, `updater` is
     * called with the List itself.
     *
     * `index` may be a negative number, which indexes back from the end of the
     * List. `v.update(-1)` updates the last item in the List.
     *
     * <!-- runkit:activate
     *      { "preamble": "const { List } = require('immutable');" }
     * -->
     * ```js
     * const list = List([ 'a', 'b', 'c' ])
     * const result = list.update(2, val => val.toUpperCase())
     * // List [ "a", "b", "C" ]
     * ```
     *
     * This can be very useful as a way to "chain" a normal function into a
     * sequence of methods. RxJS calls this "let" and lodash calls it "thru".
     *
     * For example, to sum a List after mapping and filtering:
     *
     * <!-- runkit:activate
     *      { "preamble": "const { List } = require('immutable');" }
     * -->
     * ```js
     * function sum(collection) {
     *   return collection.reduce((sum, x) => sum + x, 0)
     * }
     *
     * List([ 1, 2, 3 ])
     *   .map(x => x + 1)
     *   .filter(x => x % 2 === 0)
     *   .update(sum)
     * // 6
     * ```
     *
     * Note: `update(index)` can be used in `withMutations`.
     *
     * @see `Map#update`
     */
    update(index: number, notSetValue: T, updater: (value: T) => T): this;
    update(index: number, updater: (value: T) => T): this;
    update<R>(updater: (value: this) => R): R;

    /**
     * Returns a new List with size `size`. If `size` is less than this
     * List's size, the new List will exclude values at the higher indices.
     * If `size` is greater than this List's size, the new List will have
     * undefined values for the newly available indices.
     *
     * When building a new List and the final size is known up front, `setSize`
     * used in conjunction with `withMutations` may result in the more
     * performant construction.
     */
    setSize(size: number): List<T>;


    // Deep persistent changes

    /**
     * Returns a new List having set `value` at this `keyPath`. If any keys in
     * `keyPath` do not exist, a new immutable Map will be created at that key.
     *
     * Index numbers are used as keys to determine the path to follow in
     * the List.
     *
     * <!-- runkit:activate -->
     * ```js
     * const { List } = require('immutable')
     * const list = List([ 0, 1, 2, List([ 3, 4 ])])
     * list.setIn([3, 0], 999);
     * // List [ 0, 1, 2, List [ 999, 4 ] ]
     * ```
     *
     * Plain JavaScript Object or Arrays may be nested within an Immutable.js
     * Collection, and setIn() can update those values as well, treating them
     * immutably by creating new copies of those values with the changes applied.
     *
     * <!-- runkit:activate -->
     * ```js
     * const { List } = require('immutable')
     * const list = List([ 0, 1, 2, { plain: 'object' }])
     * list.setIn([3, 'plain'], 'value');
     * // List([ 0, 1, 2, { plain: 'value' }])
     * ```
     *
     * Note: `setIn` can be used in `withMutations`.
     */
    setIn(keyPath: Iterable<any>, value: any): this;

    /**
     * Returns a new List having removed the value at this `keyPath`. If any
     * keys in `keyPath` do not exist, no change will occur.
     *
     * <!-- runkit:activate -->
     * ```js
     * const { List } = require('immutable')
     * const list = List([ 0, 1, 2, List([ 3, 4 ])])
     * list.deleteIn([3, 0]);
     * // List [ 0, 1, 2, List [ 4 ] ]
     * ```
     *
     * Plain JavaScript Object or Arrays may be nested within an Immutable.js
     * Collection, and removeIn() can update those values as well, treating them
     * immutably by creating new copies of those values with the changes applied.
     *
     * <!-- runkit:activate -->
     * ```js
     * const { List } = require('immutable')
     * const list = List([ 0, 1, 2, { plain: 'object' }])
     * list.removeIn([3, 'plain']);
     * // List([ 0, 1, 2, {}])
     * ```
     *
     * Note: `deleteIn` *cannot* be safely used in `withMutations`.
     *
     * @alias removeIn
     */
    deleteIn(keyPath: Iterable<any>): this;
    removeIn(keyPath: Iterable<any>): this;

    /**
     * Note: `updateIn` can be used in `withMutations`.
     *
     * @see `Map#updateIn`
     */
    updateIn(keyPath: Iterable<any>, notSetValue: any, updater: (value: any) => any): this;
    updateIn(keyPath: Iterable<any>, updater: (value: any) => any): this;

    /**
     * Note: `mergeIn` can be used in `withMutations`.
     *
     * @see `Map#mergeIn`
     */
    mergeIn(keyPath: Iterable<any>, ...collections: Array<any>): this;

    /**
     * Note: `mergeDeepIn` can be used in `withMutations`.
     *
     * @see `Map#mergeDeepIn`
     */
    mergeDeepIn(keyPath: Iterable<any>, ...collections: Array<any>): this;

    // Transient changes

    /**
     * Note: Not all methods can be safely used on a mutable collection or within
     * `withMutations`! Check the documentation for each method to see if it
     * allows being used in `withMutations`.
     *
     * @see `Map#withMutations`
     */
    withMutations(mutator: (mutable: this) => any): this;

    /**
     * An alternative API for withMutations()
     *
     * Note: Not all methods can be safely used on a mutable collection or within
     * `withMutations`! Check the documentation for each method to see if it
     * allows being used in `withMutations`.
     *
     * @see `Map#asMutable`
     */
    asMutable(): this;

    /**
     * @see `Map#wasAltered`
     */
    wasAltered(): boolean;

    /**
     * @see `Map#asImmutable`
     */
    asImmutable(): this;

    // Sequence algorithms

    /**
     * Returns a new List with other values or collections concatenated to this one.
     *
     * Note: `concat` can be used in `withMutations`.
     *
     * @alias merge
     */
    concat<C>(...valuesOrCollections: Array<Iterable<C> | C>): List<T | C>;
    merge<C>(...collections: Array<Iterable<C>>): List<T | C>;

    /**
     * Returns a new List with values passed through a
     * `mapper` function.
     *
     * <!-- runkit:activate
     *      { "preamble": "const { List } = require('immutable');" }
     * -->
     * ```js
     * List([ 1, 2 ]).map(x => 10 * x)
     * // List [ 10, 20 ]
     * ```
     */
    map<M>(
      mapper: (value: T, key: number, iter: this) => M,
      context?: any
    ): List<M>;

    /**
     * Flat-maps the List, returning a new List.
     *
     * Similar to `list.map(...).flatten(true)`.
     */
    flatMap<M>(
      mapper: (value: T, key: number, iter: this) => Iterable<M>,
      context?: any
    ): List<M>;

    /**
     * Returns a new List with only the values for which the `predicate`
     * function returns true.
     *
     * Note: `filter()` always returns a new instance, even if it results in
     * not filtering out any values.
     */
    filter<F extends T>(
      predicate: (value: T, index: number, iter: this) => value is F,
      context?: any
    ): List<F>;
    filter(
      predicate: (value: T, index: number, iter: this) => any,
      context?: any
    ): this;

    /**
     * Returns a List "zipped" with the provided collection.
     *
     * Like `zipWith`, but using the default `zipper`: creating an `Array`.
     *
     * <!-- runkit:activate
     *      { "preamble": "const { List } = require('immutable');" }
     * -->
     * ```js
     * const a = List([ 1, 2, 3 ]);
     * const b = List([ 4, 5, 6 ]);
     * const c = a.zip(b); // List [ [ 1, 4 ], [ 2, 5 ], [ 3, 6 ] ]
     * ```
     */
    zip<U>(other: Collection<any, U>): List<[T,U]>;
    zip<U,V>(other: Collection<any, U>, other2: Collection<any,V>): List<[T,U,V]>;
    zip(...collections: Array<Collection<any, any>>): List<any>;

    /**
     * Returns a List "zipped" with the provided collections.
     *
     * Unlike `zip`, `zipAll` continues zipping until the longest collection is
     * exhausted. Missing values from shorter collections are filled with `undefined`.
     *
     * <!-- runkit:activate
     *      { "preamble": "const { List } = require('immutable');" }
     * -->
     * ```js
     * const a = List([ 1, 2 ]);
     * const b = List([ 3, 4, 5 ]);
     * const c = a.zipAll(b); // List [ [ 1, 3 ], [ 2, 4 ], [ undefined, 5 ] ]
     * ```
     *
     * Note: Since zipAll will return a collection as large as the largest
     * input, some results may contain undefined values. TypeScript cannot
     * account for these without cases (as of v2.5).
     */
    zipAll<U>(other: Collection<any, U>): List<[T,U]>;
    zipAll<U,V>(other: Collection<any, U>, other2: Collection<any,V>): List<[T,U,V]>;
    zipAll(...collections: Array<Collection<any, any>>): List<any>;

    /**
     * Returns a List "zipped" with the provided collections by using a
     * custom `zipper` function.
     *
     * <!-- runkit:activate
     *      { "preamble": "const { List } = require('immutable');" }
     * -->
     * ```js
     * const a = List([ 1, 2, 3 ]);
     * const b = List([ 4, 5, 6 ]);
     * const c = a.zipWith((a, b) => a + b, b);
     * // List [ 5, 7, 9 ]
     * ```
     */
    zipWith<U, Z>(
      zipper: (value: T, otherValue: U) => Z,
      otherCollection: Collection<any, U>
    ): List<Z>;
    zipWith<U, V, Z>(
      zipper: (value: T, otherValue: U, thirdValue: V) => Z,
      otherCollection: Collection<any, U>,
      thirdCollection: Collection<any, V>
    ): List<Z>;
    zipWith<Z>(
      zipper: (...any: Array<any>) => Z,
      ...collections: Array<Collection<any, any>>
    ): List<Z>;
  }


  /**
   * Immutable Map is an unordered Collection.Keyed of (key, value) pairs with
   * `O(log32 N)` gets and `O(log32 N)` persistent sets.
   *
   * Iteration order of a Map is undefined, however is stable. Multiple
   * iterations of the same Map will iterate in the same order.
   *
   * Map's keys can be of any type, and use `Immutable.is` to determine key
   * equality. This allows the use of any value (including NaN) as a key.
   *
   * Because `Immutable.is` returns equality based on value semantics, and
   * Immutable collections are treated as values, any Immutable collection may
   * be used as a key.
   *
   * <!-- runkit:activate -->
   * ```js
   * const { Map, List } = require('immutable');
   * Map().set(List([ 1 ]), 'listofone').get(List([ 1 ]));
   * // 'listofone'
   * ```
   *
   * Any JavaScript object may be used as a key, however strict identity is used
   * to evaluate key equality. Two similar looking objects will represent two
   * different keys.
   *
   * Implemented by a hash-array mapped trie.
   */
  declare module Map {

    /**
     * True if the provided value is a Map
     *
     * <!-- runkit:activate -->
     * ```js
     * const { Map } = require('immutable')
     * Map.isMap({}) // false
     * Map.isMap(Map()) // true
     * ```
     */
    function isMap(maybeMap: any): maybeMap is Map<any, any>;

    /**
     * Creates a new Map from alternating keys and values
     *
     * <!-- runkit:activate -->
     * ```js
     * const { Map } = require('immutable')
     * Map.of(
     *   'key', 'value',
     *   'numerical value', 3,
     *    0, 'numerical key'
     * )
     * // Map { 0: "numerical key", "key": "value", "numerical value": 3 }
     * ```
     *
     * @deprecated Use Map([ [ 'k', 'v' ] ]) or Map({ k: 'v' })
     */
    function of(...keyValues: Array<any>): Map<any, any>;
  }

  /**
   * Creates a new Immutable Map.
   *
   * Created with the same key value pairs as the provided Collection.Keyed or
   * JavaScript Object or expects a Collection of [K, V] tuple entries.
   *
   * Note: `Map` is a factory function and not a class, and does not use the
   * `new` keyword during construction.
   *
   * <!-- runkit:activate -->
   * ```js
   * const { Map } = require('immutable')
   * Map({ key: "value" })
   * Map([ [ "key", "value" ] ])
   * ```
   *
   * Keep in mind, when using JS objects to construct Immutable Maps, that
   * JavaScript Object properties are always strings, even if written in a
   * quote-less shorthand, while Immutable Maps accept keys of any type.
   *
   * <!-- runkit:activate
   *      { "preamble": "const { Map } = require('immutable');" }
   * -->
   * ```js
   * let obj = { 1: "one" }
   * Object.keys(obj) // [ "1" ]
   * assert.equal(obj["1"], obj[1]) // "one" === "one"
   *
   * let map = Map(obj)
   * assert.notEqual(map.get("1"), map.get(1)) // "one" !== undefined
   * ```
   *
   * Property access for JavaScript Objects first converts the key to a string,
   * but since Immutable Map keys can be of any type the argument to `get()` is
   * not altered.
   */
  declare function Map<K, V>(collection: Iterable<[K, V]>): Map<K, V>;
  declare function Map<T>(collection: Iterable<Iterable<T>>): Map<T, T>;
  declare function Map<V>(obj: {[key: string]: V}): Map<string, V>;
  declare function Map<K, V>(): Map<K, V>;
  declare function Map(): Map<any, any>;

  interface Map<K, V> extends Collection.Keyed<K, V> {

    /**
     * The number of entries in this Map.
     */
    readonly size: number;

    // Persistent changes

    /**
     * Returns a new Map also containing the new key, value pair. If an equivalent
     * key already exists in this Map, it will be replaced.
     *
     * <!-- runkit:activate -->
     * ```js
     * const { Map } = require('immutable')
     * const originalMap = Map()
     * const newerMap = originalMap.set('key', 'value')
     * const newestMap = newerMap.set('key', 'newer value')
     *
     * originalMap
     * // Map {}
     * newerMap
     * // Map { "key": "value" }
     * newestMap
     * // Map { "key": "newer value" }
     * ```
     *
     * Note: `set` can be used in `withMutations`.
     */
    set(key: K, value: V): this;

    /**
     * Returns a new Map which excludes this `key`.
     *
     * Note: `delete` cannot be safely used in IE8, but is provided to mirror
     * the ES6 collection API.
     *
     * <!-- runkit:activate -->
     * ```js
     * const { Map } = require('immutable')
     * const originalMap = Map({
     *   key: 'value',
     *   otherKey: 'other value'
     * })
     * // Map { "key": "value", "otherKey": "other value" }
     * originalMap.delete('otherKey')
     * // Map { "key": "value" }
     * ```
     *
     * Note: `delete` can be used in `withMutations`.
     *
     * @alias remove
     */
    delete(key: K): this;
    remove(key: K): this;

    /**
     * Returns a new Map which excludes the provided `keys`.
     *
     * <!-- runkit:activate -->
     * ```js
     * const { Map } = require('immutable')
     * const names = Map({ a: "Aaron", b: "Barry", c: "Connor" })
     * names.deleteAll([ 'a', 'c' ])
     * // Map { "b": "Barry" }
     * ```
     *
     * Note: `deleteAll` can be used in `withMutations`.
     *
     * @alias removeAll
     */
    deleteAll(keys: Iterable<K>): this;
    removeAll(keys: Iterable<K>): this;

    /**
     * Returns a new Map containing no keys or values.
     *
     * <!-- runkit:activate -->
     * ```js
     * const { Map } = require('immutable')
     * Map({ key: 'value' }).clear()
     * // Map {}
     * ```
     *
     * Note: `clear` can be used in `withMutations`.
     */
    clear(): this;

    /**
     * Returns a new Map having updated the value at this `key` with the return
     * value of calling `updater` with the existing value.
     *
     * Similar to: `map.set(key, updater(map.get(key)))`.
     *
     * <!-- runkit:activate -->
     * ```js
     * const { Map } = require('immutable')
     * const aMap = Map({ key: 'value' })
     * const newMap = aMap.update('key', value => value + value)
     * // Map { "key": "valuevalue" }
     * ```
     *
     * This is most commonly used to call methods on collections within a
     * structure of data. For example, in order to `.push()` onto a nested `List`,
     * `update` and `push` can be used together:
     *
     * <!-- runkit:activate
     *      { "preamble": "const { Map, List } = require('immutable');" }
     * -->
     * ```js
     * const aMap = Map({ nestedList: List([ 1, 2, 3 ]) })
     * const newMap = aMap.update('nestedList', list => list.push(4))
     * // Map { "nestedList": List [ 1, 2, 3, 4 ] }
     * ```
     *
     * When a `notSetValue` is provided, it is provided to the `updater`
     * function when the value at the key does not exist in the Map.
     *
     * <!-- runkit:activate
     *      { "preamble": "const { Map } = require('immutable');" }
     * -->
     * ```js
     * const aMap = Map({ key: 'value' })
     * const newMap = aMap.update('noKey', 'no value', value => value + value)
     * // Map { "key": "value", "noKey": "no valueno value" }
     * ```
     *
     * However, if the `updater` function returns the same value it was called
     * with, then no change will occur. This is still true if `notSetValue`
     * is provided.
     *
     * <!-- runkit:activate
     *      { "preamble": "const { Map } = require('immutable');" }
     * -->
     * ```js
     * const aMap = Map({ apples: 10 })
     * const newMap = aMap.update('oranges', 0, val => val)
     * // Map { "apples": 10 }
     * assert.strictEqual(newMap, map);
     * ```
     *
     * For code using ES2015 or later, using `notSetValue` is discourged in
     * favor of function parameter default values. This helps to avoid any
     * potential confusion with identify functions as described above.
     *
     * The previous example behaves differently when written with default values:
     *
     * <!-- runkit:activate
     *      { "preamble": "const { Map } = require('immutable');" }
     * -->
     * ```js
     * const aMap = Map({ apples: 10 })
     * const newMap = aMap.update('oranges', (val = 0) => val)
     * // Map { "apples": 10, "oranges": 0 }
     * ```
     *
     * If no key is provided, then the `updater` function return value is
     * returned as well.
     *
     * <!-- runkit:activate
     *      { "preamble": "const { Map } = require('immutable');" }
     * -->
     * ```js
     * const aMap = Map({ key: 'value' })
     * const result = aMap.update(aMap => aMap.get('key'))
     * // "value"
     * ```
     *
     * This can be very useful as a way to "chain" a normal function into a
     * sequence of methods. RxJS calls this "let" and lodash calls it "thru".
     *
     * For example, to sum the values in a Map
     *
     * <!-- runkit:activate
     *      { "preamble": "const { Map } = require('immutable');" }
     * -->
     * ```js
     * function sum(collection) {
     *   return collection.reduce((sum, x) => sum + x, 0)
     * }
     *
     * Map({ x: 1, y: 2, z: 3 })
     *   .map(x => x + 1)
     *   .filter(x => x % 2 === 0)
     *   .update(sum)
     * // 6
     * ```
     *
     * Note: `update(key)` can be used in `withMutations`.
     */
    update(key: K, notSetValue: V, updater: (value: V) => V): this;
    update(key: K, updater: (value: V) => V): this;
    update<R>(updater: (value: this) => R): R;

    /**
     * Returns a new Map resulting from merging the provided Collections
     * (or JS objects) into this Map. In other words, this takes each entry of
     * each collection and sets it on this Map.
     *
     * Note: Values provided to `merge` are shallowly converted before being
     * merged. No nested values are altered.
     *
     * <!-- runkit:activate -->
     * ```js
     * const { Map } = require('immutable')
     * const one = Map({ a: 10, b: 20, c: 30 })
     * const two = Map({ b: 40, a: 50, d: 60 })
     * one.merge(two) // Map { "a": 50, "b": 40, "c": 30, "d": 60 }
     * two.merge(one) // Map { "b": 20, "a": 10, "d": 60, "c": 30 }
     * ```
     *
     * Note: `merge` can be used in `withMutations`.
     *
     * @alias concat
     */
    merge<KC, VC>(...collections: Array<Iterable<[KC, VC]>>): Map<K | KC, V | VC>;
    merge<C>(...collections: Array<{[key: string]: C}>): Map<K | string, V | C>;
    concat<KC, VC>(...collections: Array<Iterable<[KC, VC]>>): Map<K | KC, V | VC>;
    concat<C>(...collections: Array<{[key: string]: C}>): Map<K | string, V | C>;

    /**
     * Like `merge()`, `mergeWith()` returns a new Map resulting from merging
     * the provided Collections (or JS objects) into this Map, but uses the
     * `merger` function for dealing with conflicts.
     *
     * <!-- runkit:activate -->
     * ```js
     * const { Map } = require('immutable')
     * const one = Map({ a: 10, b: 20, c: 30 })
     * const two = Map({ b: 40, a: 50, d: 60 })
     * one.mergeWith((oldVal, newVal) => oldVal / newVal, two)
     * // { "a": 0.2, "b": 0.5, "c": 30, "d": 60 }
     * two.mergeWith((oldVal, newVal) => oldVal / newVal, one)
     * // { "b": 2, "a": 5, "d": 60, "c": 30 }
     * ```
     *
     * Note: `mergeWith` can be used in `withMutations`.
     */
    mergeWith(
      merger: (oldVal: V, newVal: V, key: K) => V,
      ...collections: Array<Iterable<[K, V]> | {[key: string]: V}>
    ): this;

    /**
     * Like `merge()`, but when two Collections conflict, it merges them as well,
     * recursing deeply through the nested data.
     *
     * Note: Values provided to `merge` are shallowly converted before being
     * merged. No nested values are altered unless they will also be merged at
     * a deeper level.
     *
     * <!-- runkit:activate -->
     * ```js
     * const { Map } = require('immutable')
     * const one = Map({ a: Map({ x: 10, y: 10 }), b: Map({ x: 20, y: 50 }) })
     * const two = Map({ a: Map({ x: 2 }), b: Map({ y: 5 }), c: Map({ z: 3 }) })
     * one.mergeDeep(two)
     * // Map {
     * //   "a": Map { "x": 2, "y": 10 },
     * //   "b": Map { "x": 20, "y": 5 },
     * //   "c": Map { "z": 3 }
     * // }
     * ```
     *
     * Note: `mergeDeep` can be used in `withMutations`.
     */
    mergeDeep(...collections: Array<Iterable<[K, V]> | {[key: string]: V}>): this;

    /**
     * Like `mergeDeep()`, but when two non-Collections conflict, it uses the
     * `merger` function to determine the resulting value.
     *
     * <!-- runkit:activate -->
     * ```js
     * const { Map } = require('immutable')
     * const one = Map({ a: Map({ x: 10, y: 10 }), b: Map({ x: 20, y: 50 }) })
     * const two = Map({ a: Map({ x: 2 }), b: Map({ y: 5 }), c: Map({ z: 3 }) })
     * one.mergeDeepWith((oldVal, newVal) => oldVal / newVal, two)
     * // Map {
     * //   "a": Map { "x": 5, "y": 10 },
     * //   "b": Map { "x": 20, "y": 10 },
     * //   "c": Map { "z": 3 }
     * // }
     * ```

     * Note: `mergeDeepWith` can be used in `withMutations`.
     */
    mergeDeepWith(
      merger: (oldVal: any, newVal: any, key: any) => any,
      ...collections: Array<Iterable<[K, V]> | {[key: string]: V}>
    ): this;


    // Deep persistent changes

    /**
     * Returns a new Map having set `value` at this `keyPath`. If any keys in
     * `keyPath` do not exist, a new immutable Map will be created at that key.
     *
     * <!-- runkit:activate -->
     * ```js
     * const { Map } = require('immutable')
     * const originalMap = Map({
     *   subObject: Map({
     *     subKey: 'subvalue',
     *     subSubObject: Map({
     *       subSubKey: 'subSubValue'
     *     })
     *   })
     * })
     *
     * const newMap = originalMap.setIn(['subObject', 'subKey'], 'ha ha!')
     * // Map {
     * //   "subObject": Map {
     * //     "subKey": "ha ha!",
     * //     "subSubObject": Map { "subSubKey": "subSubValue" }
     * //   }
     * // }
     *
     * const newerMap = originalMap.setIn(
     *   ['subObject', 'subSubObject', 'subSubKey'],
     *   'ha ha ha!'
     * )
     * // Map {
     * //   "subObject": Map {
     * //     "subKey": "subvalue",
     * //     "subSubObject": Map { "subSubKey": "ha ha ha!" }
     * //   }
     * // }
     * ```
     *
     * Plain JavaScript Object or Arrays may be nested within an Immutable.js
     * Collection, and setIn() can update those values as well, treating them
     * immutably by creating new copies of those values with the changes applied.
     *
     * <!-- runkit:activate -->
     * ```js
     * const { Map } = require('immutable')
     * const originalMap = Map({
     *   subObject: {
     *     subKey: 'subvalue',
     *     subSubObject: {
     *       subSubKey: 'subSubValue'
     *     }
     *   }
     * })
     *
     * originalMap.setIn(['subObject', 'subKey'], 'ha ha!')
     * // Map {
     * //   "subObject": {
     * //     subKey: "ha ha!",
     * //     subSubObject: { subSubKey: "subSubValue" }
     * //   }
     * // }
     * ```
     *
     * If any key in the path exists but cannot be updated (such as a primitive
     * like number or a custom Object like Date), an error will be thrown.
     *
     * Note: `setIn` can be used in `withMutations`.
     */
    setIn(keyPath: Iterable<any>, value: any): this;

    /**
     * Returns a new Map having removed the value at this `keyPath`. If any keys
     * in `keyPath` do not exist, no change will occur.
     *
     * Note: `deleteIn` can be used in `withMutations`.
     *
     * @alias removeIn
     */
    deleteIn(keyPath: Iterable<any>): this;
    removeIn(keyPath: Iterable<any>): this;

    /**
     * Returns a new Map having applied the `updater` to the entry found at the
     * keyPath.
     *
     * This is most commonly used to call methods on collections nested within a
     * structure of data. For example, in order to `.push()` onto a nested `List`,
     * `updateIn` and `push` can be used together:
     *
     * <!-- runkit:activate -->
     * ```js
     * const { Map, List } = require('immutable')
     * const map = Map({ inMap: Map({ inList: List([ 1, 2, 3 ]) }) })
     * const newMap = map.updateIn(['inMap', 'inList'], list => list.push(4))
     * // Map { "inMap": Map { "inList": List [ 1, 2, 3, 4 ] } }
     * ```
     *
     * If any keys in `keyPath` do not exist, new Immutable `Map`s will
     * be created at those keys. If the `keyPath` does not already contain a
     * value, the `updater` function will be called with `notSetValue`, if
     * provided, otherwise `undefined`.
     *
     * <!-- runkit:activate
     *      { "preamble": "const { Map } = require('immutable')" }
     * -->
     * ```js
     * const map = Map({ a: Map({ b: Map({ c: 10 }) }) })
     * const newMap = map.updateIn(['a', 'b', 'c'], val => val * 2)
     * // Map { "a": Map { "b": Map { "c": 20 } } }
     * ```
     *
     * If the `updater` function returns the same value it was called with, then
     * no change will occur. This is still true if `notSetValue` is provided.
     *
     * <!-- runkit:activate
     *      { "preamble": "const { Map } = require('immutable')" }
     * -->
     * ```js
     * const map = Map({ a: Map({ b: Map({ c: 10 }) }) })
     * const newMap = map.updateIn(['a', 'b', 'x'], 100, val => val)
     * // Map { "a": Map { "b": Map { "c": 10 } } }
     * assert.strictEqual(newMap, aMap)
     * ```
     *
     * For code using ES2015 or later, using `notSetValue` is discourged in
     * favor of function parameter default values. This helps to avoid any
     * potential confusion with identify functions as described above.
     *
     * The previous example behaves differently when written with default values:
     *
     * <!-- runkit:activate
     *      { "preamble": "const { Map } = require('immutable')" }
     * -->
     * ```js
     * const map = Map({ a: Map({ b: Map({ c: 10 }) }) })
     * const newMap = map.updateIn(['a', 'b', 'x'], (val = 100) => val)
     * // Map { "a": Map { "b": Map { "c": 10, "x": 100 } } }
     * ```
     *
     * Plain JavaScript Object or Arrays may be nested within an Immutable.js
     * Collection, and updateIn() can update those values as well, treating them
     * immutably by creating new copies of those values with the changes applied.
     *
     * <!-- runkit:activate
     *      { "preamble": "const { Map } = require('immutable')" }
     * -->
     * ```js
     * const map = Map({ a: { b: { c: 10 } } })
     * const newMap = map.updateIn(['a', 'b', 'c'], val => val * 2)
     * // Map { "a": { b: { c: 20 } } }
     * ```
     *
     * If any key in the path exists but cannot be updated (such as a primitive
     * like number or a custom Object like Date), an error will be thrown.
     *
     * Note: `updateIn` can be used in `withMutations`.
     */
    updateIn(keyPath: Iterable<any>, notSetValue: any, updater: (value: any) => any): this;
    updateIn(keyPath: Iterable<any>, updater: (value: any) => any): this;

    /**
     * A combination of `updateIn` and `merge`, returning a new Map, but
     * performing the merge at a point arrived at by following the keyPath.
     * In other words, these two lines are equivalent:
     *
     * ```js
     * map.updateIn(['a', 'b', 'c'], abc => abc.merge(y))
     * map.mergeIn(['a', 'b', 'c'], y)
     * ```
     *
     * Note: `mergeIn` can be used in `withMutations`.
     */
    mergeIn(keyPath: Iterable<any>, ...collections: Array<any>): this;

    /**
     * A combination of `updateIn` and `mergeDeep`, returning a new Map, but
     * performing the deep merge at a point arrived at by following the keyPath.
     * In other words, these two lines are equivalent:
     *
     * ```js
     * map.updateIn(['a', 'b', 'c'], abc => abc.mergeDeep(y))
     * map.mergeDeepIn(['a', 'b', 'c'], y)
     * ```
     *
     * Note: `mergeDeepIn` can be used in `withMutations`.
     */
    mergeDeepIn(keyPath: Iterable<any>, ...collections: Array<any>): this;

    // Transient changes

    /**
     * Every time you call one of the above functions, a new immutable Map is
     * created. If a pure function calls a number of these to produce a final
     * return value, then a penalty on performance and memory has been paid by
     * creating all of the intermediate immutable Maps.
     *
     * If you need to apply a series of mutations to produce a new immutable
     * Map, `withMutations()` creates a temporary mutable copy of the Map which
     * can apply mutations in a highly performant manner. In fact, this is
     * exactly how complex mutations like `merge` are done.
     *
     * As an example, this results in the creation of 2, not 4, new Maps:
     *
     * <!-- runkit:activate -->
     * ```js
     * const { Map } = require('immutable')
     * const map1 = Map()
     * const map2 = map1.withMutations(map => {
     *   map.set('a', 1).set('b', 2).set('c', 3)
     * })
     * assert.equal(map1.size, 0)
     * assert.equal(map2.size, 3)
     * ```
     *
     * Note: Not all methods can be used on a mutable collection or within
     * `withMutations`! Read the documentation for each method to see if it
     * is safe to use in `withMutations`.
     */
    withMutations(mutator: (mutable: this) => any): this;

    /**
     * Another way to avoid creation of intermediate Immutable maps is to create
     * a mutable copy of this collection. Mutable copies *always* return `this`,
     * and thus shouldn't be used for equality. Your function should never return
     * a mutable copy of a collection, only use it internally to create a new
     * collection.
     *
     * If possible, use `withMutations` to work with temporary mutable copies as
     * it provides an easier to use API and considers many common optimizations.
     *
     * Note: if the collection is already mutable, `asMutable` returns itself.
     *
     * Note: Not all methods can be used on a mutable collection or within
     * `withMutations`! Read the documentation for each method to see if it
     * is safe to use in `withMutations`.
     *
     * @see `Map#asImmutable`
     */
    asMutable(): this;

    /**
     * Returns true if this is a mutable copy (see `asMutable()`) and mutative
     * alterations have been applied.
     *
     * @see `Map#asMutable`
     */
    wasAltered(): boolean;

    /**
     * The yin to `asMutable`'s yang. Because it applies to mutable collections,
     * this operation is *mutable* and may return itself (though may not
     * return itself, i.e. if the result is an empty collection). Once
     * performed, the original mutable copy must no longer be mutated since it
     * may be the immutable result.
     *
     * If possible, use `withMutations` to work with temporary mutable copies as
     * it provides an easier to use API and considers many common optimizations.
     *
     * @see `Map#asMutable`
     */
    asImmutable(): this;

    // Sequence algorithms

    /**
     * Returns a new Map with values passed through a
     * `mapper` function.
     *
     *     Map({ a: 1, b: 2 }).map(x => 10 * x)
     *     // Map { a: 10, b: 20 }
     */
    map<M>(
      mapper: (value: V, key: K, iter: this) => M,
      context?: any
    ): Map<K, M>;

    /**
     * @see Collection.Keyed.mapKeys
     */
    mapKeys<M>(
      mapper: (key: K, value: V, iter: this) => M,
      context?: any
    ): Map<M, V>;

    /**
     * @see Collection.Keyed.mapEntries
     */
    mapEntries<KM, VM>(
      mapper: (entry: [K, V], index: number, iter: this) => [KM, VM],
      context?: any
    ): Map<KM, VM>;

    /**
     * Flat-maps the Map, returning a new Map.
     *
     * Similar to `data.map(...).flatten(true)`.
     */
    flatMap<KM, VM>(
      mapper: (value: V, key: K, iter: this) => Iterable<[KM, VM]>,
      context?: any
    ): Map<KM, VM>;

    /**
     * Returns a new Map with only the entries for which the `predicate`
     * function returns true.
     *
     * Note: `filter()` always returns a new instance, even if it results in
     * not filtering out any values.
     */
    filter<F extends V>(
      predicate: (value: V, key: K, iter: this) => value is F,
      context?: any
    ): Map<K, F>;
    filter(
      predicate: (value: V, key: K, iter: this) => any,
      context?: any
    ): this;

    /**
     * @see Collection.Keyed.flip
     */
    flip(): Map<V, K>;
  }


  /**
   * A type of Map that has the additional guarantee that the iteration order of
   * entries will be the order in which they were set().
   *
   * The iteration behavior of OrderedMap is the same as native ES6 Map and
   * JavaScript Object.
   *
   * Note that `OrderedMap` are more expensive than non-ordered `Map` and may
   * consume more memory. `OrderedMap#set` is amortized O(log32 N), but not
   * stable.
   */

  declare module OrderedMap {

    /**
     * True if the provided value is an OrderedMap.
     */
    function isOrderedMap(maybeOrderedMap: any): maybeOrderedMap is OrderedMap<any, any>;
  }

  /**
   * Creates a new Immutable OrderedMap.
   *
   * Created with the same key value pairs as the provided Collection.Keyed or
   * JavaScript Object or expects a Collection of [K, V] tuple entries.
   *
   * The iteration order of key-value pairs provided to this constructor will
   * be preserved in the OrderedMap.
   *
   *     let newOrderedMap = OrderedMap({key: "value"})
   *     let newOrderedMap = OrderedMap([["key", "value"]])
   *
   * Note: `OrderedMap` is a factory function and not a class, and does not use
   * the `new` keyword during construction.
   */
  declare function OrderedMap<K, V>(collection: Iterable<[K, V]>): OrderedMap<K, V>;
  declare function OrderedMap<T>(collection: Iterable<Iterable<T>>): OrderedMap<T, T>;
  declare function OrderedMap<V>(obj: {[key: string]: V}): OrderedMap<string, V>;
  declare function OrderedMap<K, V>(): OrderedMap<K, V>;
  declare function OrderedMap(): OrderedMap<any, any>;

  interface OrderedMap<K, V> extends Map<K, V> {

    /**
     * The number of entries in this OrderedMap.
     */
    readonly size: number;

    /**
     * Returns a new OrderedMap also containing the new key, value pair. If an
     * equivalent key already exists in this OrderedMap, it will be replaced
     * while maintaining the existing order.
     *
     * <!-- runkit:activate -->
     * ```js
     * const { OrderedMap } = require('immutable')
     * const originalMap = OrderedMap({a:1, b:1, c:1})
     * const updatedMap = originalMap.set('b', 2)
     *
     * originalMap
     * // OrderedMap {a: 1, b: 1, c: 1}
     * updatedMap
     * // OrderedMap {a: 1, b: 2, c: 1}
     * ```
     *
     * Note: `set` can be used in `withMutations`.
     */
    set(key: K, value: V): this;

    /**
     * Returns a new OrderedMap resulting from merging the provided Collections
     * (or JS objects) into this OrderedMap. In other words, this takes each
     * entry of each collection and sets it on this OrderedMap.
     *
     * Note: Values provided to `merge` are shallowly converted before being
     * merged. No nested values are altered.
     *
     * <!-- runkit:activate -->
     * ```js
     * const { OrderedMap } = require('immutable')
     * const one = OrderedMap({ a: 10, b: 20, c: 30 })
     * const two = OrderedMap({ b: 40, a: 50, d: 60 })
     * one.merge(two) // OrderedMap { "a": 50, "b": 40, "c": 30, "d": 60 }
     * two.merge(one) // OrderedMap { "b": 20, "a": 10, "d": 60, "c": 30 }
     * ```
     *
     * Note: `merge` can be used in `withMutations`.
     *
     * @alias concat
     */
    merge<KC, VC>(...collections: Array<Iterable<[KC, VC]>>): OrderedMap<K | KC, V | VC>;
    merge<C>(...collections: Array<{[key: string]: C}>): OrderedMap<K | string, V | C>;
    concat<KC, VC>(...collections: Array<Iterable<[KC, VC]>>): OrderedMap<K | KC, V | VC>;
    concat<C>(...collections: Array<{[key: string]: C}>): OrderedMap<K | string, V | C>;

    // Sequence algorithms

    /**
     * Returns a new OrderedMap with values passed through a
     * `mapper` function.
     *
     *     OrderedMap({ a: 1, b: 2 }).map(x => 10 * x)
     *     // OrderedMap { "a": 10, "b": 20 }
     *
     * Note: `map()` always returns a new instance, even if it produced the same
     * value at every step.
     */
    map<M>(
      mapper: (value: V, key: K, iter: this) => M,
      context?: any
    ): OrderedMap<K, M>;

    /**
     * @see Collection.Keyed.mapKeys
     */
    mapKeys<M>(
      mapper: (key: K, value: V, iter: this) => M,
      context?: any
    ): OrderedMap<M, V>;

    /**
     * @see Collection.Keyed.mapEntries
     */
    mapEntries<KM, VM>(
      mapper: (entry: [K, V], index: number, iter: this) => [KM, VM],
      context?: any
    ): OrderedMap<KM, VM>;

    /**
     * Flat-maps the OrderedMap, returning a new OrderedMap.
     *
     * Similar to `data.map(...).flatten(true)`.
     */
    flatMap<KM, VM>(
      mapper: (value: V, key: K, iter: this) => Iterable<[KM, VM]>,
      context?: any
    ): OrderedMap<KM, VM>;

    /**
     * Returns a new OrderedMap with only the entries for which the `predicate`
     * function returns true.
     *
     * Note: `filter()` always returns a new instance, even if it results in
     * not filtering out any values.
     */
    filter<F extends V>(
      predicate: (value: V, key: K, iter: this) => value is F,
      context?: any
    ): OrderedMap<K, F>;
    filter(
      predicate: (value: V, key: K, iter: this) => any,
      context?: any
    ): this;

    /**
     * @see Collection.Keyed.flip
     */
    flip(): OrderedMap<V, K>;
  }


  /**
   * A Collection of unique values with `O(log32 N)` adds and has.
   *
   * When iterating a Set, the entries will be (value, value) pairs. Iteration
   * order of a Set is undefined, however is stable. Multiple iterations of the
   * same Set will iterate in the same order.
   *
   * Set values, like Map keys, may be of any type. Equality is determined using
   * `Immutable.is`, enabling Sets to uniquely include other Immutable
   * collections, custom value types, and NaN.
   */
  declare module Set {

    /**
     * True if the provided value is a Set
     */
    function isSet(maybeSet: any): maybeSet is Set<any>;

    /**
     * Creates a new Set containing `values`.
     */
    function of<T>(...values: Array<T>): Set<T>;

    /**
     * `Set.fromKeys()` creates a new immutable Set containing the keys from
     * this Collection or JavaScript Object.
     */
    function fromKeys<T>(iter: Collection<T, any>): Set<T>;
    function fromKeys(obj: {[key: string]: any}): Set<string>;

    /**
     * `Set.intersect()` creates a new immutable Set that is the intersection of
     * a collection of other sets.
     *
     * ```js
     * const { Set } = require('immutable')
     * const intersected = Set.intersect([
     *   Set([ 'a', 'b', 'c' ])
     *   Set([ 'c', 'a', 't' ])
     * ])
     * // Set [ "a", "c"" ]
     * ```
     */
    function intersect<T>(sets: Iterable<Iterable<T>>): Set<T>;

    /**
     * `Set.union()` creates a new immutable Set that is the union of a
     * collection of other sets.
     *
     * ```js
     * const { Set } = require('immutable')
     * const unioned = Set.union([
     *   Set([ 'a', 'b', 'c' ])
     *   Set([ 'c', 'a', 't' ])
     * ])
     * // Set [ "a", "b", "c", "t"" ]
     * ```
     */
    function union<T>(sets: Iterable<Iterable<T>>): Set<T>;
  }

  /**
   * Create a new immutable Set containing the values of the provided
   * collection-like.
   *
   * Note: `Set` is a factory function and not a class, and does not use the
   * `new` keyword during construction.
   */
  declare function Set(): Set<any>;
  declare function Set<T>(): Set<T>;
  declare function Set<T>(collection: Iterable<T>): Set<T>;

  interface Set<T> extends Collection.Set<T> {

    /**
     * The number of items in this Set.
     */
    readonly size: number;

    // Persistent changes

    /**
     * Returns a new Set which also includes this value.
     *
     * Note: `add` can be used in `withMutations`.
     */
    add(value: T): this;

    /**
     * Returns a new Set which excludes this value.
     *
     * Note: `delete` can be used in `withMutations`.
     *
     * Note: `delete` **cannot** be safely used in IE8, use `remove` if
     * supporting old browsers.
     *
     * @alias remove
     */
    delete(value: T): this;
    remove(value: T): this;

    /**
     * Returns a new Set containing no values.
     *
     * Note: `clear` can be used in `withMutations`.
     */
    clear(): this;

    /**
     * Returns a Set including any value from `collections` that does not already
     * exist in this Set.
     *
     * Note: `union` can be used in `withMutations`.
     * @alias merge
     * @alias concat
     */
    union<C>(...collections: Array<Iterable<C>>): Set<T | C>;
    merge<C>(...collections: Array<Iterable<C>>): Set<T | C>;
    concat<C>(...collections: Array<Iterable<C>>): Set<T | C>;

    /**
     * Returns a Set which has removed any values not also contained
     * within `collections`.
     *
     * Note: `intersect` can be used in `withMutations`.
     */
    intersect(...collections: Array<Iterable<T>>): this;

    /**
     * Returns a Set excluding any values contained within `collections`.
     *
     * <!-- runkit:activate -->
     * ```js
     * const { OrderedSet } = require('immutable')
     * OrderedSet([ 1, 2, 3 ]).subtract([1, 3])
     * // OrderedSet [2]
     * ```
     *
     * Note: `subtract` can be used in `withMutations`.
     */
    subtract(...collections: Array<Iterable<T>>): this;


    // Transient changes

    /**
     * Note: Not all methods can be used on a mutable collection or within
     * `withMutations`! Check the documentation for each method to see if it
     * mentions being safe to use in `withMutations`.
     *
     * @see `Map#withMutations`
     */
    withMutations(mutator: (mutable: this) => any): this;

    /**
     * Note: Not all methods can be used on a mutable collection or within
     * `withMutations`! Check the documentation for each method to see if it
     * mentions being safe to use in `withMutations`.
     *
     * @see `Map#asMutable`
     */
    asMutable(): this;

    /**
     * @see `Map#wasAltered`
     */
    wasAltered(): boolean;

    /**
     * @see `Map#asImmutable`
     */
    asImmutable(): this;

    // Sequence algorithms

    /**
     * Returns a new Set with values passed through a
     * `mapper` function.
     *
     *     Set([1,2]).map(x => 10 * x)
     *     // Set [10,20]
     */
    map<M>(
      mapper: (value: T, key: T, iter: this) => M,
      context?: any
    ): Set<M>;

    /**
     * Flat-maps the Set, returning a new Set.
     *
     * Similar to `set.map(...).flatten(true)`.
     */
    flatMap<M>(
      mapper: (value: T, key: T, iter: this) => Iterable<M>,
      context?: any
    ): Set<M>;

    /**
     * Returns a new Set with only the values for which the `predicate`
     * function returns true.
     *
     * Note: `filter()` always returns a new instance, even if it results in
     * not filtering out any values.
     */
    filter<F extends T>(
      predicate: (value: T, key: T, iter: this) => value is F,
      context?: any
    ): Set<F>;
    filter(
      predicate: (value: T, key: T, iter: this) => any,
      context?: any
    ): this;
  }


  /**
   * A type of Set that has the additional guarantee that the iteration order of
   * values will be the order in which they were `add`ed.
   *
   * The iteration behavior of OrderedSet is the same as native ES6 Set.
   *
   * Note that `OrderedSet` are more expensive than non-ordered `Set` and may
   * consume more memory. `OrderedSet#add` is amortized O(log32 N), but not
   * stable.
   */
  declare module OrderedSet {

    /**
     * True if the provided value is an OrderedSet.
     */
    function isOrderedSet(maybeOrderedSet: any): boolean;

    /**
     * Creates a new OrderedSet containing `values`.
     */
    function of<T>(...values: Array<T>): OrderedSet<T>;

    /**
     * `OrderedSet.fromKeys()` creates a new immutable OrderedSet containing
     * the keys from this Collection or JavaScript Object.
     */
    function fromKeys<T>(iter: Collection<T, any>): OrderedSet<T>;
    function fromKeys(obj: {[key: string]: any}): OrderedSet<string>;
  }

  /**
   * Create a new immutable OrderedSet containing the values of the provided
   * collection-like.
   *
   * Note: `OrderedSet` is a factory function and not a class, and does not use
   * the `new` keyword during construction.
   */
  declare function OrderedSet(): OrderedSet<any>;
  declare function OrderedSet<T>(): OrderedSet<T>;
  declare function OrderedSet<T>(collection: Iterable<T>): OrderedSet<T>;

  interface OrderedSet<T> extends Set<T> {

    /**
     * The number of items in this OrderedSet.
     */
    readonly size: number;

    /**
     * Returns an OrderedSet including any value from `collections` that does
     * not already exist in this OrderedSet.
     *
     * Note: `union` can be used in `withMutations`.
     * @alias merge
     * @alias concat
     */
    union<C>(...collections: Array<Iterable<C>>): OrderedSet<T | C>;
    merge<C>(...collections: Array<Iterable<C>>): OrderedSet<T | C>;
    concat<C>(...collections: Array<Iterable<C>>): OrderedSet<T | C>;

    // Sequence algorithms

    /**
     * Returns a new Set with values passed through a
     * `mapper` function.
     *
     *     OrderedSet([ 1, 2 ]).map(x => 10 * x)
     *     // OrderedSet [10, 20]
     */
    map<M>(
      mapper: (value: T, key: T, iter: this) => M,
      context?: any
    ): OrderedSet<M>;

    /**
     * Flat-maps the OrderedSet, returning a new OrderedSet.
     *
     * Similar to `set.map(...).flatten(true)`.
     */
    flatMap<M>(
      mapper: (value: T, key: T, iter: this) => Iterable<M>,
      context?: any
    ): OrderedSet<M>;

    /**
     * Returns a new OrderedSet with only the values for which the `predicate`
     * function returns true.
     *
     * Note: `filter()` always returns a new instance, even if it results in
     * not filtering out any values.
     */
    filter<F extends T>(
      predicate: (value: T, key: T, iter: this) => value is F,
      context?: any
    ): OrderedSet<F>;
    filter(
      predicate: (value: T, key: T, iter: this) => any,
      context?: any
    ): this;

    /**
     * Returns an OrderedSet of the same type "zipped" with the provided
     * collections.
     *
     * Like `zipWith`, but using the default `zipper`: creating an `Array`.
     *
     * ```js
     * const a = OrderedSet([ 1, 2, 3 ])
     * const b = OrderedSet([ 4, 5, 6 ])
     * const c = a.zip(b)
     * // OrderedSet [ [ 1, 4 ], [ 2, 5 ], [ 3, 6 ] ]
     * ```
     */
    zip<U>(other: Collection<any, U>): OrderedSet<[T,U]>;
    zip<U,V>(other1: Collection<any, U>, other2: Collection<any, V>): OrderedSet<[T,U,V]>;
    zip(...collections: Array<Collection<any, any>>): OrderedSet<any>;

    /**
     * Returns a OrderedSet of the same type "zipped" with the provided
     * collections.
     *
     * Unlike `zip`, `zipAll` continues zipping until the longest collection is
     * exhausted. Missing values from shorter collections are filled with `undefined`.
     *
     * ```js
     * const a = OrderedSet([ 1, 2 ]);
     * const b = OrderedSet([ 3, 4, 5 ]);
     * const c = a.zipAll(b); // OrderedSet [ [ 1, 3 ], [ 2, 4 ], [ undefined, 5 ] ]
     * ```
     *
     * Note: Since zipAll will return a collection as large as the largest
     * input, some results may contain undefined values. TypeScript cannot
     * account for these without cases (as of v2.5).
     */
    zipAll<U>(other: Collection<any, U>): OrderedSet<[T,U]>;
    zipAll<U,V>(other1: Collection<any, U>, other2: Collection<any, V>): OrderedSet<[T,U,V]>;
    zipAll(...collections: Array<Collection<any, any>>): OrderedSet<any>;

    /**
     * Returns an OrderedSet of the same type "zipped" with the provided
     * collections by using a custom `zipper` function.
     *
     * @see Seq.Indexed.zipWith
     */
    zipWith<U, Z>(
      zipper: (value: T, otherValue: U) => Z,
      otherCollection: Collection<any, U>
    ): OrderedSet<Z>;
    zipWith<U, V, Z>(
      zipper: (value: T, otherValue: U, thirdValue: V) => Z,
      otherCollection: Collection<any, U>,
      thirdCollection: Collection<any, V>
    ): OrderedSet<Z>;
    zipWith<Z>(
      zipper: (...any: Array<any>) => Z,
      ...collections: Array<Collection<any, any>>
    ): OrderedSet<Z>;

  }


  /**
   * Stacks are indexed collections which support very efficient O(1) addition
   * and removal from the front using `unshift(v)` and `shift()`.
   *
   * For familiarity, Stack also provides `push(v)`, `pop()`, and `peek()`, but
   * be aware that they also operate on the front of the list, unlike List or
   * a JavaScript Array.
   *
   * Note: `reverse()` or any inherent reverse traversal (`reduceRight`,
   * `lastIndexOf`, etc.) is not efficient with a Stack.
   *
   * Stack is implemented with a Single-Linked List.
   */
  declare module Stack {

    /**
     * True if the provided value is a Stack
     */
    function isStack(maybeStack: any): maybeStack is Stack<any>;

    /**
     * Creates a new Stack containing `values`.
     */
    function of<T>(...values: Array<T>): Stack<T>;
  }

  /**
   * Create a new immutable Stack containing the values of the provided
   * collection-like.
   *
   * The iteration order of the provided collection is preserved in the
   * resulting `Stack`.
   *
   * Note: `Stack` is a factory function and not a class, and does not use the
   * `new` keyword during construction.
   */
  declare function Stack(): Stack<any>;
  declare function Stack<T>(): Stack<T>;
  declare function Stack<T>(collection: Iterable<T>): Stack<T>;

  interface Stack<T> extends Collection.Indexed<T> {

    /**
     * The number of items in this Stack.
     */
    readonly size: number;

    // Reading values

    /**
     * Alias for `Stack.first()`.
     */
    peek(): T | undefined;


    // Persistent changes

    /**
     * Returns a new Stack with 0 size and no values.
     *
     * Note: `clear` can be used in `withMutations`.
     */
    clear(): Stack<T>;

    /**
     * Returns a new Stack with the provided `values` prepended, shifting other
     * values ahead to higher indices.
     *
     * This is very efficient for Stack.
     *
     * Note: `unshift` can be used in `withMutations`.
     */
    unshift(...values: Array<T>): Stack<T>;

    /**
     * Like `Stack#unshift`, but accepts a collection rather than varargs.
     *
     * Note: `unshiftAll` can be used in `withMutations`.
     */
    unshiftAll(iter: Iterable<T>): Stack<T>;

    /**
     * Returns a new Stack with a size ones less than this Stack, excluding
     * the first item in this Stack, shifting all other values to a lower index.
     *
     * Note: this differs from `Array#shift` because it returns a new
     * Stack rather than the removed value. Use `first()` or `peek()` to get the
     * first value in this Stack.
     *
     * Note: `shift` can be used in `withMutations`.
     */
    shift(): Stack<T>;

    /**
     * Alias for `Stack#unshift` and is not equivalent to `List#push`.
     */
    push(...values: Array<T>): Stack<T>;

    /**
     * Alias for `Stack#unshiftAll`.
     */
    pushAll(iter: Iterable<T>): Stack<T>;

    /**
     * Alias for `Stack#shift` and is not equivalent to `List#pop`.
     */
    pop(): Stack<T>;


    // Transient changes

    /**
     * Note: Not all methods can be used on a mutable collection or within
     * `withMutations`! Check the documentation for each method to see if it
     * mentions being safe to use in `withMutations`.
     *
     * @see `Map#withMutations`
     */
    withMutations(mutator: (mutable: this) => any): this;

    /**
     * Note: Not all methods can be used on a mutable collection or within
     * `withMutations`! Check the documentation for each method to see if it
     * mentions being safe to use in `withMutations`.
     *
     * @see `Map#asMutable`
     */
    asMutable(): this;

    /**
     * @see `Map#wasAltered`
     */
    wasAltered(): boolean;

    /**
     * @see `Map#asImmutable`
     */
    asImmutable(): this;

    // Sequence algorithms

    /**
     * Returns a new Stack with other collections concatenated to this one.
     */
    concat<C>(...valuesOrCollections: Array<Iterable<C> | C>): Stack<T | C>;

    /**
     * Returns a new Stack with values passed through a
     * `mapper` function.
     *
     *     Stack([ 1, 2 ]).map(x => 10 * x)
     *     // Stack [ 10, 20 ]
     *
     * Note: `map()` always returns a new instance, even if it produced the same
     * value at every step.
     */
    map<M>(
      mapper: (value: T, key: number, iter: this) => M,
      context?: any
    ): Stack<M>;

    /**
     * Flat-maps the Stack, returning a new Stack.
     *
     * Similar to `stack.map(...).flatten(true)`.
     */
    flatMap<M>(
      mapper: (value: T, key: number, iter: this) => Iterable<M>,
      context?: any
    ): Stack<M>;

    /**
     * Returns a new Set with only the values for which the `predicate`
     * function returns true.
     *
     * Note: `filter()` always returns a new instance, even if it results in
     * not filtering out any values.
     */
    filter<F extends T>(
      predicate: (value: T, index: number, iter: this) => value is F,
      context?: any
    ): Set<F>;
    filter(
      predicate: (value: T, index: number, iter: this) => any,
      context?: any
    ): this;

    /**
     * Returns a Stack "zipped" with the provided collections.
     *
     * Like `zipWith`, but using the default `zipper`: creating an `Array`.
     *
     * ```js
     * const a = Stack([ 1, 2, 3 ]);
     * const b = Stack([ 4, 5, 6 ]);
     * const c = a.zip(b); // Stack [ [ 1, 4 ], [ 2, 5 ], [ 3, 6 ] ]
     * ```
     */
    zip<U>(other: Collection<any, U>): Stack<[T,U]>;
    zip<U,V>(other: Collection<any, U>, other2: Collection<any,V>): Stack<[T,U,V]>;
    zip(...collections: Array<Collection<any, any>>): Stack<any>;

    /**
     * Returns a Stack "zipped" with the provided collections.
     *
     * Unlike `zip`, `zipAll` continues zipping until the longest collection is
     * exhausted. Missing values from shorter collections are filled with `undefined`.
     *
     * ```js
     * const a = Stack([ 1, 2 ]);
     * const b = Stack([ 3, 4, 5 ]);
     * const c = a.zipAll(b); // Stack [ [ 1, 3 ], [ 2, 4 ], [ undefined, 5 ] ]
     * ```
     *
     * Note: Since zipAll will return a collection as large as the largest
     * input, some results may contain undefined values. TypeScript cannot
     * account for these without cases (as of v2.5).
     */
    zipAll<U>(other: Collection<any, U>): Stack<[T,U]>;
    zipAll<U,V>(other: Collection<any, U>, other2: Collection<any,V>): Stack<[T,U,V]>;
    zipAll(...collections: Array<Collection<any, any>>): Stack<any>;

    /**
     * Returns a Stack "zipped" with the provided collections by using a
     * custom `zipper` function.
     *
     * ```js
     * const a = Stack([ 1, 2, 3 ]);
     * const b = Stack([ 4, 5, 6 ]);
     * const c = a.zipWith((a, b) => a + b, b);
     * // Stack [ 5, 7, 9 ]
     * ```
     */
    zipWith<U, Z>(
      zipper: (value: T, otherValue: U) => Z,
      otherCollection: Collection<any, U>
    ): Stack<Z>;
    zipWith<U, V, Z>(
      zipper: (value: T, otherValue: U, thirdValue: V) => Z,
      otherCollection: Collection<any, U>,
      thirdCollection: Collection<any, V>
    ): Stack<Z>;
    zipWith<Z>(
      zipper: (...any: Array<any>) => Z,
      ...collections: Array<Collection<any, any>>
    ): Stack<Z>;
  }


  /**
   * A record is similar to a JS object, but enforces a specific set of allowed
   * string keys, and has default values.
   *
   * The `Record()` function produces new Record Factories, which when called
   * create Record instances.
   *
   * ```js
   * const { Record } = require('immutable')
   * const ABRecord = Record({ a: 1, b: 2 })
   * const myRecord = ABRecord({ b: 3 })
   * ```
   *
   * Records always have a value for the keys they define. `remove`ing a key
   * from a record simply resets it to the default value for that key.
   *
   * ```js
   * myRecord.size // 2
   * myRecord.get('a') // 1
   * myRecord.get('b') // 3
   * const myRecordWithoutB = myRecord.remove('b')
   * myRecordWithoutB.get('b') // 2
   * myRecordWithoutB.size // 2
   * ```
   *
   * Values provided to the constructor not found in the Record type will
   * be ignored. For example, in this case, ABRecord is provided a key "x" even
   * though only "a" and "b" have been defined. The value for "x" will be
   * ignored for this record.
   *
   * ```js
   * const myRecord = ABRecord({ b: 3, x: 10 })
   * myRecord.get('x') // undefined
   * ```
   *
   * Because Records have a known set of string keys, property get access works
   * as expected, however property sets will throw an Error.
   *
   * Note: IE8 does not support property access. Only use `get()` when
   * supporting IE8.
   *
   * ```js
   * myRecord.b // 3
   * myRecord.b = 5 // throws Error
   * ```
   *
   * Record Types can be extended as well, allowing for custom methods on your
   * Record. This is not a common pattern in functional environments, but is in
   * many JS programs.
   *
   * However Record Types are more restricted than typical JavaScript classes.
   * They do not use a class constructor, which also means they cannot use
   * class properties (since those are technically part of a constructor).
   *
   * While Record Types can be syntactically created with the JavaScript `class`
   * form, the resulting Record function is actually a factory function, not a
   * class constructor. Even though Record Types are not classes, JavaScript
   * currently requires the use of `new` when creating new Record instances if
   * they are defined as a `class`.
   *
   * ```
   * class ABRecord extends Record({ a: 1, b: 2 }) {
   *   getAB() {
   *     return this.a + this.b;
   *   }
   * }
   *
   * var myRecord = new ABRecord({b: 3})
   * myRecord.getAB() // 4
   * ```
   *
   *
   * **Flow Typing Records:**
   *
   * Immutable.js exports two Flow types designed to make it easier to use
   * Records with flow typed code, `RecordOf<TProps>` and `RecordFactory<TProps>`.
   *
   * When defining a new kind of Record factory function, use a flow type that
   * describes the values the record contains along with `RecordFactory<TProps>`.
   * To type instances of the Record (which the factory function returns),
   * use `RecordOf<TProps>`.
   *
   * Typically, new Record definitions will export both the Record factory
   * function as well as the Record instance type for use in other code.
   *
   * ```js
   * import type { RecordFactory, RecordOf } from 'immutable';
   *
   * // Use RecordFactory<TProps> for defining new Record factory functions.
   * type Point3DProps = { x: number, y: number, z: number };
   * const defaultValues: Point3DProps = { x: 0, y: 0, z: 0 };
   * const makePoint3D: RecordFactory<Point3DProps> = Record(defaultValues);
   * export makePoint3D;
   *
   * // Use RecordOf<T> for defining new instances of that Record.
   * export type Point3D = RecordOf<Point3DProps>;
   * const some3DPoint: Point3D = makePoint3D({ x: 10, y: 20, z: 30 });
   * ```
   *
   * **Flow Typing Record Subclasses:**
   *
   * Records can be subclassed as a means to add additional methods to Record
   * instances. This is generally discouraged in favor of a more functional API,
   * since Subclasses have some minor overhead. However the ability to create
   * a rich API on Record types can be quite valuable.
   *
   * When using Flow to type Subclasses, do not use `RecordFactory<TProps>`,
   * instead apply the props type when subclassing:
   *
   * ```js
   * type PersonProps = {name: string, age: number};
   * const defaultValues: PersonProps = {name: 'Aristotle', age: 2400};
   * const PersonRecord = Record(defaultValues);
   * class Person extends PersonRecord<PersonProps> {
   *   getName(): string {
   *     return this.get('name')
   *   }
   *
   *   setName(name: string): this {
   *     return this.set('name', name);
   *   }
   * }
   * ```
   *
   * **Choosing Records vs plain JavaScript objects**
   *
   * Records offer a persistently immutable alternative to plain JavaScript
   * objects, however they're not required to be used within Immutable.js
   * collections. In fact, the deep-access and deep-updating functions
   * like `getIn()` and `setIn()` work with plain JavaScript Objects as well.
   *
   * Deciding to use Records or Objects in your application should be informed
   * by the tradeoffs and relative benefits of each:
   *
   * - *Runtime immutability*: plain JS objects may be carefully treated as
   *   immutable, however Record instances will *throw* if attempted to be
   *   mutated directly. Records provide this additional guarantee, however at
   *   some marginal runtime cost. While JS objects are mutable by nature, the
   *   use of type-checking tools like [Flow](https://medium.com/@gcanti/immutability-with-flow-faa050a1aef4)
   *   can help gain confidence in code written to favor immutability.
   *
   * - *Value equality*: Records use value equality when compared with `is()`
   *   or `record.equals()`. That is, two Records with the same keys and values
   *   are equal. Plain objects use *reference equality*. Two objects with the
   *   same keys and values are not equal since they are different objects.
   *   This is important to consider when using objects as keys in a `Map` or
   *   values in a `Set`, which use equality when retrieving values.
   *
   * - *API methods*: Records have a full featured API, with methods like
   *   `.getIn()`, and `.equals()`. These can make working with these values
   *   easier, but comes at the cost of not allowing keys with those names.
   *
   * - *Default values*: Records provide default values for every key, which
   *   can be useful when constructing Records with often unchanging values.
   *   However default values can make using Flow and TypeScript more laborious.
   *
   * - *Serialization*: Records use a custom internal representation to
   *   efficiently store and update their values. Converting to and from this
   *   form isn't free. If converting Records to plain objects is common,
   *   consider sticking with plain objects to begin with.
   */
  declare module Record$1 {

    /**
     * True if `maybeRecord` is an instance of a Record.
     */
    export function isRecord(maybeRecord: any): maybeRecord is Record$1<any>;

    /**
     * Records allow passing a second parameter to supply a descriptive name
     * that appears when converting a Record to a string or in any error
     * messages. A descriptive name for any record can be accessed by using this
     * method. If one was not provided, the string "Record" is returned.
     *
     * ```js
     * const { Record } = require('immutable')
     * const Person = Record({
     *   name: null
     * }, 'Person')
     *
     * var me = Person({ name: 'My Name' })
     * me.toString() // "Person { "name": "My Name" }"
     * Record.getDescriptiveName(me) // "Person"
     * ```
     */
    export function getDescriptiveName(record: Record$1<any>): string;

    /**
     * A Record.Factory is created by the `Record()` function. Record instances
     * are created by passing it some of the accepted values for that Record
     * type:
     *
     * <!-- runkit:activate
     *      { "preamble": "const { Record } = require('immutable')" }
     * -->
     * ```js
     * // makePerson is a Record Factory function
     * const makePerson = Record({ name: null, favoriteColor: 'unknown' });
     *
     * // alan is a Record instance
     * const alan = makePerson({ name: 'Alan' });
     * ```
     *
     * Note that Record Factories return `Record<TProps> & Readonly<TProps>`,
     * this allows use of both the Record instance API, and direct property
     * access on the resulting instances:
     *
     * <!-- runkit:activate
     *      { "preamble": "const { Record } = require('immutable');const makePerson = Record({ name: null, favoriteColor: 'unknown' });const alan = makePerson({ name: 'Alan' });" }
     * -->
     * ```js
     * // Use the Record API
     * console.log('Record API: ' + alan.get('name'))
     *
     * // Or direct property access (Readonly)
     * console.log('property access: ' + alan.name)
     * ```
     *
     * **Flow Typing Records:**
     *
     * Use the `RecordFactory<TProps>` Flow type to get high quality type checking of
     * Records:
     *
     * ```js
     * import type { RecordFactory, RecordOf } from 'immutable';
     *
     * // Use RecordFactory<TProps> for defining new Record factory functions.
     * type PersonProps = { name: ?string, favoriteColor: string };
     * const makePerson: RecordFactory<PersonProps> = Record({ name: null, favoriteColor: 'unknown' });
     *
     * // Use RecordOf<T> for defining new instances of that Record.
     * type Person = RecordOf<PersonProps>;
     * const alan: Person = makePerson({ name: 'Alan' });
     * ```
     */
    export module Factory {}

    export interface Factory<TProps extends Object> {
      (values?: Partial<TProps> | Iterable<[string, any]>): Record$1<TProps> & Readonly<TProps>;
      new (values?: Partial<TProps> | Iterable<[string, any]>): Record$1<TProps> & Readonly<TProps>;
    }

    export function Factory<TProps extends Object>(values?: Partial<TProps> | Iterable<[string, any]>): Record$1<TProps> & Readonly<TProps>;
  }

  /**
   * Unlike other types in Immutable.js, the `Record()` function creates a new
   * Record Factory, which is a function that creates Record instances.
   *
   * See above for examples of using `Record()`.
   *
   * Note: `Record` is a factory function and not a class, and does not use the
   * `new` keyword during construction.
   */
  declare function Record$1<TProps>(defaultValues: TProps, name?: string): Record$1.Factory<TProps>;

  interface Record$1<TProps extends Object> {

    // Reading values

    has(key: string): key is keyof TProps & string;

    /**
     * Returns the value associated with the provided key, which may be the
     * default value defined when creating the Record factory function.
     *
     * If the requested key is not defined by this Record type, then
     * notSetValue will be returned if provided. Note that this scenario would
     * produce an error when using Flow or TypeScript.
     */
    get<K extends keyof TProps>(key: K, notSetValue?: any): TProps[K];
    get<T>(key: string, notSetValue: T): T;

    // Reading deep values

    hasIn(keyPath: Iterable<any>): boolean;
    getIn(keyPath: Iterable<any>): any;

    // Value equality

    equals(other: any): boolean;
    hashCode(): number;

    // Persistent changes

    set<K extends keyof TProps>(key: K, value: TProps[K]): this;
    update<K extends keyof TProps>(key: K, updater: (value: TProps[K]) => TProps[K]): this;
    merge(...collections: Array<Partial<TProps> | Iterable<[string, any]>>): this;
    mergeDeep(...collections: Array<Partial<TProps> | Iterable<[string, any]>>): this;

    mergeWith(
      merger: (oldVal: any, newVal: any, key: keyof TProps) => any,
      ...collections: Array<Partial<TProps> | Iterable<[string, any]>>
    ): this;
    mergeDeepWith(
      merger: (oldVal: any, newVal: any, key: any) => any,
      ...collections: Array<Partial<TProps> | Iterable<[string, any]>>
    ): this;

    /**
     * Returns a new instance of this Record type with the value for the
     * specific key set to its default value.
     *
     * @alias remove
     */
    delete<K extends keyof TProps>(key: K): this;
    remove<K extends keyof TProps>(key: K): this;

    /**
     * Returns a new instance of this Record type with all values set
     * to their default values.
     */
    clear(): this;

    // Deep persistent changes

    setIn(keyPath: Iterable<any>, value: any): this;
    updateIn(keyPath: Iterable<any>, updater: (value: any) => any): this;
    mergeIn(keyPath: Iterable<any>, ...collections: Array<any>): this;
    mergeDeepIn(keyPath: Iterable<any>, ...collections: Array<any>): this;

    /**
     * @alias removeIn
     */
    deleteIn(keyPath: Iterable<any>): this;
    removeIn(keyPath: Iterable<any>): this;

    // Conversion to JavaScript types

    /**
     * Deeply converts this Record to equivalent native JavaScript Object.
     *
     * Note: This method may not be overridden. Objects with custom
     * serialization to plain JS may override toJSON() instead.
     */
    toJS(): { [K in keyof TProps]: any };

    /**
     * Shallowly converts this Record to equivalent native JavaScript Object.
     */
    toJSON(): TProps;

    /**
     * Shallowly converts this Record to equivalent JavaScript Object.
     */
    toObject(): TProps;

    // Transient changes

    /**
     * Note: Not all methods can be used on a mutable collection or within
     * `withMutations`! Only `set` may be used mutatively.
     *
     * @see `Map#withMutations`
     */
    withMutations(mutator: (mutable: this) => any): this;

    /**
     * @see `Map#asMutable`
     */
    asMutable(): this;

    /**
     * @see `Map#wasAltered`
     */
    wasAltered(): boolean;

    /**
     * @see `Map#asImmutable`
     */
    asImmutable(): this;

    // Sequence algorithms

    toSeq(): Seq.Keyed<keyof TProps, TProps[keyof TProps]>;

    [Symbol.iterator](): IterableIterator<[keyof TProps, TProps[keyof TProps]]>;
  }

  /**
   * `Seq` describes a lazy operation, allowing them to efficiently chain
   * use of all the higher-order collection methods (such as `map` and `filter`)
   * by not creating intermediate collections.
   *
   * **Seq is immutable** — Once a Seq is created, it cannot be
   * changed, appended to, rearranged or otherwise modified. Instead, any
   * mutative method called on a `Seq` will return a new `Seq`.
   *
   * **Seq is lazy** — `Seq` does as little work as necessary to respond to any
   * method call. Values are often created during iteration, including implicit
   * iteration when reducing or converting to a concrete data structure such as
   * a `List` or JavaScript `Array`.
   *
   * For example, the following performs no work, because the resulting
   * `Seq`'s values are never iterated:
   *
   * ```js
   * const { Seq } = require('immutable')
   * const oddSquares = Seq([ 1, 2, 3, 4, 5, 6, 7, 8 ])
   *   .filter(x => x % 2 !== 0)
   *   .map(x => x * x)
   * ```
   *
   * Once the `Seq` is used, it performs only the work necessary. In this
   * example, no intermediate arrays are ever created, filter is called three
   * times, and map is only called once:
   *
   * ```js
   * oddSquares.get(1); // 9
   * ```
   *
   * Any collection can be converted to a lazy Seq with `Seq()`.
   *
   * <!-- runkit:activate -->
   * ```js
   * const { Map } = require('immutable')
   * const map = Map({ a: 1, b: 2, c: 3 }
   * const lazySeq = Seq(map)
   * ```
   *
   * `Seq` allows for the efficient chaining of operations, allowing for the
   * expression of logic that can otherwise be very tedious:
   *
   * ```js
   * lazySeq
   *   .flip()
   *   .map(key => key.toUpperCase())
   *   .flip()
   * // Seq { A: 1, B: 1, C: 1 }
   * ```
   *
   * As well as expressing logic that would otherwise seem memory or time
   * limited, for example `Range` is a special kind of Lazy sequence.
   *
   * <!-- runkit:activate -->
   * ```js
   * const { Range } = require('immutable')
   * Range(1, Infinity)
   *   .skip(1000)
   *   .map(n => -n)
   *   .filter(n => n % 2 === 0)
   *   .take(2)
   *   .reduce((r, n) => r * n, 1)
   * // 1006008
   * ```
   *
   * Seq is often used to provide a rich collection API to JavaScript Object.
   *
   * ```js
   * Seq({ x: 0, y: 1, z: 2 }).map(v => v * 2).toObject();
   * // { x: 0, y: 2, z: 4 }
   * ```
   */

  declare module Seq {
    /**
     * True if `maybeSeq` is a Seq, it is not backed by a concrete
     * structure such as Map, List, or Set.
     */
    function isSeq(maybeSeq: any): maybeSeq is Seq.Indexed<any> | Seq.Keyed<any, any> | Seq.Set<any>;


    /**
     * `Seq` which represents key-value pairs.
     */
    export module Keyed {}

    /**
     * Always returns a Seq.Keyed, if input is not keyed, expects an
     * collection of [K, V] tuples.
     *
     * Note: `Seq.Keyed` is a conversion function and not a class, and does not
     * use the `new` keyword during construction.
     */
    export function Keyed<K, V>(collection: Iterable<[K, V]>): Seq.Keyed<K, V>;
    export function Keyed<V>(obj: {[key: string]: V}): Seq.Keyed<string, V>;
    export function Keyed<K, V>(): Seq.Keyed<K, V>;
    export function Keyed(): Seq.Keyed<any, any>;

    export interface Keyed<K, V> extends Seq<K, V>, Collection.Keyed<K, V> {
      /**
       * Deeply converts this Keyed Seq to equivalent native JavaScript Object.
       *
       * Converts keys to Strings.
       */
      toJS(): Object;

      /**
       * Shallowly converts this Keyed Seq to equivalent native JavaScript Object.
       *
       * Converts keys to Strings.
       */
      toJSON(): { [key: string]: V };

      /**
       * Shallowly converts this collection to an Array.
       */
      toArray(): Array<[K, V]>;

      /**
       * Returns itself
       */
      toSeq(): this;

      /**
       * Returns a new Seq with other collections concatenated to this one.
       *
       * All entries will be present in the resulting Seq, even if they
       * have the same key.
       */
      concat<KC, VC>(...collections: Array<Iterable<[KC, VC]>>): Seq.Keyed<K | KC, V | VC>;
      concat<C>(...collections: Array<{[key: string]: C}>): Seq.Keyed<K | string, V | C>;

      /**
       * Returns a new Seq.Keyed with values passed through a
       * `mapper` function.
       *
       * ```js
       * const { Seq } = require('immutable')
       * Seq.Keyed({ a: 1, b: 2 }).map(x => 10 * x)
       * // Seq { "a": 10, "b": 20 }
       * ```
       *
       * Note: `map()` always returns a new instance, even if it produced the
       * same value at every step.
       */
      map<M>(
        mapper: (value: V, key: K, iter: this) => M,
        context?: any
      ): Seq.Keyed<K, M>;

      /**
       * @see Collection.Keyed.mapKeys
       */
      mapKeys<M>(
        mapper: (key: K, value: V, iter: this) => M,
        context?: any
      ): Seq.Keyed<M, V>;

      /**
       * @see Collection.Keyed.mapEntries
       */
      mapEntries<KM, VM>(
        mapper: (entry: [K, V], index: number, iter: this) => [KM, VM],
        context?: any
      ): Seq.Keyed<KM, VM>;

      /**
       * Flat-maps the Seq, returning a Seq of the same type.
       *
       * Similar to `seq.map(...).flatten(true)`.
       */
      flatMap<KM, VM>(
        mapper: (value: V, key: K, iter: this) => Iterable<[KM, VM]>,
        context?: any
      ): Seq.Keyed<KM, VM>;

      /**
       * Returns a new Seq with only the entries for which the `predicate`
       * function returns true.
       *
       * Note: `filter()` always returns a new instance, even if it results in
       * not filtering out any values.
       */
      filter<F extends V>(
        predicate: (value: V, key: K, iter: this) => value is F,
        context?: any
      ): Seq.Keyed<K, F>;
      filter(
        predicate: (value: V, key: K, iter: this) => any,
        context?: any
      ): this;

      /**
       * @see Collection.Keyed.flip
       */
      flip(): Seq.Keyed<V, K>;
    }


    /**
     * `Seq` which represents an ordered indexed list of values.
     */
    module Indexed {

      /**
       * Provides an Seq.Indexed of the values provided.
       */
      function of<T>(...values: Array<T>): Seq.Indexed<T>;
    }

    /**
     * Always returns Seq.Indexed, discarding associated keys and
     * supplying incrementing indices.
     *
     * Note: `Seq.Indexed` is a conversion function and not a class, and does
     * not use the `new` keyword during construction.
     */
    export function Indexed(): Seq.Indexed<any>;
    export function Indexed<T>(): Seq.Indexed<T>;
    export function Indexed<T>(collection: Iterable<T>): Seq.Indexed<T>;

    export interface Indexed<T> extends Seq<number, T>, Collection.Indexed<T> {
      /**
       * Deeply converts this Indexed Seq to equivalent native JavaScript Array.
       */
      toJS(): Array<any>;

      /**
       * Shallowly converts this Indexed Seq to equivalent native JavaScript Array.
       */
      toJSON(): Array<T>;

      /**
       * Shallowly converts this collection to an Array.
       */
      toArray(): Array<T>;

      /**
       * Returns itself
       */
      toSeq(): this

      /**
       * Returns a new Seq with other collections concatenated to this one.
       */
      concat<C>(...valuesOrCollections: Array<Iterable<C> | C>): Seq.Indexed<T | C>;

      /**
       * Returns a new Seq.Indexed with values passed through a
       * `mapper` function.
       *
       * ```js
       * const { Seq } = require('immutable')
       * Seq.Indexed([ 1, 2 ]).map(x => 10 * x)
       * // Seq [ 10, 20 ]
       * ```
       *
       * Note: `map()` always returns a new instance, even if it produced the
       * same value at every step.
       */
      map<M>(
        mapper: (value: T, key: number, iter: this) => M,
        context?: any
      ): Seq.Indexed<M>;

      /**
       * Flat-maps the Seq, returning a a Seq of the same type.
       *
       * Similar to `seq.map(...).flatten(true)`.
       */
      flatMap<M>(
        mapper: (value: T, key: number, iter: this) => Iterable<M>,
        context?: any
      ): Seq.Indexed<M>;

      /**
       * Returns a new Seq with only the values for which the `predicate`
       * function returns true.
       *
       * Note: `filter()` always returns a new instance, even if it results in
       * not filtering out any values.
       */
      filter<F extends T>(
        predicate: (value: T, index: number, iter: this) => value is F,
        context?: any
      ): Seq.Indexed<F>;
      filter(
        predicate: (value: T, index: number, iter: this) => any,
        context?: any
      ): this;

      /**
       * Returns a Seq "zipped" with the provided collections.
       *
       * Like `zipWith`, but using the default `zipper`: creating an `Array`.
       *
       * ```js
       * const a = Seq([ 1, 2, 3 ]);
       * const b = Seq([ 4, 5, 6 ]);
       * const c = a.zip(b); // Seq [ [ 1, 4 ], [ 2, 5 ], [ 3, 6 ] ]
       * ```
       */
      zip<U>(other: Collection<any, U>): Seq.Indexed<[T,U]>;
      zip<U,V>(other: Collection<any, U>, other2: Collection<any, V>): Seq.Indexed<[T,U,V]>;
      zip(...collections: Array<Collection<any, any>>): Seq.Indexed<any>;

      /**
       * Returns a Seq "zipped" with the provided collections.
       *
       * Unlike `zip`, `zipAll` continues zipping until the longest collection is
       * exhausted. Missing values from shorter collections are filled with `undefined`.
       *
       * ```js
       * const a = Seq([ 1, 2 ]);
       * const b = Seq([ 3, 4, 5 ]);
       * const c = a.zipAll(b); // Seq [ [ 1, 3 ], [ 2, 4 ], [ undefined, 5 ] ]
       * ```
       */
      zipAll<U>(other: Collection<any, U>): Seq.Indexed<[T,U]>;
      zipAll<U,V>(other: Collection<any, U>, other2: Collection<any, V>): Seq.Indexed<[T,U,V]>;
      zipAll(...collections: Array<Collection<any, any>>): Seq.Indexed<any>;

      /**
       * Returns a Seq "zipped" with the provided collections by using a
       * custom `zipper` function.
       *
       * ```js
       * const a = Seq([ 1, 2, 3 ]);
       * const b = Seq([ 4, 5, 6 ]);
       * const c = a.zipWith((a, b) => a + b, b);
       * // Seq [ 5, 7, 9 ]
       * ```
       */
      zipWith<U, Z>(
        zipper: (value: T, otherValue: U) => Z,
        otherCollection: Collection<any, U>
      ): Seq.Indexed<Z>;
      zipWith<U, V, Z>(
        zipper: (value: T, otherValue: U, thirdValue: V) => Z,
        otherCollection: Collection<any, U>,
        thirdCollection: Collection<any, V>
      ): Seq.Indexed<Z>;
      zipWith<Z>(
        zipper: (...any: Array<any>) => Z,
        ...collections: Array<Collection<any, any>>
      ): Seq.Indexed<Z>;
    }


    /**
     * `Seq` which represents a set of values.
     *
     * Because `Seq` are often lazy, `Seq.Set` does not provide the same guarantee
     * of value uniqueness as the concrete `Set`.
     */
    export module Set {

      /**
       * Returns a Seq.Set of the provided values
       */
      function of<T>(...values: Array<T>): Seq.Set<T>;
    }

    /**
     * Always returns a Seq.Set, discarding associated indices or keys.
     *
     * Note: `Seq.Set` is a conversion function and not a class, and does not
     * use the `new` keyword during construction.
     */
    export function Set(): Seq.Set<any>;
    export function Set<T>(): Seq.Set<T>;
    export function Set<T>(collection: Iterable<T>): Seq.Set<T>;

    export interface Set<T> extends Seq<T, T>, Collection.Set<T> {
      /**
       * Deeply converts this Set Seq to equivalent native JavaScript Array.
       */
      toJS(): Array<any>;

      /**
       * Shallowly converts this Set Seq to equivalent native JavaScript Array.
       */
      toJSON(): Array<T>;

      /**
       * Shallowly converts this collection to an Array.
       */
      toArray(): Array<T>;

      /**
       * Returns itself
       */
      toSeq(): this

      /**
       * Returns a new Seq with other collections concatenated to this one.
       *
       * All entries will be present in the resulting Seq, even if they
       * are duplicates.
       */
      concat<U>(...collections: Array<Iterable<U>>): Seq.Set<T | U>;

      /**
       * Returns a new Seq.Set with values passed through a
       * `mapper` function.
       *
       * ```js
       * Seq.Set([ 1, 2 ]).map(x => 10 * x)
       * // Seq { 10, 20 }
       * ```
       *
       * Note: `map()` always returns a new instance, even if it produced the
       * same value at every step.
       */
      map<M>(
        mapper: (value: T, key: T, iter: this) => M,
        context?: any
      ): Seq.Set<M>;

      /**
       * Flat-maps the Seq, returning a Seq of the same type.
       *
       * Similar to `seq.map(...).flatten(true)`.
       */
      flatMap<M>(
        mapper: (value: T, key: T, iter: this) => Iterable<M>,
        context?: any
      ): Seq.Set<M>;

      /**
       * Returns a new Seq with only the values for which the `predicate`
       * function returns true.
       *
       * Note: `filter()` always returns a new instance, even if it results in
       * not filtering out any values.
       */
      filter<F extends T>(
        predicate: (value: T, key: T, iter: this) => value is F,
        context?: any
      ): Seq.Set<F>;
      filter(
        predicate: (value: T, key: T, iter: this) => any,
        context?: any
      ): this;
    }

  }

  /**
   * Creates a Seq.
   *
   * Returns a particular kind of `Seq` based on the input.
   *
   *   * If a `Seq`, that same `Seq`.
   *   * If an `Collection`, a `Seq` of the same kind (Keyed, Indexed, or Set).
   *   * If an Array-like, an `Seq.Indexed`.
   *   * If an Iterable Object, an `Seq.Indexed`.
   *   * If an Object, a `Seq.Keyed`.
   *
   * Note: An Iterator itself will be treated as an object, becoming a `Seq.Keyed`,
   * which is usually not what you want. You should turn your Iterator Object into
   * an iterable object by defining a Symbol.iterator (or @@iterator) method which
   * returns `this`.
   *
   * Note: `Seq` is a conversion function and not a class, and does not use the
   * `new` keyword during construction.
   */
  declare function Seq<S extends Seq<any, any>>(seq: S): S;
  declare function Seq<K, V>(collection: Collection.Keyed<K, V>): Seq.Keyed<K, V>;
  declare function Seq<T>(collection: Collection.Indexed<T>): Seq.Indexed<T>;
  declare function Seq<T>(collection: Collection.Set<T>): Seq.Set<T>;
  declare function Seq<T>(collection: Iterable<T>): Seq.Indexed<T>;
  declare function Seq<V>(obj: {[key: string]: V}): Seq.Keyed<string, V>;
  declare function Seq(): Seq<any, any>;

  interface Seq<K, V> extends Collection<K, V> {

    /**
     * Some Seqs can describe their size lazily. When this is the case,
     * size will be an integer. Otherwise it will be undefined.
     *
     * For example, Seqs returned from `map()` or `reverse()`
     * preserve the size of the original `Seq` while `filter()` does not.
     *
     * Note: `Range`, `Repeat` and `Seq`s made from `Array`s and `Object`s will
     * always have a size.
     */
    readonly size: number | undefined;


    // Force evaluation

    /**
     * Because Sequences are lazy and designed to be chained together, they do
     * not cache their results. For example, this map function is called a total
     * of 6 times, as each `join` iterates the Seq of three values.
     *
     *     var squares = Seq([ 1, 2, 3 ]).map(x => x * x)
     *     squares.join() + squares.join()
     *
     * If you know a `Seq` will be used multiple times, it may be more
     * efficient to first cache it in memory. Here, the map function is called
     * only 3 times.
     *
     *     var squares = Seq([ 1, 2, 3 ]).map(x => x * x).cacheResult()
     *     squares.join() + squares.join()
     *
     * Use this method judiciously, as it must fully evaluate a Seq which can be
     * a burden on memory and possibly performance.
     *
     * Note: after calling `cacheResult`, a Seq will always have a `size`.
     */
    cacheResult(): this;

    // Sequence algorithms

    /**
     * Returns a new Seq with values passed through a
     * `mapper` function.
     *
     * ```js
     * const { Seq } = require('immutable')
     * Seq([ 1, 2 ]).map(x => 10 * x)
     * // Seq [ 10, 20 ]
     * ```
     *
     * Note: `map()` always returns a new instance, even if it produced the same
     * value at every step.
     */
    map<M>(
      mapper: (value: V, key: K, iter: this) => M,
      context?: any
    ): Seq<K, M>;

    /**
     * Returns a new Seq with values passed through a
     * `mapper` function.
     *
     * ```js
     * const { Seq } = require('immutable')
     * Seq([ 1, 2 ]).map(x => 10 * x)
     * // Seq [ 10, 20 ]
     * ```
     *
     * Note: `map()` always returns a new instance, even if it produced the same
     * value at every step.
     * Note: used only for sets.
     */
    map<M>(
      mapper: (value: V, key: K, iter: this) => M,
      context?: any
    ): Seq<M, M>;

    /**
     * Flat-maps the Seq, returning a Seq of the same type.
     *
     * Similar to `seq.map(...).flatten(true)`.
     */
    flatMap<M>(
      mapper: (value: V, key: K, iter: this) => Iterable<M>,
      context?: any
    ): Seq<K, M>;

    /**
     * Flat-maps the Seq, returning a Seq of the same type.
     *
     * Similar to `seq.map(...).flatten(true)`.
     * Note: Used only for sets.
     */
    flatMap<M>(
      mapper: (value: V, key: K, iter: this) => Iterable<M>,
      context?: any
    ): Seq<M, M>;

    /**
     * Returns a new Seq with only the values for which the `predicate`
     * function returns true.
     *
     * Note: `filter()` always returns a new instance, even if it results in
     * not filtering out any values.
     */
    filter<F extends V>(
      predicate: (value: V, key: K, iter: this) => value is F,
      context?: any
    ): Seq<K, F>;
    filter(
      predicate: (value: V, key: K, iter: this) => any,
      context?: any
    ): this;
  }

  /**
   * The `Collection` is a set of (key, value) entries which can be iterated, and
   * is the base class for all collections in `immutable`, allowing them to
   * make use of all the Collection methods (such as `map` and `filter`).
   *
   * Note: A collection is always iterated in the same order, however that order
   * may not always be well defined, as is the case for the `Map` and `Set`.
   *
   * Collection is the abstract base class for concrete data structures. It
   * cannot be constructed directly.
   *
   * Implementations should extend one of the subclasses, `Collection.Keyed`,
   * `Collection.Indexed`, or `Collection.Set`.
   */
  declare module Collection {

    /**
     * @deprecated use `const { isKeyed } = require('immutable')`
     */
    function isKeyed(maybeKeyed: any): maybeKeyed is Collection.Keyed<any, any>;

    /**
     * @deprecated use `const { isIndexed } = require('immutable')`
     */
    function isIndexed(maybeIndexed: any): maybeIndexed is Collection.Indexed<any>;

    /**
     * @deprecated use `const { isAssociative } = require('immutable')`
     */
    function isAssociative(maybeAssociative: any): maybeAssociative is Collection.Keyed<any, any> | Collection.Indexed<any>;

    /**
     * @deprecated use `const { isOrdered } = require('immutable')`
     */
    function isOrdered(maybeOrdered: any): boolean;


    /**
     * Keyed Collections have discrete keys tied to each value.
     *
     * When iterating `Collection.Keyed`, each iteration will yield a `[K, V]`
     * tuple, in other words, `Collection#entries` is the default iterator for
     * Keyed Collections.
     */
    export module Keyed {}

    /**
     * Creates a Collection.Keyed
     *
     * Similar to `Collection()`, however it expects collection-likes of [K, V]
     * tuples if not constructed from a Collection.Keyed or JS Object.
     *
     * Note: `Collection.Keyed` is a conversion function and not a class, and
     * does not use the `new` keyword during construction.
     */
    export function Keyed<K, V>(collection: Iterable<[K, V]>): Collection.Keyed<K, V>;
    export function Keyed<V>(obj: {[key: string]: V}): Collection.Keyed<string, V>;

    export interface Keyed<K, V> extends Collection<K, V> {
      /**
       * Deeply converts this Keyed collection to equivalent native JavaScript Object.
       *
       * Converts keys to Strings.
       */
      toJS(): Object;

      /**
       * Shallowly converts this Keyed collection to equivalent native JavaScript Object.
       *
       * Converts keys to Strings.
       */
      toJSON(): { [key: string]: V };

      /**
       * Shallowly converts this collection to an Array.
       */
      toArray(): Array<[K, V]>;

      /**
       * Returns Seq.Keyed.
       * @override
       */
      toSeq(): Seq.Keyed<K, V>;


      // Sequence functions

      /**
       * Returns a new Collection.Keyed of the same type where the keys and values
       * have been flipped.
       *
       * <!-- runkit:activate -->
       * ```js
       * const { Map } = require('immutable')
       * Map({ a: 'z', b: 'y' }).flip()
       * // Map { "z": "a", "y": "b" }
       * ```
       */
      flip(): Collection.Keyed<V, K>;

      /**
       * Returns a new Collection with other collections concatenated to this one.
       */
      concat<KC, VC>(...collections: Array<Iterable<[KC, VC]>>): Collection.Keyed<K | KC, V | VC>;
      concat<C>(...collections: Array<{[key: string]: C}>): Collection.Keyed<K | string, V | C>;

      /**
       * Returns a new Collection.Keyed with values passed through a
       * `mapper` function.
       *
       * ```js
       * const { Collection } = require('immutable')
       * Collection.Keyed({ a: 1, b: 2 }).map(x => 10 * x)
       * // Seq { "a": 10, "b": 20 }
       * ```
       *
       * Note: `map()` always returns a new instance, even if it produced the
       * same value at every step.
       */
      map<M>(
        mapper: (value: V, key: K, iter: this) => M,
        context?: any
      ): Collection.Keyed<K, M>;

      /**
       * Returns a new Collection.Keyed of the same type with keys passed through
       * a `mapper` function.
       *
       * <!-- runkit:activate -->
       * ```js
       * const { Map } = require('immutable')
       * Map({ a: 1, b: 2 }).mapKeys(x => x.toUpperCase())
       * // Map { "A": 1, "B": 2 }
       * ```
       *
       * Note: `mapKeys()` always returns a new instance, even if it produced
       * the same key at every step.
       */
      mapKeys<M>(
        mapper: (key: K, value: V, iter: this) => M,
        context?: any
      ): Collection.Keyed<M, V>;

      /**
       * Returns a new Collection.Keyed of the same type with entries
       * ([key, value] tuples) passed through a `mapper` function.
       *
       * <!-- runkit:activate -->
       * ```js
       * const { Map } = require('immutable')
       * Map({ a: 1, b: 2 })
       *   .mapEntries(([ k, v ]) => [ k.toUpperCase(), v * 2 ])
       * // Map { "A": 2, "B": 4 }
       * ```
       *
       * Note: `mapEntries()` always returns a new instance, even if it produced
       * the same entry at every step.
       */
      mapEntries<KM, VM>(
        mapper: (entry: [K, V], index: number, iter: this) => [KM, VM],
        context?: any
      ): Collection.Keyed<KM, VM>;

      /**
       * Flat-maps the Collection, returning a Collection of the same type.
       *
       * Similar to `collection.map(...).flatten(true)`.
       */
      flatMap<KM, VM>(
        mapper: (value: V, key: K, iter: this) => Iterable<[KM, VM]>,
        context?: any
      ): Collection.Keyed<KM, VM>;

      /**
       * Returns a new Collection with only the values for which the `predicate`
       * function returns true.
       *
       * Note: `filter()` always returns a new instance, even if it results in
       * not filtering out any values.
       */
      filter<F extends V>(
        predicate: (value: V, key: K, iter: this) => value is F,
        context?: any
      ): Collection.Keyed<K, F>;
      filter(
        predicate: (value: V, key: K, iter: this) => any,
        context?: any
      ): this;

      [Symbol.iterator](): IterableIterator<[K, V]>;
    }


    /**
     * Indexed Collections have incrementing numeric keys. They exhibit
     * slightly different behavior than `Collection.Keyed` for some methods in order
     * to better mirror the behavior of JavaScript's `Array`, and add methods
     * which do not make sense on non-indexed Collections such as `indexOf`.
     *
     * Unlike JavaScript arrays, `Collection.Indexed`s are always dense. "Unset"
     * indices and `undefined` indices are indistinguishable, and all indices from
     * 0 to `size` are visited when iterated.
     *
     * All Collection.Indexed methods return re-indexed Collections. In other words,
     * indices always start at 0 and increment until size. If you wish to
     * preserve indices, using them as keys, convert to a Collection.Keyed by
     * calling `toKeyedSeq`.
     */
    export module Indexed {}

    /**
     * Creates a new Collection.Indexed.
     *
     * Note: `Collection.Indexed` is a conversion function and not a class, and
     * does not use the `new` keyword during construction.
     */
    export function Indexed<T>(collection: Iterable<T>): Collection.Indexed<T>;

    export interface Indexed<T> extends Collection<number, T> {
      /**
       * Deeply converts this Indexed collection to equivalent native JavaScript Array.
       */
      toJS(): Array<any>;

      /**
       * Shallowly converts this Indexed collection to equivalent native JavaScript Array.
       */
      toJSON(): Array<T>;

      /**
       * Shallowly converts this collection to an Array.
       */
      toArray(): Array<T>;

      // Reading values

      /**
       * Returns the value associated with the provided index, or notSetValue if
       * the index is beyond the bounds of the Collection.
       *
       * `index` may be a negative number, which indexes back from the end of the
       * Collection. `s.get(-1)` gets the last item in the Collection.
       */
      get<NSV>(index: number, notSetValue: NSV): T | NSV;
      get(index: number): T | undefined;


      // Conversion to Seq

      /**
       * Returns Seq.Indexed.
       * @override
       */
      toSeq(): Seq.Indexed<T>;

      /**
       * If this is a collection of [key, value] entry tuples, it will return a
       * Seq.Keyed of those entries.
       */
      fromEntrySeq(): Seq.Keyed<any, any>;


      // Combination

      /**
       * Returns a Collection of the same type with `separator` between each item
       * in this Collection.
       */
      interpose(separator: T): this;

      /**
       * Returns a Collection of the same type with the provided `collections`
       * interleaved into this collection.
       *
       * The resulting Collection includes the first item from each, then the
       * second from each, etc.
       *
       * <!-- runkit:activate
       *      { "preamble": "require('immutable')"}
       * -->
       * ```js
       * const { List } = require('immutable')
       * List([ 1, 2, 3 ]).interleave(List([ 'A', 'B', 'C' ]))
       * // List [ 1, "A", 2, "B", 3, "C"" ]
       * ```
       *
       * The shortest Collection stops interleave.
       *
       * <!-- runkit:activate
       *      { "preamble": "const { List } = require('immutable')" }
       * -->
       * ```js
       * List([ 1, 2, 3 ]).interleave(
       *   List([ 'A', 'B' ]),
       *   List([ 'X', 'Y', 'Z' ])
       * )
       * // List [ 1, "A", "X", 2, "B", "Y"" ]
       * ```
       *
       * Since `interleave()` re-indexes values, it produces a complete copy,
       * which has `O(N)` complexity.
       *
       * Note: `interleave` *cannot* be used in `withMutations`.
       */
      interleave(...collections: Array<Collection<any, T>>): this;

      /**
       * Splice returns a new indexed Collection by replacing a region of this
       * Collection with new values. If values are not provided, it only skips the
       * region to be removed.
       *
       * `index` may be a negative number, which indexes back from the end of the
       * Collection. `s.splice(-2)` splices after the second to last item.
       *
       * <!-- runkit:activate -->
       * ```js
       * const { List } = require('immutable')
       * List([ 'a', 'b', 'c', 'd' ]).splice(1, 2, 'q', 'r', 's')
       * // List [ "a", "q", "r", "s", "d" ]
       * ```
       *
       * Since `splice()` re-indexes values, it produces a complete copy, which
       * has `O(N)` complexity.
       *
       * Note: `splice` *cannot* be used in `withMutations`.
       */
      splice(
        index: number,
        removeNum: number,
        ...values: Array<T>
      ): this;

      /**
       * Returns a Collection of the same type "zipped" with the provided
       * collections.
       *
       * Like `zipWith`, but using the default `zipper`: creating an `Array`.
       *
       *
       * <!-- runkit:activate
       *      { "preamble": "const { List } = require('immutable')" }
       * -->
       * ```js
       * const a = List([ 1, 2, 3 ]);
       * const b = List([ 4, 5, 6 ]);
       * const c = a.zip(b); // List [ [ 1, 4 ], [ 2, 5 ], [ 3, 6 ] ]
       * ```
       */
      zip<U>(other: Collection<any, U>): Collection.Indexed<[T,U]>;
      zip<U,V>(other: Collection<any, U>, other2: Collection<any, V>): Collection.Indexed<[T,U,V]>;
      zip(...collections: Array<Collection<any, any>>): Collection.Indexed<any>;

      /**
       * Returns a Collection "zipped" with the provided collections.
       *
       * Unlike `zip`, `zipAll` continues zipping until the longest collection is
       * exhausted. Missing values from shorter collections are filled with `undefined`.
       *
       * ```js
       * const a = List([ 1, 2 ]);
       * const b = List([ 3, 4, 5 ]);
       * const c = a.zipAll(b); // List [ [ 1, 3 ], [ 2, 4 ], [ undefined, 5 ] ]
       * ```
       */
      zipAll<U>(other: Collection<any, U>): Collection.Indexed<[T,U]>;
      zipAll<U,V>(other: Collection<any, U>, other2: Collection<any, V>): Collection.Indexed<[T,U,V]>;
      zipAll(...collections: Array<Collection<any, any>>): Collection.Indexed<any>;

      /**
       * Returns a Collection of the same type "zipped" with the provided
       * collections by using a custom `zipper` function.
       *
       * <!-- runkit:activate
       *      { "preamble": "const { List } = require('immutable')" }
       * -->
       * ```js
       * const a = List([ 1, 2, 3 ]);
       * const b = List([ 4, 5, 6 ]);
       * const c = a.zipWith((a, b) => a + b, b);
       * // List [ 5, 7, 9 ]
       * ```
       */
      zipWith<U, Z>(
        zipper: (value: T, otherValue: U) => Z,
        otherCollection: Collection<any, U>
      ): Collection.Indexed<Z>;
      zipWith<U, V, Z>(
        zipper: (value: T, otherValue: U, thirdValue: V) => Z,
        otherCollection: Collection<any, U>,
        thirdCollection: Collection<any, V>
      ): Collection.Indexed<Z>;
      zipWith<Z>(
        zipper: (...any: Array<any>) => Z,
        ...collections: Array<Collection<any, any>>
      ): Collection.Indexed<Z>;


      // Search for value

      /**
       * Returns the first index at which a given value can be found in the
       * Collection, or -1 if it is not present.
       */
      indexOf(searchValue: T): number;

      /**
       * Returns the last index at which a given value can be found in the
       * Collection, or -1 if it is not present.
       */
      lastIndexOf(searchValue: T): number;

      /**
       * Returns the first index in the Collection where a value satisfies the
       * provided predicate function. Otherwise -1 is returned.
       */
      findIndex(
        predicate: (value: T, index: number, iter: this) => boolean,
        context?: any
      ): number;

      /**
       * Returns the last index in the Collection where a value satisfies the
       * provided predicate function. Otherwise -1 is returned.
       */
      findLastIndex(
        predicate: (value: T, index: number, iter: this) => boolean,
        context?: any
      ): number;

      // Sequence algorithms

      /**
       * Returns a new Collection with other collections concatenated to this one.
       */
      concat<C>(...valuesOrCollections: Array<Iterable<C> | C>): Collection.Indexed<T | C>;

      /**
       * Returns a new Collection.Indexed with values passed through a
       * `mapper` function.
       *
       * ```js
       * const { Collection } = require('immutable')
       * Collection.Indexed([1,2]).map(x => 10 * x)
       * // Seq [ 1, 2 ]
       * ```
       *
       * Note: `map()` always returns a new instance, even if it produced the
       * same value at every step.
       */
      map<M>(
        mapper: (value: T, key: number, iter: this) => M,
        context?: any
      ): Collection.Indexed<M>;

      /**
       * Flat-maps the Collection, returning a Collection of the same type.
       *
       * Similar to `collection.map(...).flatten(true)`.
       */
      flatMap<M>(
        mapper: (value: T, key: number, iter: this) => Iterable<M>,
        context?: any
      ): Collection.Indexed<M>;

      /**
       * Returns a new Collection with only the values for which the `predicate`
       * function returns true.
       *
       * Note: `filter()` always returns a new instance, even if it results in
       * not filtering out any values.
       */
      filter<F extends T>(
        predicate: (value: T, index: number, iter: this) => value is F,
        context?: any
      ): Collection.Indexed<F>;
      filter(
        predicate: (value: T, index: number, iter: this) => any,
        context?: any
      ): this;

      [Symbol.iterator](): IterableIterator<T>;
    }


    /**
     * Set Collections only represent values. They have no associated keys or
     * indices. Duplicate values are possible in the lazy `Seq.Set`s, however
     * the concrete `Set` Collection does not allow duplicate values.
     *
     * Collection methods on Collection.Set such as `map` and `forEach` will provide
     * the value as both the first and second arguments to the provided function.
     *
     * ```js
     * const { Collection } = require('immutable')
     * const seq = Collection.Set([ 'A', 'B', 'C' ])
     * // Seq { "A", "B", "C" }
     * seq.forEach((v, k) =>
     *  assert.equal(v, k)
     * )
     * ```
     */
    export module Set {}

    /**
     * Similar to `Collection()`, but always returns a Collection.Set.
     *
     * Note: `Collection.Set` is a factory function and not a class, and does
     * not use the `new` keyword during construction.
     */
    export function Set<T>(collection: Iterable<T>): Collection.Set<T>;

    export interface Set<T> extends Collection<T, T> {
      /**
       * Deeply converts this Set collection to equivalent native JavaScript Array.
       */
      toJS(): Array<any>;

      /**
       * Shallowly converts this Set collection to equivalent native JavaScript Array.
       */
      toJSON(): Array<T>;

      /**
       * Shallowly converts this collection to an Array.
       */
      toArray(): Array<T>;

      /**
       * Returns Seq.Set.
       * @override
       */
      toSeq(): Seq.Set<T>;

      // Sequence algorithms

      /**
       * Returns a new Collection with other collections concatenated to this one.
       */
      concat<U>(...collections: Array<Iterable<U>>): Collection.Set<T | U>;

      /**
       * Returns a new Collection.Set with values passed through a
       * `mapper` function.
       *
       * ```
       * Collection.Set([ 1, 2 ]).map(x => 10 * x)
       * // Seq { 1, 2 }
       * ```
       *
       * Note: `map()` always returns a new instance, even if it produced the
       * same value at every step.
       */
      map<M>(
        mapper: (value: T, key: T, iter: this) => M,
        context?: any
      ): Collection.Set<M>;

      /**
       * Flat-maps the Collection, returning a Collection of the same type.
       *
       * Similar to `collection.map(...).flatten(true)`.
       */
      flatMap<M>(
        mapper: (value: T, key: T, iter: this) => Iterable<M>,
        context?: any
      ): Collection.Set<M>;

      /**
       * Returns a new Collection with only the values for which the `predicate`
       * function returns true.
       *
       * Note: `filter()` always returns a new instance, even if it results in
       * not filtering out any values.
       */
      filter<F extends T>(
        predicate: (value: T, key: T, iter: this) => value is F,
        context?: any
      ): Collection.Set<F>;
      filter(
        predicate: (value: T, key: T, iter: this) => any,
        context?: any
      ): this;

      [Symbol.iterator](): IterableIterator<T>;
    }

  }

  /**
   * Creates a Collection.
   *
   * The type of Collection created is based on the input.
   *
   *   * If an `Collection`, that same `Collection`.
   *   * If an Array-like, an `Collection.Indexed`.
   *   * If an Object with an Iterator defined, an `Collection.Indexed`.
   *   * If an Object, an `Collection.Keyed`.
   *
   * This methods forces the conversion of Objects and Strings to Collections.
   * If you want to ensure that a Collection of one item is returned, use
   * `Seq.of`.
   *
   * Note: An Iterator itself will be treated as an object, becoming a `Seq.Keyed`,
   * which is usually not what you want. You should turn your Iterator Object into
   * an iterable object by defining a Symbol.iterator (or @@iterator) method which
   * returns `this`.
   *
   * Note: `Collection` is a conversion function and not a class, and does not
   * use the `new` keyword during construction.
   */
  declare function Collection<I extends Collection<any, any>>(collection: I): I;
  declare function Collection<T>(collection: Iterable<T>): Collection.Indexed<T>;
  declare function Collection<V>(obj: {[key: string]: V}): Collection.Keyed<string, V>;

  interface Collection<K, V> extends ValueObject {

    // Value equality

    /**
     * True if this and the other Collection have value equality, as defined
     * by `Immutable.is()`.
     *
     * Note: This is equivalent to `Immutable.is(this, other)`, but provided to
     * allow for chained expressions.
     */
    equals(other: any): boolean;

    /**
     * Computes and returns the hashed identity for this Collection.
     *
     * The `hashCode` of a Collection is used to determine potential equality,
     * and is used when adding this to a `Set` or as a key in a `Map`, enabling
     * lookup via a different instance.
     *
     * <!-- runkit:activate
     *      { "preamble": "const { Set,  List } = require('immutable')" }
     * -->
     * ```js
     * const a = List([ 1, 2, 3 ]);
     * const b = List([ 1, 2, 3 ]);
     * assert.notStrictEqual(a, b); // different instances
     * const set = Set([ a ]);
     * assert.equal(set.has(b), true);
     * ```
     *
     * If two values have the same `hashCode`, they are [not guaranteed
     * to be equal][Hash Collision]. If two values have different `hashCode`s,
     * they must not be equal.
     *
     * [Hash Collision]: http://en.wikipedia.org/wiki/Collision_(computer_science)
     */
    hashCode(): number;


    // Reading values

    /**
     * Returns the value associated with the provided key, or notSetValue if
     * the Collection does not contain this key.
     *
     * Note: it is possible a key may be associated with an `undefined` value,
     * so if `notSetValue` is not provided and this method returns `undefined`,
     * that does not guarantee the key was not found.
     */
    get<NSV>(key: K, notSetValue: NSV): V | NSV;
    get(key: K): V | undefined;

    /**
     * True if a key exists within this `Collection`, using `Immutable.is`
     * to determine equality
     */
    has(key: K): boolean;

    /**
     * True if a value exists within this `Collection`, using `Immutable.is`
     * to determine equality
     * @alias contains
     */
    includes(value: V): boolean;
    contains(value: V): boolean;

    /**
     * In case the `Collection` is not empty returns the first element of the
     * `Collection`.
     * In case the `Collection` is empty returns the optional default
     * value if provided, if no default value is provided returns undefined.
     */
    first<NSV>(notSetValue?: NSV): V | NSV;

    /**
     * In case the `Collection` is not empty returns the last element of the
     * `Collection`.
     * In case the `Collection` is empty returns the optional default
     * value if provided, if no default value is provided returns undefined.
     */
    last<NSV>(notSetValue?: NSV): V | NSV;

    // Reading deep values

    /**
     * Returns the value found by following a path of keys or indices through
     * nested Collections.
     *
     * <!-- runkit:activate -->
     * ```js
     * const { Map, List } = require('immutable')
     * const deepData = Map({ x: List([ Map({ y: 123 }) ]) });
     * deepData.getIn(['x', 0, 'y']) // 123
     * ```
     *
     * Plain JavaScript Object or Arrays may be nested within an Immutable.js
     * Collection, and getIn() can access those values as well:
     *
     * <!-- runkit:activate -->
     * ```js
     * const { Map, List } = require('immutable')
     * const deepData = Map({ x: [ { y: 123 } ] });
     * deepData.getIn(['x', 0, 'y']) // 123
     * ```
     */
    getIn(searchKeyPath: Iterable<any>, notSetValue?: any): any;

    /**
     * True if the result of following a path of keys or indices through nested
     * Collections results in a set value.
     */
    hasIn(searchKeyPath: Iterable<any>): boolean;

    // Persistent changes

    /**
     * This can be very useful as a way to "chain" a normal function into a
     * sequence of methods. RxJS calls this "let" and lodash calls it "thru".
     *
     * For example, to sum a Seq after mapping and filtering:
     *
     * <!-- runkit:activate -->
     * ```js
     * const { Seq } = require('immutable')
     *
     * function sum(collection) {
     *   return collection.reduce((sum, x) => sum + x, 0)
     * }
     *
     * Seq([ 1, 2, 3 ])
     *   .map(x => x + 1)
     *   .filter(x => x % 2 === 0)
     *   .update(sum)
     * // 6
     * ```
     */
    update<R>(updater: (value: this) => R): R;


    // Conversion to JavaScript types

    /**
     * Deeply converts this Collection to equivalent native JavaScript Array or Object.
     *
     * `Collection.Indexed`, and `Collection.Set` become `Array`, while
     * `Collection.Keyed` become `Object`, converting keys to Strings.
     */
    toJS(): Array<any> | { [key: string]: any };

    /**
     * Shallowly converts this Collection to equivalent native JavaScript Array or Object.
     *
     * `Collection.Indexed`, and `Collection.Set` become `Array`, while
     * `Collection.Keyed` become `Object`, converting keys to Strings.
     */
    toJSON(): Array<V> | { [key: string]: V };

    /**
     * Shallowly converts this collection to an Array.
     *
     * `Collection.Indexed`, and `Collection.Set` produce an Array of values.
     * `Collection.Keyed` produce an Array of [key, value] tuples.
     */
    toArray(): Array<V> | Array<[K, V]>;

    /**
     * Shallowly converts this Collection to an Object.
     *
     * Converts keys to Strings.
     */
    toObject(): { [key: string]: V };


    // Conversion to Collections

    /**
     * Converts this Collection to a Map, Throws if keys are not hashable.
     *
     * Note: This is equivalent to `Map(this.toKeyedSeq())`, but provided
     * for convenience and to allow for chained expressions.
     */
    toMap(): Map<K, V>;

    /**
     * Converts this Collection to a Map, maintaining the order of iteration.
     *
     * Note: This is equivalent to `OrderedMap(this.toKeyedSeq())`, but
     * provided for convenience and to allow for chained expressions.
     */
    toOrderedMap(): OrderedMap<K, V>;

    /**
     * Converts this Collection to a Set, discarding keys. Throws if values
     * are not hashable.
     *
     * Note: This is equivalent to `Set(this)`, but provided to allow for
     * chained expressions.
     */
    toSet(): Set<V>;

    /**
     * Converts this Collection to a Set, maintaining the order of iteration and
     * discarding keys.
     *
     * Note: This is equivalent to `OrderedSet(this.valueSeq())`, but provided
     * for convenience and to allow for chained expressions.
     */
    toOrderedSet(): OrderedSet<V>;

    /**
     * Converts this Collection to a List, discarding keys.
     *
     * This is similar to `List(collection)`, but provided to allow for chained
     * expressions. However, when called on `Map` or other keyed collections,
     * `collection.toList()` discards the keys and creates a list of only the
     * values, whereas `List(collection)` creates a list of entry tuples.
     *
     * <!-- runkit:activate -->
     * ```js
     * const { Map, List } = require('immutable')
     * var myMap = Map({ a: 'Apple', b: 'Banana' })
     * List(myMap) // List [ [ "a", "Apple" ], [ "b", "Banana" ] ]
     * myMap.toList() // List [ "Apple", "Banana" ]
     * ```
     */
    toList(): List<V>;

    /**
     * Converts this Collection to a Stack, discarding keys. Throws if values
     * are not hashable.
     *
     * Note: This is equivalent to `Stack(this)`, but provided to allow for
     * chained expressions.
     */
    toStack(): Stack<V>;


    // Conversion to Seq

    /**
     * Converts this Collection to a Seq of the same kind (indexed,
     * keyed, or set).
     */
    toSeq(): Seq<K, V>;

    /**
     * Returns a Seq.Keyed from this Collection where indices are treated as keys.
     *
     * This is useful if you want to operate on an
     * Collection.Indexed and preserve the [index, value] pairs.
     *
     * The returned Seq will have identical iteration order as
     * this Collection.
     *
     * <!-- runkit:activate -->
     * ```js
     * const { Seq } = require('immutable')
     * const indexedSeq = Seq([ 'A', 'B', 'C' ])
     * // Seq [ "A", "B", "C" ]
     * indexedSeq.filter(v => v === 'B')
     * // Seq [ "B" ]
     * const keyedSeq = indexedSeq.toKeyedSeq()
     * // Seq { 0: "A", 1: "B", 2: "C" }
     * keyedSeq.filter(v => v === 'B')
     * // Seq { 1: "B" }
     * ```
     */
    toKeyedSeq(): Seq.Keyed<K, V>;

    /**
     * Returns an Seq.Indexed of the values of this Collection, discarding keys.
     */
    toIndexedSeq(): Seq.Indexed<V>;

    /**
     * Returns a Seq.Set of the values of this Collection, discarding keys.
     */
    toSetSeq(): Seq.Set<V>;


    // Iterators

    /**
     * An iterator of this `Collection`'s keys.
     *
     * Note: this will return an ES6 iterator which does not support
     * Immutable.js sequence algorithms. Use `keySeq` instead, if this is
     * what you want.
     */
    keys(): IterableIterator<K>;

    /**
     * An iterator of this `Collection`'s values.
     *
     * Note: this will return an ES6 iterator which does not support
     * Immutable.js sequence algorithms. Use `valueSeq` instead, if this is
     * what you want.
     */
    values(): IterableIterator<V>;

    /**
     * An iterator of this `Collection`'s entries as `[ key, value ]` tuples.
     *
     * Note: this will return an ES6 iterator which does not support
     * Immutable.js sequence algorithms. Use `entrySeq` instead, if this is
     * what you want.
     */
    entries(): IterableIterator<[K, V]>;


    // Collections (Seq)

    /**
     * Returns a new Seq.Indexed of the keys of this Collection,
     * discarding values.
     */
    keySeq(): Seq.Indexed<K>;

    /**
     * Returns an Seq.Indexed of the values of this Collection, discarding keys.
     */
    valueSeq(): Seq.Indexed<V>;

    /**
     * Returns a new Seq.Indexed of [key, value] tuples.
     */
    entrySeq(): Seq.Indexed<[K, V]>;


    // Sequence algorithms

    /**
     * Returns a new Collection of the same type with values passed through a
     * `mapper` function.
     *
     * <!-- runkit:activate -->
     * ```js
     * const { Collection } = require('immutable')
     * Collection({ a: 1, b: 2 }).map(x => 10 * x)
     * // Seq { "a": 10, "b": 20 }
     * ```
     *
     * Note: `map()` always returns a new instance, even if it produced the same
     * value at every step.
     */
    map<M>(
      mapper: (value: V, key: K, iter: this) => M,
      context?: any
    ): Collection<K, M>;

    /**
     * Note: used only for sets, which return Collection<M, M> but are otherwise
     * identical to normal `map()`.
     *
     * @ignore
     */
    map<M>(...args: never[]): any;

    /**
     * Returns a new Collection of the same type with only the entries for which
     * the `predicate` function returns true.
     *
     * <!-- runkit:activate -->
     * ```js
     * const { Map } = require('immutable')
     * Map({ a: 1, b: 2, c: 3, d: 4}).filter(x => x % 2 === 0)
     * // Map { "b": 2, "d": 4 }
     * ```
     *
     * Note: `filter()` always returns a new instance, even if it results in
     * not filtering out any values.
     */
    filter<F extends V>(
      predicate: (value: V, key: K, iter: this) => value is F,
      context?: any
    ): Collection<K, F>;
    filter(
      predicate: (value: V, key: K, iter: this) => any,
      context?: any
    ): this;

    /**
     * Returns a new Collection of the same type with only the entries for which
     * the `predicate` function returns false.
     *
     * <!-- runkit:activate -->
     * ```js
     * const { Map } = require('immutable')
     * Map({ a: 1, b: 2, c: 3, d: 4}).filterNot(x => x % 2 === 0)
     * // Map { "a": 1, "c": 3 }
     * ```
     *
     * Note: `filterNot()` always returns a new instance, even if it results in
     * not filtering out any values.
     */
    filterNot(
      predicate: (value: V, key: K, iter: this) => boolean,
      context?: any
    ): this;

    /**
     * Returns a new Collection of the same type in reverse order.
     */
    reverse(): this;

    /**
     * Returns a new Collection of the same type which includes the same entries,
     * stably sorted by using a `comparator`.
     *
     * If a `comparator` is not provided, a default comparator uses `<` and `>`.
     *
     * `comparator(valueA, valueB)`:
     *
     *   * Returns `0` if the elements should not be swapped.
     *   * Returns `-1` (or any negative number) if `valueA` comes before `valueB`
     *   * Returns `1` (or any positive number) if `valueA` comes after `valueB`
     *   * Is pure, i.e. it must always return the same value for the same pair
     *     of values.
     *
     * When sorting collections which have no defined order, their ordered
     * equivalents will be returned. e.g. `map.sort()` returns OrderedMap.
     *
     * <!-- runkit:activate -->
     * ```js
     * const { Map } = require('immutable')
     * Map({ "c": 3, "a": 1, "b": 2 }).sort((a, b) => {
     *   if (a < b) { return -1; }
     *   if (a > b) { return 1; }
     *   if (a === b) { return 0; }
     * });
     * // OrderedMap { "a": 1, "b": 2, "c": 3 }
     * ```
     *
     * Note: `sort()` Always returns a new instance, even if the original was
     * already sorted.
     *
     * Note: This is always an eager operation.
     */
    sort(comparator?: (valueA: V, valueB: V) => number): this;

    /**
     * Like `sort`, but also accepts a `comparatorValueMapper` which allows for
     * sorting by more sophisticated means:
     *
     *     hitters.sortBy(hitter => hitter.avgHits)
     *
     * Note: `sortBy()` Always returns a new instance, even if the original was
     * already sorted.
     *
     * Note: This is always an eager operation.
     */
    sortBy<C>(
      comparatorValueMapper: (value: V, key: K, iter: this) => C,
      comparator?: (valueA: C, valueB: C) => number
    ): this;

    /**
     * Returns a `Collection.Keyed` of `Collection.Keyeds`, grouped by the return
     * value of the `grouper` function.
     *
     * Note: This is always an eager operation.
     *
     * <!-- runkit:activate -->
     * ```js
     * const { List, Map } = require('immutable')
     * const listOfMaps = List([
     *   Map({ v: 0 }),
     *   Map({ v: 1 }),
     *   Map({ v: 1 }),
     *   Map({ v: 0 }),
     *   Map({ v: 2 })
     * ])
     * const groupsOfMaps = listOfMaps.groupBy(x => x.get('v'))
     * // Map {
     * //   0: List [ Map{ "v": 0 }, Map { "v": 0 } ],
     * //   1: List [ Map{ "v": 1 }, Map { "v": 1 } ],
     * //   2: List [ Map{ "v": 2 } ],
     * // }
     * ```
     */
    groupBy<G>(
      grouper: (value: V, key: K, iter: this) => G,
      context?: any
    ): /*Map*/Seq.Keyed<G, /*this*/Collection<K, V>>;


    // Side effects

    /**
     * The `sideEffect` is executed for every entry in the Collection.
     *
     * Unlike `Array#forEach`, if any call of `sideEffect` returns
     * `false`, the iteration will stop. Returns the number of entries iterated
     * (including the last iteration which returned false).
     */
    forEach(
      sideEffect: (value: V, key: K, iter: this) => any,
      context?: any
    ): number;


    // Creating subsets

    /**
     * Returns a new Collection of the same type representing a portion of this
     * Collection from start up to but not including end.
     *
     * If begin is negative, it is offset from the end of the Collection. e.g.
     * `slice(-2)` returns a Collection of the last two entries. If it is not
     * provided the new Collection will begin at the beginning of this Collection.
     *
     * If end is negative, it is offset from the end of the Collection. e.g.
     * `slice(0, -1)` returns a Collection of everything but the last entry. If
     * it is not provided, the new Collection will continue through the end of
     * this Collection.
     *
     * If the requested slice is equivalent to the current Collection, then it
     * will return itself.
     */
    slice(begin?: number, end?: number): this;

    /**
     * Returns a new Collection of the same type containing all entries except
     * the first.
     */
    rest(): this;

    /**
     * Returns a new Collection of the same type containing all entries except
     * the last.
     */
    butLast(): this;

    /**
     * Returns a new Collection of the same type which excludes the first `amount`
     * entries from this Collection.
     */
    skip(amount: number): this;

    /**
     * Returns a new Collection of the same type which excludes the last `amount`
     * entries from this Collection.
     */
    skipLast(amount: number): this;

    /**
     * Returns a new Collection of the same type which includes entries starting
     * from when `predicate` first returns false.
     *
     * <!-- runkit:activate -->
     * ```js
     * const { List } = require('immutable')
     * List([ 'dog', 'frog', 'cat', 'hat', 'god' ])
     *   .skipWhile(x => x.match(/g/))
     * // List [ "cat", "hat", "god"" ]
     * ```
     */
    skipWhile(
      predicate: (value: V, key: K, iter: this) => boolean,
      context?: any
    ): this;

    /**
     * Returns a new Collection of the same type which includes entries starting
     * from when `predicate` first returns true.
     *
     * <!-- runkit:activate -->
     * ```js
     * const { List } = require('immutable')
     * List([ 'dog', 'frog', 'cat', 'hat', 'god' ])
     *   .skipUntil(x => x.match(/hat/))
     * // List [ "hat", "god"" ]
     * ```
     */
    skipUntil(
      predicate: (value: V, key: K, iter: this) => boolean,
      context?: any
    ): this;

    /**
     * Returns a new Collection of the same type which includes the first `amount`
     * entries from this Collection.
     */
    take(amount: number): this;

    /**
     * Returns a new Collection of the same type which includes the last `amount`
     * entries from this Collection.
     */
    takeLast(amount: number): this;

    /**
     * Returns a new Collection of the same type which includes entries from this
     * Collection as long as the `predicate` returns true.
     *
     * <!-- runkit:activate -->
     * ```js
     * const { List } = require('immutable')
     * List([ 'dog', 'frog', 'cat', 'hat', 'god' ])
     *   .takeWhile(x => x.match(/o/))
     * // List [ "dog", "frog" ]
     * ```
     */
    takeWhile(
      predicate: (value: V, key: K, iter: this) => boolean,
      context?: any
    ): this;

    /**
     * Returns a new Collection of the same type which includes entries from this
     * Collection as long as the `predicate` returns false.
     *
     * <!-- runkit:activate -->
     * ```js
     * const { List } = require('immutable')
     * List([ 'dog', 'frog', 'cat', 'hat', 'god' ])
     *   .takeUntil(x => x.match(/at/))
     * // List [ "dog", "frog" ]
     * ```
     */
    takeUntil(
      predicate: (value: V, key: K, iter: this) => boolean,
      context?: any
    ): this;


    // Combination

    /**
     * Returns a new Collection of the same type with other values and
     * collection-like concatenated to this one.
     *
     * For Seqs, all entries will be present in the resulting Seq, even if they
     * have the same key.
     */
    concat(...valuesOrCollections: Array<any>): Collection<any, any>;

    /**
     * Flattens nested Collections.
     *
     * Will deeply flatten the Collection by default, returning a Collection of the
     * same type, but a `depth` can be provided in the form of a number or
     * boolean (where true means to shallowly flatten one level). A depth of 0
     * (or shallow: false) will deeply flatten.
     *
     * Flattens only others Collection, not Arrays or Objects.
     *
     * Note: `flatten(true)` operates on Collection<any, Collection<K, V>> and
     * returns Collection<K, V>
     */
    flatten(depth?: number): Collection<any, any>;
    flatten(shallow?: boolean): Collection<any, any>;

    /**
     * Flat-maps the Collection, returning a Collection of the same type.
     *
     * Similar to `collection.map(...).flatten(true)`.
     */
    flatMap<M>(
      mapper: (value: V, key: K, iter: this) => Iterable<M>,
      context?: any
    ): Collection<K, M>;

    /**
     * Flat-maps the Collection, returning a Collection of the same type.
     *
     * Similar to `collection.map(...).flatten(true)`.
     * Used for Dictionaries only.
     */
    flatMap<KM, VM>(
      mapper: (value: V, key: K, iter: this) => Iterable<[KM, VM]>,
      context?: any
    ): Collection<KM, VM>;

    // Reducing a value

    /**
     * Reduces the Collection to a value by calling the `reducer` for every entry
     * in the Collection and passing along the reduced value.
     *
     * If `initialReduction` is not provided, the first item in the
     * Collection will be used.
     *
     * @see `Array#reduce`.
     */
    reduce<R>(
      reducer: (reduction: R, value: V, key: K, iter: this) => R,
      initialReduction: R,
      context?: any
    ): R;
    reduce<R>(
      reducer: (reduction: V | R, value: V, key: K, iter: this) => R
    ): R;

    /**
     * Reduces the Collection in reverse (from the right side).
     *
     * Note: Similar to this.reverse().reduce(), and provided for parity
     * with `Array#reduceRight`.
     */
    reduceRight<R>(
      reducer: (reduction: R, value: V, key: K, iter: this) => R,
      initialReduction: R,
      context?: any
    ): R;
    reduceRight<R>(
      reducer: (reduction: V | R, value: V, key: K, iter: this) => R
    ): R;

    /**
     * True if `predicate` returns true for all entries in the Collection.
     */
    every(
      predicate: (value: V, key: K, iter: this) => boolean,
      context?: any
    ): boolean;

    /**
     * True if `predicate` returns true for any entry in the Collection.
     */
    some(
      predicate: (value: V, key: K, iter: this) => boolean,
      context?: any
    ): boolean;

    /**
     * Joins values together as a string, inserting a separator between each.
     * The default separator is `","`.
     */
    join(separator?: string): string;

    /**
     * Returns true if this Collection includes no values.
     *
     * For some lazy `Seq`, `isEmpty` might need to iterate to determine
     * emptiness. At most one iteration will occur.
     */
    isEmpty(): boolean;

    /**
     * Returns the size of this Collection.
     *
     * Regardless of if this Collection can describe its size lazily (some Seqs
     * cannot), this method will always return the correct size. E.g. it
     * evaluates a lazy `Seq` if necessary.
     *
     * If `predicate` is provided, then this returns the count of entries in the
     * Collection for which the `predicate` returns true.
     */
    count(): number;
    count(
      predicate: (value: V, key: K, iter: this) => boolean,
      context?: any
    ): number;

    /**
     * Returns a `Seq.Keyed` of counts, grouped by the return value of
     * the `grouper` function.
     *
     * Note: This is not a lazy operation.
     */
    countBy<G>(
      grouper: (value: V, key: K, iter: this) => G,
      context?: any
    ): Map<G, number>;


    // Search for value

    /**
     * Returns the first value for which the `predicate` returns true.
     */
    find(
      predicate: (value: V, key: K, iter: this) => boolean,
      context?: any,
      notSetValue?: V
    ): V | undefined;

    /**
     * Returns the last value for which the `predicate` returns true.
     *
     * Note: `predicate` will be called for each entry in reverse.
     */
    findLast(
      predicate: (value: V, key: K, iter: this) => boolean,
      context?: any,
      notSetValue?: V
    ): V | undefined;

    /**
     * Returns the first [key, value] entry for which the `predicate` returns true.
     */
    findEntry(
      predicate: (value: V, key: K, iter: this) => boolean,
      context?: any,
      notSetValue?: V
    ): [K, V] | undefined;

    /**
     * Returns the last [key, value] entry for which the `predicate`
     * returns true.
     *
     * Note: `predicate` will be called for each entry in reverse.
     */
    findLastEntry(
      predicate: (value: V, key: K, iter: this) => boolean,
      context?: any,
      notSetValue?: V
    ): [K, V] | undefined;

    /**
     * Returns the key for which the `predicate` returns true.
     */
    findKey(
      predicate: (value: V, key: K, iter: this) => boolean,
      context?: any
    ): K | undefined;

    /**
     * Returns the last key for which the `predicate` returns true.
     *
     * Note: `predicate` will be called for each entry in reverse.
     */
    findLastKey(
      predicate: (value: V, key: K, iter: this) => boolean,
      context?: any
    ): K | undefined;

    /**
     * Returns the key associated with the search value, or undefined.
     */
    keyOf(searchValue: V): K | undefined;

    /**
     * Returns the last key associated with the search value, or undefined.
     */
    lastKeyOf(searchValue: V): K | undefined;

    /**
     * Returns the maximum value in this collection. If any values are
     * comparatively equivalent, the first one found will be returned.
     *
     * The `comparator` is used in the same way as `Collection#sort`. If it is not
     * provided, the default comparator is `>`.
     *
     * When two values are considered equivalent, the first encountered will be
     * returned. Otherwise, `max` will operate independent of the order of input
     * as long as the comparator is commutative. The default comparator `>` is
     * commutative *only* when types do not differ.
     *
     * If `comparator` returns 0 and either value is NaN, undefined, or null,
     * that value will be returned.
     */
    max(comparator?: (valueA: V, valueB: V) => number): V | undefined;

    /**
     * Like `max`, but also accepts a `comparatorValueMapper` which allows for
     * comparing by more sophisticated means:
     *
     *     hitters.maxBy(hitter => hitter.avgHits);
     *
     */
    maxBy<C>(
      comparatorValueMapper: (value: V, key: K, iter: this) => C,
      comparator?: (valueA: C, valueB: C) => number
    ): V | undefined;

    /**
     * Returns the minimum value in this collection. If any values are
     * comparatively equivalent, the first one found will be returned.
     *
     * The `comparator` is used in the same way as `Collection#sort`. If it is not
     * provided, the default comparator is `<`.
     *
     * When two values are considered equivalent, the first encountered will be
     * returned. Otherwise, `min` will operate independent of the order of input
     * as long as the comparator is commutative. The default comparator `<` is
     * commutative *only* when types do not differ.
     *
     * If `comparator` returns 0 and either value is NaN, undefined, or null,
     * that value will be returned.
     */
    min(comparator?: (valueA: V, valueB: V) => number): V | undefined;

    /**
     * Like `min`, but also accepts a `comparatorValueMapper` which allows for
     * comparing by more sophisticated means:
     *
     *     hitters.minBy(hitter => hitter.avgHits);
     *
     */
    minBy<C>(
      comparatorValueMapper: (value: V, key: K, iter: this) => C,
      comparator?: (valueA: C, valueB: C) => number
    ): V | undefined;


    // Comparison

    /**
     * True if `iter` includes every value in this Collection.
     */
    isSubset(iter: Iterable<V>): boolean;

    /**
     * True if this Collection includes every value in `iter`.
     */
    isSuperset(iter: Iterable<V>): boolean;
  }

  /**
   * The interface to fulfill to qualify as a Value Object.
   */
  interface ValueObject {
    /**
     * True if this and the other Collection have value equality, as defined
     * by `Immutable.is()`.
     *
     * Note: This is equivalent to `Immutable.is(this, other)`, but provided to
     * allow for chained expressions.
     */
    equals(other: any): boolean;

    /**
     * Computes and returns the hashed identity for this Collection.
     *
     * The `hashCode` of a Collection is used to determine potential equality,
     * and is used when adding this to a `Set` or as a key in a `Map`, enabling
     * lookup via a different instance.
     *
     * <!-- runkit:activate -->
     * ```js
     * const { List, Set } = require('immutable');
     * const a = List([ 1, 2, 3 ]);
     * const b = List([ 1, 2, 3 ]);
     * assert.notStrictEqual(a, b); // different instances
     * const set = Set([ a ]);
     * assert.equal(set.has(b), true);
     * ```
     *
     * Note: hashCode() MUST return a Uint32 number. The easiest way to
     * guarantee this is to return `myHash | 0` from a custom implementation.
     *
     * If two values have the same `hashCode`, they are [not guaranteed
     * to be equal][Hash Collision]. If two values have different `hashCode`s,
     * they must not be equal.
     *
     * Note: `hashCode()` is not guaranteed to always be called before
     * `equals()`. Most but not all Immutable.js collections use hash codes to
     * organize their internal data structures, while all Immutable.js
     * collections use equality during lookups.
     *
     * [Hash Collision]: http://en.wikipedia.org/wiki/Collision_(computer_science)
     */
    hashCode(): number;
  }

declare const Color_base: Record$1.Factory<{
    r: number;
    g: number;
    b: number;
}>;
declare class Color extends Color_base {
    static BLACK: Color;
    static GREY: Color;
    static WHITE: Color;
    static DARK_BLUE: Color;
    static RED: Color;
    static PURPLE: Color;
    static PINK: Color;
    static GREEN: Color;
    static ORANGE: Color;
    static YELLOW: Color;
    static LIGHT_BLUE: Color;
    static LIGHT_RED: Color;
    static LIGHT_GREEN: Color;
    static LIGHT_YELLOW: Color;
    static BLUE: Color;
    static fromHex: (hexColor: string) => Color;
    lighter(percent: number): Color;
    darker(percent: number): Color;
    equals(color: Color | {
        r: number;
        g: number;
        b: number;
    }): boolean;
    saturate(percent: number): Color;
    sRGBToRGBComponent(RGBComponent: number): number;
    relativeLuminance(): number;
    contrastRatio(color: Color): number;
    toCSSValue(): string;
    toHex(): string;
}

type ColorPreset = {
    color: Color | null;
    localization: {
        id: string;
        defaultMessage?: string;
        description?: string;
    };
};

declare const TransformationMatrix_base: Record$1.Factory<{
    a: number;
    b: number;
    c: number;
    d: number;
    e: number;
    f: number;
}>;
declare class TransformationMatrix extends TransformationMatrix_base {
    a: number;
    b: number;
    c: number;
    d: number;
    e: number;
    f: number;
    static defaultValues: IObject;
    static IDENTITY: TransformationMatrix;
    translate({ x: tx, y: ty }: {
        x: number;
        y: number;
    }): TransformationMatrix;
    translateX(tx: number): TransformationMatrix;
    translateY(ty: number): TransformationMatrix;
    scale(sx: number, sy?: number): TransformationMatrix;
    transform(a2: number, b2: number, c2: number, d2: number, e2: number, f2: number): TransformationMatrix;
    rotate(degCW: number): TransformationMatrix;
    rotateRad(a: number): TransformationMatrix;
    inverse(): TransformationMatrix;
    toCssValue(): string;
    applyToPoint([x, y]: [number, number]): [number, number];
    applyToVector([x, y]: [number, number]): [number, number];
}

interface PointCtorProps {
    x?: number;
    y?: number;
    [k: string]: unknown;
}
declare const Point_base: Record$1.Factory<PointCtorProps>;
declare class Point extends Point_base {
    x: number;
    y: number;
    static defaultValues: IObject;
    constructor(options?: PointCtorProps);
    scale(sx: number, sy?: number): this;
    translate({ x: tx, y: ty }: {
        x: number;
        y: number;
    }): this;
    translateX(tx: number): this;
    translateY(ty: number): this;
    distance(other: this): number;
    rotate(deg: number): this;
    apply(matrix: TransformationMatrix): this;
}

interface IDrawingPoint extends PointCtorProps {
    intensity?: number;
}
declare class DrawingPoint extends Point {
    intensity: number;
    static defaultValues: IObject;
    constructor(options?: IDrawingPoint);
}

interface ISize {
    width: number;
    height: number;
}
declare const Size_base: Record$1.Factory<ISize>;
declare class Size extends Size_base {
    scale(factor: number): Size;
    ceil(): Size;
    floor(): Size;
    swapDimensions(): Size;
    apply(matrix: TransformationMatrix): Size;
}

interface IRect {
    left?: number;
    top?: number;
    width?: number;
    height?: number;
}
declare const Rect_base: Record$1.Factory<IRect>;
declare class Rect extends Rect_base {
    left: number;
    top: number;
    width: number;
    height: number;
    static defaultValues: IObject;
    constructor(options?: IRect);
    get right(): number;
    get bottom(): number;
    static fromClientRect({ top, left, width, height }: ClientRect): Rect;
    static union(rects: List<Rect>): Rect;
    static getCenteredRect(inner: Size, outer: Size): Rect;
    static fromInset(inset: Inset): Rect;
    static areRectsCloserThan(a: Rect, b: Rect, distance: number): boolean;
    translate({ x: tx, y: ty }: Point): Rect;
    translateX(tx: number): Rect;
    translateY(ty: number): Rect;
    scale(sx: number, sy?: number): Rect;
    grow(growth: number): Rect;
    getLocation(): Point;
    getSize(): Size;
    getCenter(): Point;
    setLocation(location: Point): Rect;
    roundOverlap(): Rect;
    round(): Rect;
    isPointInside(point: Point): boolean;
    isRectInside(other: Rect): boolean;
    isRectOverlapping(other: Rect): boolean;
    normalize(): Rect;
    apply(matrix: TransformationMatrix): Rect;
}

interface IInset {
    left: number;
    top: number;
    right: number;
    bottom: number;
}
declare const Inset_base: Record$1.Factory<IInset>;
declare class Inset extends Inset_base {
    static applyToRect(inset: Inset, rect: Rect): Rect;
    static fromRect(rect: Rect): Inset;
    static fromValue(insetValue: number): Inset;
    apply(matrix: TransformationMatrix): Inset;
}
type InsetJSON = [left: number, top: number, right: number, bottom: number];

type ActionCtorProps = {
    subActions?: List<Action> | null;
};
declare const Action_base: Record$1.Factory<ActionCtorProps>;
declare abstract class Action extends Action_base {
    subActions?: List<Action> | null | undefined;
    constructor(args?: ActionCtorProps);
}

type ActionTriggerEventType = 'onPointerEnter' | 'onPointerLeave' | 'onPointerDown' | 'onPointerUp' | 'onPageOpen' | 'onPageClose' | 'onPageVisible' | 'onPageHidden';

declare const BlendMode: {
    readonly normal: "normal";
    readonly multiply: "multiply";
    readonly screen: "screen";
    readonly overlay: "overlay";
    readonly darken: "darken";
    readonly lighten: "lighten";
    readonly colorDodge: "colorDodge";
    readonly colorBurn: "colorBurn";
    readonly hardLight: "hardLight";
    readonly softLight: "softLight";
    readonly difference: "difference";
    readonly exclusion: "exclusion";
};
type IBlendMode = (typeof BlendMode)[keyof typeof BlendMode];

type ID$1 = string;
type AnnotationCtorProps = {
    id?: ID$1 | null;
    name?: string | null;
    subject?: string | null;
    pdfObjectId?: number | null;
    pageIndex?: number | null;
    boundingBox?: Rect | null;
    opacity?: number | null;
    action?: Action | null;
    note?: string | null;
    creatorName?: string | null;
    createdAt?: Date | null;
    updatedAt?: Date | null;
    customData?: Record<string, unknown> | null;
    noView?: boolean | null;
    noPrint?: boolean | null;
    hidden?: boolean | null;
    group?: string | null;
    isEditable?: boolean;
    isDeletable?: boolean;
    canSetGroup?: boolean;
    canReply?: boolean;
    rotation?: number;
    additionalActions?: any;
    noZoom?: boolean;
    noRotate?: boolean;
    isCommentThreadRoot?: boolean;
    APStreamCache?: {
        cache: string;
    } | {
        attach: string;
    };
    blendMode?: IBlendMode;
    [k: string]: any;
};
declare const Annotation_base: Record$1.Factory<AnnotationCtorProps>;
declare class Annotation extends Annotation_base {
    id: ID$1;
    name: null | string;
    subject: null | string;
    pdfObjectId: null | number;
    pageIndex: number;
    boundingBox: Rect;
    opacity: number;
    action: any;
    note: null | string;
    creatorName: null | string;
    createdAt: Date;
    updatedAt: Date;
    noView: boolean;
    noPrint: boolean;
    hidden: boolean;
    customData: null | Record<string, unknown>;
    noZoom: boolean;
    noRotate: boolean;
    additionalActions: any;
    rotation: number;
    blendMode: IBlendMode;
    isCommentThreadRoot: boolean;
    group?: string | null;
    isEditable?: boolean;
    isDeletable?: boolean;
    canSetGroup?: boolean;
    canReply?: boolean;
    APStreamCache?: {
        cache: string;
    } | {
        attach: string;
    };
    static defaultValues: IObject;
    constructor(options?: AnnotationCtorProps);
}

interface ITextMarkupAnnotation extends AnnotationCtorProps {
    rects?: List<Rect>;
    color?: Color;
    blendMode?: IBlendMode;
}
declare class TextMarkupAnnotation extends Annotation {
    rects: List<Rect>;
    color: Color;
    blendMode: IBlendMode;
    static defaultValues: IObject;
    static readableName: string;
    constructor(options?: ITextMarkupAnnotation);
}

interface IHighlightAnnotation extends ITextMarkupAnnotation {
    color?: Color;
    blendMode?: IBlendMode;
}
declare class HighlightAnnotation extends TextMarkupAnnotation {
    blendMode: IBlendMode;
    static className: string;
    static readableName: string;
    static defaultValues: IObject;
    constructor(options?: IHighlightAnnotation);
}

interface IImageAnnotation extends AnnotationCtorProps {
    description?: string | null;
    fileName?: string | null;
    contentType?: string;
    imageAttachmentId?: string;
    rotation?: number;
    isSignature?: boolean;
}
declare class ImageAnnotation extends Annotation {
    description: null | string;
    fileName: null | string;
    contentType: string;
    imageAttachmentId: string;
    rotation: number;
    isSignature: boolean;
    xfdfAppearanceStream: null | string;
    static defaultValues: IObject;
    static readableName: string;
    constructor(options?: IImageAnnotation);
}

interface IInkAnnotation extends AnnotationCtorProps {
    lines?: List<List<DrawingPoint>>;
    lineWidth?: number | null;
    strokeColor?: Color | null;
    backgroundColor?: Color | null;
    isDrawnNaturally?: boolean;
    isSignature?: boolean;
}
declare class InkAnnotation extends Annotation {
    lines: List<List<DrawingPoint>>;
    lineWidth: number;
    strokeColor: Color | null;
    backgroundColor: Color | null;
    isDrawnNaturally: boolean;
    isSignature: boolean;
    static defaultValues: IObject;
    static readableName: "Ink";
    constructor(options?: IInkAnnotation);
}

declare const MeasurementPrecision: {
    readonly WHOLE: "whole";
    readonly ONE: "oneDp";
    readonly TWO: "twoDp";
    readonly THREE: "threeDp";
    readonly FOUR: "fourDp";
};
type IMeasurementPrecision = (typeof MeasurementPrecision)[keyof typeof MeasurementPrecision];

declare const MeasurementScaleUnitFrom: {
    readonly INCHES: "in";
    readonly MILLIMETERS: "mm";
    readonly CENTIMETERS: "cm";
    readonly POINTS: "pt";
};
type IMeasurementScaleUnitFrom = (typeof MeasurementScaleUnitFrom)[keyof typeof MeasurementScaleUnitFrom];

declare const MeasurementScaleUnitTo: {
    readonly INCHES: "in";
    readonly MILLIMETERS: "mm";
    readonly CENTIMETERS: "cm";
    readonly POINTS: "pt";
    readonly FEET: "ft";
    readonly METERS: "m";
    readonly YARDS: "yd";
    readonly KILOMETERS: "km";
    readonly MILES: "mi";
};
type IMeasurementScaleUnitTo = (typeof MeasurementScaleUnitTo)[keyof typeof MeasurementScaleUnitTo];

interface IMeasurementScale {
    unitFrom: IMeasurementScaleUnitFrom;
    unitTo: IMeasurementScaleUnitTo;
    fromValue: number;
    toValue: number;
}
declare const MeasurementScale_base: Record$1.Factory<IMeasurementScale>;
declare class MeasurementScale extends MeasurementScale_base {
}

interface IShapeAnnotation extends AnnotationCtorProps {
    strokeDashArray?: [number, number] | null;
    strokeWidth?: number | null;
    strokeColor?: Color | null;
    fillColor?: Color | null;
    measurementScale?: MeasurementScale | null;
    measurementPrecision?: IMeasurementPrecision | null;
}
declare class ShapeAnnotation extends Annotation {
    strokeDashArray: null | [number, number];
    strokeWidth: number;
    strokeColor: null | Color;
    fillColor: null | Color;
    measurementPrecision: null | IMeasurementPrecision;
    measurementScale: null | MeasurementScale;
    static readableName: string;
    static defaultValues: IObject;
    isMeasurement(): boolean;
    getMeasurementDetails: () => {
        value: number;
        label: string;
    };
    constructor(options?: IShapeAnnotation);
}

declare const LineCap: {
    readonly square: "square";
    readonly circle: "circle";
    readonly diamond: "diamond";
    readonly openArrow: "openArrow";
    readonly closedArrow: "closedArrow";
    readonly butt: "butt";
    readonly reverseOpenArrow: "reverseOpenArrow";
    readonly reverseClosedArrow: "reverseClosedArrow";
    readonly slash: "slash";
};
type ILineCap = (typeof LineCap)[keyof typeof LineCap];
type LineCapsType = {
    start?: ILineCap | null;
    end?: ILineCap | null;
};

interface ILineAnnotation extends IShapeAnnotation {
    startPoint?: Point | null;
    endPoint?: Point | null;
    lineCaps?: LineCapsType | null;
}
declare class LineAnnotation extends ShapeAnnotation {
    startPoint: Point;
    endPoint: Point;
    lineCaps: LineCapsType | null;
    static defaultValues: IObject;
    static readableName: "Line";
    constructor(options?: ILineAnnotation);
}

interface IRectangleAnnotation extends IShapeAnnotation {
    cloudyBorderIntensity?: number | null;
    cloudyBorderInset?: Inset | null;
}
declare class RectangleAnnotation extends ShapeAnnotation {
    cloudyBorderIntensity: null | number;
    cloudyBorderInset: null | Inset;
    static defaultValues: IObject;
    static readableName: "Rectangle";
    constructor(options?: IRectangleAnnotation);
}

interface IEllipseAnnotation extends IShapeAnnotation {
    cloudyBorderIntensity?: number | null;
    cloudyBorderInset?: Inset | null;
}
declare class EllipseAnnotation extends ShapeAnnotation {
    cloudyBorderIntensity: null | number;
    cloudyBorderInset: null | Inset;
    static defaultValues: IObject;
    static readableName: "Ellipse";
    constructor(options?: IEllipseAnnotation);
}

interface IPolygonAnnotation extends IShapeAnnotation {
    points?: List<Point> | null;
    cloudyBorderIntensity?: number | null;
}
declare class PolygonAnnotation extends ShapeAnnotation {
    points: List<Point>;
    cloudyBorderIntensity: null | number;
    static defaultValues: IObject;
    static readableName: string;
    constructor(options?: IPolygonAnnotation);
}

interface IPolyLineAnnotation extends IShapeAnnotation {
    points?: List<Point> | null;
    lineCaps?: LineCapsType | null;
}
declare class PolylineAnnotation extends ShapeAnnotation {
    points: List<Point>;
    lineCaps: null | LineCapsType;
    static defaultValues: IObject;
    static readableName: string;
    constructor(options?: IPolyLineAnnotation);
}

interface IGoToAction extends ActionCtorProps {
    pageIndex?: number;
}
declare class GoToAction extends Action {
    pageIndex: number;
    static defaultValues: IObject;
    constructor(args?: IGoToAction);
}

interface IGoToEmbeddedAction extends ActionCtorProps {
    newWindow?: boolean;
    relativePath?: string;
    targetType?: 'parent' | 'child';
}
declare class GoToEmbeddedAction extends Action {
    newWindow: boolean;
    relativePath: string;
    targetType: 'parent' | 'child';
    static defaultValues: IObject;
    constructor(args?: IGoToEmbeddedAction);
}

interface IGoToRemoteAction extends ActionCtorProps {
    relativePath?: string;
    namedDestination?: string;
}
declare class GoToRemoteAction extends Action {
    relativePath: string;
    namedDestination: string;
    static defaultValues: IObject;
    constructor(args?: IGoToRemoteAction);
}

type AnnotationReference = {
    fieldName: string;
} | {
    pdfObjectId: number;
};
interface IHideAction extends ActionCtorProps {
    hide?: boolean;
    annotationReferences?: List<AnnotationReference>;
}
declare class HideAction extends Action {
    hide: boolean;
    annotationReferences: List<AnnotationReference>;
    static defaultValues: IObject;
    constructor(args?: IHideAction);
}

interface IJavaScriptAction extends ActionCtorProps {
    script?: string;
}
declare class JavaScriptAction extends Action {
    script: string;
    static defaultValues: IObject;
    constructor(args?: IJavaScriptAction);
}

interface ILaunchAction extends ActionCtorProps {
    filePath?: string;
}
declare class LaunchAction extends Action {
    filePath: string;
    static defaultValues: IObject;
    constructor(args?: ILaunchAction);
}

interface INamedAction extends ActionCtorProps {
    action?: string;
}
declare class NamedAction extends Action {
    action: string;
    static defaultValues: IObject;
    constructor(args?: INamedAction);
}

interface IResetFormAction extends ActionCtorProps {
    fields?: List<string> | null | undefined;
    includeExclude?: boolean;
}
declare class ResetFormAction extends Action {
    fields: List<string> | null | undefined;
    includeExclude: boolean;
    static defaultValues: IObject;
    constructor(args?: IResetFormAction);
}

interface ISubmitFormAction extends ActionCtorProps {
    uri?: string;
    fields?: List<string>;
    includeExclude?: boolean;
    includeNoValueFields?: boolean;
    exportFormat?: boolean;
    getMethod?: boolean;
    submitCoordinated?: boolean;
    xfdf?: boolean;
    includeAppendSaves?: boolean;
    includeAnnotations?: boolean;
    submitPDF?: boolean;
    canonicalFormat?: boolean;
    excludeNonUserAnnotations?: boolean;
    excludeFKey?: boolean;
    embedForm?: boolean;
}
declare class SubmitFormAction extends Action {
    uri: string;
    fields: List<string> | null | undefined;
    includeExclude: boolean;
    includeNoValueFields: boolean;
    exportFormat: boolean;
    getMethod: boolean;
    submitCoordinated: boolean;
    xfdf: boolean;
    includeAppendSaves: boolean;
    includeAnnotations: boolean;
    submitPDF: boolean;
    canonicalFormat: boolean;
    excludeNonUserAnnotations: boolean;
    excludeFKey: boolean;
    embedForm: boolean;
    static defaultValues: IObject;
    constructor(args?: ISubmitFormAction);
}

interface IURIAction extends ActionCtorProps {
    uri?: string;
}
declare class URIAction extends Action {
    uri: string;
    static defaultValues: IObject;
    constructor(args?: IURIAction);
}

declare const BorderStyle: {
    readonly solid: "solid";
    readonly dashed: "dashed";
    readonly beveled: "beveled";
    readonly inset: "inset";
    readonly underline: "underline";
};
type IBorderStyle = (typeof BorderStyle)[keyof typeof BorderStyle];

interface ILinkAnnotation extends AnnotationCtorProps {
    action?: Action | null;
    borderColor?: Color | null;
    borderStyle?: IBorderStyle | null;
    borderWidth?: number | null;
}
declare class LinkAnnotation extends Annotation {
    action: Action;
    borderColor: null | Color;
    borderStyle: null | IBorderStyle;
    borderWidth: null | number;
    static readableName: string;
    static defaultValues: IObject;
    constructor(options?: ILinkAnnotation);
}

declare const NoteIcon: {
    readonly COMMENT: "COMMENT";
    readonly RIGHT_POINTER: "RIGHT_POINTER";
    readonly RIGHT_ARROW: "RIGHT_ARROW";
    readonly CHECK: "CHECK";
    readonly CIRCLE: "CIRCLE";
    readonly CROSS: "CROSS";
    readonly INSERT: "INSERT";
    readonly NEW_PARAGRAPH: "NEW_PARAGRAPH";
    readonly NOTE: "NOTE";
    readonly PARAGRAPH: "PARAGRAPH";
    readonly HELP: "HELP";
    readonly STAR: "STAR";
    readonly KEY: "KEY";
};
type INoteIcon = (typeof NoteIcon)[keyof typeof NoteIcon];

type SignatureInfo = {
    type: 'pspdfkit/signature-info';
    signerName: string | null | undefined;
    creationDate: Date | null | undefined;
    signatureReason: string | null | undefined;
    signatureLocation: string | null | undefined;
    documentIntegrityStatus: DocumentIntegrityStatusType;
    certificateChainValidationStatus: CertificateChainValidationStatusType;
    signatureValidationStatus: SignatureValidationStatusType;
    isTrusted: boolean;
    isSelfSigned: boolean;
    isExpired: boolean;
    documentModifiedSinceSignature: boolean;
    signatureFormFQN: string;
};
declare const DocumentIntegrityStatus: {
    readonly ok: "ok";
    readonly tampered_document: "tampered_document";
    readonly failed_to_retrieve_signature_contents: "failed_to_retrieve_signature_contents";
    readonly failed_to_retrieve_byterange: "failed_to_retrieve_byterange";
    readonly failed_to_compute_digest: "failed_to_compute_digest";
    readonly failed_retrieve_signing_certificate: "failed_retrieve_signing_certificate";
    readonly failed_retrieve_public_key: "failed_retrieve_public_key";
    readonly failed_encryption_padding: "failed_encryption_padding";
    readonly general_failure: "general_failure";
};
type DocumentIntegrityStatusType = (typeof DocumentIntegrityStatus)[keyof typeof DocumentIntegrityStatus];
declare const CertificateChainValidationStatus: {
    readonly ok: "ok";
    readonly ok_but_self_signed: "ok_but_self_signed";
    readonly untrusted: "untrusted";
    readonly expired: "expired";
    readonly not_yet_valid: "not_yet_valid";
    readonly invalid: "invalid";
    readonly revoked: "revoked";
    readonly failed_to_retrieve_signature_contents: "failed_to_retrieve_signature_contents";
    readonly general_validation_problem: "general_validation_problem";
};
type CertificateChainValidationStatusType = (typeof CertificateChainValidationStatus)[keyof typeof CertificateChainValidationStatus];
declare const SignatureValidationStatus: {
    readonly valid: "valid";
    readonly warning: "warning";
    readonly error: "error";
};
type SignatureValidationStatusType = (typeof SignatureValidationStatus)[keyof typeof SignatureValidationStatus];

type SignaturesInfo = {
    status: DocumentValidationStatusType;
    checkedAt: Date;
    signatures?: Array<SignatureInfo>;
    documentModifiedSinceSignature?: boolean;
};
declare const DocumentValidationStatus: {
    valid: string;
    warning: string;
    error: string;
    not_signed: string;
};
type DocumentValidationStatusType = keyof typeof DocumentValidationStatus;

type InstantID = string;
declare function generateInstantId(): InstantID;

type CommentProps = {
    id: InstantID | null;
    rootId: InstantID | null;
    pageIndex: null | number;
    pdfObjectId: number | null;
    creatorName: string | null;
    createdAt: Date;
    updatedAt: Date;
    text: {
        format: 'plain' | 'xhtml';
        value: string | null;
    };
    customData: Record<string, unknown> | null;
    group?: string | null;
    isEditable?: boolean;
    isDeletable?: boolean;
    canSetGroup?: boolean;
    isAnonymous?: boolean | null;
};
declare const Comment_base: Record$1.Factory<CommentProps>;
declare class Comment extends Comment_base {
    getMentionedUserIds(): Set<string>;
}
type MentionableUser = {
    id: string;
    name: string;
    avatarUrl?: string;
    displayName: string;
    description?: string;
};

type IGroup = string | null | undefined;
type IPermissions = {
    edit: boolean;
    delete: boolean;
    setGroup: boolean;
    fill?: boolean;
    reply?: boolean;
};

type ICollaboratorPermissionsOptions = {
    group?: IGroup;
    permissions?: IPermissions;
};

type IAnnotationJSON = Omit<BaseAnnotationJSON, 'id' | 'group' | 'permissions'>;
declare class AnnotationSerializer {
    static VERSION: number;
    annotation: Annotation;
    constructor(annotation: Annotation);
    toJSON(): Omit<BaseAnnotationJSON, 'type'>;
    static fromJSON(id: ID$1 | null, json: IAnnotationJSON, options?: ICollaboratorPermissionsOptions): {
        group?: string | null | undefined;
        canSetGroup?: boolean | undefined;
        isEditable?: boolean | undefined;
        isDeletable?: boolean | undefined;
        blendMode?: IBlendMode | undefined;
        id: string | null;
        name: string | null | undefined;
        subject: string | null | undefined;
        pdfObjectId: number | null;
        pageIndex: number;
        opacity: number;
        boundingBox: Rect;
        noPrint: boolean;
        noZoom: boolean;
        noRotate: boolean;
        noView: boolean;
        hidden: boolean;
        action: Action | null | undefined;
        note: string | null | undefined;
        createdAt: Date;
        updatedAt: Date;
        creatorName: string | null | undefined;
        customData: Record<string, unknown> | null | undefined;
        isCommentThreadRoot: boolean;
    };
    static blendModeObjectForAnnotation(json: IAnnotationJSON): {
        blendMode: IBlendMode;
    } | null;
    serializeFlags(): ("noView" | "noPrint" | "hidden" | "noZoom" | "noRotate")[] | null;
}

declare abstract class ShapeAnnotationSerializer extends AnnotationSerializer {
    annotation: ShapeAnnotation;
    toJSON(): ShapeAnnotationJSON;
    static fromJSON(id: ID$1 | null, json: Omit<ShapeAnnotationJSON, 'id' | 'group' | 'permissions'>, options?: ICollaboratorPermissionsOptions): {
        strokeWidth: number | null;
        strokeColor: Color | null;
        fillColor: Color | null;
        strokeDashArray: [number, number] | null | undefined;
        measurementPrecision: IMeasurementPrecision | null | undefined;
        measurementScale: MeasurementScale | null;
        group?: string | null | undefined;
        canSetGroup?: boolean | undefined;
        isEditable?: boolean | undefined;
        isDeletable?: boolean | undefined;
        blendMode?: IBlendMode | undefined;
        id: string | null;
        name: string | null | undefined;
        subject: string | null | undefined;
        pdfObjectId: number | null;
        pageIndex: number;
        opacity: number;
        boundingBox: Rect;
        noPrint: boolean;
        noZoom: boolean;
        noRotate: boolean;
        noView: boolean;
        hidden: boolean;
        action: Action | null | undefined;
        note: string | null | undefined;
        createdAt: Date;
        updatedAt: Date;
        creatorName: string | null | undefined;
        customData: Record<string, unknown> | null | undefined;
        isCommentThreadRoot: boolean;
    };
    _pointsToJSON(): Array<[number, number]>;
    static _JSONToPoints(pointsJSON: Array<[number, number]>): List<Point>;
    static _JSONLinesToPoints(linesJSON: {
        points: Array<Array<[number, number]>>;
        intensities: Array<Array<number>>;
    }): List<Point>;
}
type MeasurementScaleJSON = {
    unitFrom: IMeasurementScaleUnitFrom;
    unitTo: IMeasurementScaleUnitTo;
    from: number;
    to: number;
};

type StampKind = 'Approved' | 'NotApproved' | 'Draft' | 'Final' | 'Completed' | 'Confidential' | 'ForPublicRelease' | 'NotForPublicRelease' | 'ForComment' | 'Void' | 'PreliminaryResults' | 'InformationOnly' | 'Rejected' | 'Accepted' | 'InitialHere' | 'SignHere' | 'Witness' | 'AsIs' | 'Departmental' | 'Experimental' | 'Expired' | 'Sold' | 'TopSecret' | 'Revised' | 'RejectedWithText' | 'Custom';
interface IStampAnnotation extends AnnotationCtorProps {
    stampType?: string | StampKind | null;
    title?: string | null;
    subtitle?: string | null;
    color?: Color | null;
}
declare class StampAnnotation extends Annotation {
    stampType: StampKind;
    title: null | string;
    subtitle: null | string;
    color: null | Color;
    xfdfAppearanceStream: null | string;
    static defaultValues: IObject;
    static readableName: string;
    constructor(options?: IStampAnnotation);
}

type FontSize = 'auto' | number;
type WidgetActionTriggerEventType = ActionTriggerEventType | 'onFocus' | 'onBlur';
type WidgetAnnotationAdditionalActionsType = {
    onFocus?: JavaScriptAction;
    onBlur?: JavaScriptAction;
    onFormat?: JavaScriptAction;
    onInput?: JavaScriptAction;
    onPointerDown?: Action;
    onPointerUp?: Action;
    onPointerEnter?: Action;
    onPointerLeave?: Action;
};
interface IWidgetAnnotation extends AnnotationCtorProps {
    formFieldName?: string | null;
    borderColor?: Color | null;
    borderStyle?: IBorderStyle | null;
    borderDashArray?: number[] | null;
    borderWidth?: number | null;
    backgroundColor?: Color | null;
    fontSize?: FontSize | null;
    font?: string | null;
    fontColor?: Color | null;
    isBold?: boolean | null;
    isItalic?: boolean | null;
    horizontalAlign?: 'left' | 'center' | 'right' | null;
    verticalAlign?: 'top' | 'center' | 'bottom' | null;
    additionalActions?: WidgetAnnotationAdditionalActionsType | null;
    rotation?: number;
    lineHeightFactor?: number | null;
}
declare class WidgetAnnotation extends Annotation {
    formFieldName: string;
    borderColor: null | Color;
    borderStyle: null | IBorderStyle;
    borderDashArray: null | number[];
    borderWidth: null | number;
    backgroundColor: null | Color;
    fontSize: null | FontSize;
    font: null | string;
    fontColor: null | Color;
    isBold: boolean;
    isItalic: boolean;
    horizontalAlign: 'left' | 'center' | 'right' | null;
    verticalAlign: 'top' | 'center' | 'bottom' | null;
    additionalActions: null | WidgetAnnotationAdditionalActionsType;
    rotation: number;
    lineHeightFactor: null | number;
    static defaultValues: IObject;
    static readableName: string;
    constructor(options?: IWidgetAnnotation);
}

type SerializedAdditionalActionsType = {
    [key in ActionTriggerEventType | FormFieldEventTriggerType | FormFieldInputEventTriggerType | WidgetActionTriggerEventType]?: {
        type: string;
        [key: string]: unknown;
    };
};

declare const SearchType: {
    readonly TEXT: "text";
    readonly PRESET: "preset";
    readonly REGEX: "regex";
};
type ISearchType = (typeof SearchType)[keyof typeof SearchType];

declare const SearchPattern: {
    readonly CREDIT_CARD_NUMBER: "credit_card_number";
    readonly DATE: "date";
    readonly TIME: "time";
    readonly EMAIL_ADDRESS: "email_address";
    readonly INTERNATIONAL_PHONE_NUMBER: "international_phone_number";
    readonly IP_V4: "ipv4";
    readonly IP_V6: "ipv6";
    readonly MAC_ADDRESS: "mac_address";
    readonly NORTH_AMERICAN_PHONE_NUMBER: "north_american_phone_number";
    readonly SOCIAL_SECURITY_NUMBER: "social_security_number";
    readonly URL: "url";
    readonly US_ZIP_CODE: "us_zip_code";
    readonly VIN: "vin";
};
type ISearchPattern = (typeof SearchPattern)[keyof typeof SearchPattern];

type Rotation$1 = 0 | 90 | 180 | 270;
type AddPageConfiguration = {
    backgroundColor: Color;
    pageWidth: number;
    pageHeight: number;
    rotateBy: Rotation$1;
    insets?: Rect;
};
type OperationAttachment = string | File | Blob;
type min = number;
type max = number;
type Range = [min, max];
type ImportPageIndex = Array<number | Range>;
type DocumentMetadata = {
    title?: string;
    author?: string;
};
type NonSerializableDocumentOperations = {
    type: 'removePages';
    pageIndexes: Array<number>;
} | {
    type: 'duplicatePages';
    pageIndexes: Array<number>;
} | {
    type: 'movePages';
    pageIndexes: Array<number>;
    afterPageIndex: number;
} | {
    type: 'movePages';
    pageIndexes: Array<number>;
    beforePageIndex: number;
} | {
    type: 'rotatePages';
    pageIndexes: Array<number>;
    rotateBy: Rotation$1;
} | {
    type: 'keepPages';
    pageIndexes: Array<number>;
} | {
    type: 'importDocument';
    afterPageIndex: number;
    treatImportedDocumentAsOnePage?: boolean;
    document: OperationAttachment;
    importedPageIndexes?: ImportPageIndex;
} | {
    type: 'importDocument';
    beforePageIndex: number;
    treatImportedDocumentAsOnePage?: boolean;
    document: OperationAttachment;
    importedPageIndexes?: ImportPageIndex;
} | {
    type: 'applyInstantJson';
    instantJson: Record<string, any>;
    dataFilePath: OperationAttachment;
} | {
    type: 'applyXfdf';
    xfdf: string;
    dataFilePath: OperationAttachment;
} | {
    type: 'flattenAnnotations';
    pageIndexes?: Array<number>;
    annotationIds?: string[];
} | {
    type: 'setPageLabel';
    pageIndexes?: Array<number>;
    pageLabel?: string;
} | {
    type: 'performOcr';
    pageIndexes?: Array<number> | 'all';
    language: string;
} | {
    type: 'applyRedactions';
} | {
    type: 'updateMetadata';
    metadata: DocumentMetadata;
};
type DocumentOperation = (AddPageConfiguration & {
    type: 'addPage';
    afterPageIndex: number;
}) | (AddPageConfiguration & {
    type: 'addPage';
    beforePageIndex: number;
}) | {
    type: 'cropPages';
    pageIndexes?: Array<number>;
    cropBox: Rect;
} | NonSerializableDocumentOperations;

type BaseFormFieldJSON = {
    v: 1;
    pdfObjectId?: number | null;
    annotationIds: Array<string>;
    name: string;
    label: string;
    flags?: FormFieldFlags;
    id: string;
    additionalActions?: SerializedAdditionalActionsType;
    group?: IGroup;
    permissions?: IPermissions;
};
type ChoiceFormFieldJSON = BaseFormFieldJSON & {
    type: 'pspdfkit/form-field/listbox' | 'pspdfkit/form-field/combobox';
    options: Array<FormOptionJSON>;
    multiSelect: boolean;
    commitOnChange: boolean;
    defaultValues: Array<string>;
};
type ListBoxFormFieldJSON = ChoiceFormFieldJSON & {
    type: 'pspdfkit/form-field/listbox';
};
type DoNotSpellCheckPropertyPair = XOR<Record<'doNotSpellCheck', boolean>, Record<'doNotSpellcheck', boolean>>;
type ComboBoxFormFieldJSON = ChoiceFormFieldJSON & {
    type: 'pspdfkit/form-field/combobox';
    edit: boolean;
} & DoNotSpellCheckPropertyPair;
type CheckBoxFormFieldJSON = BaseFormFieldJSON & {
    type: 'pspdfkit/form-field/checkbox';
    options: Array<FormOptionJSON>;
    defaultValues: Array<string>;
};
type RadioButtonFormFieldJSON = BaseFormFieldJSON & {
    type: 'pspdfkit/form-field/radio';
    options: Array<FormOptionJSON>;
    noToggleToOff: boolean;
    radiosInUnison: boolean;
    defaultValue: string;
};
type TextFormFieldJSON = BaseFormFieldJSON & {
    type: 'pspdfkit/form-field/text';
    password: boolean;
    maxLength?: number | null;
    doNotScroll: boolean;
    multiLine: boolean;
    defaultValue: string;
    comb: boolean;
} & DoNotSpellCheckPropertyPair;
type ButtonFormFieldJSON = BaseFormFieldJSON & {
    type: 'pspdfkit/form-field/button';
    buttonLabel: string | null;
};
type SignatureFormFieldJSON = BaseFormFieldJSON & {
    type: 'pspdfkit/form-field/signature';
};
type FormFieldJSON = ListBoxFormFieldJSON | ComboBoxFormFieldJSON | RadioButtonFormFieldJSON | CheckBoxFormFieldJSON | TextFormFieldJSON | ButtonFormFieldJSON | SignatureFormFieldJSON;

declare class InkAnnotationSerializer extends AnnotationSerializer {
    annotation: InkAnnotation;
    constructor(annotation: InkAnnotation);
    toJSON(): InkAnnotationJSON;
    static fromJSON(id: ID$1 | null, json: Omit<InkAnnotationJSON, 'id' | 'group' | 'permissions'>, options?: ICollaboratorPermissionsOptions): InkAnnotation;
    _linesToJSON(): {
        points: [number, number][][];
        intensities: number[][];
    };
    static _JSONToLines(linesJSON: {
        points: Array<Array<[number, number]>>;
        intensities: Array<Array<number>>;
    }): List<List<DrawingPoint>>;
}

declare class LineAnnotationSerializer extends ShapeAnnotationSerializer {
    annotation: LineAnnotation;
    toJSON(): LineAnnotationJSON;
    static fromJSON(id: ID$1 | null, json: Omit<LineAnnotationJSON, 'id' | 'group' | 'permissions'>, options?: ICollaboratorPermissionsOptions): LineAnnotation;
}

declare class RectangleAnnotationSerializer extends ShapeAnnotationSerializer {
    annotation: RectangleAnnotation;
    toJSON(): RectangleAnnotationJSON;
    static fromJSON(id: ID$1 | null, json: Omit<RectangleAnnotationJSON, 'id' | 'group' | 'permissions'>, options?: ICollaboratorPermissionsOptions): RectangleAnnotation;
}

declare class EllipseAnnotationSerializer extends ShapeAnnotationSerializer {
    annotation: EllipseAnnotation;
    toJSON(): EllipseAnnotationJSON;
    static fromJSON(id: ID$1 | null, json: Omit<EllipseAnnotationJSON, 'id' | 'group' | 'permissions'>, options?: ICollaboratorPermissionsOptions): EllipseAnnotation;
}

declare class PolygonAnnotationSerializer extends ShapeAnnotationSerializer {
    annotation: PolygonAnnotation;
    toJSON(): PolygonAnnotationJSON;
    static fromJSON(id: ID$1 | null, json: Omit<PolygonAnnotationJSON, 'id' | 'group' | 'permissions'>, options?: IObject): PolygonAnnotation;
}

declare class PolylineAnnotationSerializer extends ShapeAnnotationSerializer {
    annotation: PolylineAnnotation;
    toJSON(): PolylineAnnotationJSON;
    static fromJSON(id: ID$1 | null, json: Omit<PolylineAnnotationJSON, 'id' | 'group' | 'permissions'>, options?: ICollaboratorPermissionsOptions): PolylineAnnotation;
}

declare class LinkAnnotationSerializer extends AnnotationSerializer {
    annotation: LinkAnnotation;
    constructor(annotation: LinkAnnotation);
    toJSON(): LinkAnnotationJSON;
    static fromJSON(id: ID$1 | null, json: Omit<LinkAnnotationJSON, 'id' | 'group' | 'permissions'>, options?: ICollaboratorPermissionsOptions): LinkAnnotation;
}

declare abstract class BaseTextMarkupSerializer extends AnnotationSerializer {
    annotation: RedactionAnnotation | TextMarkupAnnotation;
    constructor(annotation: RedactionAnnotation | TextMarkupAnnotation);
    toJSON(): BaseTextMarkupAnnotationJSON;
    static fromJSON(id: ID$1 | null, json: Omit<BaseTextMarkupAnnotationJSON, 'id' | 'group' | 'permissions'>, options?: ICollaboratorPermissionsOptions): {
        rects: List<Rect>;
        group?: string | null | undefined;
        canSetGroup?: boolean | undefined;
        isEditable?: boolean | undefined;
        isDeletable?: boolean | undefined;
        blendMode?: IBlendMode | undefined;
        id: string | null;
        name: string | null | undefined;
        subject: string | null | undefined;
        pdfObjectId: number | null;
        pageIndex: number;
        opacity: number;
        boundingBox: Rect;
        noPrint: boolean;
        noZoom: boolean;
        noRotate: boolean;
        noView: boolean;
        hidden: boolean;
        action: Action | null | undefined;
        note: string | null | undefined;
        createdAt: Date;
        updatedAt: Date;
        creatorName: string | null | undefined;
        customData: Record<string, unknown> | null | undefined;
        isCommentThreadRoot: boolean;
    };
}

declare class TextMarkupAnnotationSerializer extends BaseTextMarkupSerializer {
    annotation: TextMarkupAnnotation;
    constructor(annotation: TextMarkupAnnotation);
    toJSON(): TextMarkupAnnotationJSON;
    static fromJSON(id: ID$1 | null, json: Omit<TextMarkupAnnotationJSON, 'id' | 'group' | 'permissions'>, options?: ICollaboratorPermissionsOptions): TextMarkupAnnotation;
    typeForAnnotation(): "pspdfkit/markup/highlight" | "pspdfkit/markup/squiggly" | "pspdfkit/markup/strikeout" | "pspdfkit/markup/underline" | "pspdfkit/markup/redaction";
}

interface IRedactionAnnotation extends ITextMarkupAnnotation {
    color?: Color;
    fillColor?: null | Color;
    overlayText?: null | string;
    repeatOverlayText?: null | boolean;
    outlineColor?: null | Color;
}
declare class RedactionAnnotation extends TextMarkupAnnotation {
    fillColor: null | Color;
    overlayText: null | string;
    repeatOverlayText: null | boolean;
    outlineColor: null | Color;
    color: Color;
    static readableName: string;
    static defaultValues: IObject;
    constructor(options?: IRedactionAnnotation);
}

declare class RedactionAnnotationSerializer extends BaseTextMarkupSerializer {
    annotation: RedactionAnnotation;
    constructor(annotation: RedactionAnnotation);
    toJSON(): RedactionAnnotationJSON;
    static fromJSON(id: ID$1 | null, json: Omit<RedactionAnnotationJSON, 'id' | 'group' | 'permissions'>, options?: ICollaboratorPermissionsOptions): RedactionAnnotation;
}

declare class TextAnnotationSerializer extends AnnotationSerializer {
    annotation: TextAnnotation;
    constructor(annotation: TextAnnotation);
    toJSON(): TextAnnotationJSON;
    static fromJSON(id: ID$1 | null, json: Omit<TextAnnotationJSON, 'id' | 'group' | 'permissions'>, options?: ICollaboratorPermissionsOptions): TextAnnotation;
    _calloutToJSON(): {
        start: [number, number];
        knee: [number, number] | null;
        end: [number, number];
        cap: ILineCap | null;
        innerRectInset: InsetJSON;
    } | null;
    static _JSONToCallout(calloutJSON: TextAnnotationJSON['callout']): Callout | null | undefined;
}

declare class NoteAnnotationSerializer extends AnnotationSerializer {
    annotation: NoteAnnotation;
    constructor(annotation: NoteAnnotation);
    toJSON(): NoteAnnotationJSON;
    static fromJSON(id: ID$1 | null, json: Omit<NoteAnnotationJSON, 'id' | 'group' | 'permissions'>, options?: ICollaboratorPermissionsOptions): NoteAnnotation;
}

declare class ImageAnnotationSerializer extends AnnotationSerializer {
    annotation: ImageAnnotation;
    constructor(annotation: ImageAnnotation);
    toJSON(): ImageAnnotationJSON;
    static fromJSON(id: ID$1 | null, json: Omit<ImageAnnotationJSON, 'id' | 'group' | 'permissions'>, options?: ICollaboratorPermissionsOptions): ImageAnnotation;
}

declare class StampAnnotationSerializer extends AnnotationSerializer {
    annotation: StampAnnotation;
    constructor(annotation: StampAnnotation);
    toJSON(): StampAnnotationJSON;
    static fromJSON(id: ID$1 | null, json: Omit<StampAnnotationJSON, 'id' | 'group' | 'permissions'>, options?: ICollaboratorPermissionsOptions): StampAnnotation;
}

declare class WidgetAnnotationSerializer extends AnnotationSerializer {
    annotation: WidgetAnnotation;
    constructor(annotation: WidgetAnnotation);
    toJSON(): WidgetAnnotationJSON;
    static fromJSON(id: ID$1 | null, json: Omit<WidgetAnnotationJSON, 'id' | 'group' | 'permissions'>, options?: ICollaboratorPermissionsOptions): WidgetAnnotation;
}

declare class CommentMarkerAnnotationSerializer extends AnnotationSerializer {
    annotation: CommentMarkerAnnotation;
    constructor(annotation: CommentMarkerAnnotation);
    toJSON(): CommentMarkerAnnotationJSON;
    static fromJSON(id: InstantID | null, json: Omit<CommentMarkerAnnotationJSON, 'id' | 'group' | 'permissions'>, options?: ICollaboratorPermissionsOptions): CommentMarkerAnnotation;
}

declare class UnknownAnnotationSerializer extends AnnotationSerializer {
    annotation: UnknownAnnotation;
    constructor(annotation: UnknownAnnotation);
    toJSON(): UnknownAnnotationJSON;
    static fromJSON(id: ID$1 | null, json: Omit<UnknownAnnotationJSON, 'id' | 'group' | 'permissions'>, options?: ICollaboratorPermissionsOptions): UnknownAnnotation;
}

interface IMediaAnnotation extends AnnotationCtorProps {
    description: null | string;
    fileName: null | string;
    contentType: string;
    mediaAttachmentId: string;
}
declare class MediaAnnotation extends Annotation {
    description: null | string;
    fileName: null | string;
    contentType: string;
    mediaAttachmentId: string;
    static defaultValues: IObject;
    static readableName: string;
    constructor(options?: IMediaAnnotation);
}

declare class MediaAnnotationSerializer extends AnnotationSerializer {
    annotation: MediaAnnotation;
    constructor(annotation: MediaAnnotation);
    toJSON(): MediaAnnotationJSON;
    static fromJSON(id: ID$1 | null, json: Omit<MediaAnnotationJSON, 'id' | 'group' | 'permissions'>, options?: ICollaboratorPermissionsOptions): MediaAnnotation;
}

type AnnotationSerializerTypeMap = {
    'pspdfkit/ink': {
        serializer: InkAnnotationSerializer;
        annotation: InkAnnotation;
        json: InkAnnotationJSON;
        jsonForBackend: AnnotationBackendJSON<InkAnnotationJSON>;
    };
    'pspdfkit/shape/line': {
        serializer: LineAnnotationSerializer;
        annotation: LineAnnotation;
        json: LineAnnotationJSON;
        jsonForBackend: AnnotationBackendJSON<LineAnnotationJSON>;
    };
    'pspdfkit/shape/rectangle': {
        serializer: RectangleAnnotationSerializer;
        annotation: RectangleAnnotation;
        json: RectangleAnnotationJSON;
        jsonForBackend: AnnotationBackendJSON<RectangleAnnotationJSON>;
    };
    'pspdfkit/shape/ellipse': {
        serializer: EllipseAnnotationSerializer;
        annotation: EllipseAnnotation;
        json: EllipseAnnotationJSON;
        jsonForBackend: AnnotationBackendJSON<EllipseAnnotationJSON>;
    };
    'pspdfkit/shape/polygon': {
        serializer: PolygonAnnotationSerializer;
        annotation: PolygonAnnotation;
        json: PolygonAnnotationJSON;
        jsonForBackend: AnnotationBackendJSON<PolygonAnnotationJSON>;
    };
    'pspdfkit/shape/polyline': {
        serializer: PolylineAnnotationSerializer;
        annotation: PolylineAnnotation;
        json: PolylineAnnotationJSON;
        jsonForBackend: AnnotationBackendJSON<PolylineAnnotationJSON>;
    };
    'pspdfkit/link': {
        serializer: LinkAnnotationSerializer;
        annotation: LinkAnnotation;
        json: LinkAnnotationJSON;
        jsonForBackend: AnnotationBackendJSON<LinkAnnotationJSON>;
    };
    'pspdfkit/markup/highlight': {
        serializer: TextMarkupAnnotationSerializer;
        annotation: HighlightAnnotation;
        json: TextMarkupAnnotationJSON;
        jsonForBackend: AnnotationBackendJSON<TextMarkupAnnotationJSON>;
    };
    'pspdfkit/markup/squiggly': {
        serializer: TextMarkupAnnotationSerializer;
        annotation: SquiggleAnnotation;
        json: TextMarkupAnnotationJSON;
        jsonForBackend: AnnotationBackendJSON<TextMarkupAnnotationJSON>;
    };
    'pspdfkit/markup/strikeout': {
        serializer: TextMarkupAnnotationSerializer;
        annotation: StrikeOutAnnotation;
        json: TextMarkupAnnotationJSON;
        jsonForBackend: AnnotationBackendJSON<TextMarkupAnnotationJSON>;
    };
    'pspdfkit/markup/underline': {
        serializer: TextMarkupAnnotationSerializer;
        annotation: UnderlineAnnotation;
        json: TextMarkupAnnotationJSON;
        jsonForBackend: AnnotationBackendJSON<TextMarkupAnnotationJSON>;
    };
    'pspdfkit/markup/redaction': {
        serializer: RedactionAnnotationSerializer;
        annotation: RedactionAnnotation;
        json: RedactionAnnotationJSON;
        jsonForBackend: AnnotationBackendJSON<RedactionAnnotationJSON>;
    };
    'pspdfkit/text': {
        serializer: TextAnnotationSerializer;
        annotation: TextAnnotation;
        json: TextAnnotationJSON;
        jsonForBackend: AnnotationBackendJSON<TextAnnotationJSON>;
    };
    'pspdfkit/note': {
        serializer: NoteAnnotationSerializer;
        annotation: NoteAnnotation;
        json: NoteAnnotationJSON;
        jsonForBackend: AnnotationBackendJSON<NoteAnnotationJSON>;
    };
    'pspdfkit/image': {
        serializer: ImageAnnotationSerializer;
        annotation: ImageAnnotation;
        json: ImageAnnotationJSON;
        jsonForBackend: AnnotationBackendJSON<ImageAnnotationJSON>;
    };
    'pspdfkit/stamp': {
        serializer: StampAnnotationSerializer;
        annotation: StampAnnotation;
        json: StampAnnotationJSON;
        jsonForBackend: AnnotationBackendJSON<StampAnnotationJSON, 'color'>;
    };
    'pspdfkit/widget': {
        serializer: WidgetAnnotationSerializer;
        annotation: WidgetAnnotation;
        json: WidgetAnnotationJSON;
        jsonForBackend: AnnotationBackendJSON<WidgetAnnotationJSON>;
    };
    'pspdfkit/comment-marker': {
        serializer: CommentMarkerAnnotationSerializer;
        annotation: CommentMarkerAnnotation;
        json: CommentMarkerAnnotationJSON;
        jsonForBackend: AnnotationBackendJSON<CommentMarkerAnnotationJSON>;
    };
    'pspdfkit/unknown': {
        serializer: UnknownAnnotationSerializer;
        annotation: UnknownAnnotation;
        json: UnknownAnnotationJSON;
        jsonForBackend: AnnotationBackendJSON<UnknownAnnotationJSON>;
    };
    'pspdfkit/media': {
        serializer: MediaAnnotationSerializer;
        annotation: MediaAnnotation;
        json: MediaAnnotationJSON;
        jsonForBackend: AnnotationBackendJSON<MediaAnnotationJSON>;
    };
};
type GetTypeFromAnnotationJSON<T extends {
    type: keyof AnnotationSerializerTypeMap;
}> = T extends {
    type: infer U;
} ? U : never;
type AnnotationJSONToAnnotation<T extends {
    type: keyof AnnotationSerializerTypeMap;
}> = AnnotationSerializerTypeMap[GetTypeFromAnnotationJSON<T>]['annotation'];
type Intersection<T, U> = T extends U ? T : never;
type BackendRequiredKeys = 'id' | 'v' | 'pageIndex' | 'type' | 'bbox';
type AnnotationBackendJSON<K extends BaseAnnotationJSON = AnnotationJSONUnion, R extends string = never> = {
    [P in keyof K]?: NonNullable<K[P]>;
} & {
    [P in Intersection<keyof K, BackendRequiredKeys | R>]-?: Exclude<NonNullable<K[P]>, undefined>;
};

declare function toJSON(bookmark: Bookmark): BookmarkJSON;

type ID = string;
type BookmarkProps = {
    id: ID | null;
    pdfBookmarkId: ID | null;
    name: string | null;
    sortKey: number | null;
    action: Action | null;
};
declare const Bookmark_base: Record$1.Factory<BookmarkProps>;
declare class Bookmark extends Bookmark_base {
    id: ID;
    action: Action;
    static toSerializableObject: typeof toJSON;
    static fromSerializableObject: (bookmark: BookmarkJSON) => Bookmark;
}

declare const DocumentComparisonSourceType: {
    readonly USE_OPEN_DOCUMENT: "USE_OPEN_DOCUMENT";
    readonly USE_FILE_DIALOG: "USE_FILE_DIALOG";
};
type IDocumentComparisonSourceType = (typeof DocumentComparisonSourceType)[keyof typeof DocumentComparisonSourceType];

type DocumentComparisonSource = {
    source: IDocumentComparisonSourceType | string | ArrayBuffer | Promise<string | ArrayBuffer>;
    pageIndex?: number;
};

type DocumentComparisonStrokeColors = {
    documentA?: Color;
    documentB?: Color;
};

type DocumentComparisonConfiguration = {
    documentA: DocumentComparisonSource;
    documentB: DocumentComparisonSource;
    strokeColors?: DocumentComparisonStrokeColors;
    blendMode?: IBlendMode;
    autoCompare: boolean;
};

declare const LayoutMode: {
    readonly SINGLE: "SINGLE";
    readonly DOUBLE: "DOUBLE";
    readonly AUTO: "AUTO";
};
type ILayoutMode = (typeof LayoutMode)[keyof typeof LayoutMode];

declare const ScrollMode: {
    readonly CONTINUOUS: "CONTINUOUS";
    readonly PER_SPREAD: "PER_SPREAD";
    readonly DISABLED: "DISABLED";
};
type IScrollMode = (typeof ScrollMode)[keyof typeof ScrollMode];

declare const ZoomMode: {
    readonly AUTO: "AUTO";
    readonly FIT_TO_WIDTH: "FIT_TO_WIDTH";
    readonly FIT_TO_VIEWPORT: "FIT_TO_VIEWPORT";
    readonly CUSTOM: "CUSTOM";
};
type IZoomMode = (typeof ZoomMode)[keyof typeof ZoomMode];

declare const ProductId: {
    SharePoint: string;
    Salesforce: string;
};
type IProductId = (typeof ProductId)[keyof typeof ProductId];

type IRectJSON = [left: number, top: number, width: number, height: number];

type BaseAnnotationJSON = {
    v: number;
    type?: 'pspdfkit/ink' | 'pspdfkit/shape/line' | 'pspdfkit/shape/rectangle' | 'pspdfkit/shape/ellipse' | 'pspdfkit/shape/polygon' | 'pspdfkit/shape/polyline' | 'pspdfkit/link' | 'pspdfkit/markup/highlight' | 'pspdfkit/markup/squiggly' | 'pspdfkit/markup/strikeout' | 'pspdfkit/markup/underline' | 'pspdfkit/markup/redaction' | 'pspdfkit/stamp' | 'pspdfkit/text' | 'pspdfkit/note' | 'pspdfkit/image' | 'pspdfkit/media' | 'pspdfkit/widget' | 'pspdfkit/comment-marker' | 'pspdfkit/unknown';
    name?: string | null;
    id: string;
    subject?: string | null;
    pdfObjectId?: number | null;
    pageIndex: number;
    bbox: IRectJSON;
    opacity?: number;
    flags?: ('noPrint' | 'noZoom' | 'noRotate' | 'noView' | 'hidden')[] | null;
    action?: ActionJSON | null;
    note?: string | null;
    createdAt?: string | Date;
    updatedAt?: string | Date;
    creatorName?: string | null;
    customData?: Record<string, unknown> | null;
    isCommentThreadRoot?: boolean;
    APStreamCache?: {
        cache: string;
    } | {
        attach: string;
    };
    blendMode?: IBlendMode | null;
} & ICollaboratorPermissionsOptions;
type ImageAnnotationJSON = Omit<BaseAnnotationJSON, 'type'> & {
    type: 'pspdfkit/image';
    description?: string | null;
    fileName?: string | null;
    contentType: string;
    imageAttachmentId: string;
    rotation: number;
    isSignature?: boolean;
    xfdfAppearanceStream?: string;
};
type ShapeAnnotationJSON = Omit<BaseAnnotationJSON, 'type'> & {
    strokeWidth: number;
    strokeColor: string | null;
    fillColor: string | null;
    strokeDashArray?: [number, number] | null;
    measurementPrecision?: IMeasurementPrecision | null;
    measurementScale?: MeasurementScaleJSON | null;
    lineWidth?: number | null;
};
type EllipseAnnotationJSON = ShapeAnnotationJSON & {
    type: 'pspdfkit/shape/ellipse';
    cloudyBorderIntensity: number | null;
    cloudyBorderInset: InsetJSON | null;
};
type LineAnnotationJSON = ShapeAnnotationJSON & {
    type: 'pspdfkit/shape/line';
    startPoint: [number, number];
    endPoint: [number, number];
    lineCaps?: LineCapsType | null;
    lines?: {
        points: [number, number][][];
        intensities: number[][];
    };
};
type PolygonAnnotationJSON = ShapeAnnotationJSON & {
    type: 'pspdfkit/shape/polygon';
    points: [number, number][];
    cloudyBorderIntensity: number | null;
    lines?: {
        points: [number, number][][];
        intensities: number[][];
    };
};
type PolylineAnnotationJSON = ShapeAnnotationJSON & {
    type: 'pspdfkit/shape/polyline';
    points: [number, number][];
    lineCaps?: LineCapsType | null;
    lines?: {
        points: [number, number][][];
        intensities: number[][];
    };
};
type RectangleAnnotationJSON = ShapeAnnotationJSON & {
    type: 'pspdfkit/shape/rectangle';
    cloudyBorderIntensity: number | null;
    cloudyBorderInset?: InsetJSON | null;
};
type InkAnnotationJSON = BaseAnnotationJSON & {
    type: 'pspdfkit/ink';
    lines: {
        points: [number, number][][];
        intensities: number[][];
    };
    lineWidth: number;
    strokeColor: string | null;
    backgroundColor: string | null;
    isDrawnNaturally: boolean;
    isSignature: boolean;
};
type LinkAnnotationJSON = BaseAnnotationJSON & {
    type: 'pspdfkit/link';
    borderColor?: string | null;
    borderWidth?: number | null;
    borderStyle?: IBorderStyle | null;
};
type NoteAnnotationJSON = Omit<BaseAnnotationJSON, 'type'> & {
    type: 'pspdfkit/note';
    text?: {
        format: 'plain';
        value: string;
    };
    icon?: string;
    color?: string;
};
type MediaAnnotationJSON = Omit<BaseAnnotationJSON, 'type'> & {
    type: 'pspdfkit/media';
    description: string | null;
    fileName: string | null;
    contentType: string;
    mediaAttachmentId: string;
};
type BaseTextMarkupAnnotationJSON = Omit<BaseAnnotationJSON, 'type'> & {
    rects: [number, number, number, number][];
};
type TextMarkupAnnotationJSON = BaseTextMarkupAnnotationJSON & {
    type: 'pspdfkit/markup/highlight' | 'pspdfkit/markup/squiggly' | 'pspdfkit/markup/strikeout' | 'pspdfkit/markup/underline' | 'pspdfkit/markup/redaction';
    color: string | null;
};
type RedactionAnnotationJSON = BaseTextMarkupAnnotationJSON & {
    type: 'pspdfkit/markup/redaction';
    fillColor?: string | null;
    outlineColor?: string | null;
    overlayText?: string | null;
    repeatOverlayText?: boolean | null;
    rotation?: number;
    color?: string | null;
};
type StampAnnotationJSON = Omit<BaseAnnotationJSON, 'type'> & {
    type: 'pspdfkit/stamp';
    stampType: StampKind;
    title: string | null;
    color?: string | null;
    subTitle?: string | null;
    subtitle: string | null;
    rotation: number | null;
    xfdfAppearanceStream?: string;
    kind?: StampKind;
};
type TextAnnotationJSON = Omit<BaseAnnotationJSON, 'type'> & {
    type: 'pspdfkit/text';
    text: {
        format: 'xhtml' | 'plain';
        value: string;
    };
    fontColor?: string | null;
    backgroundColor?: string | null;
    font?: string | null;
    rotation?: number | null;
    fontSize?: number | null;
    fontStyle?: string[] | null;
    horizontalAlign?: 'left' | 'center' | 'right';
    verticalAlign?: 'top' | 'center' | 'bottom';
    callout?: {
        start: [number, number];
        knee?: [number, number] | null;
        end: [number, number];
        cap?: ILineCap | null;
        innerRectInset: InsetJSON;
    } | null;
    borderStyle?: IBorderStyle | null;
    borderWidth?: number | null;
    isFitting?: boolean;
};
type UnknownAnnotationJSON = Omit<BaseAnnotationJSON, 'type'> & {
    type: 'pspdfkit/unknown';
};
type WidgetAnnotationJSON = Omit<BaseAnnotationJSON, 'type'> & {
    type: 'pspdfkit/widget';
    formFieldName: string;
    borderColor?: string | null;
    borderStyle?: IBorderStyle | null;
    borderDashArray?: number[] | null;
    borderWidth?: number | null;
    font?: string | null;
    fontSize?: 'auto' | number | null;
    fontColor?: string | null;
    backgroundColor?: string | null;
    horizontalAlign?: 'left' | 'center' | 'right' | null;
    verticalAlign?: 'top' | 'center' | 'bottom' | null;
    fontStyle?: string[] | null | undefined;
    rotation?: number;
    additionalActions?: SerializedAdditionalActionsType | null;
    lineHeightFactor?: number | null;
};
type CommentMarkerAnnotationJSON = Omit<BaseAnnotationJSON, 'type'> & {
    type: 'pspdfkit/comment-marker';
};
type AnnotationJSONUnion = TextMarkupAnnotationJSON | TextAnnotationJSON | WidgetAnnotationJSON | RedactionAnnotationJSON | StampAnnotationJSON | NoteAnnotationJSON | LinkAnnotationJSON | InkAnnotationJSON | RectangleAnnotationJSON | PolylineAnnotationJSON | PolygonAnnotationJSON | LineAnnotationJSON | EllipseAnnotationJSON | ImageAnnotationJSON | UnknownAnnotationJSON | MediaAnnotationJSON | CommentMarkerAnnotationJSON;

type SerializedJSON = {
    skippedPdfObjectIds?: number[];
    annotations?: AnnotationJSONUnion[];
    formFields?: FormFieldJSON[];
    skippedPdfFormFieldIds?: number[];
    formFieldValues?: Record<string, any>[];
    attachments?: Record<string, {
        binary: string;
        contentType: string;
    }>;
    skippedPdfBookmarkIds?: string[];
    bookmarks?: BookmarkJSON[];
};
type InstantJSON = SerializedJSON & {
    format: 'https://pspdfkit.com/instant-json/v1';
    pdfId?: {
        permanent: string;
        changing: string;
    };
};

type ActionFlags = 'includeExclude' | 'includeNoValueFields' | 'exportFormat' | 'getMethod' | 'submitCoordinated' | 'xfdf' | 'includeAppendSaves' | 'includeAnnotations' | 'submitPDF' | 'canonicalFormat' | 'excludeNonUserAnnotations' | 'excludeFKey' | 'embedForm';
type ActionJSON = {
    type: 'uri';
    uri: string;
    subactions?: Array<ActionJSON>;
} | {
    type: 'goTo';
    pageIndex: number;
    subactions?: Array<ActionJSON>;
} | {
    type: 'goToEmbedded';
    newWindow: boolean;
    relativePath: string;
    targetType: 'parent' | 'child';
    subactions?: Array<ActionJSON>;
} | {
    type: 'goToRemote';
    relativePath: string;
    namedDestination: string;
    subactions?: Array<ActionJSON>;
} | {
    type: 'hide';
    hide: boolean;
    annotationReferences: Array<AnnotationReference>;
    subactions?: Array<ActionJSON>;
} | {
    type: 'resetForm';
    fields: Array<string> | null;
    flags: string | null;
    subactions?: Array<ActionJSON>;
} | {
    type: 'submitForm';
    uri: string;
    fields: Array<string> | null;
    flags: Array<ActionFlags> | null;
    subactions?: Array<ActionJSON>;
} | {
    type: 'launch';
    filePath: string;
    subactions?: Array<ActionJSON>;
} | {
    type: 'named';
    action: string;
    subactions?: Array<ActionJSON>;
} | {
    type: 'javaScript';
    script: string;
    subactions?: Array<ActionJSON>;
};
type BookmarkJSON = {
    v: 1;
    type: 'pspdfkit/bookmark';
    id: string;
    name: string | null;
    sortKey: number | null;
    action: ActionJSON;
    pdfBookmarkId: string | null;
};
type RawPdfBoxes = {
    bleedBox: null | IRectJSON;
    cropBox: null | IRectJSON;
    mediaBox: null | IRectJSON;
    trimBox: null | IRectJSON;
};

declare const SearchResult_base: Record$1.Factory<{
    pageIndex: number | null;
    previewText: string;
    locationInPreview: number | null;
    lengthInPreview: number | null;
    rectsOnPage: List<Rect>;
    isAnnotation: boolean | null;
    annotationRect?: Rect | null | undefined;
}>;
declare class SearchResult extends SearchResult_base {
}

declare const SearchState_base: Record$1.Factory<ISearchState>;
declare class SearchState extends SearchState_base {
}
interface ISearchState {
    isFocused: boolean;
    isLoading: boolean;
    term: string;
    focusedResultIndex: number;
    results: List<SearchResult>;
    minSearchQueryLength: number;
}

declare const AutoSaveMode: {
    readonly IMMEDIATE: "IMMEDIATE";
    readonly INTELLIGENT: "INTELLIGENT";
    readonly DISABLED: "DISABLED";
};
type IAutoSaveMode = (typeof AutoSaveMode)[keyof typeof AutoSaveMode];

declare const PrintMode: {
    readonly DOM: "DOM";
    readonly EXPORT_PDF: "EXPORT_PDF";
};
type IPrintMode = (typeof PrintMode)[keyof typeof PrintMode];

declare const PrintQuality: {
    readonly LOW: "LOW";
    readonly MEDIUM: "MEDIUM";
    readonly HIGH: "HIGH";
};
type IPrintQuality = (typeof PrintQuality)[keyof typeof PrintQuality];

declare const SidebarPlacement: {
    readonly START: "START";
    readonly END: "END";
};
type ISidebarPlacement = (typeof SidebarPlacement)[keyof typeof SidebarPlacement];

declare const ToolbarPlacement: {
    readonly TOP: "TOP";
    readonly BOTTOM: "BOTTOM";
};
type IToolbarPlacement = (typeof ToolbarPlacement)[keyof typeof ToolbarPlacement];

declare const ShowSignatureValidationStatusMode: {
    readonly IF_SIGNED: "IF_SIGNED";
    readonly HAS_WARNINGS: "HAS_WARNINGS";
    readonly HAS_ERRORS: "HAS_ERRORS";
    readonly NEVER: "NEVER";
};
type IShowSignatureValidationStatusMode = (typeof ShowSignatureValidationStatusMode)[keyof typeof ShowSignatureValidationStatusMode];

declare class AnnotationNote extends NoteAnnotation {
    parentAnnotation?: Annotation;
    position: Point;
    static defaultValues: IObject;
    constructor(annotation: Annotation | null, width?: number, height?: number);
}

declare const ModificationType: {
    readonly CREATED: "CREATED";
    readonly UPDATED: "UPDATED";
    readonly DELETED: "DELETED";
};
type IModificationType = (typeof ModificationType)[keyof typeof ModificationType];

type SaveErrorReason = {
    error: any;
    object: any;
    modificationType: IModificationType;
};
declare function PSPDFKitSaveError(messageOrError: string | Error, reason: Array<SaveErrorReason>): Error;
declare namespace PSPDFKitSaveError {
    var prototype: any;
}

type AnnotationPreset$1 = Record<string, any>;
type AnnotationPresetID$1 = string;

type AnnotationTooltipCallback = (arg0: Annotation) => Array<ToolItem>;

declare global {
  interface SymbolConstructor {
    readonly observable: symbol
  }
}

type RendererConfiguration = {
    node: Node;
    append?: boolean | null;
    noZoom?: boolean | null;
    onDisappear?: ((arg0: Node | null) => void) | null;
};

type CustomRenderers = {
    Annotation?: (arg0: {
        annotation: Annotation;
    }) => RendererConfiguration | null | undefined;
    CommentAvatar?: (arg0: {
        comment: Comment;
    }) => RendererConfiguration | null | undefined;
};

declare const SidebarMode: {
    readonly ANNOTATIONS: "ANNOTATIONS";
    readonly BOOKMARKS: "BOOKMARKS";
    readonly DOCUMENT_OUTLINE: "DOCUMENT_OUTLINE";
    readonly THUMBNAILS: "THUMBNAILS";
    readonly CUSTOM: "CUSTOM";
};
type ISidebarMode = (typeof SidebarMode)[keyof typeof SidebarMode];

declare const UIElement: {
    readonly Sidebar: "Sidebar";
};
type IUIElement = (typeof UIElement)[keyof typeof UIElement];

type RendererProps = {
    containerNode: Node;
    items?: List<any> | null;
};
type ItemRendererProps = {
    itemContainerNode: Node;
    item: any;
};
type ItemCustomRenderer = (itemRendererProps: ItemRendererProps) => void;
type UIRendererConfiguration = {
    node: Node;
    onRenderItem?: ItemCustomRenderer;
};
type Renderer = (rendererProps: RendererProps) => UIRendererConfiguration;
type CustomUISidebarConfiguration = Partial<{
    [K in ISidebarMode]: Renderer;
}>;
type CustomUIElementConfiguration = CustomUISidebarConfiguration;
type CustomUI = Partial<Record<IUIElement, CustomUIElementConfiguration>>;

declare const FormFieldValue_base: Record$1.Factory<{
    name?: string | undefined;
    value?: string | number | List<string> | null | undefined;
    optionIndexes?: List<number> | undefined;
    isFitting?: boolean | undefined;
}>;
declare class FormFieldValue extends FormFieldValue_base {
    name: string;
    value: string | List<string> | null;
    optionIndexes?: List<number>;
    isFitting?: boolean;
    static defaultValues: IObject;
    constructor(args?: IObject);
}

type Change = Annotation | Bookmark | FormField | FormFieldValue | Comment;

type IsEditableAnnotationCallback = (annotation: Annotation) => boolean;

type RenderPageCallback = (context: CanvasRenderingContext2D, pageIndex: number, pageSize: Size) => unknown;

type CustomOverlayItemID = string;
interface ICustomOverlayItem {
    disableAutoZoom?: boolean;
    id: CustomOverlayItemID | null;
    node: Node | null;
    noRotate?: boolean;
    pageIndex: number;
    position: Point;
    onAppear?: null | ((...args: Array<any>) => any);
    onDisappear?: null | ((...args: Array<any>) => any);
}
declare const CustomOverlayItem_base: Record$1.Factory<ICustomOverlayItem>;
declare class CustomOverlayItem extends CustomOverlayItem_base {
    disableAutoZoom: boolean;
    id: CustomOverlayItemID;
    node: Node;
    noRotate: boolean;
    pageIndex: number;
    position: Point;
    onAppear?: ((...args: Array<any>) => any) | null;
    onDisappear?: ((...args: Array<any>) => any) | null;
    constructor(args: ICustomOverlayItem);
}

interface ITextLine {
    id: number | null;
    pageIndex: number | null;
    boundingBox: Rect;
    contents: string;
}
declare const TextLine_base: Record$1.Factory<ITextLine>;
declare class TextLine extends TextLine_base {
}

type FontCallback = (arg0: string) => Promise<Blob>;

interface IFont {
    name: string | null;
    callback: FontCallback | null;
}
declare const Font_base: Record$1.Factory<IFont>;
declare class Font extends Font_base {
    constructor(args: {
        name: string;
        callback?: FontCallback;
    });
}

interface ITextRange {
    startNode: Text | null;
    startOffset: number | null;
    endNode: Text | null;
    endOffset: number | null;
}
declare const TextRange_base: Record$1.Factory<ITextRange>;
declare class TextRange extends TextRange_base {
    startNode: Text;
    startOffset: number;
    endNode: Text;
    endOffset: number;
    startAndEndIds(): {
        startTextLineId: number;
        endTextLineId: number;
        startPageIndex: number;
        endPageIndex: number;
    };
}

interface ITextSelection$1 {
    textRange: TextRange | null;
    startTextLineId: number | null;
    endTextLineId: number | null;
    startPageIndex: number | null;
    endPageIndex: number | null;
}
declare const TextSelection_base: Record$1.Factory<ITextSelection$1>;
declare class TextSelection extends TextSelection_base {
}

type IsEditableCommentCallback = (comment: Comment) => boolean;

declare const ElectronicSignatureCreationMode: {
    readonly DRAW: "DRAW";
    readonly IMAGE: "IMAGE";
    readonly TYPE: "TYPE";
};
type IElectronicSignatureCreationMode = (typeof ElectronicSignatureCreationMode)[keyof typeof ElectronicSignatureCreationMode];

type AnnotationsResizeEvent = {
    annotation: Annotation;
    isShiftPressed: boolean;
    resizeAnchor: ResizeAnchor;
};
type ResizeAnchor = 'TOP' | 'BOTTOM' | 'LEFT' | 'RIGHT' | 'TOP_LEFT' | 'TOP_RIGHT' | 'BOTTOM_RIGHT' | 'BOTTOM_LEFT';

type AnnotationResizeStartCallbackConfiguration = {
    maintainAspectRatio?: boolean;
    minWidth?: number | undefined;
    minHeight?: number | undefined;
    maxWidth?: number | undefined;
    maxHeight?: number | undefined;
};
type AnnotationResizeStartCallback = (event: AnnotationsResizeEvent) => AnnotationResizeStartCallbackConfiguration;

declare const InteractionMode: {
    readonly TEXT_HIGHLIGHTER: "TEXT_HIGHLIGHTER";
    readonly INK: "INK";
    readonly INK_SIGNATURE: "INK_SIGNATURE";
    readonly SIGNATURE: "SIGNATURE";
    readonly STAMP_PICKER: "STAMP_PICKER";
    readonly STAMP_CUSTOM: "STAMP_CUSTOM";
    readonly SHAPE_LINE: "SHAPE_LINE";
    readonly SHAPE_RECTANGLE: "SHAPE_RECTANGLE";
    readonly SHAPE_ELLIPSE: "SHAPE_ELLIPSE";
    readonly SHAPE_POLYGON: "SHAPE_POLYGON";
    readonly SHAPE_POLYLINE: "SHAPE_POLYLINE";
    readonly INK_ERASER: "INK_ERASER";
    readonly NOTE: "NOTE";
    readonly COMMENT_MARKER: "COMMENT_MARKER";
    readonly TEXT: "TEXT";
    readonly PAN: "PAN";
    readonly SEARCH: "SEARCH";
    readonly DOCUMENT_EDITOR: "DOCUMENT_EDITOR";
    readonly MARQUEE_ZOOM: "MARQUEE_ZOOM";
    readonly REDACT_TEXT_HIGHLIGHTER: "REDACT_TEXT_HIGHLIGHTER";
    readonly REDACT_SHAPE_RECTANGLE: "REDACT_SHAPE_RECTANGLE";
    readonly DOCUMENT_CROP: "DOCUMENT_CROP";
    readonly BUTTON_WIDGET: "BUTTON_WIDGET";
    readonly TEXT_WIDGET: "TEXT_WIDGET";
    readonly RADIO_BUTTON_WIDGET: "RADIO_BUTTON_WIDGET";
    readonly CHECKBOX_WIDGET: "CHECKBOX_WIDGET";
    readonly COMBO_BOX_WIDGET: "COMBO_BOX_WIDGET";
    readonly LIST_BOX_WIDGET: "LIST_BOX_WIDGET";
    readonly SIGNATURE_WIDGET: "SIGNATURE_WIDGET";
    readonly DATE_WIDGET: "DATE_WIDGET";
    readonly FORM_CREATOR: "FORM_CREATOR";
    readonly LINK: "LINK";
    readonly DISTANCE: "DISTANCE";
    readonly PERIMETER: "PERIMETER";
    readonly RECTANGLE_AREA: "RECTANGLE_AREA";
    readonly ELLIPSE_AREA: "ELLIPSE_AREA";
    readonly POLYGON_AREA: "POLYGON_AREA";
    readonly CONTENT_EDITOR: "CONTENT_EDITOR";
    readonly MULTI_ANNOTATIONS_SELECTION: "MULTI_ANNOTATIONS_SELECTION";
};
type IInteractionMode = (typeof InteractionMode)[keyof typeof InteractionMode];

type OnOpenUriCallback = (uri: string, isUserInitiated: boolean) => boolean;

declare class PageInfo {
    index: number;
    label: string;
    height: number;
    width: number;
    rotation: number;
    rawPdfBoxes: RawPdfBoxes;
}

declare const ViewportPadding_base: Record$1.Factory<{
    horizontal: number;
    vertical: number;
}>;
declare class ViewportPadding extends ViewportPadding_base {
}

type SidebarOptions = {
    [SidebarMode.ANNOTATIONS]: AnnotationsSidebarOptions;
};
type AnnotationsSidebarOptions = {
    includeContent: Array<typeof Annotation | typeof Comment>;
};

type Rotation = 0 | 90 | 180 | 270;
interface IViewState {
    allowPrinting: boolean;
    allowExport: boolean;
    currentPageIndex: number;
    instance: Instance | null;
    interactionMode: IInteractionMode | null;
    keepFirstSpreadAsSinglePage: boolean;
    layoutMode: ILayoutMode;
    pageSpacing: number;
    pagesRotation: Rotation;
    readOnly: boolean;
    scrollMode: IScrollMode;
    showAnnotations: boolean;
    showComments: boolean;
    showAnnotationNotes: boolean;
    showToolbar: boolean;
    enableAnnotationToolbar: boolean;
    sidebarMode: ISidebarMode | null | undefined;
    sidebarOptions: SidebarOptions;
    sidebarPlacement: ISidebarPlacement;
    spreadSpacing: number;
    viewportPadding: ViewportPadding;
    zoom: IZoomMode | number;
    formDesignMode: boolean;
    showSignatureValidationStatus: IShowSignatureValidationStatusMode;
    previewRedactionMode: boolean;
    canScrollWhileDrawing: boolean;
    keepSelectedTool: boolean;
    resolvedLayoutMode: ILayoutMode;
    sidebarWidth: number;
}
declare const ViewState_base: Record$1.Factory<IViewState>;
declare class ViewState extends ViewState_base {
    zoomIn(): ViewState;
    zoomOut(): ViewState;
    rotateLeft(): ViewState;
    rotateRight(): ViewState;
    goToNextPage(): ViewState;
    goToPreviousPage(): ViewState;
}

declare class InstantClient {
    clientId: string;
    userId: string | null | undefined;
}

declare const allowedToolbarTypes: ("distance" | "note" | "comment" | "text" | "zoom-in" | "zoom-out" | "link" | "search" | "debug" | "arrow" | "highlighter" | "undo" | "redo" | "signature" | "ellipse" | "image" | "line" | "polygon" | "polyline" | "spacer" | "print" | "rectangle" | "ink" | "stamp" | "cloudy-rectangle" | "dashed-rectangle" | "cloudy-ellipse" | "dashed-ellipse" | "cloudy-polygon" | "dashed-polygon" | "text-highlighter" | "perimeter" | "ellipse-area" | "rectangle-area" | "polygon-area" | "sidebar-thumbnails" | "sidebar-document-outline" | "sidebar-annotations" | "sidebar-bookmarks" | "pager" | "multi-annotations-selection" | "pan" | "zoom-mode" | "annotate" | "ink-eraser" | "document-editor" | "document-crop" | "export-pdf" | "layout-config" | "marquee-zoom" | "custom" | "responsive-group" | "redact-text-highlighter" | "redact-rectangle" | "document-comparison" | "form-creator" | "content-editor")[];

type ToolbarItemType = ToolItemType | (typeof allowedToolbarTypes)[number];
type ToolbarItem = Omit<ToolItem, 'type'> & {
    type: ToolbarItemType;
    mediaQueries?: string[];
    responsiveGroup?: string;
    dropdownGroup?: string;
    preset?: AnnotationPresetID$1;
    onKeyPress?: (...args: Array<any>) => any;
};

type OutlineElementProps = {
    children: List<OutlineElement>;
    title: string;
    color: Color | null;
    isBold: boolean;
    isItalic: boolean;
    isExpanded: boolean;
    action: Action | null;
};
declare const OutlineElement_base: Record$1.Factory<OutlineElementProps>;
declare class OutlineElement extends OutlineElement_base {
}

interface ICallout {
    start: Point | null;
    knee: Point | null;
    end: Point | null;
    cap: ILineCap | null;
    innerRectInset: Inset | null;
}
declare const Callout_base: Record$1.Factory<ICallout>;
declare class Callout extends Callout_base {
    static defaultValues: IObject;
}

interface ITextAnnotation extends AnnotationCtorProps {
    text?: {
        format: 'plain' | 'xhtml';
        value: string;
    };
    fontColor?: Color | null;
    backgroundColor?: Color | null;
    font?: string;
    rotation?: number;
    fontSize?: number | null;
    isBold?: boolean | null;
    isItalic?: boolean | null;
    horizontalAlign?: 'left' | 'center' | 'right';
    verticalAlign?: 'top' | 'center' | 'bottom';
    callout?: Callout | null;
    borderStyle?: IBorderStyle | null;
    borderWidth?: number | null;
}
declare class TextAnnotation extends Annotation {
    text: {
        format: 'plain' | 'xhtml';
        value: string;
    };
    fontColor: null | Color;
    backgroundColor: null | Color;
    font: string;
    rotation: number;
    fontSize: number;
    isBold: boolean;
    isItalic: boolean;
    horizontalAlign: 'left' | 'center' | 'right';
    verticalAlign: 'top' | 'center' | 'bottom';
    isFitting: boolean;
    callout: null | Callout;
    borderStyle: null | IBorderStyle;
    borderWidth: null | number;
    static defaultValues: IObject;
    static isEditable: boolean;
    static readableName: string;
    static fontSizePresets: readonly number[];
    constructor(options?: ITextAnnotation);
}

type TwoStepSignatureCallback = (arg0: {
    hash: string;
    fileContents: ArrayBuffer;
}) => Promise<ArrayBuffer>;

type SignaturePreparationData = {
    placeholderSize?: number;
    flatten?: boolean;
};

type SigningServiceData = {
    signingToken: string;
};

type RedactionAnnotationPreset = {
    fillColor?: Color;
    overlayText?: string;
    repeatOverlayText?: boolean;
    color?: Color;
    outlineColor?: Color;
    creatorName?: string;
};

type AnnotationsPressEvent = {
    annotation: Annotation;
    nativeEvent: Event;
    preventDefault?: () => void;
    selected: boolean;
};

declare enum AnnotationsWillChangeReason {
    DRAW_START = "DRAW_START",
    DRAW_END = "DRAW_END",
    TEXT_EDIT_START = "TEXT_EDIT_START",
    TEXT_EDIT_END = "TEXT_EDIT_END",
    SELECT_START = "SELECT_START",
    SELECT_END = "SELECT_END",
    MOVE_START = "MOVE_START",
    MOVE_END = "MOVE_END",
    RESIZE_START = "RESIZE_START",
    RESIZE_END = "RESIZE_END",
    ROTATE_START = "ROTATE_START",
    ROTATE_END = "ROTATE_END",
    DELETE_START = "DELETE_START",
    DELETE_END = "DELETE_END",
    PROPERTY_CHANGE = "PROPERTY_CHANGE"
}

type PagePressEvent = {
    pageIndex: number;
    point: Point;
    nativeEvent: Event;
};

type AnnotationPresetsUpdateEvent = {
    preventDefault: () => boolean;
    currentPreset: AnnotationPresetID;
    currentPresetProperties: AnnotationPreset;
    newPresetProperties: AnnotationPreset;
};

type AnnotationsFocusEvent = {
    annotation: Annotation;
    nativeEvent: FocusEvent;
};
type AnnotationsBlurEvent = {
    annotation: Annotation;
    nativeEvent: FocusEvent;
};

type SaveStateChangeEvent = {
    hasUnsavedChanges: boolean;
};

type SearchTermChangeEvent = {
    term: string;
    preventDefault: () => void;
};

type TextLinePressEvent = {
    textLine: TextLine;
    point: Point;
    nativeEvent: Event;
};

type CropAreaChangeStartEvent = {
    cropBox: Rect;
    pageIndex: number;
};
type CropAreaChangeStopEvent = {
    cropBox: Rect;
    pageIndex: number;
};

type AnnotationsTransformEvent = {
    annotation: Annotation;
};

type AnnotationsCopyEvent = {
    annotation: Annotation;
};

type AnnotationsCutEvent = {
    annotation: Annotation;
};

type AnnotationsPasteEvent = {
    annotation: Annotation;
    formField?: FormField;
    previousAction: 'COPY' | 'CUT';
    originalAnnotation: Annotation;
    originalFormField?: FormField;
};

type AnnotationsDuplicateEvent = {
    annotation: Annotation;
    formField?: FormField;
    originalAnnotation: Annotation;
    originalFormField?: FormField;
};

interface ITextSelection {
    startTextLineId: number | null;
    startPageIndex: number | null;
    startNode: Text | null;
    startOffset: number | null;
    endTextLineId: number | null;
    endPageIndex: number | null;
    endNode: Text | null;
    endOffset: number | null;
    getText: (() => Promise<string>) | null;
    getSelectedTextLines: (() => Promise<List<TextLine>>) | null;
    getBoundingClientRect: (() => Promise<Rect>) | null;
    getSelectedRectsPerPage: (() => Promise<List<{
        pageIndex: number;
        rects: List<Rect>;
    }>>) | null;
}
declare const PublicTextSelection_base: Record$1.Factory<ITextSelection>;
declare class PublicTextSelection extends PublicTextSelection_base {
    startTextLineId: number;
    startPageIndex: number;
    startNode: Text;
    startOffset: number;
    endTextLineId: number;
    endPageIndex: number;
    endNode: Text;
    endOffset: number;
    getText: () => Promise<string>;
    getSelectedTextLines: () => Promise<List<TextLine>>;
    getBoundingClientRect: () => Promise<Rect>;
    getSelectedRectsPerPage: () => Promise<List<{
        pageIndex: number;
        rects: List<Rect>;
    }>>;
}

type AnnotationNotePressEvent = {
    preventDefault: () => boolean;
    annotationNote?: AnnotationNote | null;
};

type AnnotationNoteHoverEvent = {
    preventDefault: () => boolean;
    annotationNote?: AnnotationNote | null;
};

type DocumentComparisonUIStartEvent = DocumentComparisonConfiguration;

type CommentsMentionEvent = {
    comment: Comment;
    modifications: List<{
        userId: string;
        action: 'ADDED' | 'REMOVED';
    }>;
};

type Signature = InkAnnotation | ImageAnnotation;
interface HistoryEvent<T> {
    action: T;
    before: Annotation;
    after: Annotation;
}
interface EventMap {
    'viewState.change': (viewState: ViewState, previousViewState: ViewState) => void;
    'viewState.currentPageIndex.change': (pageIndex: number) => void;
    'viewState.zoom.change': (zoom: number) => void;
    'annotationPresets.update': (event: AnnotationPresetsUpdateEvent) => void;
    'annotations.blur': (event: AnnotationsBlurEvent) => void;
    'annotations.change': () => void;
    'annotations.create': (annotations: List<Annotation>) => void;
    'annotations.delete': (annotations: List<Annotation>) => void;
    'annotations.didSave': () => void;
    'annotations.focus': (event: AnnotationsFocusEvent) => void;
    'annotations.load': (annotations: List<Annotation>) => void;
    'annotations.press': (event: AnnotationsPressEvent) => void;
    'annotations.update': (annotations: List<Annotation>) => void;
    'annotations.willChange': (event: {
        reason: AnnotationsWillChangeReason;
        annotations: List<Annotation>;
    }) => void;
    'annotations.willSave': () => void;
    'annotationSelection.change': (annotation?: Annotation) => void;
    'annotations.transform': (event: AnnotationsTransformEvent) => void;
    'annotations.copy': (event: AnnotationsCopyEvent) => void;
    'annotations.cut': (event: AnnotationsCutEvent) => void;
    'annotations.paste': (event: AnnotationsPasteEvent) => void;
    'annotations.duplicate': (event: AnnotationsDuplicateEvent) => void;
    'bookmarks.change': () => void;
    'bookmarks.create': (bookmarks: List<Bookmark>) => void;
    'bookmarks.update': (bookmarks: List<Bookmark>) => void;
    'bookmarks.delete': (bookmarks: List<Bookmark>) => void;
    'bookmarks.load': (bookmarks: List<Bookmark>) => void;
    'bookmarks.didSave': () => void;
    'bookmarks.willSave': () => void;
    'comments.change': () => void;
    'comments.create': (comments: List<Comment>) => void;
    'comments.delete': (comments: List<Comment>) => void;
    'comments.update': (comments: List<Comment>) => void;
    'comments.load': () => void;
    'comments.willSave': () => void;
    'comments.didSave': () => void;
    'instant.connectedClients.change': (clients: Map<string, InstantClient>) => void;
    'document.change': (operations: DocumentOperation[]) => void;
    'document.saveStateChange': (event: SaveStateChangeEvent) => void;
    'formFieldValues.update': (formFields: List<FormField>) => void;
    'formFieldValues.willSave': () => void;
    'formFieldValues.didSave': (res: {
        response: Response;
        error: Error;
    }) => void;
    'forms.willSubmit': (event: {
        preventDefault: () => void;
    }) => void;
    'forms.didSubmit': (event: {
        preventDefault: () => void;
    }) => void;
    'formFields.change': () => void;
    'formFields.create': (formFields: List<FormField>) => void;
    'formFields.delete': (formFields: List<FormField>) => void;
    'formFields.didSave': () => void;
    'formFields.load': (formFields: List<FormField>) => void;
    'formFields.update': (formFields: List<FormField>) => void;
    'formFields.willSave': () => void;
    'search.stateChange': (searchState: SearchState) => void;
    'search.termChange': (event: SearchTermChangeEvent) => void;
    'storedSignatures.change': () => void;
    'storedSignatures.create': (signature: Signature) => void;
    'storedSignatures.delete': (signature: Signature) => void;
    'storedSignatures.update': (signatures: List<Signature>) => void;
    'textLine.press': (event: TextLinePressEvent) => void;
    'textSelection.change': (selection: PublicTextSelection | null) => void;
    'history.change': (event: HistoryEvent<'undo' | 'redo'>) => void;
    'history.willChange': (event: {
        type: 'create' | 'update' | 'delete';
        annotation: Annotation;
        preventDefault: () => void;
    }) => void;
    'history.clear': () => void;
    'history.redo': (event: HistoryEvent<'redo'>) => void;
    'history.undo': (event: HistoryEvent<'undo'>) => void;
    'page.press': (event: PagePressEvent) => void;
    'inkSignatures.create': (signature: Signature) => void;
    'inkSignatures.delete': (signature: Signature) => void;
    'inkSignatures.update': (signatures: Signature[]) => void;
    'inkSignatures.change': () => void;
    'cropArea.changeStart': (opts: CropAreaChangeStartEvent) => void;
    'cropArea.changeStop': (opts: CropAreaChangeStopEvent) => void;
    'documentComparisonUI.start': (opts: DocumentComparisonUIStartEvent) => void;
    'documentComparisonUI.end': () => void;
    'annotationNote.press': (event: AnnotationNotePressEvent) => void;
    'annotationNote.hover': (event: AnnotationNoteHoverEvent) => void;
    'comments.mention': (event: CommentsMentionEvent) => void;
}

interface IEmbeddedFile {
    id: ID$1;
    attachmentId: string;
    description: null | string;
    fileName: null | string;
    fileSize: null | number;
    updatedAt: null | Date;
}
declare const EmbeddedFile_base: Record$1.Factory<IEmbeddedFile>;
declare class EmbeddedFile extends EmbeddedFile_base {
}

type IAnnotationToolbarType = 'stroke-color' | 'fill-color' | 'background-color' | 'opacity' | 'line-width' | 'blend-mode' | 'spacer' | 'delete' | 'annotation-note' | 'border-color' | 'border-width' | 'border-style' | 'color' | 'linecaps-dasharray' | 'line-style' | 'font' | 'overlay-text' | 'outline-color' | 'apply-redactions';
type BuiltInAnnotationToolbarItem = {
    type: IAnnotationToolbarType;
};
type Shared = Omit<ToolItem, 'selected' | 'type'> & {
    onPress?: (nativeEvent: MouseEvent, id?: string) => void;
    iconClassName?: string;
    onIconPress?: (nativeEvent: MouseEvent, id?: string) => void;
};
type AnnotationToolbarItem = (Omit<Shared, 'node'> & {
    type: IAnnotationToolbarType;
}) | (Omit<Shared, 'icon'> & {
    id: string;
    type: 'custom';
    icon?: string | Node;
    node?: Node;
});

type AnnotationToolbarItemsCallback = (annotation: Annotation, options: {
    defaultAnnotationToolbarItems: BuiltInAnnotationToolbarItem[];
    hasDesktopLayout: boolean;
}) => AnnotationToolbarItem[];

type OnWidgetAnnotationCreationStartCallback = (annotation: WidgetAnnotation, formField: FormField) => {
    annotation?: WidgetAnnotation;
    formField?: FormField;
};

declare const builtInItems: readonly ["highlight", "strikeout", "underline", "squiggle", "redact-text-highlighter", "comment"];
type InlineToolbarType = (typeof builtInItems)[number];
type InlineTextSelectionToolbarItem = Omit<ToolItem, 'type'> & {
    type: InlineToolbarType | 'custom';
};
type InlineTextSelectionToolbarItemsCallback = (options: {
    defaultItems: InlineTextSelectionToolbarItem[];
    hasDesktopLayout: boolean;
}, selection: TextSelection) => InlineTextSelectionToolbarItem[];

type ViewStateSetter = (currentState: ViewState) => ViewState;
type ToolbarItemsSetter = (currentState: ToolbarItem[]) => ToolbarItem[];
type StoredSignaturesSetter = (annotations: List<InkAnnotation | ImageAnnotation>) => List<InkAnnotation | ImageAnnotation>;
type SearchStateSetter = (currentState: SearchState) => SearchState;
type AnnotationPresetsSetter = (currentState: Record<string, AnnotationPreset$1>) => Record<string, AnnotationPreset$1>;
type StampAnnotationTemplatesSetter = (currentState: Array<StampAnnotation | ImageAnnotation>) => Array<StampAnnotation | ImageAnnotation>;
type SetDocumentEditorFooterFunction = (currentState: DocumentEditorFooterItem[]) => DocumentEditorFooterItem[];
type SetDocumentEditorToolbarFunction = (currentState: DocumentEditorToolbarItem[]) => DocumentEditorToolbarItem[];
declare class Instance {
    totalPageCount: number;
    pageInfoForIndex: (pageIndex: number) => PageInfo | null | undefined;
    textLinesForPageIndex: (pageIndex: number) => Promise<List<TextLine>>;
    getMarkupAnnotationText: (annotation: TextMarkupAnnotation) => Promise<string>;
    getTextFromRects: (pageIndex: number, rects: List<Rect>) => Promise<string>;
    currentZoomLevel: number;
    maximumZoomLevel: number;
    minimumZoomLevel: number;
    connectedClients: Map<string, InstantClient>;
    addEventListener: <K extends keyof EventMap>(action: K, listener: EventMap[K]) => void;
    removeEventListener: <K extends keyof EventMap>(action: K, listener: EventMap[K]) => void;
    jumpToRect: (pageIndex: number, rect: Rect) => void;
    jumpAndZoomToRect: (pageIndex: number, rect: Rect) => void;
    transformContentClientToPageSpace: (rectOrPoint: Rect | Point, pageIndex: number) => Rect | Point;
    transformContentPageToClientSpace: (rectOrPoint: Rect | Point, pageIndex: number) => Rect | Point;
    transformClientToPageSpace: (rectOrPoint: Rect | Point, pageIndex: number) => Rect | Point;
    transformPageToClientSpace: (rectOrPoint: Rect | Point, pageIndex: number) => Rect | Point;
    transformRawToPageSpace: (rawInset: InsetJSON | Inset, pageIndex: number) => Rect;
    transformPageToRawSpace: (rect: Rect, pageIndex: number) => Inset;
    exportPDF: (flags?: ExportPDFFlags) => Promise<ArrayBuffer>;
    exportXFDF: () => Promise<string>;
    exportInstantJSON: (version?: number) => Promise<InstantJSON>;
    renderPageAsArrayBuffer: (options: {
        width: number;
    } | {
        height: number;
    }, pageIndex: number) => Promise<ArrayBuffer>;
    renderPageAsImageURL: (options: {
        width: number;
    } | {
        height: number;
    }, pageIndex: number) => Promise<string>;
    print: (printMode?: IPrintMode | {
        mode?: IPrintMode;
        excludeAnnotations?: boolean;
    }) => void;
    abortPrint: () => void;
    setCustomRenderers: (customRenderers: CustomRenderers) => void;
    setCustomUIConfiguration: (customUIConfigurationOrConfigurationSetter: CustomUI | ((customUI: CustomUI | null) => CustomUI)) => void;
    getDocumentOutline: () => Promise<List<OutlineElement>>;
    setAnnotationCreatorName: (annotationCreatorName?: string | null) => void;
    setOnWidgetAnnotationCreationStart: (callback: OnWidgetAnnotationCreationStartCallback) => void;
    contentWindow: Window;
    contentDocument: Document;
    readonly viewState: ViewState;
    setViewState: (stateOrFunction: ViewStateSetter | ViewState) => void;
    readonly toolbarItems: ToolbarItem[];
    setToolbarItems: (stateOrFunction: ToolbarItemsSetter | ToolbarItem[]) => void;
    setAnnotationToolbarItems: (annotationToolbarItemsCallback: AnnotationToolbarItemsCallback) => void;
    setInlineTextSelectionToolbarItems: (InlineTextSelectionToolbarItemsCallback: InlineTextSelectionToolbarItemsCallback) => void;
    annotationPresets: Record<AnnotationPresetID$1, AnnotationPreset$1>;
    setAnnotationPresets: (stateOrFunction: AnnotationPresetsSetter | Record<AnnotationPresetID$1, AnnotationPreset$1>) => void;
    setCurrentAnnotationPreset: (annotationPresetID?: string | null) => void;
    readonly currentAnnotationPreset: string | null | undefined;
    readonly stampAnnotationTemplates: Array<StampAnnotation | ImageAnnotation>;
    setStampAnnotationTemplates: (stateOrFunction: StampAnnotationTemplatesSetter | Array<StampAnnotation | ImageAnnotation>) => void;
    getAnnotations: (pageIndex: number) => Promise<List<Annotation>>;
    createAttachment: (file: Blob) => Promise<string>;
    getAttachment: (attachmentId: string) => Promise<Blob>;
    calculateFittingTextAnnotationBoundingBox: (annotation: TextAnnotation) => TextAnnotation;
    setOnAnnotationResizeStart: (callback: AnnotationResizeStartCallback) => void;
    getBookmarks: () => Promise<List<Bookmark>>;
    getFormFields: () => Promise<List<FormField>>;
    getFormFieldValues: () => Record<string, null | string | Array<string>>;
    setFormFieldValues: (formFieldValues: Record<string, null | string | Array<string>>) => void;
    getTextSelection: () => Record<string, any> | null | undefined;
    getSelectedAnnotation: () => Annotation | null | undefined;
    getSelectedAnnotations: () => List<Annotation> | null | undefined;
    setSelectedAnnotation: (annotationOrAnnotationId?: (Annotation | ID$1) | null) => void;
    setEditingAnnotation: (annotationOrAnnotationId?: (Annotation | ID$1) | null, autoSelectText?: boolean | null) => void;
    setCustomOverlayItem: (item: CustomOverlayItem) => void;
    removeCustomOverlayItem: (id: CustomOverlayItemID) => void;
    readonly locale: string;
    setLocale: (arg0: string) => Promise<void>;
    getInkSignatures: () => Promise<List<InkAnnotation | ImageAnnotation>>;
    getStoredSignatures: () => Promise<List<InkAnnotation | ImageAnnotation>>;
    setInkSignatures: (stateOrFunction: StoredSignaturesSetter | List<InkAnnotation | ImageAnnotation>) => Promise<void>;
    setStoredSignatures: (stateOrFunction: StoredSignaturesSetter | List<InkAnnotation | ImageAnnotation>) => Promise<void>;
    search: (term: string, options?: {
        startPageIndex?: number;
        endPageIndex?: number;
        searchType?: ISearchType;
        searchInAnnotations?: boolean;
        caseSensitive?: boolean;
    }) => Promise<List<SearchResult>>;
    startUISearch: (term: string) => void;
    readonly searchState: SearchState;
    setSearchState: (stateOrFunction: SearchStateSetter | SearchState) => void;
    readonly editableAnnotationTypes: Array<Class<Annotation>>;
    setEditableAnnotationTypes: (arg0: Array<Class<Annotation>>) => void;
    setIsEditableAnnotation: (arg0: IsEditableAnnotationCallback) => void;
    setIsEditableComment: (arg0: IsEditableCommentCallback) => void;
    setGroup: (group: string) => void;
    resetGroup: () => void;
    setMentionableUsers: (users: MentionableUser[]) => void;
    setMaxMentionSuggestions: (maxSuggestions: number) => void;
    getComments: () => Promise<List<Comment>>;
    setDocumentEditorFooterItems: (stateOrFunction: DocumentEditorFooterItem[] | SetDocumentEditorFooterFunction) => void;
    setDocumentEditorToolbarItems: (stateOrFunction: DocumentEditorToolbarItem[] | SetDocumentEditorToolbarFunction) => void;
    getSignaturesInfo: () => Promise<SignaturesInfo>;
    signDocument: (arg0: SignaturePreparationData | null | undefined, arg1: TwoStepSignatureCallback | (SigningServiceData | null | undefined)) => Promise<void>;
    applyOperations: (operations: Array<DocumentOperation>) => Promise<void>;
    exportPDFWithOperations: (arg0: Array<DocumentOperation>) => Promise<ArrayBuffer>;
    applyRedactions: () => Promise<void>;
    save: () => Promise<void>;
    hasUnsavedChanges: () => boolean;
    ensureChangesSaved: (changes: Change | Array<Change>) => Promise<Array<Change>>;
    create: (changes: Change | Array<Change> | List<Change>) => Promise<Array<Change>>;
    update: (changes: Change | Array<Change> | List<Change>) => Promise<Array<Change>>;
    delete: (ids: InstantID | Change | Array<InstantID | Change> | List<InstantID | Change>) => Promise<Array<Change>>;
    toggleClipboardActions: (enable: boolean) => void;
    setMeasurementSnapping: (enable: boolean) => void;
    setMeasurementPrecision: (precision: IMeasurementPrecision) => void;
    setMeasurementScale: (scale: MeasurementScale) => void;
    createRedactionsBySearch: (term: string | ISearchPattern, options?: {
        searchType?: ISearchType;
        searchInAnnotations?: boolean;
        caseSensitive?: boolean;
        annotationPreset?: RedactionAnnotationPreset;
    }) => Promise<List<string>>;
    history: {
        undo: () => Promise<boolean>;
        redo: () => Promise<boolean>;
        clear: () => void;
        enable: () => void;
        disable: () => void;
        canUndo: () => boolean;
        canRedo: () => boolean;
    };
    setDocumentComparisonMode: (documentComparisonConfiguration: DocumentComparisonConfiguration | null) => void;
    getEmbeddedFiles: () => Promise<List<EmbeddedFile>>;
}

declare const UIDateTimeElement: {
    readonly COMMENT_THREAD: "COMMENT_THREAD";
    readonly ANNOTATIONS_SIDEBAR: "ANNOTATIONS_SIDEBAR";
};
type IUIDateTimeElement = (typeof UIDateTimeElement)[keyof typeof UIDateTimeElement];

type DateTimeStringCallback = (args: {
    dateTime: Date;
    element: IUIDateTimeElement;
    object: Annotation | Comment;
}) => string;

declare const InkEraserMode: {
    readonly POINT: "POINT";
    readonly STROKE: "STROKE";
};
type IInkEraserMode = (typeof InkEraserMode)[keyof typeof InkEraserMode];

type BuiltInColorProperty = 'color' | 'stroke-color' | 'fill-color' | 'background-color' | 'font-color' | 'outline-color';
type AnnotationToolbarColorPresetConfig = {
    presets: ColorPreset[];
    showColorPicker?: boolean;
};
type AnnotationToolbarColorPresetsCallback = (options: {
    propertyName: BuiltInColorProperty;
    defaultAnnotationToolbarColorPresets: ColorPreset[];
}) => AnnotationToolbarColorPresetConfig | undefined;

type EnableRichTextCallback = (annotation: TextAnnotation) => boolean;

type TrustedCAsCallback = () => Promise<Array<ArrayBuffer | string>>;

type ElectronicSignaturesConfiguration = {
    creationModes?: Readonly<IElectronicSignatureCreationMode[]>;
    fonts?: Readonly<Font[]>;
    unstable_colorPresets?: Readonly<ColorPreset[]>;
};

declare const Theme: {
    readonly LIGHT: "LIGHT";
    readonly DARK: "DARK";
    readonly AUTO: "AUTO";
};
type ITheme = (typeof Theme)[keyof typeof Theme];

type SharedConfiguration = {
    container: string | HTMLElement;
    initialViewState?: ViewState;
    baseUrl?: string;
    serverUrl?: string;
    styleSheets?: Array<string>;
    toolbarItems?: Array<ToolbarItem>;
    annotationPresets?: Record<AnnotationPresetID$1, AnnotationPreset$1>;
    stampAnnotationTemplates?: Array<StampAnnotation | ImageAnnotation>;
    autoSaveMode?: IAutoSaveMode;
    disableHighQualityPrinting?: boolean;
    printMode?: IPrintMode;
    printOptions?: {
        mode?: IPrintMode;
        quality?: IPrintQuality;
    };
    disableTextSelection?: boolean;
    disableForms?: boolean;
    headless?: boolean;
    locale?: string;
    populateInkSignatures?: () => Promise<List<InkAnnotation | ImageAnnotation>>;
    populateStoredSignatures?: () => Promise<List<InkAnnotation | ImageAnnotation>>;
    formFieldsNotSavingSignatures?: Array<string>;
    password?: string;
    disableOpenParameters?: boolean;
    maxPasswordRetries?: number;
    enableServiceWorkerSupport?: boolean;
    preventTextCopy?: boolean;
    renderPageCallback?: RenderPageCallback;
    annotationTooltipCallback?: AnnotationTooltipCallback;
    editableAnnotationTypes?: Array<Class<Annotation>>;
    isEditableAnnotation?: IsEditableAnnotationCallback;
    onAnnotationResizeStart?: AnnotationResizeStartCallback;
    customRenderers?: CustomRenderers;
    customUI?: CustomUI;
    theme?: ITheme;
    toolbarPlacement?: IToolbarPlacement;
    minDefaultZoomLevel?: number;
    maxDefaultZoomLevel?: number;
    isEditableComment?: IsEditableCommentCallback;
    restrictAnnotationToPageBounds?: boolean;
    electronicSignatures?: ElectronicSignaturesConfiguration;
    documentEditorFooterItems?: DocumentEditorFooterItem[];
    documentEditorToolbarItems?: DocumentEditorToolbarItem[];
    enableHistory?: boolean;
    onOpenURI?: OnOpenUriCallback;
    dateTimeString?: DateTimeStringCallback;
    annotationToolbarColorPresets?: AnnotationToolbarColorPresetsCallback;
    annotationToolbarItems?: AnnotationToolbarItemsCallback;
    enableClipboardActions?: boolean;
    renderPagePreview?: boolean;
    unstable_inkEraserMode?: IInkEraserMode;
    onWidgetAnnotationCreationStart?: OnWidgetAnnotationCreationStartCallback;
    inlineTextSelectionToolbarItems?: InlineTextSelectionToolbarItemsCallback;
    measurementSnapping?: boolean;
    measurementPrecision?: IMeasurementPrecision;
    measurementScale?: MeasurementScale;
    enableRichText?: EnableRichTextCallback;
};
type Instant = {
    public: boolean;
};
type ServerConfiguration = SharedConfiguration & {
    documentId: string;
    authPayload: {
        jwt: string;
    };
    instant: Instant[keyof Instant];
    anonymousComments?: boolean;
    mentionableUsers?: Array<MentionableUser>;
    maxMentionSuggestions?: number;
};
type StandaloneConfiguration = SharedConfiguration & {
    document: string | ArrayBuffer;
    baseCoreUrl?: string;
    licenseKey?: string;
    instantJSON?: InstantJSON;
    XFDF?: string;
    XFDFKeepCurrentAnnotations?: boolean;
    disableWebAssemblyStreaming?: boolean;
    disableIndexedDBCaching?: boolean;
    enableAutomaticLinkExtraction?: boolean;
    standaloneInstancesPoolSize?: number;
    overrideMemoryLimit?: number;
    trustedCAsCallback?: TrustedCAsCallback;
    customFonts?: Array<Font>;
    electronAppName?: string;
    isSharePoint?: boolean;
    isSalesforce?: boolean;
    productId?: IProductId;
};
type Configuration = ServerConfiguration | StandaloneConfiguration;

type FormFieldFlags = Array<'readOnly' | 'required' | 'noExport'>;
type FormOptionJSON = {
    label: string;
    value: string;
};
type ExportPDFFlags = {
    flatten?: boolean;
    incremental?: boolean;
    includeComments?: boolean;
    saveForPrinting?: boolean;
    excludeAnnotations?: boolean;
};

type FormFieldAdditionalActionsType = {
    onChange?: Action;
    onCalculate?: Action;
};
type FormFieldEventTriggerType = keyof FormFieldAdditionalActionsType;
type FormFieldInputAdditionalActionsType = FormFieldAdditionalActionsType & {
    onInput?: Action;
    onFormat?: Action;
};
type FormFieldInputEventTriggerType = keyof FormFieldInputAdditionalActionsType;
type FormFieldName = string;
interface IFormField {
    id?: ID$1;
    pdfObjectId?: number | null;
    annotationIds?: List<string>;
    name?: FormFieldName;
    label?: string;
    readOnly?: boolean;
    required?: boolean;
    noExport?: boolean;
    additionalActions?: any;
    group?: string | null;
    isEditable?: boolean;
    isFillable?: boolean;
    isDeletable?: boolean;
    canSetGroup?: boolean;
    [key: string]: any;
}
declare const FormField_base: Record$1.Factory<IFormField>;
declare class FormField extends FormField_base {
    id: ID$1;
    name: FormFieldName;
    pdfObjectId: number;
    annotationIds: List<string>;
    label: string;
    readOnly: boolean;
    required: boolean;
    noExport: boolean;
    additionalActions: any;
    group?: string | null;
    isEditable?: boolean;
    isFillable?: boolean;
    isDeletable?: boolean;
    canSetGroup?: boolean;
    static defaultValues: IObject;
    constructor(args?: IFormField);
}

declare class ButtonFormField extends FormField {
    buttonLabel: string | null;
    static defaultValues: IObject;
}

declare const FormOption_base: Record$1.Factory<{
    label: string;
    value: string;
}>;
declare class FormOption extends FormOption_base {
}

declare class CheckBoxFormField extends FormField {
    values: List<string>;
    defaultValues: List<string>;
    options: List<FormOption>;
    optionIndexes?: List<number>;
    static defaultValues: IObject;
}

declare class ChoiceFormField extends FormField {
    options: List<FormOption>;
    values: List<string>;
    defaultValues: List<string>;
    multiSelect: boolean;
    commitOnChange: boolean;
    static defaultValues: IObject;
}

declare class ComboBoxFormField extends ChoiceFormField {
    edit: boolean;
    doNotSpellCheck: boolean;
    static defaultValues: IObject;
}

declare class ListBoxFormField extends ChoiceFormField {
    additionalActions: FormFieldInputAdditionalActionsType | null | undefined;
}

declare class RadioButtonFormField extends FormField {
    noToggleToOff: boolean;
    radiosInUnison: boolean;
    value: string;
    defaultValue: string;
    options: List<FormOption>;
    optionIndexes?: List<number>;
    static defaultValues: IObject;
}

declare class TextFormField extends FormField {
    value: string;
    defaultValue: string;
    password: boolean;
    maxLength?: number | null;
    doNotSpellCheck: boolean;
    doNotScroll: boolean;
    multiLine: boolean;
    comb: boolean;
    additionalActions: FormFieldInputAdditionalActionsType | null | undefined;
    static defaultValues: IObject;
}

declare class SignatureFormField extends FormField {
}

type AnnotationPreset = AnnotationPreset$1;
type AnnotationPresetID = AnnotationPresetID$1;

interface INoteAnnotation extends AnnotationCtorProps {
    text?: {
        format: 'plain';
        value: string;
    };
    icon?: string | INoteIcon;
    color?: Color;
}
declare class NoteAnnotation extends Annotation {
    text: {
        format: 'plain';
        value: string;
    };
    icon: INoteIcon;
    color: Color;
    static isEditable: boolean;
    static readableName: string;
    static defaultValues: IObject;
    constructor(options?: INoteAnnotation);
}

interface ISquiggleAnnotation extends ITextMarkupAnnotation {
    color?: Color;
}
declare class SquiggleAnnotation extends TextMarkupAnnotation {
    static className: string;
    static readableName: string;
    static defaultValues: IObject;
    constructor(options?: ISquiggleAnnotation);
}

interface IStrikeOutAnnotation extends ITextMarkupAnnotation {
    color?: Color;
}
declare class StrikeOutAnnotation extends TextMarkupAnnotation {
    static className: string;
    static readableName: string;
    static defaultValues: IObject;
    constructor(options?: IStrikeOutAnnotation);
}

interface IUnderlineAnnotation extends ITextMarkupAnnotation {
    color?: Color;
}
declare class UnderlineAnnotation extends TextMarkupAnnotation {
    static className: string;
    static readableName: string;
    static defaultValues: IObject;
    constructor(options?: IUnderlineAnnotation);
}

declare class UnknownAnnotation extends Annotation {
}

declare class CommentMarkerAnnotation extends Annotation {
    static readableName: "Comment-Marker";
}

declare function preloadWorker(configuration: StandaloneConfiguration): Promise<void>;
declare function load(configuration: Configuration): Promise<Instance>;

declare function serializeAnnotation(annotation: InkAnnotation): AnnotationBackendJSON<InkAnnotationJSON>;
declare function serializeAnnotation(annotation: LineAnnotation): AnnotationBackendJSON<LineAnnotationJSON>;
declare function serializeAnnotation(annotation: RectangleAnnotation): AnnotationBackendJSON<RectangleAnnotationJSON>;
declare function serializeAnnotation(annotation: EllipseAnnotation): AnnotationBackendJSON<EllipseAnnotationJSON>;
declare function serializeAnnotation(annotation: PolygonAnnotation): AnnotationBackendJSON<PolygonAnnotationJSON>;
declare function serializeAnnotation(annotation: PolylineAnnotation): AnnotationBackendJSON<PolylineAnnotationJSON>;
declare function serializeAnnotation(annotation: TextAnnotation): AnnotationBackendJSON<TextAnnotationJSON>;
declare function serializeAnnotation(annotation: NoteAnnotation): AnnotationBackendJSON<NoteAnnotationJSON>;
declare function serializeAnnotation(annotation: StampAnnotation): AnnotationBackendJSON<StampAnnotationJSON, 'color'>;
declare function serializeAnnotation(annotation: ImageAnnotation): AnnotationBackendJSON<ImageAnnotationJSON>;
declare function serializeAnnotation(annotation: MediaAnnotation): AnnotationBackendJSON<MediaAnnotationJSON>;
declare function serializeAnnotation(annotation: LinkAnnotation): AnnotationBackendJSON<LinkAnnotationJSON>;
declare function serializeAnnotation(annotation: WidgetAnnotation): AnnotationBackendJSON<WidgetAnnotationJSON>;
declare function serializeAnnotation(annotation: TextMarkupAnnotation): AnnotationBackendJSON<TextMarkupAnnotationJSON>;
declare function serializeAnnotation(annotation: RedactionAnnotation): AnnotationBackendJSON<RedactionAnnotationJSON>;
declare function serializeAnnotation(annotation: CommentMarkerAnnotation): AnnotationBackendJSON<CommentMarkerAnnotationJSON>;
declare function serializeAnnotation(annotation: UnknownAnnotation): AnnotationBackendJSON<UnknownAnnotationJSON>;
declare function serializeFormField(formField: FormField): FormFieldJSON;
declare function serializePreset(preset: AnnotationPreset$1): Record<string, any>;
declare function unserializePreset(presetJSON: Record<string, any>): AnnotationPreset$1;

type TargetType = string | HTMLElement | Instance | null;
declare function unload(target: TargetType): boolean;

declare function viewStateFromOpenParameters(viewState: ViewState, hash?: string | null | undefined): ViewState;

type RotatableAnnotation = TextAnnotation | StampAnnotation;

declare const PSPDFKit: {
    Immutable: {
        List: typeof List;
    };
    version: string;
    Geometry: {
        Point: typeof Point;
        DrawingPoint: typeof DrawingPoint;
        Rect: typeof Rect;
        Size: typeof Size;
        Inset: typeof Inset;
    };
    Actions: {
        Action: typeof Action;
        GoToAction: typeof GoToAction;
        GoToEmbeddedAction: typeof GoToEmbeddedAction;
        GoToRemoteAction: typeof GoToRemoteAction;
        HideAction: typeof HideAction;
        JavaScriptAction: typeof JavaScriptAction;
        LaunchAction: typeof LaunchAction;
        NamedAction: typeof NamedAction;
        ResetFormAction: typeof ResetFormAction;
        SubmitFormAction: typeof SubmitFormAction;
        URIAction: typeof URIAction;
    };
    Annotations: {
        Annotation: typeof Annotation;
        CommentMarkerAnnotation: typeof CommentMarkerAnnotation;
        HighlightAnnotation: typeof HighlightAnnotation;
        InkAnnotation: typeof InkAnnotation;
        ShapeAnnotation: typeof ShapeAnnotation;
        LineAnnotation: typeof LineAnnotation;
        RectangleAnnotation: typeof RectangleAnnotation;
        EllipseAnnotation: typeof EllipseAnnotation;
        PolygonAnnotation: typeof PolygonAnnotation;
        PolylineAnnotation: typeof PolylineAnnotation;
        LinkAnnotation: typeof LinkAnnotation;
        NoteAnnotation: typeof NoteAnnotation;
        MarkupAnnotation: typeof TextMarkupAnnotation;
        RedactionAnnotation: typeof RedactionAnnotation;
        SquiggleAnnotation: typeof SquiggleAnnotation;
        StampAnnotation: typeof StampAnnotation;
        StrikeOutAnnotation: typeof StrikeOutAnnotation;
        TextAnnotation: typeof TextAnnotation;
        UnderlineAnnotation: typeof UnderlineAnnotation;
        ImageAnnotation: typeof ImageAnnotation;
        UnknownAnnotation: typeof UnknownAnnotation;
        WidgetAnnotation: typeof WidgetAnnotation;
        MediaAnnotation: typeof MediaAnnotation;
        toSerializableObject: typeof serializeAnnotation;
        fromSerializableObject: <K extends AnnotationJSONUnion>(annotation: K) => AnnotationJSONToAnnotation<K>;
        rotate: (annotation: RotatableAnnotation, rotation: number, contentSize?: Size) => Annotation;
    };
    AnnotationPresets: {
        toSerializableObject: typeof serializePreset;
        fromSerializableObject: typeof unserializePreset;
    };
    Comment: typeof Comment;
    Bookmark: typeof Bookmark;
    CustomOverlayItem: typeof CustomOverlayItem;
    FormFields: {
        FormField: typeof FormField;
        ButtonFormField: typeof ButtonFormField;
        CheckBoxFormField: typeof CheckBoxFormField;
        ChoiceFormField: typeof ChoiceFormField;
        ComboBoxFormField: typeof ComboBoxFormField;
        ListBoxFormField: typeof ListBoxFormField;
        RadioButtonFormField: typeof RadioButtonFormField;
        TextFormField: typeof TextFormField;
        SignatureFormField: typeof SignatureFormField;
        toSerializableObject: typeof serializeFormField;
        fromSerializableObject: (formField: FormFieldJSON) => FormField;
    };
    FormFieldValue: typeof FormFieldValue;
    FormOption: typeof FormOption;
    Color: typeof Color;
    Instance: typeof Instance;
    preloadWorker: typeof preloadWorker;
    load: typeof load;
    unload: typeof unload;
    Error: any;
    SaveError: typeof PSPDFKitSaveError;
    ViewState: typeof ViewState;
    PageInfo: typeof PageInfo;
    TextLine: typeof TextLine;
    InstantClient: typeof InstantClient;
    TextSelection: typeof PublicTextSelection;
    SearchResult: typeof SearchResult;
    SearchState: typeof SearchState;
    AutoSaveMode: {
        readonly IMMEDIATE: "IMMEDIATE";
        readonly INTELLIGENT: "INTELLIGENT";
        readonly DISABLED: "DISABLED";
    };
    SignatureSaveMode: {
        readonly ALWAYS: "ALWAYS";
        readonly NEVER: "NEVER";
        readonly USING_UI: "USING_UI";
    };
    LayoutMode: {
        readonly SINGLE: "SINGLE";
        readonly DOUBLE: "DOUBLE";
        readonly AUTO: "AUTO";
    };
    PrintMode: {
        readonly DOM: "DOM";
        readonly EXPORT_PDF: "EXPORT_PDF";
    };
    PrintQuality: {
        readonly LOW: "LOW";
        readonly MEDIUM: "MEDIUM";
        readonly HIGH: "HIGH";
    };
    ScrollMode: {
        readonly CONTINUOUS: "CONTINUOUS";
        readonly PER_SPREAD: "PER_SPREAD";
        readonly DISABLED: "DISABLED";
    };
    ZoomMode: {
        readonly AUTO: "AUTO";
        readonly FIT_TO_WIDTH: "FIT_TO_WIDTH";
        readonly FIT_TO_VIEWPORT: "FIT_TO_VIEWPORT";
        readonly CUSTOM: "CUSTOM";
    };
    InteractionMode: {
        readonly TEXT_HIGHLIGHTER: "TEXT_HIGHLIGHTER";
        readonly INK: "INK";
        readonly INK_SIGNATURE: "INK_SIGNATURE";
        readonly SIGNATURE: "SIGNATURE";
        readonly STAMP_PICKER: "STAMP_PICKER";
        readonly STAMP_CUSTOM: "STAMP_CUSTOM";
        readonly SHAPE_LINE: "SHAPE_LINE";
        readonly SHAPE_RECTANGLE: "SHAPE_RECTANGLE";
        readonly SHAPE_ELLIPSE: "SHAPE_ELLIPSE";
        readonly SHAPE_POLYGON: "SHAPE_POLYGON";
        readonly SHAPE_POLYLINE: "SHAPE_POLYLINE";
        readonly INK_ERASER: "INK_ERASER";
        readonly NOTE: "NOTE";
        readonly COMMENT_MARKER: "COMMENT_MARKER";
        readonly TEXT: "TEXT";
        readonly PAN: "PAN";
        readonly SEARCH: "SEARCH";
        readonly DOCUMENT_EDITOR: "DOCUMENT_EDITOR";
        readonly MARQUEE_ZOOM: "MARQUEE_ZOOM";
        readonly REDACT_TEXT_HIGHLIGHTER: "REDACT_TEXT_HIGHLIGHTER";
        readonly REDACT_SHAPE_RECTANGLE: "REDACT_SHAPE_RECTANGLE";
        readonly DOCUMENT_CROP: "DOCUMENT_CROP";
        readonly BUTTON_WIDGET: "BUTTON_WIDGET";
        readonly TEXT_WIDGET: "TEXT_WIDGET";
        readonly RADIO_BUTTON_WIDGET: "RADIO_BUTTON_WIDGET";
        readonly CHECKBOX_WIDGET: "CHECKBOX_WIDGET";
        readonly COMBO_BOX_WIDGET: "COMBO_BOX_WIDGET";
        readonly LIST_BOX_WIDGET: "LIST_BOX_WIDGET";
        readonly SIGNATURE_WIDGET: "SIGNATURE_WIDGET";
        readonly DATE_WIDGET: "DATE_WIDGET";
        readonly FORM_CREATOR: "FORM_CREATOR";
        readonly LINK: "LINK";
        readonly DISTANCE: "DISTANCE";
        readonly PERIMETER: "PERIMETER";
        readonly RECTANGLE_AREA: "RECTANGLE_AREA";
        readonly ELLIPSE_AREA: "ELLIPSE_AREA";
        readonly POLYGON_AREA: "POLYGON_AREA";
        readonly CONTENT_EDITOR: "CONTENT_EDITOR";
        readonly MULTI_ANNOTATIONS_SELECTION: "MULTI_ANNOTATIONS_SELECTION";
    };
    unstable_InkEraserMode: {
        readonly POINT: "POINT";
        readonly STROKE: "STROKE";
    };
    SidebarMode: {
        readonly ANNOTATIONS: "ANNOTATIONS";
        readonly BOOKMARKS: "BOOKMARKS";
        readonly DOCUMENT_OUTLINE: "DOCUMENT_OUTLINE";
        readonly THUMBNAILS: "THUMBNAILS";
        readonly CUSTOM: "CUSTOM";
    };
    UIElement: {
        readonly Sidebar: "Sidebar";
    };
    BlendMode: {
        readonly normal: "normal";
        readonly multiply: "multiply";
        readonly screen: "screen";
        readonly overlay: "overlay";
        readonly darken: "darken";
        readonly lighten: "lighten";
        readonly colorDodge: "colorDodge";
        readonly colorBurn: "colorBurn";
        readonly hardLight: "hardLight";
        readonly softLight: "softLight";
        readonly difference: "difference";
        readonly exclusion: "exclusion";
    };
    BorderStyle: {
        readonly solid: "solid";
        readonly dashed: "dashed";
        readonly beveled: "beveled";
        readonly inset: "inset";
        readonly underline: "underline";
    };
    LineCap: {
        readonly square: "square";
        readonly circle: "circle";
        readonly diamond: "diamond";
        readonly openArrow: "openArrow";
        readonly closedArrow: "closedArrow";
        readonly butt: "butt";
        readonly reverseOpenArrow: "reverseOpenArrow";
        readonly reverseClosedArrow: "reverseClosedArrow";
        readonly slash: "slash";
    };
    SidebarPlacement: {
        readonly START: "START";
        readonly END: "END";
    };
    ShowSignatureValidationStatusMode: {
        readonly IF_SIGNED: "IF_SIGNED";
        readonly HAS_WARNINGS: "HAS_WARNINGS";
        readonly HAS_ERRORS: "HAS_ERRORS";
        readonly NEVER: "NEVER";
    };
    NoteIcon: {
        readonly COMMENT: "COMMENT";
        readonly RIGHT_POINTER: "RIGHT_POINTER";
        readonly RIGHT_ARROW: "RIGHT_ARROW";
        readonly CHECK: "CHECK";
        readonly CIRCLE: "CIRCLE";
        readonly CROSS: "CROSS";
        readonly INSERT: "INSERT";
        readonly NEW_PARAGRAPH: "NEW_PARAGRAPH";
        readonly NOTE: "NOTE";
        readonly PARAGRAPH: "PARAGRAPH";
        readonly HELP: "HELP";
        readonly STAR: "STAR";
        readonly KEY: "KEY";
    };
    Theme: {
        readonly LIGHT: "LIGHT";
        readonly DARK: "DARK";
        readonly AUTO: "AUTO";
    };
    ToolbarPlacement: {
        readonly TOP: "TOP";
        readonly BOTTOM: "BOTTOM";
    };
    ElectronicSignatureCreationMode: {
        readonly DRAW: "DRAW";
        readonly IMAGE: "IMAGE";
        readonly TYPE: "TYPE";
    };
    I18n: {
        locales: any;
        messages: {};
        preloadLocalizationData: (locale: string, options?: {
            baseUrl?: string | undefined;
        }) => Promise<void>;
    };
    baseUrl: string | undefined;
    DocumentIntegrityStatus: {
        readonly ok: "ok";
        readonly tampered_document: "tampered_document";
        readonly failed_to_retrieve_signature_contents: "failed_to_retrieve_signature_contents";
        readonly failed_to_retrieve_byterange: "failed_to_retrieve_byterange";
        readonly failed_to_compute_digest: "failed_to_compute_digest";
        readonly failed_retrieve_signing_certificate: "failed_retrieve_signing_certificate";
        readonly failed_retrieve_public_key: "failed_retrieve_public_key";
        readonly failed_encryption_padding: "failed_encryption_padding";
        readonly general_failure: "general_failure";
    };
    SignatureValidationStatus: {
        readonly valid: "valid";
        readonly warning: "warning";
        readonly error: "error";
    };
    CertificateChainValidationStatus: {
        readonly ok: "ok";
        readonly ok_but_self_signed: "ok_but_self_signed";
        readonly untrusted: "untrusted";
        readonly expired: "expired";
        readonly not_yet_valid: "not_yet_valid";
        readonly invalid: "invalid";
        readonly revoked: "revoked";
        readonly failed_to_retrieve_signature_contents: "failed_to_retrieve_signature_contents";
        readonly general_validation_problem: "general_validation_problem";
    };
    AnnotationsWillChangeReason: typeof AnnotationsWillChangeReason;
    DocumentComparisonSourceType: {
        readonly USE_OPEN_DOCUMENT: "USE_OPEN_DOCUMENT";
        readonly USE_FILE_DIALOG: "USE_FILE_DIALOG";
    };
    MeasurementScaleUnitFrom: {
        readonly INCHES: "in";
        readonly MILLIMETERS: "mm";
        readonly CENTIMETERS: "cm";
        readonly POINTS: "pt";
    };
    MeasurementScaleUnitTo: {
        readonly INCHES: "in";
        readonly MILLIMETERS: "mm";
        readonly CENTIMETERS: "cm";
        readonly POINTS: "pt";
        readonly FEET: "ft";
        readonly METERS: "m";
        readonly YARDS: "yd";
        readonly KILOMETERS: "km";
        readonly MILES: "mi";
    };
    MeasurementPrecision: {
        readonly WHOLE: "whole";
        readonly ONE: "oneDp";
        readonly TWO: "twoDp";
        readonly THREE: "threeDp";
        readonly FOUR: "fourDp";
    };
    MeasurementScale: typeof MeasurementScale;
    ProductId: {
        SharePoint: string;
        Salesforce: string;
    };
    viewStateFromOpenParameters: typeof viewStateFromOpenParameters;
    readonly unstable_defaultElectronicSignatureColorPresets: ColorPreset[];
    readonly defaultToolbarItems: readonly [{
        readonly type: "sidebar-thumbnails";
    }, {
        readonly type: "sidebar-document-outline";
    }, {
        readonly type: "sidebar-annotations";
    }, {
        readonly type: "sidebar-bookmarks";
    }, {
        readonly type: "pager";
    }, {
        readonly type: "multi-annotations-selection";
    }, {
        readonly type: "pan";
    }, {
        readonly type: "zoom-out";
    }, {
        readonly type: "zoom-in";
    }, {
        readonly type: "zoom-mode";
    }, {
        readonly type: "spacer";
    }, {
        readonly type: "annotate";
    }, {
        readonly type: "ink";
    }, {
        readonly type: "highlighter";
    }, {
        readonly type: "text-highlighter";
    }, {
        readonly type: "ink-eraser";
    }, {
        readonly type: "signature";
    }, {
        readonly type: "image";
    }, {
        readonly type: "stamp";
    }, {
        readonly type: "note";
    }, {
        readonly type: "text";
    }, {
        readonly type: "line";
    }, {
        readonly type: "link";
    }, {
        readonly type: "arrow";
    }, {
        readonly type: "rectangle";
    }, {
        readonly type: "ellipse";
    }, {
        readonly type: "polygon";
    }, {
        readonly type: "cloudy-polygon";
    }, {
        readonly type: "polyline";
    }, {
        readonly type: "print";
    }, {
        readonly type: "document-editor";
    }, {
        readonly type: "document-crop";
    }, {
        readonly type: "search";
    }, {
        readonly type: "export-pdf";
    }, {
        readonly type: "debug";
    }];
    readonly defaultDocumentEditorFooterItems: {
        type: BuiltInDocumentEditorFooterItem;
    }[];
    readonly defaultDocumentEditorToolbarItems: {
        type: BuiltInDocumentEditorToolbarItem;
    }[];
    readonly defaultAnnotationPresets: {
        [key: string]: Record<string, unknown>;
    };
    readonly defaultStampAnnotationTemplates: StampAnnotation[];
    readonly defaultAnnotationsSidebarContent: readonly [typeof EllipseAnnotation, typeof HighlightAnnotation, typeof ImageAnnotation, typeof InkAnnotation, typeof LineAnnotation, typeof NoteAnnotation, typeof PolygonAnnotation, typeof PolylineAnnotation, typeof RectangleAnnotation, typeof SquiggleAnnotation, typeof StampAnnotation, typeof StrikeOutAnnotation, typeof TextAnnotation, typeof UnderlineAnnotation, typeof WidgetAnnotation];
    defaultEditableAnnotationTypes: readonly (typeof HighlightAnnotation | typeof ImageAnnotation | typeof InkAnnotation | typeof LineAnnotation | typeof EllipseAnnotation | typeof RectangleAnnotation | typeof PolygonAnnotation | typeof PolylineAnnotation | typeof LinkAnnotation | typeof NoteAnnotation | typeof StampAnnotation | typeof TextAnnotation | typeof WidgetAnnotation | typeof CommentMarkerAnnotation | typeof RedactionAnnotation)[];
    defaultElectronicSignatureCreationModes: readonly ("DRAW" | "IMAGE" | "TYPE")[];
    defaultSigningFonts: readonly Font[];
    Options: {
        MIN_TEXT_ANNOTATION_SIZE: number;
        MIN_INK_ANNOTATION_SIZE: number;
        MIN_SHAPE_ANNOTATION_SIZE: number;
        MIN_IMAGE_ANNOTATION_SIZE: number;
        MIN_STAMP_ANNOTATION_SIZE: number;
        MIN_WIDGET_ANNOTATION_SIZE: number;
        ENABLE_INK_SMOOTH_LINES: boolean;
        INK_EPSILON_RANGE_OPTIMIZATION: number;
        SIGNATURE_SAVE_MODE: ISignatureSaveMode;
        INITIAL_DESKTOP_SIDEBAR_WIDTH: number;
        IGNORE_DOCUMENT_PERMISSIONS: boolean;
        SELECTION_OUTLINE_PADDING: (viewportSize: Size) => number;
        RESIZE_ANCHOR_RADIUS: (viewportSize: Size) => number;
        SELECTION_STROKE_WIDTH: number;
        TEXT_ANNOTATION_AUTOFIT_TEXT_ON_EXPORT: boolean;
        TEXT_ANNOTATION_AUTOFIT_BOUNDING_BOX_ON_EDIT: boolean;
        DISABLE_KEYBOARD_SHORTCUTS: boolean;
        DEFAULT_INK_ERASER_CURSOR_WIDTH: number;
        COLOR_PRESETS: ColorPreset[];
        LINE_CAP_PRESETS: string[];
        LINE_WIDTH_PRESETS: number[] | null | undefined;
        HIGHLIGHT_COLOR_PRESETS: ColorPreset[];
        TEXT_MARKUP_COLOR_PRESETS: ColorPreset[];
        NOTE_COLOR_PRESETS: ColorPreset[];
        PDF_JAVASCRIPT: boolean;
        BREAKPOINT_MD_TOOLBAR: number;
        BREAKPOINT_SM_TOOLBAR: number;
    };
    SearchPattern: {
        readonly CREDIT_CARD_NUMBER: "credit_card_number";
        readonly DATE: "date";
        readonly TIME: "time";
        readonly EMAIL_ADDRESS: "email_address";
        readonly INTERNATIONAL_PHONE_NUMBER: "international_phone_number";
        readonly IP_V4: "ipv4";
        readonly IP_V6: "ipv6";
        readonly MAC_ADDRESS: "mac_address";
        readonly NORTH_AMERICAN_PHONE_NUMBER: "north_american_phone_number";
        readonly SOCIAL_SECURITY_NUMBER: "social_security_number";
        readonly URL: "url";
        readonly US_ZIP_CODE: "us_zip_code";
        readonly VIN: "vin";
    };
    SearchType: {
        readonly TEXT: "text";
        readonly PRESET: "preset";
        readonly REGEX: "regex";
    };
    UIDateTimeElement: {
        readonly COMMENT_THREAD: "COMMENT_THREAD";
        readonly ANNOTATIONS_SIDEBAR: "ANNOTATIONS_SIDEBAR";
    };
    generateInstantId: typeof generateInstantId;
    Font: typeof Font;
};

export { Action, Annotation, AnnotationToolbarItem, AnnotationsWillChangeReason, Bookmark, ButtonFormField, CheckBoxFormField, ChoiceFormField, Color, ComboBoxFormField, Comment, CommentMarkerAnnotation, Configuration, CustomOverlayItem, DocumentEditorFooterItem, DocumentEditorToolbarItem, DrawingPoint, EllipseAnnotation, EllipseAnnotationJSON, Font, FormField, FormFieldValue, FormOption, GoToAction, GoToEmbeddedAction, GoToRemoteAction, HideAction, HighlightAnnotation, ImageAnnotation, ImageAnnotationJSON, InkAnnotation, InkAnnotationJSON, Inset, Instance, InstantClient, JavaScriptAction, LaunchAction, LineAnnotation, LineAnnotationJSON, LinkAnnotation, List, ListBoxFormField, MentionableUser, NamedAction, NoteAnnotation, NoteAnnotationJSON, PageInfo, Point, PolygonAnnotation, PolygonAnnotationJSON, PolylineAnnotation, PolylineAnnotationJSON, RadioButtonFormField, Rect, RectangleAnnotation, RectangleAnnotationJSON, RedactionAnnotation, RedactionAnnotationJSON, ResetFormAction, SearchResult, SearchState, ServerConfiguration, ShapeAnnotation, SignatureFormField, Size, SquiggleAnnotation, StampAnnotation, StampAnnotationJSON, StandaloneConfiguration, StrikeOutAnnotation, SubmitFormAction, TextAnnotation, TextAnnotationJSON, TextFormField, TextLine, TextMarkupAnnotation, TextMarkupAnnotationJSON, PublicTextSelection as TextSelection, ToolbarItem, URIAction, UnderlineAnnotation, UnknownAnnotation, UnknownAnnotationJSON, ViewState, WidgetAnnotation, WidgetAnnotationJSON, PSPDFKit as default };
