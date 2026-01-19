# Global Components & Directives

This document describes the MDX directives and global components available in the documentation.

## Directive Syntax

The documentation uses a directive syntax that transforms markdown into React components. All directives use the `::directive` pattern with `::` as the closing marker.

### Button Directive

Creates a styled button/link with optional arrow icon.

```markdown
::button {{ url: '/path', variant: 'text' }}

Button label text

::icon arrow-right

::
```

**Attributes:**
- `url` or `href`: The link destination (required)
- `variant`: Button style - `'text'` for text link, `'outline'` for outlined button
- `arrow`: Arrow direction - `'right'` or `'left'` (can also use `::icon` directive)

**Icon directive:**
- `::icon arrow-right` - Adds right arrow
- `::icon arrow-left` - Adds left arrow

### Row/Col Directives

Creates a two-column layout, commonly used for API documentation with description on left and code on right.

```markdown
::row

::col

Left column content (description, properties, etc.)

::col sticky

Right column content (code examples) - sticky keeps it visible while scrolling

::
```

**Col attributes:**
- `sticky` - Makes the column sticky positioned

### Properties/Property Directives

Renders API property documentation with name, type, and description.

```markdown
::properties

::property {{ name: 'id', type: 'string' }}

Description of the property.

::property {{ name: 'created_at', type: 'timestamp' }}

Another property description.

::
```

**Property attributes:**
- `name`: Property name (required)
- `type`: Property type (optional)

### Code Group Directive

Groups multiple code blocks into a tabbed interface.

```markdown
::code-group {{ title: 'Request', tag: 'GET', label: '/v1/endpoint' }}

```bash {{ title: 'cURL' }}
curl https://api.example.com/v1/endpoint
```

```js
const client = new ApiClient()
await client.endpoint.get()
```

::
```

**Attributes:**
- `title`: Header title (optional)
- `tag`: HTTP method badge, e.g., `'GET'`, `'POST'` (optional)
- `label`: Endpoint label (optional)

## JSX Components

Some components are still used as JSX when needed:

### Note Component

```jsx
<Note>
  Important information here.
</Note>
```

### Button Component (direct JSX)

For inline buttons in layouts:

```jsx
<div className="not-prose mt-6 mb-16 flex gap-3">
  <Button href="/quickstart" arrow="right">
    Quickstart
  </Button>
  <Button href="/sdks" variant="outline">
    Explore SDKs
  </Button>
</div>
```

### Special Components

- `<Guides />` - Renders the guides section
- `<Resources />` - Renders the resources section
- `<Libraries />` - Renders the SDK libraries grid
- `<HeroPattern />` - Background pattern for hero sections

## Complete Example

Here's a typical API endpoint documentation:

```markdown
## List all items {{ tag: 'GET', label: '/v1/items' }}

::row

::col

Description of the endpoint.

### Optional attributes

::properties

::property {{ name: 'limit', type: 'integer' }}

Limit the number of items returned.

::property {{ name: 'offset', type: 'integer' }}

Offset for pagination.

::

::col sticky

::code-group {{ title: 'Request', tag: 'GET', label: '/v1/items' }}

```bash {{ title: 'cURL' }}
curl -G https://api.example.com/v1/items \
  -H "Authorization: Bearer {token}" \
  -d limit=10
```

```js
import ApiClient from '@example/api'

const client = new ApiClient(token)
await client.items.list()
```

::

```json {{ title: 'Response' }}
{
  "has_more": false,
  "data": [
    { "id": "abc123" }
  ]
}
```

::
```

## Annotations

The documentation uses `mdx-annotations` for inline metadata:

```markdown
## Section Title {{ tag: 'GET', label: '/v1/endpoint' }}

Paragraph with class. {{ className: 'lead' }}

```js {{ title: 'Example' }}
// Code with title
```
```

Available annotations:
- `{{ className: 'lead' }}` - Lead paragraph styling
- `{{ tag: 'GET' }}` - HTTP method tag
- `{{ label: '/v1/endpoint' }}` - Endpoint label
- `{{ title: 'Example' }}` - Code block title
- `{{ anchor: false }}` - Disable heading anchor
