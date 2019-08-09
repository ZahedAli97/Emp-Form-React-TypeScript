// export interface FormProps {
//   firstName: string;
//   lastName: string;
//   age: number;
//   agreetoterms?: boolean;
// }  >> This was just to get started with TypeScript

export interface FormState {
  submitted: boolean;
  id: number;
  full_name: string;
  email: string;
  password: string;
  mobile: number;
  dateOfBirth: Date;
  gender: string;
  profilePic: string | ArrayBuffer | null;
}

export interface formData {
  id: number;
  name: string;
  email: string;
  password: string;
  mobile: number | string;
  birthday: Date | string;
  gender: string;
  skills: string | string[]; // Add in form
  image: string | ArrayBuffer | null;
}

export interface LoginFormInterface {
  email: string;
  password: string;
  [targetName: string]: string;
}

// export interface eventType {
//   target: { name: string; value: string; files: File[] };
//   preventDefault: Function;
// }   >> Keeping it as an Example.

export interface LoginFormSuccessInterface {
  data: formData;
}

export interface LoginFormFailureInterface {
  error: string;
}

export interface ReducerInterface extends formData {
  isLoggedIn: boolean;
  isLoading: boolean;
  isSignupSuccess: boolean;
  lang: string;
}
