import { StoryFn, Meta } from "@storybook/react";
import { Filter } from ".";
export default {
  title: "atoms/Filter",
  component: Filter,
} as Meta<typeof Filter>;

const template: StoryFn<typeof Filter> = () => <Filter />;
export const Default = template.bind({});
Default.args = {};
