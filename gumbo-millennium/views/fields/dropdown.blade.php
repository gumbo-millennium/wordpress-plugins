<tr>
    <td>{{ $field->label }}</td>
    <td>
        @if ($authorized)
        <select
            id="{{ $field->name }}"
            name="{{ $field->name }}"
            class="{{ $field->name }}_field"
            {{ $field->help ? " aria-describedby=\"{$field->name}\"__help" : null }}>
            @foreach ($field->options as $optionValue => $optionLabel)
                <option
                    value="{{ $optionValue }}"
                    {{ $optionValue == $value ? ' selected' }}>
                    {{ $optionLabel }}
                </option>
            @endforeach
        </select>
        @include('a11y.help', ['field' => $field])
        @else
        {{ $field->options[$value] ?? 'n/a' }}
        @endif
    </td>
</tr>
