/**
 * @Last modified by:   guiguan
 * @Last modified time: 2016-04-06T19:33:52+10:00
 */



'use strict'

function PairingHeapNode(item, parent, left, right) {
  this.item = item
  this.parent = parent
  this.left   = left
  this.right  = right
}

//Sentinel node
var NIL = new PairingHeapNode(null, null, null, null)
NIL.left = NIL.right = NIL.parent = NIL

function compare(item1, item2) {
  if (item1 == null) {
    return -1
  } else if (item2 == null) {
    return 1
  } else if (typeof item1 === 'number') {
    return item1 - item2
  } else {
    // assume the user has provided a comparator function in their item objects
    return item1.compare(item2)
  }
}

function link(a, b) {
  var al = a.left
  b.right = al
  al.parent = b
  b.parent = a
  a.left = b
  a.right = NIL
  return a
}

function merge(a, b) {
  if(a === NIL) {
    return b
  } else if(b === NIL) {
    return a
  } else if(compare(a.item, b.item) < 0) {
    return link(a, b)
  } else {
    return link(b, a)
  }
}

function takeMin(root) {
  var p = root.left
  root.left = NIL
  root = p
  while(true) {
    var q = root.right
    if(q === NIL) {
      break
    }
    p = root
    var r = q.right
    var s = merge(p, q)
    root = s
    while(true) {
      p = r
      q = r.right
      if(q === NIL) {
        break
      }
      r = q.right
      s = s.right = merge(p, q)
    }
    s.right = NIL
    if(p !== NIL) {
      p.right = root
      root = p
    }
  }
  root.parent = NIL
  return root
}

function decreaseKey(root, p) {
  var q = p.parent
  if(compare(q.item, p.item) < 0) {
    return root
  }
  var r = p.right
  r.parent = q
  if(q.left === p) {
    q.left = r
  } else {
    q.right = r
  }
  if(compare(root.item, p.item) <= 0) {
    var l = root.left
    l.parent = p
    p.right = l
    root.left = p
    p.parent = root
    return root
  } else {
    var l = p.left
    root.right = l
    l.parent = root
    p.left = root
    root.parent = p
    p.right = p.parent = NIL
    return p
  }
}

function makeHeap(item) {
  return new PairingHeapNode(
    item,
    NIL,
    NIL,
    NIL)
}

exports.NIL = NIL
exports.create = makeHeap
exports.merge = merge
exports.push = function(root, item) {
  return merge(root, makeHeap(item))
}
exports.pop = takeMin
exports.decreaseKey = decreaseKey
