var express = require('express');
var router = express.Router();

const todoItems = [
  {
    id: 1,
    title: 'first item',
    body: 'content of first item'
  }, 
  {
    id: 2,
    title: 'second item',
    body: 'content of first item'
  }, 
  {
    id: 3,
    title: 'third item',
    body: 'content of first item'
  }

]

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'TODO APP', items: todoItems });
});

router.get('/delete/:id', function(req, res, next) {
  console.log('kommer det ens hit')
  const itemId = parseInt(req.params.id)
  const item = todoItems.find((item) => item.id === itemId)
  
  todoItems.splice(todoItems.indexOf(item), 1);
  res.redirect('/');
});

router.get('/item/:id', function(req, res, next) {
  const itemId = parseInt(req.params.id)
  const item = todoItems.find((item) => item.id === itemId)
  if(!itemId) {
    res.statusCode=500;
    res.statusMessage='Not found'
    res.end('Not found');
  } 
  else if(!item) {
    res.statusCode=404;
    res.statusmessage='Not found'
    res.end('Not found');
  } else {
    res.render('item', { title: 'TODO APP', item: item });
  }
});

router.post('/item/:id', function(req, res, next) {
  const itemId = parseInt(req.params.id)
  const item = todoItems.find((item) => item.id === itemId)

  item.title = req.body.titel;
  item.body = req.body.todo;

  res.render('item', { item: item})
}); 

router.post('/item', function(req, res, next) {
let maximusId = todoItems.reduce((maxId, item) => Math.max(maxId, item.id), 0)

const item = {
  id : maximusId +1,
  title : req.body.titel,
  body : req.body.todo
}
todoItems.push(item)
console.log(todoItems)
res.redirect('/');
}); 



module.exports = router;
