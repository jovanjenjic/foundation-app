import React, { useEffect } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import { isEqual } from 'lodash';
import { Employee, FormInterface, FormValues } from '../types';
import {
  useCreateEmployeeMutation,
  useGetEmployeeQuery,
  useUpdateEmployeeMutation,
} from '../services/Employee.services';

const style = {
  position: 'absolute' as const,
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  p: 4,
  '& .MuiTextField-root': {
    margin: '10px 0',
  },
};

const validationSchema = yup.object().shape({
  name: yup.string().required('Name is required'),
  phoneNumber: yup
    .string()
    .matches(/^\+?\d{10,}$/, 'Invalid phone number') // Proverava da li je telefon u formatu 10 brojeva
    .required('Phone number is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  homeAddress: yup.object().shape({
    city: yup.string().required('City is required'),
    ZIPCode: yup
      .string()
      .matches(/^\d{5}$/, 'Invalid ZIP code') // Proverava da li je ZIP kod u formatu 5 brojeva
      .required('ZIP code is required'),
    addressLine1: yup.string().required('Address line 1 is required'),
    addressLine2: yup.string(),
  }),
  dateOfEmployment: yup
    .date()
    .typeError('Date of employment is required') // Prikazuje grešku kada vrednost nije ispravan datum
    .required('Date of employment is required'),
  dateOfBirth: yup
    .date()
    .typeError('Date of birth is required') // Prikazuje grešku kada vrednost nije ispravan datum
    .required('Date of birth is required'),
});

const initialValues = {
  name: '',
  email: '',
  phoneNumber: '',
  homeAddress: {
    city: '',
    ZIPCode: '',
    addressLine1: '',
    addressLine2: '',
  },
  dateOfEmployment: '',
  dateOfBirth: '',
};

const DialogForm = ({ open, handleClose, employeeId }: FormInterface) => {
  const [createEmployee] = useCreateEmployeeMutation();
  const [updateEmployee] = useUpdateEmployeeMutation();
  const { data } = useGetEmployeeQuery(employeeId as string, {
    skip: !employeeId,
  });

  const onFormSubmit = async (
    formValues: FormValues | Employee,
  ): Promise<void> => {
    if (!employeeId) {
      await createEmployee(formValues);
      handleClose();
    } else {
      if (!isEqual(data, formValues)) {
        await updateEmployee(formValues as Employee);
        handleClose();
      }
    }
  };

  const formik = useFormik({
    initialValues: data || initialValues,
    validationSchema: validationSchema,
    onSubmit: onFormSubmit,
    enableReinitialize: true,
  });

  useEffect(() => {
    if (!employeeId) {
      formik.resetForm({ values: initialValues });
    } else {
      formik.resetForm({ values: data || initialValues });
    }
  }, [open]);

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <form onSubmit={formik.handleSubmit}>
            <TextField
              fullWidth
              id="name"
              name="name"
              label="Name"
              value={formik.values.name}
              onChange={formik.handleChange}
              error={formik.touched.name && Boolean(formik.errors.name)}
              helperText={formik.touched.name && formik.errors.name}
              variant="outlined"
            />

            <TextField
              fullWidth
              id="email"
              name="email"
              label="Email"
              value={formik.values.email}
              onChange={formik.handleChange}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
              variant="outlined"
            />

            <TextField
              fullWidth
              id="phoneNumber"
              name="phoneNumber"
              label="Phone number"
              value={formik.values.phoneNumber}
              onChange={formik.handleChange}
              error={
                formik.touched.phoneNumber && Boolean(formik.errors.phoneNumber)
              }
              helperText={
                formik.touched.phoneNumber && formik.errors.phoneNumber
              }
              variant="outlined"
            />

            <TextField
              fullWidth
              id="homeAddress.city"
              name="homeAddress.city"
              label="City"
              value={formik.values.homeAddress.city}
              onChange={formik.handleChange}
              error={
                formik.touched.homeAddress?.city &&
                Boolean(formik.errors.homeAddress?.city)
              }
              helperText={
                formik.touched.homeAddress?.city &&
                formik.errors.homeAddress?.city
              }
              variant="outlined"
            />

            <TextField
              fullWidth
              id="homeAddress.ZIPCode"
              name="homeAddress.ZIPCode"
              label="ZIP Code"
              value={formik.values.homeAddress.ZIPCode}
              onChange={formik.handleChange}
              error={
                formik.touched.homeAddress?.ZIPCode &&
                Boolean(formik.errors.homeAddress?.ZIPCode)
              }
              helperText={
                formik.touched.homeAddress?.ZIPCode &&
                formik.errors.homeAddress?.ZIPCode
              }
              variant="outlined"
            />
            <TextField
              fullWidth
              id="homeAddress.address"
              name="homeAddress.addressLine1"
              label="Address Line 1"
              value={formik.values.homeAddress.addressLine1}
              onChange={formik.handleChange}
              error={
                formik.touched.homeAddress?.addressLine1 &&
                Boolean(formik.errors.homeAddress?.addressLine1)
              }
              helperText={
                formik.touched.homeAddress?.addressLine1 &&
                formik.errors.homeAddress?.addressLine1
              }
              variant="outlined"
            />
            <TextField
              fullWidth
              id="homeAddress.addressLine2"
              name="homeAddress.addressLine2"
              label="Address Line 2"
              value={formik.values.homeAddress.addressLine2}
              onChange={formik.handleChange}
              error={
                formik.touched.homeAddress?.addressLine2 &&
                Boolean(formik.errors.homeAddress?.addressLine2)
              }
              helperText={
                formik.touched.homeAddress?.addressLine2 &&
                formik.errors.homeAddress?.addressLine2
              }
              variant="outlined"
            />

            <TextField
              fullWidth
              id="dateOfEmployment"
              name="dateOfEmployment"
              label="Date of Employment"
              value={formik.values.dateOfEmployment}
              onChange={formik.handleChange}
              error={
                formik.touched.dateOfEmployment &&
                Boolean(formik.errors.dateOfEmployment)
              }
              helperText={
                formik.touched.dateOfEmployment &&
                formik.errors.dateOfEmployment
              }
              variant="outlined"
            />

            <TextField
              fullWidth
              id="dateOfBirth"
              name="dateOfBirth"
              label="Date of Birth"
              value={formik.values.dateOfBirth}
              onChange={formik.handleChange}
              error={
                formik.touched.dateOfBirth && Boolean(formik.errors.dateOfBirth)
              }
              helperText={
                formik.touched.dateOfBirth && formik.errors.dateOfBirth
              }
              variant="outlined"
            />
            <Button color="primary" variant="contained" fullWidth type="submit">
              Submit
            </Button>
          </form>
        </Box>
      </Modal>
    </div>
  );
};

export default DialogForm;
