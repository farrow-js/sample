import { Container } from 'farrow-module'

import { RestfulClient, fetchProvider } from './restful'
import {
  TodoClient,
  todoApiBasenameProvider,
  todoRouteNamesProvider,
} from './todo'

class Effect extends Container {
  // inject the fetch client
  fetch = this.inject(fetchProvider.provide(global.fetch.bind(global)))

  // inject todo api base name
  todoBasename = this.inject(todoApiBasenameProvider.provide('/api'))

  // inject the todo api paths
  todoRoutenames = this.inject(
    todoRouteNamesProvider.provide({
      getTodos: '/getTodos',
      addTodo: '/addTodo',
      removeTodo: '/removeTodo',
      removeCompletedTodos: '/removeCompletedTodos',
      toggleAll: '/toggleAll',
      toggleOne: '/toggleOne',
      updateTitle: '/updateTitle',
      getLimit: '/getLimit',
    })
  )

  restful = this.new(RestfulClient)

  todo = this.new(TodoClient)
}

export const effect = new Effect()

// const res0 = await effect.todo.getTodos()

// const res1 = await effect.todo.addTodo('new task')

// const res3 = await effect.restful.get('/foo')

// const res3 = await effect.restful.post('/bar', { bar: 'bar' })
