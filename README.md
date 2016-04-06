<!--
@Author: Guan Gui <guiguan>
@Date:   2016-04-06T16:43:56+10:00
@Email:  root@guiguan.net
@Last modified by:   guiguan
@Last modified time: 2016-04-06T20:21:06+10:00
-->



pairing-heap
============
A functional-like pairing heap data structure for implementing a priority queue.  Based on the implementation in:

G. Navarro, R. Paredes. (2010) "[On sorting, heaps, and minimum spanning trees](http://citeseerx.ist.psu.edu/viewdoc/summary?doi=10.1.1.218.3241)" Algorithmica

Each node in the pairing heap is a heap itself.

# API

```js
var pq = require('pairing-heap')
```

#### `pq.NIL`
An empty pairing heap

#### `var new_heap = pq.create(item)`
Creates a new heap node with the given item, where an item could be a number or an object. When the item is a number, its value represents the item's weight. When the item is an object, a `compare(otherItem)` function should be provided in that object's instance, preferably in that object's prototype chain. For example:

```js
Object.getPrototypeOf(item).compare = function(otherItem) {
  // N.B. use standard function here instead of arrow function to get `this` right
  return this.getMyWeight() - otherItem.getMyWeight()
}
```

* `item` is either in `number` or `object` type. All `items` should be in same type

**Returns** a new heap wrapping the `item`, i.e. a heap with only the `item` as element

#### `var root = pq.merge(heap1, heap2)`
Merges two heaps together

* `heap1,heap2` are both pairing heaps

**Returns** a new merged heap that is represented by the `root` node

#### `root = pq.push(root, item)`
Convenience method to push a new item in given heap: first create a new heap to wrap the `item`, then merge the new heap with `root`

* `root` is original heap
* `item` is the new item to be pushed in

**Returns** a new heap that is represented by the `root` node

#### `root = pq.pop(root)`
Removes the root item from a heap

* `root` is original heap

**Returns** a heap that is represented by the `root` node with the min item
popped off. `root == NIL` if the heap is empty

#### `root = pq.decreaseKey(root, item_node)`
To decrease the weight of an item, update the weight in that item and then call this function.

* `root` is the root of the heap
* `item_node` is the heap node wrapping that item. You should keep an item's wrapping heap node somewhere when you first create it.

**Returns** a new heap that is represented by the `root` node

# License
(c) 2015 Mikola Lysenko. MIT License
