import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import {Task} from './Task';
import {decoratorHOC} from '../decorator';

export default {
  title: 'TODOLIST/Task',
  component: Task,
  decorators: [decoratorHOC]
} as ComponentMeta<typeof Task>;

const Template: ComponentStory<typeof Task> = (args) => <Task {...args} />;

export const TaskUncompletedBase = Template.bind({});
TaskUncompletedBase.args = {
  todolistId: "todolistId1",
  id: "2"
};
export const TaskCompletedBase = Template.bind({});
TaskCompletedBase.args = {
  todolistId: "todolistId1",
  id: "1"
};