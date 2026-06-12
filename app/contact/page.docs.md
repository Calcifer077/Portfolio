`ContactPage`

#### Setting state

We are using `useState` but a object in the state.

```ts
type FormData = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

const [formData, setFormData] = useState<FormData>({
  name: "",
  email: "",
  subject: "",
  message: "",
});
```

In the above way we don't have to create a separate state for each name, email, subject, message.

Handling change:

```ts
const handleChange = (
  e: React.ChangeEvent<
    HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
  >,
) => {
  setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
};
```

`HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement` because we use a `input` element, a `select` element and a `text area` element. `e.target.name` comes from the input itself. We have mentioned it for each of them.

We also check if the input element is focused or not and set styling accordingly.

```ts
className={`${inputBase} ${focused === "subject" ? inputFocused : inputIdle} cursor-pointer`}
```

`focused` is tracked using state.

```ts
const [focused, setFocused] = useState<string | null>(null);
```

Styling:

```ts
const inputBase =
  "w-full bg-bg-deep border rounded px-4 py-3 font-mono text-sm text-text-primary placeholder-text-muted/40 outline-none transition-all duration-200";
const inputIdle = "border-border-subtle hover:border-primary/30";
const inputFocused =
  "border-primary/60 shadow-[0_0_0_3px_rgba(173,198,255,0.08)]";
```

We also define different states of form and display things differently according to that.

```ts
type FormState = "idle" | "loading" | "success" | "error";
```

For example, after submitting form, form goes to `success` state and displays a success message.

#### `onFocus` and `onBlur`

These are used in inputs. `onFocus` event is triggered when user is interacting with our input element. `onBlur` is triggered when user clicks anywhere that's not our input element.
