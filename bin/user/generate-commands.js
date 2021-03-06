#! /usr/bin/env node
var path = require('path');
var cliConfig = require('../cli-config');
var tools = require('../api/tools');
var blueprint = require('../commands/generate/blueprint');
var indexBlueprint = require('../commands/generate/index');
var generalBlueprint = require('../commands/generate/blueprint');
var blueprintMetadataModule = require('../commands/generate/blueprint-metadata');
var userConfigModule = require('./user-config');


var generateCommandsModule = {
    generateBlueprint : function (blueprintType, blueprintName, vFlags) {
        blueprintType = cliConfig.command.shorthand.components[blueprintType] || blueprintType; //if blueprint comes in shorthand form

        switch (blueprintType) {
            case 'index':
                blueprintName = tools.pathEndsWithSlash(blueprintName) ? blueprintName : blueprintName + '/';
                var indexData = blueprintMetadataModule.extractNameData(blueprintName,'index');
                indexBlueprint.generateCommand(indexData.destinationDirectory);
                tools.logSuccess('Created ' + indexData.destinationDirectory + 'index.ts');
                break;
            case 'component':
            case 'route':
                // Check if user provided a name. Must have name for component/route
                if (blueprintName == '' || tools.pathEndsWithSlash(blueprintName)) {
                    tools.throwError('You need to provide a name for ' + blueprintType + '.');
                }
            case 'class':
            case 'directive':
            case 'enum':
            case 'html':
            case 'interface':
            case 'module':
            case 'pipe':
            case 'routing':
            case 'service':
            case 'style':
                blueprintMetadataModule.logUserTemplateUsed(vFlags);
                var projectRootPath = tools.getProjectRootFolder();
                var blueprints = blueprintMetadataModule.getBlueprints(blueprintType, blueprintName, vFlags, projectRootPath);
                generalBlueprint.generateFilesFromBlueprints(blueprints, function () {
                    //use the first blueprint's destination directory to create the barrel
                    var createBarrels = userConfigModule.getProperty('commands.generate.createBarrels', projectRootPath);
                    if (createBarrels === true || createBarrels === undefined) {
                        indexBlueprint.updateCommand(blueprints[0].destinationDirectory);
                    }
                    generateCommandsModule.displayUsageMessage(blueprints[0]);
                });
                break;
            default:
                tools.logError('Blueprint for scaffold: \'' + blueprintType + '\' does not exist. Run: \'ngt -h\' for list of commands');
                break;
        }
    },
    displayUsageMessage : function (blueprint) {
        switch (blueprint.type) {
            case 'route':
                var routeName = blueprint.componentName.original;
                var routePascalCaseName = blueprint.componentName.pascalCase;
                tools.log(
                    tools.logColorCyan('\nExample usage: add code below to a parent routing file where this lazy loaded route will be called from.\n'),
                    tools.logColorYellow('{path: \'' + routeName + '\', loadChildren: \'./' + routeName + '/' + routeName + '.module#' + routePascalCaseName + 'Module\'},')
                );
                break;
        }
    },
    getBlueprintFiles : function (blueprintType, nameMetadata, vFlags) {

    }
};

module.exports = generateCommandsModule;

