const pluralize = require('pluralize');

module.exports = function (plop) {
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
      
      actions.push(
        {
          type: 'add',
          path: 'src/modules/' + pluralize(data.name) + '/index.ts',
          templateFile: 'plop-templates/module/index.txt',
          data : {
            name : data.name,
            pluralName : pluralize(data.name),
            pluralCapName : capitalizeFirstLetter(pluralize(data.name))
          },
        },
        {
          type: 'add',
          path: 'src/modules/' + pluralize(data.name) + '/' + pluralize(data.name) +'.graphql',
          templateFile: 'plop-templates/module/templates.txt',
          data : {
            name : data.name,
            capName : capitalizeFirstLetter(data.name),
            pluralName : pluralize(data.name),
            pluralCapName : capitalizeFirstLetter(pluralize(data.name))
          },
        },
        {
          type: 'add',
          path: 'src/modules/' + pluralize(data.name) + '/' + pluralize(data.name) +'.module.ts',
          templateFile: 'plop-templates/module/templates.module.txt',
          data : {
            name : data.name,
            capName : capitalizeFirstLetter(data.name),
            pluralName : pluralize(data.name),
            pluralCapName : capitalizeFirstLetter(pluralize(data.name))
          },
        },
        {
          type: 'add',
          path: 'src/modules/' + pluralize(data.name) + '/' + pluralize(data.name) +'.service.ts',
          templateFile: 'plop-templates/module/templates.service.txt',
          data : {
            name : data.name,
            capName : capitalizeFirstLetter(data.name),
            pluralName : pluralize(data.name),
            pluralCapName : capitalizeFirstLetter(pluralize(data.name))
          },
        },
        {
          type: 'add',
          path: 'src/modules/' + pluralize(data.name) + '/' + pluralize(data.name) +'.resolver.ts',
          templateFile: 'plop-templates/module/templates.resolver.txt',
          data : {
            name : data.name,
            capName : capitalizeFirstLetter(data.name),
            pluralName : pluralize(data.name),
            pluralCapName : capitalizeFirstLetter(pluralize(data.name))
          },
        },
        {
          type: 'add',
          path: 'src/modules/' + pluralize(data.name) + '/repositories/' + data.name +'.repository.ts',
          templateFile: 'plop-templates/module/repositories/template.repository.txt',
          data : {
            name : data.name,
            capName : capitalizeFirstLetter(data.name),
            pluralName : pluralize(data.name),
            pluralCapName : capitalizeFirstLetter(pluralize(data.name))
          },
        },
        {
          type: 'add',
          path: 'src/modules/' + pluralize(data.name) + '/entities/' + data.name +'.entity.ts',
          templateFile: 'plop-templates/module/entities/templates.entity.txt',
          data : {
            name : data.name,
            capName : capitalizeFirstLetter(data.name),
            pluralName : pluralize(data.name),
            pluralCapName : capitalizeFirstLetter(pluralize(data.name))
          },
        },
        {
          type: 'add',
          path: 'src/modules/' + pluralize(data.name) + '/dto/create-' + data.name +'.dto.ts',
          templateFile: 'plop-templates/module/dto/create-template.dto.txt',
          data : {
            name : data.name,
            capName : capitalizeFirstLetter(data.name),
            pluralName : pluralize(data.name),
            pluralCapName : capitalizeFirstLetter(pluralize(data.name))
          },
        },
        {
          type: 'add',
          path: 'src/modules/' + pluralize(data.name) + '/dto/find-' + data.name +'.dto.ts',
          templateFile: 'plop-templates/module/dto/find-template.dto.txt',
          data : {
            name : data.name,
            capName : capitalizeFirstLetter(data.name),
            pluralName : pluralize(data.name),
            pluralCapName : capitalizeFirstLetter(pluralize(data.name))
          },
        },
        {
          type: 'add',
          path: 'src/modules/' + pluralize(data.name) + '/dto/find-' + pluralize(data.name) +'.dto.ts',
          templateFile: 'plop-templates/module/dto/find-templates.dto.txt',
          data : {
            name : data.name,
            capName : capitalizeFirstLetter(data.name),
            pluralName : pluralize(data.name),
            pluralCapName : capitalizeFirstLetter(pluralize(data.name))
          },
        },
      );
      
      return actions
      
    }
  });
};
