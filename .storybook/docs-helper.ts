import * as jsonDocs from './docs.json';
const components = jsonDocs['components'];

export class DocsHelper {
  static getArguments(componentTag: string) {
    let componentProps = components.find(component => component.tag === componentTag)?.props ?? [];
    // const componentEvents = components[componentTag].events;
    const args = {};
    componentProps.forEach(async prop => {
      args[prop.attr] = await this.getControl(prop);
    });
    return args;
  }

  static async getControl(prop) {
    const proReferences = prop['complexType']['references'];
    switch (prop.type) {
      case 'boolean':
        return { control: 'boolean', description: prop.docs };
      case 'string':
        return { control: 'text', description: prop.docs };
    }

    if (Object.keys(proReferences).length > 0) {
      let propEnumName = prop['complexType']['original'];
      let pattern = /^(.*?)\.enum\.ts/;
      let path = proReferences[propEnumName].id.match(pattern)[1];
      let propEnum = await import(`../${path}.enum.ts`);
      return { control: 'select', options: Object.keys(propEnum[propEnumName]) };
    }
  }
}
