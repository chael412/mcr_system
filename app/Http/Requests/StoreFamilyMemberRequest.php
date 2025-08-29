<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreFamilyMemberRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            // 'register_number' => ['required', 'max:255'],
            // 'year' => ['required', Rule::in(['1st', '2nd', '3rd', '4th', '5th'])],
            // 'firstname' => ['required', 'max:255'],
            // 'middlename' => ['nullable', 'max:255'],
            // 'lastname' => ['required', 'max:255'],
            // 'birthdate' => ['nullable', 'date'],
            // 'gender' => ['required', Rule::in(['male', 'female'])],
            // 'email' => ['nullable', 'email', 'max:255', 'unique:students,email'],
            // 'contact_no' => ['nullable', 'max:11'],
            // 'address' => ['nullable', 'max:255'],
            // 'image' => ['nullable', 'image', 'max:10240'],
            // 'course_id' => ['required', 'integer'],
        ];
    }
}
