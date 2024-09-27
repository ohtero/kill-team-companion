import { useForm, SubmitHandler } from 'react-hook-form';
import { ContentHeader } from '../../../components/UI/contentHeader';
import { ContentSection } from '../../../components/UI/contentSection';
import { Form } from '../../../components/UI/form';
import { FormSection } from '../../../components/UI/formSection';
import { GenericButton } from '../../../components/UI/genericButton';
import { LabelAndError } from '../../../components/UI/labelAndError';
import { NavLink } from 'react-router-dom';
// import { ErrorMsg } from '../../../components/UI/errorMsg';

interface LoginUserInputs {
  username: string;
  password: string;
}

export function LoginForm() {
  const {
    register,
    handleSubmit,
    // setError,
    formState: { errors }
  } = useForm<LoginUserInputs>({
    mode: 'onSubmit',
    reValidateMode: 'onChange',
    delayError: 500
  });

  const loginUser: SubmitHandler<LoginUserInputs> = (formData) => {
    console.log(formData);
  };
  return (
    <ContentSection>
      <ContentHeader>Sign in to your account</ContentHeader>
      <Form onSubmit={handleSubmit(loginUser)}>
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
              required: { value: true, message: 'Enter username' }
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
            type="text"
            id="password"
            {...register('password', {
              required: { value: true, message: 'Enter password' }
            })}
          />
        </FormSection>
        {/* <ErrorMsg errorOwner='form'></ErrorMsg> */}
        <GenericButton type="submit" name="loginUser" $orange>
          Sign In
        </GenericButton>
      </Form>
      <NavLink to={'/register'}>Don't have an account? Register here!</NavLink>
    </ContentSection>
  );
}
