An indexed sorter _Datasaur_ module.

The `datasaur-simple-sort` data source provides a means to sort the original set of rows basec on the values in a given column.

### Instantiation

`datasaur-simple-sort` sits on top of an indexed datasource. For example:
```js
var Source = require('datasaur-local'); // v3.0.0 or higher
var Indexer = require('datasaur-indexed'); // this version must be >= that of datasaur-local
var Sorter = require('datasaur-simple-sort'); // this version must be >= that of datasaur-indexed
var dataModel = new Sorter(new Indexer(new Source));
```

### Custom methods
`datasaur-simple-sort` defines a single custom instance method.
#### `sort(columnIndex, options)` instance method
```js
dataModel.sort(0); // alpha ascending by first column
```
##### `options` parameter
The optional `options` parameter may contain an object with the following properties, all of which are optional:

Name | Values
--- | ---
`dir` | `'DESC'` (case-insensitive) reverses the sort. Any other value leaves the sort in ascending order.
`comparator` | A function to be bound to `columnIndex` with the data _source_ (`this.next`) as the calling context. This function is then passed to [`Array.prototype.sort`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array/sort)

### Known issues

#### Computed cells and columns
This sorter fails for computed cells or columns because it calls `this.getValue` directly instead of `DatasaurIndexed.valOrFunc`.

That said, it is still useable on computed columns if sorting on the _uncomputed_ values would produce acceptable results.

#### Unstable sort
[`Array.prototype.sort`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array/sort) does not naturally perform a stable sort, meaning that the "sorted" order of rows with identical sort arguments is undefined.

### Multi-column sorting
Sorting by multiple columns, each of which may be ascending or descending, is somewhat more complicated,
essentially involving dynamically adding a `Sorter` stage for each column to be sorted.
See [`datasaur-filter`](simple-sort) which does something like that,
but forces [`Array.prototype.sort`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array/sort) to do a [stable sort](https://en.wikipedia.org/wiki/Sorting_algorithm#Stability)
(which is is not naturally inclined to do), and properly handles computed cells and columns.
_Note: As of this writing `datasaur-filter` has not yet been updated to v3.0.0._
