import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import {AddItemForm} from './AddItemForm';
import {action} from '@storybook/addon-actions';

export default {
  title: 'TODOLIST/Add Item Form',
  component: AddItemForm,
} as ComponentMeta<typeof AddItemForm>;

const Template: ComponentStory<typeof AddItemForm> = (args) => <AddItemForm {...args} />;

export const AddItemFormBase = Template.bind({});
AddItemFormBase.args = {addItem: action('New item have to be added with title')};
