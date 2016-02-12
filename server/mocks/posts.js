if (!Array.prototype.find) {
  Array.prototype.find = function(predicate) {
    if (this == null) {
      throw new TypeError('Array.prototype.find called on null or undefined');
    }
    if (typeof predicate !== 'function') {
      throw new TypeError('predicate must be a function');
    }
    var list = Object(this);
    var length = list.length >>> 0;
    var thisArg = arguments[1];
    var value;

    for (var i = 0; i < length; i++) {
      value = list[i];
      if (predicate.call(thisArg, value, i, list)) {
        return value;
      }
    }
    return undefined;
  };
} 

 module.exports = function(app) {
  var express = require('express');
  var postsRouter = express.Router();

  var posts= [
      {
        id: 1,
        title: 'Bananas',
        author: 1,
        date: new Date(2014,5,4,6,0,0),
        body: 'EK kela roz ka kela'
      },
      {
        id: 2,
        title: 'Apples ',
        author: 1,
        date: new Date(2014,5,2,6,0,0),
        body: 'Apple a day.. doctor fucks away'
      },
      {
        id: 3,
        title: 'Peaches ',
        author: 2,
        date: new Date(2012,5,4,6,3,0),
        body: 'Pichaaa'
      }];
var authors = [
      {
        id: 1,
        name: 'Shivendra',
        posts: [1,2,3]
      },
      {
        id: 2,
        name: 'Nitzy',
        posts: [3]
      }
      ];

  postsRouter.get('/', function(req, res) {
    res.send({
      'posts': posts,
      'authors' : authors
    });
  });

  postsRouter.post('/', function(req, res) {
    res.status(201).end();
  });

  postsRouter.get('/:id', function(req, res) {
    res.send({
      'post': posts.find(function(post){
        return post.id==req.params.id
      }),
      'authors' : authors
    });
  });

  postsRouter.put('/:id', function(req, res) {
    res.send({
      'posts': {
        id: req.params.id
      }
    });
  });

  postsRouter.delete('/:id', function(req, res) {
    res.status(204).end();
  });

  app.use('/api/posts', postsRouter);
};
