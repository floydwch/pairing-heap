/**
 * @Author: Guan Gui <guiguan>
 * @Date:   2016-04-06T16:43:56+10:00
 * @Email:  root@guiguan.net
 * @Last modified by:   guiguan
 * @Last modified time: 2016-04-06T19:01:20+10:00
 */



'use strict'

var tape = require('tape')
var pq = require('../heap')

function checkHeapInvariant(t, root) {
  t.equals(pq.NIL.left, pq.NIL, 'nil left ok')
  t.equals(pq.NIL.right, pq.NIL, 'nil right ok')
  //Allow for parent of NIL to be modified
  function checkNode(node, parent, leader) {
    if(node === pq.NIL) {
      return
    }
    t.equals(node.parent, parent, 'parent ok')
    if(leader !== pq.NIL) {
      t.ok(leader.item < node.item, 'weight ok')
    }
    checkNode(node.left, node, node)
    checkNode(node.right, node, leader)
  }
  checkNode(root, pq.NIL, pq.NIL)
}

tape('pairing heap fuzz test', function(t) {
  var items = []
  var root = pq.NIL

  for(var i=0; i<100; ++i) {
    var w = Math.random()
    var node = pq.create(w)

    items.push(node)
    root = pq.merge(root, node)

    checkHeapInvariant(t, root)
  }

  //Try randomly decreasing keys
  for(var i=0; i<200; ++i) {
    var j = (Math.random()*100)|0
    var node = items[j]
    node.item -= Math.random()
    root = pq.decreaseKey(root, node)

    checkHeapInvariant(t, root)
  }

  items.sort(function(a,b) {
    return a.item - b.item
  })

  while(items.length > 0) {
    var node = items.shift()
    t.equals(node, root, 'items in order: ' + node.item + ' = ' + root.item)
    root = pq.pop(root)
    checkHeapInvariant(t, root)
  }

  t.end()
})
