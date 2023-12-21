# Parrot


## Installation
To install the library

```bash
bun add parrot
# or in a Node environment
npm install parrot
```

## Getting Started
The library is based on TypeScript, so it's necessary to configure it


```bash
bun init
# or if you are in a Node environment
npm install --save-dev typescript @types/node
npx tsc --init
```
In the TypeScript configuration file `tsconfig.json`, set the following properties to `true`

```json
{
    ...
    "experimentalDecorators": true,
    "emitDecoratorMetadata": true,
    ...
}
```

Finally, the application requires two things to work: a main class that acts as the root of the project, and a function that initializes the project

```typescript
// src/main.ts
import { Parrot } from "parrot";
import { Root } from "./root";

function main() {
  const app = Parrot.create(Root);

  app.start(process.env.PORT || 3000);
}

main();
```

```typescript
// src/root.ts
import { Domain } from "parrot"

@Domain({ controllers: [] })
export class Root {}
```

Con estos archivos la aplicacion ya funciona, el resto del proyecto puede ser a consideracion del desarrollador

##
Operation
The operation of the application is mostly based on controllers. Controllers are classes decorated with the **@Controller()** artifact. To be recognized by the system, these classes must be imported into the **@Domain()** decorator of the main class. For example:

```typescript
// src/controllers/todo.ts

@Controller('todo')
export class Todo {
    ...
}
```

```typescript
// src/root.ts
import { Domain } from "parrot"
import { Todo } from "./controller/todo"

@Domain({ controllers: [Todo] })
export class Root {}
```

This registers the routes declared in the controller under the path ***/todo/...***. This varies depending on what is specified in the **@Controller()** decorator.

### HTTP Methods
Methods of the class decorated with **@Controller()** can act as HTTP methods if associated with a method decorator: **@Get()**, **@Post()**, **@Put()**, **@Delete()**, as well as *Patch*, *All*, *Options*, *Head*, *Search*.

These decorators take a string as a parameter, which is the method's path. For example,

```typescript
// src/controllers/todo.ts
import { Controller, Get, Delete } from "parrot"

@Controller('todo')
export class Todo {

    @Get('')
    async index() {
        return ...
    }

    @Delete(':id')
    async remove() {
        return ...
    }

}
```

The first creates an endpoint at `GET /todo/`, while the second creates one at `DELETE /todo/:id`.

#### Method Parameters
HTTP method functions can receive request parameters by accessing the body, params, query params, or headers through **@Body()**, **@Param()**, **@Query()**, and **@Headers()**. These decorators take two optional parameters:

data: the name of the property you want to access.
parser: an instance of special classes.
For example, in the `Todo` controller, the `remove` method needs to access the value of `id` from the path `/todo/:id`. The way to access it is as follows:

```typescript
// src/controllers/todo.ts
import { Controller, Get, Delete, Param } from "parrot"

@Controller('todo')
export class Todo {

    ...

    @Delete(':id')
    async remove(@Param('id') id: string) {
        return ...
    }

}
```

By default, params, query params, and headers are treated as strings, but by adding a parser, we can transform the received value into the expected type.

#### Parser

To apply a parser, you just need to add an extra parameter to the property decorators. For example,

```typescript
// src/controllers/todo.ts
import { Controller, Get, Delete, Param, IntParser } from "parrot"

@Controller('todo')
export class Todo {

    ...

    @Delete(':id')
    async remove(@Param('id', new IntParser()) id: number) {
        return ...
    }

}
```

This will convert the parameter into an integer before it reaches the function.

> [!NOTE]
> Currently, only the BoolParser and IntParser parsers exist.

#### Request Lifecycle
Acting as middleware, there are decorators that apply changes before, after, or if there's an error in the request. These are **@OnBefore()**, **@OnAfter()**, **@OnError()** respectively. They take classes as parameters, which implement:

- **LifeCycle** in the case of **@OnBefore()** and **@OnAfter()**.
- **ErrorHandling** in the case of **@OnError()**.

All three decorators can be applied at the class or method level. Examples of these are:

```typescript
// src/lifecycle/handlers.ts
import { Context, ErrorContext, ErrorHandling, LifeCycle } from "parrot";

// Context provides access to Express's Request, Response, and NextFunction
export class After implements LifeCycle {
  async use({ next }: Context): Promise<void> {
    console.log("after");

    next();
  }
}

export class Before implements LifeCycle {
  async use({ next }: Context): Promise<void> {
    console.log("before");

    next();
  }
}

// ErrorContext extends Context, adding the error as a property
export class ErrorHandler implements ErrorHandling {
  async handling({ res, error }: ErrorContext): Promise<void> {
    res.json({ message: "Algo salio mal });
  }
}
```

To apply them in the controller, you do it as follows:


```typescript
// src/controllers/todo.ts
import { Controller, Get, Delete, Param, IntParser, OnError } from "parrot"
import { ErrorHandler, Before } from "../lifecycle/handlers"

@Controller('todo')
@OnError(ErrorHandler)
export class Todo {

    ...

    @Delete(':id')
    @OnBefore(Before)
    @OnAfter(Before)
    async remove(@Param('id', new IntParser()) id: number) {
        return ...
    }

}
```

## To-Do
- [ ] Add parser for Float, UUID, Array.
- [ ] Add global configuration for CORS and configuration per controllers and methods.
- [ ] Handle file upload and download with multer.
- [ ] Integrate request rate limiter by methods or controllers.
- [ ] Integrate Cron task manager.
- [ ] Develop a dependency injection system.

## How to Contribute
1. Fork the repository.
2. Create a branch with a descriptive name (git checkout -b descriptive-name).
3. Make your changes and ensure to follow coding conventions.
4. Commit your changes (git commit -am 'Add new features').
5. Push the branch (git push origin descriptive-name).
6. Open a pull request and describe your changes.
