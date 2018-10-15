<tr>
    <td>{{ $field->label }}</td>
    <td>
        @if ($authorized)
        <input
            type="text"
            placeholder="{{ $field->placeholder ?? $field->label }}"
            id="{{ $field->name }}"
            name="{{ $field->name }}"
            class="{{ $field->name }}_field"
            value="{{ $value }}"
            {{ $field->help ? " aria-describedby=\"{$field->name}\"__help" : null }}>
        @include('a11y.help', ['field' => $field])
        @else
        {{ $value }}
        @endif
    </td>
</tr>
