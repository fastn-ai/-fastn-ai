# @fastn-ai/widget-react

A React component library for easily integrating and embedding Fastn widgets into your application.

## Installation

```bash
npm install @fastn-ai/widget-react
```

## Usage

```jsx
import React from 'react';
import FastnWidget from '@fastn-ai/widget-react';

const Component = () => {
  const authToken = useAuth(); // Your authentication logic

  return (
    <FastnWidget
      projectId="example-project-id"
      authToken={authToken}
      tenantId="example-tenant-id"
      apiKey="example-api-key"
      theme="light"
      env="LIVE"
    />
  );
};
```

## Props

| Prop Name | Type   | Description                                                                   |
| --------- | ------ | ----------------------------------------------------------------------------- |
| projectId | string | The ID of the project whose widget you want to embed.                         |
| authToken | string | The authentication token used to authenticate your application users.         |
| tenantId  | string | The ID of the tenant (e.g., user, organization, etc.) (optional).             |
| apiKey    | string | The API key to use for executing flows (optional).                            |
| theme     | string | The theme of the widget ("light" or "dark") (optional).                       |
| env       | string | The environment of the widget ("LIVE" or other values) (optional).            |
| style     | object | The style object to apply to the widget (optional).                           |


