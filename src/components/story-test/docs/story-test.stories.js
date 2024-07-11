import { fn } from '@storybook/test';
import { createSTest } from './story-test';
import {Color} from '../color.enum'
import { DocsHelper } from '../../../../.storybook/docs-helper';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
export default {
  title: 'Example/StoryTest',
  tags: ['autodocs'],
  render: ({ label, ...args }) => {
    // You can either use a function to create DOM elements or use a plain html string!
    // return `<div>${label}</div>`;
    return createSTest({ label, ...args });
  },
  argTypes: DocsHelper.getArguments('story-test'),
  //{
  //  text: { control: {type: 'text'} },
  //  color: {
  //   control: { type: 'select' },
  //   options: ['none',...Object.values(Color)],
  // },
  // },
  // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
  //args: {  },
};

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Test1 = {
  args: {
    text: 'Test1',
    color: Color.Orange
  },
};
