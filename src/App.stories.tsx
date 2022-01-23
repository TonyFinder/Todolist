import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import {App} from './App';
import {decoratorHOC} from './core/decorator';

export default {
  title: 'TODOLIST/APP',
  component: App,
  decorators: [decoratorHOC]
} as ComponentMeta<typeof App>;

const Template: ComponentStory<typeof App> = () => <App />;

export const AppBase = Template.bind({});
AppBase.args = {};
