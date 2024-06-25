import Button from './Button'
import { fn } from '@storybook/test'

const meta = {
  component: Button
}

export default meta

export const Default = {
  args: {
    iconin: '',
    titule: '',
    color: '', 
    hovercolor: '',
    bordercolor: '', 
    fontcolor: '',
    onclick: fn(),

  }
}