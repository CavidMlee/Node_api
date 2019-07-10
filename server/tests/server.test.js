const expect = require('expect');
const request = require('supertest');
const { ObjectId } = require('mongodb');

const { app } = require('../server');
const { Todo } = require('../moduls/todo');
const { Users } = require('../moduls/users');

const todos = [{
    _id: new ObjectId(),
    text: 'First todo text'
},
{
    _id: new ObjectId(),
    text: 'Second todo text',
    completed: true,
    completedAt: 333
}]

beforeEach((done) => {                                //Her ise dusmemisden evvel databazani sifirlayir
    Todo.remove({}).then(() => {
        return Todo.insertMany(todos);
    }).then(() => done())
});

describe('Post/todos', () => {
    it('should creat a new todo', (done) => {
        const text = 'Test todo text'

        request(app)
            .post('/todos')
            .send({ text })
            .expect(200)
            .expect((res) => {
                expect(res.body.text).toBe(text);
            })
            .end((err, res) => {
                if (err) {
                    return done(err)
                }

                Todo.find({ text }).then((todos) => {                         //datanin db-ye elave edilmesi
                    expect(todos.length).toBe(1);
                    expect(todos[0].text).toBe(text);
                    done();
                }).catch((e) => done(e));
            });
    })

    it('should not create todo with invalid body data', (done) => {
        request(app)
            .post('/todos')
            .send({})
            .expect(400)
            .end((err, res) => {
                if (err) {
                    return done(err);
                }

                Todo.find().then((todos) => {
                    expect(todos.length).toBe(2);
                    done();
                }).catch((e) => done(e))
            });
    });
});

describe('GET/todos', () => {
    it('should get all todos', (done) => {
        request(app)
            .get('/todos')
            .expect(200)
            .expect((res) => {
                expect(res.body.todos.length).toBe(2);
            })
            .end(done);
    });
});

describe('GET/todos/:id', () => {                               //id-ye gore tapmaq
    it('should return todo doc', (done) => {
        request(app)
            .get(`/todos/${todos[0]._id.toHexString()}`)
            .expect(200)
            .expect((res) => {
                expect(res.body.todos.text).toBe(todos[0].text);

            })
            .end(done)
    });

    it('should return 404 if todo not found', (done) => {
        const hexId = new ObjectId().toHexString();

        request(app)
            .get(`/todo/${hexId}`)
            .expect(404)
            .end(done)
    })

    it('should return 404 for non-object ids', (done) => {
        request(app)
            .get('/todos/123id')
            .expect(404)
            .end(done)
    })
});

describe('DELETE /todos/:id', () => {
    it('should remove a todo', (done) => {
      var hexId = todos[1]._id.toHexString();
  
      request(app)
        .delete(`/todos/${hexId}`)
        .expect(200)
        .expect((res) => {
          expect(res.body.todo._id).toBe(hexId);
        })
        .end((err, res) => {
          if (err) {
            return done(err);
          }
  
          Todo.findById(hexId).then((todo) => {
            expect(todo).toNotExist();
            done();
          }).catch((e) => done(e));
        });
    });
  
    it('should return 404 if todo not found', (done) => {
      var hexId = new ObjectId().toHexString();
  
      request(app)
        .delete(`/todos/${hexId}`)
        .expect(404)
        .end(done);
    });
  
    it('should return 404 if object id is invalid', (done) => {
      request(app)
        .delete('/todos/123abc')
        .expect(404)
        .end(done);
    });
  });

  describe('PATCH /todos/:id', () => {                //completedAt ile bagli updatenin testi
    it('should update the todo', (done) => {
      var hexId = todos[0]._id.toHexString();
      var text = 'This should be the new text';
  
      request(app)
        .patch(`/todos/${hexId}`)
        .send({
          completed: true,
          text
        })
        .expect(200)
        .expect((res) => {
          expect(res.body.todo.text).toBe(text);
          expect(res.body.todo.completed).toBe(true);
          expect(res.body.todo.completedAt).toBeA('number');
        })
        .end(done);
    });
  
    it('should clear completedAt when todo is not completed', (done) => {
      var hexId = todos[1]._id.toHexString();
      var text = 'This should be the new text!!';
  
      request(app)
        .patch(`/todos/${hexId}`)
        .send({
          completed: false,
          text
        })
        .expect(200)
        .expect((res) => {
          expect(res.body.todo.text).toBe(text);
          expect(res.body.todo.completed).toBe(false);
          expect(res.body.todo.completedAt).toNotExist();
        })
        .end(done);
    });
  });

//npm run test-watch