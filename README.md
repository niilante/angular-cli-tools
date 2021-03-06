CLI commands for new or existing Angular 2 projects.

## Install

`npm install angular-cli-tools -g`

## Table of contents

#### Basics
* [Create a new project: ](#create-a-new-project) [basic](#basic-project) | [bootstrap](#bootstrap-project) | [angular material](#angular-material-project) | [from GitHub](#from-github)
* [Use Angular CLI Tools with an existing project](#use-with-existing-project)
* [Generate Components, Modules, Services, Pipes ...](#generating-components)
* [All Blueprints / Scaffolds](#all-available-blueprints)

#### Advanced Usage
* [Edit templates](#edit-blueprint-templates)
* [Custom templates](#custom-templates)
* [Save templates](#save-templates-v140)
* [Generate and Update barrels (index.ts files)](#update-index.ts-files) [ [recursively] ](#update-index.ts-files-recursively)

#### Supporting documentation
* [Shortcuts](#shortcuts)
* [Changelog](#changelog)
* [Credits](#credits)
* [License](#license)



## Create a new project

New projects created with Angular CLI Tools use open-source webpack seeds:

| Seed        | Location|
|:------------- |:-------------|
| Basic      | [https://github.com/littleuniversestudios/ng2-basic-seed](https://github.com/littleuniversestudios/ng2-basic-seed)|
| Bootstrap      | [https://github.com/littleuniversestudios/ng2-bootstrap-seed](https://github.com/littleuniversestudios/ng2-bootstrap-seed)|
| Material Design      | [https://github.com/littleuniversestudios/ng2-material-seed](https://github.com/littleuniversestudios/ng2-material-seed)|


### Basic Project
To create a basic (vanilla) Angular 2 project:
```bash
ngt new PROJECT-NAME
```

### Bootstrap Project
You can also create a Bootstrap (version 4) seed:

```bash
ngt new PROJECT-NAME --bootstrap
```

### Angular Material Project
Likewise, an Angular Material seed can be created by:

```bash
ngt new PROJECT-NAME --material
```

### From GitHub
Download any Angular 2 seed from github.com by using the seed's github URL:

```bash
ngt new PROJECT-NAME --url:https://github.com/mgechev/angular2-seed
```

## Use with existing project

Angular CLI Tools does not lock you into a specific tooling process. You can choose your own tooling process/seed and Angular CLI Tools will help you speed up your ng2 development. Here's how:

* [Install Angular CLI TOOLS](#install)
* [Start generating components ](#generating-components)
* Bonus: run `ngt install` anywhere in the existing project to create [editable component templates](#edit-blueprint-templates) 


## Generating Components
Use `ngt generate` command to generate Angular components:

```bash
ngt generate component new-component
```

Every command has a shorthand alias to speed up development. Same command from above can be written as:

```bash
ngt g c new-component
```


Components support relative path generation
```bash
ngt g c layout/header/new-component
```

... will be generated in `./layout/header/new-component` directory

## All available blueprints:

| Scaffold        | Usage (shorthand)|  Name Optional?|
|:------------- |:-------------|:---:|
| class      | `ngt g class [class-name]`| yes |
| [component](#component-blueprint)      |` ngt g c [component-name]`| no |
| directive      | `ngt g d [directive-name]`| yes |
| enum      | `ngt g e [enum-name]`| yes |
| html      | `ngt g h [name]`| yes |
| index      | `ngt g index `| yes |
| interface      | `ngt g i [interface-name]`| yes |
| module      | `ngt g m [module-name]`| yes |
| pipe      | `ngt g p [pipe-name]`| yes |
| [route](#route-blueprint)      | `ngt g r [route-name]`| no |
| routing      | `ngt g routing [routing-name]`| yes |
| service      | `ngt g s [service-name]`| yes |
| style      | `ngt g style [style-name]`| yes |

#### Optional Blueprint Names
For every blueprint (except the `Component` and `Route` blueprints) Angular CLI Tools will use the folder name if a 'name' parameter is NOT provided.

If you are running a `ngt generate module` command (without a module name parameter), in a folder:
```bash
...\layout\header\ngt generate module
```

Angular CLI Tools will automatically create:
```bash
header.module.ts
```

Same concept applies to all blueprints except the `Component` and `Route` blueprint.


#### Component Blueprint

`ngt generate component [component-name]`

| Options    | |
|:------------- |:-------|
| `--scss`     | generate component with .scss file [default] |
| `--css`      | generate component with .css file|


| Example Usage      | |
|:------------- |:-------|
| `ngt generate component nav-bar`     | generate component with .scss file [default to sass]|
| `ngt g c nav-bar --scss`      | generate component with .scss file|
| `ngt g c nav-bar --css`      | generate component with .css file|

#### Route Blueprint

`ngt generate route [route-name]`

Angular CLI Tools generates a lazy loaded route that contains the following files:

* lazy-loaded-route.component.ts
* lazy-loaded-route.component.html
* lazy-loaded-route.component.scss|css
* lazy-loaded-route.module.ts
* lazy-loaded-route.routing.ts


| Options    | |
|:------------- |:-------|
| `--scss`     | generate route component with .scss file [default] |
| `--css`      | generate route component with .css file|


| Example Usage      | |
|:------------- |:-------|
| `ngt generate route dashboard`     | generate a lazy loaded 'dashboard' route |
| `ngt g r dashboard --scss`      | generate component with .scss file|
| `ngt g r dashboard --css`      | generate component with .css file|

To add a new lazy loaded route to your project:

 * find a `routing.ts` file that will use the new lazy loaded route
 * add the code below to the `Routes` array  found in the `routing.ts` file.
 * replace 'dashboard' with the appropriate route name

```
    {path: 'dashboard', loadChildren: './path-to-dashboard-module/dashboard.module#DashboardModule'},
```

NOTE: w/webpack you'll need to use a router loader such as [angular2-router-loader](https://www.npmjs.com/package/angular2-router-loader) or your own way of loading lazy routes. If you generated a project with Angular CLI Tools (v1.3.0+) the loader is installed in the dev-dependencies and works out of the box.

## Custom Templates:
If you don't have a the `angular-cli-tools` folder at the root of you project [install the local templates](#install-local-templates)

In the `angular-cli-tools` folder at the root of your project, there is a `config.json` file that allows you to map and group template files to a template name:
```
{
   "templateMap": {
        "template-name": {
            "file-type": "./path-to-custom-template",
            "file-type": "./path-to-custom-template"
        },
   }
}
```

`template-name` is a custom name that you set which is used as an identifier when generating a component

`file-type` is an identifier telling angular-cli-tools which file to use when generating a custom component

| File Type   | Blueprint |
|:-------------|:-------|
| class    | class.ts|
| component    | component.ts|
| style    | component.scss or .css|
| html    | component.html|
| directive    | directive.ts|
| enum    | enum.ts|
| index    | index.ts|
| interface    | interface.ts|
| lazy-load-module    | lazy-load-module.ts|
| lazy-load-routing    | lazy-load-routing.ts|
| module    | module.ts|
| pipe    | pipe.ts|
| routing    | routing.ts|
| service    | service.ts|


#### Example Usage

 To generate a common 'card' type html element:

The following in the `config.json` file will tell angular-cli-tools which blueprint templates to use when generating a card component:

 ```
 {
    "templateMap": {
         "card": {
             "component": "./templates/custom/card/component.ts",
             "html": "./templates/custom/card/component.html",
             "style": "./templates/custom/card/component.scss"
         },
    }
 }
 ```

To generate a 'card' component execute the following command:

`ngt generate component card --template:card`

Or the shorthand version that executes the same command:

`ngt g c card -t:card`

The `--template:template-name` flag (or shorthand `-t:template-name`) tells angular-cli-tools which template to apply when generating a component. Feel free to add your own custom templates especially ones that will be (re)used often throughout your project.

Angular CLI Tools comes with some custom components out of the box and can be found in the `angular-cli-tools/components/custom` folder found at the root of your project.

## Save Templates (v1.4.0+)

You can easily turn an existing component (or service, module, pipe...) into a re-usable template with the following command:

`ngt save`

Above command will save everything in the current working directory as a template and use the `folder name` as the `template name`

As an example pretend there is a `login-form` component in directory:

`../src/app/login-form`

By executing the `ngt save` command in that directory, a template called `login-form` will be created in `angular-cli-tools/templates/saved/login-form`

To use this template (to generate a component elsewhere in the project) provide the `template name` when using the generate command:

`ngt generate component some-other-form -template:login-form`

or shorthand:

`ngt g c some-other-form -t:login-form`

When saving templates you can also provide a custom `template name` as such:

`ngt save -template:custom-template-name`

or shorthand:

`ngt s -t:custom-template-name`

where `custom-template-name` is the name you provide.

This command is great for re-using similar components throughout the application that start off the same and then get customized as the requirements grow. Common uses are form components. You can easily create a basic ng2 form with standard validation, turn it into a template then stamp out forms where needed in the app. The forms created from the template can then be customized per requirement but they'll all start from the same base form that was used to generate the template.

### Advanced Usage

you can also specify which type of component to save by providing the component filename directly:

`ngt save ./login-form.module.ts -template:form-module`

This will in turn only save the `module` component as a template without saving the rest of the files in the folder.

Then, to generate a module from the `form-module` template:

`ngt generate module -t:form-module`


## Update index.ts files
Angular CLI Tools has commands to generate and update index.ts files (barrels) to rollup exports from several modules into a single convenience module.

```bash
ngt generate index
```

...will create an `index.ts` file in the current directory if it doesn't already exists.

If the barrel (`index.ts`) already exists you can update it with
```bash
ngt update index
```
The `update` command will delete the current `index.ts` file and generate a new (updated) `index.ts` file.

### Update index.ts files recursively

```bash
ngt update index --recursive
```

This will update the `index.ts` file in the current folder plus any other sub-folder it encounters.

## Edit Blueprint Templates
#### If you already started with a [Angular CLI Tools seed](#create-a-new-project):

  You'll notice a `angular-cli-tools/templates` folder at the root of your project directory. Inside you'll find all the component blueprints. When generating components, Angular CLI Tools will use the template in that folder first before defaulting to it's own template file. Feel free to edit the local template files in the `angular-cli-tools/templates` folder to match your project's needs.

#### If you have an existing project, [install the local templates](#install-local-templates):

### Install Local Templates

```bash
ngt install templates
```

This will install the `angular-cli-tools\templates` folder at the root of your project at which point you can edit  and customize the local templates found in the `angular-cli-tools/templates` folder.


## Shortcuts
| Verbose        | Shorthand|  |
|:------------- |:-------|:-------|
| `ngt new [PROJECT-NAME]`      | `ngt n [PROJECT-NAME]`|  Basic Project |
| `ngt new [PROJECT-NAME] --bootstrap`      | `ngt n [PROJECT-NAME] -b`| Bootstrap 4 project  |
| `ngt new ./my-projects/[PROJECT-NAME] --material`      | `ngt n ./my-projects/[PROJECT-NAME] -m`|  Angualar Material project|
| `ngt new [PROJECT-NAME] --url:[GitHub URL]`      | `ngt n [PROJECT-NAME] -u:[GitHub URL]`| Seed from github.com  |
| `ngt generate class [NAME]`      | `ngt g class [NAME]`| [NAME] optional |
| `ngt generate component [NAME]` |` ngt g c [NAME]`| [NAME] mandatory  |
| `ngt generate component [NAME] -scss` |` ngt g c [NAME] -s`| With a .scss style file |
| `ngt generate component [NAME] -css` |` ngt g c [NAME] -c`| With a .css style file|
| `ngt generate directive [NAME]`      | `ngt g d [NAME]`| [NAME] optional |
| `ngt generate enum`     | `ngt g e [NAME]`| [NAME] optional |
| `ngt generate index`     | `ngt g index `| Generate a barrel (index.ts file)|
| `ngt update index`     | `ngt u index `| Update a barrel (index.ts file)|
| `ngt update index --recursive`     | `ngt u iindex -r`| Update a barrel in current folder and all sub folders|
| `ngt generate interface [NAME]`     | `ngt g i [NAME] `| [NAME] optional |
| `ngt generate module [NAME]`      | `ngt g m [NAME]`| [NAME] optional |
| `ngt generate pipe [NAME]`      | `ngt g p [NAME]`| [NAME] optional |
| `ngt generate route [NAME]`      | `ngt g r [NAME]`| [NAME] optional |
| `ngt generate service [NAME]`      | `ngt g s [NAME]`| [NAME] optional |
| `ngt install templates`      | `ngt i t`| installs `angular-cli-tools\templates` folder|

Note: `[NAME] optional` means that if the NAME parameter is not provided, [Angular CLI Tools will use the folder name as the name of the component.](#optional-blueprint-names)


## Changelog
* v1.6.0 - [project seeds pulled from github repositories](#create-a-new-project) 
* v1.5.0 - added "create barrels" option to config file (user can opt out of creating/updating index.ts files when generating components)
* v1.4.2 - updated project seeds to follow style guide structure, install config.json with new projects (bug)
* v1.4.1 - updated project seeds to: webpack 2, angular 2.1, router 3.1, angular2-router-loader
* v1.4.0 - [Save Templates](#save-templates-v140)
* v1.3.0 - [New Components](#all-available-blueprints): `html` `style`, [Lazy Loaded Routes](#route-blueprint), [Custom Templates](#custom-templates)
* v1.2.0 - [Use any seeds from github.com to start a project](#from-github)
* v1.1.1 - Do not add spec files to barrels
* v1.1.0 - [Create project from scratch (basic|bootstrap|material project seeds)](#create-a-new-project)
* v1.0.6 - bug fixes
* v1.0.4 - relative path generation for components
* v1.0.3 - bug fixes
* v1.0.2 - added barrel (index.js) generation
* v1.0.0 - initial version

## Credits
Full credit to the team at [https://github.com/preboot/angular2-webpack](https://github.com/preboot/angular2-webpack) for providing an open source Angular 2 webpack seed that is used as the base seed when generating basic | bootstrap | material projects with angular-cli-tools.

## License
Copyright (c) 2016 Little Universe Studios
Licensed under the MIT license.
