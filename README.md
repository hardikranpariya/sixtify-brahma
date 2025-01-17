# @codezee/sixtify-brahama

A React package that simplifies form creation and table management!  
This package leverages react-hook-form and AG Grid to provide a comprehensive set of input fields and components for building dynamic and powerful forms.  
It also includes a complete Storybook for all components to help you explore and integrate them easily.

## Features
- Integrates seamlessly with react-hook-form for form handling.
- Includes AG Grid for powerful table management.
- A wide variety of input components to suit all your needs.
- Fully documented with Storybook.


This package is 100% [TypeScript](https://www.typescriptlang.org/).

### Utilities

This Turborepo has some additional tools already setup for you:

- [TypeScript](https://www.typescriptlang.org/) for static type checking
- [ESLint](https://eslint.org/) for code linting
- [Prettier](https://prettier.io) for code formatting

### Remote Caching

Turborepo can use a technique known as [Remote Caching](https://turbo.build/repo/docs/core-concepts/remote-caching) to share cache artifacts across machines, enabling you to share build caches with your team and CI/CD pipelines.

By default, Turborepo will cache locally. To enable Remote Caching you will need an account with Vercel. If you don't have an account you can [create one](https://vercel.com/signup), then enter the following commands:

```
cd my-turborepo
npx turbo login
```

This will authenticate the Turborepo CLI with your [Vercel account](https://vercel.com/docs/concepts/personal-accounts/overview).

Next, you can link your Turborepo to your Remote Cache by running the following command from the root of your Turborepo:

```
npx turbo link
```

## Useful Links

Learn more about the power of Turborepo:

- [Tasks](https://turbo.build/repo/docs/core-concepts/monorepos/running-tasks)
- [Caching](https://turbo.build/repo/docs/core-concepts/caching)
- [Remote Caching](https://turbo.build/repo/docs/core-concepts/remote-caching)
- [Filtering](https://turbo.build/repo/docs/core-concepts/monorepos/filtering)
- [Configuration Options](https://turbo.build/repo/docs/reference/configuration)
- [CLI Usage](https://turbo.build/repo/docs/reference/command-line-reference)




## Installation

Install the package using pnpm:

```sh
pnpm install @codezee/sixtify-brahama
```

## Usage

Import the package in your React component:

```jsx
import { TextField } from '@codezee/sixtify-brahama';
import { useForm } from 'react-hook-form';

function MyComponent() {
    const { control } = useForm({
        defaultValues: {
            name: 'John Doe',
        },
    });

  return (
    <TextField name="name" label="Name" control={control} />
  );
}
```


## Documentation

For detailed usage and examples, check out the full documentation:  
[See Documentation](https://hardikranpariya.github.io/sixtify-brahma/)
