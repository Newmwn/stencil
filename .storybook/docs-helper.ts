import * as jsonDocs from './docs.json';

const components = jsonDocs['components'];

export class DocsHelper {
    static getArguments(componentTag: string) {
        console.log(components)
        let componentProps = components.find(componentTag => componentTag.name == componentTag).props;
        // const componentEvents = components[componentTag].events;
        const args = {};
        componentProps.forEach(prop => {
            args[prop.attr] = this.getControl(prop.type)
        })
        return args
    }


    static getControl(type: string) {
        switch (type) {
            case 'boolean':
                return { control: 'boolean' };
            case 'text':
                return { control: 'text' };

        }
    }

}
