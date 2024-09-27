import { useForm, SubmitHandler } from 'react-hook-form';
import { ContentHeader } from '../../../components/UI/contentHeader';
import { ContentSection } from '../../../components/UI/contentSection';
import { Form } from '../../../components/UI/form';
import { FormSection } from '../../../components/UI/formSection';
import { GenericButton } from '../../../components/UI/genericButton';
import { LabelAndError } from '../../../components/UI/labelAndError';
import { useState } from 'react';
import { ErrorMsg } from '../../../components/UI/errorMsg';
import { useNavigate } from 'react-router-dom';

interface RegisterUserInputs {
  username: string;
  email: string;
  password: string;
  passwordConfirmation: string;
}

export function RegistrationForm() {
  const [isPending, setIsPending] = useState(false);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    getValues,
    setError,
    formState: { errors }
  } = useForm<RegisterUserInputs>({
    mode: 'onSubmit',
    reValidateMode: 'onChange',
    delayError: 500
  });

  const registerUser: SubmitHandler<RegisterUserInputs> = async (formData) => {
    setIsPending(true);
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/auth/register`, {
        method: 'POST',
        mode: 'cors',
        headers: {
          'content-type': 'application/json'
        },
        body: JSON.stringify({
          registrationData: {
            username: formData.username,
            email: formData.email,
            password: formData.password
          }
        })
      });
      console.log(formData);
      if (!res.ok) {
        throw new Error();
      }
      console.log('registration success');
      navigate('/login');
    } catch (error) {
      setError('root.serverError', {
        type: 'server',
        message: 'Account registration failed'
      });
    } finally {
      setIsPending(false);
    }
  };
  return (
    <ContentSection>
      <ContentHeader>Register account</ContentHeader>
      <Form onSubmit={handleSubmit(registerUser)}>
        <FormSection>
          <LabelAndError
            label="Username"
            labelFor="userName"
            error={errors?.username?.message}
          />
          <input
            type="text"
            id="userName"
            {...register('username', {
              required: { value: true, message: 'Username is required' },
              maxLength: {
                value: 16,
                message: 'Username maximum length is 16 characters'
              },
              pattern: {
                value: /[a-zA-Z0-9]/,
                message: 'Only characters a-z and 0-9 allowed'
              }
            })}
          />
        </FormSection>
        <FormSection>
          <LabelAndError
            label="Email"
            labelFor="email"
            error={errors?.email?.message}
          />
          <input
            type="text"
            id="email"
            {...register('email', {
              required: { value: true, message: 'Email is required' },
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: 'Email is not valid'
              }
            })}
          />
        </FormSection>
        <FormSection>
          <LabelAndError
            label="Password"
            labelFor="password"
            error={errors?.password?.message}
          />
          <input
            type="password"
            id="password"
            {...register('password', {
              required: { value: true, message: 'Password is required' },
              minLength: {
                value: 12,
                message: 'Password must be at least 12 characters long'
              },
              pattern: {
                value: /^\S{12}/,
                message: 'Password must not contain any whitespace'
              }
            })}
          />
        </FormSection>
        <FormSection>
          <LabelAndError
            label="Confirm Password"
            labelFor="passwordConfirmation"
            error={errors?.passwordConfirmation?.message}
          />
          <input
            type="password"
            id="passwordConfirmation"
            {...register('passwordConfirmation', {
              required: { value: true, message: 'Confirm your password' },
              validate: {
                isMatch: (value) =>
                  value === getValues('password') || 'Passwords do not match'
              }
            })}
          />
        </FormSection>
        <ErrorMsg errorOwner="form">
          {errors?.root?.serverError?.message}
        </ErrorMsg>
        <GenericButton type="submit" name="registerUser" $orange>
          {isPending ? 'Registering...' : 'Register'}
        </GenericButton>
      </Form>
    </ContentSection>
  );
}
