
Spinner for selecting numbers. The NumberPicker is a _localized_ widget and so __requires__ a localizer to
be specified.  You can read more about localizers here: [localization](i18n).

<--------------->

### value?{ type: '?number', controllable: "onChange" }

${language.value}

<EditableExample codeText={require('../examples/valuePicker')(widgetName, [1, null])}/>

### onChange?{ type: 'function(value: ?number)', controllable: "value"  }

${language.onChange}

<EditableExample codeText={require('../examples/onChangePicker')(widgetName, [1, null])}/>

### format?{ localizable: true }

A format string used to display the number value. Localizer dependent, read [localization](i18n) for more info.

### parse?{ type: 'function(str: string, culture: ?string) | array<string>' }

Determines how the {widgetName} parses a number from the localized string representation.
You can also provide a parser `function` to pair with a custom `format`.

### min?{ type: 'number', default: '-Infinity' }

The minimum number that the {widgetName} value.

<EditableExample codeText={require('../examples/prop')(widgetName, 'min', 0)}/>

### max?{ type: 'number', default: 'Infinity' }

The maximum number that the {widgetName} value.

<EditableExample codeText={require('../examples/prop')(widgetName, 'max', 5)}/>

### step?{ type: 'number', default: '1' }

Amount to increase or decrease value when using the spinner buttons.

<EditableExample codeText={require('../examples/prop')(widgetName, 'step', 5)}/>

### precision?{ type: 'number' }

Specify how precise the `value` should be when typing, incrementing, or decrementing the value. When empty, precision
is parsed from the current `format` and culture.

### isRtl?{ type: 'bool', default: 'false' }

${language.isRtl}

### messages?{ type: 'object' }

${language.messages}

### messages.increment?{ type: 'string', default: '"increment value"' }

Number picker spinner up button text for screen readers

### messages.decrement?{ type: 'string', default: '"decrement value"' }
Number picker spinner down button text for screen readers

## Keyboard Navigation

- <kbd>down arrow</kbd> decrement value
- <kbd>up arrow</kbd> increment value

- <kbd>home</kbd> set value to minimum value if finite
- <kbd>end</kbd> set value to maximum value if finite
