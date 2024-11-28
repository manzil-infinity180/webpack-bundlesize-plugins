## Intro to Webpack

Loader: Loader in webpack is function hat transform source code imported module
Think like - css-loader, babel-loader

Convert the ts to js code, scss to css and jsx element to React.createElement this all magic happens with the loaders

Webpack is responsible for establishing a transformation chain for your source code and making sure that the loaders are executed at the right stage of the build process.

- Limitation
  Loaders are designed to transform code. Unlike plugins, loaders cannot affect the build process, but rather transform individual imported modules during the build.Keep in mind, plugins does not tansform code.

- Role of Module Bundler
  The goal of basic module bundler is to read the source code, find the dependencies - this is called dependency resolution.
  During the dependency resolution, bundler does the module mapping (module map) bundling them into one file, packaging it into one module. So webpack just do this all things in advanced way and add some other method to make it more efficient.

- Breakdown of Webpack Architecture

* Compiler - it is top level api and provides hooks for them for controlling the execution of webpack
* Compilation or dependency graph - returned from the compiler and start creating the dependency graph
* Resolver - create absolute path for the entry path provided and return details like results,request,path, context, etc.
* Parser - it creates the AST (abstract syntax tree) and then looks for intesting things like request, import and then creates a dependency object.
* Module Factories - This object passed to moduleFactory function and create the module.
* Templates - it does the data binding of module object and create the code in the bundled file

> webpack provides hooks for the compiler, parser, and compilations. It uses a library called `tapable`, which is maintained by the webpack team and helps in creating strong and powerful hooks where we can tap into methods.

```mermaid

flowchart TD

    A["Compiler"] -. "<div style=color:><span style=color:>it is top level api and provides hooks for them for controlling the execution of webpack</span></div>" .-> B("Dependency Graph")
    B -. "<div style=color:><span style=color:>returned from the compiler and start creating the dependency graph</span></div>" .-> C("Resolver")
    C -. "<div style=color:><span style=color:>create absolute path for the entry path provided and return details like results,request,path, context, etc.</span></div>" .-> D@{ label: "<div style=\"color:\"><span style=\"color:\">Parser</span></div>" }
    D -. "<div style=color:><span style=color:> it creates the AST (abstract syntax tree) and then looks for intesting things like request, import and then creates a dependency object.</span></div>" .-> E@{ label: "<div style=\"color:\"><span style=\"color:\">Module Factories</span></div>" }
    E -. "<div style=color:><span style=color:>This object passed to moduleFactory function and create the module.</span></div>" .-> F@{ label: "<div style=\"color:\"><span style=\"color:\">Templates</span></div>" }
    F -- "<div style=color:><span style=color:>it does the data binding of module object and create the code in the bundled file</span></div>" --> G["End"]
```

- Hooks and Tapping in methods are like event listener
- How webpack Uses tapable & How Plugins Coming Into the Picture?
  Webpack creates hook for compiler, compilation/dependency graph and parser stages using tapable and the plugins taps into them and acts accordingly.

## Plugins - Breaking it down

- Every Webpack plugins must have `apply` method in them which is called by webpack and webpack gives the compiler instance as argument to that method.
- A plugins can be class based or function based but if you are building using fuction based then the arugment is again the compiler instance.
- We’re going to use the `compiler.hooks.done` hook which is emitted when the compilation work is done and the bundled file is generated
