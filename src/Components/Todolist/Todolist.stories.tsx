import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import {Todolist} from './Todolist';
import {decoratorHOC} from '../../core/decorator';

export default {
  title: 'TODOLIST/Todolist',
  component: Todolist,
  decorators: [decoratorHOC]
} as ComponentMeta<typeof Todolist>;

const Template: ComponentStory<typeof Todolist> = (args) => <Todolist {...args} />;

export const TodolistBase = Template.bind({});
TodolistBase.args = {
  todolistId: "todolistId1"
};
