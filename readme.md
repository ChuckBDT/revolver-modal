![Illustration](./Illustration.png)

#

Revolver Modal is a custom React hook dedicated to simplify the creation of modals for React, it has no dependencies and is made to be the lightest possible

## Dependencies

- `React` : 16.8.0 or later

## Installation

```
npm i revolver-modal
```

## Usage

`useModal` returns an array containing two functions:

1. `setContent` - A function that takes in the modal content as a parameter and returns the modal component
2. `triggerModal` - A function that toggles the modal's open state

```jsx
import useModal from "revolver-modal";

function ExampleComponent() {
  const [setContent, triggerModal] = useModal();

  return (
    <div>
      {setContent(<div>Modal content goes here</div>)}
      <button onClick={() => triggerModal()}>Open Modal</button>
    </div>
  );
}
```

## Styling

The `useModal` hook uses CSS classes that can be styled in a separate stylesheet or with inline styles.

Here's a list of the CSS classes used by `useModal`:

- `.useModal` : The container for the modal component
- `.useModal-frame` : The frame around the modal content
- `.useModal-closeBtn` : The button to close the modal
- `.useModal-content` : The container for the modal content

## License

This project is licensed under the [MIT License](https://opensource.org/licenses/MIT).
