import React from "react";
import DatePicker from "./DatePicker";

export default {
  title: "Components/DatePicker",
  component: DatePicker,
};

const Template = (args) => <DatePicker {...args} />;

export const Default = Template.bind({});
Default.args = {};
