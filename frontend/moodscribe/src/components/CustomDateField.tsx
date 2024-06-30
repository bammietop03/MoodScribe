import { Controller, FieldError, UseControllerProps } from 'react-hook-form';
import DatePicker, { DatePickerProps } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import React from 'react';
// import dayjs from 'dayjs';
import clsx from 'clsx';

import { ErrorMessage } from './ErrorMessage';

type ReactDatePickPropsWithoutOnChange = Omit<DatePickerProps, 'onChange'>;

type InputDateFieldProps = {
  name: string;
  label?: string;
  className?: string;
  placeholder?: string;
  errorMessage?: string;
  hasError: FieldError | undefined;
  value?: Date;
  isRequired?: boolean;
} & ReactDatePickPropsWithoutOnChange &
  UseControllerProps;

export const InputDateField: React.FC<InputDateFieldProps> = ({
  name,
  label,
  hasError,
  className,
  placeholder = 'Select date',
  dateFormat = 'MMMM d, yyyy HH:mm:ss',
  isRequired,
  control,
  errorMessage,
  ...props
}) => {
  return (
    <>
      <label htmlFor={name} id={name} className={clsx('mt-5 block')}>
        {' '}
        {label}
        {isRequired && <span className='ml-1 hidden text-red-600'>*</span>}
      </label>
      <Controller
        control={control || undefined}
        name={name}
        render={({ field }) => (
          <div className='customDatePickerWidth flex-1'>
            <DatePicker
              className={clsx(
                'font-WorkSans focus-within:border-secondary h-10 w-full px-2 bg-slate-700 bg-opacity-40 outline-none placeholder:text-sm disabled:bg-gray-100',
                hasError && 'border-red-500',
                className
              )}
              // formatWeekDay={(day) => dayjs(day).format('ddd')}
              placeholderText={placeholder}
              closeOnScroll={true}
              selected={field.value}
              dateFormat={dateFormat}
              selectsRange={true}
              name={name}
              onChange={(date: [Date | null, Date | null]) =>
                field.onChange(date)
              }
              showMonthDropdown
              autoComplete='off'
              showYearDropdown
              dropdownMode='select'
              showTimeSelect
              timeIntervals={1}
              ref={(elem) => {
                elem &&
                  field.ref(
                    (elem as unknown as { input: HTMLInputElement }).input
                  );
              }}
              {...props}
            />
          </div>
        )}
      />

      {errorMessage && (
        <ErrorMessage className='ml-2'>{errorMessage}</ErrorMessage>
      )}
    </>
  );
};
