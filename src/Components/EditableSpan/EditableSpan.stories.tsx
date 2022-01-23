import React from 'react';
import {ComponentMeta, ComponentStory} from '@storybook/react';
import {EditableSpan} from './EditableSpan';
import {action} from '@storybook/addon-actions';

export default {
  title: 'TODOLIST/Editable Span',
  component: EditableSpan,
  args: {changedTitle: action('Title have to be changed to')}
} as ComponentMeta<typeof EditableSpan>;

const Template: ComponentStory<typeof EditableSpan> = (args) => <EditableSpan {...args} />;

export const EditableSpanForHeader = Template.bind({});
EditableSpanForHeader.args = {
  completed: false,
  header: true,
  titleMain: "Title for todolist",
};
export const EditableSpanForTaskActive = Template.bind({});
EditableSpanForTaskActive.args = {
  completed: false,
  header: false,
  titleMain: "Title for task active",
};
export const EditableSpanForTaskCompleted = Template.bind({});
EditableSpanForTaskCompleted.args = {
  completed: true,
  header: false,
  titleMain: "Title for task completed",
};
