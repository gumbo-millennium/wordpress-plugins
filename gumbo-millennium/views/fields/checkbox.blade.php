<tr>
    @if ($authorized)
    <td>&nbsp;</td>
    <td>
        <label class="{{ $field->name }}_label">
            <input
            id="{{ $field->name }}"
            name="{{ $field->name }}"
            class="{{ $field->name }}_field"
            type="checkbox"
            {{ $value ? ' checked' : '' }}
            {{ $field->help ? " aria-describedby=\"{$field->name}\"__help" : null }}>
            {{ $field->label }}
        </label>
        @includeWhen(!empty($field->help), 'a11y.help', ['field' => $field])
    </td>
    @else
    <td>{{ $field->label }}</td>
    <td>{{ $value ? __('Yes') : __('No') }}</td>
    @endif
</tr>
