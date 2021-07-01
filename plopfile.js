const pluralize = require('pluralize');

module.exports = function(plop) {
    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    // create your generators here
    plop.setGenerator('module', {
        description: 'application controller logic',
        prompts: [{
            type: 'input',
            name: 'name',
            message: 'module name please'
        }],
        actions: function(data) {
            let actions = [];

            actions.push({
                    type: 'add',
                    path: 'src/modules/' + pluralize(data.name) + '/index.ts',
                    templateFile: 'src/utils/plop/module/index.txt',
                    data: {
                        name: data.name,
                        pluralName: pluralize(data.name),
                        pluralCapName: capitalizeFirstLetter(pluralize(data.name))
                    },
                }, {
                    type: 'add',
                    path: 'src/modules/' + pluralize(data.name) + '/' + pluralize(data.name) + '.graphql',
                    templateFile: 'src/utils/plop/module/templates.txt',
                    data: {
                        name: data.name,
                        capName: capitalizeFirstLetter(data.name),
                        pluralName: pluralize(data.name),
                        pluralCapName: capitalizeFirstLetter(pluralize(data.name))
                    },
                }, {
                    type: 'add',
                    path: 'src/modules/' + pluralize(data.name) + '/' + pluralize(data.name) + '.module.ts',
                    templateFile: 'src/utils/plop/module/templates.module.txt',
                    data: {
                        name: data.name,
                        capName: capitalizeFirstLetter(data.name),
                        pluralName: pluralize(data.name),
                        pluralCapName: capitalizeFirstLetter(pluralize(data.name))
                    },
                }, {
                    type: 'add',
                    path: 'src/modules/' + pluralize(data.name) + '/' + pluralize(data.name) + '.service.ts',
                    templateFile: 'src/utils/plop/module/templates.service.txt',
                    data: {
                        name: data.name,
                        capName: capitalizeFirstLetter(data.name),
                        pluralName: pluralize(data.name),
                        pluralCapName: capitalizeFirstLetter(pluralize(data.name))
                    },
                }, {
                    type: 'add',
                    path: 'src/modules/' + pluralize(data.name) + '/' + pluralize(data.name) + '.resolver.ts',
                    templateFile: 'src/utils/plop/module/templates.resolver.txt',
                    data: {
                        name: data.name,
                        capName: capitalizeFirstLetter(data.name),
                        pluralName: pluralize(data.name),
                        pluralCapName: capitalizeFirstLetter(pluralize(data.name))
                    },
                }, {
                    type: 'add',
                    path: 'src/modules/' + pluralize(data.name) + '/repositories/' + pluralize(data.name) + '.repository.ts',
                    templateFile: 'src/utils/plop/module/repositories/templates.repository.txt',
                    data: {
                        name: data.name,
                        capName: capitalizeFirstLetter(data.name),
                        pluralName: pluralize(data.name),
                        pluralCapName: capitalizeFirstLetter(pluralize(data.name))
                    },
                }, {
                    type: 'add',
                    path: 'src/modules/' +
                        pluralize(data.name) +
                        '/interfaces/' +
                        data.name +
                        '.interface.ts',
                    templateFile: 'src/utils/plop/module/interfaces/template.interface.txt',
                    data: {
                        name: data.name,
                        capName: capitalizeFirstLetter(data.name),
                        pluralName: pluralize(data.name),
                        pluralCapName: capitalizeFirstLetter(pluralize(data.name)),
                    },
                }, {
                    type: 'add',
                    path: 'src/modules/' + pluralize(data.name) + '/interfaces/' + 'index.ts',
                    templateFile: 'src/utils/plop/module/interfaces/index.txt',
                    data: {
                        name: data.name,
                        capName: capitalizeFirstLetter(data.name),
                        pluralName: pluralize(data.name),
                        pluralCapName: capitalizeFirstLetter(pluralize(data.name)),
                    },
                },

                {
                    type: 'add',
                    path: 'src/modules/' + pluralize(data.name) + '/entities/' + pluralize(data.name) + '.entity.ts',
                    templateFile: 'src/utils/plop/module/entities/templates.entity.txt',
                    data: {
                        name: data.name,
                        capName: capitalizeFirstLetter(data.name),
                        pluralName: pluralize(data.name),
                        pluralCapName: capitalizeFirstLetter(pluralize(data.name))
                    },
                }, {
                    type: 'add',
                    path: 'src/modules/' + pluralize(data.name) + '/dto/create-' + data.name + '.dto.ts',
                    templateFile: 'src/utils/plop/module/dto/create-template.dto.txt',
                    data: {
                        name: data.name,
                        capName: capitalizeFirstLetter(data.name),
                        pluralName: pluralize(data.name),
                        pluralCapName: capitalizeFirstLetter(pluralize(data.name))
                    },
                }, {
                    type: 'add',
                    path: 'src/modules/' +
                        pluralize(data.name) +
                        '/dto/update-' +
                        data.name +
                        '.dto.ts',
                    templateFile: 'src/utils/plop/module/dto/update-template.dto.txt',
                    data: {
                        name: data.name,
                        capName: capitalizeFirstLetter(data.name),
                        pluralName: pluralize(data.name),
                        pluralCapName: capitalizeFirstLetter(pluralize(data.name)),
                    },
                },

                {
                    type: 'add',
                    path: 'src/modules/' + pluralize(data.name) + '/dto/find-' + data.name + '.dto.ts',
                    templateFile: 'src/utils/plop/module/dto/find-template.dto.txt',
                    data: {
                        name: data.name,
                        capName: capitalizeFirstLetter(data.name),
                        pluralName: pluralize(data.name),
                        pluralCapName: capitalizeFirstLetter(pluralize(data.name))
                    },
                });

            return actions

        }
    });
};