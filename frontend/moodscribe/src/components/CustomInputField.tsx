import React, { FC } from 'react';
import {
  //   FieldError,
  //   FieldErrorsImpl,
  //   Merge,
  Controller,
  UseFormRegisterReturn,
} from 'react-hook-form';
import { Icon } from '@iconify/react';
// import Select, { components, OptionProps, StylesConfig } from 'react-select';
// import { OptionType } from '@/utils/types';

import { ErrorMessage } from './ErrorMessage';

// type HasErrorType = Merge<
//   FieldError,
//   (
//     | Merge<
//         FieldError,
//         FieldErrorsImpl<{
//           name: string;
//           id: string;
//         }>
//       >
//     | undefined
//   )[]
// >;
interface Props {
  label: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: any;
  showStepTwo?: boolean;
  isRequired?: boolean;
  isClearable?: boolean;
  isSearchable?: boolean;
  defaultValue?: string;
  placeholder?: string;
  //   hasError?: HasErrorType | undefined;
  errorMessage?: string;
  //   options?: OptionType[];
  type?: string;
  registration: Partial<UseFormRegisterReturn>;
  handleShowPassword?: () => void;
  handleOnBlur?: (value: string) => void;
  disabled?: boolean;
  valid?: string | null;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  className?: string;
}

const CustomInputField: FC<Props> = (
  {
    valid,
    // handleOnBlur,
    disabled = false,
    type,
    label,
    handleShowPassword,
    control,
    registration,
    defaultValue,
    isRequired,
    placeholder,
    // hasError,
    errorMessage,
    // options,
    className,
  },
  ref
) => {
  const { name } = registration;

  return (
    <div className='relative space-y-1'>
      <label htmlFor={name} id={name} className='text-[#e7c1a3] mt-9 block'>
        {' '}
        {label}
        {isRequired && <span className='ml-1 text-red-600'>*</span>}
      </label>
      {/* {options ? (
        <Controller
          name={name as string}
          control={control}
          render={({ field: { onChange, value, onBlur } }) => (
            <Select
              name={name as string}
              options={options}
              value={value}
              placeholder={placeholder}
              onChange={(selectedOption) => onChange(selectedOption)}
              onBlur={onBlur}
              isClearable={isClearable}
              isSearchable={isSearchable}
              styles={customStyles}
              components={{
                IndicatorSeparator: () => null,
                Option: CustomOption,
              }}
              noOptionsMessage={({ inputValue }) =>
                `No result found for "${inputValue}"`
              }
            />
          )}
        />
      ) : ( */}
      <Controller
        name={name as string}
        control={control}
        defaultValue={defaultValue}
        render={({ field, fieldState }) => (
          <div className='flex items-center relative'>
            <input
              type={type}
              ref={ref}
              id={field.name}
              value={field.value}
              onChange={field.onChange}
              onBlur={field.onBlur}
              className={`focus-within:border-secondary pb-3 w-full text-gray-400 rounded-lg border border-gray-200 outline-none  disabled:bg-gray-100 ${
                fieldState.error ? 'border-red-500' : ''
              } ${className}`}
              placeholder={placeholder}
              disabled={disabled}
              {...registration}
            />
            {handleShowPassword && (
              <span className='absolute right-3 mt-1'>
                <button
                  type='button'
                  onClick={handleShowPassword}
                  title={type === 'text' ? 'Hide password' : 'Show password'}
                >
                  {type === 'password' ? (
                    <Icon icon='bx:show' className='text-xl text-gray-400' />
                  ) : (
                    <Icon icon='ci:hide' className='text-xl text-gray-400' />
                  )}
                </button>
              </span>
            )}
          </div>
        )}
      />
      {/* )} */}

      {valid === 'success' && (name === 'password' || name === 'email') ? (
        <span className='text-xs text-success-300'>Perfect!</span>
      ) : null}

      {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
    </div>
  );
};

export default CustomInputField;
