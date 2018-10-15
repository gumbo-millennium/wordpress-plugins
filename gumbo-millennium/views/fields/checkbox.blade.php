@section('form-field')
    <label class="{{ $field->name }}_label" style="display: block">
        <input
        id="{{ $field->name }}"
        name="{{ $field->name }}"
        class="{{ $field->name }}_field"
        type="checkbox"
        {{ $value ? ' checked' : '' }}
        {{ $field->help ? " aria-describedby=\"{$field->name}\"__help" : null }}>
        {{ $field->label }}
    </label>
    @include('a11y.help', ['field' => $field])
@endsection

@if ($context != 'side')

<tr>
    @if ($authorized)
    <td>&nbsp;</td>
    <td>
        @yield('form-field')
    </td>
    @else
    <td>
        {{ $field->label }}
    </td>
    <td>
        <strong>{{ $value ? __('Yes') : __('No') }}</strong>
    </td>
    @endif
</tr>

@else

<tr>
    @if ($authorized)
    <td>
        @yield('form-field')
    </td>
    @else
    <td>
        {{ $field->label }}: <strong>{{ $value ? __('Yes') : __('No') }}</strong>
    </td>
    @endif
</tr>

@endif
