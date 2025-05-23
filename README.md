# React DatePicker Component

A customizable and modern date picker component for React applications.

## Installation

```bash
npm install react-datepicker-component
# or
yarn add react-datepicker-component
```

## Usage

```jsx
import React from "react";
import DatePicker from "react-datepicker-component";

function App() {
  const [date, setDate] = React.useState(null);

  return <DatePicker label="Select Date" value={date} onChange={setDate} />;
}
```

## Props

| Prop      | Type     | Required | Default   | Description                             |
| --------- | -------- | -------- | --------- | --------------------------------------- |
| label     | string   | No       | undefined | Label for the date picker input         |
| value     | string   | No       | null      | Selected date value (YYYY-MM-DD format) |
| onChange  | function | No       | undefined | Callback function when date changes     |
| className | string   | No       | ""        | Additional CSS class name               |

## Features

- Modern and clean design
- Customizable styling
- Keyboard navigation
- Responsive layout
- Accessible
- TypeScript support

## License

MIT
