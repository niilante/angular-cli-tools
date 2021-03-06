#! /usr/bin/env node
var cliConfig = require('../cli-config');
var tools = require('../api/tools');
var blueprintMetadataModule = require('../commands/generate/blueprint-metadata');
var indexBlueprint = require('../commands/generate/index');

var updateCommands = {
	updateComponent : function (blueprintType, blueprintName, vFlags) {
		blueprintType = cliConfig.command.shorthand.components[blueprintType] || blueprintType; //if blueprint comes in shorthand form
		switch (blueprintType) {
			case 'index':
				blueprintName = tools.pathEndsWithSlash(blueprintName) ? blueprintName : blueprintName + '/';
				var indexData = blueprintMetadataModule.extractNameData(blueprintName);
				if (tools.isvFlagPresent(vFlags, '--recursive')) {
					var updatedFiles = indexBlueprint.updateRecursive(indexData.destinationDirectory, []);
					tools.logSuccess('Updated: \n' +  updatedFiles.map(function (path) {
						return '   ' + path + '\n';
					}).join(''));
				} else {
					indexBlueprint.updateCommand(indexData.destinationDirectory);
					tools.logSuccess('Updated ' + indexData.destinationDirectory + 'index.ts');
				}
				break;
			default:
				tools.logError('Update: \'' + blueprintType + '\' is not supported. Run: \'ngt -h\' for list of commands');
				break;
		}
	}
}

module.exports = updateCommands;

