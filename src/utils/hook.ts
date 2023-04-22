import { FormHandles } from '@unform/core';
// import { ApiValidationError } from 'contracts/Common';
import React from 'react';
import * as Yup from 'yup';

export const useValidation = () => {
  return {
    handleFormErrors: (
      errors: any,
      ref: React.RefObject<FormHandles>
    ): void => {
      if (!ref.current) return;
      const validationErrors: Record<string, any> = {};

      if (errors instanceof Yup.ValidationError) {
        errors.inner.forEach((er: any) => {
          validationErrors[er.path] = er.message;
        });
        ref.current.setErrors(validationErrors);

        if (import.meta.env.NODE_ENV === 'development') {
          console.warn('VALIDATION ERRORS', validationErrors);
        }
      }
    },
    handleApiErrors: (
      errors: any,
      ref: React.RefObject<FormHandles>
    ): void => {
      if (!ref.current) return;

      for (const { field, message } of errors) {
        ref.current.setFieldError(field, message);
      }
    },
  };
};
