<tr>
    <td>{{ $field->label }}</td>
    <td>
        @if ($authorized)
        <input
            type="text"
            placeholder="dd-mm-yyyy"
            data-cleave="date"
            id="{{ $field->name }}"
            name="{{ $field->name }}"
            class="{{ $field->name }}_field"
            value="{{ $value }}"
            {{ $field->help ? " aria-describedby=\"{$field->name}\"__help" : null }}>
        @includeWhen(!empty($field->help), 'a11y.help', ['field' => $field])
        @else
        {{ $value }}
        @endif
    </td>
</tr>
