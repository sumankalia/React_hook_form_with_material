import React from "react";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";

const GENDER_OPTIONS = [
  { text: "Male", value: "male" },
  { text: "Female", value: "female" },
  { text: "Other", value: "other" },
];

const schema = yup
  .object({
    firstName: yup.string().required("First Name is required"),
    lastName: yup.string().required("Last Name is required"),
    gender: yup.string().required("Gender is required"),
    email: yup
      .string()
      .email("This must be a valid email")
      .required("Email is required"),
    phone: yup.string().required("Phone Number is required"),
    password: yup
      .string()
      .required("Password is required")
      .min(6, "The password must be of six characters."),
    confirmPassword: yup
      .string()
      .required("Confirm Password is required")
      .min(6, "The confirm password must be of six characters")
      .oneOf([yup.ref("password")], "Your passwords does not match"),
  })
  .required();

// yup
const UserRegistrationForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = (values) => console.log(values);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h3>User Register Form</h3>
      <div className="form-group">
        {/* <label htmlFor="firstName">First Name</label> */}
        <Controller
          name="firstName"
          control={control}
          // rules={{ required: true }}
          render={({ field }) => (
            <TextField
              fullWidth
              // required
              {...field}
              // id="outlined-required"
              label="First Name"
              // defaultValue="Hello World"
            />
          )}
        />
        {/* <input
          type="text"
          className="form-control"
          {...register("firstName", {
            required: true,
          })}
        /> */}
        {errors.firstName && (
          <span className="field_level_error">{errors.firstName.message}</span>
        )}
      </div>
      <div className="form-group">
        <label htmlFor="lastName">Last Name</label>
        <input type="text" className="form-control" {...register("lastName")} />
        {errors.lastName && (
          <span className="field_level_error">{errors.lastName.message}</span>
        )}
      </div>
      <div className="form-group">
        <label htmlFor="gender">Gender</label>
        <Controller
          name="gender"
          control={control}
          // rules={{ required: true }}
          render={({ field }) => (
            <Select label="Gender" fullWidth {...field}>
              {GENDER_OPTIONS.map((option, index) => (
                <MenuItem key={index} value={option.value}>
                  {option.text}
                </MenuItem>
              ))}
            </Select>
          )}
        />

        {/* <select className="form-control" {...register("gender")}>
          <option value="">Select Gender</option>
          {GENDER_OPTIONS.map((option, index) => (
            <option key={index} value={option.value}>
              {option.text}
            </option>
          ))}
        </select> */}
        {errors.gender && (
          <span className="field_level_error">{errors.gender.message}</span>
        )}
      </div>
      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input type="email" className="form-control" {...register("email")} />
        {errors.email && (
          <span className="field_level_error">{errors.email.message}</span>
        )}
      </div>
      <div className="form-group">
        <label htmlFor="phone">Phone</label>
        <input type="number" className="form-control" {...register("phone")} />
        {errors.phone && (
          <span className="field_level_error">{errors.phone.message}</span>
        )}
      </div>
      <div className="form-group">
        <label htmlFor="password">Password</label>
        <input
          type="password"
          className="form-control"
          {...register("password")}
        />
        {errors.password && (
          <span className="field_level_error">{errors.password.message}</span>
        )}
      </div>
      <div className="form-group">
        <label htmlFor="confirmPassword">Confirm Password</label>
        <input
          type="password"
          className="form-control"
          {...register("confirmPassword")}
        />
        {errors.confirmPassword && (
          <span className="field_level_error">
            {errors.confirmPassword.message}
          </span>
        )}
      </div>
      <button type="submit" className="btn btn-primary mt-2">
        Submit
      </button>
    </form>
  );
};

export default UserRegistrationForm;
