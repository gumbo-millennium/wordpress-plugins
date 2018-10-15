<tr>
    <td>{{ $field->label }}</td>
    <td>
        @if ($authorized)
        <input
            type="text"
            placeholder="hh:mm"
            data-cleave="time"
            format="[0-2][0-9]:[0-5][0-9]"
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
