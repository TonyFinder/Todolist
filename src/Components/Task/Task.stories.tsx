import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import {Task} from './Task';
import {decoratorHOC} from '../../core/decorator';

export default {
  title: 'TODOLIST/Task',
  component: Task,
  decorators: [decoratorHOC]
} as ComponentMeta<typeof Task>;

const Template: ComponentStory<typeof Task> = (args) => <Task {...args} />;

export const TaskUncompletedBase = Template.bind({});
TaskUncompletedBase.args = {
  todolistId: "todolistId1",
  taskId: "2"
};
export const TaskCompletedBase = Template.bind({});
TaskCompletedBase.args = {
  todolistId: "todolistId1",
  taskId: "1"
};